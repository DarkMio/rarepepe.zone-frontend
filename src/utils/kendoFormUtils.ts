import { DeepPartial } from "./typeHelper";

/**
 * Kendo offers a peculiar object naming and assembly scheme, that allows constructing
 * arbitrary objects with a dot notation.
 *
 * In particular, imagine a Form with with a name attribute as such: `myProp.value`
 *
 * If the input with the name is filled in (ex: 10), Kendo will construct an object as such:
 * ```json
 * { myProp: { value: 10 }}
 * ```
 */
export const nestedOverwrite = <T extends Record<string, unknown>>(input: T, overwrite: DeepPartial<T>): T => {
  const imposterInput = JSON.parse(JSON.stringify(input)) as T;
  const imposterOverwrite = JSON.parse(JSON.stringify(overwrite)) as DeepPartial<T>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closedNestedOverwrite = <T extends Record<string, any>>(imposter: T, imposterOverwrite: DeepPartial<T>): T => {
    for (const key of Object.keys(imposterOverwrite)) {
      const value = imposterOverwrite[key];

      // this prop has been added
      if (!(key in imposter)) {
        imposter[key as keyof T] = value;
        continue;
      }

      if (typeof value === "object") {
        imposter[key as keyof T] = nestedOverwrite(imposter[key], value);
      } else {
        imposter[key as keyof T] = value;
      }
    }
    return imposter;
  };

  return closedNestedOverwrite(imposterInput, imposterOverwrite);
};
