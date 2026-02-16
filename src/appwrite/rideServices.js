import appwriteClient from ".";
import { TablesDB, ID, Query } from "appwrite"
import { APPWRITE_DB_ID, APPWRITE_PROFILES_TABLE_ID, APPWRITE_RIDES_TABLE_ID, APPWRITE_VEHICLES_TABLE_ID } from "../utils/constants";
import { getApprovedRequestsByRides } from "./passengerRequestServices";

const DATABASE_ID = APPWRITE_DB_ID;
const tablesDB = new TablesDB(appwriteClient);
const RIDES_COLLECTION_ID = APPWRITE_RIDES_TABLE_ID;
const PROFILE_COLLECTION_ID = APPWRITE_PROFILES_TABLE_ID;
const VEHICLE_COLLECTION_ID = APPWRITE_VEHICLES_TABLE_ID

export const createRide = async (rideData) => {
    if (!rideData.driverId) {
        throw new Error("Driver not authorized");
    }
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: RIDES_COLLECTION_ID,
        rowId: ID.unique(),
        data: rideData
    });
}

export const updateRideSeats = async (rideId, remainingSeats) => {
    const result = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: RIDES_COLLECTION_ID,
        rowId: rideId,
        data: {
            availableSeats: remainingSeats,
            status: remainingSeats == 0 ? "FULL" : "ACTIVE"
        }
    });
    return result;
}

export const fetchRidesByDriver = async (driverId) => {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: RIDES_COLLECTION_ID,
        queries: [
            Query.equal("driverId", driverId),
            Query.orderDesc("$createdAt"),
        ]
    });
    return result.rows ?? []
}

export const fetchAllAvailableRides = async () => {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: RIDES_COLLECTION_ID,
        queries: [
            Query.equal("status", "ACTIVE"),
            Query.greaterThan("availableSeats", 0),
            Query.greaterThan("time", new Date().toISOString())
        ]
    });
    return result.rows ?? [];
}

export const searchRides = async ({ start, end, date }) => {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: RIDES_COLLECTION_ID,
        queries: [
            Query.equal("status", "ACTIVE"),
            Query.greaterThan("availableSeats", 0),
            Query.greaterThan("time", new Date().toISOString()),
        ],
    });

    let rides = result.rows ?? [];

    rides = rides.filter((ride) => {
        const startMatch = ride.startLabel
            ?.toLowerCase()
            .includes(start.toLowerCase());

        const endMatch = ride.endLabel
            ?.toLowerCase()
            .includes(end.toLowerCase());

        return startMatch && endMatch;
    });

    if (date) {
        const selectedDate = new Date(date).toDateString();
        rides = rides.filter(
            (ride) =>
                new Date(ride.time).toDateString() === selectedDate
        );
    }

    return rides;
};


export const fetchRideDetails = async (rideId) => {
    const rideRes = await tablesDB.getRow({
        databaseId: DATABASE_ID,
        tableId: RIDES_COLLECTION_ID,
        rowId: rideId
    });

    const profileRes = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: PROFILE_COLLECTION_ID,
        queries: [Query.equal("userId", rideRes.driverId)]
    })

    const vehicleRes = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: VEHICLE_COLLECTION_ID,
        queries: [
            Query.equal("userId", rideRes.driverId),
            Query.equal("approved", true)
        ]
    })

    return {
        ride: rideRes,
        driver: profileRes.rows[0] || null,
        vehicle: vehicleRes.rows[0] || null,
    }
}

export const completeRidesAndRelease = async ({ ride, driverProfile }) => {
  try {
    if (!ride?.$id) {
      throw new Error("Invalid ride data");
    }

    if (!driverProfile?.$id) {
      throw new Error("Invalid driver profile");
    }

    // 1️⃣ Mark ride as COMPLETED
    await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: RIDES_COLLECTION_ID,
      rowId: ride.$id,
      data: {
        status: "COMPLETED",
      },
    });

    // 2️⃣ Get all APPROVED bookings for this ride
    const approvedRequests = await getApprovedRequestsByRides(ride.$id);

    console.log("Approved Requests:", approvedRequests);

    if (!approvedRequests || approvedRequests.length === 0) {
      console.log("No approved bookings. Nothing to release.");
      return;
    }

    // 3️⃣ Calculate total earnings
    let totalEarned = 0;

    approvedRequests.forEach((req) => {
      totalEarned += ride.price * req.seats_requested;
    });

    console.log("Total Earned:", totalEarned);

    if (totalEarned <= 0) return;

    // 4️⃣ Fetch latest driver profile from DB (IMPORTANT)
    const latestProfile = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: PROFILE_COLLECTION_ID,
      rowId: driverProfile.$id,
    });

    const currentBalance = latestProfile.walletBalance ?? 0;

    // 5️⃣ Update wallet balance
    await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: PROFILE_COLLECTION_ID,
      rowId: driverProfile.$id,
      data: {
        walletBalance: currentBalance + totalEarned,
      },
    });

    console.log("Wallet updated successfully");
  } catch (error) {
    console.error("Error completing ride:", error);
    throw error;
  }
};