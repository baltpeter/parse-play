import { strict as strictAssert } from 'assert';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const actuallyAssert = !!process?.env?.ASSERT;

export const assert: typeof strictAssert = actuallyAssert
    ? strictAssert
    : // eslint-disable-next-line @typescript-eslint/no-empty-function
      ((() => {}) as unknown as typeof strictAssert);
