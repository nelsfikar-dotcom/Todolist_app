export interface user {
    id: number,
    name: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
}

export interface createUser {
    name: string,
    email: string,
    password: string,   
}

export interface updateUser {
    id: number,
    name: string,
    email: string,
    password: string,
}


