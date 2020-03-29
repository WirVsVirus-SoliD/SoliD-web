import {appendElement} from './appendElement';
import {removeFromArray} from './removeFromArray';

/**
 * Removes the element from the array, if it already exists.
 * Otherwise appends it. Returns the updated array.
 * @param element - The element to remove from or to add to the array.
 * @param array - The element's array.
 * @returns The updated array.
 */
export const updateArray = <T>(element: T, array: T[]) => {
  const elementExists = array.includes(element);
  if (elementExists) {
    return removeFromArray(element, array);
  } else {
    return appendElement(element, array);
  }
};
