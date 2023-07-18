import { SocketEvents } from '@shared/socket.types';
import { Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/debug';

function SocketIOWrapper({
    children
} : {
    children: React.ReactNode
}) {

    const [isConnected, setIsConnected] = useState<boolean>(false);
    useEffect(() => {
        if(window.socket) return;
        console.log(import.meta.env.VITE_APP_WS_PORT, import.meta.env)
        window.socket = io(import.meta.env.VITE_APP_WS_PORT as string);
    }, []);

    useEffect(() => {
        window.socket?.on(SocketEvents.CONNECT, () => {
            console.log("Connected to socket.io server");
            setIsConnected(true);
        })

        return () => {
            window.socket?.off(SocketEvents.CONNECT)
        }
    },[isConnected])

    if(!isConnected) {
        return (
            <React.Fragment>
                <Typography.Title>
                    Loading Data
                </Typography.Title>
                <Spin />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default SocketIOWrapper
