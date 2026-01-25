import { useMutation, useQuery } from "@tanstack/react-query"
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
            //await appWriteAccount.sendEmailVerification();
            return user;
        },
        retry: false,
        onSuccess: () => {
            toast.success("Account Created successfully. Please Login");
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
    const result = useMutation({
        mutationFn: async ({ email, password }) => {
            try {
                await appWriteAccount.logout();
            } catch (e) { }
            return await appWriteAccount.login(email, password)
        },
        onSuccess: async () => {
            const user = await appWriteAccount.getUser();

            if (!user.emailVerification) {
                await appWriteAccount.sendEmailVerification(
                    `${window.location.origin}/verify-email`
                );
                await appWriteAccount.logout();

                toast.info("Verification email sent.Please verify your Email");
                navigate("/verify-info");
                return;
            }

            toast.success("Login successful");
            navigate("/user-dashboard");

        },
        onError: (error) => {
            toast.error(error.message || "Invalid credentials");
        }
    })
    return result;
}

export const useVerification = () => {
    const navigate = useNavigate();
    const result = useMutation({
        mutationFn: ({ userId, secret }) => appWriteAccount.verifyEmail(userId, secret),

        onSuccess: () => {
            toast.success("Email Verified Successfully. Please login");
            navigate("/login");
        },

        onError: () => {
            toast.info("This verification link is invalid or already used. Please login.")
            navigate("/login");
        }
    });
    return result;
}

export const useForgotPassword = () => {

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
        mutationFn: async ({ userId, secret, password, confirmPassword }) => {
            appWriteAccount.resetPassword(userId, secret, password, confirmPassword);
            await appWriteAccount.logout();
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

export const useAuthUser = () => {
    const navigate = useNavigate();
    const result = useQuery({
        queryKey: ["auth-user"],
        queryFn: async () => {
            try {
                const user = await appWriteAccount.getUser();
                return user;
            } catch (e) {
                if (e.code === 401) {
                    return null;
                } throw e
            }
        },
        // onError: () => navigate("/login"),
        retry: false,
        staleTime: 0,
    });
    return result;
}

export const useLogout = () => {
    const navigate = useNavigate();
    const result = useMutation({
        mutationFn: async () => appWriteAccount.logout(),
        onSuccess: () => {
            queryClient.setQueryData(["auth-user"], null);
            queryClient.invalidateQueries({ queryKey: ["auth-user"] });
            toast.success("Logged out successfully");
            navigate("/")
        }
    })
    return result;
}