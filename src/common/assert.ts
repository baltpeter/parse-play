import { strict as strictAssert } from 'assert';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actuallyAssert = !!process?.env?.ASSERT;

export type AssertionFunction = (value: () => unknown, message?: string | Error) => asserts value;
export const assert: AssertionFunction = actuallyAssert
    ? (value, message) => strictAssert(value(), message)
    : // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {};
