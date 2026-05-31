import { api } from "../api";

import { register, login, authResponse } from "./type";

export const auth = {
    async regis( data : register ) : Promise <authResponse> {
        const response = await api.post<authResponse> ('/register',data)
        return response.data;
    },

    async login( data : login ) : Promise <authResponse> {
        const response = await api.post<authResponse> ('/login', data)
        return response.data;
    }
}