// src/data/projects.ts

export interface Project {
  title: string;
  role?: string;
  description: string;
  contributions?: string[];
  techStack: string[];
  link?: string;
  github?: string;
  image?: string;
  video?: string;
}

export const projects: Project[] = [
  {
    title: "Subliminal Sarcasm Studios",
    role: "Founder & Technical Director",
    description: "An independent game development studio I established as an LLC in New York, dedicated to creating immersive, systems-driven experiences across PC, VR, and MR platforms.",
    link: "https://SubliminalSarcasmStudios.com", // Your studio website link
    contributions: [
      "Managed full lifecycle business operations, branding, and formal LLC establishment",
      "Directed technical architecture, game design, and production timelines for all in-house titles",
      "Cultivated a unified brand identity bridging our gaming titles and corporate web presence"
    ],
    techStack: ["Business Development", "Game Direction", "Project Management", "Branding"],
  },
  {
    title: "Void Runner", // Updated name
    role: "Lead Developer",
    description: "A fast-paced 3D flying arcade shooter featuring dynamic environments and tight aerial combat mechanics.",
    image: "/images/void-runner.jpg",
    link: "https://subliminalsarcasmstudios.com/void-runner", // READY FOR YOUR LINK
    contributions: [
      "Engineered 6DOF (Six Degrees of Freedom) flight mechanics and camera controls",
      "Implemented enemy AI and targeting systems for arcade-style gameplay"
    ],
    techStack: ["Unity", "C#", "3D Math"],
  },
  {
    title: "Syn City",
    role: "Lead Developer",
    description: "An in-development title under Subliminal Sarcasm Studios.",
    image: "/images/syn-city.jpg",
    link: "https://subliminalsarcasmstudios.com/syn-city", // READY FOR YOUR LINK
    contributions: [
      "Engineered core gameplay loop and mechanics",
      "Implemented state machines for character states",
      "Managed project scope and technical architecture"
    ],
    techStack: ["Unity", "C#", "Game Design"],
  },
  {
    title: "Ad-Opt",
    role: "Software Engineer",
    description: "A 3D visualization tool designed to simulate and optimize advertising placements within virtual spaces.",
    contributions: [
      "Developed 3D rendering pipelines for dynamic ad insertion",
      "Created an interactive UI for users to test spatial layouts and visual impact"
    ],
    techStack: ["Unity", "C#", "UI/UX Design"],
  },
  {
    title: "Roxy's Renegade",
    role: "Indie Developer",
    description: "A 2D platformer featuring tight controls and custom level design. Awarded 2nd place at a local game jam.",
    contributions: [
      "Designed responsive 2D platforming physics and player controllers",
      "Built level geometry and implemented core gameplay state loops"
    ],
    techStack: ["Godot", "C#", "Level Design"],
  },
  {
    title: "The Donner Party... Game?",
    role: "Full Stack Developer",
    description: "A multiplayer, web-based survival game inspired by 'The Oregon Trail' featuring real-time interactions.",
    video: "/videos/donner-party.mp4",
    link: "https://subliminalsarcasmstudios.com/donner-party", // Kept GitHub here as requested
    contributions: [
      "Built real-time multiplayer networking using Socket.IO",
      "Integrated Phaser.js for the client-side game engine",
      "Designed and deployed the MongoDB database schema"
    ],
    techStack: ["MERN", "Phaser", "Socket.IO", "MongoDB"],
  },
  {
    title: "Navigating Tensions (VR Research)",
    role: "VR Developer / Researcher",
    description: "A serious game for library de-escalation training, presented at the 2025 ASIS&T Annual Meeting.",
    link: "https://asist.org/...", // Kept original link
    contributions: [
      "Programmed VR interactions using Unreal Engine Blueprints",
      "Designed immersive training scenarios based on psychological research"
    ],
    techStack: ["Unreal Engine", "Blueprints", "VR Interaction"],
  },
  {
    title: "MR Geometric Defender",
    role: "XR Developer",
    description: "A Mixed Reality arcade shooter inspired by Geometry Wars, designed specifically for the Meta Quest 3.",
    link: "https://subliminalsarcasmstudios.com/geometry-defenders", // Swapped GitHub for live link
    contributions: [
      "Integrated Meta XR SDK for spatial tracking and passthrough environments",
      "Programmed procedural enemy spawning logic and particle collision effects"
    ],
    techStack: ["Unity", "Meta XR SDK", "C#"],
  },
  {
    title: "Project Aigis",
    description: "A hybrid First-Person Shooter and Tower Defense game featuring complex AI pathfinding.",
    link: "https://subliminalsarcasmstudios.com/fptd-bugs",
    techStack: ["Unity", "C#", "AI Navigation"],
  },
  {
    title: "Triple S Web Services",
    role: "Founder & Full Stack Developer",
    description: "The B2B web development branch of my LLC, focused on delivering full-stack business solutions, encompassing custom front-end architecture and secure backend databases.",
    link: "https://tripleswebservices.com", // Add the Triple S site link here if you have one
    contributions: [
      "Engineered a comprehensive admin dashboard to securely manage client leads and internal database operations",
      "Developed and deployed modern, responsive websites for local businesses and corporate clients",
      "Architected robust SQL databases and resolved strict TypeScript/ESLint typing across front-end systems"
    ],
    techStack: ["TypeScript", "React", "SQL", "Node.js"],
  },
];