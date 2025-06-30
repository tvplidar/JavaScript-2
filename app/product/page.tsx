'use client';

import { Table } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';


type Product = {
  id: number;
  pro_name: string;
  price: number;
  cat_id: number;
  create_date: string;
};

export default function ProductPage() {
  const [data, setData] = useState<Product[]>([]);

useEffect(() => {
  async function load() {
    try {
      const res = await fetch("http://localhost:3001/api/products");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }
  load();
}, []);

  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: 'Product Name',
      dataIndex: 'pro_name',
      key: 'pro_name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price} USD`,
    },
    {
      title: 'Category',
      dataIndex: 'cat_id',
      key: 'cat_id',
    },
    {
      title: 'Create Date',
      dataIndex: 'create_date',
      key: 'create_date',
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <center>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Product List</h1></center>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        bordered
        scroll={{ x: '100%' }}
        pagination={{ pageSize: 10 }}
        rowClassName={() => 'hover-row'}
      />
      <style jsx global>{`
        .ant-table-thead > tr > th {
          background-color: #6baed6 !important;
          font-weight: bold;
        }
        .hover-row:hover td {
          background-color: #bdd7e7 !important;
        }
      `}</style>
    </div>
  );
}
