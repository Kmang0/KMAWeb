const links = [
  {
    label: "Email",
    value: "kpm8536@nyu.edu",
    href: "mailto:kpm8536@nyu.edu",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kennethpma",
    href: "https://linkedin.com/in/kennethpma",
  },
  {
    label: "GitHub",
    value: "github.com/Kmang0",
    href: "https://github.com/Kmang0",
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <p className="section-index" data-reveal>04 / CONTACT</p>
      <div className="contact__lead">
        <h2 id="contact-title" className="reveal-delay-1" data-reveal>
          Let&apos;s Connect!
        </h2>
        <p className="reveal-delay-2" data-reveal>
          For robotics research, engineering roles, and technical collaboration,
          send a direct note.
        </p>
      </div>
      <div className="contact__links">
        {links.map((link, index) => (
          <a
            className={`reveal-delay-${index}`}
            data-reveal
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span>{link.label}</span>
            <strong>{link.value}</strong>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
