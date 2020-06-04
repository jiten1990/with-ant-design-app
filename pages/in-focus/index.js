import ErrorPage from 'next/error'
import React from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { getPaginatedInFocus} from '../../lib/api'
import base64 from 'react-native-base64'

function Infocus() {

  const router = useRouter();  

  //let allInFocus = data.allInFocus;

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }
  else{
    if(data){
        return (
          <p>Found test records</p>
        )
    }
    else{
      return ("Loading.....");
    }
  }

}

// Infocus.getInitialProps = async ({query}) => {

//   let current_page = query.page;

//   try {
    
//     let page = query.page ? (query.page-1) : 0;
//     let limit = 7;
//     let after  = base64.encode("arrayconnection:"+((page*limit)-1));
//     const allInFocusMain = await getPaginatedInFocus(after, limit);
//     const allInFocus = allInFocusMain.edges;
//     const allInFocusTotal = allInFocusMain.totalCount;
  
//     return {
//       data: allInFocus ,
//       total : allInFocusTotal ,
//       current_page
//     }
//   } catch (error) {
//     return {
//       data: [],
//       total : 0,
//       current_page
//     };
//   }

  
// }

export default Infocus