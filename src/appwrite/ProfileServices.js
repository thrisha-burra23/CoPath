import appwriteClient from ".";
import { TablesDB, ID, Query } from "appwrite"
import { APPWRITE_DB_ID, APPWRITE_PROFILES_TABLE_ID } from "../utils/constants";

const tablesDB = new TablesDB(appwriteClient);
const DATABASE_ID = APPWRITE_DB_ID;
const PROFILE_COLLECTION_ID = APPWRITE_PROFILES_TABLE_ID;

export const createProfile = async (profileData) => {
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: PROFILE_COLLECTION_ID,
        rowId: ID.unique(),
        data: profileData
    })
}

export const fetchProfileByUserId = async (userId) => {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: PROFILE_COLLECTION_ID,
        queries: [Query.equal("userId", userId)]
    });
    return result.rows[0] || null
}

export const updateWalletBalance = async (profileId, newBalance) => {
    return await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: PROFILE_COLLECTION_ID,
        rowId: profileId,
        data: { walletBalance: newBalance }
    })
}

