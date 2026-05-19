export function buildStartupGreeting(args: string[]): string {
  return args.length > 0 ? `Hello ${args.join(" ")}` : "Hello World";
}

export function resolveGreeting(
  requestPath: string | undefined,
  host: string | undefined,
  port: number,
  startupGreeting: string,
): string {
  const requestUrl = new URL(
    requestPath ?? "/",
    `http://${host ?? `localhost:${port}`}`,
  );
  const queryNames = requestUrl.searchParams.getAll("name").filter(Boolean);

  return queryNames.length > 0
    ? `Hello ${queryNames.join(" ")}`
    : startupGreeting;
}