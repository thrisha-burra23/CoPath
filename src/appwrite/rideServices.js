import appwriteClient from ".";
import { TablesDB, ID, Query } from "appwrite"
import { APPWRITE_DB_ID, APPWRITE_PROFILES_TABLE_ID, APPWRITE_RIDES_TABLE_ID, APPWRITE_VEHICLES_TABLE_ID } from "../utils/constants";

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
    return await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: RIDES_COLLECTION_ID,
        queries: [
            Query.equal("driverId", driverId),
            Query.orderDesc("$createdAt"),
        ]
    })
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