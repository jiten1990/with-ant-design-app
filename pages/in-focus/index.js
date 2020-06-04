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
    Router.push('/in-focus?page='+pageNumber).then(() => window.scrollTo(0, 0));
  }

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }
  else{
    if(data){
        return (
          <p>Found {total} records</p>
        )
    }
    else{
      return ("Loading.....");
    }
  }

}

Infocus.getInitialProps = async ({query}) => {

  let current_page = query.page;

  try {
    
    let page = query.page ? (query.page-1) : 0;
    let limit = 7;
    let after  = base64.encode("arrayconnection:"+((page*limit)-1));
    const allInFocusMain = await getPaginatedInFocus(after, limit);
    const allInFocus = allInFocusMain.edges;
    const allInFocusTotal = allInFocusMain.totalCount;
  
    return {
      data: allInFocus ,
      total : allInFocusTotal ,
      current_page
    }
  } catch (error) {
    return {
      data: [],
      total : 0,
      current_page
    };
  }

  
}

export default Infocus