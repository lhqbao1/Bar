'use client'
import Image from 'next/image'
import React from 'react'
import BackGroundNoise from './background-noise'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#footer',
                start: 'top center',
                end: 'bottom bottom',
            }
        });

        tl
            .from('#footer h1', {
                y: 100,
                opacity: 0,
                duration: 0.5,
            }, 'start')  // đặt label "start" ngay tại tween đầu

            .from('.footer-address', {
                y: 100,
                opacity: 0,
                duration: 0.5,
            }, 'start+=0.5')  // 0.5s sau label "start"

            .from('.footer-contact', {
                y: 100,
                opacity: 0,
                duration: 0.5,
            }, 'start+=1')    // 1s sau label "start"

            .from('.footer-hours', {
                y: 100,
                opacity: 0,
                duration: 0.5,
            }, 'start+=1.5')  // 1.5s sau label "start"

            .from('.footer-socials', {
                y: 100,
                opacity: 0,
                duration: 0.5,
            }, 'start+=2');   // 2s sau label "start"
    }, []);

    return (
        <div id='footer' className='px-30 py-10 relative min-h-screen w-full'>
            <BackGroundNoise size='xl' />
            <Image
                src="/images/footer-left-leaf.png"
                alt=""
                height={325}
                width={325}
                className='absolute left-0 bottom-0 object-cover w-[200px]'
                id="left-leaf-footer"
            />
            <Image
                src="/images/footer-right-leaf.png"
                alt=""
                height={325}
                width={325}
                className='absolute right-0 top-0 w-[200px] object-cover'
                id="right-leaf-footer"
            />
            <Image
                src="/images/footer-drinks.png"
                alt=""
                height={325}
                width={325}
                className='absolute right-0 bottom-0 object-cover'
                id="footer-drinks"
            />

            <div className='flex flex-col gap-14 items-center z-10 text-white'>
                <h1 className='font-negra text-6xl'>Where to Find Us</h1>
                <div className='footer-address flex flex-col gap-5 text-center'>
                    <p className='uppercase text-sm font-medium'>Visit our store</p>
                    <p className='text-2xl font-light'>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
                </div>
                <div className='footer-contact flex flex-col gap-5 text-center'>
                    <p className='uppercase text-sm font-medium'>Contact us</p>
                    <p className='text-2xl font-light'>(555) 987-6543</p>
                    <p className='text-2xl font-light'>hello@jsmcocktail.com</p>
                </div>
                <div className='footer-hours flex flex-col gap-5 text-center'>
                    <p className='uppercase text-sm font-medium'>Open every day</p>
                    <p className='text-2xl font-light'>Mon-Thu : 11:00am - 12am</p>
                    <p className='text-2xl font-light'>Fri : 11:00am - 2am</p>
                    <p className='text-2xl font-light'>Sat : 9:00am - 2am</p>
                    <p className='text-2xl font-light'>Sun : 9:00am - 1 am</p>
                </div>
                <div className='footer-socials flex flex-col gap-5 text-center'>
                    <p className='text-sm font-medium'>Socials</p>
                    <div className='flex flex-row gap-2'>
                        <Image src="/images/insta.png" alt="Instagram" width={24} height={24} className='size-7 cursor-pointer' />
                        <Image src="/images/fb.png" alt="Facebook" width={24} height={24} className='size-7 cursor-pointer' />
                        <Image src="/images/x.png" alt="Twitter" width={24} height={24} className='size-7 cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact