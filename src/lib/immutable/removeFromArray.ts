/**
 * Will remove an element from an array, while guaranteeing immutability.
 * Only works for primitive types - not objects or arrays.
 * @param element The element to remove.
 * @param array The array to remove the element from.
 * @returns A new array without the element.
 */
export const removeFromArray = <T>(element: T, array: T[], index?: number) => {
  const i = typeof index === 'undefined' ? array.indexOf(element) : index;

  if (i === -1) {
    return array;
  }

  return removeFromArrayAtIndex(array, i);
};

export const removeFromArrayAtIndex = <T>(array: T[], index: number) => [
  ...array.slice(0, index),
  ...array.slice(index + 1)
];
