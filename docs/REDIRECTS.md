# Redirect register

Audit date: 2026-08-05

This ledger covers all **458 canonical public URLs** advertised by the production sitemaps. Changed routes use permanent redirects. Same logical routes remain 200 destinations; trailing-slash normalization may be handled consistently by Next.js/Vercel. Query strings should be preserved unless a rule intentionally replaces them.

## Rules and safeguards

- Implement exact routes before broader pattern rules.
- Return **301 Moved Permanently** for every changed public content route. These audited sources are GET pages; do not apply the catch-all rules to form/API endpoints where method preservation matters.
- Do not redirect missing assets, admin/API routes, or arbitrary unknown URLs to Home.
- The 415 historical event detail/recurrence URLs intentionally converge on `/events`; do not recreate them as current events.
- Test every source with a single-hop redirect and a 200 destination before launch.
- Keep this ledger as the source for the eventual Next.js redirect configuration; no application redirect has been implemented yet.

## Complete mapping

| Old route | Proposed route | HTTP action | Rationale |
| --- | --- | --- | --- |
| `/` | `/` | Keep (200) | Canonical route remains; normalize trailing slash per framework policy. |
| `/new-guest-follow/` | `/plan-your-visit` | Permanent (301) | Remove |
| `/services/` | `/plan-your-visit` | Permanent (301) | Merge / Rewrite |
| `/outreach/` | `/outreach` | Keep (200) | Canonical route remains; normalize trailing slash per framework policy. |
| `/sermons-living-message-church-clermont/` | `/messages` | Permanent (301) | Merge / Rewrite |
| `/living-message-bible-training-school/` | `/connect` | Permanent (301) | Archive |
| `/photo-gallery/` | `/about/gallery` | Permanent (301) | Merge / Archive |
| `/pictures/` | `/about/gallery` | Permanent (301) | Merge / Archive |
| `/media/` | `/messages` | Permanent (301) | Merge / Rewrite |
| `/ministries/` | `/connect` | Permanent (301) | Remove / Rewrite |
| `/resurrection-sunday-at-lmc/` | `/events` | Permanent (301) | Archive |
| `/privacy-policy/` | `/privacy-policy` | Keep (200) | Canonical route remains; normalize trailing slash per framework policy. |
| `/2025-resurrection-sunday/` | `/events` | Permanent (301) | Archive |
| `/photo-release/` | `/photo-release` | Keep (200) | Canonical route remains; normalize trailing slash per framework policy. |
| `/so-glad-you-are-here-landing-page/` | `/plan-your-visit` | Permanent (301) | Merge / Rewrite |
| `/our-beliefs/` | `/about/beliefs` | Permanent (301) | Keep / Rewrite |
| `/home/` | `/` | Permanent (301) | Merge / Archive |
| `/meet-our-pastor/` | `/about/pastor` | Permanent (301) | Keep / Rewrite |
| `/about-living-message-church-clermont/` | `/about-living-message-church-clermont` | Keep (200) | Preserve the supplied Our Church slug and replace the legacy presentation in place. |
| `/events-living-message-church-clermont/` | `/events` | Permanent (301) | Keep / Rewrite |
| `/contact-living-message-church-clermont/` | `/contact` | Permanent (301) | Keep / Rewrite |
| `/home2/` | `/` | Permanent (301) | Merge / Archive |
| `/online-church/` | `/online-church` | Keep (200) | Preserve the authoritative production slug and replace the legacy presentation in place. |
| `/new-visitors/` | `/plan-your-visit` | Permanent (301) | Merge / Rewrite |
| `/plan-your-visit/` | `/plan-your-visit` | Keep (200) | Preserve the authoritative visitor slug and replace the legacy presentation in place. |
| `/nextsteps/` | `/connect/next-steps` | Permanent (301) | Keep / Rewrite |
| `/the-team/` | `/about/leadership` | Permanent (301) | Keep / Merge / Rewrite |
| `/?page_id=10` | `/plan-your-visit` | Permanent (301) | Merge / Remove |
| `/the-power-of-a-dream/` | `/messages` | Permanent (301) | Archive / Merge |
| `/a-touch-of-faith/` | `/messages` | Permanent (301) | Archive / Merge |
| `/trends-vs-friends/` | `/messages` | Permanent (301) | Archive / Merge |
| `/events/` | `/events` | Keep (200) | Canonical route remains; normalize trailing slash per framework policy. |
| `/event/easter-service/` | `/events` | Permanent (301) | Archive |
| `/event/worship-night/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-02-05/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-09-02/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-03-04/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-04-01/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-02-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-05-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-10-07/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-03-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-10-03/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-06-03/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-07-01/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-04-03/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-11-07/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-12-05/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-05-01/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-06-05/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-07-03/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-08-05/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-08-07/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-09-04/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-10-02/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-11-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2024-01-01/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-09-05/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-12-04/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2023-01-02/` | `/events` | Permanent (301) | Archive |
| `/event/womens-pool-party/` | `/events` | Permanent (301) | Archive |
| `/event/worship-night-2/` | `/events` | Permanent (301) | Archive |
| `/event/anniversary-weekend2/` | `/events` | Permanent (301) | Archive |
| `/event/anniversary-weekend1/` | `/events` | Permanent (301) | Archive |
| `/event/christmas-party/` | `/events` | Permanent (301) | Archive |
| `/event/home-groups/` | `/events` | Permanent (301) | Archive |
| `/event/family-day/` | `/events` | Permanent (301) | Archive |
| `/event/samson/` | `/events` | Permanent (301) | Archive |
| `/event/feeding-families-need/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-01-13/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-02-10/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-03-10/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-04-14/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-05-12/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-06-09/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-07-14/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-08-11/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-09-08/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-10-13/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-11-10/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-12-08/` | `/events` | Permanent (301) | Archive |
| `/event/prayer-worship-vision-casting-night/` | `/events` | Permanent (301) | Archive |
| `/event/womens-breakfast/` | `/events` | Permanent (301) | Archive |
| `/event/ministry-training-school/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2018-08-18/` | `/events` | Permanent (301) | Archive |
| `/event/9am-sunday-service/` | `/events` | Permanent (301) | Archive |
| `/event/1030am-sunday-service/` | `/events` | Permanent (301) | Archive |
| `/event/womens-istry/` | `/events` | Permanent (301) | Archive |
| `/event/family-fun-day/` | `/events` | Permanent (301) | Archive |
| `/event/home-groups-marriage-group/` | `/events` | Permanent (301) | Archive |
| `/event/marriage-seminar/` | `/events` | Permanent (301) | Archive |
| `/event/adult-dinner-night-calabrias/` | `/events` | Permanent (301) | Archive |
| `/event/mens-event-top-golf/` | `/events` | Permanent (301) | Archive |
| `/event/study-of-1-john-home-group/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2024-01-17/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2024-01-24/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2024-01-31/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-12-13/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-09-07/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-09-14/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-09-21/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-09-28/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-10-05/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-10-12/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-10-19/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-10-26/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-11-02/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-11-09/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-11-16/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-11-23/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-11-30/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-12-07/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-12-14/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-12-21/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-12-28/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-01-04/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-01-11/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-01-18/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-01-25/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-02-01/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-02-08/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-02-15/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-02-22/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-03-01/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-03-08/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-03-15/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-03-22/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-03-29/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-04-05/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-04-12/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-04-19/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-04-26/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-05-03/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-05-10/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-05-17/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-05-24/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-05-31/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-06-07/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-06-14/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-06-21/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-06-28/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-07-05/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-07-12/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-07-19/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-07-26/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-08-02/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-08-09/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-08-16/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-12-20/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-08-23/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-08-30/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-09-06/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-12-27/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-09-13/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-09-20/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2024-01-03/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-09-27/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-10-04/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-10-11/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-10-18/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-10-25/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-11-01/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-11-08/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-11-15/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-11-22/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-11-29/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2023-12-06/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2024-01-10/` | `/events` | Permanent (301) | Archive |
| `/event/womens-conference/` | `/events` | Permanent (301) | Archive |
| `/event/1030am-sunday-service-2019-04-21/` | `/events` | Permanent (301) | Archive |
| `/event/family-game-night/` | `/events` | Permanent (301) | Archive |
| `/event/in-depth-bible-study/` | `/events` | Permanent (301) | Archive |
| `/event/mens-retreat/` | `/events` | Permanent (301) | Archive |
| `/event/womens-craft-night/` | `/events` | Permanent (301) | Archive |
| `/event/hospitality-team-gathering/` | `/events` | Permanent (301) | Archive |
| `/event/worship-and-media-team-meeting/` | `/events` | Permanent (301) | Archive |
| `/event/womens-walk-talk/` | `/events` | Permanent (301) | Archive |
| `/event/womens-wings-and-wraps-night/` | `/events` | Permanent (301) | Archive |
| `/event/mens-wings-night/` | `/events` | Permanent (301) | Archive |
| `/event/next-steps-classes-2022-01-23/` | `/events` | Permanent (301) | Archive |
| `/event/next-steps-classes-2022-01-30/` | `/events` | Permanent (301) | Archive |
| `/event/next-steps-classes-2022-02-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-07-05/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-07-19/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-08-02/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-08-16/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-09-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-09-20/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-10-04/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-10-18/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-11-01/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-11-15/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-12-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2021-12-20/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-01-03/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-01-17/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-02-07/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-02-21/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-03-07/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-03-21/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-04-04/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-04-18/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-05-02/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-05-16/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-06-06/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-06-20/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-07-04/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-07-18/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-08-01/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2022-08-15/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-2/` | `/events` | Permanent (301) | Archive |
| `/event/womens-bible-study/` | `/events` | Permanent (301) | Archive |
| `/event/couples-dinner-night/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-meeting-2020-10-24/` | `/events` | Permanent (301) | Archive |
| `/event/mens-wings-night-2/` | `/events` | Permanent (301) | Archive |
| `/event/womens-christmas-gathering/` | `/events` | Permanent (301) | Archive |
| `/event/womens-wing-night/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-pre-launch-meeting/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-12-16/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-01-06/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-01-20/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-02-03/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-02-17/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-03-03/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-03-17/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-04-07/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-04-21/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-05-05/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-05-19/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-06-02/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-06-16/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-07-07/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-07-21/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-08-04/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-08-18/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-09-01/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-09-15/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-10-06/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-10-20/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-11-03/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-11-17/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-12-01/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2022-12-15/` | `/events` | Permanent (301) | Archive |
| `/event/mens-retreat-2021/` | `/events` | Permanent (301) | Archive |
| `/event/blacklight-dodgeball/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-meeting/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2021-12-09/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-01-27/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-02-24/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-03-24/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-04-28/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-05-26/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-06-23/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-07-28/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-07-01/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-07-15/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-08-05/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-08-19/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-09-02/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-09-16/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-10-07/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-10-21/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-11-04/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-11-18/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2021-12-02/` | `/events` | Permanent (301) | Archive |
| `/event/next-steps-classes/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2021-12-08/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2021-12-15/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2021-12-22/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2021-12-29/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-01-05/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-01-12/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-01-19/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-01-26/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-02-02/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-02-09/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-02-16/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-02-23/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-03-02/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-03-09/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-03-16/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-03-23/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-03-30/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-04-06/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-04-13/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-04-20/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-04-27/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-05-04/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-05-11/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-05-18/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-05-25/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-06-01/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-06-08/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-06-15/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-06-22/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-06-29/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-07-06/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-07-13/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-07-20/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-07-27/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-08-03/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-08-10/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-08-17/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-08-24/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice-2022-08-31/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-02-15/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-03-15/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-04-19/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-05-17/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-06-21/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-07-19/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-08-16/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-09-20/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-10-18/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-11-15/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2022-12-20/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-01-17/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-02-21/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-03-21/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-04-18/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-05-16/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-06-20/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-07-18/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-08-15/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-09-19/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-10-17/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-11-21/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting-2023-12-19/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-08-25/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-09-22/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-10-27/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2022-12-22/` | `/events` | Permanent (301) | Archive |
| `/event/discipleship-group-meet-sept-2021-classes/` | `/events` | Permanent (301) | Archive |
| `/event/discipleship-interest-meeting-2022-feb-group/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-01-23/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-02-13/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-02-27/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-03-13/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-03-27/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-04-10/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-04-24/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-05-08/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-05-22/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-06-12/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-06-26/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-07-10/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-07-24/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-08-14/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-08-28/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-09-11/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-09-25/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-10-09/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-10-23/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-11-13/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-11-27/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-12-11/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2022-12-25/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-01-08/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-01-22/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-02-12/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-02-26/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-03-12/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-03-26/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-04-09/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-04-23/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-05-14/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-05-28/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-06-11/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-06-25/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-07-09/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-07-23/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-08-13/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-08-27/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-09-10/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-09-24/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-10-08/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-10-22/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-11-12/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-11-26/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2023-12-10/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2021-12-23/` | `/events` | Permanent (301) | Archive |
| `/event/ffr-board-meeting/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-02-26/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-03-26/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-04-23/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-05-28/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-06-25/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-07-23/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-08-27/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-09-24/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-10-22/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-11-26/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2022-12-24/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2023-01-28/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2-2022-02-08/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-2-2022-03-08/` | `/events` | Permanent (301) | Archive |
| `/event/family-fun-day-2/` | `/events` | Permanent (301) | Archive |
| `/event/hospitality-team-training/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry/` | `/events` | Permanent (301) | Archive |
| `/event/communion-sunday-2/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-4/` | `/events` | Permanent (301) | Archive |
| `/event/christmas-party-2/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-christmas-party/` | `/events` | Permanent (301) | Archive |
| `/event/online-bible-study/` | `/events` | Permanent (301) | Archive |
| `/event/corporate-prayer-2/` | `/events` | Permanent (301) | Archive |
| `/event/corporate-prayer/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting-3/` | `/events` | Permanent (301) | Archive |
| `/event/mens-meeting/` | `/events` | Permanent (301) | Archive |
| `/event/sunday-service/` | `/events` | Permanent (301) | Archive |
| `/event/sunday-service-2/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-2/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-6/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-5/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-7/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-3/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-9/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-midnight-madness-lock-in-2/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2-2/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-3/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-3/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-5/` | `/events` | Permanent (301) | Archive |
| `/event/womens-pizza-pasta-night/` | `/events` | Permanent (301) | Archive |
| `/event/mens-breakfast/` | `/events` | Permanent (301) | Archive |
| `/event/womens-game-night/` | `/events` | Permanent (301) | Archive |
| `/event/crossfit-youth-ministry-8/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-2/` | `/events` | Permanent (301) | Archive |
| `/event/womens-ministry-4/` | `/events` | Permanent (301) | Archive |
| `/event/next-steps-classes-2/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-practice/` | `/events` | Permanent (301) | Archive |
| `/event/worship-team-auditions/` | `/events` | Permanent (301) | Archive |
| `/event/church-family-picnic/` | `/events` | Permanent (301) | Archive |
| `/event/good-friday-service/` | `/events` | Permanent (301) | Archive |
| `/event/mens-wing-night/` | `/events` | Permanent (301) | Archive |
| `/event/resurrection-sunday/` | `/events` | Permanent (301) | Archive |
| `/event/sunday-service-2-3/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-4-2/` | `/events` | Permanent (301) | Archive |
| `/event/young-adults-meeting-4/` | `/events` | Permanent (301) | Archive |
| `/event/1000am-sunday-service/` | `/events` | Permanent (301) | Archive |
| `/event/sunday-service-2-2/` | `/events` | Permanent (301) | Archive |
| `/event/sunday-service-8am/` | `/events` | Permanent (301) | Archive |
| `/event/sunday-service-1115am/` | `/events` | Permanent (301) | Archive |
| `/event/sunday-service-930am/` | `/events` | Permanent (301) | Archive |
| `/category/bible-study/` | `/messages` | Permanent (301) | Archive / Merge |
| `/category/thoughts/` | `/messages` | Permanent (301) | Archive / Merge |
| `/tag/church-in-clermont-florida/` | `/messages` | Permanent (301) | Archive / Merge |
| `/tag/clermont-fl/` | `/messages` | Permanent (301) | Archive / Merge |
| `/tag/home-group/` | `/messages` | Permanent (301) | Archive / Merge |
| `/tag/living-message-church/` | `/messages` | Permanent (301) | Archive / Merge |
| `/tag/men-ministry/` | `/messages` | Permanent (301) | Archive / Merge |
| `/tag/mens-ministry/` | `/messages` | Permanent (301) | Archive / Merge |
| `/tag/mens-breakfast/` | `/messages` | Permanent (301) | Archive / Merge |
| `/events/category/family-fun/` | `/events` | Permanent (301) | Archive |
| `/author/living/` | `/messages` | Permanent (301) | Archive / Merge |
