parse-play - v2.1.0

# parse-play - v2.1.0

## Table of contents

### Enumerations

- [categories](enums/categories.md)
- [countries](enums/countries.md)
- [languages](enums/languages.md)

### Type Aliases

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
- [TopChartsEntry](README.md#topchartsentry)
- [TopChartsOptions](README.md#topchartsoptions)
- [TopChartsRequest](README.md#topchartsrequest)
- [TopChartsResult](README.md#topchartsresult)

### Variables

- [dataSafetyLabelDataCategories](README.md#datasafetylabeldatacategories)
- [dataSafetyLabelDataTypes](README.md#datasafetylabeldatatypes)
- [dataSafetyLabelPurposes](README.md#datasafetylabelpurposes)

### Functions

- [fetchDataSafetyLabels](README.md#fetchdatasafetylabels)
- [fetchTopCharts](README.md#fetchtopcharts)

## Type Aliases

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
| `price` | `string` \| `undefined` | The app's price. Can be undefined for pre-release apps. |
| `rating` | `number` \| `undefined` | The app's review rating. |
| `screenshot_urls` | `string`[] | URLs to screenshots of the app. |
| `store_path` | `string` | The relative path of the app on the Play Store website. |
| `trailer_url` | `string` \| `undefined` | A URL to a video trailer for the app. |

#### Defined in

[endpoints/top-charts.ts:32](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L32)

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

[endpoints/top-charts.ts:22](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L22)

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

[endpoints/top-charts.ts:8](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L8)

___

### TopChartsResult

Ƭ **TopChartsResult**: [`TopChartsEntry`](README.md#topchartsentry)[]

A list of the entries on the respective top chart.

#### Defined in

[endpoints/top-charts.ts:67](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L67)

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

[endpoints/top-charts.ts:142](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L142)

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

[endpoints/top-charts.ts:156](https://github.com/baltpeter/parse-play/blob/main/src/endpoints/top-charts.ts#L156)
