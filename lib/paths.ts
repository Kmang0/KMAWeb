export function withBasePath(source: string, basePath = ""): string {
  if (/^https?:\/\//.test(source)) return source;

  const normalizedSource = source.startsWith("/") ? source : `/${source}`;
  return `${basePath}${normalizedSource}`;
}

