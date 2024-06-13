import { LanguageCode, CountryCode } from './consts';
import type { DataTypeDeclaration, DataSafetyLabelSecurityPracticesDeclarations } from '../endpoints/data-safety';

/** A group of related permissions the app has access to. */
export type PermissionGroup = {
    /** A machine-readable ID for the group. */
    id?: string;
    /** The name/label of the group. */
    name?: string;
    /** The URL to the group's icon. */
    icon_url?: string;
    /** The detailed permissions in this group the app has access to. */
    permissions: string[];
};

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
    /** The number of each rating the app has received. */
    rating_counts: {
        /** The number of 1-star ratings. */
        1: number;
        /** The number of 2-star ratings. */
        2: number;
        /** The number of 3-star ratings. */
        3: number;
        /** The number of 4-star ratings. */
        4: number;
        /** The number of 5-star ratings. */
        5: number;
        /** The total number of ratings. */
        total: number;
    };
    /** The app's main category. */
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
    /** The relative path of the developer's page on the Play Store website. */
    developer_path: string;
    /** The URL to the developer's website. */
    developer_website_url: string | undefined;
    /** The developer's email address. */
    developer_email: string;
    /** The developer's address. */
    developer_address: string | undefined;
    /** The URL to the app's privacy policy. */
    privacy_policy_url: string | undefined;
    /** An overview of the data that the app may share with other companies or organizations. */
    data_shared: DataTypeDeclaration[] | undefined;
    /** An overview of the data the app may collect. */
    data_collected: DataTypeDeclaration[] | undefined;
    /** An overview of the app's security practices. */
    security_practices: DataSafetyLabelSecurityPracticesDeclarations | undefined;
    /** The approximate download count of the app as a string, as displayed on the Play Store website. */
    downloads: string;
    /** The exact download count of the app. */
    downloads_exact: number;
    /** A URL to the app's cover image. */
    cover_image_url: string | undefined;
    /** The app's permissions, grouped by category. */
    permissions: PermissionGroup[];
    /** The date when the app was last updated. */
    updated_on: Date;
    /** The date when the app was first published. */
    released_on?: Date;
    /** The cost of in-app purchases for the app. */
    in_app_purchases?: string;
    /** The app's content rating. */
    content_rating?: {
        /** The label for the content rating. */
        label: string;
        /** The URL to an icon for the content rating. */
        icon_url: string;
        /** A description of interactive elements in the app. */
        interactive_elements?: string;
    };
    /** The app's placement on a top chart. */
    top_chart_placement?: {
        /** The label for the placement. */
        label: string;
        /** The app's position in the top chart. */
        placement: string;
    };
    /** A list of the app's categories and related search terms. */
    tags?: {
        /** A machine-readable ID for the tag. */
        id?: string;
        /** The name/label of the tag. */
        name: string;
        /** The relative path of the category/search page on the Play Store website. */
        path: string;
    };
    /** The app's version. */
    version?: string;
    /** The app's required version of Android. */
    requires_android?: { version: string; api_level: number };
    /** The company distributing the app on the Play Store. */
    offered_by: string;
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

const appMetadataProperties: Partial<
    Record<AppMetadataProperty, (d: any, options: { language: LanguageCode; country: CountryCode }) => any>
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
/** Parse an app entry in a search or top chart response. */
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
