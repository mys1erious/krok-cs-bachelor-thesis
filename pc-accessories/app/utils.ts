export function unslugify(slug: string) {
    slug = slug.replace('_', ' ');
    slug = slug.replace('-', ' ');
    slug = slug.charAt(0).toUpperCase() + slug.slice(1);
    return slug;
}


export function strToNumber(str: string) {
    if (!isNaN(Number(str))) {
        return Number(str);
    } else {
        return null;
    }
}

export enum OrderByChoices {
    DATE_ADDED = 'dateAdded',
    PRICE_ASC = 'priceAsc',
    PRICE_DESC = 'priceDesc',
    ALPHABET = 'alphabet',
    VIEW_COUNTER = 'viewCounter',
}
