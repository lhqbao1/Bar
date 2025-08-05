import Hero from "./components/hero";
import NavBar from "./components/nav";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import CocktailsPrice from "./components/cocktails-price";
import About from "./components/about";
import Art from "./components/art";
import Menu from "./components/menu";
import Contact from "./components/contact";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <div className="bg-black">
      <NavBar />
      <Hero />
      <CocktailsPrice />
      <About />
      <Art />
      <Menu />
      {/* <HorizontalScrollPage /> */}
      <Contact />
    </div>
  );
}
