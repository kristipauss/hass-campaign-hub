import { useState, useRef, useEffect } from "react";

// ─── CAMPAIGN CONFIG ───────────────────────────────────────────────────────────
// To create a new client hub, only edit this object.
const CAMPAIGN = {
  client: "Clearwater Health",
  campaign: "Mental Wellness Awareness Campaign",
  logo: "CW",
  accent: "#0EA5E9",
  accentDark: "#0369A1",
  accentLight: "#E0F2FE",
  tagline: "Reducing stigma. Building access. Changing lives.",
  budget: "$185,000",
  flightDates: "Sep – Nov 2026",
  target: "Adults 25–54 experiencing anxiety or depression",
  market: "Pacific Northwest",

  personas: [
    {
      name: "Jordan",
      age: 32,
      role: "Software engineer, Seattle",
      avatar: "JO",
      color: "#6366F1",
      bio: "Works remotely, high-functioning anxiety. Scrolls Reddit at midnight. Distrusts 'therapy speak' but open to peer stories. Needs permission, not prescription.",
      traits: ["Skeptical of corporate wellness", "Podcast listener", "Late adopter of mental health resources"],
    },
    {
      name: "Maria",
      age: 44,
      role: "Elementary school teacher, Tacoma",
      avatar: "MA",
      color: "#EC4899",
      bio: "Caretaker of aging parent and two teens. Feels guilty prioritizing herself. Trusts recommendations from people like her. Facebook and local news are her media.",
      traits: ["Community-oriented", "Time-poor", "Responds to human stories"],
    },
    {
      name: "Devon",
      age: 28,
      role: "Barista / freelance artist, Portland",
      avatar: "DE",
      color: "#10B981",
      bio: "Uninsured, uses sliding-scale clinics. Very online. Responds to authenticity and calls out inauthenticity immediately. TikTok and Instagram are his world.",
      traits: ["Cost-sensitive", "Highly visual", "Skeptical of institutions"],
    },
    {
      name: "Linda",
      age: 58,
      role: "Retired nurse, Spokane",
      avatar: "LI",
      color: "#F59E0B",
      bio: "Watched colleagues burn out for 30 years. Now advocates for mental health in her church community. TV news, email newsletters, and Facebook are her channels.",
      traits: ["Trusted messenger", "Faith-informed", "Concerned about stigma"],
    },
  ],

  audienceModules: [
    {
      label: "Demographics",
      data: [
        { segment: "Women 25–34", value: 38, benchmark: 22 },
        { segment: "Men 35–44", value: 29, benchmark: 19 },
        { segment: "Women 45–54", value: 22, benchmark: 18 },
        { segment: "Men 55+", value: 11, benchmark: 14 },
      ],
    },
    {
      label: "Media Habits",
      data: [
        { segment: "Streaming video daily", value: 74, benchmark: 61 },
        { segment: "Social media 2h+/day", value: 68, benchmark: 54 },
        { segment: "Podcast weekly", value: 52, benchmark: 38 },
        { segment: "Linear TV daily", value: 41, benchmark: 47 },
      ],
    },
    {
      label: "Attitudes",
      data: [
        { segment: "Open to therapy", value: 61, benchmark: 44 },
        { segment: "Stigma concern", value: 48, benchmark: 35 },
        { segment: "Cost is barrier", value: 72, benchmark: 58 },
        { segment: "Peer referral trusted", value: 83, benchmark: 71 },
      ],
    },
  ],

  surveyWaves: ["Wave 1 — Feb 2026", "Wave 2 — May 2026"],
  surveyQuestions: [
    {
      question: "How comfortable are you seeking mental health support?",
      category: "Attitudes",
      wave1: [28, 34, 22, 16],
      wave2: [19, 29, 30, 22],
      labels: ["Not at all comfortable", "Somewhat uncomfortable", "Somewhat comfortable", "Very comfortable"],
    },
    {
      question: "What is the biggest barrier to accessing mental health care?",
      category: "Barriers",
      wave1: [41, 27, 19, 13],
      wave2: [38, 24, 22, 16],
      labels: ["Cost / insurance", "Stigma / judgment", "Finding a provider", "Time / scheduling"],
    },
    {
      question: "Which message resonates most with you?",
      category: "Messaging",
      wave1: [22, 31, 29, 18],
      wave2: [18, 27, 35, 20],
      labels: ["'You're not alone'", "'Help is closer than you think'", "'It's okay to not be okay'", "'Your community cares'"],
    },
    {
      question: "How likely are you to recommend a mental health resource to a friend?",
      category: "Advocacy",
      wave1: [14, 23, 38, 25],
      wave2: [11, 19, 40, 30],
      labels: ["Very unlikely", "Unlikely", "Likely", "Very likely"],
    },
  ],

  flowchart: {
    phases: ["Awareness", "Consideration", "Action"],
    channels: [
      { name: "Meta (FB/IG)", color: "#3B82F6", budget: 52000, weeks: [1,1,1,1,2,2,2,2,2,2,1,1] },
      { name: "TikTok", color: "#EC4899", budget: 28000, weeks: [0,0,1,1,1,2,2,2,1,1,0,0] },
      { name: "YouTube / CTV", color: "#EF4444", budget: 45000, weeks: [1,1,1,1,1,1,1,1,1,1,1,1] },
      { name: "Streaming Audio", color: "#8B5CF6", budget: 22000, weeks: [0,1,1,1,1,1,1,1,1,1,1,0] },
      { name: "Paid Search", color: "#10B981", budget: 38000, weeks: [1,1,1,1,1,1,1,1,1,1,1,1] },
    ],
    weekLabels: ["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"],
  },

  performance: {
    summary: { spend: 92400, impressions: 8420000, clicks: 124300, conversions: 3180, ctr: 1.48, cpa: 29.06 },
    channels: [
      { name: "Meta", spend: 26000, impressions: 3200000, clicks: 58400, conversions: 1420, ctr: 1.83, cpa: 18.31 },
      { name: "TikTok", spend: 14000, impressions: 2100000, clicks: 28700, conversions: 540, ctr: 1.37, cpa: 25.93 },
      { name: "YouTube/CTV", spend: 22500, impressions: 1800000, clicks: 18200, conversions: 620, ctr: 1.01, cpa: 36.29 },
      { name: "Streaming Audio", spend: 11000, impressions: 980000, clicks: 8400, conversions: 290, ctr: 0.86, cpa: 37.93 },
      { name: "Paid Search", spend: 18900, impressions: 340000, clicks: 10600, conversions: 310, ctr: 3.12, cpa: 60.97 },
    ],
    weeklySpend: [6200, 7100, 8400, 8200, 8800, 9100, 8600, 8900, 9200, 8600, 8300, 1000],
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : n;
const pct = (n) => `${n}%`;
const usd = (n) => `$${n.toLocaleString()}`;

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "audience", label: "Audience", icon: "◎" },
  { id: "survey", label: "Survey", icon: "≡" },
  { id: "personas", label: "Personas", icon: "◉" },
  { id: "planner", label: "Planner", icon: "✦" },
  { id: "flowchart", label: "Flowchart", icon: "▤" },
  { id: "performance", label: "Performance", icon: "◈" },
];

