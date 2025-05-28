'use client';
import { Layout, Menu } from 'antd';
import React, { ReactNode } from 'react';

const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        height: 70,
        backgroundColor: '#001529',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
      }}>
        <h1 style={{ margin: 0, fontSize: 20, color: 'white' }}>My App Header</h1>
      </Header>

      <Layout>
        <Sider
          width={200}
          style={{
            minWidth: 100,
            maxWidth: 200,
            background: '#fff',
            paddingTop: 10,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              { key: '1', label: 'Dashboard' },
              { key: '2', label: 'Profile' },
              { key: '3', label: 'Settings' },
            ]}
          />
        </Sider>

        <Content
          style={{
            margin: '10px 20px 0 10px',
            background: '#fff',
            padding: 20,
            flex: 1,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
