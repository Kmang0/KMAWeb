import { experiences } from "@/data/experience";

export function ExperienceGrid() {
  return (
    <section
      id="experience"
      className="section experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <p className="section-index" data-reveal>01 / FIELD EXPERIENCE</p>
        <h2 id="experience-title" className="reveal-delay-1" data-reveal>
          Research and applied robotics.
        </h2>
      </div>
      <div className="experience-grid">
        {experiences.map((experience, index) => (
          <article
            className={`experience-card reveal-delay-${index}`}
            key={experience.organization}
            data-reveal
          >
            <header>
              <p>{experience.date}</p>
            </header>
            <h3>{experience.role}</h3>
            <h4>{experience.organization}</h4>
            <p className="experience-card__summary">{experience.summary}</p>
            <div className="experience-card__columns">
              <div>
                <h5>My contribution</h5>
                <ul>
                  {experience.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5>Team / project outcomes</h5>
                <ul>
                  {experience.teamOutcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="experience-card__tools">
              {experience.technologies.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
