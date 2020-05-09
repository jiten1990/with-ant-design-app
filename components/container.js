import {Grid, Col, Row, Button } from "antd"

export default function Container({ children }) {
    return <div className="ant-layout-content">
        <Row>
            <Col span={20} offset={2}>{children}</Col>
        </Row>
    </div>
    //return <div classname="ant-col ant-col-8 ant-col-offset-2">{children}</div>
}
  