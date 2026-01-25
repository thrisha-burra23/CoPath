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
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) return null;
            throw error;
        }
    }

    async login(email, password) {
        const result = await this.account.createEmailPasswordSession({
            email: email,
            password: password
        });
        return result;
    }

    async sendEmailVerification() {
        const result = await this.account.createVerification({
            url: `${window.location.origin}/verify-email`
        });
        return result;
    }

    async verifyEmail(userId, secret) {
        const result = await this.account.updateVerification(userId, secret);
        return result;
    }

    async logout() {
        try {
            const result = await this.account.deleteSessions();//deletes all sessions only for development, should replace this with the commented one
            // const result = await this.account.deleteSession({
            //     sessionId: 'current'
            // })
            console.log(result);
        } catch (error) {
            if (error.code !== 401) {
                console.error("Logout Error", error.message);
            }
        }

    }

    async sendPasswordRecovery(email) {
        const result = await this.account.createRecovery({
            email: email,
            url: `${window.location.origin}/reset-password`
        });
        return result;
    }

    async resetPassword(userId, secret, password,confirmPassword) {
        const result = await this.account.updateRecovery({ userId, secret, password,confirmPassword });
        return result;
    }
}

export default AppwriteAccount