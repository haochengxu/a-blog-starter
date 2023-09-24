const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function imageLoader({
    src,
    width,
    quality,
  }: {
    src: string
    width: number
    quality?: number
  }) {
    return `${prefix}${src}`
  }