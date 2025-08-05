"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollPage() {
    useEffect(() => {
        const scrollWrapper = document.querySelector(".scroll-wrapper");

        if (!scrollWrapper) return;

        const horizontalTween = gsap.to(scrollWrapper, {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll",
                pin: true,
                scrub: 1,
                end: () => "+=1000" // 👈 FIXED HERE
            },
        });

        // Parallax effect for backgrounds using the tween as containerAnimation
        gsap.utils.toArray<HTMLElement>(".image-couple").forEach((couple) => {
            const bg = couple.querySelector(".background");
            if (!bg) return;

            gsap.to(bg, {
                xPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: couple,
                    containerAnimation: horizontalTween, // ✅ use the tween here
                    scrub: true,
                },
            });
        });
    }, []);


    return (
        <section className="horizontal-scroll h-screen overflow-hidden relative">
            <div className="scroll-wrapper flex h-full w-[150vw] z-10 gap-100">
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
                /><Image
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
            </div>
        </section>
    );
}
