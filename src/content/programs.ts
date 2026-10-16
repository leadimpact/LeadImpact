import type { CollegeSlug } from "./colleges";

export type LevelId = "certificate" | "diploma" | "associate" | "bachelor" | "master" | "doctorate";

export interface Level {
  id: LevelId;
  label: string;
  short: string;
  /** From the current LIU site (Theology program page). */
  duration: string;
  /** Course and credit counts from the S13 design. */
  courses?: number;
  credits?: number;
}

export const LEVELS: Record<LevelId, Level> = {
  certificate: { id: "certificate", label: "Certificate", short: "Certificate", duration: "1 year", courses: 4 },
  diploma: { id: "diploma", label: "Diploma", short: "Diploma", duration: "2 years", courses: 10 },
  associate: { id: "associate", label: "Associate degree", short: "Associate", duration: "3 years" },
  bachelor: { id: "bachelor", label: "Bachelor’s degree", short: "Bachelor’s", duration: "4 years", courses: 40, credits: 120 },
  master: { id: "master", label: "Master’s degree", short: "Master’s", duration: "2 years after a degree", courses: 12, credits: 36 },
  doctorate: { id: "doctorate", label: "Doctorate", short: "Doctorate", duration: "3 years after a Master’s" },
};

export const LEVEL_ORDER: LevelId[] = ["certificate", "diploma", "associate", "bachelor", "master", "doctorate"];

export type ProgramIcon =
  | "book"
  | "scroll"
  | "star"
  | "heart"
  | "shield"
  | "cap"
  | "sun"
  | "users"
  | "briefcase"
  | "church"
  | "globe"
  | "music";

export interface Program {
  slug: string;
  name: string;
  college: CollegeSlug;
  icon: ProgramIcon;
  /** One line for cards, search and the hero. */
  summary: string;
  /** Short line for the mobile hero (SM3). */
  tagline: string;
  /** Overview heading. */
  headline: string;
  /** Program description — migrated from the current LIU website. */
  about: string[];
  levels: LevelId[];
  /** Curriculum, where published. Others show "course list to be published". */
  courses?: { title: string; credits: number }[];
  /** Faculty slugs (src/content/faculty.ts). */
  faculty: string[];
  /** Sample career paths — to be confirmed by LIU. */
  careers: string[];
  imageLabel: string;
  /** True where the description is a placeholder rather than LIU's own copy. */
  aboutIsPlaceholder?: boolean;
}

const STANDARD_LEVELS: LevelId[] = ["certificate", "diploma", "bachelor", "master"];

