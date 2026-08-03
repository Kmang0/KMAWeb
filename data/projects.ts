export const PROJECT_STATUSES = [
  "Published",
  "Complete",
  "In Progress",
] as const;

export const PROJECT_CATEGORIES = [
  "Robotics",
  "Mechanical Design",
  "Control/RL",
  "Simulation",
  "Software",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectLink = {
  label: "Repository" | "Paper" | "Project site" | "Media";
  href: string;
};

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "video";
      src: string;
      title: string;
      caption?: string;
    }
  | {
      type: "youtube";
      src: string;
      title: string;
      caption?: string;
    };

export type Project = {
  id: string;
  title: string;
  date: string;
  status: ProjectStatus;
  currentWork: boolean;
  categories: ProjectCategory[];
  technologies: string[];
  purpose: string;
  role: string;
  challenge: string;
  contributions: string[];
  systemDesign: string[];
  teamOutcomes: string[];
  links?: ProjectLink[];
  repositoryComingSoon?: boolean;
  mediaComingSoon?: boolean;
  media?: ProjectMedia[];
};

export const projects: Project[] = [
  {
    id: "yor-v3",
    title: "YOR v3",
    date: "Spring 2026–Present",
    status: "In Progress",
    currentWork: true,
    repositoryComingSoon: true,
    media: [
      {
        type: "image",
        src: "/media/yor-v3-yann-lecun-feature.png",
        alt: "LinkedIn post showing Yann LeCun featuring the YOR v3 robot",
        caption: "As featured by Yan Lecun!! Aesthetics done by me.",
      },
      {
        type: "video",
        src: "/media/yor-v3-policy-deployment.mp4",
        title: "YOR v3 policy deployment",
        caption: "Deployment of some other policies onto the robot.",
      },
    ],
    categories: ["Robotics", "Mechanical Design"],
    technologies: ["Mechanical design", "Electronics", "Charging safety"],
    purpose:
      "The third generation of the YOR mobile robotics platform, including an autonomous charging dock.",
    role: "Undergraduate Researcher, NYU GRAIL",
    challenge:
      "Create a dock that mechanically guides the mobile platform, establishes charging contact, and detects safe docking conditions.",
    contributions: [
      "Owns the charging dock's mechanical design.",
      "Develops the docking-station electronics.",
      "Implements dock detection for charging safety.",
    ],
    systemDesign: [
      "Mechanical docking interface for the YOR mobile platform.",
      "Dock-side electronics for charging.",
      "Detection logic that gates charging on a confirmed dock state.",
    ],
    teamOutcomes: [
      "The wider YOR v3 platform remains in active development; no final project outcome is claimed.",
    ],
  },
  {
    id: "bebop",
    title: "BEBOP",
    date: "Spring 2026–Present",
    status: "In Progress",
    currentWork: true,
    media: [
      {
        type: "image",
        src: "/media/bebop-initial-concept.png",
        alt: "Initial BEBOP biped concept designed by Kenny Ma",
        caption:
          "Initial design fully made by me, but not the one we are building unfortunately :(, but it was still useful in doing some initial brainstorming on what the actual robot needed to look like and structurally to do.",
      },
      {
        type: "image",
        src: "/media/bebop-clockwise-policy.gif",
        alt: "Clockwise rotation reinforcement-learning policy running in MuJoCo",
        caption:
          "Clockwise rotation RL policy deployed in MuJoCo on a similar robot. Not the one we have designed, but this was so that we can do training while our designs were still in the works.",
      },
      {
        type: "video",
        src: "/media/bebop-digital-twin.mp4",
        title: "BEBOP physical robot and MuJoCo digital twin",
        caption:
          "Digital Twin of our real-life built robot and MuJoCo Digital Twin!",
      },
    ],
    categories: ["Robotics", "Mechanical Design", "Control/RL", "Simulation"],
    technologies: ["URDF", "Reinforcement learning", "Robot design"],
    purpose:
      "Balancing Expressive Biped for Observation and Play, a small expressive biped inspired by character robots.",
    role: "Undergraduate Researcher, NYU GRAIL",
    challenge:
      "Coordinate a characterful physical platform, its simulation model, and early learning experiments without presenting unfinished goals as results.",
    contributions: [
      "Contributes to the biped's physical design.",
      "Develops the robot's URDF representation.",
      "Runs reinforcement-learning experiments for the developing platform.",
    ],
    systemDesign: [
      "Compact expressive biped hardware.",
      "URDF model connecting physical geometry to simulation.",
      "Reinforcement-learning experiments for balance and behavior.",
    ],
    teamOutcomes: [
      "BEBOP is a working title and the project remains in progress; no final team outcome is claimed.",
    ],
  },
  {
    id: "double-pendulum-rl",
    title: "Double Pendulum RL",
    date: "2026–Present",
    status: "In Progress",
    currentWork: true,
    media: [
      {
        type: "image",
        src: "/media/double-pendulum-mujoco-model.png",
        alt: "Double-pendulum model displayed in the MuJoCo simulator",
        caption:
          "Bummy little model I made in 2 minutes and converted to XML for MuJoCo. Have yet to make it balance, but I am trying a variety of different training methods and strategies to help me get accustomed to RL! Very fun.",
      },
    ],
    categories: ["Control/RL", "Simulation", "Software"],
    technologies: ["MuJoCo", "Gymnasium", "PPO", "Evolutionary training"],
    purpose:
      "An underactuated double-pendulum control study comparing policy-training approaches in simulation.",
    role: "Independent robotics and control project",
    challenge:
      "Stabilize an underactuated nonlinear system using policies trained against a reproducible simulation environment.",
    contributions: [
      "Built the MuJoCo double-pendulum simulation.",
      "Wrapped the control task with a Gymnasium environment.",
      "Created PPO training scaffolding.",
      "Implemented evolutionary policy training experiments.",
    ],
    systemDesign: [
      "MuJoCo dynamics model and actuator interface.",
      "Gymnasium observations, actions, rewards, and episode lifecycle.",
      "PPO scaffolding alongside evolutionary policy training.",
    ],
    teamOutcomes: [
      "The control study is still in progress; no converged performance result is claimed.",
    ],
  },
  {
    id: "ruka-v2",
    title: "RUKA-v2",
    date: "Prior work",
    status: "Published",
    currentWork: false,
    media: [
      {
        type: "youtube",
        src: "https://www.youtube-nocookie.com/embed/WKVG-CsXR4E",
        title: "RUKA-v2 project video",
      },
    ],
    categories: ["Robotics", "Mechanical Design", "Control/RL"],
    technologies: ["Python", "Inverse kinematics", "Teleoperation", "Hardware testing"],
    purpose:
      "Published on March 17, 2026, and featured at an ICRA 2026 workshop, RUKA-v2 is an open-source tendon-driven humanoid hand, 20 DOF, with finger abduction and adduction plus a decoupled two-degree-of-freedom wrist.",
    role: "Undergraduate Researcher, NYU GRAIL",
    challenge:
      "Improve the hand and wrist hardware while connecting human motion input to reliable robot motion.",
    contributions: [
      "Increased structural support in the wrist and finger joints.",
      "Performed hardware testing across the hand assembly.",
      "Implemented and tested teleoperation through an Oculus and OpenTeach workflow.",
      "Contributed inverse-kinematics and vector-retargeting work that maps human motion to robot joint commands.",
    ],
    systemDesign: [
      "Tendon-driven finger actuation with abduction and adduction.",
      "Decoupled two-degree-of-freedom wrist.",
      "Teleoperation pipeline using inverse kinematics and motion retargeting.",
    ],
    teamOutcomes: [
      "The project team released the hardware, controller software, assembly resources, and demonstrations as open-source research.",
      "Across team evaluations, RUKA-v2 reduced teleoperated task completion time by 51.3% and increased success rate by 21.2% over RUKA.",
      "The team demonstrated 13 teleoperated tasks and three autonomous policy-learning tasks.",
    ],
    links: [
      {
        label: "Project site",
        href: "https://ruka-hand-v2.github.io/",
      },
      {
        label: "Paper",
        href: "https://arxiv.org/abs/2603.26660",
      },
    ],
  },
  {
    id: "spark",
    title: "SPARK",
    date: "Prior work",
    status: "In Progress",
    currentWork: false,
    categories: ["Robotics", "Control/RL", "Simulation", "Software"],
    technologies: ["Python", "PyTorch", "MuJoCo", "Computer vision"],
    purpose:
      "A Unitree A1 concept combining emotion recognition and learned locomotion to explore responsive play behavior.",
    role: "Independent robotics project",
    challenge:
      "Connect visual affect estimation, behavior selection, and locomotion while keeping simulation-to-robot transfer and safety explicit.",
    contributions: [
      "Defined the planned modular perception, policy, and control architecture.",
      "Specified a proposed PyTorch emotion and body-pose perception pipeline.",
      "Outlined a MuJoCo training and evaluation plan for locomotion policies.",
      "Mapped intended affect states to canine-inspired behavior concepts.",
    ],
    systemDesign: [
      "Visual affect and pose perception.",
      "Behavior selector mapping perception to play strategies.",
      "MuJoCo policy training before planned Unitree A1 transfer.",
    ],
    teamOutcomes: [
      "SPARK remains an in-progress project goal; on-robot interaction outcomes are not claimed.",
    ],
  },
  {
    id: "puzzle-solving",
    title: "Puzzle Solving with Search Algorithms",
    date: "Prior work",
    status: "Complete",
    currentWork: false,
    categories: ["Software"],
    technologies: ["C++", "STL", "A*", "IDA*", "Data structures"],
    purpose:
      "A modular C++ solver for state-space puzzles using uninformed and informed search.",
    role: "Developer",
    challenge:
      "Represent puzzles behind reusable state and action interfaces while comparing completeness, optimality, time, and memory trade-offs.",
    contributions: [
      "Designed generic State, Action, Search, Solver, and Frontier abstractions.",
      "Implemented BFS, DFS, DLS, IDDFS, A*, and IDA*.",
      "Built a 15-puzzle representation with goal checks and Manhattan-distance heuristic.",
      "Added solution output for action sequences and state paths.",
    ],
    systemDesign: [
      "Pluggable puzzle state and action interfaces.",
      "Queue, stack, depth-limited, and heuristic-driven frontiers.",
      "Manhattan-distance evaluation for A* and IDA*.",
    ],
    teamOutcomes: [
      "The completed solver supports multiple search strategies without changing its puzzle-independent core.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Kmang0/PuzzleSolving",
      },
    ],
  },
  {
    id: "blackjack-simulation",
    title: "Blackjack Card Counting Monte Carlo",
    date: "Prior work",
    status: "Complete",
    currentWork: false,
    categories: ["Simulation", "Software"],
    technologies: ["MATLAB", "Monte Carlo", "Statistics", "Visualization"],
    purpose:
      "A MATLAB simulation measuring blackjack expected value across Hi-Lo true count and shoe penetration.",
    role: "Developer",
    challenge:
      "Run repeatable multi-shoe experiments and turn variable hand outcomes into statistically useful summaries.",
    contributions: [
      "Implemented shoe, hand, dealer, player, and scoring logic.",
      "Added Hi-Lo running and true-count computation.",
      "Binned results by true count and penetration with expected value and standard error.",
      "Generated confidence plots, heatmaps, and three-dimensional EV surfaces.",
    ],
    systemDesign: [
      "Configurable multi-shoe Monte Carlo experiment grid.",
      "Basic-strategy player and dealer S17 logic.",
      "CSV, MAT, and publication-style figure output.",
    ],
    teamOutcomes: [
      "The simulation produced reusable result tables and visualizations for comparing expected value by count and penetration.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Kmang0/BJCC-SIM",
      },
    ],
  },
  {
    id: "rsa",
    title: "RSA Key Generation and Message Encryption",
    date: "Prior work",
    status: "Complete",
    currentWork: false,
    categories: ["Software"],
    technologies: ["Java", "RSA", "OAEP", "Java Cryptography Architecture"],
    purpose:
      "An educational Java implementation of RSA key generation, message encryption, and decryption.",
    role: "Developer",
    challenge:
      "Demonstrate public-key cryptography clearly while distinguishing safe library use from insecure textbook RSA.",
    contributions: [
      "Implemented 2048-bit key-pair generation with Java cryptography APIs.",
      "Encoded keys and ciphertext in Base64 for inspectable examples.",
      "Built public-key encryption and private-key decryption workflows.",
      "Documented padding, key storage, and common RSA security pitfalls.",
    ],
    systemDesign: [
      "Java Cryptography Architecture key generation.",
      "OAEP-padded encryption and decryption round trip.",
      "Security guidance covering private keys and production constraints.",
    ],
    teamOutcomes: [
      "The completed demonstration verifies that encrypted sample messages round-trip to their original plaintext.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Kmang0/RSA",
      },
    ],
  },
  {
    id: "kmacoin",
    title: "KMACoin",
    date: "Prior work",
    status: "Complete",
    currentWork: false,
    categories: ["Software"],
    technologies: ["Java", "Cryptography", "RSA", "SHA-256", "UTXO"],
    purpose:
      "An educational cryptocurrency implementation covering blockchains, signed transactions, and UTXO balance tracking.",
    role: "Developer",
    challenge:
      "Model ownership and transaction validity across a linked chain while keeping the implementation explicitly educational.",
    contributions: [
      "Implemented RSA key generation and SHA-256-derived addresses.",
      "Built UTXO tracking and balance computation.",
      "Constructed and signed transactions with inputs, outputs, change, and fees.",
      "Built chain, block, transaction, and network display utilities.",
    ],
    systemDesign: [
      "Hash-linked blocks containing signed transactions.",
      "UTXO pool for ownership and balance state.",
      "Course network API integration for transaction and block exchange.",
    ],
    teamOutcomes: [
      "The completed educational system can construct a chain from network data and create signed payments from available UTXOs.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Kmang0/KMACoin",
      },
    ],
  },
];

export function validateProjects(items: Project[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const project of items) {
    if (ids.has(project.id)) errors.push(`Duplicate project id: ${project.id}`);
    ids.add(project.id);
    if (!PROJECT_STATUSES.includes(project.status)) {
      errors.push(`Invalid status: ${project.id}`);
    }
    if (project.contributions.length < 3) {
      errors.push(`Missing contribution detail: ${project.id}`);
    }
    if (
      project.links?.some(
        (link) => !link.href.startsWith("https://") && !link.href.startsWith("http://"),
      )
    ) {
      errors.push(`Invalid link: ${project.id}`);
    }
  }

  return errors;
}
