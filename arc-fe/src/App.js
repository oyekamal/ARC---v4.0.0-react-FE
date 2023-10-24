import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Card, Layout, theme } from 'antd';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Devices from './components/Devices/Devices';
const { Content, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Devices', '1', <PieChartOutlined />),
  getItem('Relay Group', '2', <DesktopOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // Fetch device data from the API when the component mounts
    fetch('http://127.0.0.1:8000/device/')
      .then((response) => response.json())
      .then((data) => setDeviceData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} items={items} />
      <Layout>
        <Navbar />
        <Card style={{ margin: '0 16px' }}>
        <Devices/>
        </Card>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
