import { batchExecute, RequestPayload } from './common/requests';
import { CategoryId, LanguageCode, CountryCode } from './common/consts';
import { assert } from './common/assert';

/**
 * Parameters for a single top charts request.
 */
export type TopChartsRequest = {
    /**
     * The chart to use, where `topselling_free`: Top free (or Top for €0, Top for $0, depending on the country);
     * `topgrossing`: Top grossing; `topselling_paid`: Top selling.
     */
    chart: 'topselling_free' | 'topgrossing' | 'topselling_paid';
    /** The category to use. Use `APPLICATION` for all apps, or `GAME` for all games, or one of the subcategory. */
    category: CategoryId;
    /** The number of apps to include in the top list. This seems to be limited to 660 apps. */
    count: number;
};
/**
 * Parameters for all top charts request in a {@link fetchTopCharts} call.
 */
export type TopChartsOptions = {
    /** The country for which to fetch the top chart(s). */
    country: CountryCode;
    /** The language for descriptions, etc. */
    language: LanguageCode;
};

/**
 * A single app and its associated metadata on a top chart.
 */
export type TopChartsEntry = {
    /** The app's position on the respective top chart. */
    position: number;
    /** The app's bundle ID. */
    app_id: string;
    /** A URL to the app's icon. */
    icon_url: string;
    /** URLs to screenshots of the app. */
    screenshot_urls: string[];
    /** The app's name. */
    name: string;
    /** The app's review rating. */
    rating: number;
    /** The app's category. */
    category: string;
    /** The app's price. */
    price: string;
    /** A URL to the Play Store website to buy the app. */
    buy_url: string;
    /** The relative path of the app on the Play Store website, */
    store_path: string;
    /** A URL to a video trailer for the app. */
    trailer_url: string | undefined;
    /** The app's description. */
    description: string;
    /** The app's developer. */
    developer: string;
    /** The approximate download count of the app, as displayed on the Play Store website. */
    downloads: string;
    /** A URL to the app's cover image. */
    cover_image_url: string;
};
/**
 * A list of the entries on the respective top chart.
 */
export type TopChartsResult = TopChartsEntry[];

// This payload was determined by observing the network traffic on the web UI and then _drastically_ simplifying it
// by throwing away everything that didn't affect the response.
export const topChartsRequestPayload = (options: TopChartsRequest): RequestPayload => [
    'vyAe2',
    JSON.stringify([[null, [[null, [null, options.count]], null, null, [113]], [2, options.chart, options.category]]]),
];

export const parseTopChartEntry = (entry: any, idx: number): TopChartsEntry => ({
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

export const parseTopChartPayload = (payload: any): TopChartsEntry[] | undefined => {
    assert(() => payload[0] === 'wrb.fr' && payload[1] === 'vyAe2', 'Correct header.');

    const data = JSON.parse(payload[2]);
    assert(() => data, 'Has inner data.');

    assert(() => data.length === 1, 'One top-level array entry.');
    if (data[0][1] === null) return undefined;
    assert(
        () =>
            data[0][1][0].length === 29 &&
            data[0][1][0][3].length === 1 &&
            data[0][1][0].filter((i: unknown) => i === null).length === 27,
        'Expected inner data structure.'
    );

    const entries: any[] = data[0][1][0][28][0];
    assert(() => entries.length > 0, 'Has data.');

    const parsed = entries.map((e, idx) => {
        assert(() => e.length === 3 && [0, 1, 2].includes(e[2]), 'Expected entry structure.');

        const meta = e[0];

        assert(() => meta.length === 23, 'Meta length.');
        assert(() => meta[8][8][0] === 'CAE=', 'Weird buy param.');
        assert(() => e[1].length === 1 && e[1][0].length === 3, 'Expected weird second meta object structure.');
        const empty_meta = e[1][0].flat(100);
        assert(
            () =>
                empty_meta.filter((i: unknown) => i === null).length === empty_meta.length - 1 &&
                empty_meta[3] === meta[5],
            'Weird second meta object only has category.'
        );

        return parseTopChartEntry(meta, idx);
    });

    assert(
        () =>
            parsed
                .map((p) =>
                    Object.entries(p).filter(
                        ([key, val]) => (val === undefined || val === null) && key !== 'trailer_url'
                    )
                )
                .filter((a) => a.length > 0).length === 0,
        'Only `trailer_url` is ever undefined.'
    );

    return parsed;
};

/**
 * Fetch and parse the current top chart rankings from the Play Store for the given criteria.
 *
 * This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `vyAe2`.
 *
 * @param request The parameters for which top chart to fetch.
 * @param options Language and country options.
 * @returns The top chart.
 */
export async function fetchTopCharts(
    request: TopChartsRequest | [TopChartsRequest],
    options: TopChartsOptions
): Promise<TopChartsResult | undefined>;
/**
 * Same as {@link fetchTopCharts} but for fetching multiple top charts. The top charts are fetched in a single API request.
 *
 * @see {@link fetchTopCharts}
 *
 * @param requests An array of top chart requests.
 * @param options The options for _all_ requests.
 * @returns An array of the top charts, in the same order as the requests.
 */
export async function fetchTopCharts(
    requests: TopChartsRequest[],
    options: TopChartsOptions
): Promise<(TopChartsResult | undefined)[]>;
export async function fetchTopCharts(requests: TopChartsRequest | TopChartsRequest[], options: TopChartsOptions) {
    const _requests = Array.isArray(requests) ? requests : [requests];
    const payloads = await batchExecute(
        _requests.map((r) => topChartsRequestPayload(r)),
        { hl: options.language, gl: options.country }
    );
    const res = payloads.map((p) => parseTopChartPayload(p));
    return _requests.length === 1 ? res[0] : res;
}
