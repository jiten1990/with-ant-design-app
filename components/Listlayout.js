import { RichText } from 'prismic-reactjs'
import {Card} from 'antd'

export default function ListLayout(
  {
    title,
    coverimage,
  }
) {
  return (
    <Card hoverable cover={<img alt="example" src={coverimage.url} />}>

      <RichText render={title} />

    </Card>
  )
}
