const CACHE_NAME = "phuot-vn-v6";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./assets/images/lung-cu-hero.jpg",
  "./assets/images/hero-ma-pi-leng.jpg",
  "./assets/images/hero-vinh-hy.jpg",
  "./assets/images/hero-ban-gioc.jpg",
  "./assets/images/khau-pha-mu-cang-chai.jpg",
  "./assets/images/ta-xua-tram-tau.jpg",
  "./assets/images/y-ty-lao-cai.jpg",
  "./assets/images/binh-lieu-co-lau.jpg",
  "./assets/images/moc-chau-pu-luong.jpg",
  "./assets/images/deo-hai-van.jpg",
  "./assets/images/mui-dien-vung-ro.jpg",
  "./assets/images/ghenh-da-dia.jpg",
  "./assets/images/mang-den-truong-son.jpg",
  "./assets/images/cau-dat-da-lat.jpg",
  "./assets/images/dat-mui-ca-mau.jpg",
  "./assets/images/logo-emblem.png",
  "./assets/images/logo-app-icon.png",
  "./js/data.js",
  "./js/service-tier.js",
  "./js/map.js",
  "./js/app.js",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
