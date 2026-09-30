# Image publication policy

`../image-assets.json` records image sources and publication decisions. A source URL, credit, small size, or an editorial label does not grant reuse rights.

Publish a third-party image only when its registry record has `rightsStatus: "cleared"`, `publicationState: "approved"`, a `rightsUrl`, a matching `localPath`, and a documented scope. The source, credit and terms must accompany the image. All other candidates stay on hold and must not have files in `public/`.

## Current decision — 2026-09-30

All twelve third-party images remain removed, preserving the cleanup in main. Custom placeholders labelled “Image unavailable due to copyright” replace them; their entity pages retain image credits and original source links.

Seigensha cover-specific terms were found at https://www.seigensha.com/contact-list/ and https://en.seigensha.com/copyrighted-materials/. The cover remains on hold for the later image review; no notification has been sent and no image has been restored.

`npm run build` checks the image registry and public image files before building. It also regenerates third-party software notices from installed production dependencies.

After deployment, verify removed image URLs and any old preview deployments separately: this local change does not delete previously published deployments or purge their caches.
