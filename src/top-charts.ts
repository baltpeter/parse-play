import { writeFile } from 'fs/promises';
import { strict as assert } from 'assert';
import fetch from 'cross-fetch';
import { CategoryId } from './common/categories';

const requestPayload = (
    category: CategoryId,
    type: 'topselling_free' | 'topgrossing' | 'topselling_paid',
    length: number
) =>
    // This payload was determined by observing the network traffic on the web UI and then _drastically_ simplifying it
    // by throwing away everything that didn't affect the response.
    ['vyAe2', JSON.stringify([[null, [[null, [null, length]], null, null, [113]], [2, type, category]]])];

const tmp = async (data: unknown, filename_prefix?: string) => {
    console.dir(data, { depth: null });
    await writeFile(`./${filename_prefix ? `${filename_prefix}.` : ''}tmp.json`, JSON.stringify(data, null, 4));
};

(async () => {
    const res = await fetch('https://play.google.com/_/PlayStoreUi/data/batchexecute', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: `f.req=${encodeURIComponent(JSON.stringify([[requestPayload('APPLICATION', 'topselling_free', 2)]]))}`,
        method: 'POST',
    }).then((r) => r.text());

    const payload = JSON.parse(res.split('\n')[2])[0];
    assert(payload, 'Has payload.');
    assert(payload[0] === 'wrb.fr' && payload[1] === 'vyAe2', 'Correct header.');

    const data = JSON.parse(payload[2]);
    assert(data, 'Has inner data.');

    assert(data.length === 1, 'One top-level array entry.');
    assert(
        data[0][1][0].length === 29 &&
            data[0][1][0][3].length === 1 &&
            data[0][1][0].filter((i: unknown) => i === null).length === 27,
        'Expected inner data structure.'
    );
    const entries = data[0][1][0][28][0];
    assert(entries.length > 0, 'Has data.');

    await tmp(entries);

    const parsed = entries.map((e) => {
        assert(e.length === 3 && [0, 1, 2].includes(e[2]), 'Expected entry structure.');

        const meta = e[0];

        assert(meta.length === 23, 'Meta length.');
        assert(meta[8][8][0] === 'CAE=', 'Weird buy param.');
        assert(e[1].length === 1 && e[1][0].length === 3, 'Expected weird second meta object structure.');
        const empty_meta = e[1][0].flat(100);
        assert(
            empty_meta.filter((i: unknown) => i === null).length === empty_meta.length - 1 && empty_meta[3] === meta[5],
            'Weird second meta object only has category.'
        );

        return {
            app_id: meta[0][0],
            icon_url: meta[1][3][2],
            screenshot_urls: meta[2].map((s) => s[3][2]),
            name: meta[3],
            rating: meta[4][1],
            category: meta[5],
            price: meta[8][1][0].join(' ').trim(),
            buy_url: meta[8][6][5][2],
            store_path: meta[10][4][2],
            trailer_url: meta[12]?.[0][0][3][2],
            description: meta[13][1],
            developer: meta[14],
            downloads: meta[15],
            cover_image_url: meta[22][3][2],
        };
    });
    await tmp(parsed, 'parsed');

    assert(
        parsed
            .map((p) =>
                Object.entries(p).filter(([key, val]) => (val === undefined || val === null) && key !== 'trailer_url')
            )
            .filter((a) => a.length > 0).length === 0,
        'Only `trailer_url` is ever undefined.'
    );
    console.log(parsed.length);
})();
