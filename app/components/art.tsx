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

    // // Refresh ScrollTrigger on window load
    // useEffect(() => {
    //     const handleLoad = () => ScrollTrigger.refresh();
    //     window.addEventListener('load', handleLoad);

    //     return () => window.removeEventListener('load', handleLoad);
    // }, []);

    // Initialize GSAP and SplitType for animations
    useGSAP(() => {
        const titleSplit = new SplitType('#art-title', { types: 'chars' });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start: 'top 80%',
                end: 'bottom top',
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

        // 👉 Refresh ngay sau khi SplitType kết thúc (vì nó thay đổi DOM)
        ScrollTrigger.refresh();

        return () => titleSplit.revert();
    }, []);

    // GSAP animation for the mask image and fade content
    useGSAP(() => {
        const image = document.querySelector('#art-mask-section .mask-image') as HTMLImageElement;
        if (image && !image.complete) {
            image.addEventListener('load', () => initPin());
        } else {
            initPin();
        }

        function initPin() {
            const maskTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#art',
                    start: 'bottom 95%',
                    end: 'bottom center',
                    scrub: 1.5,
                    pin: true,
                }
            });

            maskTimeline
                .to('.will-fade', {
                    opacity: 0,
                    stagger: 1,
                    ease: 'power1.in'
                })
                .to('.mask-image', {
                    scale: 1.3,
                    maskPosition: 'center',
                    maskSize: '500%',
                    duration: 2,
                    borderRadius: 20,
                    ease: 'linear'
                })
                .to('.fade-content', {
                    opacity: 1,
                    duration: 1,
                    ease: 'back'
                });

            ScrollTrigger.refresh();
        }
    }, []);

    return (
        <div id="art" className='relative px-30 flex flex-col items-center min-h-dvh radial-gradient' style={{
            background: 'radial-gradient(50% 50% at 50% 50%, #202020 0%, #000000 100%)'
        }}>
            <h1
                id='art-title'
                className='text-center text-[300px] tracking-tight will-change-transform will-fade'
            >
                The ART
            </h1>
            <div id='art-mask-section' className='absolute bottom-10 flex flex-col items-center gap-30' >
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
                    className='mask-image scale-120'
                />
                <div className='flex flex-col gap-4 fade-content opacity-0 items-center justify-center'>
                    <h2 className='text-5xl font-negra font-bold'>Made with Craft - Poured with Passion</h2>
                    <p className='text-sm font-light'>This is not a drink. It is a carefully crafted moment made just for you</p>
                </div>
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
            <h2 className='absolute bottom-0 text-6xl font-negra font-bold will-fade'>Sip-Worthy Perfection</h2>

        </div>
    )
}

export default Art