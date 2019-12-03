const VERSION = 1

const ASSETS = [
  './static/App.js',
  './static/index.html',
  './static/manifest.json',
  './static/robots.txt',
  './static/spinner.png',
  './static/styles/styles.css'
]

self.addEventListener('install', _ => cacheStaticAssets())

self.addEventListener('activate', event =>
  event.waitUntil(self.clients.claim())
)

self.addEventListener('fetch', event => {
  const parsedURL = new URL(event.request.url)

  // If static files are requested, respond with cached version.
  if (parsedURL.pathname.startsWith('/static/')) {
    event.respondWith(caches.match(event.request))
    return
  }

  // Else respond with fastest version.
  staleWhileRevalidate(event)
})

async function cacheStaticAssets () {
  const cache = await caches.open('static')
  await cache.addAll(ASSETS)
  return self.skipWaiting()
}

function staleWhileRevalidate (event) {
  // Get version of file from network.
  const fetchedVersion = fetch(event.request)

  // Get clone of network version.
  const fetchedCopy = fetchedVersion.then(response => response.clone())

  // Get version of file from cache.
  const cachedVersion = caches.match(event.request)

  const getFastestResource = async _ => {
    try {
      // Get version of file served first.
      const response = await Promise.race([
        // Return cached version if network version errors.
        fetchedVersion.catch(_ => cachedVersion),
        cachedVersion
      ])

      // If no response, respond with network version
      if (!response) {
        return await fetchedVersion
      }

      return response
    } catch (_) {
      // If not there, respond with not found status.
      return new Response(null, { status: 404 })
    }
  }

  // Cache dynamic data (data from database and font files).
  const getDynamicResources = async _ => {
    const response = await fetchedCopy
    const cache = await caches.open('dynamic')
    return cache.put(event.request, response)
  }

  event.respondWith(getFastestResource())
  event.waitUntil(getDynamicResources())
}
