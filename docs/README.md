parse-play - v2.2.0

# parse-play - v2.2.0

## Table of contents

### Enumerations

- [categories](enums/categories.md)
- [countries](enums/countries.md)
- [languages](enums/languages.md)

### Type Aliases

- [AppDetailsOptions](README.md#appdetailsoptions)
- [AppDetailsRequest](README.md#appdetailsrequest)
- [AppDetailsResult](README.md#appdetailsresult)
- [AppMetadata](README.md#appmetadata)
- [AppMetadataFull](README.md#appmetadatafull)
- [AppMetadataProperty](README.md#appmetadataproperty)
- [AppMetadataPropertyFetchAppDetails](README.md#appmetadatapropertyfetchappdetails)
- [AppMetadataPropertySearch](README.md#appmetadatapropertysearch)
- [AppMetadataPropertyTopCharts](README.md#appmetadatapropertytopcharts)
- [CategoryId](README.md#categoryid)
- [CountryCode](README.md#countrycode)
- [DataSafetyLabel](README.md#datasafetylabel)
- [DataSafetyLabelDataCategory](README.md#datasafetylabeldatacategory)
- [DataSafetyLabelDataType](README.md#datasafetylabeldatatype)
- [DataSafetyLabelPurpose](README.md#datasafetylabelpurpose)
- [DataSafetyLabelRequest](README.md#datasafetylabelrequest)
- [DataSafetyLabelSecurityPracticesDeclarations](README.md#datasafetylabelsecuritypracticesdeclarations)
- [DataSafetyLabelsOptions](README.md#datasafetylabelsoptions)
- [DataTypeDeclaration](README.md#datatypedeclaration)
- [LanguageCode](README.md#languagecode)
- [PermissionGroup](README.md#permissiongroup)
- [SearchAppsOptions](README.md#searchappsoptions)
- [SearchAppsRequest](README.md#searchappsrequest)
- [SearchAppsResults](README.md#searchappsresults)
- [TopChartsEntry](README.md#topchartsentry)
- [TopChartsOptions](README.md#topchartsoptions)
- [TopChartsRequest](README.md#topchartsrequest)
- [TopChartsResult](README.md#topchartsresult)

### Variables

- [dataSafetyLabelDataCategories](README.md#datasafetylabeldatacategories)
- [dataSafetyLabelDataTypes](README.md#datasafetylabeldatatypes)
- [dataSafetyLabelPurposes](README.md#datasafetylabelpurposes)
- [fetchAppDetailsMetadataProperties](README.md#fetchappdetailsmetadataproperties)
- [searchAppMetadataProperties](README.md#searchappmetadataproperties)
- [topChartsAppMetadataProperties](README.md#topchartsappmetadataproperties)

### Functions

- [fetchAppDetails](README.md#fetchappdetails)
- [fetchDataSafetyLabels](README.md#fetchdatasafetylabels)
- [fetchTopCharts](README.md#fetchtopcharts)
- [parseAppEntry](README.md#parseappentry)
- [searchApps](README.md#searchapps)

## Type Aliases

### AppDetailsOptions

Ƭ **AppDetailsOptions**: `Object`

Parameters for all fetch app details requests in a [fetchAppDetails](README.md#fetchappdetails) call.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `country` | [`CountryCode`](README.md#countrycode) | The country version of the Play Store to fetch from. |
| `language` | [`LanguageCode`](README.md#languagecode) | The language for descriptions, etc. |

#### Defined in

[endpoints/app-details.ts:13](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/app-details.ts#L13)

___

### AppDetailsRequest

Ƭ **AppDetailsRequest**: `Object`

Parameters for a fetch app details request.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId` | `string` | The app ID. |

#### Defined in

[endpoints/app-details.ts:8](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/app-details.ts#L8)

___

### AppDetailsResult

Ƭ **AppDetailsResult**: [`AppMetadata`](README.md#appmetadata)<[`AppMetadataPropertyFetchAppDetails`](README.md#appmetadatapropertyfetchappdetails)\>

The result of a fetch app details request.

#### Defined in

[endpoints/app-details.ts:58](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/app-details.ts#L58)

___

### AppMetadata

Ƭ **AppMetadata**<`P`\>: `Pick`<[`AppMetadataFull`](README.md#appmetadatafull), `P`\>

The metadata for a single app. The available properties depend on which endpoint this was fetched from.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`AppMetadataProperty`](README.md#appmetadataproperty) |

#### Defined in

[common/data-format.ts:112](https://github.com/baltpeter/parse-play/blob/main/src/common/data-format.ts#L112)

___

### AppMetadataFull

Ƭ **AppMetadataFull**: `Object`

The full metadata that can theoretically be fetched for an app. The individual endpoints will only return a subset of
this, see [AppMetadata](README.md#appmetadata).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app_id` | `string` | The app's bundle ID. |
| `buy_url` | `string` \| `undefined` | A URL to the Play Store website to buy the app. |
| `category` | `string` | The app's main category. |
| `content_rating?` | { `icon_url`: `string` ; `interactive_elements?`: `string` ; `label`: `string`  } | The app's content rating. |
| `content_rating.icon_url` | `string` | The URL to an icon for the content rating. |
| `content_rating.interactive_elements?` | `string` | A description of interactive elements in the app. |
| `content_rating.label` | `string` | The label for the content rating. |
| `cover_image_url` | `string` \| `undefined` | A URL to the app's cover image. |
| `data_collected` | [`DataTypeDeclaration`](README.md#datatypedeclaration)[] \| `undefined` | An overview of the data the app may collect. |
| `data_shared` | [`DataTypeDeclaration`](README.md#datatypedeclaration)[] \| `undefined` | An overview of the data that the app may share with other companies or organizations. |
| `description` | `string` | The app's description. |
| `developer` | `string` | The app's developer. |
| `developer_address` | `string` \| `undefined` | The developer's address. |
| `developer_email` | `string` | The developer's email address. |
| `developer_path` | `string` | The relative path of the developer's page on the Play Store website. |
| `developer_website_url` | `string` \| `undefined` | The URL to the developer's website. |
| `downloads` | `string` | The approximate download count of the app as a string, as displayed on the Play Store website. |
| `downloads_exact` | `number` | The exact download count of the app. |
| `icon_url` | `string` | A URL to the app's icon. |
| `in_app_purchases?` | `string` | The cost of in-app purchases for the app. |
| `name` | `string` | The app's name. |
| `offered_by` | `string` | The company distributing the app on the Play Store. |
| `permissions` | [`PermissionGroup`](README.md#permissiongroup)[] | The app's permissions, grouped by category. |
| `position` | `number` | The app's position in a list (top chart, search results). |
| `price` | `string` \| `undefined` | The app's price. Can be undefined for pre-release apps. |
| `privacy_policy_url` | `string` \| `undefined` | The URL to the app's privacy policy. |
| `rating` | `number` \| `undefined` | The app's review rating. |
| `released_on?` | `Date` | The date when the app was first published. |
| `requires_android?` | {} | The app's required version of Android. |
| `screenshot_urls` | `string`[] | URLs to screenshots of the app. |
| `security_practices` | [`DataSafetyLabelSecurityPracticesDeclarations`](README.md#datasafetylabelsecuritypracticesdeclarations) \| `undefined` | An overview of the app's security practices. |
| `store_path` | `string` | The relative path of the app on the Play Store website. |
| `tags?` | { `id?`: `string` ; `name`: `string` ; `path`: `string`  } | A list of the app's categories and related search terms. |
| `tags.id?` | `string` | A machine-readable ID for the tag. |
| `tags.name` | `string` | The name/label of the tag. |
| `tags.path` | `string` | The relative path of the category/search page on the Play Store website. |
| `top_chart_placement?` | { `label`: `string` ; `placement`: `string`  } | The app's placement on a top chart. |
| `top_chart_placement.label` | `string` | The label for the placement. |
| `top_chart_placement.placement` | `string` | The app's position in the top chart. |
| `trailer_url` | `string` \| `undefined` | A URL to a video trailer for the app. |
| `updated_on` | `Date` | The date when the app was last updated. |
| `version?` | `string` | The app's version. |

#### Defined in

[common/data-format.ts:20](https://github.com/baltpeter/parse-play/blob/main/src/common/data-format.ts#L20)

___

### AppMetadataProperty

Ƭ **AppMetadataProperty**: keyof [`AppMetadataFull`](README.md#appmetadatafull)

A property that can be present in the metadata of an app.

#### Defined in

[common/data-format.ts:110](https://github.com/baltpeter/parse-play/blob/main/src/common/data-format.ts#L110)

___

### AppMetadataPropertyFetchAppDetails

Ƭ **AppMetadataPropertyFetchAppDetails**: typeof [`fetchAppDetailsMetadataProperties`](README.md#fetchappdetailsmetadataproperties)[`number`]

A property present when fetching app details.

#### Defined in

[endpoints/app-details.ts:56](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/app-details.ts#L56)

___

### AppMetadataPropertySearch

Ƭ **AppMetadataPropertySearch**: typeof [`searchAppMetadataProperties`](README.md#searchappmetadataproperties)[`number`]

A property present in the metadata of each app in the search results.

#### Defined in

[endpoints/search.ts:42](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/search.ts#L42)

___

### AppMetadataPropertyTopCharts

Ƭ **AppMetadataPropertyTopCharts**: typeof [`topChartsAppMetadataProperties`](README.md#topchartsappmetadataproperties)[`number`]

A property present in the metadata of each app in the top chart.

#### Defined in

[endpoints/top-charts.ts:49](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L49)

___

### CategoryId

Ƭ **CategoryId**: keyof typeof [`categories`](enums/categories.md)

The ID of a category on the Play Store.

#### Defined in

[common/consts.ts:74](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L74)

___

### CountryCode

Ƭ **CountryCode**: keyof typeof [`countries`](enums/countries.md)

The country code of a country supported on the Play Store.

#### Defined in

[common/consts.ts:140](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L140)

___

### DataSafetyLabel

Ƭ **DataSafetyLabel**: `Object`

An app's data safety label.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app_id` | `string` | The app's bundle ID. |
| `data_collected` | [`DataTypeDeclaration`](README.md#datatypedeclaration)[] \| `undefined` | An overview of the data the app may collect. |
| `data_shared` | [`DataTypeDeclaration`](README.md#datatypedeclaration)[] \| `undefined` | An overview of the data that the app may share with other companies or organizations. |
| `developer` | { `address`: `string` \| `undefined` ; `email`: `string` ; `name`: `string` ; `path`: `string` ; `website_url`: `string` \| `undefined`  } | Data about the app's developer. |
| `developer.address` | `string` \| `undefined` | The developer's address. |
| `developer.email` | `string` | The developer's email address. |
| `developer.name` | `string` | The developer's name |
| `developer.path` | `string` | The relative path of the developer's page on the Play Store website. |
| `developer.website_url` | `string` \| `undefined` | The URL to the developer's website. |
| `icon_url` | `string` | The URL to the app's icon. |
| `name` | `string` | The app's name. |
| `privacy_policy_url` | `string` \| `undefined` | The URL to the app's privacy policy. |
| `security_practices` | [`DataSafetyLabelSecurityPracticesDeclarations`](README.md#datasafetylabelsecuritypracticesdeclarations) \| `undefined` | An overview of the app's security practices. |

#### Defined in

[endpoints/data-safety.ts:61](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/data-safety.ts#L61)

___

### DataSafetyLabelDataCategory

Ƭ **DataSafetyLabelDataCategory**: typeof [`dataSafetyLabelDataCategories`](README.md#datasafetylabeldatacategories)[`number`]

A category that groups multiple related data types in a data safety label.

#### Defined in

[common/consts.ts:270](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L270)

___

### DataSafetyLabelDataType

Ƭ **DataSafetyLabelDataType**: typeof [`dataSafetyLabelDataTypes`](README.md#datasafetylabeldatatypes)[`number`]

A type of data that can be declared in a data safety label.

#### Defined in

[common/consts.ts:319](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L319)

___

### DataSafetyLabelPurpose

Ƭ **DataSafetyLabelPurpose**: typeof [`dataSafetyLabelPurposes`](README.md#datasafetylabelpurposes)[`number`]

A purpose for which data collection or sharing can be declared in a data safety label.

#### Defined in

[common/consts.ts:337](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L337)

___

### DataSafetyLabelRequest

Ƭ **DataSafetyLabelRequest**: `Object`

Parameters for a single data safety label request.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app_id` | `string` | The app's bundle ID. |

#### Defined in

[endpoints/data-safety.ts:14](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/data-safety.ts#L14)

___

### DataSafetyLabelSecurityPracticesDeclarations

Ƭ **DataSafetyLabelSecurityPracticesDeclarations**: `Object`

An app's declared security practices in a data safety label.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `can_request_data_deletion` | `boolean` \| `undefined` | Whether the app provides a way for users to request deletion of their data. |
| `committed_to_play_families_policy` | `boolean` \| `undefined` | Whether the developer has reviewed the app's compliance with Google Play's [Families policy requirements](https://support.google.com/googleplay/android-developer/answer/9893335) (only for applicable apps). |
| `data_encrypted_in_transit` | `boolean` \| `undefined` | Whether data collected or shared by the app uses encryption in transit. |
| `independent_security_review` | `boolean` \| `undefined` | Whether the app has been independently validated against a global security standard. |

#### Defined in

[endpoints/data-safety.ts:44](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/data-safety.ts#L44)

___

### DataSafetyLabelsOptions

Ƭ **DataSafetyLabelsOptions**: `Object`

Parameters for all data safety label requests in a [fetchDataSafetyLabels](README.md#fetchdatasafetylabels) call.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | [`LanguageCode`](README.md#languagecode) | The language for descriptions, etc. |

#### Defined in

[endpoints/data-safety.ts:23](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/data-safety.ts#L23)

___

### DataTypeDeclaration

Ƭ **DataTypeDeclaration**: `Object`

An app's declaration for a single data type in a data safety label.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `category` | [`DataSafetyLabelDataCategory`](README.md#datasafetylabeldatacategory) | The category the data type fits into. |
| `optional` | `boolean` | Whether the data type is marked as optional. |
| `purposes` | [`DataSafetyLabelPurpose`](README.md#datasafetylabelpurpose)[] | The purposes for which the data type is collected or shared. |
| `type` | [`DataSafetyLabelDataType`](README.md#datasafetylabeldatatype) | The data type. |

#### Defined in

[endpoints/data-safety.ts:31](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/data-safety.ts#L31)

___

### LanguageCode

Ƭ **LanguageCode**: keyof typeof [`languages`](enums/languages.md)

The language code of a language supported on the Play Store.

#### Defined in

[common/consts.ts:240](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L240)

___

### PermissionGroup

Ƭ **PermissionGroup**: `Object`

A group of related permissions the app has access to.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `icon_url?` | `string` | The URL to the group's icon. |
| `id?` | `string` | A machine-readable ID for the group. |
| `name?` | `string` | The name/label of the group. |
| `permissions` | `string`[] | The detailed permissions in this group the app has access to. |

#### Defined in

[common/data-format.ts:5](https://github.com/baltpeter/parse-play/blob/main/src/common/data-format.ts#L5)

___

### SearchAppsOptions

Ƭ **SearchAppsOptions**: `Object`

Parameters for all search apps requests in a [searchApps](README.md#searchapps) call.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `country` | [`CountryCode`](README.md#countrycode) | The country version of the Play Store to search in. |
| `language` | [`LanguageCode`](README.md#languagecode) | The language for descriptions, etc. |

#### Defined in

[endpoints/search.ts:16](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/search.ts#L16)

___

### SearchAppsRequest

Ƭ **SearchAppsRequest**: `Object`

Parameters for a search apps request.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | The term to search for. |

#### Defined in

[endpoints/search.ts:9](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/search.ts#L9)

___

### SearchAppsResults

Ƭ **SearchAppsResults**: [`AppMetadata`](README.md#appmetadata)<[`AppMetadataPropertySearch`](README.md#appmetadatapropertysearch)\>[]

A list of the search results.

#### Defined in

[endpoints/search.ts:46](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/search.ts#L46)

___

### TopChartsEntry

Ƭ **TopChartsEntry**: [`AppMetadata`](README.md#appmetadata)<[`AppMetadataPropertyTopCharts`](README.md#appmetadatapropertytopcharts)\>

A single app and its associated metadata on a top chart.

#### Defined in

[endpoints/top-charts.ts:54](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L54)

___

### TopChartsOptions

Ƭ **TopChartsOptions**: `Object`

Parameters for all top charts requests in a [fetchTopCharts](README.md#fetchtopcharts) call.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `country` | [`CountryCode`](README.md#countrycode) | The country for which to fetch the top chart(s). |
| `language` | [`LanguageCode`](README.md#languagecode) | The language for descriptions, etc. |

#### Defined in

[endpoints/top-charts.ts:23](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L23)

___

### TopChartsRequest

Ƭ **TopChartsRequest**: `Object`

Parameters for a single top charts request.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `category` | [`CategoryId`](README.md#categoryid) | The category to use. Use `APPLICATION` for all apps, or `GAME` for all games, or one of the subcategory. |
| `chart` | ``"topselling_free"`` \| ``"topgrossing"`` \| ``"topselling_paid"`` | The chart to use, where `topselling_free`: Top free (or Top for €0, Top for $0, depending on the country); `topgrossing`: Top grossing; `topselling_paid`: Top selling. |
| `count` | `number` | The number of apps to include in the top list. This seems to be limited to 660 apps. |

#### Defined in

[endpoints/top-charts.ts:9](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L9)

___

### TopChartsResult

Ƭ **TopChartsResult**: [`TopChartsEntry`](README.md#topchartsentry)[]

A list of the entries on the respective top chart.

#### Defined in

[endpoints/top-charts.ts:58](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L58)

## Variables

### dataSafetyLabelDataCategories

• `Const` **dataSafetyLabelDataCategories**: readonly [``"App activity"``, ``"App info and performance"``, ``"Audio files"``, ``"Calendar"``, ``"Contacts"``, ``"Device or other IDs"``, ``"Files and docs"``, ``"Financial info"``, ``"Health and fitness"``, ``"Location"``, ``"Messages"``, ``"Personal info"``, ``"Photos and videos"``, ``"Web browsing"``]

The categories that group multiple related data types in a data safety label.

Taken from the official documentation: <https://web.archive.org/web/20220701122426/https://support.google.com/googleplay/android-developer/answer/10787469#zippy=%2Cdata-types>

#### Defined in

[common/consts.ts:251](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L251)

___

### dataSafetyLabelDataTypes

• `Const` **dataSafetyLabelDataTypes**: readonly [``"Approximate location"``, ``"Precise location"``, ``"Name"``, ``"Email address"``, ``"User IDs"``, ``"Address"``, ``"Phone number"``, ``"Race and ethnicity"``, ``"Political or religious beliefs"``, ``"Sexual orientation"``, ``"Other info"``, ``"User payment info"``, ``"Purchase history"``, ``"Credit score"``, ``"Other financial info"``, ``"Health info"``, ``"Fitness info"``, ``"Emails"``, ``"SMS or MMS"``, ``"Other in-app messages"``, ``"Photos"``, ``"Videos"``, ``"Voice or sound recordings"``, ``"Music files"``, ``"Other audio files"``, ``"Files and docs"``, ``"Calendar events"``, ``"Contacts"``, ``"App interactions"``, ``"In-app search history"``, ``"Installed apps"``, ``"Other user-generated content"``, ``"Other actions"``, ``"Web browsing history"``, ``"Crash logs"``, ``"Diagnostics"``, ``"Other app performance data"``, ``"Device or other IDs"``]

The types of data that can be declared in a data safety label.

Taken from the official documentation: <https://web.archive.org/web/20220701122426/https://support.google.com/googleplay/android-developer/answer/10787469#zippy=%2Cdata-types>

#### Defined in

[common/consts.ts:276](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L276)

___

### dataSafetyLabelPurposes

• `Const` **dataSafetyLabelPurposes**: readonly [``"App functionality"``, ``"Analytics"``, ``"Developer communications"``, ``"Advertising or marketing"``, ``"Fraud prevention, security, and compliance"``, ``"Personalization"``, ``"Account management"``]

The purposes for which data collection or sharing can be declared in a data safety label.

Taken from the official documentation: <https://web.archive.org/web/20220701122426/https://support.google.com/googleplay/android-developer/answer/10787469#zippy=%2Cpurposes>

#### Defined in

[common/consts.ts:325](https://github.com/baltpeter/parse-play/blob/main/src/common/consts.ts#L325)

___

### fetchAppDetailsMetadataProperties

• `Const` **fetchAppDetailsMetadataProperties**: readonly [``"app_id"``, ``"name"``, ``"content_rating"``, ``"released_on"``, ``"downloads"``, ``"downloads_exact"``, ``"in_app_purchases"``, ``"offered_by"``, ``"rating"``, ``"price"``, ``"buy_url"``, ``"top_chart_placement"``, ``"developer"``, ``"developer_path"``, ``"developer_website_url"``, ``"developer_email"``, ``"developer_address"``, ``"description"``, ``"permissions"``, ``"screenshot_urls"``, ``"category"``, ``"icon_url"``, ``"cover_image_url"``, ``"privacy_policy_url"``, ``"trailer_url"``, ``"tags"``, ``"data_shared"``, ``"data_collected"``, ``"security_practices"``, ``"version"``, ``"requires_android"``, ``"updated_on"``]

The properties present when fetching app details.

#### Defined in

[endpoints/app-details.ts:21](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/app-details.ts#L21)

___

### searchAppMetadataProperties

• `Const` **searchAppMetadataProperties**: readonly [``"position"``, ``"app_id"``, ``"icon_url"``, ``"screenshot_urls"``, ``"name"``, ``"rating"``, ``"category"``, ``"price"``, ``"buy_url"``, ``"store_path"``, ``"trailer_url"``, ``"description"``, ``"developer"``, ``"downloads"``, ``"cover_image_url"``]

The properties present in the metadata of each app in the search results.

#### Defined in

[endpoints/search.ts:24](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/search.ts#L24)

___

### topChartsAppMetadataProperties

• `Const` **topChartsAppMetadataProperties**: readonly [``"position"``, ``"app_id"``, ``"icon_url"``, ``"screenshot_urls"``, ``"name"``, ``"rating"``, ``"category"``, ``"price"``, ``"buy_url"``, ``"store_path"``, ``"trailer_url"``, ``"description"``, ``"developer"``, ``"downloads"``, ``"cover_image_url"``]

The properties present in the metadata of each app in the top chart.

#### Defined in

[endpoints/top-charts.ts:31](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L31)

## Functions

### fetchAppDetails

▸ **fetchAppDetails**(`request`, `options`): `Promise`<[`AppDetailsResult`](README.md#appdetailsresult)\>

Fetch the details/metadata of an app on the Google Play Store.

This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `Ws7gDc`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`AppDetailsRequest`](README.md#appdetailsrequest) \| [[`AppDetailsRequest`](README.md#appdetailsrequest)] | The parameters of which app to fetch the details of. |
| `options` | [`AppDetailsOptions`](README.md#appdetailsoptions) | Language and country options. |

#### Returns

`Promise`<[`AppDetailsResult`](README.md#appdetailsresult)\>

The app details.

#### Defined in

[endpoints/app-details.ts:243](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/app-details.ts#L243)

▸ **fetchAppDetails**(`requests`, `options`): `Promise`<[`AppDetailsResult`](README.md#appdetailsresult)[]\>

Same as [fetchAppDetails](README.md#fetchappdetails) but for fetching the details of multiple apps at once. The details are all fetched in
a single API request.

**`see`** [fetchAppDetails](README.md#fetchappdetails)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requests` | [`AppDetailsRequest`](README.md#appdetailsrequest)[] | An array of fetch app details requests. |
| `options` | [`AppDetailsOptions`](README.md#appdetailsoptions) | The options for _all_ requests. |

#### Returns

`Promise`<[`AppDetailsResult`](README.md#appdetailsresult)[]\>

An array of the app details, in the same order as the requests.

#### Defined in

[endpoints/app-details.ts:257](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/app-details.ts#L257)

___

### fetchDataSafetyLabels

▸ **fetchDataSafetyLabels**(`request`, `options`): `Promise`<[`DataSafetyLabel`](README.md#datasafetylabel) \| `undefined`\>

Fetch and parse the given app's data safety label from the Google Play Store.

This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `Ws7gDc`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`DataSafetyLabelRequest`](README.md#datasafetylabelrequest) \| [[`DataSafetyLabelRequest`](README.md#datasafetylabelrequest)] | The parameters for which app to fetch. |
| `options` | [`DataSafetyLabelsOptions`](README.md#datasafetylabelsoptions) | Language options. |

#### Returns

`Promise`<[`DataSafetyLabel`](README.md#datasafetylabel) \| `undefined`\>

The data safety label.

#### Defined in

[endpoints/data-safety.ts:186](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/data-safety.ts#L186)

▸ **fetchDataSafetyLabels**(`requests`, `options`): `Promise`<([`DataSafetyLabel`](README.md#datasafetylabel) \| `undefined`)[]\>

Same as [fetchDataSafetyLabels](README.md#fetchdatasafetylabels) but for fetching multiple data safety labels at once. The data safety labels
are fetched in a single API request.

**`see`** [fetchDataSafetyLabels](README.md#fetchdatasafetylabels)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requests` | [`DataSafetyLabelRequest`](README.md#datasafetylabelrequest)[] | An array of data safety label requests. |
| `options` | [`DataSafetyLabelsOptions`](README.md#datasafetylabelsoptions) | The options for _all_ requests. |

#### Returns

`Promise`<([`DataSafetyLabel`](README.md#datasafetylabel) \| `undefined`)[]\>

An array of the data safety labels, in the same order as the requests.

#### Defined in

[endpoints/data-safety.ts:200](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/data-safety.ts#L200)

___

### fetchTopCharts

▸ **fetchTopCharts**(`request`, `options`): `Promise`<[`TopChartsResult`](README.md#topchartsresult) \| `undefined`\>

Fetch and parse the current top chart rankings from the Play Store for the given criteria.

This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `vyAe2`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`TopChartsRequest`](README.md#topchartsrequest) \| [[`TopChartsRequest`](README.md#topchartsrequest)] | The parameters for which top chart to fetch. |
| `options` | [`TopChartsOptions`](README.md#topchartsoptions) | Language and country options. |

#### Returns

`Promise`<[`TopChartsResult`](README.md#topchartsresult) \| `undefined`\>

The top chart.

#### Defined in

[endpoints/top-charts.ts:117](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L117)

▸ **fetchTopCharts**(`requests`, `options`): `Promise`<([`TopChartsResult`](README.md#topchartsresult) \| `undefined`)[]\>

Same as [fetchTopCharts](README.md#fetchtopcharts) but for fetching multiple top charts at once. The top charts are fetched in a single
API request.

**`see`** [fetchTopCharts](README.md#fetchtopcharts)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requests` | [`TopChartsRequest`](README.md#topchartsrequest)[] | An array of top chart requests. |
| `options` | [`TopChartsOptions`](README.md#topchartsoptions) | The options for _all_ requests. |

#### Returns

`Promise`<([`TopChartsResult`](README.md#topchartsresult) \| `undefined`)[]\>

An array of the top charts, in the same order as the requests.

#### Defined in

[endpoints/top-charts.ts:131](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L131)

___

### parseAppEntry

▸ **parseAppEntry**<`P`\>(`entry`, `properties`, `options`): [`AppMetadata`](README.md#appmetadata)<`P`\>

Parse an app entry in a search or top chart response.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`AppMetadataFull`](README.md#appmetadatafull) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entry` | `any` |
| `properties` | `P`[] \| readonly `P`[] |
| `options` | `Object` |

#### Returns

[`AppMetadata`](README.md#appmetadata)<`P`\>

#### Defined in

[common/data-format.ts:139](https://github.com/baltpeter/parse-play/blob/main/src/common/data-format.ts#L139)

___

### searchApps

▸ **searchApps**(`request`, `options`): `Promise`<[`SearchAppsResults`](README.md#searchappsresults) \| `undefined`\>

Search for apps on the Google Play Stroe.

This uses the Play Store's internal `batchexecute` endpoint with an RPC ID of `lGYRle`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`SearchAppsRequest`](README.md#searchappsrequest) \| [[`SearchAppsRequest`](README.md#searchappsrequest)] | The parameters for what to search for. |
| `options` | [`SearchAppsOptions`](README.md#searchappsoptions) | Language options. |

#### Returns

`Promise`<[`SearchAppsResults`](README.md#searchappsresults) \| `undefined`\>

The search results.

#### Defined in

[endpoints/search.ts:151](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/search.ts#L151)

▸ **searchApps**(`requests`, `options`): `Promise`<([`SearchAppsResults`](README.md#searchappsresults) \| `undefined`)[]\>

Same as [searchApps](README.md#searchapps) but for doing multiple searches at once. The search results are fetched in a single API
request.

**`see`** [searchApps](README.md#searchapps)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requests` | [`SearchAppsRequest`](README.md#searchappsrequest)[] | An array of search apps requests. |
| `options` | [`SearchAppsOptions`](README.md#searchappsoptions) | The options for _all_ requests. |

#### Returns

`Promise`<([`SearchAppsResults`](README.md#searchappsresults) \| `undefined`)[]\>

An array of the search results, in the same order as the requests.

#### Defined in

[endpoints/search.ts:165](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/search.ts#L165)
