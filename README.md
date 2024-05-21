# parse-play

> Library for fetching and parsing select data on Android apps from the Google Play Store via undocumented internal APIs.

This library is able to fetch and parse data from undocumented internal API endpoints of the Google Play Store. Currently, it has the following features:

* Fetch the **charts of the most popular apps**, including filtering by category and chart.
* Fetch apps' **data safety labels**.
* **Search** for apps.

I'll extend the supported API endpoints over time, as per what I need for my projects. The focus will likely be on functions useful for research into mobile privacy and data protection.

As all the used endpoints are undocumented, I had to resort to reverse-engineering the Play Store website, which involved some amount of guessing as to which values mean what. It is possible that I have misinterpreted some of them. It is also entirely possible that some or all of the endpoints will stop working out of the blue at some point, or change their request and/or response formats.

## Installation

You can install parse-play using yarn or npm:

```sh
yarn add parse-play
# or `npm i parse-play`
```

## API reference

A full API reference can be found in the [`docs` folder](/docs/README.md).

## Usage examples

### Fetch app top charts

The following example fetches the current top 100 free apps across all categories for Germany:

```ts
import { fetchTopCharts } from 'parse-play';

(async () => {
    const topChart = await fetchTopCharts(
        { category: 'APPLICATION', chart: 'topselling_free', count: 100 },
        { country: 'DE', language: 'EN' }
    );

    console.log(topChart?.length); // 100
    console.log(topChart?.[0]?.app_id, topChart?.[0]?.name); // com.amazon.mShop.android.shopping Amazon Shopping
})();
```

You can also request multiple top charts at once. These will all be fetched in a single API request. Note that country and language apply to _all_ requests in a batch.

This example fetches the top 5 free education apps, as well as the top 1000 paid adventure game apps, both for the UK:

```ts
const topCharts = await fetchTopCharts(
    [
        { category: 'EDUCATION', chart: 'topselling_free', count: 5 },
        { category: 'GAME_ADVENTURE', chart: 'topselling_paid', count: 1000 },
    ],
    { country: 'GB', language: 'EN' }
);

console.log(topCharts[0]?.length); // 5
console.log(topCharts[0]?.[0]?.app_id, topCharts?.[0]?.[0]?.name); // cn.danatech.xingseus PictureThis - Plant Identifier
console.log(topCharts[1]?.length); // 660
console.log(topCharts[1]?.[0]?.app_id, topCharts?.[1]?.[0]?.name); // com.MOBGames.PoppyMobileChap1 Poppy Playtime Chapter 1
```

Note that despite us trying to fetch 1000 apps for the second chart, only 660 apps were returned. This is a server-side limit.

### Fetch an app's data safety labels

The following example fetches the data safety labels for TikTok in English:

```ts
import { fetchDataSafetyLabels } from 'parse-play';

(async () => {
    const labels = await fetchDataSafetyLabels([{ app_id: 'com.zhiliaoapp.musically' }], { language: 'EN', });
    console.dir(labels, { depth: null });
})();
```

<details>
<summary>Data safety label response</summary>
The response looks like this:

```ts
{
  name: 'TikTok',
  app_id: 'com.zhiliaoapp.musically',
  developer: {
    name: 'TikTok Pte. Ltd.',
    path: '/store/apps/developer?id=TikTok+Pte.+Ltd.',
    website_url: 'https://www.tiktok.com/',
    email: 'feedback@tiktok.com',
    address: '201 Henderson Road,\n#06-22 Apex@Henderson,\nSingapore 159545 Singapore'
  },
  icon_url: 'https://play-lh.googleusercontent.com/iBYjvYuNq8BB7EEEHktPG1fpX9NiY7Jcyg1iRtQxO442r9CZ8H-X9cLkTjpbORwWDG9d',
  privacy_policy_url: 'https://www.tiktok.com/legal/privacy-policy',
  data_shared: [],
  data_collected: [
    {
      category: 'Location',
      type: 'Approximate location',
      purposes: [
        'App functionality',
        'Analytics',
        'Advertising or marketing',
        'Personalization'
      ]
    },
    // …
  ],
  security_practices: {
    data_encrypted_in_transit: true,
    can_request_data_deletion: true,
    committed_to_play_families_policy: undefined,
    independent_security_review: undefined
  }
}
```
</details>

You can also request the labels for multiple apps at once by adding corresponding objects to the first parameter, they will all be fetched in a single API request.

### Search for apps

The following example searches for the term "education":

```ts
import { searchApps } from 'parse-play';

(async () => {
    const searchResult = await searchApps({ searchTerm: 'education' }, { language: 'EN', country: 'DE' });
    console.dir(searchResult, { depth: null });
})();
```

<details>
<summary>Search apps response</summary>
The response looks like this:

```ts
[
  {
    position: 1,
    app_id: 'de.easysoft.app.education',
    icon_url: 'https://play-lh.googleusercontent.com/KZ19KJw8vrNy6gpRtyzLAGichfxShCU9L2kZdJbnKs6mrKblKqcWBvM5v9QdgEW-SGFR',
    screenshot_urls: [
      'https://play-lh.googleusercontent.com/Bh0sDOl-oOcOtmjKTIXL4eE_vIcDqntnrwqvoi9qylQjptmPnMtZyMkUxUh4JnC0hQ',
      'https://play-lh.googleusercontent.com/vlOZjzYHjRZEwBTWYVWxkWvXMEjtJGJ2tbJQJuNuB89wgXA-MVLM5MwaJOhRMdY7vA',
      'https://play-lh.googleusercontent.com/zEiBcIIuY6LP_BbNZQ5PxxilZMmkf6dOn2XsYCNET5GumPOktuhZPo438QiasoVv5g4l',
      'https://play-lh.googleusercontent.com/XP02HcK1hsyCUdrt9abKiy-KdF0ATB3W5jVVW5StHkxsmrlz22DFXfPbovZhyYjLiqI',
      'https://play-lh.googleusercontent.com/c3pmHB-DkHZ6j3g3LfmgWgdHlIK18jOt-2oFGkh9GTtQwY2aay7C9VO70XnZPX3qJas',
      'https://play-lh.googleusercontent.com/8Pj29QXYfhFlmPrMhNvgXdWeCj4X2n3vubIxoHGgd_w4h4MsE04TftKskB53BHp01XU',
      'https://play-lh.googleusercontent.com/mnyR06BYAQQ66ONQrYMluqALsdpKIV1_M2pKEIYurLlpEdRsE0Yu-AMsOmuPNYk-a8jP'
    ],
    name: 'easySoft App Education',
    rating: 2.739726,
    category: 'Business',
    price: '€0.00',
    buy_url: 'https://play.google.com/store/apps/details?id=de.easysoft.app.education&rdid=de.easysoft.app.education&feature=md&offerId',
    store_path: '/store/apps/details?id=de.easysoft.app.education',
    trailer_url: undefined,
    description: 'With the easySoft App Education, […]',
    developer: 'easySoft. GmbH',
    downloads: '10,000+',
    cover_image_url: 'https://play-lh.googleusercontent.com/mnyR06BYAQQ66ONQrYMluqALsdpKIV1_M2pKEIYurLlpEdRsE0Yu-AMsOmuPNYk-a8jP'
  },
  // …
]
```
</details>

## License

parse-play is licensed under the MIT license, see the [`LICENSE`](/LICENSE) file for details.

Issues and pull requests are welcome!
