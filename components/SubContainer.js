import {Col, Row } from "antd"

export default function SubContainer({ children }) {
    return <div className="SubContainerWrap">
        <Row>
            <Col span={14} offset={5}>
                {children}
            </Col>
        </Row>
    </div>
}