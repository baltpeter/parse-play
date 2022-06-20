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
- [LanguageCode](README.md#languagecode)
- [TopChartsEntry](README.md#topchartsentry)
- [TopChartsOptions](README.md#topchartsoptions)
- [TopChartsRequest](README.md#topchartsrequest)
- [TopChartsResult](README.md#topchartsresult)

### Functions

- [fetchTopCharts](README.md#fetchtopcharts)

## Type Aliases

### CategoryId

Ƭ **CategoryId**: keyof typeof [`categories`](enums/categories.md)

The ID of a category on the Play Store.

#### Defined in

[common/consts.ts:70](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/common/consts.ts#L70)

___

### CountryCode

Ƭ **CountryCode**: keyof typeof [`countries`](enums/countries.md)

The country code of a country supported on the Play Store.

#### Defined in

[common/consts.ts:136](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/common/consts.ts#L136)

___

### LanguageCode

Ƭ **LanguageCode**: keyof typeof [`languages`](enums/languages.md)

The language code of a language supported on the Play Store.

#### Defined in

[common/consts.ts:236](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/common/consts.ts#L236)

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
| `store_path` | `string` | The relative path of the app on the Play Store website, |
| `trailer_url` | `string` \| `undefined` | A URL to a video trailer for the app. |

#### Defined in

[top-charts.ts:32](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/top-charts.ts#L32)

___

### TopChartsOptions

Ƭ **TopChartsOptions**: `Object`

Parameters for all top charts request in a [fetchTopCharts](README.md#fetchtopcharts) call.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `country` | [`CountryCode`](README.md#countrycode) | The country for which to fetch the top chart(s). |
| `language` | [`LanguageCode`](README.md#languagecode) | The language for descriptions, etc. |

#### Defined in

[top-charts.ts:22](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/top-charts.ts#L22)

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

[top-charts.ts:8](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/top-charts.ts#L8)

___

### TopChartsResult

Ƭ **TopChartsResult**: [`TopChartsEntry`](README.md#topchartsentry)[]

A list of the entries on the respective top chart.

#### Defined in

[top-charts.ts:67](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/top-charts.ts#L67)

## Functions

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

[top-charts.ts:144](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/top-charts.ts#L144)

▸ **fetchTopCharts**(`requests`, `options`): `Promise`<([`TopChartsResult`](README.md#topchartsresult) \| `undefined`)[]\>

Same as [fetchTopCharts](README.md#fetchtopcharts) but for fetching multiple top charts. The top charts are fetched in a single API request.

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

[top-charts.ts:157](https://github.com/baltpeter/parse-play/blob/d18a5c3/src/top-charts.ts#L157)
