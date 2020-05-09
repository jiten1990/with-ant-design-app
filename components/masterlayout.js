import Header from '../components/Header'
//import Footer from '../components/footer'
import Meta from '../components/meta'
import Container from '../components/container'
import { Layout } from 'antd';
const { Content, Footer } = Layout;

export default function MasterLayout({ preview, children }) {
  return (
    <Container>
      <Header></Header>
      <Meta />
      <Content style={{
            padding: 15,
            margin: 0,
            minHeight: 500,
          }}>
        <main>{children}</main>
      </Content>
      <Footer style={{ textAlign: 'center' }}>INC ©2020</Footer>
    </Container>
  )
}
