export default function imageLoader({
    src,
    width,
    quality,
  }: {
    src: string
    width: number
    quality?: number
  }) {
    // const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
    return src.startsWith('/') ? src.substring(1) : `${src}`
  }