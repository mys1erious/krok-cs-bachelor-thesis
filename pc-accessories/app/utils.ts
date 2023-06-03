export function unslugify(slug: string) {
    slug = slug.replace('_', ' ');
    slug = slug.replace('-', ' ');
    slug = slug.charAt(0).toUpperCase() + slug.slice(1);
    return slug;
}
