'use client'
import React from 'react'
import BackGroundNoise from './background-noise'
import { cocktailLists, mockTailLists } from '@/data/data'
import Image from 'next/image'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from "split-type";
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);


const CocktailsPrice = () => {

    useGSAP(() => {
        const leftTitleSplit = new SplitType('.cocktails-list-left__title', { types: "words" })
        const rightTitleSplit = new SplitType('.cocktails-list-right__title', { types: "words" })

        gsap.from(leftTitleSplit.words, {
            scrollTrigger: {
                trigger: "#cocktails-price",
                start: "top 80%", // when top of trigger hits 80% viewport height
            },
            x: -100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "back",
        })

        gsap.from(rightTitleSplit.words, {
            scrollTrigger: {
                trigger: "#cocktails-price",
                start: "top 80%", // when top of trigger hits 80% viewport height
            },
            x: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "back",
        })

        gsap.from(".cocktails-list-left__items", {
            scrollTrigger: {
                trigger: "#cocktails-price",
                start: "top 80%", // when top of trigger hits 80% viewport height
            },
            x: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        })

        gsap.from(".cocktails-list-right__items", {
            scrollTrigger: {
                trigger: "#cocktails-price",
                start: "top 80%", // when top of trigger hits 80% viewport height
            },
            x: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        })

        const leftTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#cocktails-price",
                start: "top 40%",
                end: "bottom 80%",
                scrub: true,
            },
        });

        leftTl
            .from("#left-leaf-cocktails", {
                x: -100,
                y: 100,
            })
            .from("#right-leaf-cocktails", {
                x: 100,
                y: 100,
            }, "<")


        return () => {
            leftTitleSplit.revert() // clean up when unmounting
            rightTitleSplit.revert() // clean up when unmounting
        }
    }, [])

    return (
        <div id="cocktails-price" className='relative flex justify-center px-30 overflow-hidden xl:h-[850px]'>
            <BackGroundNoise size='l' className='' />
            <div className='flex justify-between w-full xl:pt-16 z-1'>
                <div className='flex flex-col xl:gap-5 gap-2'>
                    <h3 className='cocktails-list-left__title font-medium text-sm'>Most popular cocktails:</h3>
                    {cocktailLists.map((item, index) => {
                        return (
                            <div className='cocktails-list-left__items flex flex-row justify-between xl:gap-14' key={index}>
                                <div className='cocktail-name'>
                                    <div className='font-negra text-2xl' style={{ color: 'rgba(231, 211, 147, 1)' }}>{item.name}</div>
                                    <div className='text-xs font-light'>{item.country} | {item.detail}</div>
                                </div>
                                <div className='text-base font-light xl:leading-7 leading-0'>- {item.price}</div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-col xl:gap-5 gap-2'>
                    <h3 className='cocktails-list-right__title font-medium text-sm'>Most popular cocktails:</h3>
                    {mockTailLists.map((item, index) => {
                        return (
                            <div className='cocktails-list-right__items flex flex-row justify-between xl:gap-14' key={index}>
                                <div className='cocktail-name'>
                                    <div className='font-negra text-2xl' style={{ color: 'rgba(231, 211, 147, 1)' }}>{item.name}</div>
                                    <div className='text-xs font-light'>{item.country} | {item.detail}</div>
                                </div>
                                <div className='text-base font-light xl:leading-7 leading-0'>- {item.price}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Image
                src="/images/cocktail-left-leaf.png"
                alt=""
                height={325}
                width={325}
                className='absolute left-0 bottom-0 object-contain'
                id="left-leaf-cocktails"
            />
            <Image
                src="/images/cocktail-right-leaf.png"
                alt=""
                height={325}
                width={325}
                className='absolute right-0 bottom-0 object-contain'
                id="right-leaf-cocktails"
            />
        </div>
    )
}

export default CocktailsPrice