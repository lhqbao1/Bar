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
        <div className='h-[90px] flex flex-row items-center'>
            <div className='px-[90px] flex flex-row justify-between items-center w-full'>
                <div className='flex gap-1 items-center relative'>
                    <Image
                        src={'/images/fav.png'}
                        height={32}
                        width={32}
                        alt=''
                        className='size-8'
                    />
                    <p className="font-negra text-[28px] absolute top-0 inline-block w-[200px] left-9">
                        Velvet Pour
                    </p>
                </div>
                <div className='flex flex-row items-center gap-12 font-light text-sm'>
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