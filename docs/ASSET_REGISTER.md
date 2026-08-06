# Asset register

Updated: 2026-08-06

## Approved visual media

The project owner explicitly directed reuse of the current-site church promo video on 2026-08-06. The source is a Living Message Church production-site asset; this approval is recorded only for the requested website use. No Motivation Church asset was used.

| Asset | Repository path | Production source | Technical details | Rights/approval note | Usage |
| --- | --- | --- | --- | --- | --- |
| Community promo video | `public/videos/living-message-church-community-promo.mp4` | `https://www.livingmessagechurch.com/wp-content/uploads/2023/03/Church-Promo-2-Website.mov` | 44.6 seconds; 1280 × 720; H.264 MP4; no audio; 6.9 MiB / 7.28 MB; network fast-start | User explicitly directed download, optimization, and reuse on 2026-08-06. Individual appearance/release records were not independently audited. | Decorative homepage hero background above 768px; muted, looping, inline, metadata preload |
| Community video poster | `public/images/hero/living-message-church-community-poster.jpg` | Derived locally from the approved promo video | 1280 × 720 JPEG; 204 KB | Covered by the same requested site use as the source video. | Hero loading fallback and static presentation on mobile or when reduced motion is requested; decorative CSS background |

The 46.15 MB QuickTime source was used only as conversion input and was not added to the repository. The selected MP4 removes its audio track and reduces payload by approximately 84% while retaining 720p resolution.

## Brand assets

| Asset | Repository path | Production source | Dimensions | Rights/approval note | Usage |
| --- | --- | --- | ---: | --- | --- |
| Living Message Church logo | `public/images/brand/living-message-church-logo.png` | `https://www.livingmessagechurch.com/wp-content/uploads/2017/03/Living-Message-Logo-05.png` | 250 × 69 PNG, transparent | User explicitly directed reuse of the existing church logo on 2026-08-06. No ownership beyond that requested project use is inferred. | Responsive site header and footer via `next/image`; alt text “Living Message Church” |

## Current placeholders

The layout uses the code-native `MediaFrame` component rather than bitmap photography. It renders abstract Living Message-branded color fields and labels the future editorial purpose through an accessible `role="img"` name.

| Placeholder | Location | Intended future crop | Replacement requirement |
| --- | --- | --- | --- |
| First-visit welcome | Home visitor section | 4:3 landscape | Approved entrance, lobby, or welcome-team photograph; accessibility context |
| Latest message | Home messages section | 16:9 wide | Verified message artwork or approved service still tied to a real message record |
| Ministry cards | Home ministry grid | 4:3 landscape | Approved ministry-specific photographs with current representation and consent |

Remaining photographic placeholders are code-native. Approved brand assets live under `public/images/brand`; the hero poster lives under `public/images/hero`; future approved photography should use separate descriptive folders and filenames such as `living-message-kids-check-in.webp`.

## Required asset metadata

Before adding an image, record:

- descriptive filename and source/original filename;
- photographer or creator;
- copyright owner and usage permission;
- consent/release status, including minors where applicable;
- date and context;
- meaningful alt text or decorative designation;
- focal point and intended crop ratio;
- affected routes/components;
- approval owner and date.
