import Link from 'next/link'

let max = 3, min = 1;

const indexStyle = {
  backgroundImage: `url('/assets/photo/${Math.floor(Math.random() * (max - min + 1) + min)}.JPG')`,
  height: '100vh',
  width: '100vw',
  position: 'relative' as 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

export default function Index() {
  return (
    <>
      <div className="min-h-screen" style={indexStyle} >
        <h3 className="text-3xl mb-3 leading-snug">
          <Link
            href="/blog"
            className="hover:underline"
          >
            Blog
          </Link>
        </h3>
      </div>
    </>
  )
}
