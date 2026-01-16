import { useMutation } from "@tanstack/react-query"
import AppwriteAccount from "../appwrite/AuthServices.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { queryClient } from "./queryClient.js";

const appWriteAccount = new AppwriteAccount();

export const useCreateAccount = () => {
    const navigate = useNavigate();
    const result = useMutation({
        mutationFn: async ({ email, password, fullName }) => {
            const user = await appWriteAccount.createAccount(email, password, fullName);
            await appWriteAccount.sendEmailVerification();
            return user;
        },
        onSuccess: () => {
            toast.success("Verification Email sent. Please verify before login.");
            navigate("/login")
        },
        onError: (error) => {
            console.log("Account creation failed ", error.message);
            if (error.code === 409) {
                toast.error("User already exists. Please login instead.");
            } else {
                toast(error.message || "Something went Wrong")
            }
        }
    });
    return result;
}

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ email, password }) => appWriteAccount.login(email, password),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey:["auth-user"]})
            // if (!user.emailVerification) {
            //     toast.error("Please verify your Email first.");
            //     await appWriteAccount.logout();
            //     return;
            // }
            
            navigate("/userDashboard")
        },
        onError: (error) => {
            toast.error(error.message || "Invalid credentials");
        }
    })
}

export const useVerification = () => {
    const navigate = useNavigate();
    const result = useMutation({
        mutationFn: ({ userId, secret }) => appWriteAccount.verifyEmail(userId, secret),
        onSuccess: () => {
            toast.success("Email Verified Successfully.");
            navigate("/login");
        },
        onError: () => {
            toast.error("Email Verification Failed.")
            navigate("/register");
        }
    });
    return result;
}

export const useForgotPassword = () => {
    const navigate = useNavigate();

    const result = useMutation({
        mutationFn: async ({ email }) => {
            await appWriteAccount.sendPasswordRecovery(email);
        },
        onSuccess: () => {
            toast.success("Password reset  email sent.");
        },
        onError: (error) => {
            toast.error(error.message || "something went wrong")
        }
    });
    return result;
}

export const useResetPassword = () => {
    const navigate = useNavigate();
    const result = useMutation({
        mutationFn: ({ userId, secret, password }) => {
            appWriteAccount.resetPassword(userId, secret, password);
        },
        onSuccess: () => {
            toast.success("Password set successful");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong")
        }
    });
    return result;
}