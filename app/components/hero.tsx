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
// import { useMediaQuery } from 'react-responsive'
import BackGroundNoise from './background-noise'

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // const isMobile = useMediaQuery({ maxWidth: 767 });


    useGSAP(() => {
        const splitTitle = new SplitType("#hero-title", { types: "chars", });
        const splitLeftTitle = new SplitType(".hero-left-content__title", { types: "words" });
        const splitRightContent = SplitText.create(".hero-right-content__content", {
            type: "lines", // only split into words and lines (not characters)
            // mask: "lines", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
            linesClass: "line++", // adds "line" class to each line element, plus an incremented one too ("line1", "line2", "line3", etc.)
        });

        // Add "text-center" to each line
        splitRightContent.lines.forEach(line => {
            line.classList.add("text-center", "sm:text-start");
        });

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
                    pin: true,
                },
            });

            tl.to(videoEl, {
                currentTime: videoEl.duration,
                ease: "none",
            });
        };

        // ✅ Only call once, depending on readyState
        if (videoEl.readyState >= 1) {
            handleMetadata();
        } else {
            videoEl.addEventListener("loadedmetadata", handleMetadata);
        }

        return () => {
            videoEl.removeEventListener("loadedmetadata", handleMetadata);
        };
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
            <div id="hero" className='relative overflow-hidden flex justify-center sm:px-30 px-2 z-10 min-h-dvh w-full border border-transparent'>
                <BackGroundNoise size='xl' />
                <div className='z-10 w-full'>
                    <h1 id="hero-title" className='font-negra text-[118px] uppercase tracking-wide text-center sm:text-[300px] text-white'>
                        Mojito
                    </h1>
                    <Image
                        src="/images/hero-left-leaf.png"
                        alt=""
                        height={325}
                        width={325}
                        className='absolute left-0 top-20 sm:w-[250px] w-[150px] object-contain z-0 hidden sm:block'
                        id="left-leaf"
                    />
                    <Image
                        src="/images/hero-right-leaf.png"
                        alt=""
                        height={325}
                        width={325}
                        className='absolute right-0 -top-16 sm:w-[200px] w-[100px] object-contain z-0 hidden sm:block'
                        id="right-leaf"
                    />

                    <div className='flex flex-row justify-between z-10 sm:mt-40'>
                        <div className='hidden sm:flex'>
                            <p className='hero-left-content__title font-light text-base text-white'>Cool. Crisp. Classic.</p>
                            <h2 className='hero-left-content__content font-negra text-5xl mt-2' style={{ color: 'rgba(231, 211, 147, 1)' }}>Sip the Spirit <br /> of Summer</h2>
                        </div>
                        <div className='hero-right-container w-full sm:w-[300px]'>
                            <p className='hero-right-content__content font-light mb-3 w-full sm:w-[300px] text-white'>Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. </p>
                            <div id="cocktail-link" className='hero-right-content__link flex flex-row gap-1 items-center justify-center sm:justify-start'>
                                <Link href={''} className='font-light text-white opacity-80 text-xs tracking-[3px]'>View cocktails </Link>
                                <ArrowRight size={16} color='white' className='opacity-80' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="video" className="video absolute z-0 inset-0 flex justify-center top-[200px]">
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
                {/* Leaves - only on mobile */}
                <Image
                    src="/images/hero-left-leaf.png"
                    alt=""
                    height={325}
                    width={325}
                    className="absolute left-0 top-10 w-[150px] object-contain z-[1] block sm:hidden"
                    id="left-leaf"
                />
                <Image
                    src="/images/hero-right-leaf.png"
                    alt=""
                    height={325}
                    width={325}
                    className="absolute right-0 top-0 w-[120px] object-contain z-[1] block sm:hidden"
                    id="right-leaf"
                />
            </div>
        </>

    )
}

export default Hero