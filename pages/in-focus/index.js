import React from 'react'
import { getPaginatedInFocus} from '../../lib/api'


function Infocus() {

  
        return (
            <div>Testing</div>
        )

}

Infocus.getInitialProps = async ({query}) => {

  try {
    let current_page = query.page;
    let page = query.page ? (query.page-1) : 0;
    let limit = 7;
    //let after  = base64.encode("arrayconnection:"+((page*limit)-1));
    let after  = 'YXJyYXljb25uZWN0aW9uOjY=';
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