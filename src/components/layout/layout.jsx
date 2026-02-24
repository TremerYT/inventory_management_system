import React, { useState } from 'react';
import { Avatar, Badge, Button, Dropdown, Layout, Menu } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { items } from '../../utils/menu_items.jsx';
import ItemDropdown from '../ui/item_dropdown.jsx';
import ProfileDropDown from '../ui/profile_dropdown.jsx';

const { Sider, Header, Content } = Layout;

const PageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className="h-screen w-full overflow-hidden">
      <Sider
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className="border-r border-gray-200"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center py-6 shrink-0">
            <Avatar
              icon={<UserOutlined />}
              size={collapsed ? 40 : 64}
              className="transition-all duration-300"
            />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <Menu
              theme="light"
              mode="inline"
              items={items}
              selectedKeys={[location.pathname]}
              onClick={(item) => navigate(item.key)}
              style={{ borderRight: 0 }}
            />
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0 }}
          className="shadow-sm flex justify-between items-center px-4! relative z-10 bg-white!"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 48, height: 48 }}
          />
          <div className="flex items-center gap-6!">
            <Dropdown trigger="click" placement="bottomLeft" popupRender={() => <ItemDropdown />}>
              <Button type="primary" icon={<PlusCircleOutlined />}>
                Add New
              </Button>
            </Dropdown>
            <Badge count={2} size="small">
              <BellOutlined style={{ fontSize: 17 }} />
            </Badge>
            <SettingOutlined style={{ fontSize: 17 }} onClick={() => navigate('/settings')} />
            <Dropdown
              trigger="click"
              placement="bottomLeft"
              popupRender={() => <ProfileDropDown />}
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content className="overflow-y-auto p-6 bg-gray-100 h-full relative">
          <div className="mx-auto w-full flex flex-col">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
