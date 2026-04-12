const docx = require("docx");
const fs = require("fs");
const path = require("path");

// ─── Color Palette: WM-1 Warm Teal (Education) ───────────────────────────────
const P = {
  bg: "F4F1E9",
  primary: "15857A",
  accent: "FF6A3B",
  cover: { titleColor: "15857A", subtitleColor: "606060", metaColor: "707070", footerColor: "A0A0A0" },
  table: { headerBg: "15857A", headerText: "FFFFFF", accentLine: "15857A", innerLine: "D5D0C8", surface: "F0EDE5" },
  body: "2D3748",
  secondary: "718096",
  surface: "F0EDE5",
};

const FONT = "Times New Roman";
const LINE_SPACING = 312;
const mm2twip = (mm) => Math.round((mm / 25.4) * 1440);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shading(color) {
  return { type: docx.ShadingType.CLEAR, fill: color, color: "auto" };
}

const NO_BORDERS = {
  top: { style: docx.BorderStyle.NONE, size: 0, color: "auto" },
  bottom: { style: docx.BorderStyle.NONE, size: 0, color: "auto" },
  left: { style: docx.BorderStyle.NONE, size: 0, color: "auto" },
  right: { style: docx.BorderStyle.NONE, size: 0, color: "auto" },
  insideHorizontal: { style: docx.BorderStyle.NONE, size: 0, color: "auto" },
  insideVertical: { style: docx.BorderStyle.NONE, size: 0, color: "auto" },
};

const CM = { top: 40, bottom: 40, left: 80, right: 80 };

function h1(text) {
  return new docx.Paragraph({
    heading: docx.HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 200, line: LINE_SPACING },
    border: { bottom: { style: docx.BorderStyle.SINGLE, size: 6, color: P.primary, space: 4 } },
    children: [new docx.TextRun({ text, font: FONT, size: 32, bold: true, color: P.primary })],
  });
}

function h2(text) {
  return new docx.Paragraph({
    heading: docx.HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 160, line: LINE_SPACING },
    children: [new docx.TextRun({ text, font: FONT, size: 28, bold: true, color: P.primary })],
  });
}

function h3(text) {
  return new docx.Paragraph({
    heading: docx.HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120, line: LINE_SPACING },
    children: [new docx.TextRun({ text, font: FONT, size: 24, bold: true, color: P.primary })],
  });
}

function body(text) {
  return new docx.Paragraph({
    spacing: { after: 120, line: LINE_SPACING },
    children: [new docx.TextRun({ text, font: FONT, size: 24, color: P.body })],
  });
}

function bullet(text) {
  return new docx.Paragraph({
    spacing: { after: 60, line: LINE_SPACING },
    bullet: { level: 0 },
    children: [new docx.TextRun({ text, font: FONT, size: 24, color: P.body })],
  });
}

function boldLead(boldText, normalText) {
  return new docx.Paragraph({
    spacing: { after: 60, line: LINE_SPACING },
    bullet: { level: 0 },
    children: [
      new docx.TextRun({ text: boldText + ": ", font: FONT, size: 24, bold: true, color: P.body }),
      new docx.TextRun({ text: normalText, font: FONT, size: 24, color: P.body }),
    ],
  });
}

