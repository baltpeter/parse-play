// The old web UI had a dropdown that listed these categories. That doesn't appear to be the case anymore…
// To generate, run the following in the browser console on
// <https://web.archive.org/web/20220515000031/https://play.google.com/store/apps/>:
// Array.from(document.querySelectorAll('#action-dropdown-children-Categories .TEOqAc a')).reduce((acc, cur) =>
// ({...acc, [cur.href.match(/\/([^\/]+?)$/)[1]]: cur.innerText}), {})
/**
 * A category on the Play Store.
 *
 * @enum
 */
export const categories = {
    APPLICATION: 'Applications',
    GAME: 'Games',
    ART_AND_DESIGN: 'Art & Design',
    AUTO_AND_VEHICLES: 'Auto & Vehicles',
    BEAUTY: 'Beauty',
    BOOKS_AND_REFERENCE: 'Books & Reference',
    BUSINESS: 'Business',
    COMICS: 'Comics',
    COMMUNICATION: 'Communication',
    DATING: 'Dating',
    EDUCATION: 'Education',
    ENTERTAINMENT: 'Entertainment',
    EVENTS: 'Events',
    FINANCE: 'Finance',
    FOOD_AND_DRINK: 'Food & Drink',
    HEALTH_AND_FITNESS: 'Health & Fitness',
    HOUSE_AND_HOME: 'House & Home',
    LIBRARIES_AND_DEMO: 'Libraries & Demo',
    LIFESTYLE: 'Lifestyle',
    MAPS_AND_NAVIGATION: 'Maps & Navigation',
    MEDICAL: 'Medical',
    MUSIC_AND_AUDIO: 'Music & Audio',
    NEWS_AND_MAGAZINES: 'News & Magazines',
    PARENTING: 'Parenting',
    PERSONALIZATION: 'Personalization',
    PHOTOGRAPHY: 'Photography',
    PRODUCTIVITY: 'Productivity',
    SHOPPING: 'Shopping',
    SOCIAL: 'Social',
    SPORTS: 'Sports',
    TOOLS: 'Tools',
    TRAVEL_AND_LOCAL: 'Travel & Local',
    VIDEO_PLAYERS: 'Video Players & Editors',
    ANDROID_WEAR: 'Watch apps',
    WATCH_FACE: 'Watch faces',
    WEATHER: 'Weather',
    GAME_ACTION: 'Action',
    GAME_ADVENTURE: 'Adventure',
    GAME_ARCADE: 'Arcade',
    GAME_BOARD: 'Board',
    GAME_CARD: 'Card',
    GAME_CASINO: 'Casino',
    GAME_CASUAL: 'Casual',
    GAME_EDUCATIONAL: 'Educational',
    GAME_MUSIC: 'Music',
    GAME_PUZZLE: 'Puzzle',
    GAME_RACING: 'Racing',
    GAME_ROLE_PLAYING: 'Role Playing',
    GAME_SIMULATION: 'Simulation',
    GAME_SPORTS: 'Sports',
    GAME_STRATEGY: 'Strategy',
    GAME_TRIVIA: 'Trivia',
    GAME_WORD: 'Word',
    FAMILY: 'Kids',
} as const;
/**
 * The ID of a category on the Play Store.
 */
export type CategoryId = keyof typeof categories;

// To generate, go to <https://play.google.com/store/apps>, open the country modal from the footer, and then run the
// following in the browser console:
// Array.from(document.querySelectorAll('ul.P2Hi5d.DMZ54e.bwNLcf li.xoKNSc')).reduce((acc, cur) => ({...acc,
// [cur.dataset.gl]: cur.innerText}), {})
/**
 * A country supported by the Play Store.
 *
 * @enum
 */
