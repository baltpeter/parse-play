import { batchExecute, RequestPayload } from '../common/requests';
import { CategoryId, LanguageCode, CountryCode } from '../common/consts';
import { assert } from '../common/assert';
import { AppMetadata, parseAppEntry } from '../common/data-format';

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
 * Parameters for all top charts requests in a {@link fetchTopCharts} call.
 */
export type TopChartsOptions = {
    /** The country for which to fetch the top chart(s). */
    country: CountryCode;
    /** The language for descriptions, etc. */
    language: LanguageCode;
};

/** The properties present in the metadata of each app in the top chart. */
export const topChartsAppMetadataProperties = [
    'position',
    'app_id',
    'icon_url',
    'screenshot_urls',
    'name',
    'rating',
    'category',
    'price',
    'buy_url',
    'store_path',
    'trailer_url',
    'description',
    'developer',
    'downloads',
    'cover_image_url',
] as const;
/** A property present in the metadata of each app in the top chart. */
export type AppMetadataPropertyTopCharts = typeof topChartsAppMetadataProperties[number];

/**
 * A single app and its associated metadata on a top chart.
 */
export type TopChartsEntry = AppMetadata<AppMetadataPropertyTopCharts>;
/**
 * A list of the entries on the respective top chart.
 */
export type TopChartsResult = TopChartsEntry[];

// This payload was determined by observing the network traffic on the web UI and then _drastically_ simplifying it
// by throwing away everything that didn't affect the response.
export const topChartsRequestPayload = (request: TopChartsRequest): RequestPayload => [
    'vyAe2',
    JSON.stringify([[null, [[null, [null, request.count]], null, null, [113]], [2, request.chart, request.category]]]),
];

/**
 * @deprecated This is now {@link parseAppEntry} instead. This alias will be removed in a future release.
 */
export const parseTopChartEntry = parseAppEntry;
export const parseTopChartPayload = (data: any, options: TopChartsOptions): TopChartsEntry[] | undefined => {
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
        const empty_meta = e[1][0].flat(Infinity);
        assert(
            () =>
                empty_meta.filter((i: unknown) => i === null).length === empty_meta.length - 1 &&
                empty_meta[3] === meta[5],
            'Weird second meta object only has category.'
        );

        return parseAppEntry(meta, topChartsAppMetadataProperties, { ...options, idx });
    });

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
 * Same as {@link fetchTopCharts} but for fetching multiple top charts at once. The top charts are fetched in a single
 * API request.
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
    const data = await batchExecute(
        _requests.map((r) => topChartsRequestPayload(r)),
        { hl: options.language, gl: options.country }
    );
    const res = data.map((d) => parseTopChartPayload(d, options));
    return _requests.length === 1 ? res[0] : res;
}
