'use client';

import { Layout, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

// Menu configuration with icons
const menuItems = [
  {
    key: '/allproduct',
    label: 'All Products',
    icon: <AppstoreOutlined />,
  },
  {
    key: '/product-management',
    label: 'Product Management',
    icon: <SettingOutlined />,
  },
  {
    key: '/user-management',
    label: 'User Management',
    icon: <UserOutlined />,
  },
];

// Style constants for consistency
const styles = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 70,
    backgroundColor: '#001529',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
  },
  headerTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '0.5px',
  },
  sider: {
    backgroundColor: '#fff',
    paddingTop: 16,
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)',
    borderRight: '1px solid #f0f0f0',
  },
  menu: {
    border: 'none',
  },
  content: {
    margin: '16px',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    minHeight: 'calc(100vh - 102px)', // Adjust for header and margins
  },
} as const;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (item: { key: string }) => {
    router.push(item.key);
  };

  return (
    <Layout style={styles.layout}>
      {/* Header Section */}
      <Header style={styles.header}>
        <h1 style={styles.headerTitle}>
          Dashboard
        </h1>
      </Header>

      <Layout>
        {/* Sidebar Section */}
        <Sider
          width={220}
          style={styles.sider}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={styles.menu}
          />
        </Sider>

        {/* Main Content Section */}
        <Layout>
          <Content style={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}