import { batchExecute, RequestPayload } from '../common/requests';
import { assert } from '../common/assert';
import { formatCurrency, type AppMetadata } from '../common/data-format';
import type { DataTypeDeclaration } from './data-safety';
import { dataSafetyLabelPurposes, type LanguageCode, type CountryCode } from '../common/consts';

/** Parameters for a fetch app details request. */
export type AppDetailsRequest = {
    /** The app ID. */
    appId: string;
};
/** Parameters for all fetch app details requests in a {@link fetchAppDetails} call. */
export type AppDetailsOptions = {
    /** The country version of the Play Store to fetch from. */
    country: CountryCode;
    /** The language for descriptions, etc. */
    language: LanguageCode;
};

/** The properties present when fetching app details. */
export const fetchAppDetailsMetadataProperties = [
    'app_id',
    'name',
    'content_rating',
    'released_on',
    'downloads',
    'downloads_exact',
    'in_app_purchases',
    'offered_by',
    'rating',
    'price',
    'buy_url',
    'top_chart_placement',
    'developer',
    'developer_path',
    'developer_website_url',
    'developer_email',
    'developer_address',
    'description',
    'permissions',
    'screenshot_urls',
    'category',
    'icon_url',
    'cover_image_url',
    'privacy_policy_url',
    'trailer_url',
    'tags',
    'data_shared',
    'data_collected',
    'security_practices',
    'version',
    'requires_android',
    'updated_on',
] as const;
/** A property present when fetching app details. */
export type AppMetadataPropertyFetchAppDetails = typeof fetchAppDetailsMetadataProperties[number];
/** The result of a fetch app details request. */
export type AppDetailsResult = AppMetadata<AppMetadataPropertyFetchAppDetails>;

export const fetchAppDetailsRequestPayload = (request: AppDetailsRequest): RequestPayload => [
    'Ws7gDc',
    JSON.stringify([
        null,
        null,
        [
            [
                1, 9, 10, 11, 13, 14, 19, 20, 38, 43, 47, 49, 52, 58, 59, 63, 69, 70, 73, 74, 75, 78, 79, 80, 91, 92,
                95, 96, 97, 100, 101, 103, 106, 112, 119, 129, 137, 138, 139, 141, 145, 146, 151, 155, 169,
            ],
        ],
        [
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                [null, 2],
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                [1],
            ],
            [null, [[[]]], null, null, [1]],
            [null, [[[]]], null, [1]],
            [null, [[[]]]],
            null,
            null,
            null,
            null,
            [[[[]]]],
            [[[[]]]],
        ],
        null,
        [[request.appId, 7]],
    ]),
];

const parseDslCategory = (c: any) => ({
    heading: c[1],
    description: c[2][1],
    icons: [c[0][3][2], c[0][10][2]],
});
const parseDslSection = (d: any, idx: number): DataTypeDeclaration[] | undefined =>
    !d
        ? undefined
        : !d[idx][0]
        ? []
        : (d[idx][0] as any[]).flatMap((r: any) =>
              (r[4] as any[]).map((d: any) => ({
                  category: parseDslCategory(r[0]).heading,
                  type: d[0],
                  purposes: dataSafetyLabelPurposes.filter((p) => (d[2] as string).includes(p)),
                  optional: d[1],
              }))
          );
const parseSecurityPractices = (data: any) => {
    const securityPracticesEntries: any[] | undefined = data[137]?.[9]?.[2].map(parseDslCategory);
    assert(() => {
        if (!securityPracticesEntries) return true;

        const knownHeadings = new Set([
            'Data is encrypted in transit',
            'You can request that data be deleted',
            'Data can’t be deleted',
            'Data isn’t encrypted',
            'Committed to follow the Play Families Policy',
            'Independent security review',
        ]);
        return securityPracticesEntries?.map((e) => e.heading).every((h) => knownHeadings.has(h));
    }, 'Only known security practice entries.');
    const hasSecurityPracticeAttribute = (positiveHeading?: string, negativeHeading?: string) => {
        if (positiveHeading && securityPracticesEntries?.find((e) => e.heading === positiveHeading)) return true;
        if (negativeHeading && securityPracticesEntries?.find((e) => e.heading === negativeHeading)) return false;
        return undefined;
    };

    return securityPracticesEntries
        ? {
              data_encrypted_in_transit: hasSecurityPracticeAttribute(
                  'Data is encrypted in transit',
                  'Data isn’t encrypted'
              ),
              can_request_data_deletion: hasSecurityPracticeAttribute(
                  'You can request that data be deleted',
                  'Data can’t be deleted'
              ),
              committed_to_play_families_policy: hasSecurityPracticeAttribute(
                  'Committed to follow the Play Families Policy'
              ),
              independent_security_review: hasSecurityPracticeAttribute('Independent security review'),
          }
        : undefined;
};

