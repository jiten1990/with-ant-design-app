import ErrorPage from 'next/error'
import React from 'react'
import { getKeyIssuesByType, getAllKeyIssueTypes } from '../../lib/api'
import MasterLayout from '../../components/masterlayout'
import Listlayout from '../../components/Listlayout'
import {Col, Row} from "antd"

export default function keyissues({ keyIssues }) {
  if (!keyIssues) {
    return <ErrorPage statusCode={404} />
  }
  else{

    console.log(keyIssues, "keyissues");

    return (
      <MasterLayout>
  
        <Row>
  
          <Col span="16">
            {keyIssues.map(issue => (
              <Listlayout
                key={issue.node._meta.uid}
                title={issue.node.title}
                slug={issue.node._meta.uid}
                coverimage={issue.node.coverimage}
              />
            ))}
          </Col>
          <Col span="8">
              
          </Col>
  
        </Row>
    </MasterLayout>
    )
  }
  
}

// export default ({ keyIssues }) => (
  
//   <MasterLayout>

//       <Row>

//         <Col span="16">
//           {keyIssues.map(issue => (
//             <Listlayout
//               key={issue.node._meta.uid}
//               title={issue.node.title}
//               slug={issue.node._meta.uid}
//               coverimage={issue.node.coverimage}
//             />
//           ))}
//         </Col>
//         <Col span="8">
            
//         </Col>

//       </Row>
//   </MasterLayout>
// )

  export async function getStaticProps({ params }) {
    let preview = {};

    const keyIssues = await getKeyIssuesByType(preview, params.slug)
    console.log(keyIssues, "issue")
    return {
      props: { keyIssues },
    }
  }
  
  export async function getStaticPaths() {

    const keyIssues = await getAllKeyIssueTypes()
    return {
        paths: keyIssues?.map(({ node }) => `/key-issues/${node._meta.id}`) || [],
        fallback: true,
    }

  }
