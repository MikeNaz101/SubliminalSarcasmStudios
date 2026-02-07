// src/data/projects.ts

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "Subliminal Sarcasm Studios",
    description: "My indie game studio formed as an LLC in New York. Currently developing a portfolio of immersive titles.",
    techStack: ["Business Development", "Game Design", "Branding"],
    link: "https://subliminalsarcasm.com", // Replace if you have the link ready
  },
  {
    title: "The Donner Party... Game?",
    description: "A multiplayer, web-based survival game inspired by 'The Oregon Trail'. Features real-time interactions.",
    techStack: ["MERN Stack", "Phaser", "Socket.IO", "MongoDB"],
    github: "https://github.com/yourusername/donner-party",
  },
  {
    title: "MR Geometric Defender",
    description: "A Mixed Reality arcade shooter inspired by Geometry Wars, designed for Meta Quest.",
    techStack: ["Unity", "Meta XR SDK", "C#"],
    github: "https://github.com/yourusername/mr-defender",
  },
  {
    title: "Navigating Tensions (VR Research)",
    description: "A serious game for library de-escalation training, presented at the 2025 ASIS&T Annual Meeting.",
    techStack: ["Unreal Engine", "Blueprints", "VR Interaction"],
    link: "https://asist.org/...", // specific link if you have one
  },
  {
    title: "FPS Tower Defense",
    description: "A hybrid First-Person Shooter and Tower Defense game featuring complex AI pathfinding.",
    techStack: ["Unity", "C#", "AI Navigation"],
  },
];