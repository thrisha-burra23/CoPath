import appwriteClient from ".";
import { Account, ID } from "appwrite"


class AppwriteAccount {
    constructor() {
        this.account = new Account(appwriteClient)
    }

    async createAccount(email, password, fullName) {
        const result = await this.account.create({
            userId: ID.unique(),
            email: email,
            password: password,
            name: fullName
        });
        return result;
    }

    async getUser() {
        const result = await this.account.get();
        return result;
    }

    async login(email, password) {
        const result = await this.account.createEmailPasswordSession({
            email: email,
            password: password
        });
        return result;
    }

    async logout() {
        const result = await this.account.deleteSession({
            sessionId: 'current'
        })
        console.log(result);
        return result;
    }

    // async forgetPassword() {
    
    //         const result = this.account.
    //     } catch (error) {
    //         console.log("appwrit forget Password  error-->", error.message);
    //         return null;
    //     }
    // }
}

export default AppwriteAccount