// ─── AI CHAT HOOK ─────────────────────────────────────────────────────────────
function useChat(systemPrompt) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async (userText) => {
    const next = [...messages, { role: "user", content: userText }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: next,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't respond.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Network error. Please try again." }]);
    }
    setLoading(false);
  };

  return { messages, loading, send, clear: () => setMessages([]) };
}

// ─── CHAT UI ──────────────────────────────────────────────────────────────────
function ChatUI({ chat, placeholder, accentColor }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, chat.loading]);

  const submit = () => {
    if (!input.trim() || chat.loading) return;
    chat.send(input.trim());
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "420px", background: "#0F172A", borderRadius: "12px", overflow: "hidden", border: "1px solid #1E293B" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {chat.messages.length === 0 && (
          <div style={{ color: "#475569", fontSize: "14px", textAlign: "center", marginTop: "40px" }}>
            {placeholder}
          </div>
        )}
        {chat.messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "80%",
            background: m.role === "user" ? accentColor : "#1E293B",
            color: "#F1F5F9",
            borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            padding: "10px 14px",
            fontSize: "14px",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
          }}>{m.content}</div>
        ))}
        {chat.loading && (
          <div style={{ alignSelf: "flex-start", background: "#1E293B", borderRadius: "16px 16px 16px 4px", padding: "12px 16px" }}>
            <span style={{ color: "#64748B", fontSize: "13px" }}>Thinking…</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: "8px", padding: "12px 16px", borderTop: "1px solid #1E293B", background: "#0F172A" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="Type a message…"
          style={{
            flex: 1, background: "#1E293B", border: "1px solid #334155", borderRadius: "8px",
            color: "#F1F5F9", padding: "10px 14px", fontSize: "14px", outline: "none",
          }}
        />
        <button onClick={submit} disabled={chat.loading || !input.trim()} style={{
          background: accentColor, border: "none", borderRadius: "8px", color: "white",
          padding: "10px 18px", fontSize: "14px", cursor: "pointer", fontWeight: 600,
          opacity: chat.loading || !input.trim() ? 0.5 : 1,
        }}>Send</button>
      </div>
    </div>
  );
}

