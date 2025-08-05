'use client'
import { navLinks } from '@/data/data'
import Image from 'next/image'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from "gsap/SplitText";
import Link from 'next/link'
gsap.registerPlugin(SplitText);


const NavBar = () => {
    const buttonRefs = useRef<(HTMLSpanElement | null)[]>([]) // store refs in an array
    const underlineRefs = useRef<(HTMLSpanElement | null)[]>([])

    const HoverButton = (index: number) => {
        const underline = underlineRefs.current[index]
        gsap.to(underline, {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
        })
    }

    // Optional: revert on mouse leave
    const LeaveButton = (index: number) => {
        const underline = underlineRefs.current[index]
        gsap.to(underline, {
            scaleX: 0,
            duration: 0.5,
            ease: 'power2.out',
        })
    }

    return (
        <div className='sm:h-[90px] h-[130px] flex flex-row items-center'>
            <div className="flex w-full flex-col gap-3 items-center justify-center sm:flex-row sm:justify-between sm:px-[90px]">
                {/* Logo */}
                <div className='flex gap-1 items-center relative'>
                    <Image
                        src={'/images/fav.png'}
                        height={32}
                        width={32}
                        alt=''
                        className='size-8'
                    />
                    <p className="inline-block pt-2 sm:absolute sm:top-0 sm:left-9 sm:w-[200px] sm:pt-0 font-negra text-[28px] text-white">
                        Velvet Pour
                    </p>
                </div>
                {/* Nav's links */}
                <div className='flex flex-row items-center gap-12 text-sm font-medium sm:font-light text-white'>
                    {navLinks.map((item, index) => {
                        return (
                            <div
                                ref={el => { buttonRefs.current[index] = el }} // assign ref
                                onMouseEnter={() => HoverButton(index)}
                                onMouseLeave={() => LeaveButton(index)}
                                key={index}
                                className='relative'
                            >
                                <Link
                                    href={"localhost:3000"}
                                    className="transition-all"
                                >
                                    {item.title}
                                </Link>
                                <span
                                    ref={el => { underlineRefs.current[index] = el }}
                                    className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-white origin-left scale-x-0"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NavBar