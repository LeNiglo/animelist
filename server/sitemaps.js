/**
 * Created by leniglo on 04/01/16.
 */

sitemaps.add('/sitemap.xml', function () {
    return [
        {
            page: '/',
            lastmod: new Date(),
            changefreq: 'daily',
            priority: 0.8
        },
        {
            page: '/login',
            lastmod: new Date()
        },
        {
            page: '/register',
            lastmod: new Date()
        }
    ];
});