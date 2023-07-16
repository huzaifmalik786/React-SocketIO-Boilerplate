import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Card, Typography } from 'antd';
import { io } from 'socket.io-client';


export const Home = () => {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [socketError, setSocketError] = useState(null);
  const [socket, setSocket] = useState<any>(null);
  const [user, setUser] = useState<any>();

  const handleLogin = () => {
    const connectSocket: any = io('http://localhost:8080/');
    setSocket(connectSocket);
    setSocketError(null);
  };

  const handleLogout = () => {
    socket.disconnect();
    setUser(null);
  };

  useEffect(() => {
    if (socket) {
      socket.once("connect", () => {
        socket.emit("authenticate", {
          username,
          password,
        });
      });
      socket.on("authorized", () => {
        socket.emit("getUser");
      });
      socket.on("unauthorized", (data: any) => {
        setSocketError(data);
      });
      socket.on("error", (err: any) => {
        setSocketError(err?.message);
        console.log(err?.message);
      });
      socket.on("user", (data: any) => {
        setUser(data);
      });
      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    }
    return () => {
      socket?.off();
      socket?.disconnect();
    };
  }, [password, socket, username]);
  return (
    <div className='flex flex-col items-center h-screen bg-gray-200 p-5 gap-5'>
      <h1 className='text-center text-5xl'>Socket.io Auth</h1>
      {user ? (
        <div className='text-center flex flex-col gap-4'>
          <Typography className='text-3xl'>Welcome {user?.username}</Typography>

          {socket.connected ? (
            <Typography className='text-xl text-green-500'>🟢 Connected</Typography>
          ) : (
            <Typography className='text-xl text-red-500'>🔴 Disconnected</Typography>
          )}

          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Card title="Login" className='w-96 mt-10'>
          <Form
            layout='vertical'
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input onChange={(e: any) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={(e: any) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item >
              <Button type="primary" className='bg-sky-500/100' onClick={handleLogin}>Login</Button>
            </Form.Item>
          </Form>
        </Card>
      )}
        {socketError ? <p className='text-center text-red-500'>{socketError}</p> : null}
    </div>
  )
}
