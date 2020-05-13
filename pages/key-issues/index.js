import React from 'react'
import { getAllKeyIssueTypes} from '../../lib/api'
import MasterLayout from '../../components/masterlayout'
import {Card} from "antd"
import Link from 'next/link'

export default ({ keyIssues }) => (

  <MasterLayout>
     <Card title="Key Issues" bordered={false}>
        
      {keyIssues.map(issue => (

        <p>
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

export async function getStaticProps({ preview, previewData }) {
  const keyIssues = await getAllKeyIssueTypes(previewData)
  return {
    props: { keyIssues },
  }
}
