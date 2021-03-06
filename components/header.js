import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link'

export default function Header() {

  return (

    <div>
      
      <Menu  mode="horizontal">
          <Menu.Item key="home" icon={<MailOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="key-issues" icon={<AppstoreOutlined />}>
            <Link as={`/key-issues`} href="/key-issues">
              <a className="hover:underline">
                Key Issues
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="in-focus" icon={<MailOutlined />}>
            <Link as={`/in-focus`} href="/in-focus">
              <a className="hover:underline">
                In Focus
              </a>
            </Link>
          </Menu.Item>
          {/* <SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu> */}
          {/* <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
            </a>
          </Menu.Item> */}
        </Menu>
     </div>   
  )
}