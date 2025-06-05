'use client';
import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Input,
  Select, 
  Tag,
  Rate,
  Badge,
  Button,
  Statistic
} from 'antd';
import { 
  ArrowLeftOutlined,
  ShoppingOutlined,
  EyeOutlined,
  DollarOutlined,
  InboxOutlined,
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  HeartOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

interface Product {
  key: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  image?: string;
  rating: number;
  reviews: number;
  discount?: number;
  createdAt: string;
}

const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Automotive'
];

export default function ProductDisplay() {
  const [products] = useState<Product[]>([
    {
      key: '1',
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with advanced camera system and titanium design',
      price: 999,
      category: 'Electronics',
      stock: 50,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/1890ff/ffffff?text=iPhone+15',
      rating: 4.8,
      reviews: 1250,
      discount: 10,
      createdAt: '2024-01-15'
    },
    {
      key: '2',
      name: 'Nike Air Max 270',
      description: 'Comfortable running shoes with air cushioning technology',
      price: 150,
      category: 'Sports',
      stock: 0,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Nike+Shoes',
      rating: 4.5,
      reviews: 890,
      createdAt: '2024-01-10'
    },
    {
      key: '3',
      name: 'MacBook Pro 16"',
      description: 'Powerful laptop for professionals with M3 chip',
      price: 2499,
      category: 'Electronics',
      stock: 25,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/4ecdc4/ffffff?text=MacBook',
      rating: 4.9,
      reviews: 567,
      discount: 5,
      createdAt: '2024-01-12'
    },
    {
      key: '4',
      name: 'Samsung 4K Smart TV',
      description: '65-inch OLED display with HDR and smart features',
      price: 1299,
      category: 'Electronics',
      stock: 15,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/45b7d1/ffffff?text=Samsung+TV',
      rating: 4.6,
      reviews: 423,
      discount: 15,
      createdAt: '2024-01-08'
    },
    {
      key: '5',
      name: 'Wireless Headphones',
      description: 'Premium noise-canceling wireless headphones',
      price: 299,
      category: 'Electronics',
      stock: 80,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/f39c12/ffffff?text=Headphones',
      rating: 4.4,
      reviews: 756,
      createdAt: '2024-01-05'
    },
    {
      key: '6',
      name: 'Designer T-Shirt',
      description: 'Premium cotton t-shirt with modern design',
      price: 45,
      category: 'Clothing',
      stock: 120,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=T-Shirt',
      rating: 4.2,
      reviews: 234,
      discount: 20,
      createdAt: '2024-01-03'
    },
    {
      key: '7',
      name: 'Gaming Console',
      description: 'Next-gen gaming console with 4K gaming support',
      price: 499,
      category: 'Electronics',
      stock: 35,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/9b59b6/ffffff?text=Console',
      rating: 4.7,
      reviews: 892,
      discount: 8,
      createdAt: '2024-01-20'
    },
    {
      key: '8',
      name: 'Coffee Maker',
      description: 'Automatic drip coffee maker with programmable timer',
      price: 89,
      category: 'Home & Garden',
      stock: 65,
      status: 'active',
      image: 'https://via.placeholder.com/300x300/2c3e50/ffffff?text=Coffee+Maker',
      rating: 4.3,
      reviews: 456,
      createdAt: '2024-01-18'
    }
  ]);

  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockProducts = products.filter(p => p.stock < 20 && p.stock > 0).length;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterProducts(value, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (search: string, category: string) => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All Categories') {
      filtered = filtered.filter(product => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'red';
    if (stock < 20) return 'orange';
    return 'green';
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (discount) {
      return price - (price * discount / 100);
    }
    return price;
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img
            alt={product.name}
            src={product.image || 'https://via.placeholder.com/300x200/cccccc/ffffff?text=No+Image'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {product.discount && (
            <Badge.Ribbon text={`-${product.discount}%`} color="red">
              <div />
            </Badge.Ribbon>
          )}
          {product.stock === 0 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}>
              Out of Stock
            </div>
          )}
        </div>
      }
      actions={[
        <EyeOutlined key="view" title="View Details" />,
        <HeartOutlined key="favorite" title="Add to Wishlist" />,
        <ShoppingCartOutlined 
          key="cart" 
          title={product.stock === 0 ? "Out of Stock" : "Add to Cart"} 
          style={{ color: product.stock === 0 ? '#ccc' : undefined }}
        />,
      ]}
    >
      <Card.Meta
        title={
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
              {product.name}
            </div>
            <Tag color="blue">{product.category}</Tag>
          </div>
        }
        description={
          <div>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', minHeight: '40px' }}>
              {product.description}
            </p>
            <div style={{ marginBottom: '12px' }}>
              <Rate disabled defaultValue={product.rating} style={{ fontSize: '14px' }} />
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>
                ({product.reviews} reviews)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {product.discount ? (
                  <div>
                    <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '12px' }}>
                      ${product.price.toLocaleString()}
                    </div>
                    <div style={{ color: '#f5222d', fontWeight: 'bold', fontSize: '18px' }}>
                      ${calculateDiscountedPrice(product.price, product.discount).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1890ff' }}>
                    ${product.price.toLocaleString()}
                  </div>
                )}
              </div>
              <Tag color={getStockColor(product.stock)} style={{ margin: 0 }}>
                {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
              </Tag>
            </div>
          </div>
        }
      />
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={product.image || 'https://via.placeholder.com/80x80/cccccc/ffffff?text=No+Image'}
            alt={product.name}
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
          />
          {product.discount && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#f5222d',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>
              -{product.discount}%
            </div>
          )}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{product.name}</h3>
              <Tag color="blue">{product.category}</Tag>
            </div>
            <div style={{ textAlign: 'right' }}>
              {product.discount ? (
                <div>
                  <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px' }}>
                    ${product.price.toLocaleString()}
                  </div>
                  <div style={{ color: '#f5222d', fontWeight: 'bold', fontSize: '20px' }}>
                    ${calculateDiscountedPrice(product.price, product.discount).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#1890ff' }}>
                  ${product.price.toLocaleString()}
                </div>
              )}
            </div>
          </div>
          
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
            {product.description}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div>
                <Rate disabled defaultValue={product.rating} style={{ fontSize: '14px' }} />
                <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>
                  ({product.reviews})
                </span>
              </div>
              <Tag color={getStockColor(product.stock)}>
                {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
              </Tag>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button icon={<EyeOutlined />} size="small">View</Button>
              <Button icon={<HeartOutlined />} size="small" />
              <Button 
                icon={<ShoppingCartOutlined />} 
                size="small" 
                type="primary"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Back Button */}
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => window.history.back()}
        type="text"
        size="large"
        style={{ marginBottom: '16px' }}
      >
        Back to Store
      </Button>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
          All Products
        </h1>
        <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
          Discover our complete collection of premium products
        </p>
      </div>

      {/* Statistics */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<ShoppingOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Available Now"
              value={activeProducts}
              prefix={<EyeOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Value"
              value={totalValue}
              prefix={<DollarOutlined style={{ color: '#faad14' }} />}
              precision={0}
              valueStyle={{ color: '#faad14' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Low Stock"
              value={lowStockProducts}
              prefix={<InboxOutlined style={{ color: lowStockProducts > 0 ? '#ff4d4f' : '#52c41a' }} />}
              valueStyle={{ color: lowStockProducts > 0 ? '#ff4d4f' : '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search products by name or description..."
              allowClear
              onSearch={handleSearch}
              style={{ width: '100%' }}
              prefix={<SearchOutlined />}
              size="large"
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryFilter}
              style={{ width: '100%' }}
              placeholder="Filter by category"
              size="large"
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button
                type={viewMode === 'card' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('card')}
                size="large"
              >
                Grid View
              </Button>
              <Button
                type={viewMode === 'list' ? 'primary' : 'default'}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode('list')}
                size="large"
              >
                List View
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <ShoppingOutlined style={{ fontSize: '64px', color: '#ccc', marginBottom: '16px' }} />
          <h3 style={{ color: '#999', marginBottom: '8px' }}>No products found</h3>
          <p style={{ color: '#ccc' }}>Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === 'card' ? (
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.key}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          {filteredProducts.map((product) => (
            <ProductListItem key={product.key} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}