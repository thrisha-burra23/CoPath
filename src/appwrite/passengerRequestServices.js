import appwriteClient from ".";
import { TablesDB, ID, Query } from "appwrite"
import { APPWRITE_DB_ID, APPWRITE_PASSENGER_REQUESTS_TABLE_ID } from "../utils/constants";

const tablesDB = new TablesDB(appwriteClient);
const DATABASE_ID = APPWRITE_DB_ID;
const PASSENGER_REQUEST_COLLECTION = APPWRITE_PASSENGER_REQUESTS_TABLE_ID

export const createPassengerRequest = async (data) => {
    const result = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: PASSENGER_REQUEST_COLLECTION,
        rowId: ID.unique(),
        data
    });
    return result;
}

export const getPassengerRequestByDriverId = async (driverId) => {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: PASSENGER_REQUEST_COLLECTION,
        queries: [
            Query.equal("status", "PENDING"),
            Query.equal("driverId", driverId)
        ]
    });
    return result;
}

export const updatePassengerRequestStatus = async (id, status) => {
    const result = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: PASSENGER_REQUEST_COLLECTION,
        rowId: id,
        data: { status }
    });
    return result
}

export const getPassergerRequestByRideAndUser = async ({ rideId, passengerId }) => {
    const result = tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: PASSENGER_REQUEST_COLLECTION,
        queries: [
            Query.equal("rideId", rideId),
            Query.equal("passengerId", passengerId)
        ]
    })
    return result.rows[0] || []
}