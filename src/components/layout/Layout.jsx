import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { FlashAuto } from '@material-ui/icons';

import './layout.css';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutApp(props) {
  const { children } = props;
  const navigation = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [marginLeft, setMarginLeft] = useState('220');
  const [current, setCurrent] = useState('mail');

  let keyMenu;
  let tmp = window.location.pathname;
  let tmpArr = tmp.split('/');
  keyMenu = `/${tmpArr[1]}`;
  console.log('key ', keyMenu, ', ', tmpArr);

  // Co giãn nav-bar
  const onCollapse = (collapse, type) => {
    // console.log("co:"+collapse+", type: "+type);
    setCollapsed(collapse);
    if (collapse) {
      setMarginLeft('100');
    } else {
      setMarginLeft('220');
    }
  };

  console.log('location ', [window.location.pathname]);
  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setCurrent(event.key);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigation('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 2,
        }}
      >
        {/* <div className="logo" /> */}

        <Menu theme="dark" mode="inline" selectable={false} selectedKeys={[keyMenu]}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="/rooms" icon={<FileOutlined />}>
            <NavLink to="/rooms">Rooms</NavLink>
          </Menu.Item>
          <Menu.Item key="/devices" icon={<DesktopOutlined />}>
            <NavLink to="/devices">Devices</NavLink>
          </Menu.Item>
          <Menu.Item key="/meter_powers" icon={<FlashAuto />}>
            <NavLink to="/meter-power">Power Consumption</NavLink>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            <NavLink to="/profile">Profile</NavLink>
          </Menu.Item>
          <Menu.Item key="/test" icon={<SettingOutlined />}>
            <NavLink to="/test">Test</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, position: 'sticky', top: 0, zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '20px',
              marginTop: '0px',
            }}
          >
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              <SubMenu
                key="SubMenu"
                icon={
                  <IconButton aria-label="settings" onClick={handleClick}>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </IconButton>
                }
                // title="Navigation Three - Submenu"
                style={{ background: 'none !important' }}
              >
                <Menu.Item key="setting:1" onClick={handleLogout}>
                  Log out
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Header>
        <Content style={{ margin: '0 16px', marginLeft: `${marginLeft}px` }}>
          <Breadcrumb style={{ margin: '8px 0' }}>
            <Breadcrumb.Item> </Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <h3>Smart Home</h3>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
