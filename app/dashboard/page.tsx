'use client';

import { useState, useEffect } from 'react';
import {
  BarChartOutlined,
  BellOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  RiseOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Sample data
  const projectStats = [
    { name: 'Total Projects', value: 24, change: '+4', icon: <FileOutlined /> },
    { name: 'Active Tasks', value: 76, change: '+12', icon: <CheckCircleOutlined /> },
    { name: 'Team Members', value: 12, change: '+2', icon: <TeamOutlined /> },
    { name: 'Completed', value: 128, change: '+28', icon: <CheckCircleOutlined /> }
  ];

  const recentActivities = [
    { title: 'Project Horizon launched', time: '2 hours ago', type: 'launch' },
    { title: 'Team meeting notes shared', time: '4 hours ago', type: 'notes' },
    { title: 'New feature deployment', time: 'Yesterday', type: 'deploy' },
    { title: 'Client presentation completed', time: 'Yesterday', type: 'present' }
  ];

  const upcomingTasks = [
    { title: 'Weekly planning session', deadline: 'Today, 2:00 PM', priority: 'high' },
    { title: 'Review design mockups', deadline: 'Today, 4:30 PM', priority: 'medium' },
    { title: 'Backend API integration', deadline: 'Tomorrow', priority: 'high' },
    { title: 'Team retrospective', deadline: 'May 18, 2025', priority: 'medium' }
  ];

  const projects = [
    { name: 'Project Alpha', progress: 85, color: '#4F46E5' },
    { name: 'Project Beta', progress: 68, color: '#0EA5E9' },
    { name: 'Project Gamma', progress: 42, color: '#10B981' },
    { name: 'Project Delta', progress: 16, color: '#F59E0B' }
  ];

  const navigation = [
    { name: 'Dashboard', icon: <DashboardOutlined />, id: 'dashboard' },
    { name: 'Projects', icon: <FileOutlined />, id: 'projects' },
    { name: 'Team', icon: <TeamOutlined />, id: 'team' },
    { name: 'Calendar', icon: <CalendarOutlined />, id: 'calendar' },
    { name: 'Reports', icon: <BarChartOutlined />, id: 'reports' },
    { name: 'Messages', icon: <MessageOutlined />, id: 'messages' },
    { name: 'Settings', icon: <SettingOutlined />, id: 'settings' }
  ];

  // Skeleton loader for cards
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-12 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative inset-y-0 left-0 bg-indigo-900 text-white transition-all duration-300 ease-in-out z-30 
          ${collapsed ? (mobileView ? 'w-0 -translate-x-full' : 'w-16') : 'w-64'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-indigo-800">
          {!collapsed && <h1 className="text-xl font-bold tracking-tight">Horizon</h1>}
          {collapsed && !mobileView && <h1 className="text-xl font-bold mx-auto">H</h1>}
        </div>
        
        {/* Navigation */}
        <nav className="mt-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200
                ${activeTab === item.id 
                  ? 'bg-indigo-800 text-white border-l-4 border-white' 
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
        
        {/* User Profile */}
        {!collapsed && (
          <div className="absolute bottom-0 w-full p-4 border-t border-indigo-800">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">MENO</p>
                <p className="text-xs text-indigo-200">Product Manager</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {collapsed ? <MenuUnfoldOutlined className="text-xl" /> : <MenuFoldOutlined className="text-xl" />}
            </button>
            
            <div className="ml-4 lg:ml-6 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchOutlined className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="py-1.5 pl-8 pr-4 w-36 lg:w-64 rounded-md bg-gray-100 focus:bg-white focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-indigo-600 relative">
              <BellOutlined className="text-xl" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <div className="h-8 w-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-medium lg:hidden">
              JD
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Meno!</h2>
            <p className="text-gray-600">Here's what's happening with your projects today.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {projectStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-4 lg:p-6 transition-all duration-200 hover:shadow-md"
              >
                {loading ? (
                  <SkeletonLoader />
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 text-sm">{stat.name}</span>
                      <span className={`flex items-center text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        <RiseOutlined className="mr-1" />
                        {stat.change} this week
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                        {stat.icon}
                      </div>
                      <span className="ml-4 text-3xl font-bold text-gray-800">{stat.value}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Progress */}
            <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Project Progress</h3>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">View All</button>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-6">
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{project.name}</span>
                          <span className="text-sm text-gray-500">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Upcoming Tasks</h3>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">View All</button>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="space-y-6">
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {upcomingTasks.map((task, index) => (
                      <div key={index} className="py-3">
                        <div className="flex items-start">
                          <div className={`mt-0.5 h-3 w-3 rounded-full flex-shrink-0 ${
                            task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{task.title}</p>
                            <p className="text-xs text-gray-500 flex items-center mt-1">
                              <ClockCircleOutlined className="mr-1" /> {task.deadline}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="mt-6 bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-700">Recent Activity</h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="space-y-6">
                  <SkeletonLoader />
                  <SkeletonLoader />
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex">
                        <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                          <FileOutlined />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}