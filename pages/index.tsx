import Link from 'next/link';
import { useState, useEffect } from 'react';

const IMAGE_NUMBER = 3;

const indexStyle = {
  width: '100vw',
  position: 'relative' as 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
};

const blurStyle = {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
}

export default function Index() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(`url('/assets/photo/${Math.floor(Math.random() * IMAGE_NUMBER) + 1}.JPG')`);
  }, []);

  return (
    <>
      <div className="min-h-screen" style={{...indexStyle, backgroundImage}} >
        <h3 className="text-3xl mb-3 leading-snug">
          <div className="pt-10 pl-5  pb-5 rounded" style={blurStyle}>
            <Link href="/blog" className="text-orange-500 hover:text-orange-700">
              Blog
            </Link>
            <br />
            <Link href="/play-lab" className="text-green-500 hover:text-green-700">
              PlayLab
            </Link>
          </div>
        </h3>
      </div>
    </>
  )
}
