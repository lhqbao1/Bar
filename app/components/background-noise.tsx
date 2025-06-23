import Image from 'next/image'
import React from 'react'
import { cn } from "@/utils/cn";

const BackGroundNoise = ({ size, className }: { size?: string, className?: string }) => {
    return (
        <>
            <Image
                src="/images/noise.png"
                alt=""
                height={2000}
                width={2000}
                className={cn(`absolute w-5/6 ${size === "xl" ? 'h-3/4' : 'h-full'} object-cover init-0 opacity-100 mix-blend-screen mask-fade-circle z-1`, className)}
            />
            <div className={`absolute w-5/6 h-5/6 glow-circle pointer-events-none mix-blend-screen init-0 z-1`} />
        </>
    )
}

export default BackGroundNoise