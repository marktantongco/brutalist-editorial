/* ═══════════════════════════════════════════════════
   LIVING WORD SEMINAR — CONTENT DATA LAYER
   Source: Living_Word_Seminar_Framework.docx
   ═══════════════════════════════════════════════════ */

export const SEMINAR_META = {
  title: 'The Living Word',
  subtitle: 'A Transformative Bible Study Seminar',
  tagline: 'Knowing God Through Scripture',
  duration: '12 Weeks',
  format: '90-min sessions + small groups',
  method: 'SOAP Inductive Method',
  language: 'Filipino-English / Taglish',
  groupSize: '3-4 per breakout',
  date: 'April 2026',
};

export const HERO_STATS = [
  { value: 12, suffix: '', label: 'Weeks' },
  { value: 4, suffix: '', label: 'Phases' },
  { value: 90, suffix: 'min', label: 'Per Session' },
  { value: 4, suffix: '', label: 'Pillars' },
  { value: 12, suffix: '', label: 'Scriptures' },
];

export const MARQUEE_ITEMS = [
  'THE LIVING WORD',
  'SOAP METHOD',
  'INDUCTIVE STUDY',
  '4 PILLARS',
  '12 WEEKS',
  'FILIPINO CHURCH',
  'DISCIPLESHIP',
  'TRANSFORMATION',
  'SCRIPTURE',
  'ENCOUNTER',
  'EXEGESIS',
  'EXAMINATION',
  'EXPRESSION',
];

export const FOUR_PILLARS = [
  {
    number: 'I',
    title: 'Encounter',
    duration: '20 minutes',
    subtitle: 'Opening Movement',
    color: '#FFEA00',
    description:
      'Genuine Bible study begins with an orientation of the heart toward God. Before any intellectual engagement with the text, participants are invited into the presence of God through worship, prayer, and testimony. This deliberate theological act acknowledges that the Holy Spirit is the primary teacher and illuminator of Scripture.',
    points: [
      { label: 'Worship Integration', text: 'Scripture-based songs aligned with the weekly theme prepare hearts for engagement' },
      { label: 'Prayer of Illumination', text: 'Deliberate invocation inviting the Holy Spirit to open hearts and minds (Psalm 119:18)' },
      { label: 'Testimony Circle', text: 'Brief sharing of how God\'s Word has shaped lives since the last session' },
      { label: 'Memory Verse Recitation', text: 'Building cumulative biblical literacy through weekly verse memorization' },
    ],
  },
  {
    number: 'II',
    title: 'Exegesis',
    duration: '35 minutes',
    subtitle: 'Deep Dive',
    color: '#CC0000',
    description:
      'The intellectual center of the session where participants engage directly with the biblical text using the inductive SOAP method. This pillar prioritizes the authority of Scripture over human opinion, training participants to observe what the text actually says before rushing to application.',
    points: [
      { label: 'Contextual Immersion', text: 'Historical, cultural, and literary setting anchored for faithful interpretation' },
      { label: 'Textual Observation', text: 'Answering "What does the text say?" through careful reading in multiple translations' },
      { label: 'Interpretive Framework', text: 'Guided discovery of the author\'s intended meaning for the original audience' },
      { label: 'Cross-Reference Weaving', text: 'Scripture interprets Scripture — exploring related passages for interconnected theology' },
    ],
  },
  {
    number: 'III',
    title: 'Examination',
    duration: '20 minutes',
    subtitle: 'Personal Application',
    color: '#0A0A0A',
    description:
      'Moving from mind to heart, creating space for the Holy Spirit to apply truth to each participant\'s unique life circumstances. The SOAP method\'s Application and Prayer steps come alive in small groups of 3-4, providing the intimacy necessary for honest self-examination and accountability.',
    points: [
      { label: 'Heart Check', text: '"Where does this confront my current reality?" — God\'s Word as a mirror (James 1:23-25)' },
      { label: 'Obedience Step', text: 'Each participant formulates a specific, measurable response to the text' },
      { label: 'Accountability Pairing', text: 'Sharing obedience commitments with a partner for relational follow-through' },
      { label: 'Prayer of Consecration', text: 'Personal and corporate prayer inviting God\'s enabling grace' },
    ],
  },
  {
    number: 'IV',
    title: 'Expression',
    duration: '15 minutes',
    subtitle: 'Commissioning',
    color: '#FFEA00',
    description:
      'Sending participants out with purpose, connecting the inward work to outward kingdom impact. Bible study does not become an end in itself but a catalyst for mission and service. This commissioning is the natural overflow of transformed hearts.',
    points: [
      { label: 'Missional Application', text: 'How truth shapes witness in families, workplaces, and communities' },
      { label: 'Community Challenge', text: 'Collective action or outreach initiative emerging from session themes' },
      { label: 'Benediction', text: 'Sending blessing affirming God\'s presence and purpose in the days ahead' },
    ],
  },
];

