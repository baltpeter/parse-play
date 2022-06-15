# parse-play

> Library for fetching and parsing select data on Android apps from the Google Play Store via undocumented internal APIs.

This library is able to fetch and parse data from undocumented internal API endpoints of the Google Play Store. Currently, it can only fetch the charts of the most popular apps, according to various criteria.  
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

    console.log(topChart.length); // 100
    console.log(topChart[0].app_id, topChart[0].name); // com.amazon.mShop.android.shopping Amazon Shopping
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

console.log(topCharts[0].length); // 5
console.log(topCharts[0][0]?.app_id, topCharts[0][0]?.name); // cn.danatech.xingseus PictureThis - Plant Identifier
console.log(topCharts[1].length); // 660
console.log(topCharts[1][0]?.app_id, topCharts[1][0]?.name); // com.MOBGames.PoppyMobileChap1 Poppy Playtime Chapter 1
```

Note that despite us try to fetch 1000 apps for the second chart, only 660 apps were returned. This is a server-side limit.

## License

parse-play is licensed under the MIT license, see the [`LICENSE`](/LICENSE) file for details.

Issues and pull requests are welcome!
