'use client'
import { featureLists, goodLists } from '@/data/data'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import { useGSAP } from '@gsap/react'

const Art = () => {
    useGSAP(() => {
        const titleSplit = new SplitType('#art-title', { types: 'chars' })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start: 'top 80%',
                end: 'bottom top',
                markers: true,
            }
        })

        timeline
            .from(titleSplit.chars, {
                y: 100,
                opacity: 0,
                stagger: { each: 0.1 },
                duration: 0.8,
                ease: "back",
            })
            .from('.art-features', {
                x: -100,
                opacity: 0,
                stagger: { each: 0.2 },
                duration: 1,
                ease: 'back.in'
            }, "-=2")
            .from('.art-goods', {
                x: 100,
                opacity: 0,
                stagger: { each: 0.2 },
                duration: 1,
                ease: 'back.in'
            }, "<")

        return () => {
            titleSplit.revert();
        }
    }, [])
    return (
        <div id="art" className='relative px-30 flex flex-col items-center' style={{
            background: 'radial-gradient(50% 50% at 50% 50%, #202020 0%, #000000 100%)'
        }}>
            <h1
                id='art-title'
                className='text-center text-[300px] tracking-tight will-change-transform'
            >
                The ART
            </h1>
            <div className='absolute xl:top-[250px]'>
                <Image
                    src={'/images/under-img.jpg'}
                    height={800}
                    width={600}
                    alt=''
                    style={{
                        WebkitMaskImage: "url('/images/mask-img.png')",
                        maskImage: "url('/images/mask-img.png')",
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center'
                    }}
                />
            </div>
            <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-col gap-4'>
                    {featureLists.map((item, index) => {
                        return (
                            <div key={index} className='art-features flex flex-row gap-2 items-center'>
                                <BadgeCheck fill='white' color='black' />
                                <p className='font-light'>{item}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-col gap-4'>
                    {goodLists.map((item, index) => {
                        return (
                            <div key={index} className='art-goods flex flex-row gap-2 items-center'>
                                <BadgeCheck fill='white' color='black' />
                                <p className='font-light'>{item}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <h2 className='text-6xl font-negra font-bold xl:mt-40'>Sip-Worthy Perfection</h2>
        </div>
    )
}

export default Art