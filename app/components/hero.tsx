'use client'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'
import BackGroundNoise from './background-noise'

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const isMobile = useMediaQuery({ maxWidth: 767 });


    useGSAP(() => {
        const splitTitle = new SplitType("#hero-title", { types: "chars", });
        const splitLeftTitle = new SplitType(".hero-left-content__title", { types: "words" });
        const splitRightContent = new SplitType(".hero-right-content__content", { types: "lines" });

        const tl = gsap.timeline()

        tl
            .from(splitTitle.chars, {
                y: 100,
                opacity: 0,
                stagger: { each: 0.1 },
                duration: 0.8,
                ease: "back",
            })
            .from(splitLeftTitle.words, {
                x: -100,
                opacity: 0,
                stagger: { each: 0.2 },
                duration: 1,
                ease: "back.out(1.7)", // smoother back easing
            }, "0.5")
            .from(splitRightContent.lines, {
                y: 100,
                opacity: 0,
                duration: 0.5,
                stagger: { each: 0.1 },
                ease: "power2.out",
            }, "<")
            .from(".hero-left-content__content", {
                y: 200,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            }, "<")
            .from(".hero-right-content__link", {
                y: 200,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            }, "<");


        const leafTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top-=30 top",
                end: "bottom top",
                scrub: true,
                // markers: true, // ⬅️ shows scroll lines in browser
            },
        });

        leafTl
            .to("#left-leaf", { y: -300, duration: 1 })
            .to("#right-leaf", { y: 300, duration: 1 }, "<"); // "<" makes them animate together

        return () => {
            splitTitle.revert();
            splitLeftTitle.revert();
            splitRightContent.revert();
            tl.kill();
            leafTl.kill()
        };
    }, []);

    //Video scroll animation
    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const handleMetadata = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#video",
                    start: "center 60%",
                    end: "bottom top",
                    scrub: true,
                    pin: true
                },
            });

            tl.to(videoEl, {
                currentTime: videoEl.duration,
                ease: "none",
            });
        };
        handleMetadata()
        // // ✅ If already loaded
        // if (videoEl.readyState >= 1) {
        //     handleMetadata();
        // } else {
        //     videoEl.addEventListener("loadedmetadata", handleMetadata);
        // }

        // return () => {
        //     videoEl.removeEventListener("loadedmetadata", handleMetadata);
        // };
    }, []);


    //Button "view cocktails" hover animation
    useEffect(() => {
        const link = document.querySelector("#cocktail-link");

        const onEnter = () => {
            gsap.to(link, {
                x: 10,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        const onLeave = () => {
            gsap.to(link, {
                x: 0,
                duration: 0.3,
                ease: "bounce",
            });
        };

        if (link) {
            link.addEventListener("mouseenter", onEnter);
            link.addEventListener("mouseleave", onLeave);
        }

        // Cleanup on unmount
        return () => {
            if (link) {
                link.removeEventListener("mouseenter", onEnter);
                link.removeEventListener("mouseleave", onLeave);
            }
        };
    }, []);


    return (
        <>
            <div id="hero" className='relative overflow-hidden flex justify-center px-30 z-10 min-h-dvh w-full border border-transparent'>
                <BackGroundNoise />
                <div className='z-1 w-full'>
                    <h1 id="hero-title" className='font-negra text-[300px] uppercase tracking-wide text-center'>
                        Mojito
                    </h1>
                    <Image
                        src="/images/hero-left-leaf.png"
                        alt=""
                        height={325}
                        width={325}
                        className='absolute left-0 top-20 w-[250px] object-contain z-0'
                        id="left-leaf"
                    />
                    <Image
                        src="/images/hero-right-leaf.png"
                        alt=""
                        height={325}
                        width={325}
                        className='absolute right-0 -top-16 w-[200px] object-contain z-0'
                        id="right-leaf"
                    />

                    <div className='flex flex-row justify-between z-1 xl:mt-20 md:hidden xl:flex'>
                        <div>
                            <p className='hero-left-content__title font-light text-base'>Cool. Crisp. Classic.</p>
                            <h2 className='hero-left-content__content font-negra text-5xl mt-2' style={{ color: 'rgba(231, 211, 147, 1)' }}>Sip the Spirit <br /> of Summer</h2>
                        </div>
                        <div className='hero-right-container xl:w-[300px]'>
                            <p className='hero-right-content__content font-light mb-3 w-[300px]'>Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. </p>
                            <div id="cocktail-link" className='hero-right-content__link flex flex-row gap-1 items-center'>
                                <Link href={''} className='font-light text-white opacity-80 text-xs tracking-[3px]'>View cocktails </Link>
                                <ArrowRight size={16} color='white' className='opacity-80' />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div id="video" className="video absolute inset-0 flex justify-center top-[200px]">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    src="/videos/output.mp4"
                    className="mask-fade-gradient"
                    style={{
                        WebkitMaskImage:
                            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                    }} />
            </div>
        </>

    )
}

export default Hero