import React from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import MasterLayout from '../../components/masterlayout'
import { getPaginatedInFocus} from '../../lib/api'
import base64 from 'react-native-base64'
import {Card, Pagination, Row, Col} from "antd"
import { RichText } from 'prismic-reactjs'

//function Infocus({data, total, current_page}) {

const Infocus  = props => (

  <MasterLayout>
    <div>Testing</div> 
  </MasterLayout>

)

Infocus.getInitialProps = async ({query}) => {

  try {
    let current_page = query.page;
    let page = query.page ? (query.page-1) : 0;
    let limit = 7;
    let after  = base64.encode("arrayconnection:"+((page*limit)-1));
    //let after = "YXJyYXljb25uZWN0aW9uOjY=";
    const allInFocusMain = await getPaginatedInFocus(after, limit);
    const allInFocus = allInFocusMain.edges;
    const allInFocusTotal = allInFocusMain.totalCount;
  
    return {
      data: { allInFocus },
      total : {allInFocusTotal },
      current_page : {current_page}
    }
  } catch (error) {
    return {
      data: { },
      total : { },  
      current_page : { }
    };
  }

  
}

export default Infocus