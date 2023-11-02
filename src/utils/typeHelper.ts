type Entry = { key: string; value: unknown; optional: boolean };
type Explode<T> = _Explode<T extends readonly unknown[] ? { "0": T[number] } : T>;
type _Explode<T> =
  // if it's an object
  T extends object
    ? // construct a intermitten dictionary
      {
        [K in keyof T]-?: K extends string // is the key a string?
          ? // if it's a string ...
            Explode<T[K]> extends infer E
            ? // ... then move down the type chain and follow it
              E extends Entry
              ? {
                  key: `${K}${E["key"] extends "" ? "" : "."}${E["key"]}`;
                  value: E["value"];
                  optional: E["key"] extends "" ? (object extends Pick<T, K> ? true : false) : E["optional"];
                }
              : never
            : never
          : never;
      }[keyof T]
    : // otherwise produce a fallback value
      { key: ""; value: T; optional: false };

type Collapse<T extends Entry> = {
  [E in Extract<T, { optional: false }> as E["key"]]: E["value"];
} & Partial<{ [E in Extract<T, { optional: true }> as E["key"]]: E["value"] }> extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
type Flatten<T> = Collapse<Explode<T>>;

/**
 * Returns the types of a properties in an object with a dot notation:
 * ```ts
 * const obj = { myProp: { value: 10 } }
 * // { "myProp.value": number; }
 * type T = TypeOfKeyPath<obj>;
 * ```
 */
export type TypeOfKeyPath<T> = Flatten<T>;

/**
 * Returns the properties able to be accesses in a dot-notation, as Kendo often does:
 * ```ts
 * const obj = { myProp: { value: 10, id: 1 }, otherProp: 11 }
 * // "myProp" | "myProp.value" | "myProp.id" | "otherProp"
 * type T = KeyPathOf<obj>;
 * ```
 */
export type KeyPathOf<T> = keyof TypeOfKeyPath<T>;

/**
 * Makes all nested properties in an object partial.
 * It's `Partial<T>`, but recursive.
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
