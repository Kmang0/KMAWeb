export type Experience = {
  organization: string;
  role: string;
  date: string;
  summary: string;
  contributions: string[];
  teamOutcomes: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    organization: "NYU GRAIL",
    role: "Undergraduate Researcher",
    date: "Spring 2026–Present",
    summary:
      "Researching embodied robot intelligence at NYU's Generalizable Robotics and Artificial Intelligence Lab under Professor Lerrel Pinto, with interests in robot dexterity, full-body mobile platforms, and expressive bipeds.",
    contributions: [
      "Reinforced and tested RUKA-v2 hand and wrist hardware while running teleoperation experiments and contributing inverse-kinematics calculations and retargeting.",
      "Leads aesthetics for YOR v3 while implementing charging-dock mechanics, dock electronics, and dock-detection charging safety in preparation for a consumer-ready platform.",
      "Contributes to BEBOP's physical design, URDF development, and reinforcement-learning policy experiments.",
    ],
    teamOutcomes: [
      "RUKA-v2 was released as published open-source research by the project team.",
      "YOR v3 and BEBOP remain active lab projects; YOR v3 is being developed toward a consumer-ready release.",
      "BEBOP has begun its sim-to-real journey: its policies work in simulation, while the physical robot can currently stand but does not yet walk.",
    ],
    technologies: [
      "Robotics hardware",
      "URDF",
      "Sim-to-real",
      "Policy Development",
      "Reinforcement learning",
    ],
  },
  {
    organization: "Rose City Robotics",
    role: "Robotics Intern",
    date: "Spring–Summer 2025",
    summary:
      "Worked across autonomous navigation, simulation-driven development, and technical representation for a robotics company.",
    contributions: [
      "Developed SLAM-based robotics systems on the TurtleBot Waffle Pi platform.",
      "Built simulated training environments with NVIDIA Isaac Sim and Isaac Lab.",
      "Represented Rose City Robotics at the 2025 Oregon Innovation Showcase, speaking with other entrepreneurs and potential investors.",
      "Helped shape an introductory robotics course that would expose younger students to methods emerging at the frontiers of the robotics industry.",
      "Expanded the startup's outreach to local high-school students and Portland-area Asian American communities through relationships and community channels developed while growing up Chinese American in the area.",
    ],
    teamOutcomes: [
      "The internship supported the company's robotics development and public technical demonstration work.",
      "Rose City Robotics launched the course concept as a free summer program for middle-school students and later expanded it into the AI Robotics Sprint for intermediate roboticists entering policy training.",
    ],
    technologies: [
      "SLAM",
      "Simulation",
      "Project leadership",
      "Outreach",
    ],
  },
];
