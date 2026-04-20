import { compile } from "path-to-regexp";

export function toUrl(path: string, params?: object) {
  return compile(path, { encode: encodeURIComponent })(
    Object.fromEntries(
      Object.entries(params || {}).map(([key, value]) => [
        key,
        value.toString(),
      ])
    )
  );
}
