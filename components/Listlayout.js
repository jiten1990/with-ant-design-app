import Container from './container'
import { RichText } from 'prismic-reactjs'
import Image from './image'
import Link from 'next/link'
import {Card} from 'antd'
const { Meta } = Card;

export default function ListLayout(
  {
    title,
    coverimage,
    slug
  }
) {
  return (
    <Card hoverable cover={<img alt="example" src={coverimage.url} />}>

      <RichText render={title} />

      {/* <Link as={`/posts/${type_id}/${slug}`} href="/key-issues/[type_id]/[slug]">
        <a className="hover:underline">
          <RichText render={title} />
        </a>
      </Link> */}

    </Card>
  )
}
