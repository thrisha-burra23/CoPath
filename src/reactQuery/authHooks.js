import { useMutation } from "@tanstack/react-query"
import AppwriteAccount from "../appwrite/AuthServices.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const appWriteAccount = new AppwriteAccount();

export const useCreateAccount = () => {
    const navigate = useNavigate();
    const result = useMutation({
        mutationFn: ({ email, password, fullName }) => appWriteAccount.createAccount(email, password, fullName),
        onSuccess: () => {
            toast.success("Account created Successfully");
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
        onSuccess: () => {
            navigate("/userDashboard")
        },
        onError:(error)=>{
            toast.error(error.message || "Invalid credentials");
        }
    })
}