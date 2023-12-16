import Link from 'next/link';

const IMAGE_NUMBER = 3;

const indexStyle = {
  width: '100vw',
  position: 'relative' as 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('/assets/photo/${Math.floor(Math.random() * IMAGE_NUMBER) + 1}.JPG')`,
  height: '100vh',
};

export default function Index() {
  return (
    <>
      <div className="min-h-screen" style={indexStyle} >
        <h3 className="text-3xl mb-3 leading-snug">
          <Link
            href="/blog"
          >
            Blog
          </Link>
        </h3>
      </div>
    </>
  )
}
