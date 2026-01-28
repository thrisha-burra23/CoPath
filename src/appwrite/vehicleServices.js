import appwriteClient from ".";
import { TablesDB, ID} from "appwrite"
import { APPWRITE_DB_ID, APPWRITE_VEHICLES_TABLE_ID } from "../utils/constants";

const tablesDB = new TablesDB(appwriteClient);
const DATABASE_ID = APPWRITE_DB_ID;
const VEHICLE_COLLECTION = APPWRITE_VEHICLES_TABLE_ID;

export const createVehicleRequest = async (vehicleData) => {
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: VEHICLE_COLLECTION,
        rowId: ID.unique(),
        data: vehicleData
    })
}