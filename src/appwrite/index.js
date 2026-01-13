import { Client } from "appwrite";
import {APPWRITE_API_ENDPOINT, APPWRITE_PROJECT_ID} from "../utils/appwrite/constants";

const appwriteClient=new Client()
    .setEndpoint(APPWRITE_API_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)

export default appwriteClient;
