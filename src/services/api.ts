import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void

type APIInstaceProps = AxiosInstance & { 
    registerInterceptTokenManager:  (signOut: SignOut) => () => void;
}

const api = axios.create({
    baseURL: "http://192.168.0.38:3333",
}) as APIInstaceProps

api.registerInterceptTokenManager = (signOut)=> {
    const interceptTokenManager = api.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if(error.response && error.response.data) {
            return Promise.reject(new AppError(error.response.data.message))
        } else {
            return Promise.reject(error)
        }
    })

    return ()=> {
        api.interceptors.response.eject(interceptTokenManager)
    }
}



export { api }

