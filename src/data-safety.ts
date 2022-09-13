import { batchExecute, RequestPayload } from './common/requests';
import {
    dataSafetyLabelPurposes,
    LanguageCode,
    DataSafetyLabelDataCategory,
    DataSafetyLabelDataType,
    DataSafetyLabelPurpose,
} from './common/consts';
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
 * An app's declaration for a single data type in a data safety label.
 */
export type DataTypeDeclaration = {
    /** The category the data type fits into. */
    category: DataSafetyLabelDataCategory;
    /** The data type. */
    type: DataSafetyLabelDataType;
    /** The purposes for which the data type is collected or shared. */
    purposes: DataSafetyLabelPurpose[];
    /** Whether the data type is marked as optional. */
    optional: boolean;
};
/**
 * An app's declared security practices in a data safety label.
 */
export type DataSafetyLabelSecurityPracticesDeclarations = {
    /** Whether data collected or shared by the app uses encryption in transit. */
    data_encrypted_in_transit: boolean | undefined;
    /** Whether the app provides a way for users to request deletion of their data. */
    can_request_data_deletion: boolean | undefined;
    /**
     * Whether the developer has reviewed the app's compliance with Google Play's [Families policy
     * requirements](https://support.google.com/googleplay/android-developer/answer/9893335) (only for
     * applicable apps).
     */
    committed_to_play_families_policy: boolean | undefined;
    /** Whether the app has been independently validated against a global security standard. */
    independent_security_review: boolean | undefined;
};
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
    data_shared: DataTypeDeclaration[] | undefined;
    /** An overview of the data the app may collect. */
    data_collected: DataTypeDeclaration[] | undefined;
    /** An overview of the app's security practices. */
    security_practices: DataSafetyLabelSecurityPracticesDeclarations | undefined;
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
    const parseSection = (d: any, idx: number): DataTypeDeclaration[] | undefined =>
        !d
            ? undefined
            : !d[idx][0]
            ? []
            : (d[idx][0] as any[]).flatMap((r: any) =>
                  (r[4] as any[]).map((d: any) => ({
                      category: parseCategory(r[0]).heading,
                      type: d[0],
                      purposes: dataSafetyLabelPurposes.filter((p) => (d[2] as string).includes(p)),
                      optional: d[1],
                  }))
              );

    const securityPracticesEntries: any[] | undefined = data[137][9]?.[2].map(parseCategory);
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
        security_practices: securityPracticesEntries
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
            : undefined,
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
