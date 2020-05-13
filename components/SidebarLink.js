import Link from 'next/link'

export default function ListLayout(
  {
    title,
    slug,
    category_slug,
    category,
    active_slug
  }
) {

  return (
      <li className={active_slug == slug ? 'active' : ''}> 
        {/* <RichText render={title} /> */}
        {/* <Link as={`/key-issues`} href="/key-issues"> */}
        <Link as={`/key-issues/${category_slug}/${slug}`} href="/key-issues/[category_slug]/[slug]">
          <a className="hover:underline">
              <div className="post-link-wrap">
                  <span className="link-title">{title[0].text}</span>
                  <span className="link-category">{category}</span>
              </div>
          </a>
        </Link>
      </li>
  )
}
