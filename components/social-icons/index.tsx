import {
  Mail,
  Facebook,
  Github,
  Huggingface,
  Instagram,
  Kaggle,
  Leetcode,
  Linkedin,
  Mastodon,
  Threads,
  Twitter,
  X,
  Youtube,
} from './icons'

const components = {
  mail: Mail,
  facebook: Facebook,
  github: Github,
  huggingface: Huggingface,
  instagram: Instagram,
  kaggle: Kaggle,
  leetcode: Leetcode,
  linkedin: Linkedin,
  mastodon: Mastodon,
  threads: Threads,
  twitter: Twitter,
  x: X,
  youtube: Youtube,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
