import React, { useState } from 'react';
import {Layout, Menu} from 'antd';
const {Sider } = Layout;


const Sidebar = ({
    collapsed,
    setCollapsed,
    items,
}) => {

    return (

        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>

    );
};
export default Sidebar;