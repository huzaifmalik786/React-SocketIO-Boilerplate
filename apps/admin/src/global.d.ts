import { Socket } from "socket.io-client";

export {};

declare global {
    interface Window {
        socket: Socket | undefined
    }
}