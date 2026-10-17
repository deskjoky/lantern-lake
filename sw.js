// Lets the game install as an app and still open with no internet.
// Network first: when you're online you always get the newest version (and it's saved for later);
// when you're offline the last saved copy opens instead. Online-only features (multiplayer, leaderboards, cloud save) wait for the connection.
const CACHE='lantern-lake-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(u.search?new Request(u.origin+u.pathname):r,copy)).catch(()=>{});}return res;})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html')||caches.match('./'))));});
