# Asset register

Updated: 2026-08-06

## Approved photography

No Living Message Church photography has been approved or supplied to the repository. No production-site image was downloaded, copied, hotlinked, or inferred to be reusable. No Motivation Church asset was used.

| Asset | Type | Rights/approval | Alt text | Usage | Status |
| --- | --- | --- | --- | --- | --- |
| None | Photography | No approved files supplied | Not applicable | Not applicable | Blocked by verification |

## Brand assets

| Asset | Repository path | Production source | Dimensions | Rights/approval note | Usage |
| --- | --- | --- | ---: | --- | --- |
| Living Message Church logo | `public/images/brand/living-message-church-logo.png` | `https://www.livingmessagechurch.com/wp-content/uploads/2017/03/Living-Message-Logo-05.png` | 250 × 69 PNG, transparent | User explicitly directed reuse of the existing church logo on 2026-08-06. No ownership beyond that requested project use is inferred. | Responsive site header and footer via `next/image`; alt text “Living Message Church” |

## Current placeholders

The layout uses the code-native `MediaFrame` component rather than bitmap photography. It renders abstract Living Message-branded color fields and labels the future editorial purpose through an accessible `role="img"` name.

| Placeholder | Location | Intended future crop | Replacement requirement |
| --- | --- | --- | --- |
| Community hero | Home hero | 4:5 portrait | Approved recent community/worship photograph; subject consent; meaningful alt text; focal point |
| First-visit welcome | Home visitor section | 4:3 landscape | Approved entrance, lobby, or welcome-team photograph; accessibility context |
| Latest message | Home messages section | 16:9 wide | Verified message artwork or approved service still tied to a real message record |
| Ministry cards | Home ministry grid | 4:3 landscape | Approved ministry-specific photographs with current representation and consent |

No photographic placeholder file is stored under `public/images` because the current placeholders are code-native. Approved brand assets live under `public/images/brand`; future approved photography should use a separate descriptive folder and filenames such as `living-message-kids-check-in.webp`.

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
