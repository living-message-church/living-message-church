# Living Message Church old-site inventory

Audit date: 2026-08-05  
Content source of truth: <https://www.livingmessagechurch.com>  
Development deployment checked: <https://dev.livingmessagechurch.com>

## Scope and method

The inventory reconciles the production navigation, Yoast sitemap index and child sitemaps, public WordPress REST responses, rendered page text, calendar API, and selected HTTP checks. The public sitemap advertises **458 canonical URLs**:

| Type | Count | Notes |
| --- | ---: | --- |
| WordPress pages | 27 | Includes three home variants, duplicate visitor pages, empty/thin pages, and expired campaign pages. |
| Post routes | 4 | The posts index at `/?page_id=10` plus three 2018 articles. |
| Event URLs | 416 | One `/events/` archive and 415 legacy event detail/recurrence URLs, dated 2017–2024. |
| Taxonomy/author archives | 11 | Two categories, seven tags, one event category, one author archive. |
| **Total** | **458** | Exact URL-by-URL register is in the appendix and `old-site-inventory.json`. |

The sitemap index also references `leadpages_post-sitemap.xml`, but that URL currently returns the site's 404 page and contributes no discoverable content URL.

Disposition vocabulary:

- **Keep**: retain the content and usually the route.
- **Rewrite**: preserve the facts or intent, but improve clarity, accuracy, accessibility, or presentation.
- **Merge**: combine useful content into a stronger destination.
- **Archive**: retain a documented redirect and source record, but do not present as current.
- **Remove**: do not migrate the content; still document its redirect.
- **Verify**: human confirmation is required before publication.

## SEO metadata register

SEO titles and descriptions below are the values exposed by public Yoast metadata at audit time. They are evidence, not approved future copy. Event, taxonomy, author, and the legacy posts-index routes did not provide metadata in the collected source and are recorded as unavailable in the JSON inventory.

| Route | SEO title (observed) | Meta description (observed) | Recommendation |
| --- | --- | --- | --- |
| `/` | Christian Church Florida for Worship and Community | Discover a warm Christian church Florida community and connect with a trusted Clermont FL church focused on faith, worship, fellowship, and growth. | Keep + Rewrite |
| `/new-guest-follow/` | New Guest Follow Up &#8211; Living Message Church | Not available | Remove |
| `/services/` | Services &#8211; Living Message Church | Not available | Merge + Rewrite |
| `/outreach/` | Outreach - Living Message Church Clermont Outreach Program | What to know how you can help in our community? Living Message Church in Clermont is dedicated to helping others. Find out how you can get involved.. | Keep + Rewrite |
| `/sermons-living-message-church-clermont/` | Sermons - Living Message Church Clermont - Recent Teachings | Listen to relevant and engaging sermons from our Pastor at Living Message Church in Clermont, Florida. Pastor Brian's latest teaching are available for.. | Merge + Rewrite |
| `/living-message-bible-training-school/` | Living Message Bible Training School &#8211; Living Message Church | Not available | Archive |
| `/photo-gallery/` | Gallery - Living Message Church Clermont Photo Gallery | View our photo gallery containing some memorable moments at Living Message Church in Clermont, Florida.. Join us as we create more memories.. | Merge + Archive |
| `/pictures/` | Pictures &#8211; Living Message Church | Not available | Merge + Archive |
| `/media/` | Media - Recent Media From Living Message Church - Located In Clermont, Florida | View Living Message Church's latest media including sermons, blogs, and photo galleries. here at Living Message Church Clermont.... | Merge + Rewrite |
| `/ministries/` | Ministries &#8211; Living Message Church | Not available | Remove + Rewrite |
| `/resurrection-sunday-at-lmc/` | Resurrection Sunday at LMC &#8211; Living Message Church | Not available | Archive |
| `/privacy-policy/` | LMC Privacy Policy &#8211; Living Message Church | Not available | Keep + Rewrite |
| `/2025-resurrection-sunday/` | 2025 Resurrection Sunday &#8211; Living Message Church | Not available | Archive |
| `/photo-release/` | LMC Photo Release &#8211; Living Message Church | Not available | Keep + Rewrite |
| `/so-glad-you-are-here-landing-page/` | Church Invite Landing Page &#8211; Living Message Church | Not available | Merge + Rewrite |
| `/our-beliefs/` | Church of Christ: Our Beliefs & Values \| Living Message Church | Explore our beliefs and discover how Church of Christ teachings guide our faith, worship, and daily life in a Christ-centered community. Learn more! | Keep + Rewrite |
| `/home/` | A Church That Feels Like Home in Clermont, FL \| Living Message Church | If you are searching for a church where you can feel Like home, visit “Living Message Church” in Florida. Enjoy love, laughter and live with us! | Merge + Archive |
| `/meet-our-pastor/` | Pastor Brian Broadway Sharing Hope Through Ministry | Pastor Brian Broadway shares uplifting biblical teaching and guidance as a respected Christian pastor Florida families trust for spiritual growth. | Keep + Merge + Rewrite |
| `/about-living-message-church-clermont/` | About Living Message Church \| Faith & Home in Clermont FL | Discover about living message church values and teaching while experiencing church family clermont gatherings that strengthen faith and worship journey. | Keep + Rewrite |
| `/events-living-message-church-clermont/` | Church Events Clermont \| Live Worship, Fellowship & Joy | Join church events clermont for live worship and fellowship while connecting with christian events florida focused on praise, unity, and spiritual growth. | Keep + Rewrite |
| `/contact-living-message-church-clermont/` | Contact Us At Living Message Church - Located in Clermont, Florida | Have a question or need directions? Feel free to contact our team at Living Message Church in Clermont, Florida. We will be happy to help... | Keep + Rewrite |
| `/home2/` | Christian Church Florida for Worship and Community | Discover a warm Christian church Florida community and connect with a trusted Clermont FL church focused on faith, worship, fellowship, and growth. | Merge + Archive |
| `/online-church/` | Online Church Service Clermont for Live Praise & Faith | Watch Online Church Service Clermont for uplifting sermons and heartfelt worship through a trusted church livestream Florida worship experience. | Keep + Rewrite |
| `/new-visitors/` | I'm New - Get Info About Living Message Church In Clermont | Considering visiting Living Message Church in Clermont, Florida? You're going to love it here! Learn more about our church and... | Merge + Rewrite |
| `/plan-your-visit/` | Visit Church Clermont for Spiritual Growth and Connection | Visit Church Clermont for vibrant worship, youth programs, and community support while exploring trusted churches in Groveland FL services & ministries. | Merge + Rewrite |
| `/nextsteps/` | Next Steps &#8211; Living Message Church | Not available | Keep + Rewrite |
| `/the-team/` | Church Ministry Leaders Clermont \| Vision Worship & Unity | Meet church ministry leaders clermont and church leadership team Florida for leadership clarity, faith teaching, mission work, and discipleship growth. | Keep + Merge + Rewrite |
| `/the-power-of-a-dream/` | The Power Of A Dream - From The Blog At Living Message Church Clermont, Florida | Post from Living Message Church Clermont - The Power of a Dream A Dream is a beautiful thing. It allows us to believe past our barriers. Those barriers could be any type of resources, knowledge or abilities.... | Archive + Merge |
| `/a-touch-of-faith/` | A Touch Of Faith - From The Blog Of Living Message Church Clermont | Post from Living Message Church Clermont - The Power of a Dream A Dream is a beautiful thing. It allows us to believe past our barriers. Those barriers could be any type of resources, knowledge or abilities.... | Archive + Merge |
| `/trends-vs-friends/` | Trends VS Friends - From The Blog At Living Message Church Clermont, Florida | Post from Living Message Church Clermont - Trends vs. Friends I have noticed when something popular comes a long, a lot of people will ride the wings of the new trend until it dies out. The trend whether.... | Archive + Merge |

## Sitewide content and contact details

| Item | Observed value | Disposition |
| --- | --- | --- |
| Current service times | Sundays at **9:00 AM and 10:45 AM**; online service at **10:45 AM** | **Keep + Verify** immediately before launch. This is repeated on the current home, visit, contact, and online pages. |
| Current address | **20180 US Highway 27, Suite 308, Clermont, FL 34715** | **Keep + Verify**. Current pages use `US Hwy 27`, `US HWY 27`, and `US Highway 27`; standardize the display form. |
| Current contact phone | **352-432-6048** on the current contact page | **Keep + Verify** because older pages use 352-617-8484. |
| Older phone | **352-617-8484** on the 2018 training page and expired 2025 campaign content | **Archive + Verify**; do not publish until ownership/use is confirmed. |
| Email | **info@livingmessagechurch.com** | **Keep + Verify** deliverability. |
| Teaching emphasis | Expository, line-by-line Bible teaching in context; discipleship, prayer, genuine connection, and church family | **Keep + Rewrite** for consistency and grammar. |
| Community language | “Fellowship Intentionally, Serve Passionately, Love Equally, Embrace You as Family Consistently” and “we don’t have membership; we have family” | **Keep + Rewrite**; obtain final pastoral approval. |
| Outreach | Find, Feed & Restore; transitional housing and case management for families with children experiencing homelessness | **Keep + Verify** current program details with Find, Feed & Restore. |
| Social/video channels | Facebook `LivingMessageFl`, Instagram `livingmessagefl`, X/Twitter `livingmessagefl`, YouTube channel `UCAr9BxgBwHAvYI0zAK3ar6Q` | **Keep + Verify** account ownership and whether X remains active. |
| Current external systems | Church Center giving, Church Center registrations, Text In Church connect card, Typeform Plan Your Visit | **Keep + Verify** form destinations, data owners, privacy disclosures, and analytics. |

## Primary and editorial pages

### `/` — Home

- **Title/purpose:** “Home”; primary welcome and conversion page.
- **Major headings:** “WELCOME HOME,” “A True Church Community,” “Genuine Community,” “Expository Preaching,” “Meaningful Connection,” “Impactful Outreach,” “Groups & Growth,” “Church Family,” “New Series: Matthew,” “Sunday Experience,” and “Media.”
- **Important copy:** Sundays at 9:00 and 10:45; online at 10:45; children’s ministry at both services; address; line-by-line teaching; church-family language; Find, Feed & Restore appeal.
- **Calls to action:** Plan Your Visit, Get Directions, upcoming events, media/sermons, Find, Feed & Restore.
- **Media/embeds:** current-series banner, church/community photography, sermon/gallery tiles, Church Center QR graphic; site navigation links to YouTube and social channels.
- **Disposition:** **Keep + Rewrite.** Preserve all facts and the visitor journey; replace dated series/promotional content through a maintainable content model.

### `/home2/` — Home2

- **Purpose/content:** unpublished-looking duplicate of the current home with “His Mercies Are More,” a new-facility announcement, Matthew series copy, an “LMC @ Sea” block, and current 9:00/10:45 service information.
- **Calls to action/media:** Plan Your Visit and outreach/media promotions; Divi shortcode content includes background church media.
- **Problem:** duplicates `/`, mixes current information with dated event copy (Friday April 3/Sunday April 5 without a displayed year), and has malformed/stale builder content.
- **Disposition:** **Merge** useful current facts into `/`; **Archive** the route.

### `/home/` — Home_OLD

- **Purpose/content:** older home page with a pastor welcome, “Love, Life and Laughter,” questions/curiosity language, media, a 10:00 AM service, old series/events, and prayer CTA.
- **Media/embeds/forms:** legacy Avada/Fusion shortcodes; prayer link; old event/media blocks.
- **Critical issue:** the source contains unrelated external links to `lakewoodsteroid.com` and a dental-site path. These are suspicious and must not migrate.
- **Disposition:** **Merge** only approved welcome/history language into Home/About; **Remove** spam, obsolete times, old series, and broken builder markup; permanently redirect to `/`.

### `/new-visitors/` — I’m New

- **Purpose/content:** reassures first-time visitors they will be greeted, not isolated, and can arrive early to meet leaders.
- **Major headings:** “YOU’RE GOING TO LOVE IT HERE,” “You Won’t Feel Alone Here,” “We Are Ready To Greet You,” “WE CAN’T WAIT TO MEET YOU.”
- **CTA/media:** Plan Your Visit; two church/community images with missing alt text.
- **Conflict:** says there are three services at 8:00, 9:30, and 11:15, contradicting current 9:00/10:45 information.
- **Disposition:** **Merge + Rewrite + Verify** into `/plan-your-visit`; preserve the reassuring tone, not the stale times.

### `/plan-your-visit/` — Plan Your Visit

- **Purpose/content:** best current visitor FAQ and primary source for the arrival journey.
- **Major headings:** Sundays at 9:00 and 10:45; parking; kids check-in; worship; meeting a pastor; getting connected; address/service times.
- **Important copy:** easy parking around the building; lobby self-check-in stations; Church Center preregistration; contemporary worship; 60–70-minute service; teaching described as expository/line by line; LMC Kids information; Next Steps connection path.
- **CTA/media/forms:** Plan Your Visit/visitor form, directions, multiple church and kids images.
- **Verification:** age range conflicts—home says birth through fifth grade; search-visible visit copy says one year through fifth grade. Confirm nursery availability, check-in flow, service duration, and accessibility.
- **Disposition:** **Keep route concept, rewrite at `/plan-your-visit`.** This is the strongest base for the new visitor page.

### `/so-glad-you-are-here-landing-page/` — Church Invite Landing Page

- **Purpose/content:** visitor campaign landing page; family, faith, community, line-by-line Bible teaching, groups, social activities, a short video, form, and directions.
- **Conflict:** invites visitors to 8:00, 9:30, or 11:15.
- **Disposition:** **Merge + Archive.** Preserve approved activity examples and the simple three-step journey; replace the route with `/plan-your-visit`.

### `/new-guest-follow/` — New Guest Follow Up

- **Purpose/content:** effectively empty (207 characters of builder/shortcode data; no useful public copy).
- **Disposition:** **Remove** the public page and redirect to `/plan-your-visit`; verify whether an internal follow-up workflow depends on the slug.

### `/services/` — Services

- **Purpose/content:** thin legacy page containing only “Two different services, two different styles.”
- **Disposition:** **Merge + Remove** into `/plan-your-visit`; do not preserve the unsupported claim unless leaders confirm distinct service styles.

### `/nextsteps/` — Next Steps

- **Purpose/content:** one class held Sundays during the 10:45 service, hosted by the leadership team; intended to help people connect, serve, and grow.
- **Headings/CTA:** “NEXT STEPS: LETS GROW TOGETHER,” “Connect • Serve • Grow,” Sign Up Here, Plan Your Visit.
- **Important copy:** cites Philippians 2:3, 2 Timothy 1:9, and 1 John 3:18.
- **Disposition:** **Keep + Rewrite + Verify** at `/connect/next-steps`; confirm schedule and active registration URL.

### `/about-living-message-church-clermont/` — About Our Church

- **Purpose/content:** church-family philosophy, community service, church name origin (“Living Stones”/“Living Message”), and Find, Feed & Restore history.
- **Major headings:** “ABOUT OUR CHURCH,” “A Church Without Membership,” “Serving our Community.”
- **CTA/embed:** church video; Plan Your Visit.
- **Stale claim:** says the outreach feeds over 70 people per month and teaches shelter/job/Microsoft Office classes; this differs from the newer housing-first description.
- **Disposition:** **Keep + Rewrite + Verify** at `/about-living-message-church-clermont`; retain the family philosophy and name story while withholding stale outreach claims.

### `/our-beliefs/` — Our Beliefs

- **Purpose/content:** teaching philosophy and doctrinal statement.
- **Major headings:** Why Beliefs Matter, Holy Scriptures, Trinity, Human Condition, Salvation, Assurance of Salvation, Church.
- **Important copy:** states close alignment with the 1689 Baptist Confession and 1853 New Hampshire Confession while saying confessions are not infallible; extensive scripture support; church as universal/local body and family.
- **CTA:** Plan Your Visit.
- **Disposition:** **Keep + editorial review** at `/about/beliefs`; pastoral/legal proofreading is required. SEO currently labels it “Church of Christ teachings,” which may be denominationally misleading and must be verified.

### `/meet-our-pastor/` — Meet Our Pastor

- **Purpose/content:** Brian and Allison Broadway biography; New York background, marriage/family, mission travel, 2004 move to Clermont, 2009 church founding, and ministry emphases.
- **Major headings:** “MEET OUR LEAD PASTOR,” “Meet The Broadways,” “Pastor Brian & Allison Broadway.”
- **Media/CTA:** Broadway family image; Plan Your Visit.
- **Disposition:** **Keep + Rewrite + Verify** at `/about/pastor`; retain the current biography and imagery while confirming final title, dates, family details, and whether Allison’s current role should match the team page.

### `/the-team/` — The Team

- **Purpose/content:** public leadership directory with images but almost no bios.
- **Executive team:** Brian Broadway — Lead Pastor/Bishop; Allison Broadway — Administrator; Brad Banker — Elder; Garry Grant — Elder; Carlos Martinez — Elder; Ricky Ortiz — Associate Pastor.
- **Deacons:** Dwayne Bishop — Deacon/Connection; Dennis Carter — Deacon; Nathanael Edmund — Deacon/Worship Pastor; Nathan Lehman — Deacon/Connection; Stephen McPherson — Deacon/Men’s Leader; Alfredo Olivo Jr. — Deacon.
- **Ministry leaders:** Kaidyn Exline — Children’s & Nursery Director; Jaime Simons — Facilities Director; Alejandro Hernandez — Young Adults Director; Dawn Simons — Hospitality Director.
- **CTA/media:** 16 staff portraits; Plan Your Visit link is malformed as `https://www.www.livingmessagechurch.com/plan-your-visit/`.
- **Disposition:** **Keep + Rewrite + Verify** at `/about/leadership`. Confirm all names, spelling (`Garry/Gary`, `Jaime/Jamie`, `Simons/Simmons` in filenames), titles, order, active status, bios, and image permissions/alt text.

### `/outreach/` — Outreach

- **Purpose/content:** Find, Feed & Restore as the outreach division/DBA; “Bringing Families From Homeless To Hopeful.”
- **Important copy:** housing-first transitional housing for homeless families with children; donated/purchased travel trailers; an initial rent/utilities-free period; case management covering budgeting, credit, meal planning, job preparation, resumes, and counseling.
- **CTA/media:** Visit/Donate at FindFeedRestore.com; Find, Feed & Restore logo.
- **Potentially stale detail:** exact four-month assistance/payment timeline and legal DBA relationship.
- **Disposition:** **Keep + Rewrite + Verify** at `/outreach`; link prominently to the organization’s current site.

### `/living-message-bible-training-school/` — Living Message Bible Training School

- **Purpose/content:** 2018 T.E.A.M.S free ministry-training program with Dr. Kerry and Dr. Paula Whetro; eight Mondays beginning June 4, 6:30–8:30 PM.
- **Forms/downloads/media:** legacy registration form, course image, old phone 352-617-8484; no current downloadable syllabus identified.
- **Critical issue:** the public source contains an unrelated external hormone/peptide shop link. It is suspicious, unrelated to church content, and must not migrate.
- **Disposition:** **Archive.** Preserve as organizational history only if approved; do not promote registration or migrate the suspicious link. Redirect to `/connect`, verify whether a current training program exists, and include this page in the legacy WordPress security review.

### `/ministries/` — Ministries

- **Purpose/content:** public page is empty.
- **Disposition:** **Remove + Verify.** Redirect to `/connect`; create ministry content only from confirmed source information (Kids, Youth, Young Adults, Women, Men, discipleship, marriage/groups are mentioned elsewhere but lack complete records).

### `/media/` — Media

- **Purpose/content:** hub for sermons and gallery with “This is Family, This is Church, This is Us.”
- **CTA/media:** YouTube streams, Pictures, sermon/gallery tile images, Plan Your Visit.
- **Disposition:** **Merge** into `/messages` and relevant photo sections.

### `/sermons-living-message-church-clermont/` — Sermons

- **Purpose/content:** recent sermons from Pastor Brian.
- **Major headings:** “SERMONS,” “Listen to recent sermons from Pastor Brian,” “RECENT SERMONS.”
- **Embeds:** three YouTube embeds, a YouTube short link, and a Podbean multi-player with download enabled.
- **Issue:** the fixed embeds are old; no reliable title/date/scripture metadata is exposed on the page.
- **Disposition:** **Keep concept + rebuild** at `/messages`; verify canonical YouTube/Podcast feeds, rights, speakers, dates, series, scripture, summaries, and transcript policy.

### `/online-church/` — Online Church

- **Purpose/content:** current 10:45 AM online service, previous sermons, worship quote, welcome from Brian and Allison.
- **Embeds:** YouTube feed/player plugin; church/community images.
- **Important copy:** offers online and in-person connection, Zoom or coffee/conversation; contains typo “Panera Breard.”
- **Disposition:** **Keep + Rewrite + Verify** at `/messages/live`; confirm livestream schedule, platform, moderation, and connection options.

### `/events-living-message-church-clermont/` — Events

- **Purpose/content:** “UPCOMING EVENTS” wrapper plus Sunday invitation; dynamic event output is not represented in REST content.
- **CTA:** Plan Your Visit link is malformed with `www.www`; navigation also links to Church Center registrations.
- **Disposition:** **Keep concept + rebuild** at `/events`; use a single authoritative event source and publish only current/upcoming records.

### `/pictures/` — Pictures

- **Purpose/content:** visual landing page with church-family language, hope/love devotional snippets, and nine images.
- **Calls to action:** Plan Your Visit, Events, two “Click Here” placeholders (`#`).
- **Issue:** duplicate gallery function, placeholder links, every observed image lacks useful alt text.
- **Disposition:** **Merge** approved copy/photos into Home/About/Connect; redirect to `/about/gallery` if the gallery is retained.

### `/photo-gallery/` — Photo Gallery

- **Purpose/content:** two galleries: Outreach and Gatherings & Family Fun.
- **Media:** 28 linked/full-size photos, mostly from 2014–2018; observed images have empty/missing alt text.
- **CTA issue:** Plan Your Visit uses malformed `www.www` hostname.
- **Disposition:** **Merge + Verify** at `/about/gallery`; curate recent, representative, consent-cleared images rather than migrating all files automatically.

### `/privacy-policy/` — LMC Privacy Policy

- **Purpose/content:** describes IP/contact/profile data, marketing emails, surveys, security, third-party links, cookies/tracking, and a general no-sell/share statement.
- **Broken contact:** the policy ends with `info@www.www.livingmessagechurch.com`; replace only after confirming the correct legal/privacy contact.
- **Media:** five decorative gallery images with missing alt text.
- **Disposition:** **Keep route + legal rewrite/review.** Update actual processors (Vercel, analytics, forms, Church Center, Typeform/Text In Church, embeds), retention, consent, minors, rights/contact, effective date, and cookie behavior.

### `/photo-release/` — LMC Photo Release

- **Purpose/content:** notice that entering events/programs may involve photography/audio/video; broad consent to publication/promotion and a release of liability.
- **Broken contact:** the notice ends with `info@www.www.livingmessagechurch.com`.
- **Media/forms:** background church media; no opt-out or contact workflow is clearly presented in the public copy.
- **Disposition:** **Keep route + legal/safeguarding review.** Confirm enforceability, minors/guardian consent, opt-out process, accessibility, and relationship to event registration.

### `/2025-resurrection-sunday/` — 2025 Resurrection Sunday

- **Purpose/content:** expired April 18/20, 2025 campaign; Good Friday at Waterfront Park and three Resurrection Sunday services at the former Montrose Street location.
- **CTA/media/contact:** Plan Your Visit Typeform, eight campaign/community images, old phone 352-617-8484, old address 830 W. Montrose Street.
- **Disposition:** **Archive** to `/events`; do not reuse its dates, times, address, or phone.

