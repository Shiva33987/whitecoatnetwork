const http = require("http");
const { URL } = require("url");

const data = {
  topPick: {
    summary:
      "White Coat Network is a premium doctors-first ecosystem that combines verified visibility, education-led influence, and trusted patient discovery.",
    highlights: [
      "Verified doctor profiles with specialty-level ranking signals",
      "Thought leadership engine through talks and journal publishing",
      "Recognition structure that aligns with ethics, outcomes, and innovation"
    ],
    stats: [
      { label: "Verified Doctors", value: 18500 },
      { label: "Partner Hospitals", value: 420 },
      { label: "Monthly Talk Sessions", value: 130 },
      { label: "Journal Reads", value: 240000 }
    ]
  },
  talks: [
    {
      title: "Future of Preventive Cardiology in Tier-2 Cities",
      speaker: "Dr. Meera Anand",
      specialty: "Cardiology",
      schedule: "Friday 7:00 PM IST",
      focus: "Risk modeling, continuity-of-care plans, and scalable tele-follow-up pathways."
    },
    {
      title: "Clinical AI Triage Without Workflow Fatigue",
      speaker: "Dr. Arjun Kaul",
      specialty: "Emergency Medicine",
      schedule: "Saturday 8:30 PM IST",
      focus: "How to implement AI-assisted triage while preserving bedside speed and judgment."
    },
    {
      title: "Evidence-Led Recovery Protocols for Orthopedic Practice",
      speaker: "Dr. Nisha Venkataraman",
      specialty: "Orthopedics",
      schedule: "Sunday 6:00 PM IST",
      focus: "Post-op mobility frameworks and home-based adherence monitoring systems."
    }
  ],
  awards: [
    {
      title: "Clinical Excellence in Patient Outcomes",
      description: "Recognizes sustained improvements in outcomes, safety metrics, and follow-up adherence.",
      criteria: "Peer-validated outcomes across 12 months",
      cycle: "Annual"
    },
    {
      title: "Digital Innovation in Healthcare Delivery",
      description: "Honors practical digital systems that improved turnaround time and care quality.",
      criteria: "Measured impact across workflow KPIs",
      cycle: "Biannual"
    },
    {
      title: "Compassion and Community Leadership",
      description: "Celebrates doctors driving medical awareness, mentorship, and ethical care access.",
      criteria: "Community impact evidence + testimonials",
      cycle: "Annual"
    }
  ],
  directory: [
    {
      name: "Dr. Rohan Malhotra",
      specialty: "Cardiology",
      hospital: "Aster Prime Heart Center",
      location: "Hyderabad",
      experience: "14 years",
      rating: "4.9",
      availability: "Consulting Today"
    },
    {
      name: "Dr. Sneha Kapoor",
      specialty: "Dermatology",
      hospital: "Luma Skin Institute",
      location: "Bengaluru",
      experience: "11 years",
      rating: "4.8",
      availability: "Available Tomorrow"
    },
    {
      name: "Dr. Vikram Rao",
      specialty: "Orthopedics",
      hospital: "Axis Ortho Care",
      location: "Mumbai",
      experience: "16 years",
      rating: "4.9",
      availability: "Consulting This Week"
    },
    {
      name: "Dr. Lavanya Iyer",
      specialty: "Pediatrics",
      hospital: "Bloom Child Health",
      location: "Chennai",
      experience: "9 years",
      rating: "4.7",
      availability: "Consulting Today"
    },
    {
      name: "Dr. Farhan Siddiqui",
      specialty: "Neurology",
      hospital: "NeuroSphere Medical",
      location: "Delhi",
      experience: "13 years",
      rating: "4.8",
      availability: "Available Tomorrow"
    },
    {
      name: "Dr. Aditi Sen",
      specialty: "Gynecology",
      hospital: "HerCare Collective",
      location: "Kolkata",
      experience: "12 years",
      rating: "4.8",
      availability: "Consulting This Week"
    }
  ],
  journal: [
    {
      title: "Designing Better Referral Pathways Through Data-Sharing Standards",
      author: "Editorial Board",
      tag: "Systems",
      summary: "A practical guide to multi-hospital referral workflows with compliant data transfer models.",
      readTime: "8 min read",
      publishedAt: "April 2026"
    },
    {
      title: "Pragmatic Framework for AI-Assisted Radiology Reporting",
      author: "Dr. Ira Dutta",
      tag: "Clinical AI",
      summary: "When to automate, when to review, and how to keep medico-legal reliability high.",
      readTime: "6 min read",
      publishedAt: "March 2026"
    },
    {
      title: "Building Patient Trust Through Transparent Treatment Narratives",
      author: "Dr. Kunal Bedi",
      tag: "Patient Care",
      summary: "Communication models that improve adherence, clarity, and long-term clinical relationships.",
      readTime: "5 min read",
      publishedAt: "March 2026"
    },
    {
      title: "How Specialty Communities Can Scale Mentorship Digitally",
      author: "Dr. Smriti Nair",
      tag: "Leadership",
      summary: "A blueprint for mentorship circles, case-based learning, and professional growth loops.",
      readTime: "7 min read",
      publishedAt: "February 2026"
    }
  ]
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

const routeHandlers = {
  "/api/health": () => ({
    status: "ok",
    service: "white-coat-backend",
    date: new Date().toISOString()
  }),
  "/api/network/top-pick": () => data.topPick,
  "/api/talks": () => data.talks,
  "/api/awards": () => data.awards,
  "/api/directory": () => data.directory,
  "/api/journal": () => data.journal
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, { message: "Method not allowed" });
    return;
  }

  const handler = routeHandlers[url.pathname];

  if (!handler) {
    sendJson(res, 404, { message: "Route not found" });
    return;
  }

  sendJson(res, 200, handler());
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`White Coat backend is running on port ${PORT}`);
});
