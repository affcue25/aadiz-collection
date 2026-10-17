# Aadiz Collection website (Heritage Noir)

A static site: black, white and crimson, with the diagonal "slash" from the printed company profile as its signature.

## Preview
Open `dist/index.html` in a browser. All pages link to each other with relative paths, so no server is needed.

## Edit content
- Text, collections, events, certificates, contact details: `src/data/site.mjs`
- Page layouts and copy that is specific to one page: `build.mjs`
- Colours, type and spacing: `src/assets/style.css` (design tokens are at the top)
- Photos: `public/images` (after adding one, add its width and height to `src/data/images.json`)

Then rebuild:

    node build.mjs

Needs Node 18 or later. No packages to install.

## Deploy
Upload the `dist` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel).

## Notes
- Fonts (Playfair Display, Inter) load from Google Fonts. Without a connection the site falls back to Georgia and the system sans.
- Every photo was cropped from the client's PDF profile at about 150 ppi. For crisper large images, replace them with the original files under the same names.
- The enquiry form opens WhatsApp (+92 300 6386090) with the message filled in. It has no server component.
