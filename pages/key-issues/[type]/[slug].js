import ErrorPage from 'next/error'
import React from 'react'
import { getKeyIssuesBySlug, getAllKeyIssues, getKeyIssuesCategoryBySlug, getKeyIssuesByType } from '../../../lib/api'
import MasterLayout from '../../../components/masterlayout'
import SubContainer from '../../../components/SubContainer'
import SidebarLink from '../../../components/SidebarLink'
import {Col, Row, Card} from "antd"
import { RichText } from 'prismic-reactjs'

export default function keyissues({ keyIssues , issueCategory, keyIssuesAll}) {
  if (!keyIssues) {
    return <ErrorPage statusCode={404} />
  }
  else{

    return (
      <MasterLayout>
        <SubContainer>
          <Row>
            <Col span="20">
              <Card>
                <Row>
                  <Col span="19">
                      <div className="post-banner">
                          <img alt={keyIssues[0].node.title} src={keyIssues[0].node.coverimage.url} />
                      </div>
                      <div className="post-title">
                          <RichText render={keyIssues[0].node.title} />
                      </div>
                      <RichText render={keyIssues[0].node.content} />
                  </Col>  
                </Row>
              </Card>  
            </Col>
            <Col span="8" className="sideBarPositioned">

              <div className="sideBarWrap">

                  <h1 className="text-center">{issueCategory.category}</h1>

                  <div className="keyissuesBoxWrap">
                    
                    {keyIssuesAll.map(issue => (
                      <ul>
                      <SidebarLink
                        active_slug={keyIssues[0].node._meta.uid}
                        key={issue.node._meta.uid}
                        title={issue.node.title}
                        slug={issue.node._meta.uid}
                        category_slug={issue.node.keyIssueCategory._meta.uid}
                        category={issue.node.keyIssueCategory.category}
                      />
                      </ul>
                    ))}  

                  </div>  

               </div>   

            </Col>
    
          </Row>
      </SubContainer>  
    </MasterLayout>
    )
  }
  
}

  export async function getStaticProps({ params }) {
    let preview = {};
    const issueCategory = await getKeyIssuesCategoryBySlug(preview, params.type)

    if(issueCategory._meta.id){
      const keyIssues = await getKeyIssuesBySlug(preview, params.slug)
      const keyIssuesAll = await getKeyIssuesByType(preview, issueCategory._meta.id)
      return {
        props: { keyIssues, issueCategory, keyIssuesAll },
      }
    }
    else{
      return {
        props : {},
      }
    }
  }
  
  export async function getStaticPaths() {

    let staticpaths = [];

    const keyIssues = await getAllKeyIssues();
    
    if(keyIssues){
        keyIssues.map(({node}) => {
            if(node){
                staticpaths.push(`/key-issues/${node.keyIssueCategory._meta.uid}/${node._meta.uid}`)
            }
        })
    }

    return {
        paths: staticpaths,
        fallback: true,
    }

  }
