import { api } from "../api";

import { register, login, apiResponse } from "./type";

export const auth = {
    async regis( data : register ) : Promise <apiResponse> {
        const response = await api.post<apiResponse> ('/register',data)
        return response.data;
    },

    async login( data : login ) : Promise <apiResponse> {
        const response = await api.post<apiResponse> ('/login', data)
        return response.data;
    }
}
