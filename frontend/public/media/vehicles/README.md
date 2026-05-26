# Vehicle media (CDN-ready)

Place owned assets under segment and brand folders. The app resolves local paths via `localAssetPath()` in `src/lib/media/vehicle-media-registry.ts`.

```
vehicles/
  cars/
    honda/
      hero.webp
      gallery/
    hyundai/
    tata/
  bikes/
    hero/
    bajaj/
  trucks/
  buses/
  ev/
  auto/
```

Set `VITE_MEDIA_CDN_BASE` (optional) to prefix CDN URLs when deploying static assets.

Until local files exist, listings use verified remote pools from the registry (segment-strict, no scenic URLs).
