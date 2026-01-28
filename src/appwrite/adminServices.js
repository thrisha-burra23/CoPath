import appwriteClient from ".";
import { TablesDB, ID, Query } from "appwrite"
import { APPWRITE_ADMIN_REQUESTS_TABLE_ID, APPWRITE_DB_ID } from "../utils/constants";

const tablesDB = new TablesDB(appwriteClient);
const DATABASE_ID = APPWRITE_DB_ID;
const ADMIN_REQUEST_COLLECTION = APPWRITE_ADMIN_REQUESTS_TABLE_ID;

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
        queries:[
            Query.equal("userId",userId),
            Query.equal("type","DRIVER"),
            Query.equal("status","PENDING")
        ]
    });

    return result.rows[0] || null
}