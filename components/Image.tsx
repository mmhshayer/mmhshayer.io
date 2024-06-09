import NextImage, { ImageProps } from 'next/image'
import siteMetadata from '@/data/siteMetadata'

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`${siteMetadata.siteUrl}/${src}`} {...rest} />
)

export default Image
