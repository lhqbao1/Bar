'use client'
import { featureLists, goodLists } from '@/data/data'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import { useGSAP } from '@gsap/react'
import { useScrollTriggerRefresh } from '@/hook/refresh'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const Art = () => {
    useScrollTriggerRefresh();

    // Initialize GSAP and SplitType for animations
    useGSAP(() => {
        const titleSplit = new SplitType('#art-title', { types: 'chars' });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start: 'top 80%',
                end: 'bottom top',
                markers: true,
            }
        });

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
            }, "<");

        return () => titleSplit.revert();
    }, []);

    // GSAP animation for the mask image and fade content
    useGSAP(() => {

        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start: 'bottom 90%',
                end: 'bottom center',
                scrub: 1.5,
                pin: true,
            }
        });

        maskTimeline
            .to('.will-fade', {
                opacity: 0,
                stagger: 0.5,
                ease: 'power1.in'
            })
            .to('.mask-image', {
                scale: 1.3,
                maskPosition: 'center',
                maskSize: '500%',
                duration: 2,
                borderRadius: 20,
                ease: 'back.in'
            })
            .to('.fade-content', {
                opacity: 1,
                duration: 1,
                ease: 'back'
            });
    }, []);


    return (
        <div id="art" className='relative px-30 flex flex-col items-center' style={{
            background: 'radial-gradient(50% 50% at 50% 50%, #202020 0%, #000000 100%)'
        }}>
            <h1
                id='art-title'
                className='text-center text-[300px] tracking-tight will-change-transform will-fade'
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
                    className='mask-image'
                />
            </div>
            <div className='flex flex-row justify-between w-full will-fade'>
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
            <h2 className='text-6xl font-negra font-bold xl:mt-40 will-fade'>Sip-Worthy Perfection</h2>
            <div className='flex flex-col gap-4 fade-content opacity-0 items-center justify-center'>
                <h2 className='text-5xl font-negra font-bold'>Made with Craft - Poured with Passion</h2>
                <p className='text-sm font-light'>This is not a drink. It is a carefully crafted moment made just for you</p>
            </div>
        </div>
    )
}

export default Art