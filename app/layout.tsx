import './globals.css';
import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

export const metadata = {
  title: 'My App',
  description: 'Login system using Next.js and Ant Design',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