function createTable(headers, rows, colWidths) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  const pcts = colWidths.map((w) => (w / total) * 100);

  const headerRow = new docx.TableRow({
    tableHeader: true,
    cantSplit: true,
    children: headers.map((h, i) =>
      new docx.TableCell({
        width: { size: pcts[i], type: docx.WidthType.PERCENTAGE },
        shading: shading(P.table.headerBg),
        borders: NO_BORDERS,
        margins: CM,
        children: [
          new docx.Paragraph({
            spacing: { line: LINE_SPACING, after: 0 },
            children: [new docx.TextRun({ text: h, font: FONT, size: 22, bold: true, color: P.table.headerText })],
          }),
        ],
      })
    ),
  });

  const dataRows = rows.map(
    (row, ri) =>
      new docx.TableRow({
        cantSplit: true,
        children: row.map((cell, i) =>
          new docx.TableCell({
            width: { size: pcts[i], type: docx.WidthType.PERCENTAGE },
            shading: shading(ri % 2 === 0 ? P.surface : "FFFFFF"),
            borders: NO_BORDERS,
            margins: CM,
            children: [
              new docx.Paragraph({
                spacing: { line: LINE_SPACING, after: 0 },
                children: [new docx.TextRun({ text: String(cell), font: FONT, size: 21, color: P.body })],
              }),
            ],
          })
        ),
      })
  );

  return new docx.Table({
    width: { size: 100, type: docx.WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

function makeHeader(text) {
  return new docx.Header({
    children: [
      new docx.Paragraph({
        alignment: docx.AlignmentType.RIGHT,
        children: [new docx.TextRun({ text, font: FONT, size: 16, italics: true, color: P.secondary })],
      }),
    ],
  });
}

function makeFooter() {
  return new docx.Footer({
    children: [
      new docx.Paragraph({
        alignment: docx.AlignmentType.CENTER,
        children: [new docx.TextRun({ children: [docx.PageNumber.CURRENT], font: FONT, size: 18, color: P.secondary })],
      }),
    ],
  });
}

// ─── Cover Section ────────────────────────────────────────────────────────────
function buildCoverSection() {
  const title = "Living Word: A Transformative Bible Study Seminar";
  const words = title.split(" ");
  const lines = [];
  for (let i = 0; i < words.length; i += 5) lines.push(words.slice(i, i + 5).join(" "));

  const children = [
    new docx.Paragraph({ spacing: { before: 4200 } }),
    ...lines.map(
      (line) =>
        new docx.Paragraph({
          alignment: docx.AlignmentType.LEFT,
          spacing: { after: 80, line: 340 },
          children: [new docx.TextRun({ text: line, font: FONT, size: 88, bold: true, color: P.cover.titleColor })],
        })
    ),
    new docx.Paragraph({
      spacing: { before: 200, after: 200 },
      border: { bottom: { style: docx.BorderStyle.SINGLE, size: 12, color: P.accent, space: 1 } },
      children: [],
    }),
    new docx.Paragraph({
      alignment: docx.AlignmentType.LEFT,
      spacing: { after: 100, line: LINE_SPACING },
      children: [
        new docx.TextRun({
          text: "Knowing God Through Scripture \u2014 A 12-Week Comprehensive Framework",
          font: FONT,
          size: 28,
          color: P.cover.subtitleColor,
          italics: true,
        }),
      ],
    }),
    new docx.Paragraph({ spacing: { before: 600 } }),
    ...[
      "Filipino Christian Community Bible Study",
      "Inductive SOAP Method | Small Group Format",
      "Prepared: April 2026",
    ].map(
      (meta) =>
        new docx.Paragraph({
          alignment: docx.AlignmentType.LEFT,
          spacing: { after: 60, line: LINE_SPACING },
          children: [new docx.TextRun({ text: meta, font: FONT, size: 22, color: P.cover.metaColor })],
        })
    ),
    new docx.Paragraph({ spacing: { before: 3000 } }),
    new docx.Paragraph({
      alignment: docx.AlignmentType.LEFT,
      children: [
        new docx.TextRun({
          text: "Equipping the Filipino Church to Know God Deeply Through His Word",
          font: FONT,
          size: 18,
          italics: true,
          color: P.cover.footerColor,
        }),
      ],
    }),
  ];

  return {
    properties: {
      page: { margin: { top: 0, bottom: 0, left: 0, right: 0 }, size: { width: 11906, height: 16838 } },
      titlePage: true,
    },
    children: [
      new docx.Table({
        width: { size: 100, type: docx.WidthType.PERCENTAGE },
        rows: [
          new docx.TableRow({
            height: { value: 16838, rule: docx.HeightRule.EXACT },
            children: [
              new docx.TableCell({
                width: { size: 100, type: docx.WidthType.PERCENTAGE },
                shading: shading(P.bg),
                borders: NO_BORDERS,
                margins: { top: mm2twip(20), bottom: mm2twip(20), left: mm2twip(25), right: mm2twip(25) },
                children,
              }),
            ],
          }),
        ],
      }),
    ],
  };
}

// ─── TOC Section ──────────────────────────────────────────────────────────────
function buildTocSection() {
  return {
    properties: {
      page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, size: { width: 11906, height: 16838 } },
    },
    headers: { default: makeHeader("Living Word Seminar Framework") },
    footers: { default: makeFooter() },
    children: [
      new docx.Paragraph({
        spacing: { after: 400 },
        children: [new docx.TextRun({ text: "Table of Contents", font: FONT, size: 32, bold: true, color: P.primary })],
      }),
      new docx.TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
      new docx.Paragraph({ children: [new docx.PageBreak()] }),
    ],
  };
}

// ─── Body Children ────────────────────────────────────────────────────────────
function buildBodyChildren() {
  const c = [];

  // === 1. Executive Summary ===
  c.push(h1("Executive Summary"));
  c.push(body("The Living Word: A Transformative Bible Study Seminar is a comprehensive 12-week program designed to equip Filipino Christian believers at every stage of spiritual maturity to know God deeply through His attributes, character, and abiding presence. Rooted in the rich tradition of evangelical Filipino church life, this seminar draws from the transcribed insights of a real Bible study session that demonstrated the hunger of Filipino believers to encounter God not merely intellectually, but relationally and transformationally."));
  c.push(body("At the heart of this framework lies the SOAP inductive Bible study method \u2014 Scripture, Observation, Application, and Prayer \u2014 a systematic yet accessible approach that guides participants from textual engagement to personal obedience. Rather than passively receiving teaching, participants actively mine the biblical text for truth, allowing the Holy Spirit to illuminate God\u2019s character and prompt concrete life changes. This methodology was observed to be especially effective in the Filipino context, where communal learning and relational accountability amplify the impact of individual study."));
  c.push(body("The seminar is built upon a carefully designed 4-Pillar Architecture \u2014 Encounter, Exegesis, Examination, and Expression \u2014 that mirrors the natural rhythm of spiritual growth. Each 90-minute weekly session moves participants from corporate worship and testimony through deep textual study, into personal application and accountability, and finally out into missional expression. This progression ensures that head knowledge is consistently translated into heart transformation and hands-on obedience."));
  c.push(body("The 12-week journey is organized into four progressive phases: Foundation (Knowing the God of the Word), Formation (Being Transformed by the Word), Function (Doing the Work of the Word), and Fruit (Multiplying Through the Word). Each phase builds upon the previous one, creating a cumulative learning experience that moves participants from seekers to disciple-makers. By the conclusion of the seminar, participants will not only have studied the attributes of God across multiple Scripture passages \u2014 including John 1, the Wedding at Cana, the Parable of the Prodigal Son, Colossians 1, Psalm 119, and other foundational texts \u2014 but will also have developed sustainable spiritual disciplines of daily devotion, journaling, and prayer that produce measurable life transformation and missional impact."));
  c.push(body("This framework is designed for both online and in-person small group settings, with bilingual Filipino-English instruction that honors the natural communication patterns of the Filipino church. Whether deployed in an urban megachurch in Metro Manila or a house church in the provinces, the Living Word seminar provides a reproducible, scalable model for deepening faith and multiplying disciples across the Filipino Christian community."));

  // === 2. Seminar Overview ===
  c.push(h1("Seminar Overview"));
  c.push(body("The following table provides a high-level summary of the seminar\u2019s essential parameters. This overview serves as a quick reference for facilitators, church leaders, and prospective participants, capturing the key structural and logistical elements that define the Living Word experience."));
  c.push(createTable(
    ["Element", "Description"],
    [
      ["Duration", "12 weeks (modular design allowing for flexible pacing and contextual adaptation)"],
      ["Format", "Weekly 90-minute sessions + small group breakouts for deeper dialogue and accountability"],
      ["Target Audience", "Mixed maturity levels \u2014 from seekers exploring the faith to mature believers seeking deeper engagement"],
      ["Core Method", "Inductive SOAP study (Scripture, Observation, Application, Prayer) + devotional application + communal worship"],
      ["Primary Language", "Bilingual (Filipino-English / Taglish), reflecting natural church communication patterns"],
      ["Group Size", "3-4 per breakout group to ensure intimate, participatory dialogue"],
      ["Meeting Day", "Weekly (e.g., Thursday evening), with optional mid-week accountability check-ins"],
    ],
    [3000, 7000]
  ));
  c.push(body("The modular design of this 12-week framework allows churches to adapt the pace according to their specific context. Each session is self-contained enough to be meaningful for visitors, while the cumulative progression ensures depth for consistent participants. The 90-minute timeframe strikes a balance between depth of engagement and practical scheduling, recognizing the demands of daily life on Filipino families while honoring the biblical priority of gathering for study and fellowship."));

  // === 3. The 4-Pillar Architecture ===
  c.push(h1("The 4-Pillar Architecture"));
  c.push(body("The 4-Pillar Architecture provides the structural backbone of every Living Word session. Each pillar represents a distinct movement in the worship-study-application cycle, designed to engage the whole person \u2014 head, heart, and hands \u2014 in a progression that mirrors the biblical pattern of spiritual formation. This architecture was observed in the transcribed Bible study session, where natural transitions between worship, teaching, personal reflection, and commissioning created a holistic learning environment. The four pillars are not merely organizational tools; they are theological convictions about how God transforms His people through His Word."));

  // Pillar I
  c.push(h2("Pillar I: Encounter (Opening Movement \u2014 20 minutes)"));
  c.push(body("The Encounter pillar recognizes that genuine Bible study must begin with an orientation of the heart toward God. Before any intellectual engagement with the text, participants are invited into the presence of God through worship, prayer, and testimony. This is not a perfunctory opening exercise but a deliberate theological act: acknowledging that the Holy Spirit is the primary teacher and illuminator of Scripture. In the Filipino church context, where worship is often deeply expressive and communal, this pillar creates a space for participants to transition from the busyness of daily life into a posture of receptivity and expectation."));
  c.push(boldLead("Worship Integration", "Scripture-based songs aligned with the weekly theme prepare hearts for engagement. The worship selection is curated to echo the key truth of the session, embedding the theme emotionally before it is explored intellectually."));
  c.push(boldLead("Prayer of Illumination", "A deliberate invocation inviting the Holy Spirit to open hearts and minds. This prayer recognizes human dependence on divine illumination, a posture modeled by the Psalmist who prayed, \u2018Open my eyes that I may see wonderful things in your law\u2019 (Psalm 119:18)."));
  c.push(boldLead("Testimony Circle", "Brief sharing of how God\u2019s Word has shaped lives since the last session. In Filipino culture, where personal storytelling carries deep relational weight, testimonies create a bridge between Scripture and lived experience, building expectation for what God will do in the current session."));
  c.push(boldLead("Memory Verse Recitation", "Building cumulative biblical literacy through weekly verse memorization. Participants recite previously memorized verses together, reinforcing retention and creating a shared vocabulary of faith."));

  // Pillar II
  c.push(h2("Pillar II: Exegesis (Deep Dive \u2014 35 minutes)"));
  c.push(body("The Exegesis pillar is the intellectual center of the session, where participants engage directly with the biblical text using the inductive SOAP method. This pillar prioritizes the authority of Scripture over human opinion, training participants to observe what the text actually says before rushing to application. The goal is to let the text speak for itself, allowing the original historical, cultural, and literary context to inform interpretation. In the transcribed Bible study, this phase was marked by genuine curiosity and collaborative discovery as participants asked questions and explored the text together."));
  c.push(boldLead("Contextual Immersion", "Historical, cultural, and literary setting is established to anchor interpretation. Understanding the original audience, their circumstances, and the author\u2019s purpose prevents eisegesis (reading meaning into the text) and promotes faithful exegesis (drawing meaning from the text)."));
  c.push(boldLead("Textual Observation (SOAP \u2014 Observation Step)", "Participants answer the question: \u2018What does the text say?\u2019 This involves careful reading in multiple translations, noting repeated words, literary structures, contrasts, and connections. Observation is the foundation upon which accurate interpretation and application are built."));
  c.push(boldLead("Interpretive Framework", "The facilitator guides the group toward understanding the author\u2019s intended meaning for the original audience. This step employs basic hermeneutical principles, ensuring that interpretation is rooted in the text rather than personal preference."));
  c.push(boldLead("Cross-Reference Weaving", "Scripture interprets Scripture. Participants explore related passages that shed light on the current text, building an interconnected understanding of biblical theology and allowing the whole counsel of God to inform their reading."));

  // Pillar III
  c.push(h2("Pillar III: Examination (Personal Application \u2014 20 minutes)"));
  c.push(body("The Examination pillar moves from the mind to the heart, creating space for the Holy Spirit to apply the truth of Scripture to each participant\u2019s unique life circumstances. This is where the SOAP method\u2019s Application and Prayer steps come alive. The Filipino church context particularly benefits from this pillar, as the cultural value of \u2018pakikisama\u2019 (fellowship/communion) creates a natural environment for vulnerability and mutual encouragement. Small groups of 3-4 provide the intimacy necessary for honest self-examination and accountability."));
  c.push(boldLead("Heart Check", "The probing question \u2018Where does this confront my current reality?\u2019 invites participants to allow the Word of God to act as a mirror (James 1:23-25), revealing areas of alignment and misalignment between professed belief and actual practice."));
  c.push(boldLead("Obedience Step (SOAP \u2014 Application Step)", "Each participant formulates a specific, measurable response to the text. This is not a vague aspiration but a concrete action step that can be reported on in the following session, creating a rhythm of obedient response to God\u2019s Word."));
  c.push(boldLead("Accountability Pairing", "Participants share their obedience commitments with one other person, creating a relational structure for follow-through. This practice acknowledges that transformation happens best in the context of loving accountability."));
  c.push(boldLead("Prayer of Consecration (SOAP \u2014 Prayer Step)", "Personal and corporate prayer responses to the text, inviting God\u2019s power to enable the obedience steps that have been committed. This prayer is both a response to God\u2019s revelation and a request for His enabling grace."));

  // Pillar IV
  c.push(h2("Pillar IV: Expression (Commissioning \u2014 15 minutes)"));
  c.push(body("The Expression pillar sends participants out with purpose, connecting the inward work of the previous pillars to outward kingdom impact. This final movement ensures that Bible study does not become an end in itself but a catalyst for mission and service. In the Filipino church, where faith is inherently communal and missional, this pillar resonates deeply with the cultural instinct to share what has been received. The commissioning is not an afterthought but the natural overflow of transformed hearts."));
  c.push(boldLead("Missional Application", "The facilitator helps the group consider: \u2018How does this truth shape our witness and service in our families, workplaces, and communities?\u2019 This bridges the gap between personal transformation and public engagement."));
  c.push(boldLead("Community Challenge", "A collective action or outreach initiative emerges from the session\u2019s themes. This might be an invitation to serve together, share the gospel with a neighbor, or meet a community need, translating individual transformation into communal mission."));
  c.push(boldLead("Benediction", "The session concludes with a sending blessing, reminding participants that they carry the Word of God into every sphere of life. The benediction is both a comfort and a commission, affirming God\u2019s presence and purpose in the days ahead."));

  // === 4. 12-Week Progressive Journey Map ===
  c.push(h1("12-Week Progressive Journey Map"));
  c.push(body("The 12-week journey is organized into four progressive phases, each building upon the previous one to create a cumulative experience of spiritual growth. This progression moves participants from foundational knowledge of who God is, through personal transformation, into active service, and ultimately into a multiplication posture where they equip others. The design reflects the biblical pattern observed in 2 Timothy 2:2 \u2014 entrusting what has been learned to faithful people who will teach others also."));

  c.push(h2("Phase Overview"));
  c.push(createTable(
    ["Phase", "Weeks", "Focus", "Biblical Framework", "Key Scripture"],
    [
      ["Foundation", "1\u20133", "Knowing the God of the Word", "Psalm 119, John 1", "God as Spirit, God as Person, God as Creator"],
      ["Formation", "4\u20136", "Being Transformed by the Word", "Romans 12, James 1", "God as I AM, God is One, Jesus as Living Word"],
      ["Function", "7\u20139", "Doing the Work of the Word", "Matthew 28, Acts 2", "Forgiving Father, First Miracle, Community"],
      ["Fruit", "10\u201312", "Multiplying Through the Word", "2 Timothy 2, Titus 2", "God is Eternal, Omniscient, Omnipresent"],
    ],
    [1500, 1000, 2500, 2500, 2500]
  ));
  c.push(body("The Foundation phase establishes the essential framework for knowing God \u2014 who He is in His essential nature and how He has revealed Himself through Scripture. The Formation phase shifts focus to how the knowledge of God transforms the believer\u2019s identity and daily walk. The Function phase moves participants from personal transformation to active ministry, exploring how knowing God compels service. Finally, the Fruit phase equips participants to reproduce what they have learned, embodying the multiplication mandate at the heart of the Great Commission."));

  c.push(h2("Week-by-Week Breakdown"));
  c.push(createTable(
    ["Week", "Theme", "Scripture", "SOAP Focus"],
    [
      ["1", "God is Spirit", "John 4:21-24", "Worship in spirit and truth \u2014 understanding what it means to worship God authentically beyond physical locations and rituals"],
      ["2", "God is Person", "Genesis 1:26-27", "Created in God\u2019s image \u2014 exploring the profound implications of bearing the divine likeness in our identity and relationships"],
      ["3", "God as Creator", "Colossians 1:15-20", "First over all creation \u2014 Christ\u2019s supremacy as the agent and sustainer of all that exists"],
      ["4", "God\u2019s Name: I AM", "Exodus 3:13-15", "The Great I AM \u2014 encountering God\u2019s self-revelation to Moses and its significance for our understanding of His eternal nature"],
      ["5", "God is One", "Deuteronomy 5:6-7", "No other gods \u2014 examining the implications of exclusive devotion to the one true God in a pluralistic culture"],
      ["6", "Jesus: The Living Word", "John 1:1-18", "The Word became flesh \u2014 the incarnation as the ultimate revelation of God\u2019s character and redemptive purpose"],
      ["7", "The Forgiving Father", "Luke 15:11-32", "Parable of the Prodigal Son \u2014 experiencing God\u2019s radical grace and the call to extend that grace to others"],
      ["8", "Jesus\u2019 First Miracle", "John 2:1-12", "Wedding at Cana \u2014 discovering how Jesus\u2019 compassion meets human need and reveals His glory"],
      ["9", "Community of Believers", "Acts 2:42-47", "Breaking bread together \u2014 the early church as a model for authentic Christian fellowship and shared life"],
      ["10", "God is Eternal", "Psalm 90:2, Acts 17:25", "Without beginning or end \u2014 resting in God\u2019s transcendent existence and sovereign sustenance of all life"],
      ["11", "God is Omniscient & Omnipotent", "Psalm 139, Job 42", "All-knowing, all-powerful \u2014 finding comfort in God\u2019s complete knowledge and unlimited power"],
      ["12", "God is Omnipresent", "Jeremiah 23:23-24", "Always with us \u2014 living with the awareness of God\u2019s constant presence in every circumstance"],
    ],
    [800, 2200, 2200, 3800]
  ));
  c.push(body("Each week follows the same 4-Pillar structure, creating a predictable rhythm that allows participants to focus on content rather than format. The Scripture selections span both Old and New Testaments, providing a holistic view of God\u2019s self-revelation. The SOAP focus for each week provides a thematic lens through which participants engage the text, ensuring that observation, application, and prayer are anchored to the specific attribute of God being explored."));

  // === 5. Session Structure Template ===
  c.push(h1("Session Structure Template"));
  c.push(body("The following template serves as a reusable blueprint for every weekly session. Facilitators should customize the specific content (theme, Scripture, questions) while maintaining the structural integrity of the 4-Pillar flow. Consistency in structure creates a predictable environment where participants can focus their energy on encountering God rather than navigating format changes. This template reflects the practices observed in the transcribed Bible study, where a clear but flexible structure enabled both depth and spontaneity."));

  c.push(h2("Template Layout"));

  // Header block
  c.push(new docx.Paragraph({
    spacing: { before: 300, after: 80, line: LINE_SPACING },
    shading: shading(P.surface),
    children: [new docx.TextRun({ text: "WEEK [N]: [THEME TITLE]", font: FONT, size: 26, bold: true, color: P.primary })],
  }));
  c.push(new docx.Paragraph({
    spacing: { after: 200, line: LINE_SPACING },
    children: [new docx.TextRun({ text: "Scripture: [Primary Passage]", font: FONT, size: 22, italics: true, color: P.secondary })],
  }));

  const templateBlocks = [
    { title: "OPENING ENCOUNTER (20 minutes)", items: [
      "Welcome & Worship \u2014 Begin with 2-3 songs reflecting the weekly theme",
      "Prayer of Preparation \u2014 Invite the Holy Spirit\u2019s illumination",
      "Testimony Spotlight (5 min) \u2014 One participant shares how God\u2019s Word has been at work",
      "Review: Last Week\u2019s Obedience Steps \u2014 Brief check-in on accountability commitments",
    ]},
    { title: "SCRIPTURE EXEGESIS (35 minutes)", items: [
      "Read Aloud \u2014 Read the passage in multiple translations (e.g., NIV, ESV, Tagalog Ang Salita ng Dios)",
      "Observation Questions \u2014 \u2018What do you see?\u2019 Note repeated words, contrasts, commands, promises",
      "Interpretation Discussion \u2014 \u2018What does it mean?\u2019 Explore the author\u2019s intended meaning",
      "Theological Connection \u2014 \u2018How does this reveal God?\u2019 Connect to His attributes and character",
      "Cross-Reference Exploration \u2014 Trace related passages that illuminate the text",
    ]},
    { title: "HEART EXAMINATION (20 minutes)", items: [
      "Personal Reflection \u2014 Silent journaling time (3-5 min) for honest self-examination",
      "Breakout Dialogue \u2014 Groups of 3-4 share observations and personal reflections",
      "Application Commitment \u2014 Each person writes one specific, measurable obedience step",
      "Prayer Partnership \u2014 Share your step with an accountability partner and pray together",
    ]},
    { title: "MISSIONAL EXPRESSION (15 minutes)", items: [
      "Community Application \u2014 \u2018How can we live this out together?\u2019 Identify a collective response",
      "Outreach Connection \u2014 Connect the week\u2019s truth to opportunities for witness and service",
      "Closing Benediction \u2014 Send participants out with God\u2019s blessing and commissioning",
    ]},
    { title: "HOMEWORK (Between Sessions)", items: [
      "Daily Scripture reading \u2014 Follow the 5-day reading plan for the current theme",
      "Memory verse meditation \u2014 Memorize and internalize the assigned weekly verse",
      "Obedience step execution \u2014 Actively live out the commitment made during the session",
      "Preparation for next week \u2014 Read the upcoming Scripture passage and come with observations",
    ]},
  ];

  for (const block of templateBlocks) {
    c.push(h3(block.title));
    for (const item of block.items) c.push(bullet(item));
  }

  c.push(body("This template is designed to be both structured and Spirit-led. While the time blocks provide necessary boundaries, facilitators should remain sensitive to the Holy Spirit\u2019s leading, allowing flexibility when a particular discussion or prayer time warrants extended attention. The key is that every session moves participants through the full arc from encounter to expression, ensuring that no element of holistic spiritual formation is neglected."));

  // === 6. Core Methodological Distinctives ===
  c.push(h1("Core Methodological Distinctives"));
  c.push(body("The Living Word seminar is built upon six core methodological distinctives that set it apart from purely academic Bible study programs. These distinctives are not merely pedagogical preferences; they are theological convictions about how God forms His people through His Word. Each distinctive reflects a commitment to the authority of Scripture, the necessity of the Holy Spirit, the integration of knowledge and obedience, and the multiplication mandate inherent in the Great Commission."));

  c.push(h2("1. Spirit-Dependence"));
  c.push(body("Every session explicitly invites the Holy Spirit\u2019s illumination through prayer, deliberately avoiding the trap of purely academic study that relies on human intellect alone. This distinctive recognizes that the Bible is a spiritual book that requires spiritual discernment. As the Apostle Paul wrote, \u2018The person without the Spirit does not accept the things that come from the Spirit of God but considers them foolishness\u2019 (1 Corinthians 2:14). In practice, this means every session begins with prayer, every study is marked by openness to the Spirit\u2019s prompting, and participants are encouraged to listen for God\u2019s voice not only through the text but also through the community of believers gathered in His name."));

  c.push(h2("2. Text-Centered Authority"));
  c.push(body("Scripture remains the authoritative voice of God in every session. Commentary, cultural insight, and human opinion serve the text rather than substituting for it. This distinctive ensures that the Living Word seminar is fundamentally Scripture-driven rather than curriculum-driven. While facilitators may reference scholarly resources and historical context, the primary authority is always the biblical text itself. Participants are trained to ask, \u2018What does the text say?\u2019 before asking, \u2018What does this commentary say?\u2019 \u2014 a discipline that cultivates confidence in personal Bible engagement and guards against the dependency on secondary sources that can characterize shallow Bible study programs."));

  c.push(h2("3. SOAP Inductive Method"));
  c.push(body("The SOAP inductive method \u2014 Scripture, Observation, Application, Prayer \u2014 provides a systematic yet accessible framework for personal Bible engagement. Each participant practices this method weekly, building a habit of Scripture engagement that extends far beyond the seminar itself. The power of SOAP lies in its simplicity and comprehensiveness: it begins with the text (Scripture), trains careful attention (Observation), demands personal response (Application), and returns to God in dependence (Prayer). This method was central to the transcribed Bible study session, where participants demonstrated natural engagement with all four elements, and it provides the reproducible pattern that enables participants to eventually lead their own studies."));

  c.push(h2("4. Whole-Life Integration"));
  c.push(body("Every session is designed to align Head (knowledge of God), Heart (affection for God), and Hands (obedient action), ensuring that intellectual understanding, emotional engagement, and practical obedience are not treated as separate categories but as integrated dimensions of holistic discipleship. This distinctive guards against the common pitfalls of Bible study that remains merely informational (head-only), emotionally manipulative (heart-only), or activism-driven (hands-only). The 4-Pillar Architecture specifically positions each element to engage all three dimensions: Exegesis feeds the head, Encounter and Examination engage the heart, and Expression activates the hands."));

  c.push(h2("5. Communal Discernment"));
  c.push(body("Learning happens in small group dialogue rather than monologue. Participants observe, question, and discover truth together, reflecting the New Testament pattern of the early church where \u2018they devoted themselves to the apostles\u2019 teaching and to fellowship, to the breaking of bread and to prayer\u2019 (Acts 2:42). In the Filipino church context, where \u2018bayanihan\u2019 (communal unity) is a deeply embedded cultural value, communal discernment feels natural and creates a learning environment where every voice matters. The small group format ensures that participants learn not only from the facilitator but from each other, as the Holy Spirit uses the entire body of Christ to build understanding and faith."));

  c.push(h2("6. Multiplication-Minded"));
  c.push(body("Every participant is equipped to lead others in the same SOAP pattern, ensuring that the seminar reproduces disciples who make disciples. This distinctive is operationalized through progressive facilitation opportunities: participants begin by sharing observations, move to co-facilitating a discussion, and eventually lead a full session under mentorship. By the end of the 12 weeks, at least 30% of participants should have facilitated at least one session, with a pathway established for them to launch new study groups. This multiplication focus prevents the seminar from becoming a consumer-oriented program and instead positions it as a catalytic movement for church-wide disciple-making."));

  // === 7. Facilitator Requirements ===
  c.push(h1("Facilitator Requirements"));
  c.push(body("The effectiveness of the Living Word seminar depends significantly on the quality and preparedness of its facilitators. Unlike traditional classroom settings where the teacher is the primary source of knowledge, facilitators in this framework serve as guides who create space for the Holy Spirit to speak through the text and the community. The following requirements outline the spiritual, biblical, relational, missional, and linguistic competencies expected of those who lead Living Word sessions."));
  c.push(createTable(
    ["Category", "Requirement"],
    [
      ["Spiritual", "A mature believer with a consistent devotional life who demonstrates personal application of Scripture in daily living. The facilitator should model the spiritual disciplines they are teaching, including daily Bible reading, prayer, and journaling. Their authenticity in sharing their own journey of obedience and struggle creates a safe environment for participants to be equally transparent."],
      ["Biblical", "Competent in basic hermeneutics, the SOAP method, and cross-referencing. Able to guide inductive study without dominating the discussion, asking probing questions that lead participants to discover truth for themselves. Should be familiar with the major themes and narratives of both Old and New Testaments."],
      ["Relational", "Skilled in drawing out participation from mixed-maturity groups. Must manage group dynamics warmly, ensuring that dominant voices do not silence quieter participants and that newcomers feel welcomed. Sensitivity to cultural dynamics, including Filipino communication patterns such as indirect speech and respect for elders, is essential."],
      ["Missional", "Passionate about connecting study to kingdom impact. The facilitator should model obedience-oriented faith, regularly sharing how their own engagement with Scripture has led to concrete acts of service, evangelism, and community engagement. They should cast vision for how the group\u2019s study can translate into collective mission."],
      ["Linguistic", "Comfortable with bilingual (Filipino-English) instruction and sensitive to Taglish communication patterns. Should be able to code-switch naturally, ensuring that participants who are more comfortable in Filipino or English can equally engage. Familiarity with common Filipino theological terms and expressions is preferred."],
    ],
    [2000, 8000]
  ));
  c.push(body("Prospective facilitators should undergo a preparation period that includes observing at least two full sessions, co-facilitating one session under mentorship, and completing a facilitator orientation that covers the SOAP method, group dynamics, and the 4-Pillar Architecture. This apprenticeship model ensures quality and consistency across all Living Word groups while building a sustainable leadership pipeline for the church."));

  // === 8. Success Metrics ===
  c.push(h1("Success Metrics"));
  c.push(body("Measuring the impact of a Bible study seminar requires a balance of quantitative indicators and qualitative observations. The following metrics are organized by timeframe \u2014 short-term (within the first 6 weeks) and long-term (at the conclusion of the 12 weeks and beyond). These metrics are designed to be practical, measurable, and directly connected to the seminar\u2019s primary outcome goal of equipping participants to know God deeply and produce measurable life transformation."));
  c.push(createTable(
    ["Timeframe", "Metric", "Target"],
    [
      ["Short-Term (6 weeks)", "Attendance retention", "90%+ of enrolled participants remain active through Week 6"],
      ["Short-Term (6 weeks)", "Active participation in discussion", "80%+ of participants contribute meaningfully to small group dialogue each session"],
      ["Short-Term (6 weeks)", "Completed weekly SOAP journal entries", "100% submission rate for weekly journal assignments"],
      ["Short-Term (6 weeks)", "Scripture memory proficiency", "At least 6 key verses memorized and recited accurately by each participant"],
      ["Long-Term (12 weeks+)", "New small groups launched", "At least 2 new study groups initiated by seminar participants"],
      ["Long-Term (12 weeks+)", "Participants leading others", "30%+ of participants have facilitated at least one full session by Week 12"],
      ["Long-Term (12 weeks+)", "Observable life transformation", "Documented through periodic journal review and accountability partner feedback"],
      ["Long-Term (12 weeks+)", "Community impact projects initiated", "At least 1 outreach event or service project planned and executed by the group"],
    ],
    [2200, 3000, 4800]
  ));
  c.push(body("These metrics serve multiple purposes: they provide accountability for facilitators and participants, supply church leadership with data for resource allocation and program evaluation, and create natural celebration points that reinforce the seminar\u2019s momentum. It is important, however, that metrics remain tools for growth rather than ends in themselves. The ultimate measure of success is not found in numbers but in the transformed lives of participants who increasingly reflect the character of Christ as revealed in His Word."));

  // === 9. Adaptation Framework ===
  c.push(h1("Adaptation Framework"));
  c.push(body("The Living Word seminar is designed with built-in flexibility to serve diverse contexts within the Filipino church and beyond. While the core 4-Pillar Architecture and SOAP methodology remain constant, the following adaptation guidelines allow facilitators to modify specific elements to meet the unique needs of different demographic groups. These adaptations are not compromises but contextualizations that honor the universal truth of Scripture while respecting the particularities of each community."));
  c.push(createTable(
    ["Context", "Modification"],
    [
      ["Youth Groups", "Increase interactive elements such as multimedia, role-playing, and creative expression. Shorten lecture-style exposition segments to no more than 10 minutes. Integrate social media journaling (e.g., shared WhatsApp or Facebook group reflections). Use contemporary worship music and culturally relevant illustrations. Consider gamifying the memory verse component."],
      ["Senior Adults", "Deepen theological reflection and emphasize wisdom transmission from older to younger believers. Allow more time for personal testimony sharing, drawing on the rich life experience of senior participants. Use larger print materials. Offer both seated and movement-based activities. Consider a slower pace through texts, prioritizing depth over coverage."],
      ["New Believers", "Add foundational vocabulary building, including a glossary of common theological terms (e.g., grace, justification, sanctification). Proceed at a slower pace through texts, ensuring comprehension before advancing. Pair each new believer with a mature believer mentor for between-session check-ins. Provide pre-session reading guides with context and explanatory notes."],
      ["Leadership Development", "Add teaching preparation assignments for advanced participants. Include facilitation training practicum with observed feedback sessions. Create co-lead opportunities where emerging leaders manage specific pillars. Designate mentored facilitation weeks where trainees lead with a mentor present for support and evaluation."],
      ["Recovery Groups", "Integrate step-work principles with biblical foundations, showing how Scripture addresses brokenness, redemption, and restoration. Emphasize God\u2019s unconditional love and grace. Extend the Prayer of Consecration time to allow for deeper emotional processing. Ensure the small group environment maintains confidentiality and psychological safety."],
    ],
    [2200, 7800]
  ));
  c.push(body("When adapting the framework, facilitators should maintain the integrity of the SOAP method and the 4-Pillar progression while allowing flexibility in the specific activities, time allocations, and supplementary materials used within each pillar. The key principle is that adaptations should serve the goal of deeper engagement with God\u2019s Word, not dilute it. Church leaders overseeing multiple Living Word groups should ensure that all adaptations are reviewed and approved to maintain programmatic consistency across the church."));

  // === 10. Essential Resources ===
  c.push(h1("Essential Resources"));
  c.push(body("The following resources are recommended for all participants and facilitators of the Living Word seminar. These tools are selected to support the inductive study method and enhance the overall learning experience. While none of these resources replace the primacy of Scripture itself, they serve as valuable aids for deeper engagement, cross-referencing, and personal reflection."));

  c.push(h2("Study Bible (ESV, NIV, or NLT Recommended)"));
  c.push(body("A reliable study Bible serves as the primary text for inductive study. The English Standard Version (ESV) offers a balance of readability and literal accuracy, making it excellent for observation work. The New International Version (NIV) provides accessibility for those less familiar with biblical language, while the New Living Translation (NLT) offers a dynamic equivalent that illuminates meaning. Filipino participants are also encouraged to use the Ang Salita ng Dios (Tagalog) translation alongside their English Bible. Having multiple translations available during group sessions enriches the observation phase and deepens understanding. A study Bible with cross-references, footnotes, and brief book introductions provides the essential background information needed for contextual immersion without replacing the inductive process."));

  c.push(h2("SOAP Journal (Two Notebooks Required)"));
  c.push(body("Two separate notebooks are required for the duration of the seminar. The first notebook is the Submission Journal, which participants share with their accountability partner and, periodically, with the facilitator for review and feedback. This journal contains weekly SOAP entries, obedience step commitments, and reflections on how God is working in their life. The second notebook is the Personal Reflection Journal, which is never submitted and serves as a private space for honest prayer, struggle, and processing. This dual-journal system balances the accountability value of shared reflection with the privacy necessary for authentic spiritual growth. Participants should date every entry and bring both journals to each session."));

  c.push(h2("Cross-Reference Tools (Concordance, Bible Software/Apps)"));
  c.push(body("Cross-reference tools enable deeper Scripture interpretation by allowing participants to trace themes, words, and concepts across the biblical canon. A printed concordance such as Strong\u2019s Exhaustive Concordance provides word-level study capabilities, while digital tools like the Blue Letter Bible app, YouVersion, or Logos Bible Software offer searchable interfaces, interlinear translations, and access to commentaries. For the Filipino context, several Bible apps offer both English and Tagalog translations with integrated cross-references. Participants should be trained in the basic use of at least one cross-reference tool during the first two weeks of the seminar, building a skill that will serve their Bible engagement long after the program concludes."));

  c.push(h2("Worship Playlist Curated to Weekly Themes"));
  c.push(body("A carefully curated worship playlist enhances the Encounter pillar experience by creating a sonic environment that reinforces the weekly theme. The facilitator should prepare 2-3 songs per session that directly connect to the attribute of God being studied. For example, when studying \u2018God is Spirit\u2019 (Week 1), songs about worship and surrender would be appropriate. The playlist should include a mix of English and Filipino worship songs, reflecting the bilingual context of the Filipino church. In online settings, screen-sharing lyrics and playing music through the platform ensures that remote participants can fully participate. The worship playlist is not background music but a formative element that prepares hearts for engagement with God\u2019s Word."));

  c.push(h2("Accountability Partner (Assigned for Duration)"));
  c.push(body("Each participant is assigned an accountability partner for the full 12 weeks of the seminar. This pairing serves as the primary relational structure for follow-through on obedience steps and between-session engagement. Partners should communicate at least once between sessions (via text, call, or in-person meeting) to check on progress, share prayer requests, and encourage one another. The accountability partner relationship is one of the most powerful elements of the Living Word framework, translating the communal learning of the group session into consistent, personal discipleship. Facilitators should prayerfully consider pairings, matching participants of similar maturity levels and, where possible, complementary gifts and temperaments."));

  c.push(h2("Daily 5-Day Scripture Reading Plan"));
  c.push(body("A structured 5-day reading plan provides the framework for between-session engagement, ensuring that participants do not limit their Scripture interaction to the weekly session alone. Each week\u2019s plan includes daily readings related to the current theme, guiding participants deeper into the attribute of God being studied. The plan typically includes the primary study passage divided across multiple days, supplementary cross-references, and a Psalm or Proverb reading for devotional breadth. Day 6 is reserved for catch-up or reflection, and Day 7 is a Sabbath rest. Participants are encouraged to use their SOAP journal during these daily readings, practicing the inductive method in private devotion that prepares them for richer communal engagement."));

  return c;
}

// ─── Build Full Document ──────────────────────────────────────────────────────
function buildFullDocument() {
  return new docx.Document({
    creator: "Living Word Seminar Team",
    title: "Living Word: A Transformative Bible Study Seminar",
    description: "A 12-week comprehensive Bible study framework for Filipino Christian communities",
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 24, color: P.body },
          paragraph: { spacing: { line: LINE_SPACING } },
        },
        heading1: {
          run: { font: FONT, size: 32, bold: true, color: P.primary },
          paragraph: { spacing: { before: 480, after: 200, line: LINE_SPACING } },
        },
        heading2: {
          run: { font: FONT, size: 28, bold: true, color: P.primary },
          paragraph: { spacing: { before: 360, after: 160, line: LINE_SPACING } },
        },
        heading3: {
          run: { font: FONT, size: 24, bold: true, color: P.primary },
          paragraph: { spacing: { before: 240, after: 120, line: LINE_SPACING } },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: "default-bullet",
          levels: [
            {
              level: 0,
              format: docx.LevelFormat.BULLET,
              text: "\u2022",
              alignment: docx.AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: mm2twip(10), hanging: mm2twip(5) } },
                run: { font: FONT, size: 24 },
              },
            },
            {
              level: 1,
              format: docx.LevelFormat.BULLET,
              text: "\u2013",
              alignment: docx.AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: mm2twip(20), hanging: mm2twip(5) } },
                run: { font: FONT, size: 24 },
              },
            },
          ],
        },
      ],
    },
    sections: [
      buildCoverSection(),
      buildTocSection(),
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
            size: { width: 11906, height: 16838 },
          },
        },
        headers: { default: makeHeader("Living Word Seminar Framework") },
        footers: { default: makeFooter() },
        children: buildBodyChildren(),
      },
    ],
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const outputPath = "/home/z/my-project/download/Living_Word_Seminar_Framework.docx";
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log("Building document...");
  const doc = buildFullDocument();
  const buffer = await docx.Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log("Document saved to:", outputPath);
}

main().catch(console.error);
