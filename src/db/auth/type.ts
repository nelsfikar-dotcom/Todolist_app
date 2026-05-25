export interface register {
    name: string,
    email: string,
    password: string,
}

export interface login {
    email: string,
    password: string
}

export interface apiResponse {
    succes: boolean,
    message: string,
    data: any[]

}