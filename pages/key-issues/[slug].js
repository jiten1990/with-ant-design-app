import React from 'react'
import { getKeyIssuesByType, getPostAndMorePosts, getAllKeyIssueTypes } from '../../lib/api'
import MasterLayout from '../../components/masterlayout'
import Listlayout from '../../components/Listlayout'
import {Grid, Col, Row, Card} from "antd"

export default ({ keyIssues }) => (
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

  export async function getStaticProps({ params }) {
    let preview = {};

    const keyIssues = await getKeyIssuesByType(preview, params.slug)
    
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