export const PHASES = [
  {
    name: 'Foundation',
    weeks: '1-3',
    focus: 'Knowing the God of the Word',
    color: '#FFEA00',
    description: 'Establishing the essential framework for knowing God — who He is in His essential nature and how He has revealed Himself through Scripture.',
  },
  {
    name: 'Formation',
    weeks: '4-6',
    focus: 'Being Transformed by the Word',
    color: '#CC0000',
    description: 'Shifting focus to how the knowledge of God transforms the believer\'s identity and daily walk.',
  },
  {
    name: 'Function',
    weeks: '7-9',
    focus: 'Doing the Work of the Word',
    color: '#0A0A0A',
    description: 'Moving from personal transformation to active ministry, exploring how knowing God compels service.',
  },
  {
    name: 'Fruit',
    weeks: '10-12',
    focus: 'Multiplying Through the Word',
    color: '#888888',
    description: 'Equipping participants to reproduce what they have learned, embodying the multiplication mandate of the Great Commission.',
  },
];

export const WEEKLY_JOURNEY = [
  { week: 1, theme: 'God is Spirit', scripture: 'John 4:21-24', phase: 'Foundation', focus: 'Worship in spirit and truth — understanding authentic worship beyond physical locations and rituals', color: '#FFEA00' },
  { week: 2, theme: 'God is Person', scripture: 'Genesis 1:26-27', phase: 'Foundation', focus: 'Created in God\'s image — the profound implications of bearing the divine likeness in our identity and relationships', color: '#FFEA00' },
  { week: 3, theme: 'God as Creator', scripture: 'Colossians 1:15-20', phase: 'Foundation', focus: 'First over all creation — Christ\'s supremacy as the agent and sustainer of all that exists', color: '#FFEA00' },
  { week: 4, theme: 'God\'s Name: I AM', scripture: 'Exodus 3:13-15', phase: 'Formation', focus: 'The Great I AM — encountering God\'s self-revelation to Moses and its significance for understanding His eternal nature', color: '#CC0000' },
  { week: 5, theme: 'God is One', scripture: 'Deuteronomy 5:6-7', phase: 'Formation', focus: 'No other gods — examining exclusive devotion to the one true God in a pluralistic culture', color: '#CC0000' },
  { week: 6, theme: 'Jesus: The Living Word', scripture: 'John 1:1-18', phase: 'Formation', focus: 'The Word became flesh — the incarnation as the ultimate revelation of God\'s character and redemptive purpose', color: '#CC0000' },
  { week: 7, theme: 'The Forgiving Father', scripture: 'Luke 15:11-32', phase: 'Function', focus: 'Parable of the Prodigal Son — experiencing God\'s radical grace and the call to extend that grace to others', color: '#0A0A0A' },
  { week: 8, theme: 'Jesus\' First Miracle', scripture: 'John 2:1-12', phase: 'Function', focus: 'Wedding at Cana — discovering how Jesus\' compassion meets human need and reveals His glory', color: '#0A0A0A' },
  { week: 9, theme: 'Community of Believers', scripture: 'Acts 2:42-47', phase: 'Function', focus: 'Breaking bread together — the early church as a model for authentic Christian fellowship and shared life', color: '#0A0A0A' },
  { week: 10, theme: 'God is Eternal', scripture: 'Psalm 90:2, Acts 17:25', phase: 'Fruit', focus: 'Without beginning or end — resting in God\'s transcendent existence and sovereign sustenance of all life', color: '#888888' },
  { week: 11, theme: 'God is Omniscient & Omnipotent', scripture: 'Psalm 139, Job 42', phase: 'Fruit', focus: 'All-knowing, all-powerful — finding comfort in God\'s complete knowledge and unlimited power', color: '#888888' },
  { week: 12, theme: 'God is Omnipresent', scripture: 'Jeremiah 23:23-24', phase: 'Fruit', focus: 'Always with us — living with the awareness of God\'s constant presence in every circumstance', color: '#888888' },
];

