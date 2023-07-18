export enum SocketEvents {
    CONNECT = "connect",
    LOGIN = "login",
    ON_LOGIN = "on_login",
    LOGOUT = "logout",
}

export interface SocketStatus {
    message: string;
    status: number;
    error?: string;
}