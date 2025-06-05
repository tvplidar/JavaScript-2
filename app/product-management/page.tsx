'use client';
import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Space, 
  Popconfirm, 
  Drawer,
  Card,
  Typography,
  Row,
  Col,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined,
  ShoppingOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Product {
  key: string;
  name: string;
  price: string;
}

export default function ProductManagementPage() {
  // State Management
  const [products, setProducts] = useState<Product[]>([
    { key: '1', name: 'Phone Case', price: '$10' },
    { key: '2', name: 'Wireless Mouse', price: '$25' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  // Modal Handlers
  const showModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.setFieldsValue(product);
    } else {
      setEditingProduct(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    form.resetFields();
  };

  // Form Submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedProduct: Product = {
        key: editingProduct?.key || Date.now().toString(),
        name: values.name,
        price: values.price,
      };

      if (editingProduct) {
        // Update existing product
        setProducts(prev =>
          prev.map(p => (p.key === editingProduct.key ? updatedProduct : p))
        );
      } else {
        // Add new product
        setProducts(prev => [...prev, updatedProduct]);
      }

      // Close both modal and drawer
      closeModal();
   
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Delete Product
  const deleteProduct = (key: string) => {
    setProducts(prev => prev.filter(p => p.key !== key));
  };

  // Return to previous page
  const handleReturn = () => {
    window.history.back();
  };

  // Table Columns Configuration
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <ShoppingOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => (
        <Space>
          <DollarOutlined style={{ color: '#52c41a' }} />
          <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
            {text}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit (Modal)
          </Button>
          
          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => deleteProduct(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Form Component
  const ProductForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Product Name"
        rules={[
          { required: true, message: 'Please enter product name!' },
          { min: 2, message: 'Product name must be at least 2 characters!' }
        ]}
      >
        <Input 
          prefix={<ShoppingOutlined />}
          placeholder="Enter product name"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="price"
        label="Price"
        rules={[
          { required: true, message: 'Please enter price!' },
          { pattern: /^\$?\d+(\.\d{2})?$/, message: 'Please enter a valid price!' }
        ]}
      >
        <Input 
          prefix={<DollarOutlined />}
          placeholder="Enter price (e.g., $10.00)"
          size="large"
        />
      </Form.Item>
    </Form>
  );

  return (
    <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card style={{ maxWidth: 1200, margin: '0 auto', borderRadius: '12px' }}>
        {/* Header Section */}
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleReturn}
              size="large"
              style={{ marginRight: '16px' }}
            >
              Return
            </Button>
          </Col>
          <Col flex="auto" style={{ textAlign: 'center' }}>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <ShoppingOutlined style={{ marginRight: '8px' }} />
              Product Management System
            </Title>
            <Text type="secondary">Manage your products efficiently</Text>
          </Col>
          <Col>
            <div style={{ width: '100px' }}></div> {/* Spacer for centering */}
          </Col>
        </Row>

        <Divider />

        {/* Action Buttons */}
        <Row justify="center" style={{ marginBottom: '24px' }}>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
            >
              Add Product
            </Button>
            
          </Space>
        </Row>

        {/* Products Table */}
        <Table
          dataSource={products}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} products`,
          }}
          rowKey="key"
          bordered
          style={{ marginTop: '16px' }}
        />

        {/* Modal for Add/Edit Product */}
        <Modal
          title={
            <Space>
              {editingProduct ? <EditOutlined /> : <PlusOutlined />}
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </Space>
          }
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={closeModal}
          okText={editingProduct ? 'Update' : 'Add'}
          cancelText="Cancel"
          width={500}
          destroyOnClose
        >
          <ProductForm />
        </Modal>

        
       
      </Card>
    </div>
  );
}