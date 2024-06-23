import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Pinned from '@/components/Pinned'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import LatestPosts from '@/components/LatestPosts'

const MAX_DISPLAY = 5

const sortedPosts = sortPosts(allBlogs)
const posts = allCoreContent(sortedPosts)
const pinnedPosts = posts.filter((post) => post.pinned)

export default function Home({ posts }) {
  return (
    <>
      {pinnedPosts.length > 0 && <Pinned posts={pinnedPosts} />}
      <LatestPosts posts={posts} />
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