/** The 12 programs on the current LIU site and in the S12 design. */
export const PROGRAMS: Program[] = [
  {
    slug: "theology",
    name: "Theology",
    college: "theology",
    icon: "book",
    summary:
      "Theology proper — the study of God — and its branches: biblical, systematic, historical and applied theology. Prepare to teach God’s Word faithfully.",
    tagline: "Know God deeply and teach His Word faithfully.",
    headline: "Know God. Teach His Word.",
    about: [
      "Theology students explore who God is and how He has revealed Himself, then learn to apply sound doctrine in preaching, teaching and pastoral care. Courses are taught by experienced theologians and pastors from LIU’s College of Theology & Biblical Studies.",
      "Theology takes the Bible as its book of authority. It addresses major themes of the Bible and provides answers to complex issues and difficult questions, with the Bible as the final court of appeal. It develops the pastor’s horizon in teaching and preaching, and equips the minister to defend the Christian faith.",
    ],
    levels: LEVEL_ORDER,
    courses: [
      { title: "Introduction to Theology", credits: 3 },
      { title: "Biblical Theology", credits: 3 },
      { title: "Systematic Theology I", credits: 3 },
      { title: "Systematic Theology II", credits: 3 },
      { title: "Church History", credits: 3 },
      { title: "Hermeneutics", credits: 3 },
      { title: "Applied Theology", credits: 3 },
      { title: "Theology of Leadership", credits: 3 },
    ],
    faculty: ["edem-ndem", "adejumoke-elisha"],
    careers: ["Pastor or associate pastor", "Bible teacher or lecturer", "Church planter", "Christian writer"],
    imageLabel: "Theology class",
  },
  {
    slug: "biblical-studies",
    name: "Biblical Studies",
    college: "theology",
    icon: "scroll",
    summary: "Gain a sound knowledge of the fundamental teachings of the Bible — its history, interpretation and message.",
    tagline: "Read, interpret and teach the Bible with accuracy.",
    headline: "Know the Book. Handle it rightly.",
    about: [
      "Biblical Studies is the branch of Religious Studies that equips Bible students with adequate knowledge of the fundamental teachings of the Bible, including Christian beliefs and practices. It looks at accuracy in Bible interpretation — from its isagogics and the text to the content — through the study of hermeneutics.",
      "It equips students with the historical context of the Bible, showing that the Bible is more than ordinary literature, and gives major attention to the historical Jesus and His work of redemption.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["edem-ndem", "adejumoke-elisha"],
    careers: ["Bible teacher", "Sunday school coordinator", "Christian education leader", "Further study in theology"],
    imageLabel: "Biblical Studies",
  },
  {
    slug: "prophetic-ministry",
    name: "Prophetic Ministry",
    college: "theology",
    icon: "star",
    summary:
      "One of the oldest ministries, running from Abraham in the Old Testament through the New Testament — studied biblically and practised responsibly.",
    tagline: "Understand and steward the prophetic ministry biblically.",
    headline: "A biblical foundation for prophetic ministry.",
    about: [
      "One of the oldest and most renowned ministries in the ancient days, cutting across the Old Testament — starting from Abraham — to the New Testament, is Prophetic Ministry. This program grounds students in its biblical history, purpose and responsible practice in the church today.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["edem-ndem", "adejumoke-elisha"],
    careers: ["Prophetic ministry within a local church", "Prayer and intercession leader", "Pastoral team member"],
    imageLabel: "Prophetic Ministry",
  },
  {
    slug: "christian-counseling",
    name: "Christian Counseling",
    college: "counseling",
    icon: "heart",
    summary:
      "Learn to professionally combine psychology and biblical principles to help people through crisis, marriage and family life.",
    tagline: "Help people through life’s challenges with biblical wisdom.",
    headline: "Biblical wisdom for real-life care.",
    about: [
      "Christian counseling is a professional course that equips students to incorporate psychology and biblical principles into the management of life issues, without the counselor taking the place or decision-making prerogative of the counselee. It is also called pastoral counseling, because people’s needs are often spiritual — for security, safety, advice from the Word of God, or prayer.",
      "A good Christian counselor can analyse the problem, synthesise it and move towards possible solutions, always aiming to resolve harmful conflict and bring instruction from the Word of God. Whether crisis counseling, marriage counseling or family life, LIU provides thorough teaching.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["paul-manner", "sylvanus-jackson"],
    careers: ["Pastoral counselor", "Marriage and family counselor", "Church care-team leader", "Crisis support volunteer"],
    imageLabel: "Christian Counseling",
  },
  {
    slug: "chaplaincy",
    name: "Chaplaincy",
    college: "counseling",
    icon: "shield",
    summary:
      "Provide spiritual and emotional care in hospitals, prisons, schools, the military and community settings.",
    tagline: "Offer compassionate spiritual care wherever people are.",
    headline: "Care that goes where people are.",
    about: [
      "The Chaplaincy program equips aspiring and active chaplains with the skills, knowledge and spiritual insight to offer compassionate, ethical and effective care in diverse settings — hospitals, military units, correctional facilities, schools and community organisations.",
      "Participants explore pastoral presence, crisis response, interfaith sensitivity, ethical boundaries and grief counseling, using real-world case studies, role-play and weekly reflective practice. Graduates can respond to trauma, grief and moral injury with compassion and wisdom, and practise self-care and spiritual resilience as caregivers.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["paul-manner", "sylvanus-jackson"],
    careers: ["Hospital chaplain", "Prison chaplain", "School or campus chaplain", "Military or police chaplain"],
    imageLabel: "Chaplaincy",
  },
  {
    slug: "christian-education",
    name: "Christian Education",
    college: "education",
    icon: "cap",
    summary: "Plan and lead teaching ministries that help every age group grow in faith. [Description to be supplied by LIU.]",
    tagline: "Teach and disciple every generation.",
    headline: "Teaching that forms disciples.",
    about: ["[Program description to be supplied — the current LIU website has no Christian Education page.]"],
    aboutIsPlaceholder: true,
    levels: STANDARD_LEVELS,
    faculty: ["blessing-bassey", "kathy-archibong"],
    careers: ["Christian education director", "Sunday school superintendent", "Christian school teacher"],
    imageLabel: "Christian Education",
  },
  {
    slug: "youth-ministry",
    name: "Youth Ministry",
    college: "education",
    icon: "sun",
    summary: "Groom and build up young people for active service in God’s vineyard — music, drama, media, evangelism and teaching.",
    tagline: "Raise the next generation of leaders.",
    headline: "Catch them young. Build them up.",
    about: [
      "Youths are the hope of tomorrow and the strength of any nation — and there is a vital place for them in the church and in the kingdom of God. If young people are not carried along in the church, the street becomes their home; if we fail to teach them, God’s children will perish.",
      "LIU designs programs that groom and build up youth for active participation in God’s vineyard, including voice training, drama and dance ministry, musical instruments, video camera skills, evangelism among youths and Sunday school teaching.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["blessing-bassey", "kathy-archibong"],
    careers: ["Youth pastor", "Youth and campus ministry leader", "Children’s ministry coordinator"],
    imageLabel: "Youth Ministry",
  },
  {
    slug: "christian-leadership",
    name: "Christian Leadership",
    college: "leadership",
    icon: "users",
    summary: "Lead after the pattern of Jesus Christ — for human development, welfare and the advancement of the Kingdom of God.",
    tagline: "Lead like Jesus — in church, work and community.",
    headline: "Leadership after the pattern of Christ.",
    about: [
      "Christian leadership follows the pattern of Jesus Christ. Where the leaders of Old Testament Israel — patriarchs, prophets, priests, kings and judges — operated under the law, the Church operates under grace, with apostles, prophets, evangelists, pastors and teachers, elders and deacons.",
      "Christian leadership concerns itself with human development, welfare and the advancement of the Kingdom of God, drawing lessons from the ethics and moral conduct of Israel for the successful administration of the present-day church.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["cletus-bassey", "kathy-archibong"],
    careers: ["Church administrator", "Ministry or NGO leader", "Team leader in the workplace", "Community leader"],
    imageLabel: "Christian Leadership",
  },
  {
    slug: "christian-entrepreneurship",
    name: "Christian Entrepreneurship",
    college: "leadership",
    icon: "briefcase",
    summary: "Run a business as a calling — integrating faith with leadership, finance, marketing and business ethics.",
    tagline: "Build a business that serves the Kingdom.",
    headline: "Business as a calling.",
    about: [
      "Entrepreneurship is a calling, and the Christian entrepreneur represents Christ in the marketplace. A person’s faith can encourage ethical decision-making, philanthropy and a sense of purpose — and influence leadership strategy, organisational change, economics, finance, marketing and business ethics.",
      "Students learn to integrate their Christian life into business, see their business as a calling, and use it to make disciples as part of the Kingdom’s expansion.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["cletus-bassey", "kathy-archibong"],
    careers: ["Business owner", "Social entrepreneur", "Church business and finance lead", "Marketplace minister"],
    imageLabel: "Christian Entrepreneurship",
  },
  {
    slug: "ministry",
    name: "Ministry",
    college: "ministry",
    icon: "church",
    summary: "Discover, sharpen and prepare for your calling — as apostle, prophet, evangelist, pastor or teacher.",
    tagline: "Discover your calling and get equipped to serve.",
    headline: "Sharpen the calling God has placed in you.",
    about: [
      "What makes a minister of the Gospel is the ministry placed in them by the Holy Spirit, which often comes before theological training. The Bible college doesn’t give the calling, but it sharpens, moulds and equips — helping students discover whether they are called as prophet, teacher, apostle, evangelist or pastor.",
      "Ministry is also what the church is and how it operates: its role towards the faithful and the world, what it is doing now and where it is leading people. Many relevant subjects are taught to equip students for service.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["paul-ojo", "xavier-john"],
    careers: ["Pastor", "Evangelist", "Associate minister", "Ministry founder"],
    imageLabel: "Ministry",
  },
  {
    slug: "missions-evangelism",
    name: "Missions & Evangelism",
    college: "ministry",
    icon: "globe",
    summary: "Take up the Great Commission — reaching people with the Gospel and understanding their culture and language.",
    tagline: "Go into all nations — prepared.",
    headline: "The Great Commission, taken seriously.",
    about: [
      "Many today treat the Great Commission (Matthew 28:19) lightly, thinking of it only as social work. Missions remains a witness to eternal salvation through the preaching of the Gospel in the name of Jesus Christ.",
      "Missions and evangelism both aim at winning souls, but missions goes further — into knowing the people, their culture and their language, and building relationships. The college’s curriculum places strong emphasis on the Great Commission, for the Church exists for missions and evangelism.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["paul-ojo", "xavier-john"],
    careers: ["Missionary", "Evangelist", "Church planter", "Missions coordinator"],
    imageLabel: "Missions & Evangelism",
  },
  {
    slug: "worship-ministry",
    name: "Worship Ministry",
    college: "ministry",
    icon: "music",
    summary: "Worship beyond motivational music — into service and lifestyle, with training in voice, instruments and sound.",
    tagline: "Lead worship that glorifies God.",
    headline: "Worship as service and lifestyle.",
    about: [
      "From Noah to Abraham to David, worship has a long history in Scripture. Worship goes beyond motivational music into service and lifestyle — the Hebrew and Greek words mean both service rendered to God and bowing down in honour.",
      "Worship departments must be equipped: vocalists and instrumentalists need training so their music glorifies God. Training includes notation, guitar and keyboard technique, ear training, drumming and sound control.",
    ],
    levels: STANDARD_LEVELS,
    faculty: ["paul-ojo", "xavier-john"],
    careers: ["Worship leader", "Music director", "Choir director", "Sound and media team lead"],
    imageLabel: "Worship Ministry",
  },
];

export const programHref = (p: Program) => `/programs/${p.slug}`;

export const findProgram = (slug: string) => PROGRAMS.find((p) => p.slug === slug);

/** Intake start months (S13). */
export const INTAKES = "Jan · May · Sep starts";