export const countries = {
    AX: 'Åland Islands',
    AT: 'Austria',
    BE: 'Belgium',
    BG: 'Bulgaria',
    HR: 'Croatia',
    CY: 'Cyprus',
    CZ: 'Czechia',
    DK: 'Denmark',
    EE: 'Estonia',
    FO: 'Faroe Islands',
    FI: 'Finland',
    FR: 'France',
    GF: 'French Guiana',
    PF: 'French Polynesia',
    DE: 'Germany',
    GI: 'Gibraltar',
    GR: 'Greece',
    GL: 'Greenland',
    GP: 'Guadeloupe',
    HU: 'Hungary',
    IS: 'Iceland',
    IE: 'Ireland',
    IT: 'Italy',
    LV: 'Latvia',
    LI: 'Liechtenstein',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    MT: 'Malta',
    MQ: 'Martinique',
    YT: 'Mayotte',
    MC: 'Monaco',
    NL: 'Netherlands',
    NC: 'New Caledonia',
    NO: 'Norway',
    PL: 'Poland',
    PT: 'Portugal',
    RE: 'Réunion',
    RO: 'Romania',
    SM: 'San Marino',
    SK: 'Slovakia',
    SI: 'Slovenia',
    ES: 'Spain',
    BL: 'St. Barthélemy',
    MF: 'St. Martin',
    PM: 'St. Pierre & Miquelon',
    SJ: 'Svalbard & Jan Mayen',
    SE: 'Sweden',
    GB: 'United Kingdom',
    VA: 'Vatican City',
    WF: 'Wallis & Futuna',
} as const;
/**
 * The country code of a country supported on the Play Store.
 */
export type CountryCode = keyof typeof countries;

// To generate, go to <https://developers.google.com/custom-search/docs/xml_results_appendices>, and run the following
// in the browser console:
// Array.from(document.querySelector('#supported-interface-languages ~
// div.devsite-table-wrapper').querySelectorAll('tr')).slice(1).reduce((acc, cur) => ({...acc,
// [cur.children.item(1).innerText.toUpperCase()]: cur.children.item(0).innerText}), {})
/**
 * A language supported by the Play Store.
 *
 * @enum
 */
export const languages = {
    AF: 'Afrikaans',
    SQ: 'Albanian',
    SM: 'Amharic',
    AR: 'Arabic',
    AZ: 'Azerbaijani',
    EU: 'Basque',
    BE: 'Belarusian',
    BN: 'Bengali',
    BH: 'Bihari',
    BS: 'Bosnian',
    BG: 'Bulgarian',
    CA: 'Catalan',
    'ZH-CN': 'Chinese (Simplified)',
    'ZH-TW': 'Chinese (Traditional)',
    HR: 'Croatian',
    CS: 'Czech',
    DA: 'Danish',
    NL: 'Dutch',
    EN: 'English',
    EO: 'Esperanto',
    ET: 'Estonian',
    FO: 'Faroese',
    FI: 'Finnish',
    FR: 'French',
    FY: 'Frisian',
    GL: 'Galician',
    KA: 'Georgian',
    DE: 'German',
    EL: 'Greek',
    GU: 'Gujarati',
    IW: 'Hebrew',
    HI: 'Hindi',
    HU: 'Hungarian',
    IS: 'Icelandic',
    ID: 'Indonesian',
    IA: 'Interlingua',
    GA: 'Irish',
    IT: 'Italian',
    JA: 'Japanese',
    JW: 'Javanese',
    KN: 'Kannada',
    KO: 'Korean',
    LA: 'Latin',
    LV: 'Latvian',
    LT: 'Lithuanian',
    MK: 'Macedonian',
    MS: 'Malay',
    ML: 'Malayam',
    MT: 'Maltese',
    MR: 'Marathi',
    NE: 'Nepali',
    NO: 'Norwegian',
    NN: 'Norwegian (Nynorsk)',
    OC: 'Occitan',
    FA: 'Persian',
    PL: 'Polish',
    'PT-BR': 'Portuguese (Brazil)',
    'PT-PT': 'Portuguese (Portugal)',
    PA: 'Punjabi',
    RO: 'Romanian',
    RU: 'Russian',
    GD: 'Scots Gaelic',
    SR: 'Serbian',
    SI: 'Sinhalese',
    SK: 'Slovak',
    SL: 'Slovenian',
    ES: 'Spanish',
    SU: 'Sudanese',
    SW: 'Swahili',
    SV: 'Swedish',
    TL: 'Tagalog',
    TA: 'Tamil',
    TE: 'Telugu',
    TH: 'Thai',
    TI: 'Tigrinya',
    TR: 'Turkish',
    UK: 'Ukrainian',
    UR: 'Urdu',
    UZ: 'Uzbek',
    VI: 'Vietnamese',
    CY: 'Welsh',
    XH: 'Xhosa',
    ZU: 'Zulu',
} as const;
/**
 * The language code of a language supported on the Play Store.
 */
export type LanguageCode = keyof typeof languages;
