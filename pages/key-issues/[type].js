import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'
import { getKeyIssuesByType, getKeyIssuesCategoryBySlug, getAllKeyIssues } from '../../lib/api'
import MasterLayout from '../../components/masterlayout'
import SubContainer from '../../components/SubContainer'
import SidebarLink from '../../components/SidebarLink'
import {Col, Row, Card} from "antd"
import { RichText } from 'prismic-reactjs'


export default function keyissues({ keyIssues , issueCategory}) {
  const router = useRouter()
  if (!router.isFallback && !keyIssues) {
    return <ErrorPage statusCode={404} />
  }
  else{

    if(keyIssues){

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
                        
                      {keyIssues.map(issue => (
                        <ul>
                        <SidebarLink
                          active_slug={keyIssues[0].node._meta.uid}
                          key={issue.node._meta.id}
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
    else{
      return ("Loading.....")
    }
  }
}

  export async function getStaticProps({ params }) {
    let preview = {};

    const issueCategory = await getKeyIssuesCategoryBySlug(preview, params.type)
    if(issueCategory._meta.id){
      const keyIssues = await getKeyIssuesByType(preview, issueCategory._meta.id);
      return {
        props: { keyIssues, issueCategory },
      }
    }
    else{
      return {
        props : {},
      }
    }
  }
  
  export async function getStaticPaths() {

    const keyIssues = await getAllKeyIssues()

    // let staticpaths = [];
    
    // if(keyIssues){
    //     keyIssues.map(({node}) => {
    //         if(node._meta.uid){
    //             staticpaths.push(`/key-issues/${node.keyIssueCategory._meta.uid}/`)
    //         }
    //     })
    // }

    const paths = keyIssues.map(({node}) => {
       return { params: { type: node.keyIssueCategory._meta.uid } };
    });

    return {
        paths,
        fallback: true,
    }

  }
