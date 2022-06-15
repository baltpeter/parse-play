import { batchExecute, RequestPayload } from './common/requests';
import { CategoryId, LanguageCode, CountryCode } from './common/consts';
import { assert } from './common/assert';

export type TopChartsRequest = {
    chart: 'topselling_free' | 'topgrossing' | 'topselling_paid';
    category: CategoryId;
    count: number;
};
export type TopChartsOptions = {
    country: CountryCode;
    language: LanguageCode;
};

export type TopChartsEntry = ReturnType<typeof parseTopChartEntry>;
export type TopChartsResult = TopChartsEntry[];

// This payload was determined by observing the network traffic on the web UI and then _drastically_ simplifying it
// by throwing away everything that didn't affect the response.
export const topChartsRequestPayload = (options: TopChartsRequest): RequestPayload => [
    'vyAe2',
    JSON.stringify([[null, [[null, [null, options.count]], null, null, [113]], [2, options.chart, options.category]]]),
];

export const parseTopChartEntry = (entry: any, idx: number) => ({
    position: (idx + 1) as number,
    app_id: entry[0][0] as string,
    icon_url: entry[1][3][2] as string,
    screenshot_urls: entry[2].map((s: any) => s[3][2]) as string[],
    name: entry[3] as string,
    rating: entry[4][1] as number,
    category: entry[5] as string,
    price: entry[8][1][0].join(' ').trim() as string,
    buy_url: entry[8][6][5][2] as string,
    store_path: entry[10][4][2] as string,
    trailer_url: entry[12]?.[0][0][3][2] as string | undefined,
    description: entry[13][1] as string,
    developer: entry[14] as string,
    downloads: entry[15] as string,
    cover_image_url: entry[22][3][2] as string,
});

export const parseTopChartPayload = (payload: any): TopChartsEntry[] => {
    assert(payload[0] === 'wrb.fr' && payload[1] === 'vyAe2', 'Correct header.');

    const data = JSON.parse(payload[2]);
    assert(data, 'Has inner data.');

    assert(data.length === 1, 'One top-level array entry.');
    assert(
        data[0][1][0].length === 29 &&
            data[0][1][0][3].length === 1 &&
            data[0][1][0].filter((i: unknown) => i === null).length === 27,
        'Expected inner data structure.'
    );
    const entries: any[] = data[0][1][0][28][0];
    assert(entries.length > 0, 'Has data.');

    const parsed = entries.map((e, idx) => {
        assert(e.length === 3 && [0, 1, 2].includes(e[2]), 'Expected entry structure.');

        const meta = e[0];

        assert(meta.length === 23, 'Meta length.');
        assert(meta[8][8][0] === 'CAE=', 'Weird buy param.');
        assert(e[1].length === 1 && e[1][0].length === 3, 'Expected weird second meta object structure.');
        const empty_meta = e[1][0].flat(100);
        assert(
            empty_meta.filter((i: unknown) => i === null).length === empty_meta.length - 1 && empty_meta[3] === meta[5],
            'Weird second meta object only has category.'
        );

        return parseTopChartEntry(meta, idx);
    });

    assert(
        parsed
            .map((p) =>
                Object.entries(p).filter(([key, val]) => (val === undefined || val === null) && key !== 'trailer_url')
            )
            .filter((a) => a.length > 0).length === 0,
        'Only `trailer_url` is ever undefined.'
    );

    return parsed;
};

export async function fetchTopCharts(
    request: TopChartsRequest | [TopChartsRequest],
    options: TopChartsOptions
): Promise<TopChartsResult>;
export async function fetchTopCharts(
    requests: TopChartsRequest[],
    options: TopChartsOptions
): Promise<TopChartsResult[]>;
export async function fetchTopCharts(requests: TopChartsRequest | TopChartsRequest[], options: TopChartsOptions) {
    const _requests = Array.isArray(requests) ? requests : [requests];
    const payloads = await batchExecute(
        _requests.map((r) => topChartsRequestPayload(r)),
        { hl: options.language, gl: options.country }
    );
    const res = payloads.map((p) => parseTopChartPayload(p));
    return _requests.length === 1 ? res[0] : res;
}
