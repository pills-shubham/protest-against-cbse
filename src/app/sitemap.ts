const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export default function sitemap() {
    return [
        {
            url: siteUrl,
            lastModified: new Date(),
        },
    ]
}