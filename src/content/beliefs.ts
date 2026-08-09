import type { ContentImage, SeoContent, VerificationStatus } from "@/types/content";

interface BeliefStatement {
  id: string;
  title: string;
  paragraphs: string[];
}

const source = "https://www.livingmessagechurch.com/our-beliefs/";

export const beliefsContent = {
  seo: {
    title: "Our Beliefs | Living Message Church",
    description:
      "Read Living Message Church’s beliefs about Scripture, the Trinity, humanity, salvation, assurance, and the church.",
    path: "/about/beliefs",
  } satisfies SeoContent,
  source,
  sourceModified: "2026-01-06",
  status: "approved-temporary" as VerificationStatus,
  hero: {
    eyebrow: "What shapes us",
    title: "Our beliefs.",
    body: "The foundation of our relationship with Christ is reading, interpreting, and applying sound doctrine from the Word of God.",
    image: {
      src: "/images/hero/living-message-beliefs-word-hero.jpg",
      alt: "An open Bible illuminated by warm light against a deep blue and indigo background.",
      status: "approved-temporary",
      credit: "Original AI-assisted artwork created for Living Message Church",
    } satisfies ContentImage,
  },
  introduction: {
    eyebrow: "Why beliefs matter",
    title: "A secure foundation for life together.",
    titleAccent: "foundation",
    paragraphs: [
      "No matter how strong a building is, it will crumble under pressure if its foundation is not secure. Ephesians 4:14 calls believers to maturity so they are not carried by every changing teaching.",
      "The church is to be a place of fellowship: devoted to one another, honoring one another, offering instruction, showing kindness and compassion, giving encouragement, and above all, loving one another.",
      "Living Message also describes the church as a place for the Lord’s Supper, shared life, and prayer—a community that remembers Christ, breaks bread together, teaches prayer, and practices prayer.",
    ],
    references: "Ephesians 4:14; Romans 12:10; Romans 15:14; Ephesians 4:32; 1 Thessalonians 5:11; 1 John 3:11; 1 Corinthians 11:23–26; Acts 2:42; Philippians 4:6–7",
    confession:
      "As a body, we hold closely to the 1689 Baptist Confession of Faith and the 1853 New Hampshire Confession. These confessions are not infallible; they condense biblical truths with Scripture as the source of foundational doctrine.",
  },
  statements: [
    {
      id: "scriptures",
      title: "The Holy Scriptures",
      paragraphs: [
        "We believe that God has spoken in the sixty-six books of the Bible, both Old and New Testaments, through the words of human authors. As the verbally inspired Word of God, the Bible is without error in the original writings, the complete revelation of His will for salvation, and the ultimate authority by which every realm of human knowledge and endeavor should be judged. (1 John 5:9; 1 Thessalonians 2:13; Galatians 1:11–12)",
        "We believe that although God may give individual believers guidance in various ways, we reject teaching that implies individuals can receive genuine “words from God” that do not line up with Scripture. Therefore, the Bible alone is to be believed in all that it teaches, obeyed in all that it requires, and trusted in all that it promises. (Psalm 19:7–11; Matthew 5:18; 2 Timothy 3:16–17; 2 Peter 1:20–21)",
      ],
    },
    {
      id: "trinity",
      title: "The Trinity",
      paragraphs: [
        "We believe in one God, who directly and immediately created all things, and who is holy and infinitely perfect; in whom all things have their source, support, and end. He exists eternally in a loving tri-unity of three equally divine Persons: Father, Son, and Holy Spirit, each with distinct personal attributes, but without division of nature, essence, or being. (Deuteronomy 6:4; Matthew 28:18–20; Acts 5:3–4; Hebrews 1:1–3, 8)",
        "Having limitless knowledge and sovereign power, God has graciously purposed from eternity past to redeem a people for Himself and to make all things new for His own glory. Since He is not limited in knowledge or power by external forces or the will of His creatures, what He purposes will come to pass. To Him we owe the highest love, reverence, and obedience. (Genesis 1:1; Deuteronomy 32:3–4; John 17:3; Acts 17:28; Ephesians 1:3–5; 3:7–13; Revelation 4:11)",
      ],
    },
    {
      id: "human-condition",
      title: "The Human Condition",
      paragraphs: [
        "We believe that God created Adam and Eve in His image as male and female, and that the gift of two different yet complementary sexes reflects the goodness of God’s creation. Because Adam and Eve voluntarily rebelled, their descendants are born under the condemnation of sin and inherit a sin nature. Sin has affected the whole of our being, leaving us morally and spiritually “dead in [our] trespasses and sins.” Only through God’s saving work in Jesus Christ can we be rescued, renewed, and reconciled to God. (Romans 5:12; Ephesians 2:1–3)",
        "Since humanity is the crowning work of God’s creation, each human being is created in His image, is sacred, and is worthy of respect and Christian love. This respect must be accorded to all human life from the moment of conception until natural death. (Psalm 139:13–16; Revelation 5:9–10)",
      ],
    },
    {
      id: "salvation",
      title: "Salvation",
      paragraphs: [
        "We believe that salvation involves the redemption of the entire person—body, soul, and spirit—and is offered freely to all who, having been called by God, receive the Lord Jesus Christ as Savior.",
        "Those whom God has predestined to life, He is pleased in His appointed and accepted time effectually to call by His Word and Spirit out of the state of sin and death in which they are by nature, to grace and salvation by Jesus Christ. He enlightens their minds to understand the things of God, takes away the heart of stone and gives a heart of flesh, renews their wills, and draws them to Jesus Christ so that they come most freely, made willing by His grace. (Romans 8:30; Romans 11:7; Ephesians 1:10–11, 17–19; 2:1–6; 2 Thessalonians 2:13–14; Acts 26:18; Ezekiel 36:26–27; Deuteronomy 30:6; Psalm 110:3; Song of Solomon 1:4)",
        "This effectual call is of God’s free and special grace alone, not from anything foreseen in humanity or from any power in the creature. Those dead in sins and trespasses are quickened and renewed by the Holy Spirit, enabled to answer this call, and to embrace the grace offered and conveyed in it by the power that raised Christ from the dead. (2 Timothy 1:9; Ephesians 2:5, 8; 1 Corinthians 2:14; John 5:25; Ephesians 1:19–20)",
        "We believe this salvation is a gift of God’s grace, appropriated through faith alone in the Lord Jesus Christ. This faith is a gift of divine grace and is not simply knowledge of Jesus Christ, but an act of personal trust accompanied by regeneration and justification, leading to sanctification and glorification.",
      ],
    },
    {
      id: "assurance",
      title: "Assurance of Salvation",
      paragraphs: [
        "Although temporary church attenders and other unregenerate people may deceive themselves with false hopes of being in the favor of God and in a state of salvation, those who truly believe in the Lord Jesus, love Him sincerely, and endeavor to walk in good conscience before Him may in this life be assured that they are in a state of grace and may rejoice in the hope of the glory of God. (Job 8:13–14; Matthew 7:22–23; 1 John 2:3; 3:14, 18–19, 21, 24; 5:13; Romans 5:2, 5)",
        "This certainty is not a conjecture grounded on a fallible hope, but an assurance of faith founded on the blood and righteousness of Christ revealed in the Gospel, the inward evidence of the Spirit’s graces, and the testimony of the Spirit of adoption witnessing with our spirits that we are the children of God. As its fruit, this assurance keeps the heart humble and holy. (Hebrews 6:11, 17–19; 2 Peter 1:4–5, 10–11; Romans 8:15–16; 1 John 3:1–3)",
      ],
    },
    {
      id: "church",
      title: "The Church",
      paragraphs: [
        "Many people understand the church as a building, but the word church comes from the Greek word ekklesia, meaning “an assembly” or “called-out ones.” The root meaning of church is not a building, but a people. Romans 16:5 refers to the church in a house—not a church building, but a body of believers.",
        "The church is the body of Christ, of which He is the head. The body of Christ is made up of all believers in Jesus Christ from the day of Pentecost until Christ’s return. (Ephesians 1:22–23; Acts 2)",
        "The universal church consists of all who have a personal relationship with Jesus Christ and have received salvation through faith in Him. (1 Corinthians 12:13)",
        "The local church is a local body of believers. Members of the universal church should seek fellowship and edification in a local church. (Galatians 1:1–2)",
        "The church is a family. God created us, and when sin separated us from Him, He sent His Son Jesus to redeem us. Through redemption, He gave us the right to become children of God; through His acceptance, we are adopted into His family and He becomes our Father. (Genesis 2:7–23; 3:22–24; John 3:16; 1:12; Galatians 3:26; Romans 8:14–16)",
        "In summary, the church is not a building or a denomination. According to the Bible, the church is the body of Christ—all who have placed their faith in Jesus Christ for salvation. Local churches are gatherings where believers apply the body principles of encouraging, teaching, and building one another up in the knowledge and grace of the Lord Jesus Christ. (John 3:16; 1 Corinthians 12–13)",
      ],
    },
  ] satisfies BeliefStatement[],
};
