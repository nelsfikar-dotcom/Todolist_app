import { api } from "../api";

import { user, createUser, updateUser } from "./type";


export const userService = {
    async getUser() : Promise <user[]> {
        const response = await api.get<user[]> ('/users')
        return response.data
    },

    async getUserByID(id : number) : Promise <user> {
        const response = await api.get<user> ('/users/id')
        return response.data
    },

    async createUser(data : createUser) : Promise <createUser> {
        const response = await api.post<createUser> ('/users',data)
        return response.data
    },

    async updateUser(data : updateUser) : Promise <updateUser> {
        const response = await api.put<updateUser> ('/users/id',data)
        return response.data
    },
    
    async deleteUser(id : number) : Promise <void> {
        const response = await api.delete ('/users/id')
        return response.data
    }
    
}