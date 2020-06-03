import React from 'react'
import { getPaginatedInFocus} from '../../lib/api'
import MasterLayout from '../../components/masterlayout'
import {Card, Pagination, Row, Col} from "antd"
import { RichText } from 'prismic-reactjs'

function Page({data, total, current_page}) {

    console.log(data, "data");

    let allInFocus = data.allInFocus;        

    return (
        <MasterLayout>
            
            <p>Found {total.allInFocusTotal} records</p>

            <Card title="In Focus" bordered={false}>
            <Row>
            {allInFocus.map(infocus => (
                <Col key={infocus.node._meta.id} span={8}>
                    <div className="infocusListWrap">
                    <div className="post-banner">
                        <img alt={infocus.node.title} src={infocus.node.banner.url} />
                    </div>
                    <div>
                        <RichText render={infocus.node.title} />
                    </div>
                    </div>  
                </Col>  
            ))}        
            </Row>
            </Card>

            <Pagination defaultCurrent={current_page.current_page} total={total.allInFocusTotal} />  

        </MasterLayout>
    )
}

Page.getInitialProps = async ({query}) => {

    try {
        
      let current_page = query.page;
      let page = query.page ? (query.page-1) : 0;
      let limit = 7;
      //let after  = base64.encode("arrayconnection:"+((page*limit)-1));
      let after = "YXJyYXljb25uZWN0aW9uOjY=";
      const allInFocusMain = await getPaginatedInFocus(after, limit);
      const allInFocus = allInFocusMain.edges;
      const allInFocusTotal = allInFocusMain.totalCount;

      console.log(allInFocus, "all focus");
    
      return {
        data: { allInFocus },
        total : {allInFocusTotal },
        current_page : {current_page}
      }
    } catch (error) {

        console.log("error");

      return {
        data: { },
        total : { },  
        current_page : { }
      };
    }
  
    
  }

export default Page