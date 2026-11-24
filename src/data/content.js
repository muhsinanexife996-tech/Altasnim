export const navLinks = [
  { label: "Home", href: "#home", sub: "Welcome" },
  { label: "About Us", href: "#about", sub: "Who we are" },
  { label: "Projects", href: "#projects", sub: "Our work" },
  { label: "Mining Operations", href: "#operations", sub: "What we do" },
  { label: "Management", href: "#management", sub: "Our team" },
  { label: "News", href: "#news", sub: "Latest updates" },
  { label: "Media", href: "#media", sub: "Gallery" },
];
export const contactLink = { label: "Contact Us", href: "#contact" };

export const heroSlides = [
  { ph: "ph-pit",  lines: ["Mineral Exploration &", "Mining Operations", "in Saudi Arabia"] },
  { ph: "ph-haul", lines: ["Operational Experience", "Backed by the", "Al Tasnim Group"] },
  { ph: "ph-hill", lines: ["Exploring Potential", "Delivering", "Operations"] },
];

export const introPics = ["ph-worker", "ph-tyre", "ph-hillgrey"];

export const footprint = [
  { end: 9,   lines: ["Exploration blocks", "in the portfolio"] },
  { end: 770, suffix: "km²", lines: ["Nominal", "block area"] },
  { end: 4,   lines: ["Round 9", "licences held"] },
  { end: 5,   lines: ["Round 10", "blocks awarded"] },
];

export const services = [
  {
    num: "01",
    title: "Mineral Exploration",
    text: "Nine blocks across Qassim, Madinah and Riyadh, four of them Round 9 licences carrying inherited exploration datasets. Work is geological mapping, surface sampling, database and remote-sensing interpretation, and independent technical evaluation of the historical record.",
  },
  {
    num: "02",
    title: "Contract Mining",
    text: "Production drilling and blasting, excavation and loading, haulage and material handling, haul roads and pit support, and the maintenance, fuel and reporting systems behind them — delivered to the licence holder’s mine plan.",
  },
];

export const saudiFocus = {
  titleLines: ["Saudi Focus", "Al Tasnim Group", "Strength"],
  text: "Al Tasnim Gulf is the group’s Saudi mining company. What the group supplies is practical: machines, workshops, supply lines and people.",
  end: 50,
  captionLines: ["Years since", "Al Tasnim Group", "was founded", "in Oman"],
};

export const groupStats = [
  { end: 25000, lines: ["People across", "the group"] },
  { end: 6000,  lines: ["Owned vehicles,", "plant and", "equipment"] },
  { end: 500,   lines: ["Civil construction", "projects", "delivered"] },
];

export const groupNote =
  "Group figures as reported in the Al Tasnim corporate presentation and mining division profile, August 2026. Group headcount is stated as 25,000+ in those documents and as 30,000+ in the brand guidelines; the lower figure is used here.";

export const news = [
  {
    date: "November 7, 2025",
    img: "/images/news-1.jpg",
    title: ["Lorem ipsum dolor", "sit amet, consectetuer"],
    desc: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
      "sed diam nonummy nibh euismod tincidunt",
    ],
    href: "#",
  },
  {
    date: "December 13, 2025",
    img: "/images/news-2.jpg",
    title: ["Lorem ipsum dolor", "sit amet, consectetuer"],
    desc: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
      "sed diam nonummy nibh euismod tincidunt",
    ],
    href: "#",
  },
  {
    date: "March 22, 2026",
    img: "/images/news-3.jpg",
    title: ["Lorem ipsum dolor", "sit amet, consectetuer"],
    desc: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
      "sed diam nonummy nibh euismod tincidunt",
    ],
    href: "#",
  },
];

export const footer = {
  about:
    "Mineral exploration and contract open-pit mining in the Kingdom of Saudi Arabia, supported by the operational experience and equipment resources of Al Tasnim Group.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "About us", href: "#about" },
        { label: "Leadership & organisation", href: "#about" },
        { label: "Mining operations", href: "#services" },
      ],
    },
    {
      title: "Projects",
      links: [
        { label: "Exploration portfolio", href: "#footprint" },
        { label: "ATG-01 · Darat Al Jibu", href: "#footprint" },
        { label: "ATG-02 · Jardawiyah group", href: "#footprint" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "News", href: "#news" },
        { label: "Media centre", href: "#news" },
        { label: "Contact us", href: "#contact" },
      ],
    },
  ],
  social: [
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "X", href: "#", icon: "x" },
    { name: "YouTube", href: "#", icon: "youtube" },
  ],
  copy: "© 2026 Al Tasnim Gulf Ltd. All rights reserved.",
};