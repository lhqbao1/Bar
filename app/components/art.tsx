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
        const image = document.querySelector('.mask-image') as HTMLImageElement;
        if (image && !image.complete) {
            image.addEventListener('load', () => initPin());
        } else {
            initPin();
        }

        function initPin() {
            const maskTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#art-mask-section',
                    start: 'bottom 85%',
                    // end: 'bottom center',
                    end: '+=1000',
                    scrub: 1.5,
                    pin: '#art',
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
                    top: 0,
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
    // GSAP animation for the mask image and fade content
    // useGSAP(() => {
    //     const image = document.querySelector('#art-mask-section .mask-image') as HTMLImageElement;

    //     // Đảm bảo ảnh đã tải xong trước khi khởi tạo animation
    //     if (image && !image.complete) {
    //         image.addEventListener('load', () => initAnimation());
    //     } else {
    //         initAnimation();
    //     }

    //     function initAnimation() {
    //         // 1. Tạo timeline chứa tất cả các hoạt ảnh của bạn
    //         // KHÔNG CÓ ScrollTrigger ở đây
    //         const maskTimeline = gsap.timeline();

    //         maskTimeline
    //             .to('.will-fade', {
    //                 opacity: 0,
    //                 stagger: 1,
    //                 ease: 'power1.in'
    //             })
    //             .to('.mask-image', {
    //                 scale: 1.3,
    //                 maskPosition: 'center',
    //                 maskSize: '500%',
    //                 duration: 2,
    //                 borderRadius: 20,
    //                 top: 0,
    //                 ease: 'linear'
    //             })
    //             .to('.fade-content', {
    //                 opacity: 1,
    //                 duration: 1,
    //                 ease: 'back'
    //             });

    //         // 2. Lấy tổng thời lượng của toàn bộ timeline animation
    //         const totalAnimationDuration = maskTimeline.totalDuration();

    //         // 3. Tạo ScrollTrigger ĐẦU TIÊN để liên kết animation với việc cuộn
    //         // Trigger này sẽ dựa vào #art-mask-section để bắt đầu animation chính xác
    //         ScrollTrigger.create({
    //             trigger: '#art-mask-section', // Trigger animation dựa vào phần này
    //             start: 'center 30%', // Bắt đầu khi center của mask-section đi qua bottom của viewport
    //             end: `bottom center`, // Đảm bảo đủ không gian cho animation
    //             scrub: 1.5,
    //             // KHÔNG CÓ pin ở đây, vì chúng ta sẽ pin #art bằng một ScrollTrigger khác
    //             markers: true, // Để debug
    //             animation: maskTimeline // Liên kết timeline animation
    //         });

    //         // 4. Tạo ScrollTrigger THỨ HAI để pin toàn bộ #art section
    //         // ScrollTrigger này sẽ bắt đầu pin khi trigger của animation (art-mask-section) bắt đầu
    //         ScrollTrigger.create({
    //             trigger: '#art-mask-section', // Dùng lại trigger của animation
    //             start: 'center bottom', // Bắt đầu pin CÙNG LÚC với animation
    //             end: `+=500`, // Pin kéo dài đủ để animation hoàn thành
    //             pin: '#art', // **Pin toàn bộ #art section**
    //             pinSpacing: true, // Giúp duy trì bố cục trang sau khi pin kết thúc
    //             markers: true // Để debug
    //         });

    //         // Đảm bảo ScrollTrigger được làm mới sau khi DOM và ảnh đã sẵn sàng
    //         ScrollTrigger.refresh();
    //     }
    // }, []);

    return (
        <div id="art" className='relative flex flex-col items-center min-h-dvh radial-gradient' style={{
            background: 'radial-gradient(50% 50% at 50% 50%, #202020 0%, #000000 100%)'
        }}>
            <h1
                id='art-title'
                className='text-center text-[300px] tracking-tight will-change-transform will-fade'
            >
                The ART
            </h1>
            <div className='relative flex flex-row justify-between w-full px-30'>
                <div className='flex flex-col gap-4 absolute left-30 top-1/3 will-fade'>
                    {featureLists.map((item, index) => {
                        return (
                            <div key={index} className='art-features flex flex-row gap-2 items-center'>
                                <BadgeCheck fill='white' color='black' />
                                <p className='font-light text-white'>{item}</p>
                            </div>
                        )
                    })}
                </div>
                <div id='art-mask-section' className='w-full h-full flex flex-col items-center gap-30 -mt-[200px]' >
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
                        <h2 className='text-5xl font-negra font-bold text-white'>Made with Craft - Poured with Passion</h2>
                        <p className='text-sm font-light text-white'>This is not a drink. It is a carefully crafted moment made just for you</p>
                    </div>
                </div>

                <div className='flex flex-col gap-4 absolute right-30 top-1/3 will-fade'>
                    {goodLists.map((item, index) => {
                        return (
                            <div key={index} className='art-goods flex flex-row gap-2 items-center'>
                                <BadgeCheck fill='white' color='black' />
                                <p className='font-light text-white'>{item}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* <div className='flex flex-row justify-between w-full will-fade'>
                
            </div> */}
            <h2 className='absolute bottom-0 text-6xl font-negra font-bold will-fade text-white'>Sip-Worthy Perfection</h2>

        </div>
    )
}

export default Art