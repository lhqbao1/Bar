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
        const mm = gsap.matchMedia();

        mm.add({
            // Cập nhật breakpoint giống như bạn mô tả
            isMobile: "(max-width: 767px)", // mobile
            isLaptop: "(min-width: 768px) and (max-width: 1439px)", // laptop
            isDesktop: "(min-width: 1440px)", // desktop
        }, (context) => {
            const { isMobile, isLaptop } = context.conditions ?? {};

            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#menu',
                    start: 'top 30%',
                    end: '+=1000',
                    scrub: true,
                }
            });

            scrollTl
                .to("#left-leaf-menu", {
                    y: isMobile ? -400 : isLaptop ? 400 : 500
                })
                .to("#right-leaf-menu", {
                    y: isMobile ? 400 : isLaptop ? -400 : -500
                }, "<");

            return () => {
                scrollTl.kill(); // cleanup khi media query thay đổi hoặc component unmount
            };
        });

        return () => {
            mm.revert(); // revert toàn bộ media query context
        };
    }, []);


    return (
        <div id="menu" className='relative px-6 xl:px-30 sm:mt-20 sm:py-10 py-0 min-h-screen flex flex-col justify-between gap-10 items-center'>
            <BackGroundNoise />
            <Image
                src="/images/slider-left-leaf.png"
                alt=""
                height={325}
                width={325}
                className='absolute left-0 sm:top-0 bottom-0 object-cover sm:w-[200px] w-[130px]'
                id="left-leaf-menu"
            />
            <Image
                src="/images/slider-right-leaf.png"
                alt=""
                height={325}
                width={325}
                className="absolute right-0 -top-[120px] sm:top-auto sm:bottom-0 sm:w-[200px] w-[130px] object-cover"
                id="right-leaf-menu"
            />
            <div className='menu-nav w-full flex flex-row flex-wrap sm:flex-nowrap sm:gap-16 gap-6 justify-center items-center mb-10 sm:mb-0'>
                {sliderLists.map((item, index) => {
                    return (
                        <div key={index} className='relative z-1 cursor-pointer menu-nav-button' onClick={() => {
                            setCurrentItem(index);
                        }}>
                            <div className={`z-1 font-negra text-[20px] sm:text-4xl px-4  ${currentItem === index ? 'text-white' : 'text-gray-600'} `}>{item.name}</div>
                            <div className={`absolute -bottom-1 w-full h-[1px]  ${currentItem === index ? 'bg-white' : 'bg-gray-600'}`}></div>
                        </div>
                    )
                })}
            </div>

            <div className='w-full h-100vh flex flex-row justify-center sm:flex'>
                <div className='absolute left-2 sm:left-16 xl:top-1/3 top-1/3'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-negra text-3xl z-1 xl:max-w-15 text-white sm:block hidden'>{currentItem === 0 ? sliderLists[sliderLists.length - 1].name : sliderLists[currentItem - 1].name}</h2>
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
                <Image
                    src={sliderLists[currentItem].image}
                    height={800}
                    width={500}
                    alt=""
                    className={`sm:absolute relative ${currentItem === 1 ? 'scale-75 2xl:bottom-[100px] xl:bottom-[0px] bottom-10' : '2xl:bottom-[200px] xl:bottom-[120px] bottom-[50px]'} menu-image`}
                />
                <div className='absolute right-2 sm:right-16 xl:top-1/3 top-1/3'>
                    <div className='flex flex-col gap-4 items-end'>
                        <h2 className='font-negra text-3xl z-1 xl:max-w-30 text-right text-white sm:block hidden'>{currentItem === 3 ? sliderLists[0].name : sliderLists[currentItem + 1].name}</h2>
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

            <div className='menu-item-container flex flex-col sm:flex-row items-center h-full w-full -mt-10'>
                <div className='sm:absolute relative xl:bottom-50  flex sm:flex-row flex-col sm:justify-between justify-start z-1 w-full xl:px-30 items-start sm:items-end px-0'>
                    <div className='menu-item-name flex flex-col gap-2'>
                        <p className='menu-item__sub text-sm font-light text-white'>Recipes for:</p>
                        <h2 className='menu-item__name font-negra 2xl:text-5xl xl:text-4xl text-4xl text-[#E7D393]'>{sliderLists[currentItem].name}</h2>
                    </div>
                    <div className='menu-item-name flex flex-col gap-2 xl:max-w-[440px] mt-6 sm:mt-0'>
                        <p className='menu-item__title 2xl:text-5xl text-4xl font-negra sm:text-[#E7D393] text-white' >{sliderLists[currentItem].title}</p>
                        <h2 className='menu-item__des text-sm font-light leading-6 text-white'>{sliderLists[currentItem].description}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu