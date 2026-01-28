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
                request: res,
                profile: profileRes.rows[0],
                vehicle: vehicleRes.rows[0]
            };

        })
    );
    return requests;
}

export const approveDriverRequest=async()=>{
const result=await tablesDB.updateRow
}

export const rejectDriverRequest=async()=>{

}