'use client'
import React, { useEffect, useState } from 'react'
import BackGroundNoise from './background-noise'
import { sliderLists } from '@/data/data'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const Menu = () => {
    // useScrollTriggerRefresh()
    const [currentItem, setCurrentItem] = useState(0)

    useEffect(() => {
        const tl = gsap.timeline()

        tl
            .fromTo('.menu-item__name',
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 0.6, ease: "back.out" }
            )
            .fromTo('.menu-item__sub',
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 1, ease: "back.out" },
                "<"
            )
            .fromTo('.menu-item__title',
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 1, ease: "back.out" },
                "<"
            )
            .fromTo('.menu-item__des',
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 1, ease: "back.out" },
                "<"
            )
            .fromTo('.menu-image',
                { opacity: 0, x: -200, scale: 0 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power1.in", scale: currentItem === 1 ? 0.75 : 1, },
                "<"
            )
    }, [currentItem])

    useEffect(() => {
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top top',
                end: '+=1000',
                scrub: true,
                // pin: true,
                // anticipatePin: 1
            }
        })

        scrollTl
            .to("#left-leaf-menu", {
                y: 500
            })
            .to("#right-leaf-menu", {
                y: -500
            }, "<")
    }, [])

    return (
        <div id="menu" className='relative px-30 xl:mt-20 py-10 min-h-screen flex flex-col justify-between items-center'>
            <BackGroundNoise />
            <Image
                src={sliderLists[currentItem].image}
                height={800}
                width={500}
                alt=""
                className={`absolute ${currentItem === 1 ? 'scale-75 bottom-[100px]' : 'bottom-[200px]'} menu-image`}
            />
            <Image
                src="/images/slider-left-leaf.png"
                alt=""
                height={325}
                width={325}
                className='absolute left-0 top-0 object-cover w-[200px]'
                id="left-leaf-menu"
            />
            <Image
                src="/images/slider-right-leaf.png"
                alt=""
                height={325}
                width={325}
                className='absolute right-0 bottom-0 w-[200px] object-cover'
                id="right-leaf-menu"
            />
            <div className='menu-nav w-full flex flex-row gap-16 justify-center items-center'>
                {sliderLists.map((item, index) => {
                    return (
                        <div key={index} className='relative z-1 cursor-pointer menu-nav-button' onClick={() => {
                            setCurrentItem(index);
                            console.log(item)
                        }}>
                            <div className={`z-1 font-negra  text-4xl px-4 ${currentItem === index ? 'text-white' : 'text-gray-600'} `}>{item.name}</div>
                            <div className={`absolute -bottom-1 w-full h-[1px]  ${currentItem === index ? 'bg-white' : 'bg-gray-600'}`}></div>
                        </div>
                    )
                })}
            </div>
            <div className='w-full'>
                <div className='absolute left-16 xl:top-1/3'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-negra text-3xl z-1 xl:max-w-15'>{currentItem === 0 ? sliderLists[sliderLists.length - 1].name : sliderLists[currentItem - 1].name}</h2>
                        <Image
                            src={'/images/right-arrow.png'}
                            height={50}
                            width={50}
                            alt=''
                            className='cursor-pointer'
                            onClick={() => setCurrentItem(currentItem === 0 ? sliderLists.length - 1 : currentItem - 1)}
                        />
                    </div>
                </div>
                <div className='absolute right-16 xl:top-1/3'>
                    <div className='flex flex-col gap-4 items-end'>
                        <h2 className='font-negra text-3xl z-1 xl:max-w-30 text-right'>{currentItem === 3 ? sliderLists[0].name : sliderLists[currentItem + 1].name}</h2>
                        <Image
                            src={'/images/left-arrow.png'}
                            height={50}
                            width={50}
                            alt=''
                            className='cursor-pointer'
                            onClick={() => setCurrentItem(currentItem === 3 ? 0 : currentItem + 1)}
                        />
                    </div>
                </div>
            </div>
            <div className='menu-item-container flex flex-col items-center h-full w-full'>
                <div className='absolute xl:bottom-50  flex flex-row justify-between z-1 w-full xl:px-30 items-end'>
                    <div className='menu-item-name flex flex-col gap-2'>
                        <p className='menu-item__sub text-sm font-light'>Recipes for:</p>
                        <h2 className='menu-item__name font-negra text-5xl' style={{ color: 'rgba(231, 211, 147, 1)' }}>{sliderLists[currentItem].name}</h2>
                    </div>
                    <div className='menu-item-name flex flex-col gap-2 xl:max-w-[440px]'>
                        <p className='menu-item__title text-5xl font-negra' style={{ color: 'rgba(231, 211, 147, 1)' }}>{sliderLists[currentItem].title}</p>
                        <h2 className='menu-item__des text-sm font-light leading-6'>{sliderLists[currentItem].description}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu