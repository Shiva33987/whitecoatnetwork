const API_BASE =
  window.WHITE_COAT_API ||
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api"
    : "/api");

const fallbackData = {
  topPick: {
    summary:
      "White Coat Stories connects doctors, hospitals, and healthcare innovators through high-trust discovery, collaboration programs, and expert-led education.",
    highlights: [
      "Verified clinical profiles with outcomes-led highlights",
      "Integrated knowledge flow through talks and journal channels",
      "Structured recognition framework with transparent award criteria"
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

const state = {
  directory: [],
  activeSpecialty: "All",
  activeState: "All",
  search: ""
};


function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

async function fetchJSON(endpoint) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed request: ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Using fallback for ${endpoint}`, error);
    return null;
  }
}

function renderTopPick(topPick) {
  const summary = document.getElementById("top-pick-summary");
  const highlights = document.getElementById("top-pick-highlights");
  const stats = document.getElementById("network-stats");

  summary.textContent = topPick.summary;

  highlights.innerHTML = topPick.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");

  stats.innerHTML = topPick.stats
    .map(
      (stat) => `
        <article class="stat">
          <strong data-counter="${stat.value}">0</strong>
          <span>${stat.label}</span>
        </article>
      `
    )
    .join("");

  animateCounters();
}

function renderTalks(talks) {
  const container = document.getElementById("talks-list");
  container.innerHTML = talks
    .map(
      (talk) => `
      <article class="card" data-tilt>
        <p class="meta">${talk.specialty} | ${talk.schedule}</p>
        <h3>${talk.title}</h3>
        <p>${talk.focus}</p>
        <p class="muted">Speaker: ${talk.speaker}</p>
      </article>
    `
    )
    .join("");
}

function renderAwards(awards) {
  const container = document.getElementById("awards-list");
  container.innerHTML = awards
    .map(
      (award) => `
      <article class="card">
        <p class="meta">${award.cycle}</p>
        <h3>${award.title}</h3>
        <p>${award.description}</p>
        <p class="muted">Criteria: ${award.criteria}</p>
      </article>
    `
    )
    .join("");
}

function renderDirectoryFilters() {
  const specialtyContainer = document.getElementById("specialty-filters");
  const stateContainer = document.getElementById("state-filters");

  // State Filters
  const states = ["All", "Telangana", "Andhra Pradesh"];
  stateContainer.innerHTML = states
    .map(
      (stateName) => `
      <button class="chip ${
        stateName === state.activeState ? "active" : ""
      }" data-state="${stateName}">${stateName}</button>
    `
    )
    .join("");

  // Specialty Filters
  const specialties = [
    "All",
    ...new Set(state.directory.map((doctor) => doctor.specialty))
  ];

  specialtyContainer.innerHTML = specialties
    .map(
      (specialty) => `
      <button class="chip ${
        specialty === state.activeSpecialty ? "active" : ""
      }" data-specialty="${specialty}">${specialty}</button>
    `
    )
    .join("");

  // Event Listeners
  stateContainer.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.activeState = chip.dataset.state;
      renderDirectoryFilters();
      renderDirectoryCards();
    });
  });

  specialtyContainer.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.activeSpecialty = chip.dataset.specialty;
      renderDirectoryFilters();
      renderDirectoryCards();
    });
  });
}


function filteredDirectory() {
  const query = state.search.trim().toLowerCase();

  return state.directory.filter((doctor) => {
    const specialtyPass =
      state.activeSpecialty === "All" ||
      doctor.specialty === state.activeSpecialty;

    const statePass =
      state.activeState === "All" || doctor.location.includes(state.activeState);

    const searchPass =
      !query ||
      [doctor.name, doctor.specialty, doctor.location, doctor.hospital]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return specialtyPass && statePass && searchPass;
  });
}


function renderDirectoryCards() {
  const container = document.getElementById("directory-list");
  const filtered = filteredDirectory();

  if (!filtered.length) {
    container.innerHTML =
      '<div class="directory-empty">No matching doctors found. Try another specialty or search keyword.</div>';
    return;
  }

  container.innerHTML = filtered
    .map(
      (doctor) => `
      <article class="doctor-card" data-tilt>
        <h3 class="doctor-name">${doctor.name}</h3>
        <div class="doctor-tags">
          <span class="tag tag-specialty">${doctor.specialty}</span>
          <span class="tag tag-availability">${doctor.availability}</span>
        </div>
        <p class="muted">${doctor.hospital} | ${doctor.location}</p>
        <p class="muted">Experience: ${doctor.experience} | Rating: ${doctor.rating}</p>
        <a class="button" href="#">Book Consultation</a>
      </article>
    `
    )
    .join("");
}

function renderJournal(journal) {
  const feature = journal[0];
  const rest = journal.slice(1);

  const featureContainer = document.getElementById("journal-feature");
  const listContainer = document.getElementById("journal-list");

  if (feature) {
    featureContainer.innerHTML = `
      <span class="tag tag-specialty">${feature.tag}</span>
      <h3>${feature.title}</h3>
      <p>${feature.summary}</p>
      <p class="journal-meta">${feature.author} | ${feature.readTime} | ${feature.publishedAt}</p>
    `;
  }

  listContainer.innerHTML = rest
    .map(
      (article) => `
      <article class="journal-item">
        <p class="meta">${article.tag}</p>
        <h3>${article.title}</h3>
        <p class="muted">${article.summary}</p>
        <p class="journal-meta">${article.author} | ${article.readTime} | ${article.publishedAt}</p>
      </article>
    `
    )
    .join("");
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-counter"));
    let current = 0;
    const step = Math.max(1, Math.floor(target / 55));

    const tick = () => {
      current = Math.min(target, current + step);
      counter.textContent = formatNumber(current);
      if (current < target) {
        requestAnimationFrame(tick);
      }
    };

    tick();
  });
}

function initRevealAnimations() {
  const sections = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initTiltEffects() {
  const tiltable = document.querySelectorAll("[data-tilt]");

  tiltable.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = (x / rect.width - 0.5) * 7;
      const rotateX = (y / rect.height - 0.5) * -7;
      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

function initParallax() {
  const hero = document.querySelector(".hero");
  const blobs = document.querySelectorAll(".blob");
  if (!hero || !blobs.length) {
    return;
  }

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    blobs.forEach((blob, index) => {
      const depth = (index + 1) * 12;
      blob.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    blobs.forEach((blob) => {
      blob.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

function bindDirectorySearch() {
  const input = document.getElementById("directory-search");
  input.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderDirectoryCards();
  });
}

function initSmartHeader() {
  const header = document.querySelector(".site-header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 150) {
      header.classList.add("nav-hidden");
    } else {
      header.classList.remove("nav-hidden");
    }
    lastScrollY = window.scrollY;
  });
}

async function bootstrap() {
  const [topPick, talks, awards, directory, journal] = await Promise.all([
    fetchJSON("/network/top-pick"),
    fetchJSON("/talks"),
    fetchJSON("/awards"),
    fetchJSON("/directory"),
    fetchJSON("/journal")
  ]);

  const mergedData = {
    topPick: topPick || fallbackData.topPick,
    talks: talks || fallbackData.talks,
    awards: awards || fallbackData.awards,
    directory: directory || fallbackData.directory,
    journal: journal || fallbackData.journal
  };

  state.directory = mergedData.directory;

  renderTopPick(mergedData.topPick);
  renderTalks(mergedData.talks);
  renderAwards(mergedData.awards);
  renderDirectoryFilters();
  renderDirectoryCards();
  renderJournal(mergedData.journal);

  bindDirectorySearch();
  initRevealAnimations();
  initTiltEffects();
  initParallax();
  initSmartHeader();
}

document.addEventListener("DOMContentLoaded", bootstrap);