### `/resurrection-sunday-at-lmc/` — Resurrection Sunday at LMC

- **Purpose/content:** expired April 7/9 campaign, apparently 2023; Good Friday at Waterfront Park and three Sunday services at the former Montrose Street location.
- **Headings/content:** Expository Preaching, Open Forum, True Connection, This Is Hope, This Is Love.
- **Disposition:** **Archive** to `/events`; retain only approved evergreen teaching/connection principles elsewhere.

## Post routes

| Old URL | Title/purpose | Content/media | Disposition |
| --- | --- | --- | --- |
| `/?page_id=10` | Search-canonicalized posts index titled “I’m New” | Confusingly uses visitor SEO/title metadata for a post collection. | **Remove/Merge** to `/plan-your-visit`. |
| `/the-power-of-a-dream/` | 2018 article, “The Power of a Dream” | Two article images; categorized as Bible Study/Thoughts. | **Archive** to `/messages`; review content before any republication. |
| `/a-touch-of-faith/` | 2018 article, “A Touch of Faith” | Two article images. | **Archive** to `/messages`; review content before any republication. |
| `/trends-vs-friends/` | 2018 article, “Trends vs Friends” | Two article images. | **Archive** to `/messages`; review content before any republication. |

## Event archive and detail URLs

The sitemap contains `/events/` plus **415 event detail or recurrence URLs**. All advertised event detail records are historical (2017–2024); many are mechanically generated instances of recurring events. Major clusters include:

- Worship team practice (2021–2024 weekly instances).
- Men’s meetings (2021–2024 instances).
- Young adults meetings (2021–2022 instances plus standalone records).
- Communion Sundays (2021–2023 instances).
- CrossFit Youth Ministry (2021–2023 instances plus standalone records).
- Women’s ministry meetings (2022–2023 instances plus standalone records).
- Find, Feed & Restore board meetings (2022–2023 instances).
- Sunday-service records carrying obsolete schedules: 9:00/10:30, 8:00/9:30/11:15, and 10:00.
- One-off historical events such as Easter/Resurrection services, worship nights, family days/picnics, marriage events, retreats, conferences, meals, prayer, Bible studies, auditions, and outreach.

Content commonly includes date/time, venue, event description, featured image, organizer/category metadata, and registration or visit links. The records are valuable as historical evidence of ministries, but not as current event content.

**Disposition for every legacy event URL:** **Archive** and permanently redirect to `/events`, unless church leadership explicitly selects an event for a curated history page. Do not migrate recurrence instances into the new event database. The exact 416-row URL register appears in the appendix and in `REDIRECTS.md`.

## Taxonomy and author archives

| Routes | Purpose | Disposition |
| --- | --- | --- |
| `/category/bible-study/`, `/category/thoughts/` | Archives for the three 2018 articles. | **Archive/Merge** to `/messages`. |
| Seven `/tag/.../` routes | Thin tag archives for church/location/home-group/men’s ministry terms. | **Remove/Merge** to `/messages` or `/connect`; redirects use `/messages`. |
| `/events/category/family-fun/` | Historical event category archive. | **Archive** to `/events`. |
| `/author/living/` | Thin author archive for the old posts. | **Remove/Merge** to `/messages`. |

## Forms, embeds, downloads, and external services

- **Forms:** current contact form (name, email, message); Typeform Plan Your Visit; Text In Church connect card; Church Center registrations/giving; legacy training registration. Verify ownership, spam protection, confirmation behavior, retention, accessibility, and privacy disclosures.
- **Embeds:** YouTube feeds/players, Podbean player, Google Maps, Google Tag Manager. Verify each embed is still needed and use consent-aware loading where appropriate.
- **Downloads:** Podbean exposes a download control; no current public PDF/document downloads were discovered. Do not assume legacy images are downloadable resources.
- **External ministry links:** Find, Feed & Restore; Radius International; Life’s Choices; SLPFCC; Ligonier Ministries; Radical; Campus Outreach Central Florida. Confirm the relationship, destination, labeling, and approval for each before migration.

## Image and accessibility inventory

The sitemap and rendered pages expose many church-owned image URLs, but the observed gallery, team, campaign, and home-page images overwhelmingly have blank or missing alt text. Images should be re-selected from original church-owned files, rights/consent checked against the photo-release policy, cropped for the new system, and assigned contextual alt text. No Motivation Church asset was downloaded or included in this inventory.

## Complete URL register

The URL-by-URL register is generated from the production sitemaps and appended below. It records every discovered canonical URL, actual or source-derived title, content type, disposition, and proposed destination. The same records are available in machine-readable form in `old-site-inventory.json`.

