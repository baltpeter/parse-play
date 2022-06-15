import { strict as strictAssert } from 'assert';

export const assert: typeof strictAssert = process?.env?.ASSERT
    ? strictAssert
    : ((() => {}) as unknown as typeof strictAssert);
