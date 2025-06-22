import Image from 'next/image'
import React from 'react'

const BackGroundNoise = () => {
    return (
        <>
            <Image
                src="/images/noise.png"
                alt=""
                height={2000}
                width={2000}
                className="absolute w-5/6 h-full object-cover init-0 opacity-100 mix-blend-screen mask-fade-circle z-1"
            />
            <div className="absolute w-5/6 h-5/6 glow-circle pointer-events-none mix-blend-screen init-0 z-1" />
        </>
    )
}

export default BackGroundNoise