export const parseAppDetailsPayload = (payload: any, options: AppDetailsOptions): AppDetailsResult | undefined => {
    if (!payload) return undefined;
    assert(
        () => payload.length === 3 && payload[0].flat(Infinity).length === 0 && payload[1].length === 40,
        'Expected inner data structure.'
    );
    const data = payload[1][2];

    return {
        app_id: payload[1][11][0][0] || data[77][0],
        name: data[0][0],
        content_rating: data[9]
            ? { label: data[9][0], icon_url: data[9][1][3][2], interactive_elements: data[9][3]?.[1] }
            : undefined,
        released_on: data[10] ? new Date(data[10][1][0] * 1000) : undefined,
        downloads: data[13][0],
        downloads_exact: data[13][2],
        in_app_purchases: data[19]?.[0],
        offered_by: data[37][0],
        rating: data[51][0][1],
        price: data[57][0][0][0][0]
            ? formatCurrency(data[57][0][0][0][0]?.[1][0][0] / 1e6, data[57][0][0][0][0]?.[1][0][1], options)
            : undefined,
        buy_url: data[57][0][0][0][0][6][5][2],
        top_chart_placement: data[58] ? { label: data[58][0], placement: data[58][2] } : undefined,
        developer: data[68][0],
        developer_path: data[68][1][4][2],
        developer_website_url: data[69][0]?.[5][2],
        developer_email: data[69][1][0],
        developer_address: data[69][2]?.[0],
        description: data[72][0][1],
        permissions: [
            ...(data[74][2][0] || []),
            ...(data[74][2][1] || []),
            [undefined, undefined, data[74][2][2], undefined],
        ]
            .filter((g) => g[2]?.length > 0)
            .map((g) => ({
                id: g[3]?.[0],
                name: g[0],
                icon_url: g[1]?.[3][2],
                permissions: g[2].map((p: any) => p[1]),
            })),
        screenshot_urls: data[78][0].map((s: any) => s[3][2]),
        category: data[79][0][0][0],
        icon_url: data[95][0][3][2],
        cover_image_url: data[96][0][3][2],
        privacy_policy_url: data[99]?.[0][5][2],
        trailer_url: data[100]?.[0][0][3][2],
        tags: data[118]
            ?.filter(Boolean)
            .map((g: any) => (typeof g[0][0][0] === 'string' ? g[0] : g[0][0]))
            .flat()
            .map((t: any) => ({ id: t[2], name: t[0], path: t[1][4][2] })),
        data_shared: parseDslSection(data[137][4], 0),
        data_collected: parseDslSection(data[137][4], 1),
        security_practices: parseSecurityPractices(data),
        version: data[140][0][0]?.[0],
        requires_android: data[140][1][1][0]
            ? { version: data[140][1][1][0][0][1], api_level: data[140][1][1][0][0][0] }
            : undefined,
        updated_on: new Date(data[145][0][1][0] * 1000),
    };
};

/**
 * Fetch the details/metadata of an app on the Google Play Store.
 *
 * This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `Ws7gDc`.
 *
 * @param request The parameters of which app to fetch the details of.
 * @param options Language and country options.
 * @returns The app details.
 */
export async function fetchAppDetails(
    request: AppDetailsRequest | [AppDetailsRequest],
    options: AppDetailsOptions
): Promise<AppDetailsResult>;
/**
 * Same as {@link fetchAppDetails} but for fetching the details of multiple apps at once. The details are all fetched in
 * a single API request.
 *
 * @see {@link fetchAppDetails}
 *
 * @param requests An array of fetch app details requests.
 * @param options The options for _all_ requests.
 * @returns An array of the app details, in the same order as the requests.
 */
export async function fetchAppDetails(
    requests: AppDetailsRequest[],
    options: AppDetailsOptions
): Promise<AppDetailsResult[]>;
export async function fetchAppDetails(requests: AppDetailsRequest | AppDetailsRequest[], options: AppDetailsOptions) {
    const _requests = Array.isArray(requests) ? requests : [requests];
    const data = await batchExecute(
        _requests.map((r) => fetchAppDetailsRequestPayload(r)),
        { hl: options.language, gl: options.country }
    );
    const res = data.map((d) => parseAppDetailsPayload(d, options));
    return _requests.length === 1 ? res[0] : res;
}
