import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 6

// interface PinnedProps {
//   posts: Post[]
// }

export default function Pinned({ posts }) {
  return (
    <>
      <h2 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Pinned
      </h2>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {!posts.length && <li>No pinned posts</li>}
        {posts.slice(0, MAX_DISPLAY).map((post) => (
          <li key={post.slug} className="">
            <article key={post.slug}>
              <div className="hover:bg-surface0 dark:hover:bg-surface0-dark flex h-full transform flex-col overflow-hidden rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md hover:border-primary-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-primary-500">
                <div className="flex grow flex-col space-y-3 p-4">
                  <div className="grow space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {post.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="flex flex-wrap">
                      {post.tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <p className="text-md prose max-w-none text-gray-600 dark:text-gray-400">
                      {post.summary}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2 p-4 text-sm">
                  <p>
                    <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
                  </p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  )
}
