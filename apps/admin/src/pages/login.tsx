import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Card } from 'antd';
import { SocketEvents, SocketStatus } from '@shared/index';
import { useNavigate } from 'react-router-dom';



export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    window.socket?.emit(SocketEvents.LOGIN, {
      username,
      password
    })
  }

  useEffect(() => {
    window.socket?.on(SocketEvents.ON_LOGIN, (data : SocketStatus) => {
      if(data.status) {
        alert("Login Success");
      }else{
        alert("Login Failed");
      }
    })

    return () => {
      window.socket?.off(SocketEvents.ON_LOGIN)
    }
  },[])

  return (
    <div className='flex flex-col items-center h-screen bg-gray-200 p-5 gap-5'>
      <h1 className='text-center text-5xl'>Socket.io Auth</h1>
        <Card title="Login" className='w-96 mt-10'>
          <Form
            layout='vertical'
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item >
              <Button type="primary" className='bg-sky-500/100' onClick={handleLogin}>Login</Button>
            </Form.Item>
          </Form>
        </Card>
    </div>
  )
}
