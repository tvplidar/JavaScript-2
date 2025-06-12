'use client';

import { Table } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';

type Product = {
  id: number;
  PRODUCT_NAME: string;
  PRICE: number;
  CAT_ID: number;
  create_date: string;
};

export default function ProductPage() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/product')
      .then(res => res.json())
      .then(data => setData(data));
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
      dataIndex: 'PRODUCT_NAME',
      key: 'PRODUCT_NAME',
    },
    {
      title: 'Price',
      dataIndex: 'PRICE',
      key: 'PRICE',
      render: (price) => `${price} USD`,
    },
    {
      title: 'Category',
      dataIndex: 'CAT_ID',
      key: 'CAT_ID',
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
