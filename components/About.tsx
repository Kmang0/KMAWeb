const capabilities = [
  ["Physical systems", "Onshape, Fusion 360, KiCad, Fabrication"],
  ["Robot software", "Python, PyTorch, C++, Linux, ROS 2"],
  ["Learning + control", "(In the works) Reinforcement learning, policy development and trianing"],
  ["Simulation", "NVIDIA Isaac Sim, Isaac Lab, MuJoCo, "],
] as const;

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="section-heading">
        <p className="section-index" data-reveal>03 / ABOUT</p>
        <h2 id="about-title" className="reveal-delay-1" data-reveal>
          A little more about me!
        </h2>
      </div>
      <div className="about__grid">
        <div className="about__copy">
          <p data-reveal>
            I&apos;m an electrical and computer engineering undergraduate student at NYU who is 
            mainly focused on robotics and embodied intelligence. I am also an undergraduate 
            researcher at NYU GRAIL, which is where I have been continuing my robotics journey.
          </p>
          <p className="reveal-delay-1" data-reveal>
            My path began on a high-school robotics team and has since expanded through team leadership, 
            competitive rocketry (that was an interesting phase), assistive robotics, industry work, 
            and now research at NYU GRAIL, where I am developing my interests in robot learning.
            I truly believe in the positive impact robotics can bring to the world, 
            whether by improving physical workflows, supporting people&apos;s wellbeing, 
            or simply bringing a smile to someones face seeing a funky little robot dance around.
            I am excited to continue my robotics journey and see where it takes me!
          </p>
        </div>
        <dl className="capability-list">
          {capabilities.map(([area, tools], index) => (
            <div className={`reveal-delay-${index}`} key={area} data-reveal>
              <dt>{area}</dt>
              <dd>{tools}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
