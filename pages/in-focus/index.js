//import fetch from 'isomorphic-unfetch'
// import { Flex, Box } from 'reflexbox'
//import { useRouter } from 'next/router'
import { getAllKeyIssueTypes} from '../../lib/api'
import {Card} from "antd"
import MasterLayout from '../../components/masterlayout'
import Link from 'next/link'

function MoviesPage({ keyIssues }) {
    
    return (
      <MasterLayout>
        <Card title="Key Issues" bordered={false}>
            
          {keyIssues.map(issue => (

            <p key={issue.node._meta.uid}>
              <Link as={`/key-issues/${issue.node._meta.uid}`} href="/key-issues/[issue.node._meta.uid]">
                <a className="hover:underline">
                  {issue.node.category}
                </a>
              </Link>
            </p>
          ))}

          </Card>
      </MasterLayout>
    )
}

export async function getServerSideProps({ query: {page= 1}, previewData }) {
  const keyIssues = await getAllKeyIssueTypes(previewData)
  return {
    props: { keyIssues },
  }
}

export default MoviesPage
