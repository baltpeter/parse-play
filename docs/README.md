parse-play - v1.0.1

# parse-play - v1.0.1

## Table of contents

### Enumerations

- [categories](enums/categories.md)
- [countries](enums/countries.md)
- [languages](enums/languages.md)

### Type Aliases

- [CategoryId](README.md#categoryid)
- [CountryCode](README.md#countrycode)
- [DataSafetyLabel](README.md#datasafetylabel)
- [DataSafetyLabelEntry](README.md#datasafetylabelentry)
- [DataSafetyLabelRequest](README.md#datasafetylabelrequest)
- [DataSafetyLabelRow](README.md#datasafetylabelrow)
- [DataSafetyLabelSection](README.md#datasafetylabelsection)
- [DataSafetyLabelsOptions](README.md#datasafetylabelsoptions)
- [LanguageCode](README.md#languagecode)
- [TopChartsEntry](README.md#topchartsentry)
- [TopChartsOptions](README.md#topchartsoptions)
- [TopChartsRequest](README.md#topchartsrequest)
- [TopChartsResult](README.md#topchartsresult)

### Functions

- [fetchDataSafetyLabels](README.md#fetchdatasafetylabels)
- [fetchTopCharts](README.md#fetchtopcharts)

## Type Aliases

### CategoryId

Ƭ **CategoryId**: keyof typeof [`categories`](enums/categories.md)

The ID of a category on the Play Store.

#### Defined in

[common/consts.ts:70](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/common/consts.ts#L70)

___

### CountryCode

Ƭ **CountryCode**: keyof typeof [`countries`](enums/countries.md)

The country code of a country supported on the Play Store.

#### Defined in

[common/consts.ts:136](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/common/consts.ts#L136)

___

### DataSafetyLabel

Ƭ **DataSafetyLabel**: `Object`

An app's data safety label.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app_id` | `string` | The app's bundle ID. |
| `data_collected` | [`DataSafetyLabelSection`](README.md#datasafetylabelsection) \| `undefined` | An overview of the data the app may collect. |
| `data_shared` | [`DataSafetyLabelSection`](README.md#datasafetylabelsection) \| `undefined` | An overview of the data that the app may share with other companies or organizations. |
| `developer` | { `address`: `string` \| `undefined` ; `email`: `string` ; `name`: `string` ; `path`: `string` ; `website_url`: `string` \| `undefined`  } | Data about the app's developer. |
| `developer.address` | `string` \| `undefined` | The developer's address. |
| `developer.email` | `string` | The developer's email address. |
| `developer.name` | `string` | The developer's name |
| `developer.path` | `string` | The relative path of the developer's page on the Play Store website. |
| `developer.website_url` | `string` \| `undefined` | The URL to the developer's website. |
| `icon_url` | `string` | The URL to the app's icon. |
| `name` | `string` | The app's name. |
| `privacy_policy_url` | `string` \| `undefined` | The URL to the app's privacy policy. |
| `security_practices` | [`DataSafetyLabelEntry`](README.md#datasafetylabelentry) \| `undefined` | An overview of the app's security practices. |

#### Defined in

[data-safety.ts:49](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L49)

___

### DataSafetyLabelEntry

Ƭ **DataSafetyLabelEntry**: `Object`

An entry in a row of a data safety label.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | The entry's description (subheading). |
| `heading` | `string` | The entry's heading. |
| `icons` | `string`[] | A list of URLs to icons that represent the entry. |

#### Defined in

[data-safety.ts:25](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L25)

___

### DataSafetyLabelRequest

Ƭ **DataSafetyLabelRequest**: `Object`

Parameters for a single data safety label request.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app_id` | `string` | The app's bundle ID. |

#### Defined in

[data-safety.ts:8](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L8)

___

### DataSafetyLabelRow

Ƭ **DataSafetyLabelRow**: `Object`

A row in a section of a data safety label.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `category` | [`DataSafetyLabelEntry`](README.md#datasafetylabelentry) | The entry this row is about. |
| `data` | {}[] | The data that this row concerns. |

#### Defined in

[data-safety.ts:36](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L36)

___

### DataSafetyLabelSection

Ƭ **DataSafetyLabelSection**: [`DataSafetyLabelRow`](README.md#datasafetylabelrow)[]

A section in a data safety label.

#### Defined in

[data-safety.ts:45](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L45)

___

### DataSafetyLabelsOptions

Ƭ **DataSafetyLabelsOptions**: `Object`

Parameters for all data safety label requests in a [fetchDataSafetyLabels](README.md#fetchdatasafetylabels) call.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | [`LanguageCode`](README.md#languagecode) | The language for descriptions, etc. |

#### Defined in

[data-safety.ts:17](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L17)

___

### LanguageCode

Ƭ **LanguageCode**: keyof typeof [`languages`](enums/languages.md)

The language code of a language supported on the Play Store.

#### Defined in

[common/consts.ts:236](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/common/consts.ts#L236)

___

### TopChartsEntry

Ƭ **TopChartsEntry**: `Object`

A single app and its associated metadata on a top chart.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app_id` | `string` | The app's bundle ID. |
| `buy_url` | `string` \| `undefined` | A URL to the Play Store website to buy the app. |
| `category` | `string` | The app's category. |
| `cover_image_url` | `string` \| `undefined` | A URL to the app's cover image. |
| `description` | `string` | The app's description. |
| `developer` | `string` | The app's developer. |
| `downloads` | `string` | The approximate download count of the app, as displayed on the Play Store website. |
| `icon_url` | `string` | A URL to the app's icon. |
| `name` | `string` | The app's name. |
| `position` | `number` | The app's position on the respective top chart. |
| `price` | `string` \| `undefined` | The app's price. |
| `rating` | `number` | The app's review rating. |
| `screenshot_urls` | `string`[] | URLs to screenshots of the app. |
| `store_path` | `string` | The relative path of the app on the Play Store website. |
| `trailer_url` | `string` \| `undefined` | A URL to a video trailer for the app. |

#### Defined in

[top-charts.ts:32](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/top-charts.ts#L32)

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

[top-charts.ts:22](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/top-charts.ts#L22)

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

[top-charts.ts:8](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/top-charts.ts#L8)

___

### TopChartsResult

Ƭ **TopChartsResult**: [`TopChartsEntry`](README.md#topchartsentry)[]

A list of the entries on the respective top chart.

#### Defined in

[top-charts.ts:67](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/top-charts.ts#L67)

## Functions

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

[data-safety.ts:131](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L131)

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

[data-safety.ts:145](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/data-safety.ts#L145)

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

[top-charts.ts:140](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/top-charts.ts#L140)

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

[top-charts.ts:154](https://github.com/baltpeter/parse-play/blob/fb37ee5/src/top-charts.ts#L154)
