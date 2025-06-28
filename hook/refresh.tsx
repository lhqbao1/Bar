import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/all';

export function useScrollTriggerRefresh() {
    useEffect(() => {
        const handleLoad = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);
}
