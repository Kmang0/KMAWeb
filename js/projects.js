/**
 * PROJECTS DATA
 * 
 * This file contains all project data for the portfolio.
 * To add a new project, simply add a new object to the projects array.
 * 
 * Project Object Structure:
 * {
 *   id: string (unique identifier),
 *   title: string (project name),
 *   difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
 *   summary: string (short description for card),
 *   description: string (longer description for modal),
 *   technologies: string[] (tech badges),
 *   categories: string[] (for filtering),
 *   features: string[] (key features list),
 *   learningOutcomes: string[] (what you learned),
 *   featured: boolean (show on homepage),
 *   githubUrl: string (GitHub repo link),
 *   demoUrl: string (live demo link),
 *   details: {
 *     algorithmExplanation?: string (for algorithm projects),
 *     sampleOutput?: string (code/output sample),
 *     sampleData?: string (sample data file content),
 *     screenshots?: string[] (screenshot placeholders),
 *     ethicsNotes?: string[] (for security projects),
 *     deliverables?: string[] (project outputs)
 *   }
 * }
 */

const projects = [
    // ============================================================
    // SEEDED PROJECT A: C++ Puzzle Solving (Search Algorithms)
    // ============================================================
    {
        id: 'puzzle-solving-search',
        title: 'Puzzle Solving with Search Algorithms (C++)',
        difficulty: 'Intermediate',
        summary: 'A C++ framework that solves puzzles using various search algorithms—uninformed (BFS, DFS, DLS, IDDFS) and informed (A*, IDA*)—applied to the 15-puzzle and extensible to other state-space problems.',
        description: 'This project implements a general-purpose puzzle-solving system that utilizes various search algorithms to find solutions to combinatorial puzzles. The core idea is to model puzzles as state-space search problems: each configuration is a state, and legal moves are actions that transition between states. The program applies multiple search strategies—breadth-first search (BFS), depth-first search (DFS), depth-limited search (DLS), iterative deepening depth-first search (IDDFS), A* with a heuristic, and iterative deepening A* (IDA*)—to the classic 15-puzzle (sliding tile puzzle), comparing completeness, optimality, and efficiency. The design is modular so new puzzles and search algorithms can be added without changing the solver core, demonstrating fundamental concepts in artificial intelligence, graph search, and algorithm design.',
        technologies: ['C++', 'STL', 'Algorithms', 'Data Structures'],
        categories: ['C++', 'Algorithms'],
        features: [
            'Generic State/Action/Search interface for pluggable puzzles',
            '15-puzzle state representation with goal check and heuristic',
            'BFS and DFS (queue and stack frontiers)',
            'Depth-limited search (DLS) with configurable depth',
            'Iterative deepening depth-first search (IDDFS)',
            'A* search with Manhattan-distance heuristic',
            'Iterative deepening A* (IDA*) for memory-efficient optimal search',
            'Solver abstraction that runs any Search strategy on any State',
            'Solution output: sequence of actions and optional state path'
        ],
        learningOutcomes: [
            'State-space formulation of puzzles and search problems',
            'Uninformed vs informed search and when to use each',
            'Trade-offs: completeness, optimality, time and space complexity',
            'Heuristic design and admissibility for A* and IDA*',
            'Modular C++ design with inheritance and abstract interfaces'
        ],
        featured: true,
        githubUrl: 'https://github.com/Kmang0/PuzzleSolving',
        demoUrl: null,
        details: {
            algorithmExplanation: `
                <h4>Puzzle Solving as Search</h4>
                <p>Many puzzles can be modeled as <strong>state-space search</strong>: a <strong>state</strong> is one configuration (e.g. the 4×4 tile layout), <strong>actions</strong> are legal moves (e.g. slide the blank up/down/left/right), and the goal is to reach a target state (e.g. tiles in order). Different search algorithms explore this space in different ways—some guarantee finding a solution or an optimal one; others trade completeness for speed or memory.</p>
                
                <h4>Uninformed Search (No Heuristic)</h4>
                <p><strong>BFS</strong> expands the shallowest node first (queue). It is complete and optimal for unit step costs. <strong>DFS</strong> goes deep first (stack); it can be incomplete and non-optimal but uses less memory. <strong>DLS</strong> is DFS with a depth limit to avoid infinite branches. <strong>IDDFS</strong> runs DLS with increasing depth limits, combining DFS memory use with BFS-like completeness and optimality for unit costs.</p>
                
                <h4>Informed Search (With Heuristic)</h4>
                <p><strong>A*</strong> expands nodes by f(n) = g(n) + h(n) (cost so far + heuristic estimate). With an <strong>admissible</strong> heuristic (never overestimates), A* is complete and optimal. For the 15-puzzle, the Manhattan distance of each tile to its goal position is a common admissible heuristic. <strong>IDA*</strong> uses iterative deepening on the f-cost threshold, giving optimal solutions with much lower memory than A*.</p>
                
                <h4>Complexity Notes</h4>
                <ul>
                    <li><strong>BFS/DFS:</strong> Time and space depend on branching factor and solution depth</li>
                    <li><strong>IDDFS:</strong> Time similar to BFS in the worst case; space O(b·d) for depth d</li>
                    <li><strong>A*:</strong> Optimal with admissible heuristic; space can be large (open/closed sets)</li>
                    <li><strong>IDA*:</strong> Optimal with admissible heuristic; space O(b·d), no closed set</li>
                </ul>
            `,
            sampleOutput: `=== Puzzle Solving - Search Algorithms ===

Initial Puzzle State:
 1  2  3  4
 5  6  7  8
 9 10 11 12
13 14  0 15

Is this the goal state? false

Possible moves: [Slide Blank Up] [Slide Blank Left]

--- Solving with BFS ---
Strategy: BFS
Solution found. Actions: 2
(Sequence of slide actions to reach goal)

--- Solving with A* ---
Strategy: A*
Solution found. Actions: 2
(Optimal sequence using heuristic)

--- Comparison ---
BFS: complete, optimal for unit cost; may expand many nodes
A*:  complete, optimal with admissible heuristic; fewer expansions with good h(n)`,
            sampleData: `# Initial state array (4×4 row-major; 0 = blank)
# Goal: 1,2,...,15,0
1, 2, 3, 4
5, 6, 7, 8
9, 10, 11, 12
13, 14, 0, 15`,
            deliverables: [
                'Complete C++ source with State, Action, Search, Solver, and Frontier abstractions',
                '15-puzzle state and actions plus heuristic',
                'Implementations: BFS, DFS, DLS, IDDFS, A*, IDA*',
                'CMakeLists.txt (or Makefile) for compilation',
                'README with build/run instructions and algorithm overview'
            ]
        }
    },

    // ============================================================
    // SEEDED PROJECT B: MATLAB Wind Farm Analysis
    // ============================================================
    {
        id: 'wind-farm-analysis',
        title: 'Offshore Wind Farm Site Analysis (MATLAB)',
        difficulty: 'Intermediate',
        summary: 'Data analysis and visualization project that evaluates candidate offshore wind farm sites using multi-criteria decision analysis and produces publication-quality plots.',
        description: 'This MATLAB project analyzes a dataset of candidate offshore wind farm locations to identify the most promising site for development. The analysis includes data cleaning, derived metric computation using weighted scoring, and comprehensive visualization. The project demonstrates skills in data processing, statistical analysis, and technical communication through visualizations.',
        technologies: ['MATLAB', 'Data Analysis', 'Visualization', 'Statistics'],
        categories: ['MATLAB', 'Data Analysis'],
        features: [
            'Loads and validates site data from CSV files',
            'Handles missing values with interpolation',
            'Computes weighted site suitability scores',
            'Generates histogram of wind speed distribution',
            'Creates scatter plot with multi-dimensional encoding',
            'Produces ranked bar chart of top candidates',
            'Outputs formatted recommendation report'
        ],
        learningOutcomes: [
            'Data cleaning and preprocessing techniques',
            'Multi-criteria decision analysis (MCDA)',
            'Advanced MATLAB plotting and visualization',
            'Statistical analysis of environmental data',
            'Technical reporting and data communication'
        ],
        featured: true,
        githubUrl: 'https://github.com/yourusername/wind-farm-analysis',
        demoUrl: null,
        details: {
            sampleData: `site_id,latitude,longitude,avg_wind_speed,depth_m,distance_to_shore_km,protected_area
SITE_001,56.2,3.4,8.5,45,12,0
SITE_002,57.1,2.8,9.2,62,18,0
SITE_003,55.8,4.1,7.8,38,8,1
SITE_004,56.5,3.0,8.9,55,15,0
SITE_005,57.3,2.5,9.5,78,25,0`,
            sampleOutput: `============================================================
       OFFSHORE WIND FARM SITE ANALYSIS REPORT
============================================================

Dataset Summary:
  Total sites analyzed: 24
  Valid sites (after cleaning): 22
  Average wind speed: 8.4 m/s
  Depth range: 25-95 meters

Scoring Methodology:
  Site Score = 0.40 × Wind_Speed_Norm 
             + 0.25 × (1 - Depth_Norm)
             + 0.25 × (1 - Distance_Norm)
             + 0.10 × (1 - Protected)

Top 3 Recommended Sites:
  1. SITE_015 - Score: 0.87
     Location: 57.1°N, 2.9°E
     Wind Speed: 9.8 m/s | Depth: 52m | Distance: 16km
  
  2. SITE_022 - Score: 0.84
     Location: 56.8°N, 3.2°E
     Wind Speed: 9.4 m/s | Depth: 48m | Distance: 14km
  
  3. SITE_008 - Score: 0.81
     Location: 57.0°N, 2.7°E
     Wind Speed: 9.1 m/s | Depth: 58m | Distance: 19km

RECOMMENDATION: SITE_015 offers the best balance of high wind
speeds, manageable depth, reasonable shore distance, and no
environmental protection restrictions.

Output files generated:
  - wind_distribution.png
  - site_scatter_plot.png
  - top_sites_ranking.png
  - full_report.txt`,
            screenshots: [
                'Figure 1: Wind Speed Distribution Histogram',
                'Figure 2: Site Scatter Plot (Wind Speed vs Depth)',
                'Figure 3: Top 10 Sites Ranked by Score'
            ],
            deliverables: [
                'MATLAB script (.m file) with full analysis pipeline',
                'Sample dataset (CSV format)',
                'Generated plots (PNG format)',
                'Summary report (text file)',
                'Documentation with methodology explanation'
            ]
        }
    },

    // ============================================================
    // SEEDED PROJECT C: Java RSA Encryption
    // ============================================================
    {
        id: 'rsa-encryption-demo',
        title: 'RSA Key Generation & Message Encryption',
        difficulty: 'Intermediate',
        summary: 'Educational implementation demonstrating RSA public-key cryptography, including key pair generation, message encryption/decryption, and security best practices.',
        description: 'This Java project demonstrates the RSA public-key cryptosystem, a foundational algorithm in modern cybersecurity. The implementation covers key generation, encryption, and decryption workflows while emphasizing educational clarity and security awareness. The project includes explanations of cryptographic concepts, security pitfalls, and ethical considerations.',
        technologies: ['Java', 'Cryptography', 'Security'],
        categories: ['Java', 'Security/Crypto'],
        features: [
            'Generates 2048-bit RSA key pairs using Java Crypto',
            'Encodes keys in Base64 for readable display',
            'Encrypts plaintext messages with public key',
            'Decrypts ciphertext with private key',
            'Demonstrates proper key storage concepts',
            'Includes security best practices documentation'
        ],
        learningOutcomes: [
            'Understanding of public-key cryptography principles',
            'Practical experience with Java Cryptography Architecture',
            'Awareness of common cryptographic vulnerabilities',
            'Knowledge of padding schemes and their importance',
            'Ethical considerations in security implementations'
        ],
        featured: false,
        githubUrl: 'https://github.com/Kmang0/RSA',
        demoUrl: null,
        details: {
            algorithmExplanation: `
                <h4>What is RSA?</h4>
                <p>RSA (Rivest-Shamir-Adleman) is a public-key cryptosystem widely used for secure data transmission. It uses two keys: a <strong>public key</strong> (shared openly) for encryption, and a <strong>private key</strong> (kept secret) for decryption.</p>
                
                <h4>How It Works (Simplified)</h4>
                <ol>
                    <li><strong>Key Generation:</strong> Choose two large prime numbers, compute their product (modulus), and derive public and private exponents.</li>
                    <li><strong>Encryption:</strong> Message is converted to a number and raised to the public exponent, modulo the modulus.</li>
                    <li><strong>Decryption:</strong> Ciphertext is raised to the private exponent, modulo the modulus, recovering the original message.</li>
                </ol>
                
                <h4>Security Foundation</h4>
                <p>RSA's security relies on the difficulty of factoring large numbers. While multiplying two primes is easy, finding those primes from their product is computationally infeasible for sufficiently large numbers (2048+ bits).</p>
                
                <h4>Textbook RSA Pitfalls</h4>
                <p>"Textbook RSA" (raw RSA without padding) is vulnerable to:</p>
                <ul>
                    <li><strong>Deterministic output:</strong> Same message always produces same ciphertext</li>
                    <li><strong>Small message attacks:</strong> Messages smaller than the modulus can be guessed</li>
                    <li><strong>No integrity checking:</strong> Ciphertext can be modified undetected</li>
                </ul>
            `,
            sampleOutput: `=== RSA Encryption Demo ===

[1] Generating 2048-bit RSA key pair...
    ✓ Key pair generated successfully

[2] Key Information:
    Public Key (Base64):
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyXg...
    
    Private Key (Base64 - KEEP SECRET!):
    MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAo...

[3] Encrypting message:
    Original: "Hello, Secure World!"
    Encrypted (Base64): "QWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODk..."

[4] Decrypting with private key...
    Decrypted: "Hello, Secure World!"

[5] Verification:
    ✓ Original and decrypted messages match!
    ✓ Encryption/Decryption successful.

=== Security Notes ===
- Private key was never transmitted or exposed
- OAEP padding was used (PKCS#1 v2.1)
- Key size: 2048 bits (recommended minimum)
- Never hardcode keys in production code!`,
            ethicsNotes: [
                'Cryptography is a dual-use technology—protect privacy but respect laws',
                'Never implement custom crypto algorithms; use well-vetted libraries',
                'Key management is often the weakest link in cryptographic systems',
                'Always use padding schemes (OAEP, PKCS#1 v1.5) with RSA',
                'Report security vulnerabilities responsibly (ethical disclosure)',
                'Respect export control laws regarding cryptographic software'
            ],
            deliverables: [
                'Java source with modular crypto operations',
                'Maven/Gradle build configuration',
                'JUnit tests for encryption round-trip',
                'Security documentation and best practices guide',
                'Sample key generation and usage examples'
            ]
        }
    },
    // ============================================================
    // PROJECT D: Java Blockchain & Cryptocurrency
    // ============================================================
    {
        id: 'catlincoin-blockchain',
        title: 'KMACoin: Blockchain & Cryptocurrency',
        difficulty: 'Advanced',
        summary: 'Educational implementation of a minimal cryptocurrency: blockchain construction, UTXO model, signed transactions, and balance tracking using RSA and SHA-256.',
        description: 'This Java project implements a simplified cryptocurrency (CatlinCoin) to demonstrate core blockchain and crypto concepts. The implementation covers key generation and addresses (RSA + SHA-256), the UTXO (Unspent Transaction Output) model, building and validating a chain of blocks, and constructing signed transactions that spend UTXOs and pay fees. The code connects to a course network API to download and upload transactions and blocks, emphasizing educational clarity and security practices.',
        technologies: ['Java', 'Cryptography', 'RSA', 'Data Structures'],
        categories: ['Java', 'Security/Crypto'],
        features: [
            'Generates RSA key pairs and derives addresses (public key hash)',
            'UTXO pool to track unspent outputs and compute balances',
            'Builds blockchain from downloaded blocks and transactions',
            'Signed transactions with inputs (UTXO refs) and outputs (recipient + amount)',
            'Coinbase transactions and miner rewards',
            'Transaction fees and minimum-fee enforcement',
            'Network: download/upload transactions and blocks via API',
            'Payment helper: select UTXOs, create transaction, upload',
            'Display utilities: all blocks, all transactions, chain summary, balances'
        ],
        learningOutcomes: [
            'Understanding of blockchain structure (blocks, previous-block hash, transaction list)',
            'UTXO model vs account-based ledgers',
            'How signing and address hashes provide authenticity',
            'Practical experience with Java Cryptography (RSA, SHA-256)',
            'Balance computation from UTXO set',
            'Transaction construction and fee handling'
        ],
        featured: true,
        githubUrl: 'https://github.com/Kmang0/KMACoin',
        demoUrl: null,
        details: {
            algorithmExplanation: `
                    <h4>What is a Blockchain?</h4>
                    <p>A <strong>blockchain</strong> is a linked list of <strong>blocks</strong>, each containing a set of <strong>transactions</strong>. Each block stores a hash of the previous block, forming a chain. Tampering with an old block would change its hash and break the chain.</p>
                    
                    <h4>UTXO Model</h4>
                    <p>Coins are represented as <strong>Unspent Transaction Outputs (UTXOs)</strong>. Each UTXO has an amount, a destination address, and a reference to the transaction that created it. Spending means consuming one or more UTXOs as <strong>inputs</strong> and creating new UTXOs as <strong>outputs</strong> (payments to recipients and optionally change back to the sender).</p>
                    
                    <h4>Transactions</h4>
                    <p>A <strong>transaction</strong> lists inputs (references to UTXOs being spent) and outputs (recipient address + amount). The sender signs the transaction with their private key; anyone can verify the signature with the sender's public key. The hash of the public key is the sender's <strong>address</strong>.</p>
                    
                    <h4>Blocks and Mining</h4>
                    <p><strong>Blocks</strong> bundle transactions (including a <strong>coinbase</strong> transaction that pays the miner). The block header includes the previous block hash, a hash of the transaction list, and a <strong>nonce</strong>. Mining is finding a nonce so the block hash meets a <strong>difficulty</strong> target (e.g. leading zeros), which secures the chain and controls issuance.</p>
                    
                    <h4>Security Notes</h4>
                    <ul>
                        <li><strong>Addresses</strong> are derived from public keys (e.g. SHA-256); private keys never leave the owner.</li>
                        <li><strong>Signatures</strong> prevent forging spends from an address without the private key.</li>
                        <li><strong>Hashing</strong> (SHA-256) ties blocks and transactions together and detects modification.</li>
                    </ul>
                `,
            sampleOutput: `=== CatlinCoin / Blockchain Demo ===
    
    [1] Key pair & address (e.g. KMA):
        AF2EFB5AF18FF657D37C4494482FC68846755318AE262FE6523AB25E60BF6547 (KMA)
    
    [2] All Blocks (pennyBCoin):
    ============================================================================
    ================ All Blocks ================================================
    Block: <hash> height 0 ...
    Block: <hash> height 1 ...
    ============================================================================
    
    [3] All Transactions:
    ============================================================================
    ================ All Transactions ==========================================
      --- Transaction: <hash> --- ...
    ============================================================================
    
    [4] Block chain summary:
    = = = = BLOCK CHAIN = = = = = = = = = = = = = = = = = = = = = =
    -*-*-*-*-*-*-*- BLOCK: <hash> ----- height 0 ------
      --- Transaction: <hash> --- ...
    
    ========== UNCONFIRMED TRANSACTIONS ===========
    ================================================
    
    [5] Balances:
    Balance for <address> is <amount>
    ...`,
            ethicsNotes: [
                'Educational only; not for real money or production use',
                'Private keys must stay local and never be committed or transmitted in plaintext',
                'Use established crypto libraries (e.g. JCA/JCE); do not invent your own algorithms',
                'Understand regulatory and ethical implications of cryptocurrency and privacy'
            ],
            deliverables: [
                'Java source: Currency, BlockChain, Block, Transaction, UTXO/UTXOPool, CryptoRSA, Network, Utility',
                'Key generation and address display',
                'Blockchain build from network data and balance computation',
                'Transaction creation, signing, and upload (e.g. payment helper)',
                'Display utilities for blocks, transactions, chain summary, and balances'
            ]
        }
    }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects };
}