export const SESSION_STRUCTURE = [
  {
    pillar: 'ENCOUNTER',
    time: '20 min',
    color: '#FFEA00',
    steps: [
      { title: 'Welcome & Worship', desc: '2-3 songs reflecting the weekly theme' },
      { title: 'Prayer of Preparation', desc: 'Invite the Holy Spirit\'s illumination' },
      { title: 'Testimony Spotlight', desc: 'One participant shares (5 min)' },
      { title: 'Obedience Review', desc: 'Check-in on accountability commitments' },
    ],
  },
  {
    pillar: 'EXEGESIS',
    time: '35 min',
    color: '#CC0000',
    steps: [
      { title: 'Read Aloud', desc: 'Multiple translations (NIV, ESV, Tagalog)' },
      { title: 'Observation', desc: 'What do you see? Repeated words, contrasts, promises' },
      { title: 'Interpretation', desc: 'What does it mean? Author\'s intended meaning' },
      { title: 'Cross-Reference', desc: 'Trace related passages' },
    ],
  },
  {
    pillar: 'EXAMINATION',
    time: '20 min',
    color: '#0A0A0A',
    steps: [
      { title: 'Personal Reflection', desc: 'Silent journaling time (3-5 min)' },
      { title: 'Breakout Dialogue', desc: 'Groups of 3-4 share reflections' },
      { title: 'Application Commitment', desc: 'Write one specific obedience step' },
      { title: 'Prayer Partnership', desc: 'Share step with accountability partner' },
    ],
  },
  {
    pillar: 'EXPRESSION',
    time: '15 min',
    color: '#FFEA00',
    steps: [
      { title: 'Community Application', desc: 'How can we live this out together?' },
      { title: 'Outreach Connection', desc: 'Connect truth to witness opportunities' },
      { title: 'Closing Benediction', desc: 'Send out with God\'s blessing' },
    ],
  },
];

export const METHODOLOGY = [
  {
    number: '01',
    title: 'Spirit-Dependence',
    verse: '1 Corinthians 2:14',
    description: 'Every session explicitly invites the Holy Spirit\'s illumination through prayer, deliberately avoiding purely academic study that relies on human intellect alone. The Bible is a spiritual book requiring spiritual discernment.',
  },
  {
    number: '02',
    title: 'Text-Centered Authority',
    verse: '2 Timothy 3:16',
    description: 'Scripture remains the authoritative voice of God in every session. Commentary and cultural insight serve the text rather than substituting for it. Participants ask "What does the text say?" before consulting secondary sources.',
  },
  {
    number: '03',
    title: 'SOAP Inductive Method',
    verse: 'Psalm 119:18',
    description: 'Scripture, Observation, Application, Prayer — a systematic yet accessible framework for personal Bible engagement. Its power lies in simplicity and comprehensiveness, beginning with the text and returning to God in dependence.',
  },
  {
    number: '04',
    title: 'Whole-Life Integration',
    verse: 'James 1:22',
    description: 'Aligning Head (knowledge), Heart (affection), and Hands (obedient action) ensures holistic discipleship. The 4-Pillar Architecture engages all three dimensions, guarding against purely informational, emotional, or activism-driven study.',
  },
  {
    number: '05',
    title: 'Communal Discernment',
    verse: 'Acts 2:42',
    description: 'Learning in small group dialogue rather than monologue. Participants observe, question, and discover truth together, reflecting the New Testament pattern where every voice matters. Filipino "bayanihan" culture amplifies this value.',
  },
  {
    number: '06',
    title: 'Multiplication-Minded',
    verse: '2 Timothy 2:2',
    description: 'Every participant is equipped to lead others in the same SOAP pattern. By Week 12, at least 30% should have facilitated a session, with pathways to launch new study groups — creating catalytic movement for church-wide disciple-making.',
  },
];

export const SUCCESS_METRICS = [
  { label: 'Attendance Retention', value: 90, suffix: '%', timeframe: '6 Weeks', color: '#FFEA00' },
  { label: 'Active Participation', value: 80, suffix: '%', timeframe: 'Per Session', color: '#CC0000' },
  { label: 'SOAP Journal Completion', value: 100, suffix: '%', timeframe: 'Weekly', color: '#0A0A0A' },
  { label: 'Verses Memorized', value: 12, suffix: '', timeframe: 'By Week 12', color: '#FFEA00' },
  { label: 'New Groups Launched', value: 2, suffix: '+', timeframe: 'Post-Seminar', color: '#CC0000' },
  { label: 'Participants Leading', value: 30, suffix: '%', timeframe: 'By Week 12', color: '#888888' },
];