// ─── SECTION: HOME ────────────────────────────────────────────────────────────
function HomeSection({ setSection }) {
  const cards = [
    { id: "audience", icon: "◎", label: "Audience Explorer", desc: "Compare segments across demographics, media habits, and attitudes." },
    { id: "survey", icon: "≡", label: "Survey Explorer", desc: "Explore wave-over-wave shifts in attitudes, barriers, and messaging." },
    { id: "personas", icon: "◉", label: "Persona Chat", desc: "Talk directly with AI personas grounded in campaign research." },
    { id: "planner", icon: "✦", label: "AI Strategy Planner", desc: "Get media mix, messaging angles, and campaign concepts from an AI strategist." },
    { id: "flowchart", icon: "▤", label: "Media Flowchart", desc: "See weekly flighting, spend by channel, and campaign phases." },
    { id: "performance", icon: "◈", label: "Performance Dashboard", desc: "Track spend, delivery, and conversions across all channels." },
  ];

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "12px", letterSpacing: "0.15em", color: CAMPAIGN.accent, fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
          {CAMPAIGN.client}
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#F1F5F9", lineHeight: 1.1, marginBottom: "12px", fontFamily: "'Georgia', serif" }}>
          {CAMPAIGN.campaign}
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "16px", marginBottom: "24px" }}>{CAMPAIGN.tagline}</p>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[["Budget", CAMPAIGN.budget], ["Flight", CAMPAIGN.flightDates], ["Market", CAMPAIGN.market]].map(([k, v]) => (
            <div key={k} style={{ background: "#1E293B", borderRadius: "10px", padding: "12px 18px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "11px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{k}</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#F1F5F9" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "16px" }}>
        {cards.map(c => (
          <button key={c.id} onClick={() => setSection(c.id)} style={{
            background: "#111827", border: "1px solid #1E293B", borderRadius: "14px",
            padding: "24px", textAlign: "left", cursor: "pointer",
            transition: "all 0.2s", color: "inherit",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = CAMPAIGN.accent; e.currentTarget.style.background = "#0F172A"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E293B"; e.currentTarget.style.background = "#111827"; }}
          >
            <div style={{ fontSize: "24px", marginBottom: "12px", color: CAMPAIGN.accent }}>{c.icon}</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#F1F5F9", marginBottom: "6px" }}>{c.label}</div>
            <div style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.5 }}>{c.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION: AUDIENCE ────────────────────────────────────────────────────────
function AudienceSection() {
  const [moduleIdx, setModuleIdx] = useState(0);
  const mod = CAMPAIGN.audienceModules[moduleIdx];

  return (
    <div>
      <SectionHeader icon="◎" title="Audience Explorer" sub="Compare target segments across research modules" />
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
        {CAMPAIGN.audienceModules.map((m, i) => (
          <button key={i} onClick={() => setModuleIdx(i)} style={{
            padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            background: i === moduleIdx ? CAMPAIGN.accent : "#1E293B",
            color: i === moduleIdx ? "white" : "#94A3B8",
          }}>{m.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {mod.data.map((row, i) => (
          <div key={i} style={{ background: "#111827", borderRadius: "12px", padding: "20px", border: "1px solid #1E293B" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#E2E8F0", fontWeight: 600 }}>{row.segment}</span>
              <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
                <span style={{ color: CAMPAIGN.accent, fontWeight: 700 }}>{row.value}% target</span>
                <span style={{ color: "#475569" }}>{row.benchmark}% benchmark</span>
              </div>
            </div>
            <div style={{ position: "relative", height: "8px", background: "#1E293B", borderRadius: "4px", marginBottom: "4px" }}>
              <div style={{ position: "absolute", height: "8px", borderRadius: "4px", background: "#334155", width: `${row.benchmark}%` }} />
              <div style={{ position: "absolute", height: "8px", borderRadius: "4px", background: CAMPAIGN.accent, width: `${row.value}%`, opacity: 0.85 }} />
            </div>
            <div style={{ fontSize: "12px", color: "#475569" }}>
              Index: {Math.round(row.value / row.benchmark * 100)} vs. general population
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", background: "#0F172A", borderRadius: "10px", padding: "14px 18px", border: "1px solid #1E293B", fontSize: "12px", color: "#475569" }}>
        Source: MRI-Simmons Spring 2026 · Target: {CAMPAIGN.target} · Market: {CAMPAIGN.market}
      </div>
    </div>
  );
}

// ─── SECTION: SURVEY ──────────────────────────────────────────────────────────
function SurveySection() {
  const [qIdx, setQIdx] = useState(0);
  const [wave, setWave] = useState(0);
  const q = CAMPAIGN.surveyQuestions[qIdx];
  const waveData = wave === 0 ? q.wave1 : q.wave2;
  const total = waveData.reduce((a, b) => a + b, 0);

  return (
    <div>
      <SectionHeader icon="≡" title="Survey Explorer" sub="Wave-over-wave tracking across attitudes, barriers, and messaging" />

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {CAMPAIGN.surveyWaves.map((w, i) => (
          <button key={i} onClick={() => setWave(i)} style={{
            padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            background: i === wave ? CAMPAIGN.accent : "#1E293B",
            color: i === wave ? "white" : "#94A3B8",
          }}>{w}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {CAMPAIGN.surveyQuestions.map((sq, i) => (
            <button key={i} onClick={() => setQIdx(i)} style={{
              background: i === qIdx ? CAMPAIGN.accentLight : "#111827",
              border: `1px solid ${i === qIdx ? CAMPAIGN.accent : "#1E293B"}`,
              borderRadius: "10px", padding: "12px", textAlign: "left", cursor: "pointer",
              color: i === qIdx ? CAMPAIGN.accentDark : "#94A3B8", fontSize: "13px", lineHeight: 1.4,
            }}>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px", opacity: 0.7 }}>{sq.category}</div>
              {sq.question}
            </button>
          ))}
        </div>

        <div style={{ background: "#111827", borderRadius: "14px", padding: "24px", border: "1px solid #1E293B" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#F1F5F9", marginBottom: "20px" }}>{q.question}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {q.labels.map((label, i) => {
              const pctVal = Math.round(waveData[i] / total * 100);
              const compare = wave === 1 ? Math.round(q.wave1[i] / q.wave1.reduce((a,b)=>a+b,0)*100) : null;
              const diff = compare !== null ? pctVal - compare : null;
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#CBD5E1", fontSize: "13px" }}>{label}</span>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      {diff !== null && (
                        <span style={{ fontSize: "11px", color: diff > 0 ? "#10B981" : diff < 0 ? "#EF4444" : "#64748B", fontWeight: 700 }}>
                          {diff > 0 ? "▲" : diff < 0 ? "▼" : "–"}{Math.abs(diff)}pp
                        </span>
                      )}
                      <span style={{ color: "#F1F5F9", fontWeight: 700, fontSize: "14px" }}>{pctVal}%</span>
                    </div>
                  </div>
                  <div style={{ background: "#1E293B", borderRadius: "4px", height: "8px" }}>
                    <div style={{ background: CAMPAIGN.accent, height: "8px", borderRadius: "4px", width: `${pctVal}%`, transition: "width 0.4s" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "16px", fontSize: "12px", color: "#475569" }}>n=1,000 per wave · {CAMPAIGN.market}</div>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: PERSONAS ────────────────────────────────────────────────────────
function PersonasSection() {
  const [selected, setSelected] = useState(null);
  const persona = selected !== null ? CAMPAIGN.personas[selected] : null;

  const chat = useChat(persona ? `You are ${persona.name}, ${persona.role}. ${persona.bio} Traits: ${persona.traits.join(", ")}. The campaign is: ${CAMPAIGN.campaign} targeting ${CAMPAIGN.target}. Stay fully in character. Be real, specific, and occasionally imperfect. Respond conversationally in 2-4 sentences.` : "");

  return (
    <div>
      <SectionHeader icon="◉" title="Persona Chat" sub="Talk with composite personas grounded in campaign research" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "12px", marginBottom: "28px" }}>
        {CAMPAIGN.personas.map((p, i) => (
          <button key={i} onClick={() => { setSelected(i); chat.clear(); }} style={{
            background: selected === i ? "#0F172A" : "#111827",
            border: `2px solid ${selected === i ? p.color : "#1E293B"}`,
            borderRadius: "14px", padding: "20px", textAlign: "left", cursor: "pointer",
          }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: "14px", marginBottom: "12px" }}>{p.avatar}</div>
            <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: "14px", marginBottom: "2px" }}>{p.name}</div>
            <div style={{ fontSize: "12px", color: "#64748B" }}>{p.role}</div>
          </button>
        ))}
      </div>

      {persona && (
        <div>
          <div style={{ background: "#111827", borderRadius: "14px", padding: "20px", marginBottom: "16px", border: "1px solid #1E293B" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: persona.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", flexShrink: 0 }}>{persona.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#F1F5F9", marginBottom: "4px" }}>{persona.name}, {persona.age} — {persona.role}</div>
                <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5, marginBottom: "10px" }}>{persona.bio}</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {persona.traits.map((t, i) => (
                    <span key={i} style={{ background: "#1E293B", color: "#94A3B8", borderRadius: "20px", padding: "3px 10px", fontSize: "11px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ChatUI chat={chat} placeholder={`Ask ${persona.name} anything about their life, habits, or what messaging would resonate…`} accentColor={persona.color} />
        </div>
      )}
    </div>
  );
}

// ─── SECTION: PLANNER ─────────────────────────────────────────────────────────
function PlannerSection() {
  const chat = useChat(`You are a senior media strategist and campaign planner. You have deep knowledge of the following campaign:
Client: ${CAMPAIGN.client}
Campaign: ${CAMPAIGN.campaign}
Target: ${CAMPAIGN.target}
Market: ${CAMPAIGN.market}
Budget: ${CAMPAIGN.budget}
Flight: ${CAMPAIGN.flightDates}
Channels available: ${CAMPAIGN.flowchart.channels.map(c => c.name).join(", ")}

Audience insights: ${JSON.stringify(CAMPAIGN.audienceModules)}
Survey data: ${JSON.stringify(CAMPAIGN.surveyQuestions)}
Personas: ${CAMPAIGN.personas.map(p => `${p.name} (${p.role}): ${p.bio}`).join(" | ")}

Give strategic, specific, data-grounded recommendations. Be direct and opinionated. Respond in 3-5 sentences unless the question warrants more detail.`);

  const starters = [
    "What channel mix would you recommend for this campaign?",
    "Which persona should we prioritize and why?",
    "What messaging angle is most likely to break through?",
    "How should we phase the campaign across the 12-week flight?",
  ];

  return (
    <div>
      <SectionHeader icon="✦" title="AI Strategy Planner" sub="Chat with an AI strategist who knows this campaign's data" />
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {starters.map((s, i) => (
          <button key={i} onClick={() => chat.send(s)} style={{
            background: "#1E293B", border: "1px solid #334155", borderRadius: "8px",
            padding: "8px 14px", fontSize: "12px", color: "#94A3B8", cursor: "pointer",
          }}>{s}</button>
        ))}
      </div>
      <ChatUI chat={chat} placeholder="Ask about media mix, messaging strategy, audience prioritization, campaign phasing…" accentColor={CAMPAIGN.accent} />
    </div>
  );
}

// ─── SECTION: FLOWCHART ───────────────────────────────────────────────────────
function FlowchartSection() {
  const { channels, weekLabels, phases } = CAMPAIGN.flowchart;
  const totalBudget = channels.reduce((a, c) => a + c.budget, 0);

  return (
    <div>
      <SectionHeader icon="▤" title="Media Flowchart" sub="Weekly flighting across all channels with budget allocation" />

      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {phases.map((p, i) => (
          <div key={i} style={{ flex: 1, minWidth: "120px", background: "#111827", border: "1px solid #1E293B", borderRadius: "10px", padding: "12px 16px" }}>
            <div style={{ fontSize: "10px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Phase {i+1}</div>
            <div style={{ fontWeight: 700, color: "#F1F5F9" }}>{p}</div>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>Wks {i*4+1}–{i*4+4}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#111827", borderRadius: "14px", padding: "24px", border: "1px solid #1E293B", overflowX: "auto" }}>
        <div style={{ minWidth: "600px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "160px repeat(12, 1fr)", gap: "4px", marginBottom: "8px" }}>
            <div />
            {weekLabels.map((w, i) => (
              <div key={i} style={{ fontSize: "10px", color: "#475569", textAlign: "center", fontWeight: 700 }}>{w}</div>
            ))}
          </div>

          {channels.map((ch, ci) => (
            <div key={ci} style={{ display: "grid", gridTemplateColumns: "160px repeat(12, 1fr)", gap: "4px", marginBottom: "6px", alignItems: "center" }}>
              <div style={{ fontSize: "12px", color: "#CBD5E1", fontWeight: 600, paddingRight: "8px" }}>{ch.name}</div>
              {ch.weeks.map((w, wi) => (
                <div key={wi} style={{
                  height: "28px", borderRadius: "4px",
                  background: w === 0 ? "#0F172A" : w === 1 ? ch.color + "60" : ch.color,
                  border: w > 0 ? `1px solid ${ch.color}40` : "none",
                }} />
              ))}
            </div>
          ))}

          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #1E293B", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[{label:"Light activity", color:"#334155"},{label:"Heavy activity",color:CAMPAIGN.accent}].map((l,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:"#64748B"}}>
                <div style={{width:"16px",height:"10px",borderRadius:"2px",background:l.color}} />{l.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: "10px", marginTop: "20px" }}>
        {channels.map((ch, i) => (
          <div key={i} style={{ background: "#111827", borderRadius: "10px", padding: "14px", border: `1px solid ${ch.color}30` }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: ch.color, marginBottom: "8px" }} />
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#F1F5F9", marginBottom: "2px" }}>{ch.name}</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: ch.color }}>{usd(ch.budget)}</div>
            <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>{Math.round(ch.budget/totalBudget*100)}% of budget</div>
          </div>
        ))}
        <div style={{ background: "#0F172A", borderRadius: "10px", padding: "14px", border: "1px solid #334155" }}>
          <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "4px" }}>Total Budget</div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: "#F1F5F9" }}>{usd(totalBudget)}</div>
          <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>12-week flight</div>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: PERFORMANCE ─────────────────────────────────────────────────────
function PerformanceSection() {
  const { summary, channels, weeklySpend } = CAMPAIGN.performance;
  const maxSpend = Math.max(...weeklySpend);

  return (
    <div>
      <SectionHeader icon="◈" title="Campaign Performance" sub="Live spend, delivery, and conversion tracking across all channels" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", gap: "10px", marginBottom: "28px" }}>
        {[
          ["Spend to Date", usd(summary.spend), "of " + CAMPAIGN.budget],
          ["Impressions", fmt(summary.impressions), "total delivered"],
          ["Clicks", fmt(summary.clicks), "link clicks"],
          ["Conversions", fmt(summary.conversions), "actions taken"],
          ["CTR", `${summary.ctr}%`, "avg click-through"],
          ["CPA", usd(summary.cpa), "cost per action"],
        ].map(([k, v, sub]) => (
          <div key={k} style={{ background: "#111827", borderRadius: "12px", padding: "16px", border: "1px solid #1E293B" }}>
            <div style={{ fontSize: "11px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>{k}</div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: CAMPAIGN.accent }}>{v}</div>
            <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#111827", borderRadius: "14px", padding: "24px", marginBottom: "20px", border: "1px solid #1E293B" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8", marginBottom: "16px" }}>Weekly Spend</div>
        <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "80px" }}>
          {weeklySpend.map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{
                width: "100%", background: s > 0 ? CAMPAIGN.accent : "#1E293B",
                borderRadius: "3px 3px 0 0", height: `${s / maxSpend * 70}px`,
                opacity: s === 0 ? 0.2 : 0.85,
              }} />
              <span style={{ fontSize: "9px", color: "#475569" }}>W{i+1}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", gap: "8px", padding: "8px 12px", fontSize: "10px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          <span>Channel</span><span>Spend</span><span>Impr.</span><span>Clicks</span><span>Conv.</span><span>CPA</span>
        </div>
        {channels.map((ch, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", gap: "8px", padding: "12px", background: "#111827", borderRadius: "10px", border: "1px solid #1E293B", fontSize: "13px" }}>
            <span style={{ color: "#F1F5F9", fontWeight: 600 }}>{ch.name}</span>
            <span style={{ color: "#CBD5E1" }}>{usd(ch.spend)}</span>
            <span style={{ color: "#CBD5E1" }}>{fmt(ch.impressions)}</span>
            <span style={{ color: "#CBD5E1" }}>{fmt(ch.clicks)}</span>
            <span style={{ color: "#CBD5E1" }}>{ch.conversions}</span>
            <span style={{ color: ch.cpa < 30 ? "#10B981" : ch.cpa < 45 ? "#F59E0B" : "#EF4444", fontWeight: 700 }}>{usd(ch.cpa)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SHARED: SECTION HEADER ───────────────────────────────────────────────────
function SectionHeader({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ fontSize: "24px", marginBottom: "8px", color: CAMPAIGN.accent }}>{icon}</div>
      <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#F1F5F9", marginBottom: "4px" }}>{title}</h2>
      <p style={{ fontSize: "14px", color: "#64748B" }}>{sub}</p>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState("home");

  const sections = {
    home: <HomeSection setSection={setSection} />,
    audience: <AudienceSection />,
    survey: <SurveySection />,
    personas: <PersonasSection />,
    planner: <PlannerSection />,
    flowchart: <FlowchartSection />,
    performance: <PerformanceSection />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0A0F1A", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#F1F5F9", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", flexShrink: 0, background: "#060B14", borderRight: "1px solid #1E293B", display: "flex", flexDirection: "column", padding: "20px 0" }}>
        <div style={{ padding: "0 16px 20px", borderBottom: "1px solid #1E293B", marginBottom: "12px" }}>
          <div style={{ width: "36px", height: "36px", background: CAMPAIGN.accent, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "14px", color: "white", marginBottom: "10px" }}>{CAMPAIGN.logo}</div>
          <div style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.4 }}>{CAMPAIGN.client}</div>
          <div style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600, lineHeight: 1.3, marginTop: "2px" }}>Campaign Hub</div>
        </div>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => setSection(item.id)} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 16px", background: section === item.id ? CAMPAIGN.accentLight + "15" : "none",
            border: "none", borderLeft: `3px solid ${section === item.id ? CAMPAIGN.accent : "transparent"}`,
            cursor: "pointer", textAlign: "left", width: "100%",
            color: section === item.id ? CAMPAIGN.accent : "#64748B",
            fontSize: "13px", fontWeight: section === item.id ? 700 : 400,
            transition: "all 0.15s",
          }}>
            <span style={{ fontSize: "14px" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #1E293B" }}>
          <div style={{ fontSize: "10px", color: "#334155", lineHeight: 1.5 }}>
            {CAMPAIGN.flightDates}<br />{CAMPAIGN.budget} budget
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "40px clamp(20px,4vw,48px)" }}>
        {sections[section]}
      </div>
    </div>
  );
}

