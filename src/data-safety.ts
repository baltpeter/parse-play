import { batchExecute, RequestPayload } from './common/requests';
import { LanguageCode } from './common/consts';
import { assert } from './common/assert';

/**
 * Parameters for a single data safety label request.
 */
export type DataSafetyLabelRequest = {
    /**
     * The app's bundle ID.
     */
    app_id: string;
};
/**
 * Parameters for all data safety label requests in a {@link fetchDataSafetyLabels} call.
 */
export type DataSafetyLabelsOptions = {
    /** The language for descriptions, etc. */
    language: LanguageCode;
};

/**
 * An entry in a row of a data safety label.
 */
export type DataSafetyLabelEntry = {
    /** The entry's heading. */
    heading: string;
    /** The entry's description (subheading). */
    description: string;
    /** A list of URLs to icons that represent the entry. */
    icons: string[];
};
/**
 * A row in a section of a data safety label.
 */
export type DataSafetyLabelRow = {
    /** The entry this row is about. */
    category: DataSafetyLabelEntry;
    /** The data that this row concerns. */
    data: { type: string; purpose: string }[];
};
/**
 * A section in a data safety label.
 */
export type DataSafetyLabelSection = DataSafetyLabelRow[];
/**
 * An app's data safety label.
 */
export type DataSafetyLabel = {
    /** The app's name. */
    name: string;
    /** The app's bundle ID. */
    app_id: string;
    /** Data about the app's developer. */
    developer: {
        /** The developer's name */
        name: string;
        /** The relative path of the developer's page on the Play Store website. */
        path: string;
        /** The URL to the developer's website. */
        website_url: string | undefined;
        /** The developer's email address. */
        email: string;
        /** The developer's address. */
        address: string | undefined;
    };
    /** The URL to the app's icon. */
    icon_url: string;
    /** The URL to the app's privacy policy. */
    privacy_policy_url: string | undefined;
    /** An overview of the data that the app may share with other companies or organizations. */
    data_shared: DataSafetyLabelSection | undefined;
    /** An overview of the data the app may collect. */
    data_collected: DataSafetyLabelSection | undefined;
    /** An overview of the app's security practices. */
    security_practices: DataSafetyLabelEntry | undefined;
};

export const dataSafetyLabelsRequestPayload = (request: DataSafetyLabelRequest): RequestPayload => [
    'Ws7gDc',
    // The numbers seem to determine which data points are returned.
    JSON.stringify([null, null, [[1, 69, 70, 96, 100, 138]], null, null, [[request.app_id, 7]]]),
];

export const parseDataSafetyLabelPayload = (payload: any): DataSafetyLabel | undefined => {
    if (!payload) return undefined;
    assert(
        () => payload.length === 2 && payload[0].flat(Infinity).length === 0 && payload[1].length === 40,
        'Expected inner data structure.'
    );
    const data = payload[1][2];

    const parseCategory = (c: any) => ({
        heading: c[1],
        description: c[2][1],
        icons: [c[0][3][2], c[0][10][2]],
    });
    const parseRow = (r: any) => ({
        category: parseCategory(r[0]),
        data: r[4].map((d: any) => ({ type: d[0], purpose: d[2] })),
    });
    const parseSection = (d: any, idx: number) => (!d ? undefined : !d[idx][0] ? [] : d[idx][0].map(parseRow));

    return {
        name: data[0][0],
        app_id: payload[1][11][0][0],
        developer: {
            name: data[68][0],
            path: data[68][1][4][2],
            website_url: data[69][0]?.[5][2],
            email: data[69][1][0],
            address: data[69][2]?.[0],
        },
        icon_url: data[95][0][3][2],
        privacy_policy_url: data[99]?.[0][5][2],
        data_shared: parseSection(data[137][4], 0),
        data_collected: parseSection(data[137][4], 1),
        security_practices: data[137][9]?.[2].map(parseCategory),
    };
};

/**
 * Fetch and parse the given app's data safety label from the Google Play Store.
 *
 * This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `Ws7gDc`.
 *
 * @param request The parameters for which app to fetch.
 * @param options Language options.
 * @returns The data safety label.
 */
export async function fetchDataSafetyLabels(
    request: DataSafetyLabelRequest | [DataSafetyLabelRequest],
    options: DataSafetyLabelsOptions
): Promise<DataSafetyLabel | undefined>;
/**
 * Same as {@link fetchDataSafetyLabels} but for fetching multiple data safety labels at once. The data safety labels
 * are fetched in a single API request.
 *
 * @see {@link fetchDataSafetyLabels}
 *
 * @param requests An array of data safety label requests.
 * @param options The options for _all_ requests.
 * @returns An array of the data safety labels, in the same order as the requests.
 */
export async function fetchDataSafetyLabels(
    requests: DataSafetyLabelRequest[],
    options: DataSafetyLabelsOptions
): Promise<(DataSafetyLabel | undefined)[]>;
export async function fetchDataSafetyLabels(
    requests: DataSafetyLabelRequest | DataSafetyLabelRequest[],
    options: DataSafetyLabelsOptions
) {
    const _requests = Array.isArray(requests) ? requests : [requests];
    const data = await batchExecute(
        _requests.map((r) => dataSafetyLabelsRequestPayload(r)),
        { hl: options.language }
    );
    const res = data.map(parseDataSafetyLabelPayload);
    return _requests.length === 1 ? res[0] : res;
}
