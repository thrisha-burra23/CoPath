import { ID, Query, TablesDB } from "appwrite";
import appwriteClient from ".";
import { APPWRITE_CHATS_TABLE_ID, APPWRITE_DB_ID } from "../utils/constants";

const DATABASE_ID = APPWRITE_DB_ID;
const tablesDB = new TablesDB(appwriteClient);
const CHATS_COLLECTION = APPWRITE_CHATS_TABLE_ID;

export const sendMessage = async (data) => {
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: CHATS_COLLECTION,
        rowId: ID.unique(),
        data
    })
}

export const getMessages = async (rideId) => {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: CHATS_COLLECTION,
        queries: [
            Query.equal("rideId", rideId),
            Query.orderAsc("$createdAt")
        ]
    })

    return result.rows ?? []
}