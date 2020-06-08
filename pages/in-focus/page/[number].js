import Infocus from '../index'
import base64 from 'react-native-base64'
import { getPaginatedInFocus, allInFocussTotal} from '../../../lib/api'

const InfocsPageNumber = Infocus

export async function getStaticPaths() {

    const response = await allInFocussTotal();
    let pagesize = 7;
    let pages = [];
    let total_pages = Math.round(response/pagesize);
    let p = 1;
    while (total_pages > 0) {
        pages.push(p);
        total_pages--;
        p++;
    }  
    return {
        paths: pages.map((index) => ({
            params: { number: index.toString() },
        })),
        fallback: false,
    }
}


export async function getStaticProps({ params }) {

    let current_page = 1; 
    if(params && params.number){
      current_page = params.number;
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
export default InfocsPageNumber