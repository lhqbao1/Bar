import Hero from "./components/hero";
import NavBar from "./components/nav";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <div className="bg-black">
      <NavBar />
      <Hero />
      <div className="bg-black h-[500px]"></div>
    </div>
  );
}
