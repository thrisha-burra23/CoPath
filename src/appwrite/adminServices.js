import appwriteClient from ".";
import { TablesDB, ID, Query } from "appwrite"
import { APPWRITE_ADMIN_REQUESTS_TABLE_ID, APPWRITE_DB_ID, APPWRITE_PROFILES_TABLE_ID, APPWRITE_VEHICLES_TABLE_ID } from "../utils/constants";

const tablesDB = new TablesDB(appwriteClient);
const DATABASE_ID = APPWRITE_DB_ID;
const ADMIN_REQUEST_COLLECTION = APPWRITE_ADMIN_REQUESTS_TABLE_ID;
const PROFILE_COLLECTION = APPWRITE_PROFILES_TABLE_ID;
const VEHICLES_COLLECTION = APPWRITE_VEHICLES_TABLE_ID

export const createDriverRequest = async (driverData) => {
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: ADMIN_REQUEST_COLLECTION,
        rowId: ID.unique(),
        data: driverData
    })
}

export const fetchDriverRequest = async (userId) => {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ADMIN_REQUEST_COLLECTION,
        queries: [
            Query.equal("userId", userId),
            Query.equal("type", "DRIVER"),
            Query.equal("status", "PENDING")
        ]
    });

    return result.rows[0] || null
}

export const fetchDriverRequestsWithDetails = async () => {
    const reqRes = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ADMIN_REQUEST_COLLECTION,
        queries: [
            Query.equal("type", "DRIVER"),
            Query.equal("status", "PENDING")
        ]
    })

    const requests = await Promise.all(
        reqRes.rows.map(async (req) => {
            const profileRes = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: PROFILE_COLLECTION,
                queries: [
                    Query.equal("userId", req.userId)
                ]
            });

            const vehicleRes = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: VEHICLES_COLLECTION,
                queries: [
                    Query.equal("userId", req.userId)
                ]
            });

            return {
                request: req,
                profile: profileRes.rows[0],
                vehicle: vehicleRes.rows[0]
            };

        })
    );
    return requests;
}

export const approveDriverRequest = async ({requestedId, profileId, vehicleId}) => {
    const result1 = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: ADMIN_REQUEST_COLLECTION,
        rowId: requestedId,
        data: {
            status: "APPROVED",
            rejectedReason: null
        }
    })
    const result2 = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: PROFILE_COLLECTION,
        rowId: profileId,
        data: { driverApproved: true }
    })
    const result3 = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: VEHICLES_COLLECTION,
        rowId: vehicleId,
        data: {
            approved: true
        }
    })

    console.log(result1, result2, result3);
    return true;
}

export const rejectDriverRequest = async ({requestedId, reason}) => {
    const result1 = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: ADMIN_REQUEST_COLLECTION,
        rowId: requestedId,
        data: {
            status: "REJECTED",
            rejectedReason: reason
        }
    })

    console.log(result1);
    return true;
}