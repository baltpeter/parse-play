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
        // The (stringified) number at index 3 of each request is supposed to specify the order in which the responses
        // are returned (see: https://kovatch.medium.com/deciphering-google-batchexecute-74991e4e446c#ea4a). We want
        // them in the same order as the requests.
        //
        // From my testing, this doesn't always seem to be the case. But as the number is also returned in the response,
        // we can use it to manually sort the payloads later.
        body: `f.req=${encodeURIComponent(JSON.stringify([requests.map((r, idx) => [...r, null, '' + idx])]))}`,
    }).then((r) => r.text());

    const messages: any[] = JSON.parse(res.split('\n')[2]!);
    assert(() => messages.length === requests.length + 2, 'Has response payload for each request.');

    const payloads = messages.slice(0, requests.length).sort((a, b) => a[a.length - 1] - b[b.length - 1]);

    return payloads.map((payload, idx) => {
        assert(() => payload[0] === 'wrb.fr' && payload[1] === requests[idx]?.[0], 'Correct header.');

        const data = JSON.parse(payload[2]);
        assert(() => data, 'Has inner data.');
        return data;
    });
};
