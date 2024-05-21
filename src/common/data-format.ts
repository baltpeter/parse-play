import type { LanguageCode, CountryCode } from './consts';

/**
 * A single app and its associated metadata.
 */
export type AppMetadata = {
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

export const formatCurrency = (
    value: number,
    currency: string,
    options: { language: LanguageCode; country: CountryCode }
) => new Intl.NumberFormat(`${options.language}-${options.country}`, { style: 'currency', currency }).format(value);
export const parseAppEntry = (
    entry: any,
    idx: number,
    options: { language: LanguageCode; country: CountryCode }
): AppMetadata => ({
    position: idx + 1,
    app_id: entry[0][0],
    icon_url: entry[1][3][2],
    screenshot_urls: entry[2].map((s: any) => s[3][2]),
    name: entry[3],
    rating: entry[4][1],
    category: entry[5],
    price: entry[8] ? formatCurrency(entry[8]?.[1][0][0] / 1e6, entry[8]?.[1][0][1], options) : undefined,
    buy_url: entry[8]?.[6][5][2],
    store_path: entry[10][4][2],
    trailer_url: entry[12]?.[0][0][3][2],
    description: entry[13][1],
    developer: entry[14],
    downloads: entry[15],
    cover_image_url: entry[22][3]?.[2],
});
