import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    {
      name: 'live-social-leads-crawler',
      configureServer(server) {
        server.middlewares.use('/api/scan-leads', async (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const query = (url.searchParams.get('q') || 'photobooth hire Cheshire Manchester wedding').trim();
            const apifyToken = url.searchParams.get('apifyToken') || '';

            const liveLeads = [];

            // Construct dynamic search queries based directly on what the user searched
            const cleanKeyword = query.replace(/#|photobooth/gi, '').trim();
            const searchTargets = [
              query,
              cleanKeyword ? `photobooth "${cleanKeyword}"` : null,
              cleanKeyword ? `"${cleanKeyword}" wedding OR event` : null,
              'photobooth wedding Cheshire OR Manchester OR Leeds hire'
            ].filter((v, i, a) => v && a.indexOf(v) === i);

            for (const targetQuery of searchTargets) {
              if (liveLeads.length >= 25) break;
              try {
                const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(targetQuery)}&hl=en-GB&gl=GB&ceid=GB:en`;
                const response = await fetch(rssUrl, {
                  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
                });
                if (response.ok) {
                  const xml = await response.text();
                  const itemMatches = [...xml.matchAll(/<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>([\s\S]*?<source[^>]*>(.*?)<\/source>)?[\s\S]*?<\/item>/g)];

                  for (const match of itemMatches) {
                    const rawTitle = match[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
                    const link = match[2];
                    const pubDate = match[3];
                    const sourceName = match[5] || 'UK Web & News';

                    // Ensure unique entries
                    if (!liveLeads.some(l => l.title === rawTitle)) {
                      let region = 'North West & Yorkshire';
                      if (rawTitle.toLowerCase().includes('cheshire') || targetQuery.toLowerCase().includes('cheshire')) region = 'Cheshire & Country Estates';
                      else if (rawTitle.toLowerCase().includes('manchester') || targetQuery.toLowerCase().includes('manchester')) region = 'Greater Manchester';
                      else if (rawTitle.toLowerCase().includes('leeds') || rawTitle.toLowerCase().includes('yorkshire') || targetQuery.toLowerCase().includes('yorkshire') || targetQuery.toLowerCase().includes('leeds')) region = 'Yorkshire & Leeds';
                      else if (rawTitle.toLowerCase().includes('liverpool') || rawTitle.toLowerCase().includes('lancashire')) region = 'Merseyside & Lancashire';

                      liveLeads.push({
                        id: 'live-' + Math.random().toString(36).substring(2, 9),
                        platform: 'Live Web Stream',
                        authorName: sourceName,
                        authorHandle: sourceName,
                        title: rawTitle,
                        postSnippet: rawTitle,
                        postUrl: link,
                        timeAgo: new Date(pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                        region,
                        venue: region + ' Venue',
                        eventType: rawTitle.toLowerCase().includes('wedding') ? 'Wedding Reception' : 'Celebration / Event',
                        eventDate: '',
                        guestCount: 100,
                        intentLabel: '🔥 Genuine Live Opportunity',
                        estimatedValue: 350
                      });
                    }
                  }
                }
              } catch (fetchErr) {
                console.error('Error fetching search stream:', fetchErr.message);
              }
            }

            // 2. If user configured an Apify Scraper Token, fetch live Instagram / TikTok posts
            if (apifyToken) {
              try {
                const apifyRes = await fetch(`https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/runs/last/dataset/items?token=${apifyToken}&limit=10`);
                if (apifyRes.ok) {
                  const apifyItems = await apifyRes.json();
                  if (Array.isArray(apifyItems)) {
                    apifyItems.forEach(item => {
                      liveLeads.unshift({
                        id: 'apify-' + (item.id || Math.random().toString(36).substring(2, 9)),
                        platform: 'Instagram (Live Apify)',
                        authorName: item.ownerUsername || 'Instagram User',
                        authorHandle: '@' + (item.ownerUsername || 'user'),
                        title: (item.caption || '').slice(0, 80),
                        postSnippet: item.caption || '',
                        postUrl: item.url || `https://instagram.com/p/${item.shortCode}`,
                        timeAgo: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recently',
                        region: 'Cheshire & Country Estates',
                        venue: item.locationName || 'North West Venue',
                        eventType: 'Wedding / Party',
                        eventDate: '',
                        guestCount: 90,
                        intentLabel: '📸 Real Instagram Post',
                        estimatedValue: 350
                      });
                    });
                  }
                }
              } catch (apifyErr) {
                console.error('Apify fetch error:', apifyErr.message);
              }
            }

            res.end(JSON.stringify({
              status: 'success',
              query,
              totalFound: liveLeads.length,
              leads: liveLeads
            }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', message: err.message }));
          }
        });
      }
    }
  ]
});