export const METRIC_DONUT = [
  { label: 'Encounter', value: 22, color: '#FFEA00' },
  { label: 'Exegesis', value: 39, color: '#CC0000' },
  { label: 'Examination', value: 22, color: '#0A0A0A' },
  { label: 'Expression', value: 17, color: '#888888' },
];

export const ADAPTATION_CONTEXTS = [
  {
    context: 'Youth Groups',
    emoji: '🔥',
    modifications: [
      'Increase multimedia, role-playing, and creative expression',
      'Shorten exposition segments to max 10 minutes',
      'Integrate social media journaling (WhatsApp/Facebook groups)',
      'Use contemporary worship and culturally relevant illustrations',
    ],
  },
  {
    context: 'Senior Adults',
    emoji: '📖',
    modifications: [
      'Deepen theological reflection and wisdom transmission',
      'Allow more time for personal testimony sharing',
      'Use larger print materials and movement-based activities',
      'Prioritize depth over coverage with slower pacing',
    ],
  },
  {
    context: 'New Believers',
    emoji: '🌱',
    modifications: [
      'Add foundational vocabulary building with theological glossary',
      'Proceed at slower pace ensuring comprehension',
      'Pair each new believer with a mature mentor',
      'Provide pre-session reading guides with context notes',
    ],
  },
  {
    context: 'Leadership Development',
    emoji: '🎯',
    modifications: [
      'Add teaching preparation assignments for advanced participants',
      'Include facilitation training practicum with feedback',
      'Create co-lead opportunities for emerging leaders',
      'Designate mentored facilitation weeks',
    ],
  },
  {
    context: 'Recovery Groups',
    emoji: '💪',
    modifications: [
      'Integrate step-work principles with biblical foundations',
      'Emphasize God\'s unconditional love and grace',
      'Extend prayer time for deeper emotional processing',
      'Ensure confidentiality and psychological safety',
    ],
  },
];

export const RESOURCES = [
  {
    title: 'Study Bible',
    subtitle: 'ESV, NIV, or NLT',
    description: 'A reliable study Bible with cross-references, footnotes, and book introductions. Filipino participants encouraged to use Ang Salita ng Dios alongside English translations.',
    icon: '📖',
  },
  {
    title: 'SOAP Journal',
    subtitle: 'Two Notebooks Required',
    description: 'Submission Journal (shared with accountability partner) and Personal Reflection Journal (private). Date every entry and bring both to each session.',
    icon: '📓',
  },
  {
    title: 'Cross-Reference Tools',
    subtitle: 'Concordance & Bible Apps',
    description: 'Strong\'s Concordance, Blue Letter Bible, YouVersion, or Logos. Participants trained in basic use during Weeks 1-2.',
    icon: '🔗',
  },
  {
    title: 'Worship Playlist',
    subtitle: 'Curated to Weekly Themes',
    description: '2-3 songs per session connecting to the attribute of God being studied. Mix of English and Filipino worship songs for bilingual engagement.',
    icon: '🎵',
  },
  {
    title: 'Accountability Partner',
    subtitle: 'Assigned for 12 Weeks',
    description: 'Primary relational structure for follow-through. Partners communicate at least once between sessions via text, call, or in-person meeting.',
    icon: '🤝',
  },
  {
    title: '5-Day Reading Plan',
    subtitle: 'Daily Scripture Engagement',
    description: 'Structured readings related to the current theme. Day 6 for catch-up/reflection, Day 7 as Sabbath rest. Practice SOAP in private devotion.',
    icon: '📅',
  },
];

export const SCRIPTURE_VERSES = [
  { ref: 'Psalm 119:18', text: 'Open my eyes that I may see wonderful things in your law' },
  { ref: 'James 1:22', text: 'Do not merely listen to the word, and so deceive yourselves. Do what it says' },
  { ref: '2 Timothy 2:2', text: 'Entrust to reliable people who will also be qualified to teach others' },
  { ref: '2 Timothy 3:16', text: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness' },
];
