# Asset coverage

Every one of the 147 valid source image files is recorded in `asset-inventory.json` with dimensions, bytes, SHA-256, semantic subject and display decision. Original files remain untouched. Twenty-four canonical subjects are imported statically and optimized by Astro. Repeated resolutions/crops are not different properties.

| Canonical source | Final placement |
| --- | --- |
| FormsBackground.jpg | Full-bleed hero behind the doors; social preview |
| Realtor-solo.webp | White hero portrait frame and About profile |
| Don'tJustListIt.webp | Full-width perspective chapter |
| GetItSold.webp | Kitchen architectural spotlight |
| GuideToBuyers.webp | Buyer-services/next-chapter spotlight |
| photoGallery1.webp | Circular collection, landscape detail page, photographic journal |
| photogallery2.webp | Circular collection, interior detail page, photographic journal |
| photogallery3.webp | Circular collection, exterior detail page, photographic journal |
| photogallery4.webp | Circular collection, rooftop detail page, photographic journal |
| photogallery6.webp | Circular collection, grounds detail page, photographic journal |
| photogallery7.webp | Circular collection, courts detail page, photographic journal |
| photogallery8.webp | Circular collection, fairways detail page, photographic journal |
| services1.webp | Lifestyle: interior space |
| services2.webp | Lifestyle: architecture and garden |
| services3.webp | Lifestyle: personal service |
| RidgeRealtyGroupLogo.webp | Affiliations |
| PahrumpValleyLogo.webp | Affiliations |
| RealtoLogo.webp | Affiliations |
| EqualHousingOpportunity.webp | Footer |
| Archived qt=q_95_ie-d.webp | Original Marci Metzger Homes wordmark in footer |
| social-media-icons/facebook.svg | Footer social link icon |
| social-media-icons/instagram.svg | Footer social link icon |
| social-media-icons/linkedin.svg | Footer social link icon |
| social-media-icons/yelp.svg | Footer social link icon |

Exceptions: 97 archived size/crop variants share the same 20 photographic/logo subjects and intentionally use their canonical representative. Twenty-four `vt*.webp` map tiles, `spotlight-poi3_hdpi_ie-d.png` map marker, and `transparent_ie-d.png` browser spacer are excluded because they are incomplete interface artifacts, not standalone photography. No image file was corrupt. Property associations, addresses and availability remain unknown; descriptive titles do not imply listing identities.

The contact sheet was reviewed at `/tmp/asset-contact-sheet.jpg`. The journal expands with native `<details>` and opens photographs in a keyboard-dismissable dialog; without JavaScript, image links still work.
