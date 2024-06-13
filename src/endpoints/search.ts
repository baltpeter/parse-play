import { batchExecute, RequestPayload } from '../common/requests';
import { type LanguageCode, type CountryCode } from '../common/consts';
import { assert } from '../common/assert';
import { type AppMetadata, parseAppEntry, formatCurrency } from '../common/data-format';

/**
 * Parameters for a search apps request.
 */
export type SearchAppsRequest = {
    /** The term to search for. */
    searchTerm: string;
};
/**
 * Parameters for all search apps requests in a {@link searchApps} call.
 */
export type SearchAppsOptions = {
    /** The country version of the Play Store to search in. */
    country: CountryCode;
    /** The language for descriptions, etc. */
    language: LanguageCode;
};

/** The properties present in the metadata of each app in the search results. */
export const searchAppMetadataProperties = [
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
/** A property present in the metadata of each app in the search results. */
export type AppMetadataPropertySearch = typeof searchAppMetadataProperties[number];
/**
 * A list of the search results.
 */
export type SearchAppsResults = AppMetadata<AppMetadataPropertySearch>[];

export const searchAppsRequestPayload = (request: SearchAppsRequest): RequestPayload => [
    'lGYRle',
    JSON.stringify([
        [
            [],
            [
                // Number of results, but format is not understood.
                [8, [20, 50]],
                null,
                null,
                [
                    96, 108, 72, 100, 27, 183, 222, 8, 57, 169, 110, 11, 184, 16, 1, 139, 152, 194, 165, 68, 163, 211,
                    9, 71, 31, 195, 12, 64, 151, 150, 148, 113, 104, 55, 56, 145, 32, 34, 10, 122,
                ],
                null,
                null,
                null,
                null,
            ],
            // Search term.
            [request.searchTerm],
            // Type/clusters, 4 is Apps & Games (potentially with featured app).
            4,
            null,
            null,
            null,
            [],
            null,
        ],
        [1],
    ]),
];

export const parseSearchAppsPayload = (data: any, options: SearchAppsOptions): SearchAppsResults | undefined => {
    assert(() => data.length === 4 && data[0].length === 6, 'Expected outer data structure.');

    const sections = data[0][1];
    assert(() => sections.length === 2 || sections.length === 3, 'Has two or three sections.');

    const hasFeaturedApp = sections.length === 3;

    if (!hasFeaturedApp && !sections[1][22]) return [];

    const mainEntries: any[] = hasFeaturedApp ? sections[2][22][0] : sections[1][22][0];
    assert(() => Array.isArray(mainEntries), 'Has main results array.');

    const mainEntriesParsed = mainEntries.map((e, idx) => {
        assert(() => e.length === 1, 'Expected entry structure.');
        const meta = e[0];

        assert(() => meta.length === 102 || meta.length === 101, 'Meta length.');

        return parseAppEntry(meta, searchAppMetadataProperties, { ...options, idx: hasFeaturedApp ? idx + 1 : idx });
    });

    if (hasFeaturedApp) {
        const featuredEntry = sections[1][23];

        assert(() => featuredEntry.length === 18, 'Expected featured entry structure.');
        assert(
            () => featuredEntry[16].length === 40 && featuredEntry[16][2].length === 155,
            'Featured entry inner meta length.'
        );

        const featuredEntryParsed = {
            position: 1,
            app_id: featuredEntry[16][11][0][0],
            icon_url: featuredEntry[16][2][95][0][3][2],
            screenshot_urls: featuredEntry[16][2][78][0].map((s: any) => s[3][2]),
            name: featuredEntry[16][2][0][0],
            rating: featuredEntry[16][2][51][0][1],
            category: featuredEntry[16][2][79][0][0][0],
            price: featuredEntry[16][2][57]
                ? formatCurrency(
                      featuredEntry[16][2][57][0][0][0][0][1][0][0] / 1e6,
                      featuredEntry[16][2][57][0][0][0][0][1][0][1],
                      options
                  )
                : undefined,
            buy_url: featuredEntry[16][2][57]?.[0][0][0][0][6][5][2],
            store_path: featuredEntry[17][0][0][4][2],
            trailer_url: featuredEntry[16][2][100]?.[0][0][3][2],
            description: featuredEntry[16][2][72][0][1],
            developer: featuredEntry[16][2][68][0],
            downloads: featuredEntry[16][2][13][0],
            cover_image_url: featuredEntry[16][2][96][0][3]?.[2],
        };

        return [featuredEntryParsed, ...mainEntriesParsed];
    }

    return mainEntriesParsed;
};

/**
 * Search for apps on the Google Play Stroe.
 *
 * This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `lGYRle`.
 *
 * @param request The parameters for what to search for.
 * @param options Language options.
 * @returns The search results.
 */
export async function searchApps(
    request: SearchAppsRequest | [SearchAppsRequest],
    options: SearchAppsOptions
): Promise<SearchAppsResults | undefined>;
/**
 * Same as {@link searchApps} but for doing multiple searches at once. The search results are fetched in a single API
 * request.
 *
 * @see {@link searchApps}
 *
 * @param requests An array of search apps requests.
 * @param options The options for _all_ requests.
 * @returns An array of the search results, in the same order as the requests.
 */
export async function searchApps(
    requests: SearchAppsRequest[],
    options: SearchAppsOptions
): Promise<(SearchAppsResults | undefined)[]>;
export async function searchApps(requests: SearchAppsRequest | SearchAppsRequest[], options: SearchAppsOptions) {
    const _requests = Array.isArray(requests) ? requests : [requests];
    const data = await batchExecute(
        _requests.map((r) => searchAppsRequestPayload(r)),
        { hl: options.language, gl: options.country }
    );
    const res = data.map((d) => parseSearchAppsPayload(d, options));
    return _requests.length === 1 ? res[0] : res;
}
