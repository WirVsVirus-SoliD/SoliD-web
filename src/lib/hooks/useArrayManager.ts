import { useState } from "react";

/**
 * Each value in an array is accessible via its index. However, some arrays
 * may contain additional arrays. Since we dont know about them, the easiest way
 * to access the underlying values (e.g. when rotating through each value) is to
 * provide cursors to each value in a sorted array. That's what this function does.
 *
 * E.g. `["a", "b", ["c.a", "c.b"], "d"]` => `["0", "1", "2.1", "2.2", "3"]`
 *
 * @param values An array that may contain additional arrays.
 * @returns A single array containing dot-notated cursors to access each value.
 */
function mapIndexesAsDotNotation(values: any[]) {
  let indexes = [];

  function recurse(array: any[], prefix?: string) {
    // Set prefix to achieve dot-notation
    const prfx = typeof prefix === "string" ? `${prefix}.` : "";

    array.forEach((v, i) => {
      if (Array.isArray(v)) {
        recurse(v, prfx + i);
        return;
      }

      indexes = [...indexes, prfx + i];
    });
  }

  recurse(values);

  return indexes;
}

/**
 * Splits a dot-notated string into an array of numbers.
 *
 * E.g. `"3.1.2"` => `[3, 1, 2]`
 */
function splitDotNotationToArray(dotNotation: string) {
  return dotNotation.split(".").map((v) => +v);
}

/**
 * We cannot use dot-notation to access nested values in an array.
 * However, if we use an array containing the indexes, we are able to loop
 * over them until we find the deeply-nested value.
 *
 * E.g. `"3.1.2"` => `array[3][1][2]`
 *
 * @param array The array containing a possibly deeply-nested value.
 * @param dotNotatedIndex A dot-notated cursor.
 */
function getNestedArrayValue<T extends any[]>(
  array: T,
  dotNotatedIndex: string
) {
  const indexes = splitDotNotationToArray(dotNotatedIndex);
  const max = indexes.length;
  let value: T | T[] = array;
  let counter = 0;

  while (counter < max) {
    value = value[indexes[counter]];
    counter++;
  }

  return value as T[0];
}

/**
 * Manage an array with possibly nested arrays in a sorted manner
 * allowing you to jump between the logically previous and/or next value.
 *
 * Assuming we have an array with the following values:
 *
 * `[ "a", "b", [ "c.a", [ "c.b.a", "c.b.b" ] ], "d" ]`
 *
 *
 * **Example case 1:**
 * - current value is `"b"` at index 1 (cursor: `"1"`).
 * - previous value is `"a"` at index 0 (cursor: `"0"`).
 * - next value is `"c.a"` at index 2 (cursor: `"2.0"`).
 *
 * **Example case 2:**
 * - current value is `"c.a"` at index 2 (cursor: `"2.0"`).
 * - previous value is `"b"` at index 1 (cursor: `"1"`).
 * - next value is `"c.b.a"` at index 2 (cursor: `"2.1.0"`).
 *
 * **Example case 3:**
 * - current value is `"c.b.b"` at index 2 (cursor: `"2.1.1"`).
 * - previous value is `"c.b.a"` at index 2 (cursor: `"2.1.0"`).
 * - next value is `"d"` at index 3 (cursor: `"3"`).
 *
 * @param values An array that may contain additional arrays.
 */
export function useArrayManager<T>(values: T[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dotIndexes = mapIndexesAsDotNotation(values);
  const max = dotIndexes.length - 1;
  const goTo = (index: number) => {
    setCurrentIndex(index < 0 ? 0 : index > max ? max : index);
  };
  const goPrevious = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);

  return {
    goPrevious,
    goNext,
    currentValue: getNestedArrayValue(values, dotIndexes[currentIndex])
  };
}
