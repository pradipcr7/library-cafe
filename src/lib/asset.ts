const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset path with the deployment base path. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
