import fetch from 'cross-fetch';
import { assert } from './assert';

export type RequestPayload = [string, string];
export type QueryParams = Record<string, string>;

const buildQueryString = (queryParams?: QueryParams) =>
    queryParams
        ? `?${Object.entries(queryParams)
              .map(([key, value]) => `${key}=${value}`)
              .join('&')}`
        : '';

export const batchExecute = async (requests: RequestPayload[], queryParams?: QueryParams) => {
    const res = await fetch(`https://play.google.com/_/PlayStoreUi/data/batchexecute${buildQueryString(queryParams)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        // The (stringified) number at index 3 of each request specifies the order in which the responses are returned
        // (see: https://kovatch.medium.com/deciphering-google-batchexecute-74991e4e446c#ea4a). We want them in the same
        // order as the requests.
        body: `f.req=${encodeURIComponent(JSON.stringify([requests.map((r, idx) => [...r, null, '' + idx])]))}`,
    }).then((r) => r.text());

    const messages: any[] = JSON.parse(res.split('\n')[2]!);
    assert(messages.length === requests.length + 2, 'Has response payload for each request.');

    return messages.slice(0, requests.length);
};
