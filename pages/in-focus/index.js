import ErrorPage from 'next/error'
import React from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import MasterLayout from '../../components/masterlayout'
import { getPaginatedInFocus} from '../../lib/api'
import base64 from 'react-native-base64'
import {Card, Pagination, Row, Col} from "antd"
import { RichText } from 'prismic-reactjs'

function Infocus({data, total, current_page}) {

  const router = useRouter();  
  //let allInFocus = data.allInFocus;
  
  function onChange(pageNumber) {
    Router.push('/in-focus/page/'+pageNumber).then(() => window.scrollTo(0, 0));
  }

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }
  else{
    if(data){
        return (
          <MasterLayout>
      
              <p>Found {total} records</p>
      
              <Card title="In Focus" bordered={false}>
              <Row>
                {data.map(infocus => (
                    <Col span={8}>
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
        
              <Pagination onChange={onChange} defaultCurrent={current_page} total={total} />  
      
          </MasterLayout>
        )
    }
    else{
      return ("Loading.....");
    }
  }

}

export async function getStaticProps({ params }) {

    let current_page = 1; 
    if(params && params.page){
      current_page = params.page;
    }
    let page = current_page-1;
    let limit = 7;
    let after  = base64.encode("arrayconnection:"+((page*limit)-1));
    const allInFocusMain = await getPaginatedInFocus(after, limit);
    const allInFocus = allInFocusMain.edges;
    const allInFocusTotal = allInFocusMain.totalCount;
  
    return { 
      props: { 
        data: allInFocus,
        total : allInFocusTotal,
        current_page
      },
    }
  
}

export default Infocus