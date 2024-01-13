// pages/play-lab.tsx 或 pages/play-lab/index.tsx

import React from 'react'
import Link from 'next/link'

const PlayLab = () => {
    return (
        <div>
            <h1>Welcome to PlayLab!</h1>
            <Link href="/projects/tiny">
                Go to Project Tracker
            </Link>
        </div>
    )
}

export default PlayLab