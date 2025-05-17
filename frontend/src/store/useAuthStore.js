import { create } from 'zustand';
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";

//hooks
export const useAuthStore = create((set) => ({
    authUser: null,
    issinginUp: false,
    isLoggingIn: false,
    isChekingAuth: false,

    //for the check auth route
    checkauth: async () => {
        set({ isChekingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("check response", res.data);

            // we get the user from the backend using cookies

            set({ authUser: res.data.user })



        } catch (error) {
            console.log("the error is", error);
            set({ authUser: null })


        }
        finally {
            set({ isChekingAuth: false })

        }

    },

    // for the singup
    signup: async (data) => {
        set({ isSigninUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);

            set({ authUser: res.data.user });

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error signing up", error);
            toast.error("Error signing up");
        } finally {
            set({ isSigninUp: false });
        }
    },

    // login 
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data.user });

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // logout
    logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },



}))