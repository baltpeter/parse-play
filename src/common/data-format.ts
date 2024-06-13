import type { LanguageCode, CountryCode } from './consts';

/**
 * The full metadata that can theoretically be fetched for an app. The individual endpoints will only return a subset of
 * this, see {@link AppMetadata}.
 */
export type AppMetadataFull = {
    /** The app's position in a list (top chart, search results). */
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
    rating: number | undefined;
    /** The app's category. */
    category: string;
    /** The app's price. Can be undefined for pre-release apps. */
    price: string | undefined;
    /** A URL to the Play Store website to buy the app. */
    buy_url: string | undefined;
    /** The relative path of the app on the Play Store website. */
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
    cover_image_url: string | undefined;
};
/** A property that can be present in the metadata of an app. */
export type AppMetadataProperty = keyof AppMetadataFull;
/** The metadata for a single app. The available properties depend on which endpoint this was fetched from. */
export type AppMetadata<P extends AppMetadataProperty> = Pick<AppMetadataFull, P>;

export const formatCurrency = (
    value: number,
    currency: string,
    options: { language: LanguageCode; country: CountryCode }
) => new Intl.NumberFormat(`${options.language}-${options.country}`, { style: 'currency', currency }).format(value);

const appMetadataProperties: Record<
    Exclude<AppMetadataProperty, 'position'>,
    (d: any, options: { language: LanguageCode; country: CountryCode }) => any
> = {
    app_id: (d) => d[0][0],
    icon_url: (d) => d[1][3][2],
    screenshot_urls: (d) => d[2].map((s: any) => s[3][2]),
    name: (d) => d[3],
    rating: (d) => d[4][1],
    category: (d) => d[5],
    price: (d, o) => (d[8] ? formatCurrency(d[8]?.[1][0][0] / 1e6, d[8]?.[1][0][1], o) : undefined),
    buy_url: (d) => d[8]?.[6][5][2],
    store_path: (d) => d[10][4][2],
    trailer_url: (d) => d[12]?.[0][0][3][2],
    description: (d) => d[13][1],
    developer: (d) => d[14],
    downloads: (d) => d[15],
    cover_image_url: (d) => d[22][3]?.[2],
};
export const parseAppEntry = <P extends AppMetadataProperty>(
    entry: any,
    properties: P[] | readonly P[],
    options: { language: LanguageCode; country: CountryCode; idx?: number }
): AppMetadata<P> => {
    const res: Record<string, any> = {};

    if (options.idx) res.position = options.idx + 1;

    for (const [property, getter] of Object.entries(appMetadataProperties).filter(([p]) =>
        properties.includes(p as P)
    )) {
        res[property] = getter(entry, options);
    }

    return res as AppMetadata<P>;
};