| Old route | Title | Type | Disposition | New route |
| --- | --- | --- | --- | --- |
| `/` | Home | page | Keep / Rewrite | `/` |
| `/new-guest-follow/` | New Guest Follow Up | page | Remove | `/plan-your-visit` |
| `/services/` | Services | page | Merge / Rewrite | `/plan-your-visit` |
| `/outreach/` | Outreach | page | Keep / Rewrite | `/outreach` |
| `/sermons-living-message-church-clermont/` | Sermons | page | Merge / Rewrite | `/messages` |
| `/living-message-bible-training-school/` | Living Message Bible Training School | page | Archive | `/connect` |
| `/photo-gallery/` | Photo Gallery | page | Merge / Archive | `/about/gallery` |
| `/pictures/` | Pictures | page | Merge / Archive | `/about/gallery` |
| `/media/` | Media | page | Merge / Rewrite | `/messages` |
| `/ministries/` | Ministries | page | Remove / Rewrite | `/connect` |
| `/resurrection-sunday-at-lmc/` | Resurrection Sunday at LMC | page | Archive | `/events` |
| `/privacy-policy/` | LMC Privacy Policy | page | Keep / Rewrite | `/privacy-policy` |
| `/2025-resurrection-sunday/` | 2025 Resurrection Sunday | page | Archive | `/events` |
| `/photo-release/` | LMC Photo Release | page | Keep / Rewrite | `/photo-release` |
| `/so-glad-you-are-here-landing-page/` | Church Invite Landing Page | page | Merge / Rewrite | `/plan-your-visit` |
| `/our-beliefs/` | Our Beliefs | page | Keep / Rewrite | `/about/beliefs` |
| `/home/` | Home_OLD | page | Merge / Archive | `/` |
| `/meet-our-pastor/` | Meet Our Pastor | page | Keep / Rewrite | `/about/pastor` |
| `/about-living-message-church-clermont/` | About Our Church | page | Keep / Rewrite | `/about-living-message-church-clermont` |
| `/events-living-message-church-clermont/` | Events | page | Keep / Rewrite | `/events` |
| `/contact-living-message-church-clermont/` | Contact | page | Keep / Rewrite | `/contact` |
| `/home2/` | Home2 | page | Merge / Archive | `/` |
| `/online-church/` | Online Church | page | Keep / Rewrite | `/messages/live` |
| `/new-visitors/` | I’m New | page | Merge / Rewrite | `/plan-your-visit` |
| `/plan-your-visit/` | Plan Your Visit | page | Merge / Rewrite | `/plan-your-visit` |
| `/nextsteps/` | Next Steps | page | Keep / Rewrite | `/connect/next-steps` |
| `/the-team/` | The Team | page | Keep / Merge / Rewrite | `/about/leadership` |
| `/?page_id=10` | Posts index (canonical metadata: I’m New) | post_index | Merge / Remove | `/plan-your-visit` |
| `/the-power-of-a-dream/` | The Power of a Dream | post | Archive / Merge | `/messages` |
| `/a-touch-of-faith/` | A Touch of Faith | post | Archive / Merge | `/messages` |
| `/trends-vs-friends/` | Trends vs. Friends | post | Archive / Merge | `/messages` |
| `/events/` | Events Archive | event_archive | Keep / Rewrite | `/events` |
| `/event/easter-service/` | Easter Service | event | Archive | `/events` |
| `/event/worship-night/` | Worship Night | event | Archive | `/events` |
| `/event/mens-meeting-2024-02-05/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-09-02/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-03-04/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-04-01/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-02-06/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-05-06/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-10-07/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-03-06/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-10-03/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-06-03/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-07-01/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-04-03/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-11-07/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-12-05/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-05-01/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-06-05/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-07-03/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-08-05/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-08-07/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-09-04/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-10-02/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-11-06/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2024-01-01/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-09-05/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-12-04/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2023-01-02/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/womens-pool-party/` | Women’s Pool Party | event | Archive | `/events` |
| `/event/worship-night-2/` | Worship Night | event | Archive | `/events` |
| `/event/anniversary-weekend2/` | Pastors Judy & Karen Broadway | event | Archive | `/events` |
| `/event/anniversary-weekend1/` | Ministers Eric & Gail Wright | event | Archive | `/events` |
| `/event/christmas-party/` | Christmas Party | event | Archive | `/events` |
| `/event/home-groups/` | Home Groups | event | Archive | `/events` |
| `/event/family-day/` | Family Fun Day | event | Archive | `/events` |
| `/event/samson/` | SAMSON | event | Archive | `/events` |
| `/event/feeding-families-need/` | Monthly Outreach | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-01-13/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-02-10/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-03-10/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-04-14/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-05-12/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-06-09/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-07-14/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-08-11/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-09-08/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-10-13/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-11-10/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-12-08/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/prayer-worship-vision-casting-night/` | Prayer, Worship & Vision Casting Night | event | Archive | `/events` |
| `/event/womens-breakfast/` | Women’s Breakfast | event | Archive | `/events` |
| `/event/ministry-training-school/` | Ministry Training School | event | Archive | `/events` |
| `/event/mens-meeting-2018-08-18/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/9am-sunday-service/` | 9am Sunday Service | event | Archive | `/events` |
| `/event/1030am-sunday-service/` | 10:30am Sunday Service | event | Archive | `/events` |
| `/event/womens-istry/` | Womens istry | event | Archive | `/events` |
| `/event/family-fun-day/` | Family Fun Day | event | Archive | `/events` |
| `/event/home-groups-marriage-group/` | Home Groups – Marriage Group | event | Archive | `/events` |
| `/event/marriage-seminar/` | Marriage Seminar | event | Archive | `/events` |
| `/event/adult-dinner-night-calabrias/` | Couples Dinner Night | event | Archive | `/events` |
| `/event/mens-event-top-golf/` | Men’s Event – Top Golf | event | Archive | `/events` |
| `/event/study-of-1-john-home-group/` | Home Group – Study of 1 John | event | Archive | `/events` |
| `/event/worship-team-practice-2024-01-17/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2024-01-24/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2024-01-31/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-12-13/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-09-07/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-09-14/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-09-21/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-09-28/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-10-05/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-10-12/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-10-19/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-10-26/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-11-02/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-11-09/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-11-16/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-11-23/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-11-30/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-12-07/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-12-14/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-12-21/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-12-28/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-01-04/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-01-11/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-01-18/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-01-25/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-02-01/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-02-08/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-02-15/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-02-22/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-03-01/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-03-08/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-03-15/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-03-22/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-03-29/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-04-05/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-04-12/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-04-19/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-04-26/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-05-03/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-05-10/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-05-17/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-05-24/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-05-31/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-06-07/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-06-14/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-06-21/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-06-28/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-07-05/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-07-12/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-07-19/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-07-26/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-08-02/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-08-09/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-08-16/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-12-20/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-08-23/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-08-30/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-09-06/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-12-27/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-09-13/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-09-20/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2024-01-03/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-09-27/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-10-04/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-10-11/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-10-18/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-10-25/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-11-01/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-11-08/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-11-15/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-11-22/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-11-29/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2023-12-06/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2024-01-10/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/womens-conference/` | Womens Conference | event | Archive | `/events` |
| `/event/1030am-sunday-service-2019-04-21/` | 10:30am Easter Service | event_recurrence | Archive | `/events` |
| `/event/family-game-night/` | Family Game Night | event | Archive | `/events` |
| `/event/in-depth-bible-study/` | In-depth Bible Study | event | Archive | `/events` |
| `/event/mens-retreat/` | Men’s Retreat | event | Archive | `/events` |
| `/event/womens-craft-night/` | Women’s Craft Night | event | Archive | `/events` |
| `/event/hospitality-team-gathering/` | Hospitality Team Gathering | event | Archive | `/events` |
| `/event/worship-and-media-team-meeting/` | Worship and Media Team Meeting | event | Archive | `/events` |
| `/event/womens-walk-talk/` | Women’s Walk & Talk | event | Archive | `/events` |
| `/event/womens-wings-and-wraps-night/` | Women’s Wings and Wraps Night | event | Archive | `/events` |
| `/event/mens-wings-night/` | Men’s Wings Night | event | Archive | `/events` |
| `/event/next-steps-classes-2022-01-23/` | Next Steps Classes | event_recurrence | Archive | `/events` |
| `/event/next-steps-classes-2022-01-30/` | Next Steps Classes | event_recurrence | Archive | `/events` |
| `/event/next-steps-classes-2022-02-06/` | Next Steps Classes | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-07-05/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-07-19/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-08-02/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-08-16/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-09-06/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-09-20/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-10-04/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-10-18/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-11-01/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-11-15/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-12-06/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2021-12-20/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-01-03/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-01-17/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-02-07/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-02-21/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-03-07/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-03-21/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-04-04/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-04-18/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-05-02/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-05-16/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-06-06/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-06-20/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-07-04/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-07-18/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-08-01/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2022-08-15/` | Men’s Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-meeting-2/` | Men’s Meeting | event | Archive | `/events` |
| `/event/womens-bible-study/` | Women’s Bible Study | event | Archive | `/events` |
| `/event/couples-dinner-night/` | Couples Dinner Night | event | Archive | `/events` |
| `/event/womens-ministry-meeting-2020-10-24/` | Women’s Ministry Crafts & Fellowship | event_recurrence | Archive | `/events` |
| `/event/mens-wings-night-2/` | Men’s Wings Night | event | Archive | `/events` |
| `/event/womens-christmas-gathering/` | Women’s Christmas Gathering | event | Archive | `/events` |
| `/event/womens-wing-night/` | Women’s Wing Night | event | Archive | `/events` |
| `/event/young-adults-pre-launch-meeting/` | Young Adults / Pre-Launch Meeting | event | Archive | `/events` |
| `/event/young-adults/` | Young Adults | event | Archive | `/events` |
| `/event/young-adults-meeting-2021-12-16/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-01-06/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-01-20/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-02-03/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-02-17/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-03-03/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-03-17/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-04-07/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-04-21/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-05-05/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-05-19/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-06-02/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-06-16/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-07-07/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-07-21/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-08-04/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-08-18/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-09-01/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-09-15/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-10-06/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-10-20/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-11-03/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-11-17/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-12-01/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2022-12-15/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/mens-retreat-2021/` | Men’s Retreat 2021 | event | Archive | `/events` |
| `/event/blacklight-dodgeball/` | BlackLight Dodgeball | event | Archive | `/events` |
| `/event/womens-ministry-meeting/` | Women’s Ministry Meeting | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-2021-12-09/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-01-27/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-02-24/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-03-24/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-04-28/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-05-26/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-06-23/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-07-28/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-07-01/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-07-15/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-08-05/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-08-19/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-09-02/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-09-16/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-10-07/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-10-21/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-11-04/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-11-18/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/young-adults-meeting-2021-12-02/` | Young Adults Meeting | event_recurrence | Archive | `/events` |
| `/event/next-steps-classes/` | Next Steps Classes | event | Archive | `/events` |
| `/event/worship-team-practice-2021-12-08/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2021-12-15/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2021-12-22/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2021-12-29/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-01-05/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-01-12/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-01-19/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-01-26/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-02-02/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-02-09/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-02-16/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-02-23/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-03-02/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-03-09/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-03-16/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-03-23/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-03-30/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-04-06/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-04-13/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-04-20/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-04-27/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-05-04/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-05-11/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-05-18/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-05-25/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-06-01/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-06-08/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-06-15/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-06-22/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-06-29/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-07-06/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-07-13/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-07-20/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-07-27/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-08-03/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-08-10/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-08-17/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-08-24/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/worship-team-practice-2022-08-31/` | Worship Team Practice | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-02-15/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-03-15/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-04-19/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-05-17/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-06-21/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-07-19/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-08-16/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-09-20/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-10-18/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-11-15/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2022-12-20/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-01-17/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-02-21/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-03-21/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-04-18/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-05-16/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-06-20/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-07-18/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-08-15/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-09-19/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-10-17/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-11-21/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting-2023-12-19/` | FFR Board Meeting | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-08-25/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-09-22/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-10-27/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2022-12-22/` | Crossfit Youth Ministry | event_recurrence | Archive | `/events` |
| `/event/discipleship-group-meet-sept-2021-classes/` | Discipleship Group Meet (Sept 2021 Classes) | event | Archive | `/events` |
| `/event/discipleship-interest-meeting-2022-feb-group/` | Discipleship Interest Meeting 2022 Feb Group | event | Archive | `/events` |
| `/event/communion-sunday/` | Communion Sunday | event | Archive | `/events` |
| `/event/communion-sunday-2022-01-23/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-02-13/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-02-27/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-03-13/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-03-27/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-04-10/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-04-24/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-05-08/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-05-22/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-06-12/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-06-26/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-07-10/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-07-24/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-08-14/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-08-28/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-09-11/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-09-25/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-10-09/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-10-23/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-11-13/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-11-27/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-12-11/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2022-12-25/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-01-08/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-01-22/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-02-12/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-02-26/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-03-12/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-03-26/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-04-09/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-04-23/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-05-14/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-05-28/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-06-11/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-06-25/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-07-09/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-07-23/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-08-13/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-08-27/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-09-10/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-09-24/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-10-08/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-10-22/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-11-12/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-11-26/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/communion-sunday-2023-12-10/` | Communion Sunday | event_recurrence | Archive | `/events` |
| `/event/crossfit-youth-ministry-2021-12-23/` | Crossfit Youth Ministry Christmas Party | event_recurrence | Archive | `/events` |
| `/event/ffr-board-meeting/` | FFR Board Meeting | event | Archive | `/events` |
| `/event/womens-ministry-2022-02-26/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-03-26/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-04-23/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-05-28/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-06-25/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-07-23/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-08-27/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-09-24/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-10-22/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-11-26/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2022-12-24/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2023-01-28/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2/` | Women’s Ministry | event | Archive | `/events` |
| `/event/womens-ministry-2-2022-02-08/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/womens-ministry-2-2022-03-08/` | Women’s Ministry | event_recurrence | Archive | `/events` |
| `/event/family-fun-day-2/` | Family Fun Day | event | Archive | `/events` |
| `/event/hospitality-team-training/` | Hospitality Team Training | event | Archive | `/events` |
| `/event/crossfit-youth-ministry/` | Crossfit Youth Ministry | event | Archive | `/events` |
| `/event/womens-ministry/` | Women’s Ministry | event | Archive | `/events` |
| `/event/communion-sunday-2/` | Communion Sunday | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-4/` | Crossfit Youth Ministry Christmas Party | event | Archive | `/events` |
| `/event/christmas-party-2/` | Christmas Service & Fellowship | event | Archive | `/events` |
| `/event/womens-ministry-christmas-party/` | Women’s Ministry Christmas Party | event | Archive | `/events` |
| `/event/online-bible-study/` | Online Bible Study | event | Archive | `/events` |
| `/event/corporate-prayer-2/` | Corporate Prayer | event | Archive | `/events` |
| `/event/corporate-prayer/` | Corporate Prayer | event | Archive | `/events` |
| `/event/mens-meeting-3/` | Men’s Meeting | event | Archive | `/events` |
| `/event/mens-meeting/` | Men’s Meeting | event | Archive | `/events` |
| `/event/sunday-service/` | Sunday Service | event | Archive | `/events` |
| `/event/sunday-service-2/` | Sunday Service | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-2/` | CrossFit Youth Ministry | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-6/` | Crossfit Youth Ministry 6 | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-5/` | Crossfit Youth Ministry | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-7/` | Crossfit Youth Ministry 7 | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-3/` | CrossFit Youth Ministry | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-9/` | CrossFit Youth Ministry | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-midnight-madness-lock-in-2/` | CrossFit Youth Ministry-Midnight Madness Lock-In | event | Archive | `/events` |
| `/event/young-adults-meeting-2-2/` | Young Adults Meeting | event | Archive | `/events` |
| `/event/young-adults-meeting/` | Young Adults Meeting | event | Archive | `/events` |
| `/event/young-adults-meeting-3/` | Young Adults Meeting | event | Archive | `/events` |
| `/event/womens-ministry-3/` | Women’s Ministry | event | Archive | `/events` |
| `/event/womens-ministry-5/` | Women’s Ministry | event | Archive | `/events` |
| `/event/womens-pizza-pasta-night/` | Womens Pizza Pasta Night | event | Archive | `/events` |
| `/event/mens-breakfast/` | Mens Breakfast | event | Archive | `/events` |
| `/event/womens-game-night/` | Women’s Game Night | event | Archive | `/events` |
| `/event/crossfit-youth-ministry-8/` | Crossfit Youth Ministry | event | Archive | `/events` |
| `/event/young-adults-meeting-2/` | Young Adults Meeting | event | Archive | `/events` |
| `/event/womens-ministry-4/` | Women’s Ministry | event | Archive | `/events` |
| `/event/next-steps-classes-2/` | Next Steps Classes | event | Archive | `/events` |
| `/event/worship-team-practice/` | Worship Team Practice | event | Archive | `/events` |
| `/event/worship-team-auditions/` | Worship Team Auditions | event | Archive | `/events` |
| `/event/church-family-picnic/` | Church Family Picnic | event | Archive | `/events` |
| `/event/good-friday-service/` | Good Friday Service | event | Archive | `/events` |
| `/event/mens-wing-night/` | Mens Wing Night | event | Archive | `/events` |
| `/event/resurrection-sunday/` | Resurrection Sunday | event | Archive | `/events` |
| `/event/sunday-service-2-3/` | Sunday Service | event | Archive | `/events` |
| `/event/young-adults-meeting-4-2/` | Young Adults Meeting | event | Archive | `/events` |
| `/event/young-adults-meeting-4/` | Young Adults Meeting 4 | event | Archive | `/events` |
| `/event/1000am-sunday-service/` | Sunday Service | event | Archive | `/events` |
| `/event/sunday-service-2-2/` | Sunday Service | event | Archive | `/events` |
| `/event/sunday-service-8am/` | Sunday Service 8am | event | Archive | `/events` |
| `/event/sunday-service-1115am/` | Sunday Service 1115am | event | Archive | `/events` |
| `/event/sunday-service-930am/` | Sunday Service 930am | event | Archive | `/events` |
| `/category/bible-study/` | Bible Study | category_archive | Archive / Merge | `/messages` |
| `/category/thoughts/` | Thoughts | category_archive | Archive / Merge | `/messages` |
| `/tag/church-in-clermont-florida/` | Church In Clermont Florida | tag_archive | Archive / Merge | `/messages` |
| `/tag/clermont-fl/` | Clermont Fl | tag_archive | Archive / Merge | `/messages` |
| `/tag/home-group/` | Home Group | tag_archive | Archive / Merge | `/messages` |
| `/tag/living-message-church/` | Living Message Church | tag_archive | Archive / Merge | `/messages` |
| `/tag/men-ministry/` | Men Ministry | tag_archive | Archive / Merge | `/messages` |
| `/tag/mens-ministry/` | Mens Ministry | tag_archive | Archive / Merge | `/messages` |
| `/tag/mens-breakfast/` | Mens Breakfast | tag_archive | Archive / Merge | `/messages` |
| `/events/category/family-fun/` | Family Fun | event_category_archive | Archive | `/events` |
| `/author/living/` | Living | author_archive | Archive / Merge | `/messages` |
