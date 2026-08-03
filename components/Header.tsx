const navigation = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Kenny Ma, home">
        KMA
      </a>
      <nav aria-label="Primary navigation">
        {navigation.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="mailto:kpm8536@nyu.edu">
        Available for contact
      </a>
    </header>
  );
}
