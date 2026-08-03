import { HeroPortrait } from "./HeroPortrait";
import { withBasePath } from "@/lib/paths";

export function Hero() {
  const backgroundSrc = withBasePath(
    "/media/hero-robotics-workbench-v2.png",
    process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  );

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__datum" aria-hidden="true">
        <span>MECH</span>
        <span>ELEC</span>
        <span>SIM</span>
        <span>CTRL</span>
        <span>AUTO</span>
      </div>
      <HeroPortrait />
      <div className="hero__display" id="hero-title">
        <div className="hero__display-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={backgroundSrc} alt="" />
        </div>
        <span>DESIGN</span>
        <span>BUILD</span>
        <span>CONTROL</span>
      </div>
      <div className="hero__statement">
        <p className="eyebrow">Kenny Ma / Funny Guy</p>
        <h1>
          Hey, I am Kenny, I like building robots!
        </h1>
        <p>
          I have been developing skills in all things robotics, from 
          mechanical and electronic systems design, to robot simulation, and controls. 
          I&apos;ve recently started working on policy training, robot learning 
          and reinforcement learning as well!
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            Inspect the catalogue
          </a>
          <a className="button button--secondary" href="#experience">
            View experience
          </a>
        </div>
      </div>
    </section>
  );
}
