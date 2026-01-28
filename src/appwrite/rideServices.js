import appwriteClient from ".";
import { TablesDB, ID } from "appwrite"
import { APPWRITE_DB_ID, APPWRITE_RIDES_TABLE_ID } from "../utils/constants";

const DATABASE_ID=APPWRITE_DB_ID;
const RIDE_COLLECTION_ID=APPWRITE_RIDES_TABLE_ID;
const tablesDB = new TablesDB(appwriteClient);

export const createRide=async (rideData)=>{
    return await tablesDB.createRow({
        databaseId:DATABASE_ID,
        tableId:RIDE_COLLECTION_ID,
        rowId:ID.unique(),
        data:rideData
    });
}