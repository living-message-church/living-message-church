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
| Current Living Message Church logo | `public/images/brand/living-message-church-logo.svg` | User-supplied `Living Message Logo.svg` on 2026-08-06 | 288 × 91.19 viewBox SVG, native navy/brown vector artwork | User explicitly directed this uploaded master be used across the site. No ownership beyond that requested project use is inferred. | Header retains native colors; footer uses a high-contrast white CSS treatment; both rendered uses preserve the complete logo and its aspect ratio |
| Standalone white tree | `public/images/brand/living-message-tree.svg` | User-supplied `tree.svg` on 2026-08-06 | 288 × 288 viewBox SVG, optimized from 342 KB to 316 KB | User explicitly supplied the asset for this project. No ownership beyond that requested project use is inferred. | Retained as an approved brand asset but no longer rendered in the message-player medallion after the centered play-control refinement |
| Brand gradient reference | Source reference only; no duplicate runtime asset | User-supplied `lmc-colors.svg` on 2026-08-06 | 288 × 288 viewBox SVG with a white Living Message lockup over a `#0E153D` to `#282C72` gradient | User supplied for this project; no ownership beyond that requested project use is inferred. | Establishes `--color-brand-navy` and `--color-brand-indigo`; the message-player logo medallion uses the exact gradient |
| Superseded production-site logo | `public/images/brand/living-message-church-logo.png` | `https://www.livingmessagechurch.com/wp-content/uploads/2017/03/Living-Message-Logo-05.png` | 250 × 69 PNG, transparent | Previously approved for reuse; retained to preserve repository history and not rendered after the uploaded vector replacement. | Archive only |

## Living Message Church photography

The project owner approved the existing Living Message Church website as the image source for this milestone. Each file below came from that production domain; no image from Motivation Church or another inspiration site was downloaded. This project-level approval does not independently establish photographer attribution, model releases, or consent records. Those records remain a launch-governance requirement, especially where children appear.

JPEG originals were normalized to descriptive names and recompressed at a restrained quality setting. Large originals were reduced to a maximum 1600–1800 pixels; smaller originals were not enlarged. Runtime delivery uses `next/image` for responsive sizing and modern-format negotiation where the image is content. Page-hero photography is decorative CSS background imagery behind equivalent page text.

| Original URL | New filename | Dimensions | Page/component used | Copyright status | Notes |
| --- | --- | ---: | --- | --- | --- |
| `https://www.livingmessagechurch.com/wp-content/uploads/2025/03/20230129_102456-scaled.jpg` | `public/images/general/living-message-worship-gathering.jpg` | 1800 × 1350 | Home first-visit section; About page hero | Approved production-site source; photographer/release records need verification | Current sanctuary congregation; energetic wide crop helps prospective visitors picture a Sunday gathering. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2024/12/Screenshot-2024-12-17-140910.png` | `public/images/general/living-message-community-welcome.jpg` | 1600 × 1026 | Plan Your Visit hero; homepage final invitation | Approved production-site source; photographer/release records need verification | Converted from PNG to JPEG; warm welcome/community moment used as the emotional close of the homepage. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2023/03/Church-2.png` | `public/images/general/living-message-lobby-community.jpg` | 1800 × 1001 | Contact, gallery, and Next Steps page heroes | Approved production-site source; photographer/release records need verification | Converted from PNG to JPEG; church lobby connection scene selected for Next Steps because it communicates natural conversation and belonging. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2018/09/IMG_0764.jpg` | `public/images/ministries/living-message-prayer-and-connection.jpg` | 1600 × 1066 | Home identity statement and Next Steps card | Approved production-site source; photographer/release records need verification | Warm connection moment; portrait-focused identity crop and landscape ministry crops. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2024/08/Next-Steps-Class-image.jpg` | `public/images/ministries/living-message-next-steps-class.jpg` | 1600 × 900 | Next Steps class feature | Approved production-site source; original artwork/appearance permissions need verification | Current class artwork from the authoritative Next Steps page; recompressed from 1.3 MB to approximately 165 KB without upscaling. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2023/04/IMG_6420.jpg` | `public/images/groups/living-message-community-table.jpg` | 1600 × 1200 | Home Groups card; Connect and Groups heroes | Approved production-site source; photographer/release records need verification | Church community gathered around tables. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2024/12/Kids-Min-1-scaled.jpg` | `public/images/kids/living-message-kids-room.jpg` | 1800 × 1350 | Home Kids card; Kids hero; Plan Your Visit Kids section | Approved production-site source; minor release and safeguarding records need verification | Real kids-room activity; do not reuse beyond the approved website scope without release review. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2017/03/Feeding-Families.jpg` | `public/images/outreach/living-message-serving-families.jpg` | 577 × 433 | Outreach page hero | Approved production-site source; photographer/release records need verification | Original dimensions retained; no upscaling. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2016/11/Outreach-Pic.jpg` | `public/images/outreach/living-message-community-meal.jpg` | 640 × 360 | Home outreach feature | Approved production-site source; photographer/release records need verification | Original dimensions retained; old but church-specific, so recency/context should be confirmed. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2025/11/Family-2-2025-Mothers-Day.jpg` | `public/images/leadership/living-message-broadway-family.jpg` | 959 × 960 | Leadership page hero | Approved production-site source; family/minor releases need verification | Used decoratively; names and leadership facts remain gated by the verification registry. |
| `https://www.livingmessagechurch.com/wp-content/uploads/2020/05/IMG_0927.jpg` | `public/images/general/living-message-bible-teaching.jpg` | 1800 × 1200 | Home Messages section; Beliefs, Messages, and Live heroes | Approved production-site source; photographer/release records need verification | General teaching photograph only; it is not presented as a verified latest-sermon record. |

## Remaining placeholders and photography gaps

The obvious homepage first-visit, message, ministry-card, and outreach placeholders were replaced. `MediaFrame` still supports a code-native fallback for records that have no approved image.

| Location | Current state | Photography still needed |
| --- | --- | --- |
| Homepage events | Provider-neutral unavailable state; no fabricated cards | Current event imagery should arrive with verified event records and registration ownership. |
| Message archive cards | Remote thumbnails supplied by the verified canonical YouTube feed, with the existing approved local records retained only as a feed-failure fallback | A future editorial backend may replace remote thumbnail references with approved managed posters when ownership, workflow, and storage are configured. |
| Youth and Young Adults | Dark page hero without a photo | Current ministry photography with safeguarding/release approval and verified ministry context. |
| Give and legal pages | Intentionally restrained dark page heroes | No image is required; add only if it improves comprehension and has clear approval. |
| Events directory | No trusted current event photography found | Recent church-owned event photographs; stale picnic graphics were rejected. |

Rejected source candidates included stock-looking leadership art, dated 2018 Home Groups graphics, stale event promotions, and youth promotional artwork. They were neither added nor substituted merely to fill space.

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
