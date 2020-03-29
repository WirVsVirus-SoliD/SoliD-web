/**
 * Returns the props of a functional component.
 */
export type FCProps<T extends (...args: any) => any> = Parameters<T>[0];

/**
 * Type can be T or null.
 */
export type Maybe<T> = T | null;

/**
 * Returns all unique value types of T.
 */
export type ValueOf<T> = T[keyof T];
