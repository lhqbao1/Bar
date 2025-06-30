'use client'
import { profileLists } from '@/data/data'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from "split-type";
import { useGSAP } from '@gsap/react'


gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);


const About = () => {
    useGSAP(() => {
        const titleSplit = new SplitType("#about-title", { types: "words" })
        const desSplit = new SplitType("#about-description", { types: "lines" })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
            }
        })

        tl
            .from(titleSplit.words, {
                x: -100,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: 'back'
            })
            .from('#about-title-button', {
                x: -100,
                opacity: 0,
                duration: 0.5,
                ease: 'power1.in'
            }, "<")
            .from(desSplit.lines, {
                x: 100,
                stagger: 0.1,
                opacity: 0,
                duration: 1,
                ease: 'back'
            }, "<")
            .from('#about-rating', {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power1.in'
            }, "<")
            .from('.about-images', {
                y: 200,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'sine.in'
            }, "<")
    }, [])

    //Apply hover effect to images
    useEffect(() => {
        const containers = document.querySelectorAll(".about-images")

        containers.forEach((container) => {
            const image = container.querySelector(".about-images-item")

            if (!image) return

            const onEnter = () => {
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.6,
                    ease: "power2.out",
                })
            }

            const onLeave = () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                })
            }

            container.addEventListener("mouseenter", onEnter)
            container.addEventListener("mouseleave", onLeave)

            // Cleanup
            return () => {
                container.removeEventListener("mouseenter", onEnter)
                container.removeEventListener("mouseleave", onLeave)
            }
        })
    }, [])

    //Apply hover effect to details card
    useEffect(() => {
        const card = document.querySelector(".rotate-card")
        if (!card) return;

        const onEnter = () => {
            gsap.to(card, {
                rotateY: 180,
                duration: 0.5,
                ease: "sine.in",
            })
        }

        const onLeave = () => {
            gsap.to(card, {
                rotateY: 0,
                duration: 0.5,
                ease: "sine.out",
            })
        }

        card.addEventListener("mouseenter", onEnter)
        card.addEventListener("mouseleave", onLeave)
        // Cleanup
        return () => {
            card.removeEventListener("mouseenter", onEnter)
            card.removeEventListener("mouseleave", onLeave)
        }
    }, [])


    return (
        <div id="about" className='px-30 py-30 w-full flex flex-col justify-center items-center gap-20'>
            <div className='grid grid-cols-7 items-center'>
                <div className='col-span-3 xl:pr-14'>
                    <button
                        id='about-title-button'
                        aria-label="See Best Cocktails"
                        className='px-5 bg-white py-3 rounded-full text-black text-sm font-normal mb-6 cursor-pointer'
                    >Best Cocktails</button>
                    <h2 id='about-title' className='font-negra text-7xl text-white'>Where every detail matters—from muddle to garnish</h2>
                </div>
                <div className='col-span-2'></div>
                <div className='col-span-2'>
                    <p id="about-description" className='text-sm leading-7 font-light text-white'>Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable. </p>
                    <div id="about-rating" className='flex flex-row gap-10 relative justify-between xl:mt-8'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row gap-1'>
                                <Star fill="white" />
                                <Star fill="white" />
                                <Star fill="white" />
                                <Star fill="white" />
                                <Star fill="white" />
                            </div>
                            <p className='text-white'>4.5/5</p>
                            <p className='text-[11px] font-light text-white'>More than +12000 customers</p>
                        </div>
                        <div className='absolute left-1/2 h-full w-0.5 bg-white rounded-md'></div>
                        <div
                            style={{ background: "linear-gradient(180deg, #313131 0%, #0F0F0F 100%)" }}
                            className='rounded-[60px] xl:pl-7 flex flex-row items-center justify-center'
                        >
                            {profileLists.map((item, index) => {
                                return (
                                    <Image
                                        src={item.imgPath}
                                        width={100}
                                        height={100}
                                        alt=''
                                        key={index}
                                        className='w-11 h-11 object-cover'
                                        style={{ transform: `translateX(-${index * 5 * 2}px)` }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div id="about-image-layout" className="grid grid-cols-8 grid-rows-2 gap-4 p-6 text-white rounded-lg w-[1300px]">
                {/* Top Left Image */}
                <div className='col-span-2 row-span-1 relative about-images rounded-lg overflow-hidden'>
                    <Image
                        src="/images/abt1.png"
                        alt="Bartender mixing cocktail"
                        height={250}
                        width={400}
                        className="rounded-lg object-cover w-full h-full will-change-transform about-images-item"
                    />
                    <div className='absolute inset-0 z-0 size-full bg-[url("/images/noise.png")] opacity-50 rounded-lg'></div>
                </div>



                {/* Center Text Block */}
                <div className='perspective-1000 col-span-2 about-images row-span-1'>
                    <div
                        className="bg-zinc-900 rounded-lg flex flex-col justify-center w-full h-full relative transition-transform rotate-card cursor-pointer"
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Front Side */}
                        <div
                            id="about-card-front"
                            className='absolute w-full h-full backface-hidden border rounded-xl z-10 p-6'
                        >
                            <h2 className="text-xl font-bold mb-4">Crafted to Impress</h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    Perfectly balanced blends
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    Garnished to perfection
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    Ice-cold every time
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    Expertly shaken & stirred
                                </li>
                            </ul>
                        </div>

                        <div className='absolute inset-0 z-1 size-full bg-[url("/images/noise.png")] opacity-50 rounded-lg'></div>


                        {/* Back Side */}
                        <div
                            // ref={backRef}
                            id="about-card-back"
                            className="absolute w-full h-full backface-hidden rounded-xl left-0 z-0"
                            style={{
                                transform: "rotateY(180deg)",
                            }}
                        >
                            <Image
                                src="/images/abt5.png"
                                alt="Card Image"
                                height={250}
                                width={400}
                                className="w-full h-full object-cover rounded-lg will-change-transform"
                            />
                        </div>

                    </div>
                </div>


                {/* Top Right Image */}
                <div className='col-span-4 row-span-1 relative about-images rounded-lg overflow-hidden'>
                    <Image
                        src="/images/abt2.png"
                        alt="Bartender mixing cocktail"
                        height={250}
                        width={400}
                        className="rounded-lg object-cover w-full h-full will-change-transform about-images-item"
                    />
                    <div className='absolute inset-0 size-full bg-[url("/images/noise.png")] opacity-50'></div>
                </div>


                {/* Bottom Left Image */}
                <div className='col-span-5 row-span-1 relative about-images rounded-lg overflow-hidden'>
                    <Image
                        src="/images/abt3.png"
                        alt="Bartender mixing cocktail"
                        height={250}
                        width={400}
                        className="rounded-lg object-cover w-full h-full will-change-transform about-images-item"
                    />
                    <div className='absolute inset-0 size-full bg-[url("/images/noise.png")] opacity-50'></div>
                </div>


                {/* Bottom Right Image */}
                <div className='col-span-3 row-span-1 relative about-images rounded-lg overflow-hidden'>
                    <Image
                        src="/images/abt4.png"
                        alt="Bartender mixing cocktail"
                        height={250}
                        width={400}
                        className="rounded-lg object-cover w-full h-full will-change-transform about-images-item"
                    />
                    <div className='absolute inset-0 size-full bg-[url("/images/noise.png")] opacity-50'></div>

                </div>


            </div>
        </div>
    )
}

export default About