
const HARD_QUESTIONS = {
  tier1: [
    /* ── Q1 ── */
    {
      q: "You are in an interview and asked: 'Given a 2D grid of 0s and 1s, find the maximum rectangle containing only 1s.' What is the optimal approach?",
      opts: [
        "Brute force O(N³M³)",
        "Treat each row as a histogram base, apply Largest Rectangle in Histogram",
        "Dynamic programming on columns only",
        "Flood fill BFS",
      ],
      ans: "Treat each row as a histogram base, apply Largest Rectangle in Histogram",
      cat: "DSA",
      exp: "Step 1: For each row, compute height[j] = number of consecutive 1s ending at that row in column j.<br/>Step 2: Now each row is a histogram — apply the 'Largest Rectangle in Histogram' using a monotonic stack.<br/>Step 3: Largest Rectangle in Histogram runs in O(M) per row using a stack that maintains increasing bar indices.<br/>Step 4: Pop when a shorter bar is found; area = popped height × (right - left - 1).<br/>Step 5: Run this for all N rows → O(N×M) overall.<br/>✅ Classic DP + Stack combination. Expected in senior interviews.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="320" height="160" fill="transparent"/>
  <text x="10" y="14" fill="#94a3b8" font-size="10">Max Rectangle in Binary Matrix</text>
  <!-- Grid -->
  <g transform="translate(10,22)">
    <!-- Row 0 -->
    <rect x="0"  y="0"  width="28" height="28" fill="#1e293b" stroke="#334155"/>
    <rect x="30" y="0"  width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="60" y="0"  width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="90" y="0"  width="28" height="28" fill="#1e293b" stroke="#334155"/>
    <rect x="120" y="0" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <!-- Row 1 -->
    <rect x="0"  y="30" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="30" y="30" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="60" y="30" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="90" y="30" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="120" y="30" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <!-- Row 2 -->
    <rect x="0"  y="60" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="30" y="60" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="60" y="60" width="28" height="28" fill="#6c63ff" stroke="#334155" opacity="0.85"/>
    <rect x="90" y="60" width="28" height="28" fill="#1e293b" stroke="#334155"/>
    <rect x="120" y="60" width="28" height="28" fill="#1e293b" stroke="#334155"/>
    <!-- Labels -->
    <text x="10"  y="19"  fill="#94a3b8">0</text>
    <text x="40"  y="19"  fill="white">1</text>
    <text x="70"  y="19"  fill="white">1</text>
    <text x="100" y="19"  fill="#94a3b8">0</text>
    <text x="130" y="19"  fill="white">1</text>
    <text x="10"  y="49"  fill="white">1</text>
    <text x="40"  y="49"  fill="white">1</text>
    <text x="70"  y="49"  fill="white">1</text>
    <text x="100" y="49"  fill="white">1</text>
    <text x="130" y="49"  fill="white">1</text>
    <text x="10"  y="79"  fill="white">1</text>
    <text x="40"  y="79"  fill="white">1</text>
    <text x="70"  y="79"  fill="white">1</text>
    <text x="100" y="79"  fill="#94a3b8">0</text>
    <text x="130" y="79"  fill="#94a3b8">0</text>
    <!-- Highlight max rectangle -->
    <rect x="0" y="30" width="88" height="58" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-dasharray="5,3" rx="2"/>
    <text x="160" y="15"  fill="#94a3b8" font-size="10">Heights after row 2:</text>
    <text x="160" y="30"  fill="#6c63ff" font-size="10">col 0→2, col 1→3, col 2→3</text>
    <text x="160" y="45"  fill="#6c63ff" font-size="10">col 3→1, col 4→1</text>
    <text x="160" y="62"  fill="#22c55e" font-size="10">Max rect = 6 (green box)</text>
    <text x="160" y="80"  fill="#94a3b8" font-size="10">Stack trick on histogram</text>
  </g>
</svg>`,
      },
    },

    /* ── Q2 ── */
    {
      q: "Interviewer asks: 'What is the time complexity of Dijkstra's algorithm using a Min-Heap (priority queue)?'",
      opts: ["O(V²)", "O(E log V)", "O(V log E)", "O(E + V)"],
      ans: "O(E log V)",
      cat: "DSA",
      exp: "Step 1: Dijkstra relaxes each edge at most once → E relaxations total.<br/>Step 2: Each relaxation may push to the Min-Heap → O(log V) per push.<br/>Step 3: Each vertex is extracted once → V extractions at O(log V) each.<br/>Step 4: Total: O((E + V) log V) ≈ O(E log V) for connected graphs (E ≥ V).<br/>✅ With Binary Heap: O(E log V). With Fibonacci Heap: O(E + V log V).",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Dijkstra — Shortest Path from S</text>
  <!-- Nodes -->
  <circle cx="50"  cy="80"  r="18" fill="#6c63ff" opacity="0.9"/><text x="43"  cy="84" y="84" fill="white">S</text>
  <circle cx="130" cy="40"  r="18" fill="#3b82f6" opacity="0.9"/><text x="123" y="44" fill="white">A</text>
  <circle cx="130" cy="120" r="18" fill="#3b82f6" opacity="0.9"/><text x="123" y="124" fill="white">B</text>
  <circle cx="220" cy="80"  r="18" fill="#22c55e" opacity="0.9"/><text x="213" y="84" fill="white">T</text>
  <!-- Edges -->
  <line x1="68"  y1="67"  x2="112" y2="47"  stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="68"  y1="93"  x2="112" y2="113" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="148" y1="47"  x2="202" y2="68"  stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="148" y1="113" x2="202" y2="92"  stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="58"  x2="130" y2="102" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Weights -->
  <text x="80"  y="50"  fill="#fbbf24" font-size="10">4</text>
  <text x="80"  y="110" fill="#fbbf24" font-size="10">2</text>
  <text x="168" y="52"  fill="#fbbf24" font-size="10">3</text>
  <text x="168" y="110" fill="#fbbf24" font-size="10">5</text>
  <text x="133" y="83"  fill="#fbbf24" font-size="10">1</text>
  <!-- Dist labels -->
  <text x="35"  y="108" fill="#6c63ff" font-size="9">d=0</text>
  <text x="115" y="28"  fill="#3b82f6" font-size="9">d=4</text>
  <text x="115" y="143" fill="#3b82f6" font-size="9">d=2</text>
  <text x="210" y="108" fill="#22c55e" font-size="9">d=8</text>
</svg>`,
      },
    },

    /* ── Q3 ── */
    {
      q: "Tell me: in Floyd-Warshall algorithm, what does dp[i][j][k] represent, and what is its time complexity?",
      opts: [
        "Shortest path from i to j; O(V²)",
        "Shortest path from i to j using only nodes {1..k}; O(V³)",
        "Number of paths from i to j; O(V³)",
        "Minimum spanning tree cost; O(E log V)",
      ],
      ans: "Shortest path from i to j using only nodes {1..k}; O(V³)",
      cat: "DSA",
      exp: "Step 1: Floyd-Warshall is an all-pairs shortest path algorithm.<br/>Step 2: dp[i][j][k] = shortest path from i to j using intermediate nodes {1, 2, ..., k}.<br/>Step 3: Recurrence: dp[i][j][k] = min(dp[i][j][k-1], dp[i][k][k-1] + dp[k][j][k-1]).<br/>Step 4: We iterate k from 1 to V, then all (i,j) pairs → 3 nested loops → O(V³).<br/>Step 5: Space can be optimized to O(V²) by dropping the k dimension.<br/>✅ O(V³) time. Works with negative edges (no negative cycles).",
    },

    /* ── Q4 ── */
    {
      q: "Imagine you're designing a navigation system. When would you use Dijkstra's over Floyd-Warshall?",
      opts: [
        "When all-pairs shortest path is needed",
        "When single-source shortest path is needed and the graph is sparse",
        "When the graph has negative edges",
        "When you need to detect negative cycles",
      ],
      ans: "When single-source shortest path is needed and the graph is sparse",
      cat: "DSA",
      exp: "Step 1: Dijkstra: single source → one starting node → O(E log V).<br/>Step 2: Floyd-Warshall: all pairs → every pair (i,j) → O(V³).<br/>Step 3: For GPS navigation from one city: Dijkstra is far more efficient.<br/>Step 4: For sparse graphs (E << V²): Dijkstra wins. For dense graphs or all-pairs: Floyd-Warshall.<br/>Step 5: Dijkstra does NOT handle negative weight edges.<br/>✅ Use Dijkstra for single-source on sparse graphs.",
    },

    /* ── Q5 ── */
    {
      q: "You are asked about Topological Sort with DP. What problem does this combination solve?",
      opts: [
        "Minimum spanning tree",
        "Longest path in a DAG (e.g., longest increasing subsequence on a graph)",
        "Cycle detection only",
        "BFS traversal order",
      ],
      ans: "Longest path in a DAG (e.g., longest increasing subsequence on a graph)",
      cat: "DSA",
      exp: "Step 1: Topological Sort orders nodes so all edges go left-to-right.<br/>Step 2: Process nodes in topo order → each node's DP state depends only on already-processed nodes.<br/>Step 3: Classic use: dp[v] = max(dp[u] + 1) for all edges u→v.<br/>Step 4: This gives the longest path in a DAG in O(V+E).<br/>Step 5: Applications: Course scheduling with prereqs, critical path in project management (CPM).<br/>✅ Topo Sort + DP solves longest path in DAG.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Topo Sort + DP: Longest Path in DAG</text>
  <circle cx="40"  cy="70" r="16" fill="#6c63ff" opacity="0.9"/><text x="33"  y="74" fill="white">A</text>
  <circle cx="110" cy="40" r="16" fill="#3b82f6" opacity="0.9"/><text x="103" y="44" fill="white">B</text>
  <circle cx="110" cy="100" r="16" fill="#3b82f6" opacity="0.9"/><text x="103" y="104" fill="white">C</text>
  <circle cx="190" cy="70" r="16" fill="#a78bfa" opacity="0.9"/><text x="183" y="74" fill="white">D</text>
  <circle cx="260" cy="70" r="16" fill="#22c55e" opacity="0.9"/><text x="253" y="74" fill="white">E</text>
  <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 Z" fill="#94a3b8"/></marker></defs>
  <line x1="56"  y1="62" x2="93"  y2="47"  stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="56"  y1="78" x2="93"  y2="93"  stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="126" y1="47" x2="173" y2="63"  stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="126" y1="93" x2="173" y2="77"  stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="206" y1="70" x2="243" y2="70"  stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="33"  y="94" fill="#fbbf24" font-size="9">dp=0</text>
  <text x="103" y="28" fill="#fbbf24" font-size="9">dp=1</text>
  <text x="103" y="118" fill="#fbbf24" font-size="9">dp=1</text>
  <text x="183" y="94" fill="#fbbf24" font-size="9">dp=2</text>
  <text x="253" y="94" fill="#22c55e" font-size="9">dp=3</text>
</svg>`,
      },
    },

    /* ── Q6 ── */
    {
      q: "Classic interview question: 'Minimum cost to cut a stick of length N at given positions.' What DP state and recurrence do you use?",
      opts: [
        "dp[i][j] = min cost to cut stick between positions i and j; dp[i][j] = min(dp[i][k] + dp[k][j] + (j-i))",
        "dp[i] = min cuts to cut position i",
        "Greedy: always cut at midpoint",
        "BFS on cut positions",
      ],
      ans: "dp[i][j] = min cost to cut stick between positions i and j; dp[i][j] = min(dp[i][k] + dp[k][j] + (j-i))",
      cat: "DSA",
      exp: "Step 1: Add sentinel positions 0 and N to the cuts array. Sort the cuts.<br/>Step 2: dp[i][j] = minimum cost to perform all cuts between positions cuts[i] and cuts[j].<br/>Step 3: For every cut k between i and j: dp[i][j] = min(dp[i][k] + dp[k][j] + cuts[j] - cuts[i]).<br/>Step 4: The cost of a cut at k is the current length of the segment = cuts[j] - cuts[i].<br/>Step 5: Fill dp bottom-up by increasing interval length. O(M³) where M = number of cuts.<br/>✅ Interval DP — similar to Matrix Chain Multiplication.",
    },

    /* ── Q7 ── */
    {
      q: "Word Ladder II — find ALL shortest transformation sequences. What combination of algorithms do you need?",
      opts: [
        "DFS only",
        "BFS for shortest distance + DFS/backtracking for path reconstruction",
        "Dijkstra only",
        "Topo sort",
      ],
      ans: "BFS for shortest distance + DFS/backtracking for path reconstruction",
      cat: "DSA",
      exp: "Step 1: BFS from beginWord: find the minimum number of transformations to reach endWord.<br/>Step 2: During BFS, record parent mappings: for each word, store which words it was reached from.<br/>Step 3: BFS level-by-level ensures shortest paths. Stop expanding a word once it has been visited at a certain level.<br/>Step 4: After BFS, use DFS/backtracking from endWord back to beginWord using parent map to reconstruct all paths.<br/>Step 5: Reverse paths for output. Pruning: only follow edges in the BFS DAG (don't revisit higher levels).<br/>✅ BFS builds the shortest-path DAG; DFS reconstructs all paths through it.",
    },

    /* ── Q8 ── */
    {
      q: "What is a Segment Tree and what queries does it support in O(log N)?",
      opts: [
        "A sorted tree supporting only search",
        "A binary tree supporting range queries (sum, min, max) and point updates",
        "A tree for graph traversal",
        "A B-tree variant for databases",
      ],
      ans: "A binary tree supporting range queries (sum, min, max) and point updates",
      cat: "DSA",
      exp: "Step 1: A Segment Tree is a binary tree where each node stores the result of a range query (e.g., sum) for its segment.<br/>Step 2: Leaf nodes = individual array elements. Internal nodes = aggregate of children.<br/>Step 3: Build: O(N). Point update: O(log N) — update leaf, propagate up.<br/>Step 4: Range query: O(log N) — recursively combine relevant segments.<br/>Step 5: Applications: Range sum, Range min/max, Range GCD, Lazy propagation for range updates.<br/>✅ Build O(N), Update O(log N), Query O(log N).",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Segment Tree — Range Sum [0..5]</text>
  <!-- Root -->
  <rect x="120" y="20" width="60" height="24" rx="4" fill="#6c63ff" opacity="0.9"/>
  <text x="132" y="36" fill="white" font-size="10">36 [0-5]</text>
  <!-- Level 1 -->
  <rect x="50"  y="60" width="60" height="24" rx="4" fill="#3b82f6" opacity="0.85"/>
  <text x="58"  y="76" fill="white" font-size="10">15 [0-2]</text>
  <rect x="190" y="60" width="60" height="24" rx="4" fill="#3b82f6" opacity="0.85"/>
  <text x="198" y="76" fill="white" font-size="10">21 [3-5]</text>
  <!-- Level 2 -->
  <rect x="10"  y="104" width="40" height="22" rx="3" fill="#a78bfa" opacity="0.8"/>
  <text x="14"  y="119" fill="white" font-size="9">9[0-1]</text>
  <rect x="90"  y="104" width="28" height="22" rx="3" fill="#a78bfa" opacity="0.8"/>
  <text x="92"  y="119" fill="white" font-size="9">6[2]</text>
  <rect x="160" y="104" width="40" height="22" rx="3" fill="#a78bfa" opacity="0.8"/>
  <text x="163" y="119" fill="white" font-size="9">15[3-4]</text>
  <rect x="250" y="104" width="28" height="22" rx="3" fill="#a78bfa" opacity="0.8"/>
  <text x="252" y="119" fill="white" font-size="9">6[5]</text>
  <!-- Lines -->
  <line x1="150" y1="44" x2="90"  y2="60" stroke="#475569" stroke-width="1.2"/>
  <line x1="150" y1="44" x2="210" y2="60" stroke="#475569" stroke-width="1.2"/>
  <line x1="80"  y1="84" x2="35"  y2="104" stroke="#475569" stroke-width="1.2"/>
  <line x1="80"  y1="84" x2="100" y2="104" stroke="#475569" stroke-width="1.2"/>
  <line x1="220" y1="84" x2="175" y2="104" stroke="#475569" stroke-width="1.2"/>
  <line x1="220" y1="84" x2="260" y2="104" stroke="#475569" stroke-width="1.2"/>
  <text x="10" y="145" fill="#22c55e" font-size="9">Array: [1,2,3,4,5,6] → query(1,4)=14 in O(logN)</text>
</svg>`,
      },
    },

    /* ── Q9 ── */
    {
      q: "Interviewer: 'How does a Fenwick Tree (BIT) differ from a Segment Tree? When would you prefer it?'",
      opts: [
        "Fenwick Tree is slower; always use Segment Tree",
        "Fenwick Tree: simpler, O(log N) prefix sum + point update, less memory. Prefer when range sum only is needed",
        "Fenwick Tree supports range updates natively without lazy propagation",
        "Fenwick Tree requires O(N log N) build time",
      ],
      ans: "Fenwick Tree: simpler, O(log N) prefix sum + point update, less memory. Prefer when range sum only is needed",
      cat: "DSA",
      exp: "Step 1: Fenwick Tree (Binary Indexed Tree): O(N) space, simpler code, O(log N) for prefix sum and point update.<br/>Step 2: Segment Tree: O(N) space (4N array), supports more query types (min, max, GCD, etc.) with lazy propagation for range updates.<br/>Step 3: Fenwick Tree uses the lowest set bit trick: i += i&(-i) to navigate up, i -= i&(-i) to navigate down.<br/>Step 4: If you only need prefix sum + point update → Fenwick Tree wins (less constant factor, simpler code).<br/>Step 5: If you need range min/max or range updates → Segment Tree is necessary.<br/>✅ Fenwick for sum queries; Segment Tree for complex range operations.",
    },

    /* ── Q10 ── */
    {
      q: "Backtracking with pruning: given N queens puzzle, what is the key pruning condition?",
      opts: [
        "Skip if row is already filled",
        "Skip if column, or either diagonal is already attacked by a placed queen",
        "Skip if row count exceeds N/2",
        "Always place in the first available column",
      ],
      ans: "Skip if column, or either diagonal is already attacked by a placed queen",
      cat: "DSA",
      exp: "Step 1: Place queens row by row. For each row, try each column.<br/>Step 2: Pruning: for position (row, col) — check if col is used, or if (row-col) is used (left diagonal), or if (row+col) is used (right diagonal).<br/>Step 3: Use three hash sets/booleans for O(1) conflict checks — avoid O(N) scan.<br/>Step 4: If any conflict → skip (prune) → backtrack to previous row.<br/>Step 5: Without pruning: O(N^N). With pruning: reduces to O(N!) and further in practice.<br/>✅ Three sets for col, diag1 (row-col), diag2 (row+col).",
    },

    /* ── Q11 ── */
    {
      q: "Bit Manipulation: How do you check if a number N is a power of 2 in O(1)?",
      opts: [
        "N % 2 == 0",
        "N & (N-1) == 0 and N > 0",
        "N >> 1 == 1",
        "log2(N) is integer",
      ],
      ans: "N & (N-1) == 0 and N > 0",
      cat: "DSA",
      exp: "Step 1: Powers of 2 in binary have exactly ONE bit set: 1→0001, 2→0010, 4→0100, 8→1000.<br/>Step 2: N-1 flips the lowest set bit and sets all lower bits: e.g., 8-1=7 → 0111.<br/>Step 3: N & (N-1) clears the lowest set bit. If result is 0, only one bit was set → power of 2.<br/>Step 4: Check N > 0 to exclude 0 (which would also pass the & check).<br/>Step 5: Examples: N=8 → 1000 & 0111 = 0 ✓. N=6 → 0110 & 0101 = 0100 ≠ 0 ✗.<br/>✅ N > 0 && (N & (N-1)) == 0.",
    },

    /* ── Q12 ── */
    {
      q: "Interviewer gives you: 'Find the two non-repeating elements in an array where every other element appears twice.' What bit trick do you use?",
      opts: [
        "Sort and scan",
        "XOR all elements to get x^y, then use rightmost set bit to partition and XOR groups separately",
        "Use a frequency map",
        "Subtract sum of pairs from total sum",
      ],
      ans: "XOR all elements to get x^y, then use rightmost set bit to partition and XOR groups separately",
      cat: "DSA",
      exp: "Step 1: XOR all elements. Pairs cancel out → result = x XOR y (the two unique numbers).<br/>Step 2: In x XOR y, a set bit means x and y differ at that bit position.<br/>Step 3: Find rightmost set bit: mask = (xor_all) & -(xor_all).<br/>Step 4: Partition all elements into two groups based on whether that bit is set. XOR each group → one group gives x, other gives y.<br/>Step 5: O(N) time, O(1) extra space.<br/>✅ Two-pass XOR with rightmost set bit partitioning.",
    },

    /* ── Q13 ── */
    {
      q: "What is the difference between 0/1 Knapsack and Unbounded Knapsack at the DP transition level?",
      opts: [
        "No difference; both use the same recurrence",
        "0/1: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]). Unbounded: dp[w] = max(dp[w], dp[w-wt[i]] + val[i]) using same item again",
        "Unbounded only works with greedy",
        "0/1 Knapsack requires sorting items by value",
      ],
      ans: "0/1: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]). Unbounded: dp[w] = max(dp[w], dp[w-wt[i]] + val[i]) using same item again",
      cat: "DSA",
      exp: "Step 1: 0/1 Knapsack: each item can be used AT MOST once. dp[i][w] = max of NOT taking item i (dp[i-1][w]) or taking it (dp[i-1][w-wt[i]] + val[i]).<br/>Step 2: Key: use dp[i-1] (previous row) to ensure item is not reused.<br/>Step 3: Unbounded Knapsack: each item can be reused unlimited times. Inner loop iterates forward: dp[w] = max(dp[w], dp[w-wt[i]] + val[i]).<br/>Step 4: Key difference: Unbounded reads from the SAME row (allowing reuse). 0/1 reads from the PREVIOUS row.<br/>Step 5: Space optimization for 0/1: iterate w backwards. Unbounded: iterate w forwards.<br/>✅ Iteration direction is the key difference.",
    },

    /* ── Q14 ── */
    {
      q: "Given a weighted directed graph, you need to find shortest paths but there are negative weight edges (no negative cycles). Which algorithm do you use?",
      opts: ["Dijkstra", "BFS", "Bellman-Ford", "Prim's"],
      ans: "Bellman-Ford",
      cat: "DSA",
      exp: "Step 1: Dijkstra's greedy assumption fails with negative edges — it may finalize a wrong shortest distance.<br/>Step 2: Bellman-Ford: relax all E edges V-1 times → guarantees shortest paths even with negative edges.<br/>Step 3: After V-1 relaxations, if any edge can still be relaxed → negative cycle exists.<br/>Step 4: Time: O(V×E). Space: O(V).<br/>Step 5: Use case: currency arbitrage detection, network routing with negative costs.<br/>✅ Bellman-Ford handles negative weights.",
    },

    /* ── Q15 ── */
    {
      q: "Merge K sorted lists optimally. What data structure do you use and what is the time complexity?",
      opts: [
        "Merge one by one → O(NK²)",
        "Min-Heap of size K → insert the head of each list; O(N log K)",
        "Sort all elements → O(NK log NK)",
        "Use divide and conquer → O(NK)",
      ],
      ans: "Min-Heap of size K → insert the head of each list; O(N log K)",
      cat: "DSA",
      exp: "Step 1: Initialize a Min-Heap with the first node of each of the K lists → O(K log K).<br/>Step 2: Pop the minimum element from the heap → O(log K). Add it to the result list.<br/>Step 3: Push the next node from the same list that the popped node came from → O(log K).<br/>Step 4: Repeat until the heap is empty. Total N elements each pushed/popped once → O(N log K).<br/>Step 5: N = total number of nodes across all lists. K = number of lists.<br/>✅ Min-Heap approach: O(N log K) — optimal for this problem.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Merge K Sorted Lists via Min-Heap</text>
  <!-- Lists -->
  <text x="10" y="35" fill="#6c63ff">L1: 1 → 4 → 7</text>
  <text x="10" y="55" fill="#3b82f6">L2: 2 → 5 → 8</text>
  <text x="10" y="75" fill="#a78bfa">L3: 3 → 6 → 9</text>
  <!-- Min Heap -->
  <rect x="160" y="22" width="125" height="70" rx="6" fill="#1e293b" stroke="#334155"/>
  <text x="168" y="38" fill="#94a3b8" font-size="10">Min-Heap (size K=3)</text>
  <rect x="168" y="44" width="30" height="18" rx="3" fill="#6c63ff" opacity="0.9"/>
  <text x="177" y="57" fill="white" font-size="10">1</text>
  <rect x="204" y="44" width="30" height="18" rx="3" fill="#3b82f6" opacity="0.9"/>
  <text x="213" y="57" fill="white" font-size="10">2</text>
  <rect x="240" y="44" width="30" height="18" rx="3" fill="#a78bfa" opacity="0.9"/>
  <text x="249" y="57" fill="white" font-size="10">3</text>
  <text x="168" y="82" fill="#22c55e" font-size="10">Pop 1 → push L1.next(4)</text>
  <!-- Output -->
  <text x="10" y="108" fill="#94a3b8" font-size="10">Output: 1 → 2 → 3 → 4 → 5 → 6 → ...</text>
  <text x="10" y="128" fill="#fbbf24" font-size="10">Time: O(N log K) | Space: O(K)</text>
</svg>`,
      },
    },

    /* ── Q16 ── */
    {
      q: "State compression DP: in the Traveling Salesman Problem (TSP), what does dp[mask][i] represent?",
      opts: [
        "Number of nodes visited in mask ending at node i",
        "Minimum cost to visit exactly the nodes in mask, ending at node i",
        "Maximum path length ending at node i",
        "Bitmask of visited edges ending at node i",
      ],
      ans: "Minimum cost to visit exactly the nodes in mask, ending at node i",
      cat: "DSA",
      exp: "Step 1: mask is a bitmask representing the SET of visited cities. Bit j set = city j visited.<br/>Step 2: dp[mask][i] = minimum cost of a path that visits exactly the cities in mask and ends at city i.<br/>Step 3: Transition: dp[mask | (1<<j)][j] = min(dp[mask][i] + dist[i][j]) for all j not in mask.<br/>Step 4: Base case: dp[1<<0][0] = 0 (start at city 0, only city 0 visited).<br/>Step 5: Answer: min(dp[(1<<N)-1][i] + dist[i][0]) for all i.<br/>Time: O(2^N × N²). Space: O(2^N × N).<br/>✅ State compression DP is the standard TSP approach for N ≤ 20.",
    },

    /* ── Q17 ── */
    {
      q: "How does Lazy Propagation improve a Segment Tree that handles range updates?",
      opts: [
        "It skips building the tree",
        "It defers updates — marks nodes as 'lazy' and only propagates when a node is actually accessed",
        "It compresses the tree by merging nodes",
        "It sorts updates before applying them",
      ],
      ans: "It defers updates — marks nodes as 'lazy' and only propagates when a node is actually accessed",
      cat: "DSA",
      exp: "Step 1: Without lazy propagation, a range update (add X to all elements in [l,r]) takes O(N) — must update every leaf.<br/>Step 2: With lazy: when updating a range, if the current node's segment is fully inside [l,r], update the node's value and store the pending change in its 'lazy' tag.<br/>Step 3: Don't recurse into children yet — they'll get the update when actually accessed (queried or updated).<br/>Step 4: Before accessing children, 'push down' (propagate) the lazy tag to children and clear the current node's tag.<br/>Step 5: Result: range update in O(log N), range query in O(log N).<br/>✅ Lazy propagation achieves O(log N) range updates.",
    },

    /* ── Q18 ── */
    {
      q: "Count the number of set bits in an integer N efficiently. What is the Brian Kernighan's trick?",
      opts: [
        "Shift right N times and check last bit",
        "N = N & (N-1) repeatedly — each operation removes the lowest set bit; count iterations",
        "Use N XOR (N>>1)",
        "Precompute a lookup table only",
      ],
      ans: "N = N & (N-1) repeatedly — each operation removes the lowest set bit; count iterations",
      cat: "DSA",
      exp: "Step 1: N & (N-1) clears the lowest set bit of N. Example: N=12 (1100) → 12&11 = 1000 = 8.<br/>Step 2: Repeat until N=0. Count iterations → number of set bits (popcount).<br/>Step 3: Time: O(number of set bits) — much faster than O(32) shift approach for sparse bitmasks.<br/>Step 4: This is Brian Kernighan's Algorithm for counting set bits.<br/>Step 5: Most languages also have built-in: __builtin_popcount (C++), Integer.bitCount (Java), bin(n).count('1') (Python).<br/>✅ N &= (N-1) in a loop — O(set bits count) operations.",
    },

    /* ── Q19 ── */
    {
      q: "LCS (Longest Common Subsequence) vs LIS (Longest Increasing Subsequence). Which one can be solved in O(N log N)?",
      opts: [
        "LCS with patience sorting",
        "LIS using binary search (patience sorting approach)",
        "Both in O(N log N)",
        "Neither; both require O(N²)",
      ],
      ans: "LIS using binary search (patience sorting approach)",
      cat: "DSA",
      exp: "Step 1: LCS: requires comparing two sequences → O(M×N) DP. No known O((M+N) log(M+N)) general solution.<br/>Step 2: LIS (Longest Increasing Subsequence): standard DP is O(N²).<br/>Step 3: Optimized LIS: maintain a 'tails' array where tails[i] = smallest tail of all increasing subsequences of length i+1.<br/>Step 4: For each element, binary search in tails to find where to place it → O(log N) per element → O(N log N) total.<br/>Step 5: The tails array length at the end = LIS length. The array itself is NOT the actual LIS — just lengths.<br/>✅ LIS can be solved in O(N log N) via patience sorting / binary search.",
    },

    /* ── Q20 ── */
    {
      q: "You're asked to implement a Graph's Strongly Connected Components (SCCs). Which two algorithms solve this?",
      opts: [
        "Dijkstra and Bellman-Ford",
        "Kosaraju's (two DFS passes) and Tarjan's (single DFS with low-link values)",
        "Prim's and Kruskal's",
        "BFS and Topological Sort",
      ],
      ans: "Kosaraju's (two DFS passes) and Tarjan's (single DFS with low-link values)",
      cat: "DSA",
      exp: "Step 1: SCC = maximal set of vertices where every vertex is reachable from every other vertex.<br/>Step 2: Kosaraju's: (1) DFS on original graph, push nodes to stack by finish time. (2) Transpose graph. (3) DFS in reverse finish order on transposed graph — each DFS tree is an SCC.<br/>Step 3: Tarjan's: single DFS using discovery time and low-link values. Maintain a stack. When low[v] == disc[v], pop the stack to get an SCC.<br/>Step 4: Both run in O(V + E).<br/>Step 5: Applications: finding cycles, compiler optimization, deadlock detection.<br/>✅ Kosaraju's (2 DFS) and Tarjan's (1 DFS with stack).",
    },

    /* ── Q21 ── */
    {
      q: "What is the time complexity of building a Heap from an unsorted array? Why is it O(N) and not O(N log N)?",
      opts: [
        "O(N log N) — each element takes O(log N) to insert",
        "O(N) — heapify from bottom up; most nodes are near leaves and take O(1) time",
        "O(N²) — bubble sort approach",
        "O(log N) — only root needs fixing",
      ],
      ans: "O(N) — heapify from bottom up; most nodes are near leaves and take O(1) time",
      cat: "DSA",
      exp: "Step 1: Naïve approach: insert one by one → O(N log N).<br/>Step 2: Floyd's algorithm: start from last non-leaf (index N/2-1) and call sift-down for each node up to root.<br/>Step 3: Nodes at depth d have at most (N/2^d) sift-down operations of O(d) each.<br/>Step 4: Total work = Σ (N/2^d) × d for d=1 to log N = O(N) by geometric series analysis.<br/>Step 5: Most nodes (half) are leaves → 0 sift-down work. Quarter of nodes do 1 swap. Etc.<br/>✅ Bottom-up heapify = O(N). This is why HeapSort's build phase is O(N).",
    },

    /* ── Q22 ── */
    {
      q: "Explain how you'd detect a cycle in a directed graph. What algorithm and data structures do you use?",
      opts: [
        "BFS with visited set",
        "DFS with two color states: VISITING (gray) and VISITED (black); back edge indicates cycle",
        "Union-Find",
        "Topological sort only",
      ],
      ans: "DFS with two color states: VISITING (gray) and VISITED (black); back edge indicates cycle",
      cat: "DSA",
      exp: "Step 1: Use three states for each node: UNVISITED (white), VISITING (gray/in-stack), VISITED (black).<br/>Step 2: Start DFS from each unvisited node. Mark it VISITING before exploring neighbors.<br/>Step 3: If a neighbor is VISITING (gray) → it's still in the current DFS path → BACK EDGE → CYCLE found.<br/>Step 4: After exploring all neighbors, mark node as VISITED (black).<br/>Step 5: For undirected graphs: a simpler visited[] + parent tracking suffices. Don't revisit the parent.<br/>Alternative: Kahn's algorithm — if topological sort can't process all V nodes, there's a cycle.<br/>✅ DFS with gray/black coloring for directed graphs.",
    },

    /* ── Q23 ── */
    {
      q: "What is the 'Coin Change' problem DP pattern, and how does it differ from 0/1 Knapsack?",
      opts: [
        "Same as 0/1 Knapsack — each coin used once",
        "Unbounded Knapsack variant — each coin can be used unlimited times; iterate forward in inner loop",
        "Greedy always works for Coin Change",
        "Uses DFS with backtracking only",
      ],
      ans: "Unbounded Knapsack variant — each coin can be used unlimited times; iterate forward in inner loop",
      cat: "DSA",
      exp: "Step 1: Coin Change: given coins[] and amount, find min coins to make that amount. Coins can be reused → Unbounded Knapsack.<br/>Step 2: dp[0] = 0. dp[w] = min(dp[w-coin] + 1) for each coin ≤ w.<br/>Step 3: Inner loop iterates forward (w from 1 to amount) → allows reuse of same coin.<br/>Step 4: If dp[amount] remains INF → impossible to form the amount.<br/>Step 5: Coin Change II (count ways): dp[w] += dp[w-coin] → similar pattern but counting instead of minimizing.<br/>✅ Unbounded Knapsack pattern; forward inner loop allows coin reuse.",
    },

    /* ── Q24 ── */
    {
      q: "Visualize this: given array [3,1,4,1,5,9], what does the Monotonic Stack contain after processing all elements for 'Next Greater Element'?",
      opts: [
        "[3,4,5,9]",
        "[] (empty — 9 has no greater element, stack clears for all others)",
        "[1,9]",
        "[9]",
      ],
      ans: "[9]",
      cat: "DSA",
      exp: "Step 1: Process elements left to right. Stack holds elements whose 'next greater' hasn't been found yet.<br/>Step 2: 3 → push [3]. 1 → push [3,1]. 4 → 4>1: pop 1 (NGE=4), 4>3: pop 3 (NGE=4) → push [4].<br/>Step 3: 1 → push [4,1]. 5 → 5>1: pop (NGE=5), 5>4: pop (NGE=5) → push [5].<br/>Step 4: 9 → 9>5: pop (NGE=9) → push [9]. End of array → 9 has no NGE → stack = [9].<br/>Step 5: NGE results: 3→4, 1→4, 4→5, 1→5, 5→9, 9→-1.<br/>✅ After processing all elements, stack = [9] (the largest element with no NGE).",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 145" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Next Greater Element — Monotonic Stack</text>
  <!-- Array -->
  <text x="10" y="32" fill="#94a3b8" font-size="10">Array: </text>
  <rect x="55"  y="20" width="28" height="20" rx="3" fill="#6c63ff" opacity="0.8"/><text x="63"  y="34" fill="white">3</text>
  <rect x="85"  y="20" width="28" height="20" rx="3" fill="#3b82f6" opacity="0.8"/><text x="93"  y="34" fill="white">1</text>
  <rect x="115" y="20" width="28" height="20" rx="3" fill="#22c55e" opacity="0.8"/><text x="123" y="34" fill="white">4</text>
  <rect x="145" y="20" width="28" height="20" rx="3" fill="#3b82f6" opacity="0.8"/><text x="153" y="34" fill="white">1</text>
  <rect x="175" y="20" width="28" height="20" rx="3" fill="#22c55e" opacity="0.8"/><text x="183" y="34" fill="white">5</text>
  <rect x="205" y="20" width="28" height="20" rx="3" fill="#f59e0b" opacity="0.8"/><text x="213" y="34" fill="white">9</text>
  <!-- NGE results -->
  <text x="10" y="60"  fill="#94a3b8" font-size="10">NGE results:</text>
  <text x="10" y="76"  fill="#6c63ff" font-size="10">3 → 4</text>
  <text x="60" y="76"  fill="#3b82f6" font-size="10">1 → 4</text>
  <text x="110" y="76" fill="#22c55e" font-size="10">4 → 5</text>
  <text x="160" y="76" fill="#3b82f6" font-size="10">1 → 5</text>
  <text x="210" y="76" fill="#22c55e" font-size="10">5 → 9</text>
  <text x="10" y="92"  fill="#f59e0b" font-size="10">9 → -1 (no greater element)</text>
  <!-- Stack state -->
  <rect x="10" y="104" width="280" height="30" rx="4" fill="#1e293b" stroke="#334155"/>
  <text x="18" y="124" fill="#94a3b8" font-size="10">Final Stack (bottom→top): </text>
  <rect x="180" y="108" width="26" height="22" rx="3" fill="#f59e0b" opacity="0.9"/>
  <text x="188" y="123" fill="white" font-size="10">9</text>
  <text x="212" y="123" fill="#22c55e" font-size="10">← top</text>
</svg>`,
      },
    },

    /* ── Q25 ── */
    {
      q: "What is the key difference between DFS-based and BFS-based approaches in finding shortest paths in an unweighted graph?",
      opts: [
        "DFS always finds shorter paths",
        "BFS guarantees shortest path in an unweighted graph; DFS does not",
        "Both are equivalent for unweighted graphs",
        "DFS is O(V) while BFS is O(V²)",
      ],
      ans: "BFS guarantees shortest path in an unweighted graph; DFS does not",
      cat: "DSA",
      exp: "Step 1: BFS explores nodes level by level — first by distance 1, then 2, then 3, etc.<br/>Step 2: The first time BFS reaches a node, it has found the shortest path (minimum edges) to it.<br/>Step 3: DFS explores as deep as possible first — it may find a long path to a node before finding the short one.<br/>Step 4: For weighted graphs: neither BFS nor DFS works → use Dijkstra or Bellman-Ford.<br/>Step 5: BFS shortest path: O(V+E). Works for unit weights only.<br/>✅ BFS = shortest path for unweighted graphs. DFS ≠ shortest path.",
    },

    /* ── Q26 ── */
    {
      q: "Multi-dimensional DP: 'Edit Distance' (Levenshtein). What does dp[i][j] represent and what is the recurrence?",
      opts: [
        "Length of LCS of first i and j characters",
        "Minimum operations to convert first i chars of word1 to first j chars of word2",
        "Number of character matches at positions i and j",
        "Maximum common prefix length",
      ],
      ans: "Minimum operations to convert first i chars of word1 to first j chars of word2",
      cat: "DSA",
      exp: "Step 1: dp[i][j] = min operations (insert, delete, replace) to convert word1[0..i-1] to word2[0..j-1].<br/>Step 2: Base cases: dp[i][0] = i (delete i chars), dp[0][j] = j (insert j chars).<br/>Step 3: If word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1] (no operation needed).<br/>Step 4: Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) → delete, insert, or replace.<br/>Step 5: O(M×N) time and space. Can be space-optimized to O(min(M,N)) using two rows.<br/>✅ Classic 2D DP — must know for senior interviews.",
    },

    /* ── Q27 ── */
    {
      q: "You see this in an interview: array [2, 3, -1, 8, 4]. Find the maximum product subarray. What DP states do you track?",
      opts: [
        "Only current maximum product",
        "Both current maximum AND current minimum product (because negative × negative = positive)",
        "Running sum and running product",
        "Prefix product only",
      ],
      ans: "Both current maximum AND current minimum product (because negative × negative = positive)",
      cat: "DSA",
      exp: "Step 1: A negative number can flip min to max and max to min — so track both.<br/>Step 2: At each element x: new_max = max(x, prev_max×x, prev_min×x). new_min = min(x, prev_max×x, prev_min×x).<br/>Step 3: Update global answer with new_max at each step.<br/>Step 4: Example: [2,3,-1,8,4] → max_prod considering all subarrays = 8×4=32? No: check all → max is 2×3=6, then -1 kills it, 8×4=32. Answer: 32.<br/>Step 5: Edge case: all negatives (e.g., [-2,-3,-4]) → answer = 12 (product of all three negatives).<br/>✅ Track both max and min at each step due to sign flipping.",
    },

    /* ── Q28 ── */
    {
      q: "Explain the Union-Find (Disjoint Set Union) data structure. What are its two key optimizations?",
      opts: [
        "Hashing and sorting",
        "Path Compression (find) and Union by Rank/Size — together achieve near O(1) amortized per operation",
        "Memoization and tabulation",
        "Lazy evaluation and eager loading",
      ],
      ans: "Path Compression (find) and Union by Rank/Size — together achieve near O(1) amortized per operation",
      cat: "DSA",
      exp: "Step 1: Union-Find tracks connected components. find(x) returns the root of x's component. union(x,y) merges components.<br/>Step 2: Path Compression (find): when finding root, make every node on the path point directly to root → flattens the tree.<br/>Step 3: Union by Rank: attach smaller tree under larger tree's root → keeps tree height low.<br/>Step 4: Together: amortized O(α(N)) per operation where α is the inverse Ackermann function — effectively O(1).<br/>Step 5: Applications: Kruskal's MST, cycle detection, network connectivity, image segmentation.<br/>✅ Path Compression + Union by Rank → O(α(N)) ≈ O(1).",
    },

    /* ── Q29 ── */
    {
      q: "Kruskal's vs Prim's for Minimum Spanning Tree — when do you prefer each?",
      opts: [
        "Always use Kruskal's",
        "Kruskal's for sparse graphs (sort edges, use DSU). Prim's for dense graphs (use Min-Heap on vertices)",
        "Prim's for directed, Kruskal's for undirected",
        "They produce different MSTs, so choice depends on correctness",
      ],
      ans: "Kruskal's for sparse graphs (sort edges, use DSU). Prim's for dense graphs (use Min-Heap on vertices)",
      cat: "DSA",
      exp: "Step 1: Kruskal's: sort all E edges by weight O(E log E), then greedily add edge if it doesn't form a cycle (DSU). Total: O(E log E).<br/>Step 2: Prim's: start from any vertex, greedily expand MST by adding minimum-weight edge crossing the cut. With Min-Heap: O(E log V).<br/>Step 3: For sparse graphs (E ≈ V): Kruskal's edge sorting is efficient. For dense graphs (E ≈ V²): Prim's with adjacency matrix is O(V²) — can beat Kruskal's O(V² log V).<br/>Step 4: Both algorithms produce a correct MST (may differ in ties).<br/>✅ Kruskal = edge-based (sparse). Prim = vertex-based (dense).",
    },

    /* ── Q30 ── */
    {
      q: "What is the problem with naive recursion for Fibonacci? How does memoization fix it, and what is the time complexity of both?",
      opts: [
        "Naive: O(2^N). Memoized: O(N) time O(N) space",
        "Naive: O(N²). Memoized: O(N log N)",
        "Both are O(N) — only space differs",
        "Naive: O(N log N). Memoized: O(log N)",
      ],
      ans: "Naive: O(2^N). Memoized: O(N) time O(N) space",
      cat: "DSA",
      exp: "Step 1: Naive fib(n) = fib(n-1) + fib(n-2) creates an exponential recursion tree — many subproblems repeated.<br/>Step 2: fib(5) calls fib(3) twice. fib(4) calls fib(2) three times. Total calls ≈ 2^N → O(2^N).<br/>Step 3: Memoization: store fib(k) when first computed in a hash map or array. Subsequent calls return in O(1).<br/>Step 4: Each unique subproblem (0 to N) computed exactly once → O(N) time, O(N) space for the memo table.<br/>Step 5: Further optimize: bottom-up DP with just two variables → O(N) time, O(1) space.<br/>✅ Naive O(2^N) → Memoized O(N) — the power of caching.",
    },

    /* ── Q31 ── */
    {
      q: "Interviewer: 'Given an array, find all subsets whose XOR equals a target K.' What is the approach?",
      opts: [
        "Sort and binary search",
        "DP with states dp[i][xor] = number of subsets from first i elements with XOR = xor",
        "Brute force only — XOR problems can't use DP",
        "Greedy selection by highest bit",
      ],
      ans: "DP with states dp[i][xor] = number of subsets from first i elements with XOR = xor",
      cat: "DSA",
      exp: "Step 1: dp[i][x] = number of subsets of first i elements having XOR value x.<br/>Step 2: For each element arr[i]: either INCLUDE it (XOR flips: dp[i][x] contributes to dp[i+1][x^arr[i]]) or EXCLUDE it (dp[i][x] contributes to dp[i+1][x]).<br/>Step 3: Transition: dp[i+1][x^arr[i]] += dp[i][x] (include). dp[i+1][x] += dp[i][x] (exclude).<br/>Step 4: Max XOR value ≤ max(arr) → state space is O(N × max_xor).<br/>Step 5: Answer = dp[N][K].<br/>✅ XOR subset counting with DP bitmasking on XOR values.",
    },

    /* ── Q32 ── */
    {
      q: "You're asked to solve 'Trapping Rain Water'. What is the two-pointer approach and its complexity?",
      opts: [
        "O(N²) — check every pair",
        "O(N) time O(1) space — two pointers, track left_max and right_max, move the smaller side inward",
        "O(N log N) — sort and scan",
        "O(N) time O(N) space — prefix max and suffix max arrays",
      ],
      ans: "O(N) time O(1) space — two pointers, track left_max and right_max, move the smaller side inward",
      cat: "DSA",
      exp: "Step 1: Two pointers: left=0, right=N-1. Track left_max and right_max.<br/>Step 2: If height[left] <= height[right]: water at left = left_max - height[left] (bounded by left_max). Increment left.<br/>Step 3: Else: water at right = right_max - height[right]. Decrement right.<br/>Step 4: The key insight: the side with the smaller max height is the bottleneck — water is bounded by the minimum of left_max and right_max.<br/>Step 5: O(N) time, O(1) space. Compare with O(N) time O(N) space prefix/suffix max approach.<br/>✅ Two-pointer: O(N) time O(1) space — optimal solution.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Trapping Rain Water</text>
  <!-- Bars -->
  <g transform="translate(10, 100)">
    <rect x="0"   y="-40" width="18" height="40" fill="#6c63ff" opacity="0.8"/>
    <rect x="20"  y="-10" width="18" height="10" fill="#6c63ff" opacity="0.8"/>
    <rect x="40"  y="-30" width="18" height="30" fill="#6c63ff" opacity="0.8"/>
    <rect x="60"  y="-10" width="18" height="10" fill="#6c63ff" opacity="0.8"/>
    <rect x="80"  y="-20" width="18" height="20" fill="#6c63ff" opacity="0.8"/>
    <rect x="100" y="-5"  width="18" height="5"  fill="#6c63ff" opacity="0.8"/>
    <rect x="120" y="-50" width="18" height="50" fill="#6c63ff" opacity="0.8"/>
    <rect x="140" y="-10" width="18" height="10" fill="#6c63ff" opacity="0.8"/>
    <rect x="160" y="-30" width="18" height="30" fill="#6c63ff" opacity="0.8"/>
    <!-- Water fills -->
    <rect x="20"  y="-40" width="18" height="30" fill="#3b82f6" opacity="0.45"/>
    <rect x="40"  y="-40" width="18" height="10" fill="#3b82f6" opacity="0.45"/>
    <rect x="60"  y="-40" width="18" height="30" fill="#3b82f6" opacity="0.45"/>
    <rect x="80"  y="-40" width="18" height="20" fill="#3b82f6" opacity="0.45"/>
    <rect x="100" y="-40" width="18" height="35" fill="#3b82f6" opacity="0.45"/>
    <rect x="140" y="-50" width="18" height="40" fill="#3b82f6" opacity="0.45"/>
  </g>
  <text x="10"  y="118" fill="#6c63ff" font-size="9">L</text>
  <text x="248" y="118" fill="#22c55e" font-size="9">R</text>
  <text x="10"  y="130" fill="#fbbf24" font-size="10">Trapped = 14 units | O(N) time O(1) space</text>
</svg>`,
      },
    },

    /* ── Q33 ── */
    {
      q: "How would you detect if a linked list has a cycle and find the cycle's start node? State the algorithm.",
      opts: [
        "Use a HashSet of visited nodes",
        "Floyd's Cycle Detection: fast/slow pointers. Cycle exists if they meet. To find start: reset one to head, advance both by 1 until they meet",
        "Reverse the list and check if original head appears again",
        "Count nodes and compare with expected length",
      ],
      ans: "Floyd's Cycle Detection: fast/slow pointers. Cycle exists if they meet. To find start: reset one to head, advance both by 1 until they meet",
      cat: "DSA",
      exp: "Step 1: Floyd's Algorithm — slow moves 1 step, fast moves 2 steps. If they ever meet → cycle exists.<br/>Step 2: When they meet: distance from meeting point to cycle start = distance from head to cycle start.<br/>Step 3: Reset one pointer to head. Both now advance 1 step at a time. They meet at the cycle start node.<br/>Step 4: Mathematical proof: let distance from head to cycle start = a, cycle length = c, meeting point at distance b into cycle. Then: fast - slow = n×c. Reset logic gives a ≡ (c - b) mod c → they meet at cycle start.<br/>Step 5: O(N) time, O(1) space.<br/>✅ Floyd's Cycle Detection: meet to detect, reset to find start.",
    },

    /* ── Q34 ── */
    {
      q: "Given N points on a 2D plane, find the pair with the smallest distance. What algorithm achieves below O(N²)?",
      opts: [
        "Sort by X and scan",
        "Divide and Conquer: split by median X, solve recursively, check strip of width 2δ — O(N log N)",
        "Randomized approach only",
        "KD-Tree always required",
      ],
      ans: "Divide and Conquer: split by median X, solve recursively, check strip of width 2δ — O(N log N)",
      cat: "DSA",
      exp: "Step 1: Sort all points by X coordinate: O(N log N).<br/>Step 2: Divide: split at median X into left and right halves. Recursively find min distances δL and δR. δ = min(δL, δR).<br/>Step 3: Conquer: check pairs across the dividing line within a vertical strip of width 2δ.<br/>Step 4: Key insight: within the strip, each point needs to check at most 7 other points (proved geometrically) → strip check is O(N).<br/>Step 5: Recurrence: T(N) = 2T(N/2) + O(N log N) → O(N log² N). With pre-sort by Y: O(N log N).<br/>✅ Divide and Conquer Closest Pair: O(N log N).",
    },

    /* ── Q35 ── */
    {
      q: "Bit manipulation: XOR of all numbers from 1 to N follows a pattern. What is XOR(1 to 6)?",
      opts: ["7", "3", "6", "0"],
      ans: "7",
      cat: "DSA",
      exp: "Step 1: XOR(1 to N) follows a 4-cycle pattern based on N mod 4:<br/>N%4==0: N. N%4==1: 1. N%4==2: N+1. N%4==3: 0.<br/>Step 2: N=6: 6%4 = 2 → XOR(1 to 6) = 6+1 = 7.<br/>Step 3: Verify: 1^2=3, 3^3=0, 0^4=4, 4^5=1, 1^6=7 ✓.<br/>Step 4: This trick is used in 'Single Number' variant problems — XOR range with XOR of given array.<br/>✅ XOR(1..6) = 7. Remember the 4-cycle: N, 1, N+1, 0.",
    },

    /* ── Q36 ── */
    {
      q: "DP on trees: how do you compute the diameter of a binary tree (longest path between any two nodes)?",
      opts: [
        "BFS from every node",
        "DFS: at each node, diameter through that node = left_depth + right_depth. Track global max; return max(left,right)+1",
        "Find deepest leaf twice",
        "Topo sort on tree edges",
      ],
      ans: "DFS: at each node, diameter through that node = left_depth + right_depth. Track global max; return max(left,right)+1",
      cat: "DSA",
      exp: "Step 1: For any path in a binary tree, there exists a 'highest node' (LCA of the two endpoints).<br/>Step 2: At each node, the longest path THROUGH that node = depth(left subtree) + depth(right subtree).<br/>Step 3: DFS returns the depth of each subtree. Update global_max with left_depth + right_depth at each node.<br/>Step 4: Return max(left_depth, right_depth) + 1 up to the parent.<br/>Step 5: O(N) time — single DFS pass. No need for multiple BFS runs.<br/>✅ Post-order DFS tracking global max path through each node.",
    },

    /* ── Q37 ── */
    {
      q: "How does Rabin-Karp string matching algorithm achieve average O(N+M) using hashing?",
      opts: [
        "Sorts the pattern and text then compares",
        "Uses a rolling hash — subtract outgoing character, add incoming, compare hash with pattern hash in O(1)",
        "Precomputes suffix array",
        "Uses XOR of characters as hash",
      ],
      ans: "Uses a rolling hash — subtract outgoing character, add incoming, compare hash with pattern hash in O(1)",
      cat: "DSA",
      exp: "Step 1: Compute hash of pattern P (length M). Compute hash of first M characters of text T.<br/>Step 2: Slide a window of size M across text. Rolling hash: remove leftmost char, add new rightmost char → hash update in O(1).<br/>Step 3: Rolling hash formula: hash = (hash × base - text[i-M] × base^M + text[i]) % prime.<br/>Step 4: If window hash == pattern hash: verify character by character (to handle collisions).<br/>Step 5: Average O(N+M) — rare hash collisions. Worst case O(NM) if many spurious matches.<br/>✅ Rolling hash enables O(1) window shift — key insight of Rabin-Karp.",
    },

    /* ── Q38 ── */
    {
      q: "You need to find all bridges (critical edges) in an undirected graph. Which algorithm finds them in O(V+E)?",
      opts: [
        "Remove each edge and check connectivity — O(E(V+E))",
        "Tarjan's Bridge Finding: DFS with discovery time and low-link values; edge u-v is bridge if low[v] > disc[u]",
        "Bellman-Ford variant",
        "Kruskal's MST — all MST edges are bridges",
      ],
      ans: "Tarjan's Bridge Finding: DFS with discovery time and low-link values; edge u-v is bridge if low[v] > disc[u]",
      cat: "DSA",
      exp: "Step 1: DFS from any node. Track disc[u] (discovery time) and low[u] (minimum discovery time reachable via back edges).<br/>Step 2: For each edge u→v in DFS tree: low[u] = min(low[u], low[v]).<br/>Step 3: Edge u-v is a BRIDGE if low[v] > disc[u] — meaning there's no back edge from v's subtree reaching u or above.<br/>Step 4: If the edge were removed, v's subtree would be disconnected from the rest.<br/>Step 5: O(V+E) — single DFS pass. Same framework finds articulation points: low[v] >= disc[u].<br/>✅ Tarjan's algorithm: O(V+E) for bridges and articulation points.",
    },

    /* ── Q39 ── */
    {
      q: "Interviewer asks: 'Count number of subarrays with sum equal to K.' What is the optimal approach?",
      opts: [
        "Sliding window (only works for positive arrays)",
        "Prefix sum + HashMap: count[prefix_sum - K] gives subarrays ending at current index with sum K; O(N)",
        "Two pointers",
        "Sort the array first",
      ],
      ans: "Prefix sum + HashMap: count[prefix_sum - K] gives subarrays ending at current index with sum K; O(N)",
      cat: "DSA",
      exp: "Step 1: Let prefix[i] = sum of first i elements. Subarray [j+1..i] has sum K iff prefix[i] - prefix[j] = K, i.e., prefix[j] = prefix[i] - K.<br/>Step 2: As we scan left to right, maintain a HashMap of prefix sum frequencies.<br/>Step 3: At each index i: count += map.getOrDefault(prefix - K, 0). Then map[prefix]++.<br/>Step 4: Initialize map with {0: 1} to handle subarrays starting from index 0.<br/>Step 5: Works with negative numbers (unlike sliding window). O(N) time, O(N) space.<br/>✅ Prefix sum + HashMap: O(N) — handles negatives. Sliding window fails with negatives.",
    },

    /* ── Q40 ── */
    {
      q: "What is the difference between a Complete Binary Tree and a Perfect Binary Tree? How does this affect a Heap?",
      opts: [
        "They are the same",
        "Perfect: all leaves at same level, all internal nodes have 2 children. Complete: all levels full except last, last level filled left to right. Heap is a Complete Binary Tree",
        "Complete has more nodes than Perfect",
        "Perfect allows missing children; Complete does not",
      ],
      ans: "Perfect: all leaves at same level, all internal nodes have 2 children. Complete: all levels full except last, last level filled left to right. Heap is a Complete Binary Tree",
      cat: "DSA",
      exp: "Step 1: Perfect Binary Tree: ALL levels fully filled. Exactly 2^h - 1 nodes for height h.<br/>Step 2: Complete Binary Tree: all levels except possibly the last are fully filled. Last level's nodes are as far left as possible.<br/>Step 3: A Heap is a Complete Binary Tree with heap property (min or max).<br/>Step 4: The 'complete' property enables array representation: parent of i is at (i-1)/2, children at 2i+1 and 2i+2.<br/>Step 5: Height of complete binary tree with N nodes = floor(log2 N) → sift operations are O(log N).<br/>✅ Heap = Complete Binary Tree. This enables O(1) array mapping.",
    },

    /* ── Q41 ── */
    {
      q: "Given array [1,3,2,6,4,5], trace the 'next permutation' algorithm. What is the output?",
      opts: [
        "[1,3,4,2,5,6]",
        "[1,3,4,6,2,5]",
        "[1,3,4,5,2,6]",
        "[1,4,2,3,5,6]",
      ],
      ans: "[1,3,4,2,5,6]",
      cat: "DSA",
      exp: "Step 1: Find the rightmost element that is smaller than its right neighbor. Scan right to left: arr[4]=4 < arr[5]=5 → pivot = index 4, value 4.<br/>Step 2: Find the smallest element to the right of pivot that is greater than pivot: arr[5]=5 > 4 → swap index 4 and 5: [1,3,2,6,5,4].<br/>Step 3: Reverse the suffix after the pivot position (after index 4): reverse [4] → stays [1,3,2,6,5,4]. Wait — pivot was arr[4]=4. After swap: [1,3,2,6,5,4]... Recheck.<br/>Step 4: Correct trace: pivot index 4 (value 4), swap with 5 → [1,3,2,6,5,4]. Reverse suffix after pivot (index 5 onward) — only one element → [1,3,2,6,5,4]. Hmm, recheck: pivot should be index 2 (value 2, since 2<6). Swap 2 with smallest right element > 2 = 4 → [1,3,4,6,2,5]. Reverse suffix after index 2: [6,2,5]→[2,5,6]. Result: [1,3,4,2,5,6].<br/>✅ Next permutation: [1,3,4,2,5,6].",
    },

    /* ── Q42 ── */
    {
      q: "Interview question: 'Given a matrix, rotate it 90 degrees clockwise in-place.' What is the two-step approach?",
      opts: [
        "Reverse rows then columns",
        "Transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row",
        "Rotate four corners at a time with temp variable",
        "Copy to new matrix and map positions",
      ],
      ans: "Transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row",
      cat: "DSA",
      exp: "Step 1: Transpose: for all i < j, swap matrix[i][j] with matrix[j][i]. This reflects the matrix along the main diagonal.<br/>Step 2: Reverse each row: for each row, two-pointer swap from left and right until they meet.<br/>Step 3: Result: 90-degree clockwise rotation. Verify: element at (i,j) moves to (j, N-1-i).<br/>Step 4: O(N²) time, O(1) space — true in-place.<br/>Step 5: For counter-clockwise: reverse each row FIRST, then transpose.<br/>✅ Transpose + Reverse rows = 90° clockwise. Classic in-place matrix rotation.",
    },

    /* ── Q43 ── */
    {
      q: "Given a list of intervals [[1,3],[2,6],[8,10],[15,18]], merge all overlapping intervals. Approach?",
      opts: [
        "BFS on interval graph",
        "Sort by start time, then greedily merge: if current start ≤ prev end, extend prev end; else add new interval",
        "Sort by end time",
        "Use segment tree for interval merging",
      ],
      ans: "Sort by start time, then greedily merge: if current start ≤ prev end, extend prev end; else add new interval",
      cat: "DSA",
      exp: "Step 1: Sort intervals by start time: [[1,3],[2,6],[8,10],[15,18]].<br/>Step 2: Initialize result with first interval [1,3].<br/>Step 3: [2,6]: 2 ≤ 3 (overlap) → extend: max(3,6)=6 → result: [[1,6]].<br/>Step 4: [8,10]: 8 > 6 (no overlap) → add new: [[1,6],[8,10]].<br/>Step 5: [15,18]: 15 > 10 (no overlap) → add: [[1,6],[8,10],[15,18]].<br/>O(N log N) for sort + O(N) for merge = O(N log N).<br/>✅ Sort by start + greedy merge. Result: [[1,6],[8,10],[15,18]].",
    },

    /* ── Q44 ── */
    {
      q: "What is the time and space complexity of Quicksort in best/average/worst case?",
      opts: [
        "Best: O(N log N), Average: O(N log N), Worst: O(N²) — all O(log N) space",
        "Always O(N log N)",
        "Best O(N), Average O(N log N), Worst O(N²)",
        "Best O(N log N), Average O(N log N), Worst O(N log N) with random pivot",
      ],
      ans: "Best: O(N log N), Average: O(N log N), Worst: O(N²) — all O(log N) space",
      cat: "DSA",
      exp: "Step 1: Best/Average case: pivot divides array roughly in half each time → recurrence T(N) = 2T(N/2) + O(N) → O(N log N).<br/>Step 2: Worst case: pivot is always min or max (already sorted array with bad pivot choice) → T(N) = T(N-1) + O(N) → O(N²).<br/>Step 3: Space: O(log N) average (recursion stack depth) for balanced partitions. O(N) worst case.<br/>Step 4: Randomized pivot: expected O(N log N) regardless of input order.<br/>Step 5: In practice, Quicksort with 3-way partitioning handles duplicates well.<br/>✅ Worst O(N²) with bad pivot. Use randomized pivot for expected O(N log N).",
    },

    /* ── Q45 ── */
    {
      q: "How does Kadane's algorithm find maximum subarray sum in O(N)?",
      opts: [
        "Sorts the array and sums the larger half",
        "Extends current subarray if positive, starts fresh if current sum goes negative; tracks global max",
        "Uses prefix sum with segment tree",
        "Divide and conquer at each index",
      ],
      ans: "Extends current subarray if positive, starts fresh if current sum goes negative; tracks global max",
      cat: "DSA",
      exp: "Step 1: Initialize current_sum = arr[0], max_sum = arr[0].<br/>Step 2: For each subsequent element: current_sum = max(arr[i], current_sum + arr[i]).<br/>Step 3: If adding arr[i] to current sum makes it worse than starting fresh at arr[i] → start fresh.<br/>Step 4: Update max_sum = max(max_sum, current_sum) at each step.<br/>Step 5: Example: [-2,1,-3,4,-1,2,1,-5,4] → max_sum = 6 (subarray [4,-1,2,1]).<br/>✅ Kadane's: O(N) time O(1) space. The classic greedy DP algorithm.",
    },

    /* ── Q46 ── */
    {
      q: "What are the key properties that make a problem solvable by Dynamic Programming?",
      opts: [
        "Greedy choice property and exchange argument",
        "Optimal substructure (optimal solution contains optimal solutions to subproblems) and overlapping subproblems (subproblems repeat)",
        "Linear time and linear space requirements",
        "Graph connectivity and DAG property",
      ],
      ans: "Optimal substructure (optimal solution contains optimal solutions to subproblems) and overlapping subproblems (subproblems repeat)",
      cat: "DSA",
      exp: "Step 1: Optimal Substructure: the optimal solution to a problem can be constructed from optimal solutions to its subproblems. Example: shortest path, LCS, knapsack.<br/>Step 2: Overlapping Subproblems: the same subproblems are solved repeatedly in the naive recursive approach. Example: fib(5) needs fib(3) computed multiple times.<br/>Step 3: Without overlapping subproblems → Divide & Conquer is sufficient (merge sort, binary search).<br/>Step 4: DP stores subproblem results (memoization or tabulation) to avoid recomputation.<br/>Step 5: Greedy has optimal substructure too, but NOT overlapping subproblems → simpler greedy choice suffices.<br/>✅ DP requires BOTH properties.",
    },

    /* ── Q47 ── */
    {
      q: "Interviewer: 'How do you find all permutations of a string using backtracking? What is the time complexity?'",
      opts: [
        "O(N!) time — swap and recurse, O(N) space for the recursion stack",
        "O(N² ) time using DP",
        "O(2^N) time using bitmask",
        "O(N log N) time using sorting",
      ],
      ans: "O(N!) time — swap and recurse, O(N) space for the recursion stack",
      cat: "DSA",
      exp: "Step 1: Swap arr[i] with arr[start] for each i from start to N-1. Recurse with start+1.<br/>Step 2: After recursion, swap back (backtrack) to restore original state.<br/>Step 3: At each level, we choose from N-start options. Total leaves = N! (all permutations).<br/>Step 4: Time: O(N × N!) — N! permutations, each taking O(N) to copy/print.<br/>Step 5: Recursion depth = N → O(N) stack space. For duplicates: use a visited set at each level to skip repeated characters.<br/>✅ O(N × N!) time, O(N) stack space. Classic backtracking.",
    },

    /* ── Q48 ── */
    {
      q: "You see this graph problem: 'Count number of islands in a 2D grid.' What algorithms can solve it and what is their complexity?",
      opts: [
        "Only DFS — O(M×N)",
        "DFS or BFS: flood-fill each unvisited '1' and mark visited; O(M×N). Also solvable with Union-Find",
        "Topological sort — O(M×N log MN)",
        "Dijkstra on grid — O(MN log MN)",
      ],
      ans: "DFS or BFS: flood-fill each unvisited '1' and mark visited; O(M×N). Also solvable with Union-Find",
      cat: "DSA",
      exp: "Step 1: Scan the grid. When a '1' (land) is found, increment island count and flood-fill to mark the entire island.<br/>Step 2: DFS flood-fill: from (i,j), recursively visit all 4 neighbors that are '1'. Mark them as '0' (visited).<br/>Step 3: BFS alternative: use a queue, same logic with level-by-level exploration.<br/>Step 4: Union-Find: treat grid as graph. Union adjacent '1' cells. Count unique roots.<br/>Step 5: All approaches: O(M×N) time. DFS/BFS: O(M×N) stack/queue space. Union-Find: O(α(M×N)) per op.<br/>✅ DFS/BFS flood-fill or Union-Find. O(M×N).",
    },

    /* ── Q49 ── */
    {
      q: "Given a sorted rotated array [4,5,6,7,0,1,2], find a target using binary search in O(log N). What is the key insight?",
      opts: [
        "Linear scan — binary search doesn't work on rotated arrays",
        "At each mid, one half is always sorted. Determine which half contains the target, recurse on that half",
        "Find rotation point first then binary search",
        "Use two binary searches: one for each half",
      ],
      ans: "At each mid, one half is always sorted. Determine which half contains the target, recurse on that half",
      cat: "DSA",
      exp: "Step 1: In a rotated sorted array, at any mid point, AT LEAST ONE of the two halves is always sorted.<br/>Step 2: Check if left half [low..mid] is sorted: arr[low] ≤ arr[mid].<br/>Step 3: If sorted left half: check if target lies in [arr[low], arr[mid]]. If yes → search left. Else → search right.<br/>Step 4: If right half is sorted instead: check if target lies in [arr[mid], arr[high]]. If yes → search right. Else → search left.<br/>Step 5: Repeat until found or low > high. O(log N).<br/>✅ Key insight: one half is always sorted. Use that half's boundaries to direct the search.",
    },

    /* ── Q50 ── */
    {
      q: "What is the time complexity of building a Trie with N words of average length L, and what are its key use cases?",
      opts: [
        "O(N²) build, O(L) search",
        "O(N×L) build, O(L) search/prefix queries",
        "O(N log N) build, O(log N) search",
        "O(N) build, O(1) search",
      ],
      ans: "O(N×L) build, O(L) search/prefix queries",
      cat: "DSA",
      exp: "Step 1: Build: insert each of N words, each of length L → O(L) per word → O(N×L) total.<br/>Step 2: Search: follow characters from root → O(L) per search, independent of N.<br/>Step 3: Prefix queries: check if any word starts with a given prefix → O(L).<br/>Step 4: Use cases: Autocomplete, spell checker, IP routing (prefix matching), word search in a grid, dictionary operations.<br/>Step 5: Space: O(N×L×alphabet_size). For lowercase English: each node has 26 children → space-intensive.<br/>Alternative: Compressed Trie (Patricia Tree) reduces space for sparse alphabets.<br/>✅ Trie: O(N×L) build, O(L) query. Ideal for prefix-based problems.",
    },

    /* ── Q51 ── */
    {
      q: "Visualize: BFS on graph with adjacency list. Start at node 1. Edges: 1→2, 1→3, 2→4, 3→4, 4→5. What is the BFS order?",
      opts: ["1,2,3,4,5", "1,3,2,4,5", "1,2,4,3,5", "1,2,3,5,4"],
      ans: "1,2,3,4,5",
      cat: "DSA",
      exp: "Step 1: Queue: [1]. Visited: {1}. Process 1 → neighbors 2,3. Queue: [2,3].<br/>Step 2: Process 2 → neighbor 4. Queue: [3,4]. Visited: {1,2,3}.<br/>Step 3: Process 3 → neighbor 4 (already in queue/visited). Queue: [4]. Visited: {1,2,3,4}.<br/>Step 4: Process 4 → neighbor 5. Queue: [5]. Visited: {1,2,3,4,5}.<br/>Step 5: Process 5 → no new neighbors. Queue: [].<br/>BFS order: 1, 2, 3, 4, 5.<br/>✅ Level-order traversal: level 0={1}, level 1={2,3}, level 2={4}, level 3={5}.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 290 145" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <text x="10" y="14" fill="#94a3b8" font-size="10">BFS Traversal — Level by Level</text>
  <defs><marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 Z" fill="#475569"/></marker></defs>
  <!-- Nodes -->
  <circle cx="50"  cy="75" r="16" fill="#6c63ff" opacity="0.9"/><text x="43"  y="79" fill="white">1</text>
  <circle cx="120" cy="45" r="16" fill="#3b82f6" opacity="0.9"/><text x="113" y="49" fill="white">2</text>
  <circle cx="120" cy="105" r="16" fill="#3b82f6" opacity="0.9"/><text x="113" y="109" fill="white">3</text>
  <circle cx="195" cy="75" r="16" fill="#a78bfa" opacity="0.9"/><text x="188" y="79" fill="white">4</text>
  <circle cx="258" cy="75" r="16" fill="#22c55e" opacity="0.9"/><text x="251" y="79" fill="white">5</text>
  <!-- Edges -->
  <line x1="66"  y1="67"  x2="104" y2="52"  stroke="#475569" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="66"  y1="83"  x2="104" y2="98"  stroke="#475569" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="136" y1="52"  x2="178" y2="66"  stroke="#475569" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="136" y1="98"  x2="178" y2="84"  stroke="#475569" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="211" y1="75"  x2="242" y2="75"  stroke="#475569" stroke-width="1.5" marker-end="url(#a2)"/>
  <!-- Level labels -->
  <text x="35"  y="105" fill="#6c63ff" font-size="9">L0</text>
  <text x="105" y="130" fill="#3b82f6" font-size="9">L1</text>
  <text x="180" y="105" fill="#a78bfa" font-size="9">L2</text>
  <text x="243" y="105" fill="#22c55e" font-size="9">L3</text>
  <text x="10"  y="140" fill="#fbbf24" font-size="10">BFS: 1 → 2 → 3 → 4 → 5</text>
</svg>`,
      },
    },

    /* ── Q52 ── */
    {
      q: "What is amortized O(1) for dynamic array (ArrayList) append, and why does doubling the capacity achieve this?",
      opts: [
        "Each append is O(1) guaranteed",
        "Doubling capacity means resize happens at sizes 1,2,4,8...; total copies = N; amortized cost = N/N = O(1) per op",
        "Amortized O(log N) due to copy overhead",
        "O(N) per operation always due to copying",
      ],
      ans: "Doubling capacity means resize happens at sizes 1,2,4,8...; total copies = N; amortized cost = N/N = O(1) per op",
      cat: "DSA",
      exp: "Step 1: When capacity is exceeded, double the array size and copy all elements.<br/>Step 2: Resize happens at N=1,2,4,8,16,...,N/2,N. Copy operations: 1+2+4+...+N/2 = N-1 (geometric series).<br/>Step 3: For N total appends: N appends + (N-1) copies ≈ 2N operations total.<br/>Step 4: Amortized cost per append = 2N/N = 2 = O(1).<br/>Step 5: If we grew by +1 instead of doubling: total copies = 0+1+2+...+(N-1) = N(N-1)/2 = O(N²) → amortized O(N). Doubling is crucial.<br/>✅ Doubling gives amortized O(1) append via geometric series analysis.",
    },

    /* ── Q53 ── */
    {
      q: "What is the 'two-sum' problem? What are the O(N²) and O(N) solutions?",
      opts: [
        "O(N²): sort + scan. O(N): hash map",
        "O(N²): brute force all pairs. O(N): HashMap — store each element's complement; check on scan",
        "O(N²): BFS. O(N log N): binary search",
        "O(N): prefix sum. O(log N): binary search",
      ],
      ans: "O(N²): brute force all pairs. O(N): HashMap — store each element's complement; check on scan",
      cat: "DSA",
      exp: "Step 1: Problem: given array and target, find indices of two numbers that sum to target.<br/>Step 2: Brute force: for every pair (i,j): check arr[i]+arr[j]==target → O(N²).<br/>Step 3: HashMap: scan array. For each arr[i], check if (target - arr[i]) is already in the map → found. Else store arr[i]→i in map.<br/>Step 4: Single pass → O(N) time, O(N) space.<br/>Step 5: Two-pointer (sorted array): sort → O(N log N), then two pointers → O(N). But need to map back to original indices.<br/>✅ O(N) HashMap solution is the standard answer. Two-pointer only if sorted array is given.",
    },

    /* ── Q54 ── */
    {
      q: "How does the Z-algorithm for string pattern matching work, and what is its time complexity?",
      opts: [
        "O(N²) — compares pattern with every substring",
        "O(N+M) — builds Z-array where Z[i] = length of longest substring starting at i that matches prefix of the string",
        "O(M log N) — binary search on string",
        "O(N) — sliding hash only",
      ],
      ans: "O(N+M) — builds Z-array where Z[i] = length of longest substring starting at i that matches prefix of the string",
      cat: "DSA",
      exp: "Step 1: Create string S = pattern + '$' + text. Build Z-array for S.<br/>Step 2: Z[i] = length of the longest substring starting at index i that is also a prefix of S.<br/>Step 3: If Z[i] == len(pattern) for any i > len(pattern)+1 → pattern found at position i - len(pattern) - 1 in text.<br/>Step 4: Z-array built in O(N+M) using a window [l,r] that avoids redundant comparisons.<br/>Step 5: Compare with KMP (also O(N+M)) — Z-algorithm often simpler to implement correctly.<br/>✅ Z-algorithm: O(N+M). Useful for pattern matching and string problems.",
    },

    /* ── Q55 ── */
    {
      q: "What distinguishes a Red-Black Tree from a regular BST, and why does it guarantee O(log N) operations?",
      opts: [
        "It uses hashing instead of comparison",
        "Extra color bit per node + 5 invariants ensure tree height ≤ 2 log(N+1) → all operations O(log N)",
        "All leaves are at the same level always",
        "It only allows even-depth insertions",
      ],
      ans: "Extra color bit per node + 5 invariants ensure tree height ≤ 2 log(N+1) → all operations O(log N)",
      cat: "DSA",
      exp: "Step 1: Red-Black Tree adds a color (red/black) to each node and enforces 5 properties:<br/>1) Every node is red or black. 2) Root is black. 3) Leaves (nil) are black. 4) Red node's children are black. 5) All paths from node to descendant leaves have same number of black nodes.<br/>Step 2: These rules ensure no path from root to leaf is more than twice as long as any other → height ≤ 2 log₂(N+1).<br/>Step 3: Insert/Delete with rotations and recoloring maintain these properties in O(log N).<br/>Step 4: Used in: Java TreeMap/TreeSet, C++ std::map/std::set, Linux kernel CFS scheduler.<br/>✅ Height guarantee via invariants → O(log N) for all operations.",
    },

    /* ── Q56 ── */
    {
      q: "Interviewer: 'You have a stream of numbers. At any time I'll ask for the median. Design the data structure.'",
      opts: [
        "Sorted array — O(N log N) insert",
        "Two Heaps: Max-Heap for lower half, Min-Heap for upper half. Balance so sizes differ by at most 1. Median in O(1)",
        "Segment Tree on range 1..10^9",
        "Running average and variance only",
      ],
      ans: "Two Heaps: Max-Heap for lower half, Min-Heap for upper half. Balance so sizes differ by at most 1. Median in O(1)",
      cat: "DSA",
      exp: "Step 1: Maintain two heaps: Max-Heap (lower half) and Min-Heap (upper half).<br/>Step 2: Invariant: max_heap.top() ≤ min_heap.top() (max of lower ≤ min of upper).<br/>Step 3: Insert: push to max_heap, then rebalance (if max_heap.top() > min_heap.top(), move top of max_heap to min_heap). Then balance sizes (|size_diff| ≤ 1).<br/>Step 4: Median: if equal sizes → (max_heap.top() + min_heap.top()) / 2. Else → top of larger heap.<br/>Step 5: Insert: O(log N). GetMedian: O(1).<br/>✅ Two-Heap median: O(log N) insert, O(1) median. Classic streaming problem solution.",
    },

    /* ── Q57 ── */
    {
      q: "Explain the Master Theorem. What is the complexity of T(N) = 2T(N/2) + O(N)?",
      opts: ["O(N)", "O(N log N)", "O(N²)", "O(log N)"],
      ans: "O(N log N)",
      cat: "DSA",
      exp: "Step 1: Master Theorem applies to T(N) = a·T(N/b) + O(N^d).<br/>Step 2: Compare a with b^d: if a == b^d → T(N) = O(N^d log N).<br/>Step 3: Here: a=2, b=2, d=1 (since O(N) = O(N^1)). b^d = 2^1 = 2 = a → Case 2.<br/>Step 4: T(N) = O(N^1 × log N) = O(N log N).<br/>Step 5: This recurrence describes Merge Sort, Quick Sort (average), and many Divide & Conquer algorithms.<br/>✅ T(N)=2T(N/2)+O(N) → O(N log N) by Master Theorem Case 2.",
    },

    /* ── Q58 ── */
    {
      q: "What is the purpose of a Skip List and what are its average time complexities for search, insert, and delete?",
      opts: [
        "O(N) for all operations — not useful",
        "O(log N) average for all operations — probabilistic balanced BST alternative using multiple sorted linked lists",
        "O(1) for all — uses hashing",
        "O(N log N) build, O(log N) query",
      ],
      ans: "O(log N) average for all operations — probabilistic balanced BST alternative using multiple sorted linked lists",
      cat: "DSA",
      exp: "Step 1: Skip List = multiple layers of sorted linked lists. Bottom layer has all elements. Each higher layer has a random subset (roughly half) of the layer below.<br/>Step 2: Search: start at the top-left. Move right if next < target. Move down if next > target. Repeat until found or bottom.<br/>Step 3: Expected number of layers = O(log N). Expected steps = O(log N).<br/>Step 4: Insert: search for position, flip a coin to decide promotion to higher layers → probabilistic balancing.<br/>Step 5: Delete: remove from all layers. All operations O(log N) expected.<br/>Used in: Redis sorted sets, LevelDB.<br/>✅ Skip List: O(log N) expected. Simpler to implement than Red-Black Trees.",
    },

    /* ── Q59 ── */
    {
      q: "What is topological sort and in which type of graph does it exist? How is it computed?",
      opts: [
        "Sorting nodes by value in any graph",
        "Linear ordering of nodes such that for every edge u→v, u appears before v. Only in DAGs. Computed via DFS (finish order reversed) or Kahn's (BFS with in-degree)",
        "Shortest path ordering — works on all graphs",
        "BFS-based ordering — works on undirected graphs",
      ],
      ans: "Linear ordering of nodes such that for every edge u→v, u appears before v. Only in DAGs. Computed via DFS (finish order reversed) or Kahn's (BFS with in-degree)",
      cat: "DSA",
      exp: "Step 1: Topological ordering exists ONLY in Directed Acyclic Graphs (DAGs). If a cycle exists, no valid ordering is possible.<br/>Step 2: DFS method: run DFS on all nodes. When a node's DFS finishes (all neighbors explored), push to stack. Reverse stack = topo order.<br/>Step 3: Kahn's algorithm: compute in-degree of all nodes. Add nodes with in-degree 0 to queue. Process queue: for each node, decrement neighbors' in-degree. Add new 0-in-degree nodes. If processed nodes < V → cycle exists.<br/>Step 4: Applications: course scheduling, build systems (Make, Maven), task dependencies, compiler instruction ordering.<br/>✅ Topo sort: DFS (reverse finish) or Kahn's BFS. Only for DAGs. O(V+E).",
    },

    /* ── Q60 ── */
    {
      q: "Interview: 'Serialize and Deserialize a Binary Tree.' What is the approach and what edge cases matter?",
      opts: [
        "Only works for BSTs using in-order traversal",
        "Pre-order DFS with null markers — pre-order uniquely reconstructs the tree. Handle null as sentinel (e.g., '#')",
        "Level-order only; pre-order loses structure",
        "Store only leaf values",
      ],
      ans: "Pre-order DFS with null markers — pre-order uniquely reconstructs the tree. Handle null as sentinel (e.g., '#')",
      cat: "DSA",
      exp: "Step 1: Serialize via pre-order DFS. Visit root first, then left, then right. When node is null, write '#'.<br/>Step 2: Example: [1,2,3,null,null,4,5] → '1,2,#,#,3,4,#,#,5,#,#'.<br/>Step 3: Deserialize: read tokens. If '#' → return null. Else create node with value, recursively build left subtree from remaining tokens, then right.<br/>Step 4: Use a queue or iterator over tokens so state is shared across recursive calls.<br/>Step 5: Edge cases: empty tree (serialize as '#'), single node, skewed tree (all left or all right children).<br/>✅ Pre-order with null markers uniquely reconstructs any binary tree.",
    },
  ],
  tier2: [
    /* ── Q1 ── */
    {
      q: "You're designing Instagram Feed at scale. Interviewer asks: 'What is the core architectural challenge?' What's your answer?",
      opts: [
        "Storing photos efficiently",
        "Fan-out on write vs fan-out on read — push vs pull model for feed generation at massive scale",
        "Choosing SQL vs NoSQL",
        "CDN placement",
      ],
      ans: "Fan-out on write vs fan-out on read — push vs pull model for feed generation at massive scale",
      cat: "SYSDESIGN",
      exp: "Step 1: Fan-out on Write (Push model): when a user posts, immediately push to all followers' feed caches. Fast reads, slow writes, huge storage for celebrities with millions of followers.<br/>Step 2: Fan-out on Read (Pull model): each user's feed is generated at read time by fetching posts from all followed users. Slow reads, light writes.<br/>Step 3: Hybrid (Instagram/Twitter approach): push for most users (< 10K followers). Pull for celebrities (> 10K followers) at read time.<br/>Step 4: Celebrity posts merged at read time with pre-computed feeds → balances both extremes.<br/>Step 5: Storage: feed per user stored in Redis sorted set (timestamp-sorted post IDs).<br/>✅ Hybrid push/pull is the production answer. Know the tradeoffs.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Instagram Feed — Fan-out Architecture</text>
  <!-- User posts -->
  <rect x="10"  y="25" width="70" height="30" rx="4" fill="#6c63ff" opacity="0.85"/>
  <text x="20"  y="44" fill="white">User Posts</text>
  <!-- Arrows -->
  <line x1="80"  y1="40" x2="110" y2="40" stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>
  <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 Z" fill="#475569"/></marker></defs>
  <!-- Queue -->
  <rect x="112" y="25" width="60" height="30" rx="4" fill="#3b82f6" opacity="0.85"/>
  <text x="118"  y="44" fill="white">Fan-out Q</text>
  <!-- Worker -->
  <line x1="172" y1="40" x2="202" y2="40" stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="204" y="25" width="80" height="30" rx="4" fill="#a78bfa" opacity="0.85"/>
  <text x="210"  y="40" fill="white">Worker</text>
  <text x="210"  y="52" fill="white">Fan-out</text>
  <!-- Feed caches -->
  <line x1="244" y1="55" x2="200" y2="85" stroke="#475569" stroke-width="1.2"/>
  <line x1="244" y1="55" x2="244" y2="85" stroke="#475569" stroke-width="1.2"/>
  <line x1="244" y1="55" x2="280" y2="85" stroke="#475569" stroke-width="1.2"/>
  <rect x="170" y="86" width="42" height="20" rx="3" fill="#22c55e" opacity="0.8"/>
  <text x="175"  y="100" fill="white">Redis 1</text>
  <rect x="218" y="86" width="42" height="20" rx="3" fill="#22c55e" opacity="0.8"/>
  <text x="223"  y="100" fill="white">Redis 2</text>
  <rect x="264" y="86" width="28" height="20" rx="3" fill="#22c55e" opacity="0.8"/>
  <text x="265"  y="100" fill="white">R N</text>
  <text x="10"   y="130" fill="#fbbf24" font-size="9">Push = fast read; Pull for celebrities at query time</text>
  <text x="10"   y="142" fill="#94a3b8" font-size="9">Hybrid model used by Instagram/Twitter</text>
</svg>`,
      },
    },

    /* ── Q2 ── */
    {
      q: "In your Instagram feed design, how would you handle the 'hot celebrity' (high-fanout) problem?",
      opts: [
        "Limit celebrities to 1000 followers",
        "Skip their posts from feeds",
        "Use fan-out on read for celebrities: merge their posts at query time from a separate celebrity timeline store",
        "Store celebrity posts in a separate database shard",
      ],
      ans: "Use fan-out on read for celebrities: merge their posts at query time from a separate celebrity timeline store",
      cat: "SYSDESIGN",
      exp: "Step 1: Celebrity (high-fanout) problem: pushing a post from a user with 100M followers to 100M Redis caches is very slow and expensive.<br/>Step 2: Solution: DON'T fan-out celebrity posts. Instead, store their posts in a separate 'celebrity timeline' store.<br/>Step 3: At read time: fetch the user's pre-computed feed (from pushed posts of regular users) + fetch recent posts from each celebrity they follow directly from celebrity timeline.<br/>Step 4: Merge and sort by timestamp at the application layer → serve to user.<br/>Step 5: Threshold: if followers > X (e.g., 1M) → classified as celebrity → read-time merge. Else → push to followers.<br/>✅ Hybrid: push for regulars, pull for celebrities at read time.",
    },

    /* ── Q3 ── */
    {
      q: "Design a Chat System (like WhatsApp). What protocol enables real-time message delivery and why?",
      opts: [
        "HTTP short polling — client polls every second",
        "WebSocket — persistent bidirectional TCP connection enabling server push without polling overhead",
        "REST API with HTTP/2 push",
        "UDP broadcasts",
      ],
      ans: "WebSocket — persistent bidirectional TCP connection enabling server push without polling overhead",
      cat: "SYSDESIGN",
      exp: "Step 1: HTTP polling: client asks 'any new messages?' every N seconds → latency + unnecessary requests.<br/>Step 2: HTTP Long Polling: client holds connection open until server has data → better, but each delivery requires a new connection.<br/>Step 3: WebSocket: client and server perform HTTP upgrade handshake → persistent bidirectional TCP connection. Server can push messages instantly without client asking.<br/>Step 4: Each user maintains a WebSocket connection to a Chat Server. When A sends message → Chat Server stores in DB + pushes to B's WebSocket.<br/>Step 5: If B is offline: message stored → push via APNs/FCM (push notifications) when B connects.<br/>✅ WebSocket is the industry standard for real-time chat (WhatsApp, Slack, Discord).",
    },

    /* ── Q4 ── */
    {
      q: "In a distributed Chat System, how do you handle a message from User A (connected to Server 1) reaching User B (connected to Server 2)?",
      opts: [
        "A's server directly calls B's server via DNS lookup",
        "Use a Message Queue (Kafka/RabbitMQ) or a Presence Service + Pub/Sub: A's server publishes, B's server subscribes and pushes to B's WebSocket",
        "Store message in DB; B's server polls DB",
        "A's server stores message; B must connect to A's server",
      ],
      ans: "Use a Message Queue (Kafka/RabbitMQ) or a Presence Service + Pub/Sub: A's server publishes, B's server subscribes and pushes to B's WebSocket",
      cat: "SYSDESIGN",
      exp: "Step 1: Problem: in a fleet of thousands of chat servers, A's server doesn't know which server B is connected to.<br/>Step 2: Approach 1 — Message Queue: A's server publishes message to Kafka topic for B. B's server subscribes → receives → pushes via WebSocket.<br/>Step 3: Approach 2 — Pub/Sub with Redis: A's server publishes to Redis channel (B's user ID). B's server subscribes to that channel → receives → pushes.<br/>Step 4: Presence Service: tracks which server each user is connected to (stored in Redis). A's server queries presence → directly notifies B's server via internal API.<br/>Step 5: Combination: Presence Service + direct server-to-server notification + message store for reliability.<br/>✅ Pub/Sub or Message Queue solves cross-server delivery.",
    },

    /* ── Q5 ── */
    {
      q: "Design a File Storage System (Google Drive lite). How do you handle large file uploads efficiently?",
      opts: [
        "Upload entire file in one HTTP request",
        "Chunked upload: split file into chunks (e.g., 4MB), upload each chunk in parallel, store metadata + chunk references",
        "Base64 encode and store in database",
        "Only allow files under 10MB",
      ],
      ans: "Chunked upload: split file into chunks (e.g., 4MB), upload each chunk in parallel, store metadata + chunk references",
      cat: "SYSDESIGN",
      exp: "Step 1: Problems with single upload: timeout on large files, no resume on failure, saturates one connection.<br/>Step 2: Chunking: split file into fixed-size chunks (e.g., 4MB). Upload each chunk independently with retry support.<br/>Step 3: Deduplication: hash each chunk (e.g., SHA-256). If chunk already exists in storage → don't re-upload (content-addressable storage). This is block-level dedup used by Dropbox.<br/>Step 4: Metadata service: stores file_id, owner, chunk_ids[], version, size, name, created_at in a metadata DB (SQL).<br/>Step 5: Chunk storage: object store (S3/GCS). Final file = metadata pointer to ordered list of chunk IDs.<br/>Resume support: client tracks which chunks uploaded. On resume → skip already-uploaded chunks.<br/>✅ Chunked upload + dedup + metadata service = production file storage.",
    },

    /* ── Q6 ── */
    {
      q: "In Google Drive lite, how do you handle file synchronization across multiple devices?",
      opts: [
        "Poll the server every 5 seconds from each device",
        "Delta sync: on each change, compute a diff (delta) and propagate only the changed blocks/chunks via event-driven notifications (WebSocket/SSE)",
        "Full file re-download on every change",
        "Use Git version control under the hood",
      ],
      ans: "Delta sync: on each change, compute a diff (delta) and propagate only the changed blocks/chunks via event-driven notifications (WebSocket/SSE)",
      cat: "SYSDESIGN",
      exp: "Step 1: Full file sync: re-upload/download the whole file on every change → wasteful for large files.<br/>Step 2: Delta sync: only the CHANGED chunks/blocks are uploaded. Client computes which chunks changed (via checksum comparison).<br/>Step 3: Notification: when a file changes, a notification service (WebSocket or SSE) pushes the change event to all connected devices of that user.<br/>Step 4: Client receives notification: downloads only the updated chunks. Applies delta to local copy.<br/>Step 5: Conflict resolution: last-write-wins or conflict copy creation (Dropbox creates 'conflicted copy').<br/>✅ Delta sync + event-driven push notifications = efficient multi-device sync.",
    },

    /* ── Q7 ── */
    {
      q: "How would you design the storage layer for Instagram? What data goes into SQL vs object storage vs cache?",
      opts: [
        "Everything in a single SQL database",
        "SQL: user metadata, follow graph, likes/comments. Object Storage (S3): photos/videos. Redis cache: hot feeds, user sessions, follower counts",
        "All photos in SQL as BLOBs",
        "NoSQL for everything",
      ],
      ans: "SQL: user metadata, follow graph, likes/comments. Object Storage (S3): photos/videos. Redis cache: hot feeds, user sessions, follower counts",
      cat: "SYSDESIGN",
      exp: "Step 1: SQL (PostgreSQL/MySQL): structured, relational data with complex queries. Users, follows, likes, comments, post metadata (not the binary data).<br/>Step 2: Object Storage (S3/GCS): binary files (photos, videos). Scalable, cheap, built for large blobs. CDN serves from here.<br/>Step 3: Redis: in-memory cache for hot data. Feed timelines (sorted sets), session tokens, follower counts (counters), trending posts.<br/>Step 4: Cassandra/HBase: for time-series data at scale — activity feeds, notifications.<br/>Step 5: Rule: structured + relationships → SQL. Binary data → object store. Hot/ephemeral → Redis. Append-only time-series → Cassandra.<br/>✅ Right tool for the right data type.",
    },

    /* ── Q8 ── */
    {
      q: "What is a CDN and how does it reduce latency in a photo-sharing app like Instagram?",
      opts: [
        "A database that caches SQL queries",
        "A geographically distributed network of edge servers that cache and serve static content (photos, videos) from the server closest to the user",
        "A load balancer only",
        "An in-memory cache like Redis",
      ],
      ans: "A geographically distributed network of edge servers that cache and serve static content (photos, videos) from the server closest to the user",
      cat: "SYSDESIGN",
      exp: "Step 1: Without CDN: every photo request goes to the origin server (e.g., in US-East). User in India gets ~200ms round-trip latency.<br/>Step 2: With CDN: edge servers in 200+ locations worldwide. Photos are cached at edge nodes near users.<br/>Step 3: Cache hit: request served from edge server < 10ms latency. Cache miss: edge fetches from origin, caches it, serves future requests locally.<br/>Step 4: CDN reduces: latency (edge proximity), origin load (cache absorbs traffic), bandwidth costs (edge-to-user pricing lower).<br/>Step 5: CDN providers: Cloudflare, Akamai, AWS CloudFront, Fastly.<br/>✅ CDN = geographically distributed cache for static content. Reduces latency from 200ms to < 10ms.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 295 140" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">CDN — Edge Serving</text>
  <!-- Origin -->
  <rect x="115" y="20" width="70" height="28" rx="4" fill="#6c63ff" opacity="0.9"/>
  <text x="120"  y="38" fill="white">Origin Server</text>
  <!-- Edge nodes -->
  <circle cx="40"  cy="100" r="22" fill="#3b82f6" opacity="0.85"/>
  <text x="23"  y="100" fill="white">Edge US</text>
  <circle cx="150" cy="112" r="22" fill="#3b82f6" opacity="0.85"/>
  <text x="133" y="112" fill="white">Edge EU</text>
  <circle cx="258" cy="100" r="22" fill="#3b82f6" opacity="0.85"/>
  <text x="238" y="100" fill="white">Edge AS</text>
  <!-- Lines origin to edges -->
  <line x1="140" y1="48" x2="58"  y2="84" stroke="#475569" stroke-width="1.3" stroke-dasharray="4,3"/>
  <line x1="150" y1="48" x2="150" y2="90" stroke="#475569" stroke-width="1.3" stroke-dasharray="4,3"/>
  <line x1="160" y1="48" x2="242" y2="84" stroke="#475569" stroke-width="1.3" stroke-dasharray="4,3"/>
  <!-- Users -->
  <text x="5"   y="136" fill="#22c55e" font-size="9">👤 US user → &lt;5ms</text>
  <text x="115" y="140" fill="#22c55e" font-size="9">👤 EU → &lt;5ms</text>
  <text x="220" y="136" fill="#22c55e" font-size="9">👤 Asia → &lt;5ms</text>
</svg>`,
      },
    },

    /* ── Q9 ── */
    {
      q: "In a Chat System design, how do you ensure message ordering and exactly-once delivery?",
      opts: [
        "Use timestamps only for ordering",
        "Use a monotonically increasing sequence number per conversation (from DB auto-increment or distributed ID generator like Snowflake). Idempotency keys for deduplication",
        "Rely on network TCP ordering",
        "Client-side timestamps are sufficient",
      ],
      ans: "Use a monotonically increasing sequence number per conversation (from DB auto-increment or distributed ID generator like Snowflake). Idempotency keys for deduplication",
      cat: "SYSDESIGN",
      exp: "Step 1: Client timestamps are unreliable — clocks can be out of sync, adjusted, or manipulated.<br/>Step 2: Server-assigned sequence numbers: each message in a conversation gets a monotonically increasing ID from the server (or Snowflake-like distributed ID).<br/>Step 3: Clients display messages ordered by sequence number, not arrival time.<br/>Step 4: Exactly-once delivery: client includes an idempotency key (UUID) with each send request. Server deduplicates by idempotency key — if already processed, return the same result without re-processing.<br/>Step 5: At-least-once delivery: client retries until server ACK. Deduplication ensures no duplicates stored.<br/>✅ Sequence numbers for ordering + idempotency keys for deduplication.",
    },

    /* ── Q10 ── */
    {
      q: "How does your Google Drive design handle concurrent edits to the same file by two users?",
      opts: [
        "Last-write-wins — the latest save overwrites",
        "Optimistic locking with version numbers: detect conflict on write (version mismatch), create a conflict copy, notify both users",
        "Lock the file exclusively when one user opens it",
        "Use Git merge automatically",
      ],
      ans: "Optimistic locking with version numbers: detect conflict on write (version mismatch), create a conflict copy, notify both users",
      cat: "SYSDESIGN",
      exp: "Step 1: Pessimistic locking: lock file when one user opens it → blocks other users → poor UX for collaboration.<br/>Step 2: Optimistic concurrency control: no locking. Each file has a version number. Client reads at version V and sends update with version=V.<br/>Step 3: Server: if file still at version V → apply update, increment to V+1. If file is at V+2 (another user updated) → CONFLICT.<br/>Step 4: On conflict: create a 'conflict copy' (both versions saved), notify both users to manually merge.<br/>Step 5: For real-time collaborative editing (Google Docs): use Operational Transformation (OT) or CRDT to merge concurrent edits automatically at character level.<br/>✅ Optimistic locking + conflict copy for file sync. OT/CRDT for real-time collaboration.",
    },

    /* ── Q11 ── */
    {
      q: "What is a message queue and why is it critical in a distributed system like a Chat or Notification service?",
      opts: [
        "A database for storing messages permanently",
        "An asynchronous buffer between producers and consumers that decouples services, handles traffic spikes, and ensures reliable delivery",
        "A synchronous API gateway",
        "A CDN edge node",
      ],
      ans: "An asynchronous buffer between producers and consumers that decouples services, handles traffic spikes, and ensures reliable delivery",
      cat: "SYSDESIGN",
      exp: "Step 1: Without queue: Service A calls Service B directly. If B is slow/down → A fails or blocks.<br/>Step 2: With queue (Kafka/RabbitMQ/SQS): A puts message in queue → continues immediately. B reads from queue at its own pace → decoupled.<br/>Step 3: Traffic spikes: queue absorbs bursts. B processes at steady rate. No need to scale B to match A's peak load.<br/>Step 4: Durability: queue persists messages. If B crashes → messages stay in queue. B processes after recovery → no message loss.<br/>Step 5: Use cases: sending notifications, fan-out, email delivery, log processing, order processing.<br/>✅ Message queue = async decoupling + spike absorption + durability. Foundation of distributed systems.",
    },

    /* ── Q12 ── */
    {
      q: "How would you scale the follow/follower graph for Instagram (potentially billions of edges)?",
      opts: [
        "Single SQL table with (user_id, follower_id) — works at any scale",
        "Graph database (Neo4j) or distributed adjacency list in NoSQL (Cassandra): follow table with user_id as partition key, followers as clustered columns",
        "Denormalize into each user's profile JSON",
        "Store in Redis sets only",
      ],
      ans: "Graph database (Neo4j) or distributed adjacency list in NoSQL (Cassandra): follow table with user_id as partition key, followers as clustered columns",
      cat: "SYSDESIGN",
      exp: "Step 1: SQL join on billions of rows is slow. A single follow table with (user_id, follower_id) doesn't scale horizontally.<br/>Step 2: Cassandra approach: partition by user_id. Row = (user_id, follower_id, timestamp). Get all followers of user X = single partition scan. Very fast.<br/>Step 3: Two tables: 'followers of X' and 'users that X follows' — denormalized for fast reads in both directions.<br/>Step 4: For complex graph traversals (friends of friends): a graph DB (Neo4j) or specialized system (LinkedIn uses FollowFeed, Twitter uses FlockDB).<br/>Step 5: Count approximations: use Redis counters (INCR/DECR) for follower counts — don't count from table each time.<br/>✅ Cassandra partitioned by user_id for follow graph at scale.",
    },

    /* ── Q13 ── */
    {
      q: "You're designing a notification system for Instagram. What is the difference between a push notification and an in-app notification?",
      opts: [
        "Push notifications are faster",
        "Push: delivered via APNs/FCM to device OS even when app is closed. In-app: shown inside open app via WebSocket/SSE; stored in DB for history",
        "In-app notifications use email",
        "Push notifications require user to be online",
      ],
      ans: "Push: delivered via APNs/FCM to device OS even when app is closed. In-app: shown inside open app via WebSocket/SSE; stored in DB for history",
      cat: "SYSDESIGN",
      exp: "Step 1: Push Notification: delivered by the OS (Apple Push Notification Service for iOS, Firebase Cloud Messaging for Android). Works when app is closed or in background.<br/>Step 2: In-App Notification: user is inside the app. Delivered via real-time channel (WebSocket or Server-Sent Events). Also stored in a notifications DB for the notification history page.<br/>Step 3: Flow: event occurs (like, comment) → notification service enqueues event → fan-out: (a) push via APNs/FCM if device offline, (b) WebSocket push if user online in-app, (c) store in notifications table (user_id, type, ref_id, timestamp).<br/>Step 4: Rate limiting: don't spam users. Bundle notifications ('John and 5 others liked your photo').<br/>✅ Push (OS-level) + in-app (WebSocket) + persistent store = complete notification system.",
    },

    /* ── Q14 ── */
    {
      q: "How does rate limiting work in an API gateway? Describe the 'Token Bucket' algorithm.",
      opts: [
        "Count requests and reset every minute",
        "Token Bucket: bucket holds max N tokens. Tokens refill at rate R/sec. Each request consumes 1 token. No token = reject. Allows burst up to N, steady-state R/sec",
        "Block all requests after limit per hour",
        "Queue excess requests indefinitely",
      ],
      ans: "Token Bucket: bucket holds max N tokens. Tokens refill at rate R/sec. Each request consumes 1 token. No token = reject. Allows burst up to N, steady-state R/sec",
      cat: "SYSDESIGN",
      exp: "Step 1: Token Bucket maintains a bucket per user (in Redis). Bucket has capacity N (burst limit).<br/>Step 2: Tokens refill at rate R per second. If bucket full → discard extra tokens. This smooths out bursts.<br/>Step 3: Request comes in: if tokens > 0 → deduct 1 token, allow request. If tokens = 0 → reject with 429 Too Many Requests.<br/>Step 4: Allows burst: user can spend N tokens instantly (burst). But sustained rate limited to R/sec.<br/>Step 5: Implementation: Redis with atomic operations. Key = user_id. Value = (token_count, last_refill_time). On each request: compute tokens to add since last refill, cap at N, then deduct 1.<br/>✅ Token Bucket: flexible, allows bursts, smooth rate control.",
    },

    /* ── Q15 ── */
    {
      q: "What is a consistent hash ring and how does it minimize data movement when adding/removing servers?",
      opts: [
        "It always keeps data on the same server regardless of changes",
        "Servers and data are mapped onto a circular hash space; adding a server only takes keys between it and its predecessor — only K/N keys remapped",
        "It hashes user IDs to fixed server IDs",
        "It requires all servers to have equal capacity",
      ],
      ans: "Servers and data are mapped onto a circular hash space; adding a server only takes keys between it and its predecessor — only K/N keys remapped",
      cat: "SYSDESIGN",
      exp: "Step 1: Hash ring: a circle from 0 to 2^32-1. Both servers and keys are hashed to positions on this ring.<br/>Step 2: A key is assigned to the first server clockwise from its position.<br/>Step 3: Adding a server: only keys between the new server and its predecessor on the ring are reassigned. Average K/N keys remapped.<br/>Step 4: With regular modulo hashing: adding 1 server changes ~all keys (N mod changes).<br/>Step 5: Virtual nodes: each physical server has multiple positions on the ring → better load distribution.<br/>Used in: Dynamo, Cassandra, Chord protocol, CDN cache assignment.<br/>✅ Consistent hashing: O(K/N) remapping vs O(K) for regular hashing.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 270 160" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Consistent Hash Ring</text>
  <!-- Ring -->
  <circle cx="135" cy="95" r="55" fill="none" stroke="#334155" stroke-width="2"/>
  <!-- Servers -->
  <circle cx="135" cy="40"  r="10" fill="#6c63ff"/><text x="128" y="44"  fill="white">S1</text>
  <circle cx="183" cy="63"  r="10" fill="#3b82f6"/><text x="176" y="67"  fill="white">S2</text>
  <circle cx="183" cy="127" r="10" fill="#a78bfa"/><text x="176" y="131" fill="white">S3</text>
  <circle cx="87"  cy="127" r="10" fill="#22c55e"/><text x="80"  y="131" fill="white">S4</text>
  <!-- Keys -->
  <circle cx="160" cy="42" r="5" fill="#fbbf24"/><text x="163" y="46" fill="#fbbf24">K1</text>
  <circle cx="197" cy="90" r="5" fill="#fbbf24"/><text x="200" y="94" fill="#fbbf24">K2</text>
  <circle cx="135" cy="148" r="5" fill="#fbbf24"/><text x="138" y="152" fill="#fbbf24">K3</text>
  <!-- Labels -->
  <text x="10" y="150" fill="#94a3b8" font-size="9">Adding server → only adjacent keys move</text>
</svg>`,
      },
    },

    /* ── Q16 ── */
    {
      q: "How does your chat system store message history at scale? What database and schema would you use?",
      opts: [
        "Single SQL table: (message_id, sender, receiver, content, timestamp)",
        "Cassandra: partition by (channel_id or conversation_id), cluster by message_id (time-ordered). Enables fast retrieval of recent messages",
        "MongoDB with document-per-conversation",
        "Redis only for all messages",
      ],
      ans: "Cassandra: partition by (channel_id or conversation_id), cluster by message_id (time-ordered). Enables fast retrieval of recent messages",
      cat: "SYSDESIGN",
      exp: "Step 1: Requirements: billions of messages, fast retrieval by conversation, time-ordered, append-only writes.<br/>Step 2: Cassandra table: PRIMARY KEY (conversation_id, message_id) WHERE message_id is a time-UUID (Snowflake ID).<br/>Step 3: Partition key = conversation_id → all messages of a conversation on the same partition → fast sequential reads.<br/>Step 4: Clustering key = message_id (time-ordered) → messages returned in order without extra sort.<br/>Step 5: Pagination: 'give me 50 messages before message_id X' → efficient range scan on clustering key.<br/>Recent messages: limit partition size by date (hot/cold data separation).<br/>✅ Cassandra: append-heavy, time-ordered, partition by conversation = perfect fit.",
    },

    /* ── Q17 ── */
    {
      q: "What is the CAP theorem and how does it influence your database choice in a distributed system?",
      opts: [
        "A system can achieve Consistency, Availability, and Partition Tolerance simultaneously",
        "In a distributed system, you can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance. Choose based on business needs",
        "Applies only to SQL databases",
        "Only relevant for caching layers",
      ],
      ans: "In a distributed system, you can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance. Choose based on business needs",
      cat: "SYSDESIGN",
      exp: "Step 1: Consistency (C): every read sees the most recent write. Availability (A): every request gets a response (not guaranteed to be latest). Partition Tolerance (P): system works despite network partitions.<br/>Step 2: In any distributed system, network partitions CAN happen → P must be chosen → you choose between C and A.<br/>Step 3: CP systems (strong consistency): Zookeeper, HBase, MongoDB (default). During partition → may reject requests.<br/>Step 4: AP systems (high availability): Cassandra, DynamoDB, CouchDB. During partition → return potentially stale data.<br/>Step 5: Chat: AP (availability > strong consistency — a slightly stale message list is acceptable). Banking: CP (consistency critical).<br/>✅ Real question: CP vs AP. Always pick P, then decide C or A based on domain.",
    },

    /* ── Q18 ── */
    {
      q: "How would you design the search feature for Instagram (search users, hashtags)?",
      opts: [
        "SQL LIKE query on usernames",
        "Elasticsearch: inverted index for full-text and prefix search. Sync data from primary DB via Kafka events",
        "Store sorted alphabet arrays for each prefix",
        "Linear scan of all users",
      ],
      ans: "Elasticsearch: inverted index for full-text and prefix search. Sync data from primary DB via Kafka events",
      cat: "SYSDESIGN",
      exp: "Step 1: SQL LIKE '%query%' is O(N) table scan — unacceptable at scale.<br/>Step 2: Elasticsearch (or OpenSearch): distributed search engine with inverted index. 'type 3 chars → top matches' in milliseconds.<br/>Step 3: Primary DB (SQL): source of truth for user data. Elasticsearch: search replica, eventually consistent.<br/>Step 4: Sync pipeline: user creates account → event published to Kafka → Elasticsearch indexer consumes → indexes into ES.<br/>Step 5: Typeahead: prefix search on 'username.keyword' field. Hashtag search: exact + prefix on hashtag field. Relevance: ranked by follower count, engagement.<br/>✅ Elasticsearch for search at scale. Eventual sync from primary DB via Kafka.",
    },

    /* ── Q19 ── */
    {
      q: "How would you handle the 'exactly-once' vs 'at-least-once' delivery guarantee in a messaging system?",
      opts: [
        "Exactly-once is default in all message queues",
        "At-least-once: retry until ACK, deduplicate on consumer side with idempotency keys. Exactly-once: requires distributed transaction or two-phase commit — expensive, rarely used",
        "At-most-once is preferred for financial systems",
        "No difference in practice",
      ],
      ans: "At-least-once: retry until ACK, deduplicate on consumer side with idempotency keys. Exactly-once: requires distributed transaction or two-phase commit — expensive, rarely used",
      cat: "SYSDESIGN",
      exp: "Step 1: At-most-once: fire and forget. Message may be lost. Acceptable for metrics, logs. NOT for chat.<br/>Step 2: At-least-once: producer retries until ACK. Consumer may receive duplicates. Consumer must be IDEMPOTENT (processing same message twice = same result).<br/>Step 3: Idempotency: each message has a unique ID. Consumer stores processed IDs. If ID seen → skip.<br/>Step 4: Exactly-once: requires coordinating producer ack + consumer commit atomically → 2-phase commit or Kafka's transactional API. High overhead.<br/>Step 5: In practice: at-least-once + idempotent consumer = effectively exactly-once at lower cost. Used by Kafka, WhatsApp.<br/>✅ At-least-once + idempotent consumer = industry standard for reliable messaging.",
    },

    /* ── Q20 ── */
    {
      q: "Design a URL shortener (bit.ly). What are the key components and how do you generate short codes?",
      opts: [
        "MD5 hash of the full URL, take first 6 characters",
        "Counter-based ID converted to Base62 (a-z, A-Z, 0-9) stored in DB. 6 characters = 62^6 ≈ 56 billion unique URLs",
        "Random UUID stored as the short code",
        "Store URL hash in Redis only",
      ],
      ans: "Counter-based ID converted to Base62 (a-z, A-Z, 0-9) stored in DB. 6 characters = 62^6 ≈ 56 billion unique URLs",
      cat: "SYSDESIGN",
      exp: "Step 1: Generate a unique ID (auto-increment or distributed Snowflake ID). Convert to Base62 → 6-character code.<br/>Step 2: Store mapping: short_code → {long_url, user_id, created_at, expiry, click_count} in database (Cassandra or MySQL).<br/>Step 3: Redirect flow: GET /{shortCode} → lookup in Redis cache → if miss → DB lookup → HTTP 301/302 redirect.<br/>Step 4: Use 302 (temporary redirect) instead of 301 (permanent) to capture analytics — browsers don't cache 302.<br/>Step 5: Custom aliases: check uniqueness before insert. Rate limiting: prevent code exhaustion. Analytics: async click logging to Kafka.<br/>Scale: write-heavy for creation, read-heavy for redirects (1000:1 read:write ratio).<br/>✅ Base62 counter + Redis cache + DB = URL shortener architecture.",
    },

    /* ── Q21 ── */
    {
      q: "How does horizontal scaling differ from vertical scaling, and what are the tradeoffs?",
      opts: [
        "They are the same — just different naming conventions",
        "Vertical: add more CPU/RAM to one server (has limits, expensive, single point of failure). Horizontal: add more servers (scales linearly, fault tolerant, needs coordination logic)",
        "Horizontal scaling is always cheaper",
        "Vertical scaling is the only option for stateful services",
      ],
      ans: "Vertical: add more CPU/RAM to one server (has limits, expensive, single point of failure). Horizontal: add more servers (scales linearly, fault tolerant, needs coordination logic)",
      cat: "SYSDESIGN",
      exp: "Step 1: Vertical Scaling (Scale Up): upgrade the machine — more RAM, faster CPU, more disk. Simple, no code changes. Limits: max machine size, expensive, still single server = single point of failure.<br/>Step 2: Horizontal Scaling (Scale Out): add more machines to the cluster. Scales linearly in theory. Commodity hardware. Fault tolerant (N-1 servers can handle load).<br/>Step 3: Challenges of horizontal: stateless services scale easily. Stateful services (databases) need sharding, data replication, consistent hashing.<br/>Step 4: Modern approach: scale vertically until it makes economic sense, then go horizontal. Stateless app servers → horizontal. Databases → vertical + read replicas, then sharding.<br/>✅ Vertical = simple but limited. Horizontal = scalable but complex. Use both strategically.",
    },

    /* ── Q22 ── */
    {
      q: "How would you implement 'read your own writes' consistency in a system with primary-replica database replication?",
      opts: [
        "Always read from the primary",
        "After a write, route subsequent reads for that user to the primary (or wait for replica sync using replication lag tracking)",
        "Use eventual consistency everywhere",
        "Cache the write and serve from cache",
      ],
      ans: "After a write, route subsequent reads for that user to the primary (or wait for replica sync using replication lag tracking)",
      cat: "SYSDESIGN",
      exp: "Step 1: Problem: user posts a comment, reads their own comment from a replica that hasn't synced yet → comment appears missing.<br/>Step 2: Solution 1: sticky routing — after a write, route ALL reads for that user to primary for N seconds (track with a session flag).<br/>Step 3: Solution 2: version tracking — write returns a version/timestamp. Client includes this in reads. Server only accepts reads from replicas that have synced to that version or higher.<br/>Step 4: Solution 3: read from primary always for user's own profile data. Read from replicas for others' data.<br/>Step 5: Tradeoff: these solutions add complexity. For non-critical reads (viewing others' posts), eventual consistency is fine.<br/>✅ Session-based primary routing or version tracking for read-your-own-writes.",
    },

    /* ── Q23 ── */
    {
      q: "What is database sharding and what problems does it introduce?",
      opts: [
        "Sharding = creating database indexes for faster queries",
        "Sharding = partitioning data across multiple DB instances by a shard key. Introduces: cross-shard queries, hotspot risk, resharding complexity",
        "Sharding = backing up data to multiple servers",
        "Sharding = creating read replicas",
      ],
      ans: "Sharding = partitioning data across multiple DB instances by a shard key. Introduces: cross-shard queries, hotspot risk, resharding complexity",
      cat: "SYSDESIGN",
      exp: "Step 1: Sharding splits one large database into multiple smaller databases (shards) by a shard key (e.g., user_id % N shards).<br/>Step 2: Each shard holds a subset of data. Queries targeting one user's data go to that user's shard → scalable.<br/>Step 3: Problems introduced:<br/>- Cross-shard queries: JOINs across shards are expensive (must query multiple shards and merge).<br/>- Hotspot: if shard key is poorly chosen (e.g., creation date), some shards get more traffic (celebrity users).<br/>- Resharding: adding more shards requires moving data → expensive. Consistent hashing minimizes this.<br/>Step 4: Solutions: denormalization to avoid cross-shard joins. Consistent hash sharding to avoid hotspots.<br/>✅ Sharding scales writes but adds complexity. Design shard key carefully.",
    },

    /* ── Q24 ── */
    {
      q: "What is the difference between a load balancer and an API gateway? Do you need both?",
      opts: [
        "They are the same component with different names",
        "Load Balancer: distributes traffic across servers (Layer 4/7). API Gateway: handles auth, rate limiting, routing, request transformation. Often need both in production",
        "API Gateway replaces the need for a load balancer",
        "Load balancers handle authentication; API gateways handle routing",
      ],
      ans: "Load Balancer: distributes traffic across servers (Layer 4/7). API Gateway: handles auth, rate limiting, routing, request transformation. Often need both in production",
      cat: "SYSDESIGN",
      exp: "Step 1: Load Balancer (e.g., AWS ELB, NGINX): operates at network/transport layer. Distributes incoming requests evenly across backend servers. Health checks. No business logic.<br/>Step 2: API Gateway (e.g., Kong, AWS API Gateway): application-layer component. Handles: authentication/authorization, rate limiting, request/response transformation, caching, SSL termination, routing to microservices.<br/>Step 3: Typical architecture: Internet → Load Balancer → API Gateway → Microservices. LB handles traffic distribution; Gateway handles application-level concerns.<br/>Step 4: Some products merge both (NGINX as reverse proxy + rate limiter). In cloud: ELB + API Gateway is common.<br/>✅ Both serve different roles. LB = traffic distribution. API Gateway = application-layer intelligence.",
    },

    /* ── Q25 ── */
    {
      q: "How do you design a global ID generator (like Twitter's Snowflake) for distributed systems?",
      opts: [
        "Use UUID v4 — globally unique random IDs",
        "Snowflake: 64-bit ID = timestamp(41 bits) + datacenter_id(5 bits) + machine_id(5 bits) + sequence(12 bits). Time-sortable, 4096 IDs/ms per machine",
        "Auto-increment primary key from a single DB",
        "Hash of content + timestamp",
      ],
      ans: "Snowflake: 64-bit ID = timestamp(41 bits) + datacenter_id(5 bits) + machine_id(5 bits) + sequence(12 bits). Time-sortable, 4096 IDs/ms per machine",
      cat: "SYSDESIGN",
      exp: "Step 1: Problem: auto-increment fails at scale (single DB bottleneck). UUID is random — not sortable, wastes index space.<br/>Step 2: Snowflake (Twitter) structure: [1 sign bit][41 timestamp bits][5 datacenter bits][5 machine bits][12 sequence bits].<br/>Step 3: 41-bit timestamp: milliseconds since custom epoch → 69 years of IDs. Time-sorted → good for database indexing.<br/>Step 4: 12 sequence bits: 4096 IDs per millisecond per machine. With 1024 machines → 4M IDs/ms globally.<br/>Step 5: IDs are k-sortable by time (close in time → close in ID space → good for B-tree locality).<br/>✅ Snowflake IDs: distributed, time-sortable, high throughput. Industry standard (Twitter, Discord, Instagram).",
    },

    /* ── Q26 ── */
    {
      q: "How does the Instagram-like system handle trending posts/hashtags in near real-time?",
      opts: [
        "Count hashtag occurrences in SQL with COUNT(*) GROUP BY",
        "Stream processing pipeline: Kafka → Flink/Spark Streaming → sliding window aggregation → Redis sorted set with ZADD for top-K trending",
        "Batch process every hour",
        "Client-side voting aggregation",
      ],
      ans: "Stream processing pipeline: Kafka → Flink/Spark Streaming → sliding window aggregation → Redis sorted set with ZADD for top-K trending",
      cat: "SYSDESIGN",
      exp: "Step 1: Every post/like/view event published to Kafka topic.<br/>Step 2: Stream processing (Flink or Spark Streaming) consumes from Kafka with a sliding window (e.g., last 1 hour).<br/>Step 3: Aggregates count per hashtag/post in the window. Emits top-K results to Redis every N seconds.<br/>Step 4: Redis sorted set (ZADD hashtag_trending <score> <hashtag>): score = count in window. ZREVRANGE gives top trending in O(log N).<br/>Step 5: Approximation: Count-Min Sketch (probabilistic) for extremely high cardinality trending computation — saves memory vs exact counting.<br/>✅ Kafka → Stream processing → Redis sorted set = real-time trending.",
    },

    /* ── Q27 ── */
    {
      q: "What is eventual consistency, and give a real-world example where it is acceptable in a social media app?",
      opts: [
        "All reads always return the latest write — strong consistency",
        "Writes propagate to all replicas asynchronously; reads may see stale data temporarily. Example: follower count, like count — slight delay acceptable",
        "Data is never consistent across replicas",
        "Only used in caching layers, not databases",
      ],
      ans: "Writes propagate to all replicas asynchronously; reads may see stale data temporarily. Example: follower count, like count — slight delay acceptable",
      cat: "SYSDESIGN",
      exp: "Step 1: Eventual consistency: after a write, replicas will converge to the same value — but not instantly. Reads in the window may see older data.<br/>Step 2: Strong consistency: every read sees the latest write. Requires synchronous replication → higher latency.<br/>Step 3: Social media examples where eventual consistency is acceptable: like count (showing 1042 vs 1045 likes is fine), follower count, comment count, trending hashtags.<br/>Step 4: Social media examples where strong consistency matters: 'can I post?' (rate limits), financial transactions, authentication.<br/>Step 5: CAP theorem: during network partition, AP systems (Cassandra, DynamoDB) choose availability over consistency → eventual consistency.<br/>✅ Eventual consistency = acceptable latency in replica sync. Fine for non-critical social data.",
    },

    /* ── Q28 ── */
    {
      q: "How do you implement infinite scroll in a feed-based app (like Instagram/Twitter) efficiently?",
      opts: [
        "OFFSET-LIMIT pagination: SELECT * FROM posts LIMIT 20 OFFSET 1000",
        "Cursor-based pagination: use last seen post_id or timestamp as cursor. WHERE created_at < cursor ORDER BY created_at DESC LIMIT 20",
        "Return all posts at once; frontend handles slicing",
        "Cache all posts in memory per user",
      ],
      ans: "Cursor-based pagination: use last seen post_id or timestamp as cursor. WHERE created_at < cursor ORDER BY created_at DESC LIMIT 20",
      cat: "SYSDESIGN",
      exp: "Step 1: OFFSET pagination problem: OFFSET 1000 makes DB skip 1000 rows → O(OFFSET + LIMIT) work. Slow at deep pages. Also inconsistent: new posts shift earlier pages.<br/>Step 2: Cursor-based: client sends the ID/timestamp of the last seen item. Server queries: WHERE post_id < cursor AND user_id IN (following_ids) ORDER BY post_id DESC LIMIT 20.<br/>Step 3: Next page: cursor = last item's ID in current response. Stateless on server.<br/>Step 4: Consistent: new posts don't shift existing pages (cursor points to a fixed position).<br/>Step 5: For feed from Redis sorted set: ZREVRANGEBYSCORE with (-inf, cursor) for efficient cursor queries on sorted set.<br/>✅ Cursor pagination: O(LIMIT) work per page, consistent, stateless. Industry standard for feeds.",
    },

    /* ── Q29 ── */
    {
      q: "Walk me through the end-to-end flow of sending a message in WhatsApp. What happens from client A pressing send to client B seeing it?",
      opts: [
        "Client A → Internet → Client B directly",
        "A's app → WebSocket → Chat Server → DB write → Pub/Sub → B's Chat Server → B's WebSocket → B's app. ACK propagated back. If B offline: push notification",
        "A → DNS → B",
        "A uploads to S3; B polls S3",
      ],
      ans: "A's app → WebSocket → Chat Server → DB write → Pub/Sub → B's Chat Server → B's WebSocket → B's app. ACK propagated back. If B offline: push notification",
      cat: "SYSDESIGN",
      exp: "Step 1: A presses send → message sent via WebSocket to A's Chat Server with idempotency key.<br/>Step 2: Chat Server: (a) writes message to DB (Cassandra). (b) publishes to message queue/pub-sub channel for conversation.<br/>Step 3: B's Chat Server (subscribed to the channel) receives the message → pushes to B via B's WebSocket → B's app shows message.<br/>Step 4: If B is offline: Chat Server sends push notification via APNs (iOS) or FCM (Android). Message waits in DB for B to reconnect.<br/>Step 5: ACK flow: B's server sends ACK → Chat Server → A's server → A's app shows 'delivered' checkmark. B opens message → 'read' receipt sent back.<br/>✅ Full flow: WebSocket → DB → Pub/Sub → WebSocket or Push Notification.",
    },

    /* ── Q30 ── */
    {
      q: "What is the purpose of a service mesh (like Istio) in a microservices architecture?",
      opts: [
        "A web framework for building services",
        "An infrastructure layer that handles service-to-service communication: load balancing, service discovery, mTLS encryption, circuit breaking, observability — all without code changes",
        "A database connection pooler",
        "A DNS server for microservices",
      ],
      ans: "An infrastructure layer that handles service-to-service communication: load balancing, service discovery, mTLS encryption, circuit breaking, observability — all without code changes",
      cat: "SYSDESIGN",
      exp: "Step 1: In microservices, services call each other. Managing retry logic, TLS, load balancing in each service's code = duplicated complexity.<br/>Step 2: Service mesh: deploy a sidecar proxy (Envoy) alongside each service. All inter-service traffic goes through sidecar.<br/>Step 3: Capabilities: mTLS (mutual TLS encryption between services), load balancing, circuit breaking (stop cascading failures), retries/timeouts, distributed tracing, traffic splitting (canary deploys).<br/>Step 4: Zero-code changes: sidecar handles networking; service code focuses on business logic.<br/>Step 5: Control plane (Istio): manages sidecar configuration centrally. Data plane (Envoy sidecars): enforces policies per service.<br/>✅ Service mesh = network capabilities as infrastructure, not application code.",
    },

    /* ── Q31 ── */
    {
      q: "How would you handle 'hot keys' in a Redis cache (e.g., a post going viral gets 1M cache hits/sec on the same key)?",
      opts: [
        "Increase Redis instance memory",
        "Local in-process cache (L1): small TTL copy in app server memory. Cache stampede protection: probabilistic early expiration. Redis cluster: replicate hot keys across multiple nodes",
        "Disable caching for viral posts",
        "Use a queue to serialize all reads",
      ],
      ans: "Local in-process cache (L1): small TTL copy in app server memory. Cache stampede protection: probabilistic early expiration. Redis cluster: replicate hot keys across multiple nodes",
      cat: "SYSDESIGN",
      exp: "Step 1: Hot key problem: even Redis can't handle 1M req/sec on a single key in a single-node shard. Network bottleneck.<br/>Step 2: L1 (local) cache: app server keeps a copy of hot data in its own memory (e.g., Guava Cache). 100ns vs 1ms for Redis. TTL of 1-5 seconds → stale data acceptable for social posts.<br/>Step 3: Redis cluster replication: replicate hot keys to multiple read replicas. Route reads round-robin across replicas.<br/>Step 4: Cache stampede (thundering herd): when cache expires, thousands of requests hit DB simultaneously. Prevent with: mutex locking on first miss, probabilistic early expiration, or background refresh.<br/>Step 5: Consistent hashing with virtual nodes can redistribute hot keys.<br/>✅ L1 local cache + Redis replicas + stampede protection = hot key handling.",
    },

    /* ── Q32 ── */
    {
      q: "How would you design the 'Stories' feature (Instagram/Snapchat) that auto-deletes after 24 hours?",
      opts: [
        "Run a cron job every hour to delete expired stories",
        "TTL on Redis/Cassandra entries + background async deletion from S3; mark stories as expired in DB with expiry_at timestamp; serve only non-expired stories",
        "Store stories in memory only",
        "Delete on user logout",
      ],
      ans: "TTL on Redis/Cassandra entries + background async deletion from S3; mark stories as expired in DB with expiry_at timestamp; serve only non-expired stories",
      cat: "SYSDESIGN",
      exp: "Step 1: Store story metadata in DB with expires_at = created_at + 24 hours.<br/>Step 2: On read: WHERE expires_at > NOW() — only return non-expired stories. Fast with index on expires_at.<br/>Step 3: TTL in Redis: set TTL=86400s when adding story to feed caches → auto-evicts from cache.<br/>Step 4: Background cleanup: async worker scans stories past expiry → soft-delete in DB → enqueue S3 deletion jobs (photo/video cleanup).<br/>Step 5: Cassandra TTL: can set TTL per row. Cassandra auto-tombstones expired rows. Background compaction cleans up.<br/>✅ expires_at timestamp + TTL cache + async cleanup = 24-hour story lifecycle.",
    },

    /* ── Q33 ── */
    {
      q: "What is a circuit breaker pattern in distributed systems and when does it activate?",
      opts: [
        "A physical network switch",
        "Software pattern: monitors failure rate of service calls; opens circuit (stops calling) when failure rate exceeds threshold; retries after timeout (half-open state)",
        "A retry mechanism that always retries failed requests",
        "A load balancer that removes unhealthy servers",
      ],
      ans: "Software pattern: monitors failure rate of service calls; opens circuit (stops calling) when failure rate exceeds threshold; retries after timeout (half-open state)",
      cat: "SYSDESIGN",
      exp: "Step 1: Problem: Service A calls Service B. B is down/slow → A's threads pile up waiting → A fails too → cascading failure.<br/>Step 2: Circuit Breaker states:<br/>CLOSED: normal operation, requests pass through, failure rate tracked.<br/>OPEN: failure rate exceeded threshold → immediately fail all requests (no waiting for B). Prevents cascading.<br/>HALF-OPEN: after timeout, allow one test request. If success → CLOSED. If fail → OPEN again.<br/>Step 3: Benefits: fast failure (no timeout waiting), prevents overloading a struggling service, gives it time to recover.<br/>Step 4: Implementations: Netflix Hystrix, Resilience4j, Istio service mesh.<br/>✅ Circuit breaker: CLOSED → (failures) → OPEN → (timeout) → HALF-OPEN → (success) → CLOSED.",
    },

    /* ── Q34 ── */
    {
      q: "What is write-through vs write-behind (write-back) caching? When would you use each?",
      opts: [
        "Both write to cache and DB simultaneously — no difference",
        "Write-through: write to cache AND DB synchronously (consistent, higher write latency). Write-behind: write to cache, async write to DB (low latency, risk of data loss on crash)",
        "Write-through skips the cache",
        "Write-behind writes to DB first, then cache",
      ],
      ans: "Write-through: write to cache AND DB synchronously (consistent, higher write latency). Write-behind: write to cache, async write to DB (low latency, risk of data loss on crash)",
      cat: "SYSDESIGN",
      exp: "Step 1: Write-through: on write → update BOTH cache and DB synchronously. Cache always in sync with DB. Higher write latency (wait for DB). No data loss. Good for: financial data, user profiles.<br/>Step 2: Write-behind (write-back): on write → update cache immediately, ACK to client. DB write happens asynchronously (batch or delayed). Lower write latency. Risk: if cache crashes before DB write → data loss. Good for: analytics, logs, non-critical counters.<br/>Step 3: Cache-aside (lazy loading): read from cache; if miss → read from DB → populate cache. Write: write to DB only, invalidate/update cache. Most common pattern.<br/>Step 4: Choice: consistency critical → write-through. Low latency writes, some data loss acceptable → write-behind.<br/>✅ Write-through = safe. Write-behind = fast. Cache-aside = most common.",
    },

    /* ── Q35 ── */
    {
      q: "How does Google Drive handle file versioning? What is the data model?",
      opts: [
        "Only the latest version is stored",
        "Each file edit creates a new version entry (version_id, file_id, chunk_ids[], size, modified_by, timestamp). Block-level deduplication across versions reduces storage",
        "Store full file copy per version",
        "Versions tracked by file name only",
      ],
      ans: "Each file edit creates a new version entry (version_id, file_id, chunk_ids[], size, modified_by, timestamp). Block-level deduplication across versions reduces storage",
      cat: "SYSDESIGN",
      exp: "Step 1: On file edit: compute new chunks (only changed blocks differ). Upload new/changed chunks to object store.<br/>Step 2: Create new version record: (version_id, file_id, modified_by, created_at, chunk_ids[]) — the list of chunk IDs that make up this version.<br/>Step 3: Blocks shared between versions: if only 2 of 10 chunks changed, 8 chunks are referenced by BOTH versions. Only 2 new uploads. Massive storage savings.<br/>Step 4: Restore: read chunk_ids[] from target version → reassemble file from object store.<br/>Step 5: Version limit: keep last N versions to control storage (e.g., Google Drive keeps 30 days or 100 versions).<br/>✅ Version = chunk reference list. Block dedup across versions = storage efficiency.",
    },

    /* ── Q36 ── */
    {
      q: "What is the N+1 query problem in databases and how do you fix it?",
      opts: [
        "A problem where queries return N+1 results instead of N",
        "Fetching N records then making 1 additional query PER record to get related data — O(N+1) total queries. Fix: eager loading (JOIN) or batch fetching",
        "A database connection pool overflow",
        "Occurs only in NoSQL databases",
      ],
      ans: "Fetching N records then making 1 additional query PER record to get related data — O(N+1) total queries. Fix: eager loading (JOIN) or batch fetching",
      cat: "SYSDESIGN",
      exp: "Step 1: Example: fetch 100 posts, then for each post fetch the author → 1 + 100 = 101 queries. N=100 posts, +1 per post.<br/>Step 2: Each extra query has network round-trip overhead → massive latency at scale.<br/>Step 3: Fix 1 — Eager loading: SQL JOIN to fetch posts + authors in one query. SELECT * FROM posts JOIN users ON posts.user_id = users.id.<br/>Step 4: Fix 2 — Batch fetching: collect all author_ids from posts result → one query: WHERE user_id IN (...). Only 2 total queries.<br/>Step 5: ORM-level: Hibernate uses @ManyToOne(fetch=EAGER), SQLAlchemy uses selectinload, Django uses select_related.<br/>✅ N+1 = performance killer. Use JOINs or IN batch fetching. Know how your ORM handles this.",
    },

    /* ── Q37 ── */
    {
      q: "What is a Bloom Filter and where would you use it in a distributed system?",
      opts: [
        "A sorting algorithm",
        "A space-efficient probabilistic data structure: answers 'is X in set?' with no false negatives, possible false positives. Use case: cache miss check before DB lookup",
        "A type of index in SQL databases",
        "A hash table variant",
      ],
      ans: "A space-efficient probabilistic data structure: answers 'is X in set?' with no false negatives, possible false positives. Use case: cache miss check before DB lookup",
      cat: "SYSDESIGN",
      exp: "Step 1: Bloom filter: bit array of M bits + K hash functions. Insert: hash element K times, set those K bits. Query: hash element K times, check all K bits are set.<br/>Step 2: If any bit is 0 → definitely NOT in set (no false negatives). If all bits are 1 → PROBABLY in set (small false positive probability).<br/>Step 3: Cannot delete (bits shared). Space: O(M) bits regardless of set size — far smaller than storing actual elements.<br/>Step 4: Use cases: (a) DB lookup optimization: 'does this key exist?' If bloom filter says NO → skip DB entirely. (b) Cassandra uses bloom filter per SSTable. (c) Chrome uses bloom filter for malicious URL database. (d) Checking if username is taken before DB query.<br/>✅ Bloom filter: O(K) time, O(M) space. False positives okay; false negatives not okay. Great for membership testing at scale.",
    },

    /* ── Q38 ── */
    {
      q: "How would you design the 'like' feature for a post in Instagram at massive scale?",
      opts: [
        "INSERT a row per like into a SQL likes table",
        "Redis counter (INCR) for real-time count; write-behind async batch flush to SQL. Separate Redis Set per post for checking if user liked. Periodic sync to DB",
        "Store likes in a single JSON column",
        "Count from log files",
      ],
      ans: "Redis counter (INCR) for real-time count; write-behind async batch flush to SQL. Separate Redis Set per post for checking if user liked. Periodic sync to DB",
      cat: "SYSDESIGN",
      exp: "Step 1: At 10M likes/sec, direct SQL INSERT per like will saturate the database.<br/>Step 2: Redis counter: INCR post:{post_id}:likes → O(1) atomic increment. Fast, concurrent-safe.<br/>Step 3: 'Did I like this?' check: Redis Set post:{post_id}:liked_by. SADD on like, SREM on unlike, SISMEMBER to check. O(1).<br/>Step 4: Periodic flush: background job reads Redis counters every 10-30 seconds → batch UPDATE SQL likes_count for changed posts.<br/>Step 5: Consistency tradeoff: like count shown to user from Redis (near real-time). SQL is for durability/reporting. Actual like records (who liked) stored in DB (Cassandra): PRIMARY KEY(post_id, user_id).<br/>✅ Redis for real-time counts + async DB persistence + Cassandra for records.",
    },

    /* ── Q39 ── */
    {
      q: "What is database denormalization and why might you use it in a high-read system like Instagram?",
      opts: [
        "Removing all tables — just use one flat table",
        "Intentionally adding redundant data (duplicating fields across tables) to avoid costly JOINs at read time. Tradeoff: write complexity, storage for read performance",
        "A way to normalize data more strictly",
        "Encrypting database fields",
      ],
      ans: "Intentionally adding redundant data (duplicating fields across tables) to avoid costly JOINs at read time. Tradeoff: write complexity, storage for read performance",
      cat: "SYSDESIGN",
      exp: "Step 1: Normalized DB: data in separate tables, JOINed at query time. Post table + User table → JOIN to get post with author name.<br/>Step 2: At massive scale: JOINs are expensive — cross-shard JOINs impossible in distributed DB.<br/>Step 3: Denormalization: embed the username/avatar in the post record itself. Duplicate data but no JOIN needed. Fast single-table read.<br/>Step 4: Tradeoff: if user changes their username → must update all their post records (consistency burden).<br/>Step 5: Instagram uses: embed follower count in user record (updated by counter service) rather than counting follows table each time.<br/>✅ Denormalization trades write complexity for read performance. Common in high-read distributed systems.",
    },

    /* ── Q40 ── */
    {
      q: "Describe the two-phase commit (2PC) protocol. What are its weaknesses?",
      opts: [
        "A database replication protocol",
        "2PC: Phase 1 (prepare) — coordinator asks all participants to prepare/vote. Phase 2 (commit/abort) — if all voted yes → commit; else abort. Weakness: blocking on coordinator failure",
        "A cache invalidation protocol",
        "A consensus algorithm for leader election",
      ],
      ans: "2PC: Phase 1 (prepare) — coordinator asks all participants to prepare/vote. Phase 2 (commit/abort) — if all voted yes → commit; else abort. Weakness: blocking on coordinator failure",
      cat: "SYSDESIGN",
      exp: "Step 1: Phase 1 (Prepare/Voting): coordinator sends PREPARE to all participants. Each participant writes to its WAL (write-ahead log), locks resources, and votes YES (ready to commit) or NO (abort).<br/>Step 2: Phase 2 (Commit/Abort): if ALL said YES → coordinator sends COMMIT. Any NO → sends ABORT. Participants apply or roll back.<br/>Step 3: Weakness 1: Blocking protocol — if coordinator crashes after Phase 1 but before Phase 2, participants hold locks indefinitely waiting. System is blocked.<br/>Step 4: Weakness 2: Performance — synchronous, high latency. All participants must complete before any can finish.<br/>Step 5: Alternatives: Saga pattern (compensating transactions), 3PC (non-blocking but more complex), Paxos/Raft for consensus.<br/>✅ 2PC guarantees atomicity but blocks on coordinator failure. Avoided in modern microservices (use Sagas instead).",
    },

    /* ── Q41 ── */
    {
      q: "How would you handle 10 million concurrent WebSocket connections in a chat system?",
      opts: [
        "One server with 10M threads",
        "Event-driven servers (Node.js/Netty/Golang): async non-blocking I/O, each connection ~few KB memory. Horizontal scale: sticky sessions via load balancer (by user_id) + connection registry in Redis",
        "Use HTTP polling instead",
        "Limit users to 100 connections per server",
      ],
      ans: "Event-driven servers (Node.js/Netty/Golang): async non-blocking I/O, each connection ~few KB memory. Horizontal scale: sticky sessions via load balancer (by user_id) + connection registry in Redis",
      cat: "SYSDESIGN",
      exp: "Step 1: Thread-per-connection model: 10M connections × 1MB stack = 10TB memory. Impossible.<br/>Step 2: Event-driven I/O (epoll/kqueue): single thread can manage thousands of idle WebSocket connections. Connection only uses CPU when there's data to process. Node.js, Netty, Go goroutines all support this.<br/>Step 3: Each server handles 100K connections. 10M users → 100 servers. Load balancer routes WebSocket upgrades by consistent hash of user_id → sticky sessions (same user always to same server).<br/>Step 4: Connection registry: Redis stores {user_id: server_id}. When message for user X arrives → look up server_id → forward to correct server → push to user's WebSocket.<br/>✅ Event-driven I/O + horizontal scaling + Redis connection registry.",
    },

    /* ── Q42 ── */
    {
      q: "What is a CRDT (Conflict-free Replicated Data Type) and where is it used?",
      opts: [
        "A type of cache eviction policy",
        "A data structure that can be independently updated on multiple replicas and automatically merged without conflicts. Used in collaborative editing, distributed counters, last-write-wins registers",
        "A distributed lock mechanism",
        "A consensus protocol like Paxos",
      ],
      ans: "A data structure that can be independently updated on multiple replicas and automatically merged without conflicts. Used in collaborative editing, distributed counters, last-write-wins registers",
      cat: "SYSDESIGN",
      exp: "Step 1: Problem: multiple replicas accept concurrent writes → conflict on merge (who wins?).<br/>Step 2: CRDT: designed so all concurrent operations can be merged automatically — mathematically guaranteed convergence.<br/>Step 3: Types: G-Counter (grow-only counter, no conflicts — just sum), 2P-Set (two-phase set, add/remove), LWW-Register (last-write-wins), OR-Set (observed-remove set).<br/>Step 4: Use cases: distributed counters (shopping cart item count across regions), real-time collaborative text editors (each char has position), presence/status systems, distributed databases (Riak, Redis CRDT types).<br/>Step 5: Tradeoff: CRDTs can use more memory and have limited expressiveness vs general conflict resolution.<br/>✅ CRDT = automatic conflict-free merge. Used in collaboration, distributed state, geo-replicated systems.",
    },

    /* ── Q43 ── */
    {
      q: "Your Google Drive system needs to support file search. How would you implement it at scale?",
      opts: [
        "SQL LIKE '%query%' on filename column",
        "Extract text from files (Tika/Tesseract OCR), index into Elasticsearch. Search: filename + file content (full-text). Scoped per user via user_id filter",
        "Linear scan of all files per user",
        "Store file content in Redis for fast string search",
      ],
      ans: "Extract text from files (Tika/Tesseract OCR), index into Elasticsearch. Search: filename + file content (full-text). Scoped per user via user_id filter",
      cat: "SYSDESIGN",
      exp: "Step 1: File search types: (a) filename search (simple prefix/substring). (b) full-text content search (search inside documents).<br/>Step 2: Filename search: index filename in Elasticsearch. Query: match_phrase_prefix on filename field + user_id filter.<br/>Step 3: Content search: extract text from uploaded files using Apache Tika (PDFs, DOCX, etc.) or OCR (Tesseract for images). Async pipeline after upload.<br/>Step 4: Pipeline: file uploaded → Kafka event → content extraction service → text indexed into Elasticsearch with file_id, user_id, content, filename.<br/>Step 5: Scoped search: always filter by user_id → can't search other users' files. Pagination via Elasticsearch scroll/from+size.<br/>✅ Elasticsearch + async extraction pipeline = Google Drive search.",
    },

    /* ── Q44 ── */
    {
      q: "How does Kafka ensure message durability and high availability?",
      opts: [
        "Writes to memory only — very fast",
        "Replication: each partition has a leader and N replicas on different brokers. Leader handles writes; replicas sync. Messages written to disk (WAL) before ACK. Consumer offset tracking in __consumer_offsets topic",
        "Single broker with RAID storage",
        "HTTP-based replication",
      ],
      ans: "Replication: each partition has a leader and N replicas on different brokers. Leader handles writes; replicas sync. Messages written to disk (WAL) before ACK. Consumer offset tracking in __consumer_offsets topic",
      cat: "SYSDESIGN",
      exp: "Step 1: Partitioning: topic split into P partitions → parallelism. Each partition is a sequential append-only log.<br/>Step 2: Replication: each partition has 1 leader + N-1 followers (N = replication factor, typically 3). Leader on one broker, followers on different brokers for fault tolerance.<br/>Step 3: Durability: producer writes to leader. Leader writes to disk (fsync or page cache). Waits for N followers to ACK (acks=all setting). Message lost ONLY if N brokers fail simultaneously.<br/>Step 4: Consumer offsets: consumers track which messages they've processed. Stored in __consumer_offsets topic → survives consumer restart.<br/>Step 5: Leader election: if leader fails → ZooKeeper/KRaft elects a new leader from in-sync replicas.<br/>✅ Kafka: append log + replication + consumer offsets = durable, scalable, ordered messaging.",
    },

    /* ── Q45 ── */
    {
      q: "How would you design a real-time typing indicator ('User is typing...') in a chat app without overloading the server?",
      opts: [
        "Send a WebSocket event on every keystroke",
        "Throttle: send 'typing started' event on first keystroke, suppress for 2 seconds, send 'typing stopped' after 3 seconds of inactivity. Server forwards to recipients via pub/sub",
        "Poll every 500ms",
        "Store typing state in SQL",
      ],
      ans: "Throttle: send 'typing started' event on first keystroke, suppress for 2 seconds, send 'typing stopped' after 3 seconds of inactivity. Server forwards to recipients via pub/sub",
      cat: "SYSDESIGN",
      exp: "Step 1: Problem: user types 100 chars/minute → 100 WebSocket events/minute if sent on every keystroke. At scale = massive traffic.<br/>Step 2: Client-side throttling: send 'typing:started' on FIRST keystroke. Start a timer. If typing continues, don't resend for 2 seconds. Restart timer on each keystroke.<br/>Step 3: 'Typing stopped': if no keystroke for 3 seconds → send 'typing:stopped' event.<br/>Step 4: Server: receives typing event → pub/sub to conversation channel → other participants receive via their WebSocket.<br/>Step 5: Server keeps no persistent state for typing — ephemeral pub/sub only. Typing state held in Redis with 5-second TTL per user/conversation.<br/>✅ Client throttle + server pub/sub + Redis TTL = scalable typing indicator.",
    },

    /* ── Q46 ── */
    {
      q: "What is the Saga pattern for handling distributed transactions in microservices?",
      opts: [
        "A way to run two-phase commit across services",
        "A sequence of local transactions where each step publishes an event; if a step fails, compensating transactions are executed in reverse to undo previous steps",
        "A retry-only pattern",
        "A circuit breaker implementation",
      ],
      ans: "A sequence of local transactions where each step publishes an event; if a step fails, compensating transactions are executed in reverse to undo previous steps",
      cat: "SYSDESIGN",
      exp: "Step 1: Problem: a business operation spans multiple microservices (Order → Inventory → Payment). Can't use DB transactions across services.<br/>Step 2: Saga: break into local transactions. Order Service creates order (T1) → publishes 'order created' event → Inventory Service reserves items (T2) → Payment Service charges (T3).<br/>Step 3: If T3 fails: compensating transactions run in reverse. C2: Inventory Service releases reserved items. C1: Order Service cancels order.<br/>Step 4: Choreography Saga: each service listens to events and reacts. Decentralized. Harder to track overall flow.<br/>Step 5: Orchestration Saga: a central Saga Orchestrator sends commands and handles compensation. Easier to reason about.<br/>✅ Saga = eventual consistency for distributed transactions. No 2PC needed. Use compensating transactions for rollback.",
    },

    /* ── Q47 ── */
    {
      q: "How would you design Google Drive's permission system (owner, editor, viewer, sharing links)?",
      opts: [
        "Store permissions in a single JSON column on the file record",
        "ACL table: (resource_id, resource_type, principal_id, principal_type, permission_level). Index on (resource_id). Check permission on every access. Sharing links: generate token mapped to resource + permission in DB",
        "Store in the user's profile",
        "Permissions handled only by the frontend",
      ],
      ans: "ACL table: (resource_id, resource_type, principal_id, principal_type, permission_level). Index on (resource_id). Check permission on every access. Sharing links: generate token mapped to resource + permission in DB",
      cat: "SYSDESIGN",
      exp: "Step 1: ACL (Access Control List) table: each row = one permission grant. resource_id (file/folder ID), resource_type (file/folder), principal_id (user_id or group_id), principal_type (user/group/link), permission (OWNER/EDIT/VIEW/COMMENT).<br/>Step 2: Permission check: SELECT permission FROM acl WHERE resource_id=? AND principal_id IN (user_id + user's groups). If found → allowed.<br/>Step 3: Folder inheritance: share a folder → all children inherit. Implemented by traversing folder hierarchy or storing inherited ACEs (Access Control Entries).<br/>Step 4: Sharing links: generate cryptographic token (e.g., UUID) → stored in db as link_token → {resource_id, permission, expires_at}. Anyone with token gets that permission.<br/>Step 5: Cache ACL in Redis per resource for hot items. TTL = short (permissions can change).<br/>✅ ACL table + folder inheritance + link tokens = Google Drive permission model.",
    },

    /* ── Q48 ── */
    {
      q: "How do you implement 'user presence' (online/offline/last seen) in a chat app like WhatsApp?",
      opts: [
        "Ping users every second",
        "WebSocket connection events: on connect → Redis SET user:{id}:status 'online'. On disconnect → 'offline' + timestamp. Periodic heartbeat every 30s to detect silent disconnects. Fan-out presence updates to contacts",
        "Store in SQL with polling",
        "GPS-based location checks",
      ],
      ans: "WebSocket connection events: on connect → Redis SET user:{id}:status 'online'. On disconnect → 'offline' + timestamp. Periodic heartbeat every 30s to detect silent disconnects. Fan-out presence updates to contacts",
      cat: "SYSDESIGN",
      exp: "Step 1: On WebSocket connect: Redis HSET user:{id} status 'online' last_seen now(). Publish 'presence:online:{user_id}' to pub/sub.<br/>Step 2: On WebSocket disconnect: update Redis to 'offline' + last_seen timestamp. Publish 'presence:offline:{user_id}'.<br/>Step 3: Silent disconnects (network drops): client sends heartbeat ping every 30 seconds. Server marks user offline if no ping for 60 seconds.<br/>Step 4: Fan-out: contacts who follow this user subscribe to their presence channel. When presence changes → push to contacts' WebSockets → show 'online'/'last seen 2 min ago'.<br/>Step 5: Privacy: user can disable 'last seen' — app hides it client-side and stops sharing their own presence updates.<br/>✅ Redis + WebSocket events + heartbeat + pub/sub = real-time presence system.",
    },

    /* ── Q49 ── */
    {
      q: "How does auto-scaling work in a cloud-based system and what metrics drive it?",
      opts: [
        "Manually adding servers when needed",
        "Monitor metrics (CPU %, request latency, queue depth, custom business metrics) → scale out/in automatically based on thresholds or predictive models",
        "Scale based on time of day only",
        "Always run at maximum capacity",
      ],
      ans: "Monitor metrics (CPU %, request latency, queue depth, custom business metrics) → scale out/in automatically based on thresholds or predictive models",
      cat: "SYSDESIGN",
      exp: "Step 1: Reactive auto-scaling: scale out when metric exceeds threshold. Example: if CPU > 70% for 5 min → add 2 servers. If CPU < 30% for 10 min → remove 1 server.<br/>Step 2: Common metrics: CPU utilization, memory, request rate (RPS), response time (p99 latency), queue depth (SQS/Kafka lag).<br/>Step 3: Scale-out lag: new instances take 1-5 minutes to start. This means you must scale proactively or accept temporary degradation.<br/>Step 4: Predictive scaling: historical traffic patterns (e.g., Instagram peaks at 9pm) → pre-scale before the peak.<br/>Step 5: Scale-in: gradual, with connection draining (stop sending new requests to decommissioning server, let existing requests finish). Avoid thrashing (constant up-down scaling) with cooldown periods.<br/>✅ Metric-driven auto-scaling + predictive scaling + graceful scale-in = production auto-scaling strategy.",
    },

    /* ── Q50 ── */
    {
      q: "How would you ensure data privacy and GDPR compliance in a social media platform like Instagram?",
      opts: [
        "Store data in a single country",
        "Right to erasure: soft-delete + async purge pipeline. Data minimization: collect only needed data. Encryption at rest/in transit. Audit logs. Data export API. Anonymization for analytics",
        "Only send emails for consent",
        "Use public data only",
      ],
      ans: "Right to erasure: soft-delete + async purge pipeline. Data minimization: collect only needed data. Encryption at rest/in transit. Audit logs. Data export API. Anonymization for analytics",
      cat: "SYSDESIGN",
      exp: "Step 1: Right to erasure ('Right to be Forgotten'): user requests deletion → soft-delete account immediately. Async pipeline removes all associated data (posts, comments, likes, messages) across all services and storage systems.<br/>Step 2: Data minimization: only collect what's necessary. Document what data is collected and why.<br/>Step 3: Encryption: all data encrypted at rest (AES-256) and in transit (TLS 1.3). Encryption keys managed separately (AWS KMS / HashiCorp Vault).<br/>Step 4: Data export: user can download all their data (GDPR Article 20 — data portability). API generates a zip with all posts, messages, account info.<br/>Step 5: Anonymization: for analytics, replace user IDs with anonymized tokens. Never run analytics on PII directly.<br/>✅ GDPR compliance = right to delete + minimization + encryption + portability + anonymized analytics.",
    },

    /* ── Q51 ── */
    {
      q: "What is the difference between optimistic and pessimistic concurrency control in databases?",
      opts: [
        "Optimistic is faster but always correct; pessimistic is slower and sometimes wrong",
        "Pessimistic: lock resource before access (blocks others). Optimistic: no locking; detect conflict at commit time via version check; retry on conflict. Optimistic better for low-conflict scenarios",
        "They are the same mechanism",
        "Pessimistic is only for NoSQL databases",
      ],
      ans: "Pessimistic: lock resource before access (blocks others). Optimistic: no locking; detect conflict at commit time via version check; retry on conflict. Optimistic better for low-conflict scenarios",
      cat: "SYSDESIGN",
      exp: "Step 1: Pessimistic CC: acquire a lock (read or write) before accessing resource. Others must wait. Prevents conflicts but creates contention and deadlock risk. Good for: high-conflict scenarios, financial transactions.<br/>Step 2: Optimistic CC: no locking. Read data + version number. Compute changes. At commit: check if version still matches (no one else modified). If mismatch → rollback and retry.<br/>Step 3: Optimistic advantages: no locking overhead, no deadlocks, better throughput when conflicts are rare.<br/>Step 4: Optimistic disadvantages: wasted work on conflict (must retry). Bad for high-contention (e.g., flash sale — 1000 users buying last item simultaneously → many retries).<br/>Step 5: Google Drive uses optimistic (version numbers). Bank accounts use pessimistic (SELECT FOR UPDATE).<br/>✅ Optimistic = better read-heavy, low-conflict. Pessimistic = safer for write-heavy, high-conflict.",
    },

    /* ── Q52 ── */
    {
      q: "How would you design the comments system for Instagram with support for nested replies?",
      opts: [
        "Single table with a parent_comment_id foreign key and recursive SQL query",
        "Nested comments in same table (post_id, comment_id, parent_comment_id, depth). Limit depth to 2 (like Instagram). Fetch top-level comments first, then batch fetch replies by parent_id",
        "Store entire comment tree as JSON blob",
        "Only allow one level of comments",
      ],
      ans: "Nested comments in same table (post_id, comment_id, parent_comment_id, depth). Limit depth to 2 (like Instagram). Fetch top-level comments first, then batch fetch replies by parent_id",
      cat: "SYSDESIGN",
      exp: "Step 1: Schema: comments(comment_id, post_id, user_id, content, parent_comment_id, created_at, like_count).<br/>Step 2: Top-level comments: WHERE post_id=X AND parent_comment_id IS NULL ORDER BY created_at DESC LIMIT 20 (cursor paginated).<br/>Step 3: Replies: WHERE parent_comment_id IN (top_level_comment_ids) — batch fetch all replies for visible comments in one query.<br/>Step 4: Instagram limits depth to 2 (comment + one reply level) to avoid infinite nesting complexity. Reddit uses threaded (any depth) but with more complex rendering.<br/>Step 5: Scale: partition comments table by post_id (Cassandra). Comment counts denormalized on post record. Like counts on comments via Redis counters.<br/>✅ Flat table with parent_id + limited depth + batch fetch replies = scalable comment system.",
    },

    /* ── Q53 ── */
    {
      q: "What is the difference between synchronous and asynchronous communication in microservices? When do you use each?",
      opts: [
        "Synchronous is always better; async is unreliable",
        "Synchronous (REST/gRPC): caller waits for response — good for real-time queries needing immediate response. Async (message queue): caller continues — good for background tasks, fan-out, high throughput",
        "Async is always slower",
        "Synchronous is for databases; async is for APIs",
      ],
      ans: "Synchronous (REST/gRPC): caller waits for response — good for real-time queries needing immediate response. Async (message queue): caller continues — good for background tasks, fan-out, high throughput",
      cat: "SYSDESIGN",
      exp: "Step 1: Synchronous (REST/gRPC): A calls B, waits for B to respond. Simple. A can use B's response immediately. Risk: if B is slow → A is slow. Tight coupling.<br/>Step 2: Async (Kafka/RabbitMQ/SQS): A puts message in queue, continues. B processes when ready. Loose coupling. B can be down without affecting A (message waits).<br/>Step 3: Use synchronous: user login (need immediate 'authenticated'), payment status query, real-time search.<br/>Step 4: Use async: sending email after signup, processing photo uploads, fan-out notifications, generating reports, order fulfillment pipeline.<br/>Step 5: Mixed: API gateway receives request synchronously → returns 202 Accepted → async processing → webhook/polling for result.<br/>✅ Sync for immediate response; async for background, fan-out, and resilience.",
    },

    /* ── Q54 ── */
    {
      q: "You're the interviewer now: what are the 3 most important questions to ask in a system design interview before starting?",
      opts: [
        "Language, framework, team size",
        "Scale (users/QPS/data size), functional requirements (what features), non-functional requirements (latency/availability/consistency tradeoffs)",
        "Deadline, budget, marketing strategy",
        "Database type, cloud provider, team experience",
      ],
      ans: "Scale (users/QPS/data size), functional requirements (what features), non-functional requirements (latency/availability/consistency tradeoffs)",
      cat: "SYSDESIGN",
      exp: "Step 1: Functional Requirements: What are we building? What features are in scope? E.g., 'Does Instagram design include DMs? Stories? Search?' Clarify before designing.<br/>Step 2: Scale: How many users? DAU/MAU? QPS (queries per second)? Data size? Storage? This drives architecture choices (single vs distributed, SQL vs NoSQL).<br/>Step 3: Non-functional Requirements: Latency expectations (feed load < 200ms?), Availability (99.9% or 99.99%?), Consistency (strong vs eventual?), Durability (can we lose data?). These drive tradeoffs.<br/>Step 4: Other clarifications: Read/write ratio? Global or single region? Mobile-first? API or web?<br/>Step 5: Interviewers want to see that you don't jump to solutions before understanding the problem. Requirements scoping is 20% of the score.<br/>✅ Ask: Functional + Scale + Non-functional requirements. ALWAYS clarify before designing.",
    },

    /* ── Q55 ── */
    {
      q: "What are the key differences between SQL (PostgreSQL) and NoSQL (Cassandra) for a social media use case?",
      opts: [
        "SQL is always better for social media",
        "SQL: ACID, complex queries/JOINs, vertical scale, schema-rigid, strong consistency. NoSQL Cassandra: AP, horizontal scale, no JOINs, schema-flexible, eventual consistency, optimized for known access patterns",
        "NoSQL cannot store user data",
        "SQL cannot handle more than 1M users",
      ],
      ans: "SQL: ACID, complex queries/JOINs, vertical scale, schema-rigid, strong consistency. NoSQL Cassandra: AP, horizontal scale, no JOINs, schema-flexible, eventual consistency, optimized for known access patterns",
      cat: "SYSDESIGN",
      exp: "Step 1: SQL (PostgreSQL): ACID transactions, rich query language, JOINs, foreign keys. Great for: user profiles, payment records, relational data. Scales vertically + limited horizontal (read replicas, sharding is complex).<br/>Step 2: Cassandra: distributed by design, linear horizontal scale, no single point of failure, no JOINs, denormalized data, optimized for specific query patterns (partition key queries). Great for: feeds, messages, activity logs, time-series.<br/>Step 3: Real Instagram/Twitter use BOTH: SQL for user profiles and follow relationships. Cassandra for feeds, messages, notifications. Redis for caching. Elasticsearch for search.<br/>Step 4: Choose NoSQL when: write throughput > millions/sec, horizontal scale needed, data model is simple key-value or time-series.<br/>Step 5: Choose SQL when: complex relationships, ACID transactions required, team familiar with relational modeling.<br/>✅ Use the right tool. Most production systems use SQL + NoSQL + cache layers together.",
    },

    /* ── Q56 ── */
    {
      q: "How would you prevent a 'thundering herd' problem when a cached item expires and thousands of requests hit the database simultaneously?",
      opts: [
        "Disable cache expiry",
        "Cache locking (mutex): first miss acquires lock, fetches from DB, populates cache. Others wait. OR probabilistic early expiration: proactively refresh cache before it expires based on TTL and time remaining",
        "Increase database connection pool size",
        "Return empty response until cache is warm",
      ],
      ans: "Cache locking (mutex): first miss acquires lock, fetches from DB, populates cache. Others wait. OR probabilistic early expiration: proactively refresh cache before it expires based on TTL and time remaining",
      cat: "SYSDESIGN",
      exp: "Step 1: Thundering herd: cache expires at T. 1000 concurrent requests arrive at T → all see cache miss → all hit DB → DB overloaded.<br/>Step 2: Solution 1 — Cache mutex: first thread to get cache miss acquires a distributed lock (Redis SETNX). Fetches from DB. Sets cache. Releases lock. Other threads wait → see warm cache on retry.<br/>Step 3: Solution 2 — Probabilistic early expiration: as TTL approaches zero, increase probability of early refresh. Formula: if random() < (current_time - start_time) / TTL → refresh now. Avoids synchronized expiry.<br/>Step 4: Solution 3 — Background refresh: cache never expires. Background job proactively refreshes cache before TTL is up. Stale-while-revalidate pattern.<br/>Step 5: Solution 4 — Request coalescing: at application layer, collapse many identical in-flight requests into one DB call.<br/>✅ Mutex or probabilistic expiry or background refresh = thundering herd prevention.",
    },

    /* ── Q57 ── */
    {
      q: "What is leader election in distributed systems and how does ZooKeeper implement it?",
      opts: [
        "Randomly choosing a server by coin flip",
        "Services create an ephemeral znode. The one with smallest sequence number becomes leader. Others watch the next-smaller node. On failure (node disappears), the next node gets elected — no thundering herd",
        "All nodes vote every second",
        "First server to start is always the leader",
      ],
      ans: "Services create an ephemeral znode. The one with smallest sequence number becomes leader. Others watch the next-smaller node. On failure (node disappears), the next node gets elected — no thundering herd",
      cat: "SYSDESIGN",
      exp: "Step 1: Need for leader: distributed system needs one node to make authoritative decisions (write coordination, task assignment).<br/>Step 2: ZooKeeper leader election: each candidate creates an ephemeral sequential znode at /election/candidate_. ZK appends sequence number.<br/>Step 3: The node with the SMALLEST sequence number = current leader. Others watch the next-smaller node (not the leader directly).<br/>Step 4: Leader fails → ephemeral node disappears → ZK notifies only the next-smallest node (not all — avoids thundering herd). It becomes the new leader.<br/>Step 5: Ephemeral znodes: auto-deleted when session ends (leader crashes). Ensures leadership is released on failure.<br/>Applications: Kafka broker leader, HBase master, Elasticsearch master. Also: Raft consensus (used by etcd, Consul) is a more modern alternative.<br/>✅ ZooKeeper: sequential ephemeral znodes + watch-next pattern = efficient, reliable leader election.",
    },

    /* ── Q58 ── */
    {
      q: "What is a write-ahead log (WAL) and why is it critical for database durability?",
      opts: [
        "A log of read operations for debugging",
        "Changes written to an append-only WAL BEFORE being applied to the main data files. On crash recovery, WAL is replayed to restore state. Guarantees durability (D in ACID) without fsync on every data write",
        "A backup mechanism to external storage",
        "A query plan log for performance tuning",
      ],
      ans: "Changes written to an append-only WAL BEFORE being applied to the main data files. On crash recovery, WAL is replayed to restore state. Guarantees durability (D in ACID) without fsync on every data write",
      cat: "SYSDESIGN",
      exp: "Step 1: Without WAL: update data page directly. On crash mid-write → data corruption (partial write).<br/>Step 2: WAL: before modifying data page, write the INTENTION to a sequential append-only log. Sequential writes = very fast (no random I/O).<br/>Step 3: After WAL write is durable (fsync) → apply change to data page in memory/disk. If crash after WAL but before data page → replay WAL on recovery → consistent state.<br/>Step 4: WAL enables: crash recovery (redo log), replication (stream WAL to replicas — Postgres streaming replication, MySQL binlog), point-in-time recovery (apply WAL changes up to any point).<br/>Step 5: WAL files periodically checkpointed and archived. WAL is also used in Kafka (each partition log is a WAL), RocksDB, LevelDB (memtable + SSTable flushing).<br/>✅ WAL = durability guarantee via sequential pre-write logging. Foundation of database crash recovery.",
    },

    /* ── Q59 ── */
    {
      q: "In a distributed system, what is a split-brain scenario and how do you prevent it?",
      opts: [
        "When two servers process the same request twice",
        "Network partition causes two groups of nodes to think they are the only active cluster — both elect leaders and accept writes independently. Prevented via quorum: majority must agree before any leader is elected",
        "When a database runs out of connections",
        "When load balancer sends traffic to a failed server",
      ],
      ans: "Network partition causes two groups of nodes to think they are the only active cluster — both elect leaders and accept writes independently. Prevented via quorum: majority must agree before any leader is elected",
      cat: "SYSDESIGN",
      exp: "Step 1: Split-brain: in a 5-node cluster, network partition splits into [3 nodes] and [2 nodes]. Both groups think the other is down → both elect leaders → two independent clusters accept writes → data divergence/conflicts.<br/>Step 2: Prevention via quorum: require MAJORITY (N/2 + 1) of nodes to agree for leader election. With 5 nodes, quorum = 3. Only the group of 3 can elect a leader. Group of 2 cannot → pauses writes → no split-brain.<br/>Step 3: Raft/Paxos: consensus algorithms that guarantee at most one leader at any time via quorum.<br/>Step 4: ZooKeeper leader election: requires quorum of ZK ensemble. If ZK ensemble splits → smaller partition goes read-only.<br/>Step 5: Fencing: old leader marked invalid via a 'fence token' (monotonically increasing). New leader has higher token. Old leader's writes rejected by storage.<br/>✅ Quorum-based majority prevents split-brain. Fundamental concept for distributed consensus.",
    },

    /* ── Q60 ── */
    {
      q: "How would you design a real-time analytics dashboard showing metrics like 'active users in last 5 minutes'?",
      opts: [
        "SQL COUNT(*) query on events table every 5 minutes",
        "Event stream → Kafka → Flink sliding window (5 min) → Redis/ClickHouse. Dashboard queries Redis for real-time; ClickHouse for historical. HyperLogLog for approximate unique user counts",
        "Store all events in Redis and count",
        "Precompute via nightly batch job",
      ],
      ans: "Event stream → Kafka → Flink sliding window (5 min) → Redis/ClickHouse. Dashboard queries Redis for real-time; ClickHouse for historical. HyperLogLog for approximate unique user counts",
      cat: "SYSDESIGN",
      exp: "Step 1: Every user action (page view, click, API call) emits an event to Kafka.<br/>Step 2: Stream processor (Flink or Spark Streaming) maintains a 5-minute sliding window. Counts distinct users using HyperLogLog (approximate unique count in O(1) memory).<br/>Step 3: Emits aggregated metrics every 10 seconds to Redis: HSET metrics active_users_5min <count>. Dashboard reads from Redis → near real-time.<br/>Step 4: Historical metrics stored in ClickHouse (columnar OLAP DB): optimized for aggregation queries across large time ranges. Dashboard time-range queries go to ClickHouse.<br/>Step 5: HyperLogLog: counts ~unique users using ~12KB regardless of user count (vs storing all user IDs). ~2% error — acceptable for dashboards.<br/>✅ Kafka → Flink → Redis (real-time) + ClickHouse (historical) + HyperLogLog = real-time analytics dashboard.",
    },
  ],
  tier3: [
    /* ── Q1 ── */
    {
      q: "Interviewer: 'Design an LRU Cache supporting get() and put() in O(1). What data structures do you combine?'",
      opts: [
        "Array + Binary Search",
        "HashMap + Doubly Linked List: HashMap gives O(1) lookup; DLL gives O(1) eviction of LRU (tail) and O(1) insert at head",
        "Min-Heap + HashMap",
        "BST + Queue",
      ],
      ans: "HashMap + Doubly Linked List: HashMap gives O(1) lookup; DLL gives O(1) eviction of LRU (tail) and O(1) insert at head",
      cat: "LLD",
      exp: "Step 1: HashMap stores key → Node pointer. O(1) access to any node.<br/>Step 2: Doubly Linked List maintains usage order. Most recently used = head. Least recently used = tail.<br/>Step 3: get(key): find node via map → move it to head (O(1) with DLL) → return value.<br/>Step 4: put(key, val): if exists → update + move to head. If not → create node at head. If capacity exceeded → remove tail node → delete from map.<br/>Step 5: All operations O(1) guaranteed. Java: LinkedHashMap with accessOrder=true implements this natively.<br/>✅ HashMap + DLL = O(1) LRU. Classic LLD question — must know cold.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 320 155" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">LRU Cache — HashMap + Doubly Linked List</text>
  <!-- HashMap -->
  <rect x="10" y="22" width="90" height="90" rx="4" fill="#1e293b" stroke="#334155"/>
  <text x="35" y="36" fill="#94a3b8" font-size="9">HashMap</text>
  <text x="14" y="52" fill="#6c63ff" font-size="9">key1 →</text>
  <text x="14" y="66" fill="#3b82f6" font-size="9">key2 →</text>
  <text x="14" y="80" fill="#a78bfa" font-size="9">key3 →</text>
  <text x="14" y="94" fill="#22c55e" font-size="9">key4 →</text>
  <!-- DLL -->
  <text x="130" y="36" fill="#94a3b8" font-size="9">Doubly Linked List (MRU→LRU)</text>
  <!-- Nodes -->
  <rect x="118" y="44" width="38" height="28" rx="3" fill="#6c63ff" opacity="0.9"/>
  <text x="126" y="56" fill="white" font-size="8">key1</text>
  <text x="124" y="67" fill="#fbbf24" font-size="7">HEAD</text>
  <rect x="164" y="44" width="38" height="28" rx="3" fill="#3b82f6" opacity="0.9"/>
  <text x="172" y="58" fill="white" font-size="8">key2</text>
  <rect x="210" y="44" width="38" height="28" rx="3" fill="#a78bfa" opacity="0.9"/>
  <text x="218" y="58" fill="white" font-size="8">key3</text>
  <rect x="256" y="44" width="38" height="28" rx="3" fill="#22c55e" opacity="0.85"/>
  <text x="264" y="56" fill="white" font-size="8">key4</text>
  <text x="260" y="67" fill="#fbbf24" font-size="7">TAIL=LRU</text>
  <!-- Arrows -->
  <line x1="156" y1="58" x2="163" y2="58" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="202" y1="58" x2="209" y2="58" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="248" y1="58" x2="255" y2="58" stroke="#94a3b8" stroke-width="1.2"/>
  <!-- Map arrows -->
  <line x1="100" y1="50" x2="117" y2="55" stroke="#6c63ff" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="100" y1="64" x2="163" y2="58" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="100" y1="78" x2="209" y2="58" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="100" y1="92" x2="255" y2="58" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2"/>
  <!-- Evict -->
  <text x="10" y="125" fill="#ef4444" font-size="9">On capacity exceeded → evict TAIL (key4) in O(1)</text>
  <text x="10" y="140" fill="#fbbf24" font-size="9">New access → move node to HEAD in O(1)</text>
</svg>`,
      },
    },

    /* ── Q2 ── */
    {
      q: "You're implementing LFU Cache. How does it differ from LRU, and what additional data structure do you need?",
      opts: [
        "LFU evicts the most recently used; same structure as LRU",
        "LFU evicts the least FREQUENTLY used item. Needs: key→(value, freq) map + freq→DLL-of-keys map + min_freq tracker",
        "LFU uses a sorted array of frequencies",
        "LFU and LRU are identical when capacity=1",
      ],
      ans: "LFU evicts the least FREQUENTLY used item. Needs: key→(value, freq) map + freq→DLL-of-keys map + min_freq tracker",
      cat: "LLD",
      exp: "Step 1: LRU evicts least recently used (time). LFU evicts least frequently accessed (count). Tiebreak in LFU: among same-frequency items, evict LRU one.<br/>Step 2: Data structures: (a) key_map: {key: (value, freq)}. (b) freq_map: {freq: DoublyLinkedList of keys with that freq}. (c) min_freq: tracks current minimum frequency.<br/>Step 3: get(key): lookup key_map → increment freq → move from freq_map[f] to freq_map[f+1] → update min_freq if freq_map[f] is now empty.<br/>Step 4: put(key): if capacity exceeded → evict from freq_map[min_freq]'s tail. Insert new key at freq_map[1] head. Reset min_freq = 1.<br/>Step 5: All operations O(1) with this structure.<br/>✅ LFU needs freq_map + DLLs per frequency + min_freq pointer.",
    },

    /* ── Q3 ── */
    {
      q: "Design Snake Game. The interviewer asks about the key data structure to efficiently check self-collision and move the snake.",
      opts: [
        "2D matrix only",
        "Deque (double-ended queue) for snake body + HashSet for occupied cells. Add new head to deque front + set. Remove tail from deque back + set if no food eaten",
        "Array with sorting",
        "Linked list with no set",
      ],
      ans: "Deque (double-ended queue) for snake body + HashSet for occupied cells. Add new head to deque front + set. Remove tail from deque back + set if no food eaten",
      cat: "LLD",
      exp: "Step 1: Deque maintains snake body in order: front = head, back = tail. O(1) add to front, O(1) remove from back.<br/>Step 2: HashSet of occupied (row, col) for O(1) self-collision check (is new head position already in snake body?).<br/>Step 3: Move: compute new head position. Check: out of bounds → game over. In HashSet (excluding tail if no food) → collision → game over.<br/>Step 4: If food at new head position: increment score, don't remove tail (snake grows). Place new food randomly.<br/>Step 5: If no food: add new head to deque front + set. Remove tail from deque back + set.<br/>✅ Deque for O(1) body management + HashSet for O(1) collision detection.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 145" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Snake Game — Deque + HashSet</text>
  <!-- Grid -->
  <g transform="translate(10, 24)">
    <!-- Grid lines -->
    <rect x="0" y="0" width="140" height="110" fill="#0f172a" stroke="#334155" rx="3"/>
    <!-- Snake cells -->
    <rect x="60" y="20" width="18" height="18" rx="2" fill="#22c55e" opacity="0.95"/>
    <text x="65" y="33" fill="white" font-size="8">H</text>
    <rect x="40" y="20" width="18" height="18" rx="2" fill="#16a34a" opacity="0.8"/>
    <rect x="20" y="20" width="18" height="18" rx="2" fill="#15803d" opacity="0.7"/>
    <rect x="20" y="40" width="18" height="18" rx="2" fill="#14532d" opacity="0.6"/>
    <text x="23" y="53" fill="#94a3b8" font-size="7">T</text>
    <!-- Food -->
    <rect x="100" y="60" width="18" height="18" rx="2" fill="#ef4444" opacity="0.9"/>
    <text x="105" y="73" fill="white" font-size="8">🍎</text>
    <!-- Labels -->
    <text x="4" y="100" fill="#94a3b8" font-size="8">Grid: 6×6</text>
  </g>
  <!-- Deque -->
  <text x="160" y="38" fill="#94a3b8" font-size="9">Deque (front=HEAD):</text>
  <rect x="160" y="44" width="32" height="18" rx="2" fill="#22c55e" opacity="0.9"/>
  <text x="166" y="57" fill="white" font-size="8">(3,3)</text>
  <rect x="196" y="44" width="32" height="18" rx="2" fill="#16a34a" opacity="0.8"/>
  <text x="200" y="57" fill="white" font-size="8">(3,2)</text>
  <rect x="232" y="44" width="32" height="18" rx="2" fill="#15803d" opacity="0.7"/>
  <text x="236" y="57" fill="white" font-size="8">(3,1)</text>
  <rect x="268" y="44" width="32" height="18" rx="2" fill="#14532d" opacity="0.6"/>
  <text x="272" y="57" fill="white" font-size="8">(4,1)</text>
  <text x="163" y="78" fill="#6c63ff" font-size="9">HashSet: {(3,3),(3,2),(3,1),(4,1)}</text>
  <text x="163" y="92" fill="#fbbf24" font-size="9">Move right → new head (3,4)</text>
  <text x="163" y="106" fill="#22c55e" font-size="9">Not in set → valid. Remove tail.</text>
  <text x="163" y="120" fill="#ef4444" font-size="9">In set → collision → game over!</text>
</svg>`,
      },
    },

    /* ── Q4 ── */
    {
      q: "Design an Elevator System. What design patterns and classes would you use?",
      opts: [
        "A single function with if-else",
        "State pattern: ElevatorState (IDLE/MOVING_UP/MOVING_DOWN/DOOR_OPEN). Classes: Elevator, ElevatorController, Request. Min-Heap for pending floors. SCAN/LOOK disk scheduling algorithm",
        "Singleton pattern only",
        "Observer pattern only",
      ],
      ans: "State pattern: ElevatorState (IDLE/MOVING_UP/MOVING_DOWN/DOOR_OPEN). Classes: Elevator, ElevatorController, Request. Min-Heap for pending floors. SCAN/LOOK disk scheduling algorithm",
      cat: "LLD",
      exp: "Step 1: Classes: Elevator (current_floor, direction, state, min_heap), ElevatorController (manages N elevators), Request (floor, direction).<br/>Step 2: State Pattern: Elevator has states — IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN. Each state defines valid transitions.<br/>Step 3: Scheduling — LOOK algorithm: move in one direction, serve all requests in that direction. When no more requests in current direction → reverse. Like a disk LOOK scheduler.<br/>Step 4: Two min-heaps per elevator: up_requests (min-heap), down_requests (max-heap). Serve up_requests while moving up, then reverse.<br/>Step 5: ElevatorController: receives external requests → assigns to optimal elevator (closest idle, or one already moving in same direction).<br/>✅ State pattern + LOOK scheduling + two-heap structure = production elevator design.",
    },

    /* ── Q5 ── */
    {
      q: "Interviewer: 'How does your Elevator System handle emergency stop and door obstruction?'",
      opts: [
        "Ignore and continue",
        "Emergency: transition to EMERGENCY state from any state, stop movement, open doors, disable call buttons. Door obstruction: door sensor triggers DOOR_OBSTRUCTED state, restart door timer",
        "Reboot the system",
        "Move to ground floor always",
      ],
      ans: "Emergency: transition to EMERGENCY state from any state, stop movement, open doors, disable call buttons. Door obstruction: door sensor triggers DOOR_OBSTRUCTED state, restart door timer",
      cat: "LLD",
      exp: "Step 1: State machine must handle emergency as a global transition from ANY state to EMERGENCY.<br/>Step 2: EMERGENCY state: stop all motors (floor = wherever stopped), open doors, disable all buttons except emergency call, alert maintenance API.<br/>Step 3: Door obstruction: door sensor (IR beam or pressure sensor) fires → transition to DOOR_OBSTRUCTED. Reopen doors. Reset door close timer (e.g., 5 seconds). After 3 retries without clearing → alert maintenance.<br/>Step 4: Design: Observer pattern — Elevator publishes state change events. DoorSensor, EmergencyButton are event sources that trigger state transitions.<br/>Step 5: Code structure: each state implements handleEmergency() — polymorphic. EmergencyState handles all input as no-op except reset.<br/>✅ Emergency = global override. Door obstruction = timer reset with retry limit.",
    },

    /* ── Q6 ── */
    {
      q: "Design a Parking Lot system. What are the key classes and how do you handle different vehicle sizes?",
      opts: [
        "One class ParkingLot with an array of spots",
        "ParkingLot, ParkingFloor, ParkingSpot (SMALL/MEDIUM/LARGE), Vehicle (Motorcycle/Car/Truck), Ticket. Strategy pattern for spot assignment. HashMap<SpotSize, LinkedList<ParkingSpot>> for O(1) spot finding",
        "Single database table",
        "Only one type of spot needed",
      ],
      ans: "ParkingLot, ParkingFloor, ParkingSpot (SMALL/MEDIUM/LARGE), Vehicle (Motorcycle/Car/Truck), Ticket. Strategy pattern for spot assignment. HashMap<SpotSize, LinkedList<ParkingSpot>> for O(1) spot finding",
      cat: "LLD",
      exp: "Step 1: Classes: ParkingLot (N floors, entry/exit panels), ParkingFloor (spots grid), ParkingSpot (size, isOccupied, floorNo, spotNo), Vehicle (abstract: Motorcycle, Car, Truck), Ticket (ticketId, entryTime, spot, vehicle).<br/>Step 2: Spot assignment: HashMap<SpotSize, LinkedList<ParkingSpot>> per floor. Finding an available spot: poll from LinkedList → O(1). Motorcycle can use SMALL. Car uses MEDIUM. Truck uses LARGE.<br/>Step 3: Strategy pattern: SpotAssignmentStrategy (NearestEntrance, RandomAssignment, etc.) injected into ParkingLot.<br/>Step 4: Payment: FeeCalculator strategy — flat rate, hourly, weekend pricing. Ticket stores entry time → exit time → calculate fee.<br/>Step 5: Concurrency: if multi-threaded, use synchronized or ReentrantLock on spot assignment to prevent double-booking.<br/>✅ LinkedList per spot size → O(1) spot allocation. Strategy pattern for extensible fee and assignment logic.",
    },

    /* ── Q7 ── */
    {
      q: "In the Parking Lot design, how would you implement the display board showing available spots per floor?",
      opts: [
        "Count spots every time a car parks",
        "Observer pattern: ParkingSpot is Observable. Display board is Observer. On spot status change → notify board → decrement/increment counter for that floor+size",
        "Polling every 5 seconds",
        "Recompute from database",
      ],
      ans: "Observer pattern: ParkingSpot is Observable. Display board is Observer. On spot status change → notify board → decrement/increment counter for that floor+size",
      cat: "LLD",
      exp: "Step 1: Observer pattern: Subject = ParkingSpot. Observers = DisplayBoard(s), perhaps a monitoring service.<br/>Step 2: ParkingSpot.setState(OCCUPIED/FREE) → calls notifyObservers(spotSize, floor, delta).<br/>Step 3: DisplayBoard maintains Map<Floor, Map<SpotSize, Integer>> availableCounts. On notification: availableCounts[floor][size] += delta (-1 on occupy, +1 on free).<br/>Step 4: Display query: O(1) — just read from the map. No recomputation needed.<br/>Step 5: Extension: ParkingLotMonitoringService also subscribes → logs occupancy for analytics → can predict busiest hours.<br/>✅ Observer pattern decouples spot state from display logic. Zero-cost read queries.",
    },

    /* ── Q8 ── */
    {
      q: "Design a Thread-Safe Singleton pattern. Why is naive double-checked locking broken in Java without volatile?",
      opts: [
        "Double-checked locking is always correct",
        "Without volatile, JVM may reorder: instance = new Singleton() can be seen as non-null before constructor completes. Other threads read partially constructed object. volatile prevents reordering",
        "Singleton is always thread-safe by default",
        "Use synchronized on getter always — volatile not needed",
      ],
      ans: "Without volatile, JVM may reorder: instance = new Singleton() can be seen as non-null before constructor completes. Other threads read partially constructed object. volatile prevents reordering",
      cat: "LLD",
      exp: "Step 1: Singleton: only one instance. Lazy initialization: create only when first needed.<br/>Step 2: Naive DCL: if(instance==null){synchronized(lock){if(instance==null){instance=new S();}}} — appears correct but...<br/>Step 3: JVM can reorder: (1) allocate memory → (2) set instance reference → (3) call constructor. Steps 2 and 3 can swap. Another thread sees instance != null but object not yet initialized → reads garbage fields.<br/>Step 4: volatile keyword: establishes happens-before guarantee. All writes before the volatile write are visible to threads reading the volatile. Constructor completes before reference is visible.<br/>Step 5: Better alternative: Enum Singleton (inherently thread-safe, handles serialization) or Bill Pugh Holder (static inner class — class loading is thread-safe).<br/>✅ volatile prevents reordering. Enum or Holder pattern = safest Singleton implementations.",
    },

    /* ── Q9 ── */
    {
      q: "Implement a BlockingQueue from scratch. What synchronization primitives do you use?",
      opts: [
        "Regular array with no synchronization",
        "Circular array + ReentrantLock + two Conditions (notFull for producer, notEmpty for consumer). Producer awaits notFull; consumer awaits notEmpty",
        "ConcurrentHashMap internally",
        "Synchronized ArrayList",
      ],
      ans: "Circular array + ReentrantLock + two Conditions (notFull for producer, notEmpty for consumer). Producer awaits notFull; consumer awaits notEmpty",
      cat: "LLD",
      exp: "Step 1: Data: circular array of size N, head and tail pointers, count of elements.<br/>Step 2: Single ReentrantLock guards all access. Two Condition variables: notFull (signaled when element removed) and notEmpty (signaled when element added).<br/>Step 3: put(item): lock.lock(). While count==N: notFull.await() (releases lock, waits). Add item at tail. Increment count. Signal notEmpty. lock.unlock().<br/>Step 4: take(): lock.lock(). While count==0: notEmpty.await(). Remove item from head. Decrement count. Signal notFull. lock.unlock().<br/>Step 5: Circular array: tail = (tail+1)%N on put. head = (head+1)%N on take. Avoids shifting.<br/>✅ Circular buffer + ReentrantLock + Conditions = O(1) thread-safe BlockingQueue. Foundation of producer-consumer systems.",
    },

    /* ── Q10 ── */
    {
      q: "Design a Rate Limiter class. How does the Sliding Window Counter algorithm work at the class level?",
      opts: [
        "Count all requests since server start",
        "Maintain a circular array of N time slots (each 1 second). Current slot = timestamp % N. Evict old counts. Total = sum of all slot counts. Allow if total < limit",
        "Use a sorted list of all request timestamps",
        "HashMap with keys as timestamps",
      ],
      ans: "Maintain a circular array of N time slots (each 1 second). Current slot = timestamp % N. Evict old counts. Total = sum of all slot counts. Allow if total < limit",
      cat: "LLD",
      exp: "Step 1: Sliding window (fixed bucket variant): divide time into N buckets (e.g., 60 buckets for a 60-second window, 1 bucket/sec).<br/>Step 2: Current bucket index = (currentTime / bucketSize) % N. Store {timestamp: count} per bucket.<br/>Step 3: On request: if bucket's stored timestamp is stale (older than window) → reset count to 0, update timestamp. Increment count.<br/>Step 4: Total = sum of all valid bucket counts. Allow if total < maxRequests.<br/>Step 5: Sliding Window Log (exact): maintain a sorted list of all request timestamps. Remove those older than window. Count remaining. More accurate but O(requests) memory.<br/>Classes: RateLimiter(userId, maxRequests, windowSeconds), allow(userId) → boolean.<br/>✅ Circular bucket array = O(1) memory, O(N) to sum buckets. Sliding log = exact but O(requests) memory.",
    },

    /* ── Q11 ── */
    {
      q: "You're designing a Chess game. How would you model the board and pieces using OOP?",
      opts: [
        "2D int array with piece codes",
        "Board (8×8 Cell[][]), Cell (piece: Piece?), Piece (abstract: King, Queen, Rook, Bishop, Knight, Pawn), Player, Game. Each Piece.getValidMoves(board) returns Set<Move>",
        "Single Game class with all logic",
        "HashMap of position strings to integers",
      ],
      ans: "Board (8×8 Cell[][]), Cell (piece: Piece?), Piece (abstract: King, Queen, Rook, Bishop, Knight, Pawn), Player, Game. Each Piece.getValidMoves(board) returns Set<Move>",
      cat: "LLD",
      exp: "Step 1: Board: 8×8 grid of Cell objects. Cell has (row, col, piece: nullable). Board.getPiece(row, col), Board.movePiece(from, to).<br/>Step 2: Piece (abstract): color (WHITE/BLACK), position, abstract getValidMoves(Board) → Set<Move>. Each subclass implements movement rules.<br/>Step 3: Move class: fromCell, toCell, pieceType, isCapture, isCastling, isEnPassant, isPromotion.<br/>Step 4: Game: manages Player turn, move history (List<Move>), checkDetection, game state (ACTIVE/CHECK/CHECKMATE/STALEMATE).<br/>Step 5: Check detection: after any move, generate all opponent piece moves → if any attacks King → CHECK. If no valid moves out of check → CHECKMATE.<br/>✅ Piece subclasses encapsulate movement rules. Game orchestrates state. Move as first-class object enables undo/redo.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="9">
  <text x="10" y="13" fill="#94a3b8" font-size="10">Chess LLD — Class Diagram</text>
  <!-- Game -->
  <rect x="110" y="20" width="80" height="30" rx="3" fill="#6c63ff" opacity="0.9"/>
  <text x="130" y="33" fill="white">Game</text>
  <text x="114" y="44" fill="#c4b5fd" font-size="8">-board -players -state</text>
  <!-- Board -->
  <rect x="10" y="70" width="70" height="28" rx="3" fill="#3b82f6" opacity="0.9"/>
  <text x="28" y="87" fill="white">Board</text>
  <!-- Piece -->
  <rect x="110" y="70" width="80" height="28" rx="3" fill="#a78bfa" opacity="0.9"/>
  <text x="125" y="87" fill="white">Piece«abs»</text>
  <!-- Player -->
  <rect x="215" y="70" width="70" height="28" rx="3" fill="#22c55e" opacity="0.85"/>
  <text x="230" y="87" fill="white">Player</text>
  <!-- Piece children -->
  <rect x="10" y="115" width="36" height="18" rx="2" fill="#7c3aed" opacity="0.8"/>
  <text x="14" y="127" fill="white">King</text>
  <rect x="52" y="115" width="36" height="18" rx="2" fill="#7c3aed" opacity="0.8"/>
  <text x="54" y="127" fill="white">Queen</text>
  <rect x="94" y="115" width="36" height="18" rx="2" fill="#7c3aed" opacity="0.8"/>
  <text x="97" y="127" fill="white">Rook</text>
  <rect x="136" y="115" width="40" height="18" rx="2" fill="#7c3aed" opacity="0.8"/>
  <text x="138" y="127" fill="white">Bishop</text>
  <rect x="182" y="115" width="44" height="18" rx="2" fill="#7c3aed" opacity="0.8"/>
  <text x="184" y="127" fill="white">Knight</text>
  <rect x="232" y="115" width="36" height="18" rx="2" fill="#7c3aed" opacity="0.8"/>
  <text x="234" y="127" fill="white">Pawn</text>
  <!-- Lines -->
  <line x1="150" y1="50" x2="45" y2="70" stroke="#475569" stroke-width="1.2"/>
  <line x1="150" y1="50" x2="150" y2="70" stroke="#475569" stroke-width="1.2"/>
  <line x1="150" y1="50" x2="250" y2="70" stroke="#475569" stroke-width="1.2"/>
  <line x1="150" y1="98" x2="28" y2="115" stroke="#475569" stroke-width="1"/>
  <line x1="150" y1="98" x2="70" y2="115" stroke="#475569" stroke-width="1"/>
  <line x1="150" y1="98" x2="112" y2="115" stroke="#475569" stroke-width="1"/>
  <line x1="150" y1="98" x2="156" y2="115" stroke="#475569" stroke-width="1"/>
  <line x1="150" y1="98" x2="204" y2="115" stroke="#475569" stroke-width="1"/>
  <line x1="150" y1="98" x2="250" y2="115" stroke="#475569" stroke-width="1"/>
</svg>`,
      },
    },

    /* ── Q12 ── */
    {
      q: "Design a Pub/Sub system from scratch (like a mini Kafka). What are the core components and guarantees?",
      opts: [
        "Single queue shared by all",
        "Topic → Partition array → Message log (append-only). Publisher appends to partition. Consumer Group tracks offset per partition. Pull model. At-least-once delivery with idempotent consumers",
        "HTTP REST calls between services",
        "Shared database polling",
      ],
      ans: "Topic → Partition array → Message log (append-only). Publisher appends to partition. Consumer Group tracks offset per partition. Pull model. At-least-once delivery with idempotent consumers",
      cat: "LLD",
      exp: "Step 1: Classes: Topic(name, partitions[]), Partition(messages: ArrayList, offset: long), Producer(send(topic, key, value)), Consumer(subscribe(topic), poll()), ConsumerGroup(groupId, offsets Map<Partition, Long>).<br/>Step 2: Producer: hash(key) % numPartitions → pick partition → append message (offset = partition.messages.size()).<br/>Step 3: Consumer poll(): reads from partition starting at last committed offset. Processes batch. Commits new offset.<br/>Step 4: Consumer groups: multiple groups can consume same topic independently (each has own offset map). Within a group, each partition assigned to one consumer (no duplication).<br/>Step 5: Delivery guarantee: at-least-once (commit after process). Exactly-once: idempotency key per message + consumer deduplication.<br/>✅ Append log + offset per consumer group = core Kafka design pattern.",
    },

    /* ── Q13 ── */
    {
      q: "Advanced DP: 'Burst Balloons' problem. You have N balloons with values. Bursting balloon i gives nums[left]*nums[i]*nums[right] coins. Maximize coins. What is the DP formulation?",
      opts: [
        "Greedy: burst smallest first",
        "Interval DP: dp[i][j] = max coins from bursting all balloons between i and j. Consider k as the LAST balloon to burst in [i,j]: dp[i][j] = max(dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]) for k in (i,j)",
        "BFS on balloon states",
        "dp[i] = max coins bursting first i balloons",
      ],
      ans: "Interval DP: dp[i][j] = max coins from bursting all balloons between i and j. Consider k as the LAST balloon to burst in [i,j]: dp[i][j] = max(dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]) for k in (i,j)",
      cat: "DSA",
      exp: "Step 1: Add sentinels: nums[-1] = nums[N] = 1. Now array has N+2 elements.<br/>Step 2: dp[i][j] = max coins from bursting all balloons STRICTLY between index i and j (not including i and j themselves — they are boundaries).<br/>Step 3: Key insight: think about k as the LAST balloon to burst in range (i,j). When k is burst last, nums[i] and nums[j] are still alive → coins = nums[i]*nums[k]*nums[j].<br/>Step 4: dp[i][j] = max over k in (i,j) of: dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j].<br/>Step 5: Fill by increasing interval length. Answer = dp[0][N+1]. O(N³) time, O(N²) space.<br/>✅ Interval DP with 'last to burst' thinking. Counterintuitive but elegant.",
    },

    /* ── Q14 ── */
    {
      q: "Visualize: 'Stone Game' — two players take stones from either end of an array. Does the first player always win with optimal play?",
      opts: [
        "No, second player can always win",
        "Yes — first player always wins because they can choose to take all even-indexed or all odd-indexed piles, and one group always has more stones",
        "Depends on total number of stones",
        "Only if array length is odd",
      ],
      ans: "Yes — first player always wins because they can choose to take all even-indexed or all odd-indexed piles, and one group always has more stones",
      cat: "DSA",
      exp: "Step 1: Even-length array. Piles = [a0, a1, a2, a3, ...]. Every pile is either at an even or odd index.<br/>Step 2: Sum(even-indexed) ≠ Sum(odd-indexed) in general. One of them is larger.<br/>Step 3: First player can FORCE taking all even-indexed piles OR all odd-indexed piles: on any move, first player controls which parity the opponent faces.<br/>Step 4: If sum(even) > sum(odd) → first player takes all even-indexed. Since array has even length and player takes from ends, they can maintain parity control.<br/>Step 5: DP solution: dp[i][j] = max score first player can achieve from piles[i..j]. dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1]). But answer is always YES by the parity argument above.<br/>✅ First player ALWAYS wins with even-length stone arrays — mathematical proof via parity control.",
    },

    /* ── Q15 ── */
    {
      q: "Interviewer: 'Solve the Egg Drop problem. With N floors and K eggs, minimize the worst-case number of trials.'",
      opts: [
        "Binary search: O(log N) always",
        "DP: dp[k][n] = min trials with k eggs and n floors. dp[k][n] = 1 + min over x of max(dp[k-1][x-1], dp[k][n-x]). Optimized with binary search on x: O(KN log N)",
        "Always drop from the middle floor",
        "Linear scan: O(N) trials",
      ],
      ans: "DP: dp[k][n] = min trials with k eggs and n floors. dp[k][n] = 1 + min over x of max(dp[k-1][x-1], dp[k][n-x]). Optimized with binary search on x: O(KN log N)",
      cat: "DSA",
      exp: "Step 1: dp[k][n] = minimum number of trials to determine critical floor with k eggs and n floors.<br/>Step 2: Drop from floor x: if egg breaks → critical floor is below x → dp[k-1][x-1] remaining. If doesn't break → critical floor is above x → dp[k][n-x] remaining. We want to minimize the worst case.<br/>Step 3: dp[k][n] = 1 + min over x of max(dp[k-1][x-1], dp[k][n-x]).<br/>Step 4: Naive: O(KN²). Optimization: dp[k-1][x-1] increases with x. dp[k][n-x] decreases with x. Optimal x is where they intersect → binary search on x → O(KN log N).<br/>Step 5: Alternative DP formulation: dp[m][k] = max floors testable with m moves and k eggs. dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1. Answer = smallest m where dp[m][k] ≥ N. O(K log N).<br/>✅ Classic interval DP. Alternative formulation gives O(K log N).",
    },

    /* ── Q16 ── */
    {
      q: "Design a Vending Machine. What states does it have and what design patterns apply?",
      opts: [
        "One class with booleans",
        "State pattern: IDLE, HAS_MONEY, DISPENSING, OUT_OF_STOCK. Each state handles insertCoin(), selectProduct(), dispense(), refund() differently. Classes: VendingMachine, Product, Inventory, CoinSlot",
        "Factory pattern only",
        "Simple if-else chain",
      ],
      ans: "State pattern: IDLE, HAS_MONEY, DISPENSING, OUT_OF_STOCK. Each state handles insertCoin(), selectProduct(), dispense(), refund() differently. Classes: VendingMachine, Product, Inventory, CoinSlot",
      cat: "LLD",
      exp: "Step 1: States: IDLE (waiting for coin), HAS_MONEY (coin inserted, awaiting selection), DISPENSING (product selected, dispensing), OUT_OF_STOCK (selected product unavailable).<br/>Step 2: State interface: insertCoin(amount), selectProduct(code), dispense(), refund(). Each state class implements these — invalid transitions throw exception or are no-ops.<br/>Step 3: Classes: VendingMachine (currentState, balance, inventory), Product (code, name, price, quantity), Inventory (Map<String, Product>), CoinSlot (accepts/returns coins).<br/>Step 4: Transitions: IDLE.insertCoin() → HAS_MONEY. HAS_MONEY.selectProduct() → if valid+sufficient funds → DISPENSING; if out of stock → OUT_OF_STOCK. DISPENSING.dispense() → update inventory → give change → IDLE.<br/>Step 5: Strategy pattern for pricing (flat, time-based, loyalty discounts). Observer for inventory alerts (restock when quantity < threshold).<br/>✅ State pattern is the textbook answer for vending machine. Know all states and transitions.",
    },

    /* ── Q17 ── */
    {
      q: "Design a Library Management System. An interviewer expects you to cover book search, checkout, return, and reservations.",
      opts: [
        "Single Library class with lists",
        "Book (ISBN, title, copies), BookItem (physical copy, barcode, status), Member, Librarian, Reservation (book, member, date), Fine calculator. Strategy for search (by title/author/ISBN). Observer for reservation notification",
        "Database schema only",
        "Only Book and Member classes",
      ],
      ans: "Book (ISBN, title, copies), BookItem (physical copy, barcode, status), Member, Librarian, Reservation (book, member, date), Fine calculator. Strategy for search (by title/author/ISBN). Observer for reservation notification",
      cat: "LLD",
      exp: "Step 1: Book (ISBN, title, author, category, totalCopies) vs BookItem (barcode, status: AVAILABLE/LOANED/RESERVED, dueDate) — a Book can have multiple BookItems.<br/>Step 2: Member: memberId, name, activeLoans List<Loan>, reservations List<Reservation>, fines balance.<br/>Step 3: Loan: loanId, bookItem, member, checkoutDate, dueDate, returnDate. Fine = overdueDays × ratePerDay.<br/>Step 4: Reservation: when all copies checked out → member places reservation → added to queue. When a copy returned → Observer notifies first in reservation queue.<br/>Step 5: Search strategy: Catalog.search(SearchCriteria) where SearchCriteria can be ByTitle, ByAuthor, ByISBN, ByCategory. Returns List<Book>. Fine calculation is a Strategy: flat rate, scaled by days, capped at book price.<br/>✅ Book/BookItem separation, Loan for tracking, Observer for reservations, Strategy for search and fines.",
    },

    /* ── Q18 ── */
    {
      q: "Advanced Graph: given a graph with N nodes and edges with both positive AND negative weights, find the shortest path. Bellman-Ford relaxes edges V-1 times. Why exactly V-1?",
      opts: [
        "Because there are V-1 nodes",
        "A shortest path in a graph with V nodes can have at most V-1 edges (visiting each node at most once). After k relaxations, all shortest paths using ≤ k edges are correct",
        "V-1 is just a convention",
        "To detect negative cycles only",
      ],
      ans: "A shortest path in a graph with V nodes can have at most V-1 edges (visiting each node at most once). After k relaxations, all shortest paths using ≤ k edges are correct",
      cat: "DSA",
      exp: "Step 1: In a graph with V vertices, any simple path (no repeated vertices) has at most V-1 edges.<br/>Step 2: After 1 relaxation: all shortest paths using ≤ 1 edge are found. After 2: ≤ 2 edges. After k: ≤ k edges.<br/>Step 3: After V-1 relaxations: all shortest paths with ≤ V-1 edges are found → all shortest simple paths discovered.<br/>Step 4: If the V-th relaxation still updates any distance → there exists a path shorter than V-1 edges → must pass through a node twice → NEGATIVE CYCLE detected.<br/>Step 5: O(V×E) time. Works with negative edges. Detect negative cycle: do one more (V-th) relaxation — if any update occurs → negative cycle.<br/>✅ V-1 = max edges in simple path. V-th relaxation = negative cycle detection.",
    },

    /* ── Q19 ── */
    {
      q: "What is the difference between Kahn's topological sort and DFS-based topo sort in terms of additional capabilities?",
      opts: [
        "No difference, both give same result",
        "Kahn's (BFS + in-degree): explicitly detects cycles (if processed nodes < V), easier to parallelize, gives level-by-level ordering. DFS-based: natural recursive structure, harder to detect cycle separately",
        "DFS-based is always faster",
        "Kahn's only works on trees",
      ],
      ans: "Kahn's (BFS + in-degree): explicitly detects cycles (if processed nodes < V), easier to parallelize, gives level-by-level ordering. DFS-based: natural recursive structure, harder to detect cycle separately",
      cat: "DSA",
      exp: "Step 1: Kahn's algorithm: compute in-degree of all nodes. Enqueue all in-degree 0 nodes. Process: dequeue node → output → decrement neighbors' in-degree → enqueue if in-degree becomes 0.<br/>Step 2: Cycle detection in Kahn's: if processed count < V → remaining nodes are part of a cycle (never reached in-degree 0).<br/>Step 3: Level ordering: Kahn's naturally gives nodes level by level (like BFS) → useful for parallel execution (all nodes at same level can be processed in parallel — course scheduling, build systems).<br/>Step 4: DFS topo sort: post-order push to stack → reverse = topo order. Cycle: use gray/black coloring (separate from topo logic).<br/>Step 5: Both O(V+E). Kahn's is iterative → no stack overflow risk. DFS is recursive → stack overflow on very large graphs.<br/>✅ Kahn's: cycle detection built-in + level ordering. DFS: elegant recursion but cycle detection is extra.",
    },

    /* ── Q20 ── */
    {
      q: "You are given a grid with obstacles. Find the number of unique paths from top-left to bottom-right. What is the DP approach?",
      opts: [
        "BFS counting all paths",
        "dp[i][j] = number of paths to cell (i,j). dp[i][j] = 0 if obstacle. Else dp[i][j] = dp[i-1][j] + dp[i][j-1]. Initialize dp[0][0]=1 if no obstacle",
        "Combinatorics only: C(m+n,m)",
        "DFS with backtracking",
      ],
      ans: "dp[i][j] = number of paths to cell (i,j). dp[i][j] = 0 if obstacle. Else dp[i][j] = dp[i-1][j] + dp[i][j-1]. Initialize dp[0][0]=1 if no obstacle",
      cat: "DSA",
      exp: "Step 1: Without obstacles: C(m+n-2, m-1) combinations. With obstacles: must use DP.<br/>Step 2: dp[i][j] = number of unique paths reaching cell (i,j). Only moves: right or down.<br/>Step 3: If grid[i][j] == obstacle → dp[i][j] = 0 (no path passes through obstacle).<br/>Step 4: Otherwise: dp[i][j] = dp[i-1][j] (from above) + dp[i][j-1] (from left). Handle boundary: if i==0 or j==0 → only one direction.<br/>Step 5: Space optimization: 1D dp array of size N (columns). Traverse row by row: dp[j] += dp[j-1]. O(M×N) time, O(N) space.<br/>✅ Classic 2D DP with obstacle handling. O(M×N) time, O(N) optimized space.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Unique Paths with Obstacles — DP Grid</text>
  <g transform="translate(10, 22)">
    <!-- Grid cells 4x4 -->
    <!-- Row 0 -->
    <rect x="0"  y="0"  width="36" height="30" rx="2" fill="#22c55e" opacity="0.85"/><text x="13" y="19" fill="white">1</text>
    <rect x="38" y="0"  width="36" height="30" rx="2" fill="#22c55e" opacity="0.7"/> <text x="51" y="19" fill="white">1</text>
    <rect x="76" y="0"  width="36" height="30" rx="2" fill="#ef4444" opacity="0.85"/><text x="87" y="19" fill="white">🚫</text>
    <rect x="114" y="0" width="36" height="30" rx="2" fill="#22c55e" opacity="0.5"/><text x="127" y="19" fill="white">0</text>
    <!-- Row 1 -->
    <rect x="0"  y="32" width="36" height="30" rx="2" fill="#22c55e" opacity="0.7"/> <text x="13" y="51" fill="white">1</text>
    <rect x="38" y="32" width="36" height="30" rx="2" fill="#22c55e" opacity="0.7"/> <text x="51" y="51" fill="white">2</text>
    <rect x="76" y="32" width="36" height="30" rx="2" fill="#22c55e" opacity="0.7"/> <text x="89" y="51" fill="white">2</text>
    <rect x="114" y="32" width="36" height="30" rx="2" fill="#22c55e" opacity="0.7"/><text x="127" y="51" fill="white">2</text>
    <!-- Row 2 -->
    <rect x="0"  y="64" width="36" height="30" rx="2" fill="#22c55e" opacity="0.5"/> <text x="13" y="83" fill="white">1</text>
    <rect x="38" y="64" width="36" height="30" rx="2" fill="#22c55e" opacity="0.5"/> <text x="51" y="83" fill="white">3</text>
    <rect x="76" y="64" width="36" height="30" rx="2" fill="#22c55e" opacity="0.5"/> <text x="89" y="83" fill="white">5</text>
    <rect x="114" y="64" width="36" height="30" rx="2" fill="#6c63ff" opacity="0.9"/><text x="127" y="83" fill="white">7</text>
    <!-- Arrows showing path -->
    <text x="160" y="20" fill="#94a3b8" font-size="9">dp[i][j]=dp[i-1][j]+dp[i][j-1]</text>
    <text x="160" y="35" fill="#ef4444" font-size="9">Obstacle → dp=0</text>
    <text x="160" y="50" fill="#6c63ff" font-size="9">Answer = dp[2][3] = 7 paths</text>
    <text x="160" y="65" fill="#fbbf24" font-size="9">Space: O(N) 1D array</text>
  </g>
</svg>`,
      },
    },

    /* ── Q21 ── */
    {
      q: "Backtracking: Solve Sudoku. What are the pruning strategies beyond basic row/column/box checks?",
      opts: [
        "Just try all 9 digits at each empty cell",
        "MRV (Minimum Remaining Values): choose the empty cell with fewest valid digits first. Forward Checking: after placing a digit, update constraints of affected cells. Naked Pairs/Triples: eliminate candidates",
        "Fill row by row without backtracking",
        "Random assignment with correction",
      ],
      ans: "MRV (Minimum Remaining Values): choose the empty cell with fewest valid digits first. Forward Checking: after placing a digit, update constraints of affected cells. Naked Pairs/Triples: eliminate candidates",
      cat: "DSA",
      exp: "Step 1: Basic backtracking: pick any empty cell → try digits 1-9 → if valid (not in row/col/box) → recurse. Backtrack on dead end.<br/>Step 2: MRV heuristic: choose the empty cell with the fewest remaining valid choices first. This fails faster → less backtracking. O(much less) in practice.<br/>Step 3: Forward checking: after placing digit d at (r,c) → immediately update candidate lists for all cells in same row, col, box. If any cell reaches 0 candidates → prune immediately.<br/>Step 4: Arc Consistency (AC-3): propagate constraints further than just direct neighbors — if a cell's candidates narrow, propagate that reduction to its peers.<br/>Step 5: Naked pairs: if two cells in same unit both have exactly candidates {X,Y} → X and Y can be eliminated from all other cells in that unit.<br/>✅ MRV + Forward Checking = dramatically reduces search space vs naive backtracking.",
    },

    /* ── Q22 ── */
    {
      q: "Count the number of ways to place N non-attacking rooks on an N×N chessboard with some cells blocked. What is the DP approach?",
      opts: [
        "N! brute force permutations",
        "DP on rows × columns: dp[row][cols_used_bitmask]. But N≤20 → bitmask DP too large. Better: model as bipartite matching and count perfect matchings via inclusion-exclusion",
        "Greedy: place rooks left to right",
        "BFS on board states",
      ],
      ans: "DP on rows × columns: dp[row][cols_used_bitmask]. But N≤20 → bitmask DP too large. Better: model as bipartite matching and count perfect matchings via inclusion-exclusion",
      cat: "DSA",
      exp: "Step 1: Each rook is placed one per row and one per column (non-attacking). For row i, choose a column not used by previous rows AND not blocked.<br/>Step 2: Bitmask DP for small N (N≤20): dp[mask] = number of ways to place rooks in first popcount(mask) rows using columns indicated by mask. Transition: dp[mask | (1<<j)] += dp[mask] if (row, j) is not blocked.<br/>Step 3: For large N: model as bipartite graph — rows on left, columns on right. Edge (row_i, col_j) if cell (i,j) is not blocked. Count perfect matchings.<br/>Step 4: Counting perfect matchings in bipartite graph: use permanent of adjacency matrix (similar to determinant but all + signs). O(2^N × N) via Ryser's formula.<br/>Step 5: With blocked cells: build availability matrix M where M[i][j] = 1 if not blocked. Permanent(M) = number of valid placements.<br/>✅ Bitmask DP for N≤20. Ryser permanent for larger N.",
    },

    /* ── Q23 ── */
    {
      q: "You need to design a generic Iterator pattern for a tree (pre-order, in-order, post-order) without recursion. What is the approach for in-order?",
      opts: [
        "Convert to array first then iterate",
        "Explicit stack: push root. While stack not empty: go left as far as possible (pushing each node). Pop → visit. Move to right child. Repeat",
        "BFS queue approach",
        "Recursion is the only way",
      ],
      ans: "Explicit stack: push root. While stack not empty: go left as far as possible (pushing each node). Pop → visit. Move to right child. Repeat",
      cat: "LLD",
      exp: "Step 1: In-order iterative uses an explicit stack to simulate the call stack of recursive in-order (left, root, right).<br/>Step 2: Initialize: current = root, stack = empty.<br/>Step 3: Loop: while current != null → push current → current = current.left. (Goes as far left as possible.)<br/>Step 4: When current == null → pop from stack → visit (yield/return this node). Set current = popped.right.<br/>Step 5: Repeat until stack empty AND current null. This visits nodes in sorted order for BST.<br/>Iterator class: BinaryTreeIterator has next() and hasNext(). hasNext() = !stack.isEmpty() || current != null. next() = run one step of the loop.<br/>✅ Explicit stack mirrors recursive call stack. O(H) space where H = tree height. O(1) amortized per next().",
    },

    /* ── Q24 ── */
    {
      q: "Bit Manipulation: given N, find the position of the rightmost set bit and the total number of bits that differ between N and N+1.",
      opts: [
        "Use modulo and division",
        "Rightmost set bit position: log2(N & -N). Bits differing between N and N+1: trailing zeros of (N+1) plus one, because N+1 flips all trailing 1s of N and the first 0",
        "Convert to binary string and compare",
        "XOR then count — no pattern exists",
      ],
      ans: "Rightmost set bit position: log2(N & -N). Bits differing between N and N+1: trailing zeros of (N+1) plus one, because N+1 flips all trailing 1s of N and the first 0",
      cat: "DSA",
      exp: "Step 1: N & -N isolates the rightmost set bit. Example: N=12 (1100) → -N=...0100 (two's complement) → N & -N = 0100 = 4. log2(4) = 2 → bit position 2 (0-indexed).<br/>Step 2: N XOR (N+1): when you add 1 to N, it flips the trailing 1s and the first 0. E.g., N=7 (0111) → N+1=8 (1000). XOR = 1111 → 4 bits differ.<br/>Step 3: Number of differing bits = trailing zeros of N+1 PLUS ONE (the 0 bit that became 1). Equivalently: __builtin_ctz(N+1) + 1.<br/>Step 4: Alternative: popcount(N XOR (N+1)) gives exact count of differing bits.<br/>Step 5: Application: Gray code uses this — consecutive Gray code numbers differ by exactly 1 bit. Gray code[n] = n XOR (n>>1).<br/>✅ N & -N = rightmost set bit. N XOR (N+1) = trailing sequence flip.",
    },

    /* ── Q25 ── */
    {
      q: "Interviewer shows you: array [1,2,3,4,5]. Apply XOR prefix trick to find the subarray with maximum XOR. What is the approach?",
      opts: [
        "Try all O(N²) subarrays",
        "Prefix XOR + Trie: insert each prefix XOR into a trie. For each prefix XOR, query trie for the value that maximizes XOR → O(N × 32) = O(N)",
        "Sort the array then XOR",
        "Use a segment tree on XOR values",
      ],
      ans: "Prefix XOR + Trie: insert each prefix XOR into a trie. For each prefix XOR, query trie for the value that maximizes XOR → O(N × 32) = O(N)",
      cat: "DSA",
      exp: "Step 1: prefix[i] = XOR of arr[0..i-1]. Subarray XOR from l to r = prefix[r+1] XOR prefix[l].<br/>Step 2: To maximize prefix[r+1] XOR prefix[l]: for each prefix[r+1], find the prefix[l] already in trie that maximizes XOR.<br/>Step 3: Trie on bits: insert prefix values bit by bit (MSB to LSB). At each trie level, greedily choose the opposite bit (to maximize XOR).<br/>Step 4: For each new prefix XOR: query trie → O(32) per query. Update answer. Insert into trie.<br/>Step 5: O(N × 32) = O(N) time. O(N × 32) space for trie nodes. Handles negative numbers if treated as 32-bit integers.<br/>✅ Prefix XOR + Binary Trie = O(N) maximum XOR subarray. Classic bit manipulation + trie combination.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 135" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Max XOR Subarray — Prefix XOR + Trie</text>
  <!-- Array -->
  <text x="10" y="30" fill="#94a3b8" font-size="9">Array: [3, 10, 5, 25, 2, 8]</text>
  <text x="10" y="45" fill="#6c63ff" font-size="9">Prefix XOR: [0, 3, 9, 12, 21, 23, 31]</text>
  <!-- Trie visualization -->
  <text x="10" y="62" fill="#94a3b8" font-size="9">Binary Trie (MSB to LSB):</text>
  <!-- Root -->
  <circle cx="150" cy="78" r="8" fill="#334155"/>
  <text x="146" y="82" fill="white" font-size="8">*</text>
  <!-- Level 1 -->
  <circle cx="100" cy="100" r="8" fill="#6c63ff" opacity="0.9"/>
  <text x="97" y="104" fill="white" font-size="8">0</text>
  <circle cx="200" cy="100" r="8" fill="#3b82f6" opacity="0.9"/>
  <text x="197" y="104" fill="white" font-size="8">1</text>
  <!-- Lines -->
  <line x1="150" y1="86" x2="106" y2="92" stroke="#475569" stroke-width="1.2"/>
  <line x1="150" y1="86" x2="194" y2="92" stroke="#475569" stroke-width="1.2"/>
  <text x="122" y="97" fill="#22c55e" font-size="8">0</text>
  <text x="172" y="97" fill="#22c55e" font-size="8">1</text>
  <text x="10" y="120" fill="#fbbf24" font-size="9">For each prefix XOR: greedily pick opposite bit at each level</text>
  <text x="10" y="133" fill="#22c55e" font-size="9">Max XOR subarray = 28 (indices 1 to 4: 10^5^25^2=28)</text>
</svg>`,
      },
    },

    /* ── Q26 ── */
    {
      q: "Advanced Segment Tree: 'Range update (add X to all elements in [l,r]) and Range query (sum of [l,r])'. How does Lazy Propagation make both O(log N)?",
      opts: [
        "Update each element individually",
        "Lazy tag stores pending additions. On range update: if node fully covered → add X to node value + (r-l+1)*X to sum + store X in lazy. On access: push lazy to children first. Both O(log N)",
        "Use a prefix sum array",
        "Sort the array after each update",
      ],
      ans: "Lazy tag stores pending additions. On range update: if node fully covered → add X to node value + (r-l+1)*X to sum + store X in lazy. On access: push lazy to children first. Both O(log N)",
      cat: "DSA",
      exp: "Step 1: Without lazy: range update [l,r] requires touching every leaf → O(N).<br/>Step 2: With lazy: when updating range [l,r] with +X: if current node's segment is fully inside [l,r] → sum[node] += X × (segment_length). Store lazy[node] += X. Don't recurse.<br/>Step 3: Push-down (propagate): before accessing children of a node with pending lazy: children.sum += lazy[parent] × child_length. children.lazy += lazy[parent]. Clear parent's lazy.<br/>Step 4: Range query [l,r]: push-down at each visited node before going to children. Combine only fully-covered segments.<br/>Step 5: Result: both range update and range query in O(log N). Updates are deferred until needed.<br/>Applications: add X to range, query range sum; range set to X; range multiply; range max/min with updates.<br/>✅ Lazy propagation: O(log N) range update by deferring updates to children.",
    },

    /* ── Q27 ── */
    {
      q: "Fenwick Tree (BIT): how do you extend it to support range updates AND range queries (not just point update + prefix query)?",
      opts: [
        "You can't — need Segment Tree for range updates",
        "Use two BITs: B1 and B2. Range update [l,r] with +X: update B1 and B2 with derived values. Prefix sum query combines B1[i]*i - B2[i]. Derivation from the difference array identity",
        "Rebuild BIT after each range update",
        "Store sums of sums in BIT",
      ],
      ans: "Use two BITs: B1 and B2. Range update [l,r] with +X: update B1 and B2 with derived values. Prefix sum query combines B1[i]*i - B2[i]. Derivation from the difference array identity",
      cat: "DSA",
      exp: "Step 1: Goal: range add [l,r] with +X AND prefix sum query [1,i], both O(log N).<br/>Step 2: Derivation: prefix sum from 1 to i = Σ a[j] for j=1 to i. After range update [l,r] with +X, contribution can be decomposed using the difference array trick.<br/>Step 3: Two BITs: B1 and B2. Range update [l,r] with +X: B1.add(l, X), B1.add(r+1, -X), B2.add(l, X*(l-1)), B2.add(r+1, -X*r).<br/>Step 4: Prefix sum query [1,i]: B1.sum(i)*i - B2.sum(i). This gives the correct cumulative sum.<br/>Step 5: Range sum [l,r] = prefixSum(r) - prefixSum(l-1). All O(log N).<br/>✅ Two BITs = range update + range query in O(log N) with simpler code than Segment Tree.",
    },

    /* ── Q28 ── */
    {
      q: "You're asked to solve 'Palindrome Partitioning II' (minimum cuts to partition a string into palindromes). What is the optimized DP?",
      opts: [
        "BFS on all substrings",
        "Expand-around-center for palindromes: O(N²) preprocessing. Then cuts[i] = min cuts for s[0..i]. For each palindrome ending at i: cuts[i] = min(cuts[j-1] + 1) for all j where s[j..i] is palindrome. O(N²) overall",
        "Greedy: find longest palindrome prefix, cut, recurse",
        "O(N³) triple nested DP only",
      ],
      ans: "Expand-around-center for palindromes: O(N²) preprocessing. Then cuts[i] = min cuts for s[0..i]. For each palindrome ending at i: cuts[i] = min(cuts[j-1] + 1) for all j where s[j..i] is palindrome. O(N²) overall",
      cat: "DSA",
      exp: "Step 1: Precompute isPalin[i][j] for all substrings using expand-around-center: for each center, expand to find all palindromes. O(N²) time and space.<br/>Step 2: cuts[i] = minimum cuts for s[0..i]. cuts[-1] = -1 (base case).<br/>Step 3: For each i from 0 to N-1: if s[0..i] is itself a palindrome → cuts[i] = 0 (no cuts needed). Else: cuts[i] = min(cuts[j-1] + 1) for all j from 1 to i where isPalin[j][i] is true.<br/>Step 4: O(N²) preprocessing + O(N²) DP = O(N²) total. Space O(N²) for palindrome table.<br/>Step 5: Further optimization: Manacher's algorithm computes all palindromic spans in O(N). But O(N²) DP still dominates.<br/>✅ Expand-around-center + 1D cuts DP = O(N²) minimum palindrome partition.",
    },

    /* ── Q29 ── */
    {
      q: "Design a real-time Leaderboard for a gaming platform. 100M users, updates every second, top-K queries. What is the data structure?",
      opts: [
        "Sort all users every second",
        "Redis Sorted Set (ZSET): O(log N) update (ZADD), O(log N + K) top-K query (ZREVRANGE). Shard by user_id range for horizontal scale. Periodic sync to persistent DB",
        "SQL ORDER BY score LIMIT K",
        "Max-Heap of all users",
      ],
      ans: "Redis Sorted Set (ZSET): O(log N) update (ZADD), O(log N + K) top-K query (ZREVRANGE). Shard by user_id range for horizontal scale. Periodic sync to persistent DB",
      cat: "LLD",
      exp: "Step 1: Redis Sorted Set: ZADD leaderboard <score> <user_id> → O(log N). ZREVRANGE leaderboard 0 K-1 WITHSCORES → O(log N + K) for top K.<br/>Step 2: 100M users in one sorted set: memory ~100M × 40 bytes ≈ 4GB — feasible in a single Redis instance but large. Shard by game/region.<br/>Step 3: User rank: ZREVRANK leaderboard <user_id> → O(log N).<br/>Step 4: Nearby ranks: ZREVRANGE leaderboard rank-5 rank+5 WITHSCORES → show neighbors.<br/>Step 5: Persistence: Redis is in-memory. Periodic snapshot to Cassandra/SQL for durability. On Redis restart: reload from persistent store.<br/>Update pipeline: game server → Kafka → leaderboard update service → ZADD to Redis. Batching updates per second reduces contention.<br/>✅ Redis ZSET = perfect leaderboard. O(log N) all operations. Industry standard (gaming, competitive platforms).",
    },

    /* ── Q30 ── */
    {
      q: "Implement an in-memory key-value store with TTL (time-to-live) expiration. How do you handle expiry efficiently?",
      opts: [
        "Check expiry on every set() call",
        "HashMap for key→(value, expiryTime) + min-heap or sorted set for expiry ordering. Background thread evicts expired keys. Lazy deletion: on get(), check if expired → delete → return null",
        "Store all keys in a sorted array",
        "Delete keys when memory is full only",
      ],
      ans: "HashMap for key→(value, expiryTime) + min-heap or sorted set for expiry ordering. Background thread evicts expired keys. Lazy deletion: on get(), check if expired → delete → return null",
      cat: "LLD",
      exp: "Step 1: HashMap<String, Entry> where Entry = {value, expiryTime (epoch ms)}. O(1) get/set.<br/>Step 2: Lazy deletion: on get(key) → check if currentTime > expiryTime → if yes, remove from map, return null. Avoids background threads but leaves stale entries in memory.<br/>Step 3: Active expiry: min-heap sorted by expiryTime. Background thread wakes every N ms → evicts all entries with expiryTime < now. O(K log N) where K = expired entries.<br/>Step 4: Sorted set alternative (TreeMap<Long, Set<String>>): maps expiryTime → set of keys. evict up to headMap(currentTime). More efficient for bulk eviction.<br/>Step 5: Thread safety: ConcurrentHashMap + ReentrantLock for heap operations. Or single-threaded event loop like Redis.<br/>Redis implementation: uses both lazy deletion (on access) + active expiry (periodic random sampling of keys with TTL).<br/>✅ Lazy + active expiry = efficient TTL. Redis uses this exact dual strategy.",
    },

    /* ── Q31 ── */
    {
      q: "Graph: Given a directed graph, find the shortest cycle (minimum number of edges). What algorithm solves this?",
      opts: [
        "DFS and count back edges",
        "BFS from each vertex: run BFS from every node. If a node is reached again from itself via BFS → cycle found. Minimum over all starts. O(V(V+E))",
        "Bellman-Ford modification",
        "Floyd-Warshall diagonal check: if dist[i][i] < INF → cycle",
      ],
      ans: "BFS from each vertex: run BFS from every node. If a node is reached again from itself via BFS → cycle found. Minimum over all starts. O(V(V+E))",
      cat: "DSA",
      exp: "Step 1: A cycle through vertex v: BFS from v finds v again at some distance d → cycle of length d.<br/>Step 2: For each source vertex v: run BFS. Track distances. If a neighbor of the current node is the source v AND distance is known → cycle length = dist[neighbor] + 1.<br/>Step 3: Track minimum cycle across all BFS runs.<br/>Step 4: O(V × (V+E)) — V BFS runs each O(V+E). For dense graphs: O(V³).<br/>Step 5: Alternative — Floyd-Warshall diagonal: after all-pairs shortest path, if dist[i][i] < INF (i.e., ≠ 0 if initialized to INF), then there's a cycle through i. Minimum dist[i][i] over all i = shortest cycle. O(V³).<br/>For unweighted graphs: BFS approach preferred. For weighted: Floyd-Warshall diagonal.<br/>✅ BFS per vertex = O(V(V+E)). Floyd-Warshall diagonal = O(V³) but handles weighted graphs.",
    },

    /* ── Q32 ── */
    {
      q: "Implement a 'Design Twitter' LLD: Users can post tweets, follow others, and get top 10 tweets in their news feed. What is the efficient approach?",
      opts: [
        "Store all tweets in one table and query on get feed",
        "Each user has a tweet list (sorted by time). getNewsFeed: use a min-heap of size 10 merging tweet streams from all followed users. O(F log 10) where F = following count",
        "Materialize feed on every post",
        "Sort all tweets globally every time",
      ],
      ans: "Each user has a tweet list (sorted by time). getNewsFeed: use a min-heap of size 10 merging tweet streams from all followed users. O(F log 10) where F = following count",
      cat: "LLD",
      exp: "Step 1: Data: HashMap<userId, List<Tweet>> where tweets are sorted by timestamp descending. HashMap<userId, Set<Integer>> for following.<br/>Step 2: postTweet(userId, content): prepend tweet to user's list (most recent first). O(1).<br/>Step 3: follow(followerId, followeeId): add to followeeId's followers set. O(1).<br/>Step 4: getNewsFeed(userId): collect all followees + self. Initialize min-heap (by tweet timestamp) with the first (newest) tweet from each followee. Pop top 10 tweets, each time pushing the next tweet from the same user's list.<br/>Step 5: O(F log F) to build initial heap + O(10 log F) to extract top 10 = O(F log F) total. F = number of followees (typically small).<br/>This is the 'Merge K Sorted Lists' pattern applied to feeds.<br/>✅ Min-heap merge of per-user tweet streams = efficient feed without full pre-computation.",
    },

    /* ── Q33 ── */
    {
      q: "Solve: Count all pairs in an array where bitwise AND equals zero. Brute force is O(N²). Can you do better?",
      opts: [
        "Sort and use two pointers",
        "Precompute frequency of each number. For each of 2^20 possible masks, use SOS (Sum over Subsets) DP to count pairs whose AND = 0 (i.e., numbers that are subsets of the complement)",
        "XOR all elements",
        "Hash map of sums",
      ],
      ans: "Precompute frequency of each number. For each of 2^20 possible masks, use SOS (Sum over Subsets) DP to count pairs whose AND = 0 (i.e., numbers that are subsets of the complement)",
      cat: "DSA",
      exp: "Step 1: A & B = 0 means A and B have no common set bits. B must be a subset of the complement of A (~A).<br/>Step 2: For each number a, count numbers b such that b is a subset of ~a (all submasks of ~a).<br/>Step 3: Sum over Subsets (SOS) DP: f[mask] = count of numbers in array that are submasks of mask. SOS DP computes this for all masks in O(2^M × M) where M = max bits (≈ 20).<br/>Step 4: sos[mask] = count[mask] + sos over all masks obtained by clearing one bit of mask. Filled using standard SOS DP.<br/>Step 5: Answer: Σ freq[a] × sos[~a & ((1<<M)-1)] for all a. Subtract self-pairs (a & a ≠ 0 for a>0 so usually fine).<br/>Time: O(2^M × M) ≈ O(20 × 10^6) = manageable.<br/>✅ SOS DP (Sum over Subsets) enables O(2^M × M) subset counting — key technique for bitmask problems.",
    },

    /* ── Q34 ── */
    {
      q: "Interviewer: 'Given a tree, find the maximum path sum (path can start and end at any node).' How does your DFS solution track this?",
      opts: [
        "BFS from every node",
        "Post-order DFS: at each node, compute maxGain(node) = max(0, maxGain(left)) + max(0, maxGain(right)) + node.val for global max. Return node.val + max(0, max(left_gain, right_gain)) upward",
        "Find diameter and multiply by max value",
        "DP table on node indices",
      ],
      ans: "Post-order DFS: at each node, compute maxGain(node) = max(0, maxGain(left)) + max(0, maxGain(right)) + node.val for global max. Return node.val + max(0, max(left_gain, right_gain)) upward",
      cat: "DSA",
      exp: "Step 1: Any path in a binary tree has a 'highest node' (turns from going up to going down). At this node, the path goes into the left subtree and/or the right subtree.<br/>Step 2: maxGain(node): maximum sum of a path that starts at node and goes DOWN (either left or right — one direction only). maxGain = node.val + max(0, maxGain(left), maxGain(right)).<br/>Step 3: At each node, the path THROUGH this node = max(0, maxGain(left)) + node.val + max(0, maxGain(right)). Update global_max with this.<br/>Step 4: Why max(0, ...)? A negative subtree contribution should be ignored (don't extend into it).<br/>Step 5: Return maxGain upward (only one branch), not the path-through value (which can't extend further up).<br/>O(N) single DFS pass. Handles negative values.<br/>✅ Post-order DFS with global max tracking. Critical distinction: return value ≠ answer considered.",
    },

    /* ── Q35 ── */
    {
      q: "You see this problem: 'Count of range sums in [lower, upper] in an array.' What advanced technique achieves O(N log N)?",
      opts: [
        "O(N²) all prefix pairs",
        "Merge Sort on prefix sums: during merge phase, count pairs (prefix[j] - prefix[i]) in [lower, upper] using two pointers on sorted halves. O(N log N)",
        "Binary search on sorted array",
        "Segment tree with coordinate compression",
      ],
      ans: "Merge Sort on prefix sums: during merge phase, count pairs (prefix[j] - prefix[i]) in [lower, upper] using two pointers on sorted halves. O(N log N)",
      cat: "DSA",
      exp: "Step 1: Range sum [i,j] = prefix[j+1] - prefix[i]. Count pairs where lower ≤ prefix[j+1] - prefix[i] ≤ upper for j > i.<br/>Step 2: Rearrange: for each j, count prefix[i] in [prefix[j+1] - upper, prefix[j+1] - lower].<br/>Step 3: Merge sort on prefix array: during merge of sorted halves, for each element in right half (prefix[j+1]), use two pointers to count elements in left half within the valid range. Two pointers move monotonically → O(N) per merge level.<br/>Step 4: T(N) = 2T(N/2) + O(N) → O(N log N).<br/>Step 5: Alternative: Fenwick tree with coordinate compression on prefix sums. For each prefix[j+1]: query BIT for count in [prefix[j+1]-upper, prefix[j+1]-lower]. Then insert prefix[j+1]. O(N log N).<br/>✅ Merge sort on prefix sums = O(N log N). Advanced divide and conquer pattern.",
    },

    /* ── Q36 ── */
    {
      q: "Design a Notification System for LLD. Classes, delivery channels, retry logic, and priority.",
      opts: [
        "Single NotificationService class",
        "Notification (id, type, priority, userId, content), NotificationChannel (interface: Email, SMS, Push, InApp), NotificationRouter, RetryPolicy (exponential backoff), NotificationQueue (priority queue by priority)",
        "Just send HTTP requests directly",
        "Only use email as channel",
      ],
      ans: "Notification (id, type, priority, userId, content), NotificationChannel (interface: Email, SMS, Push, InApp), NotificationRouter, RetryPolicy (exponential backoff), NotificationQueue (priority queue by priority)",
      cat: "LLD",
      exp: "Step 1: Notification entity: {id, userId, type (ALERT/INFO/PROMO), priority (HIGH/MED/LOW), channels[], content, status, createdAt, scheduledAt}.<br/>Step 2: NotificationChannel interface: send(notification) → DeliveryResult. Implementations: EmailChannel (SMTP), SMSChannel (Twilio), PushChannel (FCM/APNs), InAppChannel (WebSocket).<br/>Step 3: NotificationRouter: given notification type + user preferences → decides which channels to use. UserPreference (userId, preferredChannels, doNotDisturbHours).<br/>Step 4: RetryPolicy: on send failure → retry with exponential backoff (1s, 2s, 4s, ...) up to maxRetries. Dead letter queue for permanently failed notifications.<br/>Step 5: NotificationQueue: priority queue ordered by (priority DESC, scheduledAt ASC). Worker threads poll and dispatch.<br/>Template pattern: NotificationTemplate (type → content template with variable substitution).<br/>✅ Strategy pattern for channels + Template for content + Priority Queue + Retry = production notification system.",
    },

    /* ── Q37 ── */
    {
      q: "Advanced DP: 'Minimum cost to connect all ropes.' You have N ropes of different lengths. Connecting two ropes of length a and b costs a+b. Minimize total cost.",
      opts: [
        "Sort and connect adjacent ropes",
        "Min-Heap (Greedy DP): always connect the two shortest ropes first. Insert result back. Repeat N-1 times. Total cost = Σ (each intermediate rope × times it's included in a merge). O(N log N)",
        "Connect longest ropes first to reduce future costs",
        "Divide and conquer: always connect halves",
      ],
      ans: "Min-Heap (Greedy DP): always connect the two shortest ropes first. Insert result back. Repeat N-1 times. Total cost = Σ (each intermediate rope × times it's included in a merge). O(N log N)",
      cat: "DSA",
      exp: "Step 1: This is equivalent to building an optimal Huffman tree for rope lengths.<br/>Step 2: Key insight: when you connect ropes, the cost of each original rope is proportional to how many merges include it. Shorter ropes should be merged earlier (fewer times they contribute to cost).<br/>Step 3: Algorithm: put all lengths in a min-heap. Pop two smallest (a, b). Cost += a+b. Push a+b back. Repeat.<br/>Step 4: Correctness: this is the greedy choice property — connecting two shortest ropes first is always optimal (proof by exchange argument).<br/>Step 5: Example: [1, 2, 3, 4]. Merge 1+2=3 (cost 3). Merge 3+3=6 (cost 6). Merge 6+4=10 (cost 10). Total = 19. Alternative order gives higher cost.<br/>O(N log N) — N-1 heap pops and inserts.<br/>✅ Min-Heap greedy = O(N log N). Same pattern as Huffman encoding.",
    },

    /* ── Q38 ── */
    {
      q: "Implement a stack that supports getMin() in O(1) without extra space per element beyond O(N) total. How?",
      opts: [
        "Separate min-stack tracking all mins",
        "Encode the minimum in the stack itself: store (2*val - prevMin) when new element < prevMin. On pop: if top < currentMin → previousMin = 2*currentMin - top → update. currentMin stays updated",
        "Use a sorted list alongside stack",
        "O(1) is impossible without extra space",
      ],
      ans: "Encode the minimum in the stack itself: store (2*val - prevMin) when new element < prevMin. On pop: if top < currentMin → previousMin = 2*currentMin - top → update. currentMin stays updated",
      cat: "DSA",
      exp: "Step 1: Standard solution: maintain a parallel min-stack. O(N) extra space. The encoded approach uses O(1) extra — only one variable min.<br/>Step 2: Push(val): if empty → push val, min=val. If val ≥ min → push val normally. If val < min → push (2*val - min) — this encodes the old min. Update min = val.<br/>Step 3: getMin(): return min variable directly. O(1).<br/>Step 4: Pop(): if top ≥ min → normal pop (min unchanged). If top < min → we pushed an encoded value. Old min = 2*min - top. Restore min = 2*min - popped. Return current min.<br/>Step 5: Why it works: 2*val - prevMin < val when val < prevMin (the encoded value is less than current min → signals an old-min restoration).<br/>⚠️ Caveat: integer overflow risk for large values. Use long arithmetic.<br/>✅ Clever encoding in the stack value itself. O(1) extra space beyond the stack.",
    },

    /* ── Q39 ── */
    {
      q: "Interviewer: 'Design a system that can store and retrieve the k-th largest element from a stream of integers.' What are the two approaches?",
      opts: [
        "Sort after every insertion",
        "Approach 1: Min-Heap of size K. Insert: push to heap, pop if size>K. getKthLargest: heap.top(). O(log K) per insert, O(1) query. Approach 2: Augmented BST (Order Statistics Tree) — any rank in O(log N)",
        "Max-Heap of all elements",
        "Binary search on sorted array",
      ],
      ans: "Approach 1: Min-Heap of size K. Insert: push to heap, pop if size>K. getKthLargest: heap.top(). O(log K) per insert, O(1) query. Approach 2: Augmented BST (Order Statistics Tree) — any rank in O(log N)",
      cat: "LLD",
      exp: "Step 1: Min-Heap of size K: maintains the K largest elements seen so far. The top (minimum) of this heap = K-th largest overall.<br/>Step 2: Insert(val): push val to heap. If heap.size() > K → pop (remove the smallest among the top K). Heap always contains the K largest elements. O(log K).<br/>Step 3: getKthLargest(): return heap.top(). O(1).<br/>Step 4: Order Statistics Tree: augmented BST where each node stores subtree size. Supports: insert O(log N), delete O(log N), rank(x) = position of x in sorted order O(log N), select(k) = k-th smallest O(log N).<br/>Step 5: Use Min-Heap when K is fixed and you only need K-th largest. Use Order Statistics Tree when you need arbitrary rank queries (k-th smallest, rank of any element) dynamically.<br/>✅ Min-Heap(K) for K-th largest stream. OST for arbitrary rank queries.",
    },

    /* ── Q40 ── */
    {
      q: "What is the 'Longest Consecutive Sequence' problem and how do you achieve O(N) with a HashSet?",
      opts: [
        "Sort and scan: O(N log N)",
        "HashSet all elements. For each num, if (num-1) not in set → it's the start of a sequence. Expand: while (num+1) in set → count++. Track max count. O(N) total since each element processed once",
        "Binary search for each element",
        "Union-Find on consecutive elements",
      ],
      ans: "HashSet all elements. For each num, if (num-1) not in set → it's the start of a sequence. Expand: while (num+1) in set → count++. Track max count. O(N) total since each element processed once",
      cat: "DSA",
      exp: "Step 1: Insert all elements into a HashSet: O(N) time, O(N) space.<br/>Step 2: For each num in the array: check if (num-1) is in the HashSet. If YES → num is NOT the start of a sequence → skip. If NO → num IS the start of a sequence.<br/>Step 3: For sequence starters: expand upward: current = num+1, count = 1. While current in set → count++, current++.<br/>Step 4: Update globalMax = max(globalMax, count).<br/>Step 5: Why O(N)? Each element is the START of at most one sequence. Each element is visited at most twice total (once as start check, once in expansion). Total work = O(N).<br/>Example: [100, 4, 200, 1, 3, 2] → sequences: {1,2,3,4} length 4, {100} length 1, {200} length 1. Answer = 4.<br/>✅ HashSet start-detection: O(N) with elegant two-pointer-like expansion.",
    },

    /* ── Q41 ── */
    {
      q: "Design a Stock Price Tracker with: update(timestamp, price), current(), maximum(), minimum(), last(k). What data structures?",
      opts: [
        "Sorted array for everything",
        "TreeMap<timestamp, price> for time-ordered access + Max-Heap + Min-Heap for max/min + int latestTimestamp. Update: O(log N). current: O(1). max/min: O(log N) with lazy deletion",
        "Just an array of prices",
        "Only HashMap",
      ],
      ans: "TreeMap<timestamp, price> for time-ordered access + Max-Heap + Min-Heap for max/min + int latestTimestamp. Update: O(log N). current: O(1). max/min: O(log N) with lazy deletion",
      cat: "LLD",
      exp: "Step 1: TreeMap<Integer, Integer> (timestamp → price): ordered by timestamp. lastKey() = current timestamp → current(). Put O(log N).<br/>Step 2: current(): TreeMap.get(lastKey()). O(log N) or O(1) if we cache latestTimestamp separately.<br/>Step 3: maximum(): Max-Heap. But what if old max price is updated? Lazy deletion: when popping from heap, check if heap's (timestamp, price) matches TreeMap[timestamp]. If not → discard and pop next.<br/>Step 4: minimum(): Same with Min-Heap and lazy deletion.<br/>Step 5: last(k): TreeMap.descendingKeySet() → take first k entries → O(k log N).<br/>Correctness of lazy deletion: a price in the heap is 'valid' only if TreeMap[timestamp] == heap's price. Stale entries (updated timestamps) are skipped.<br/>✅ TreeMap + lazy-deletion heaps = O(log N) all operations. Clean LLD with proper data structure reasoning.",
    },

    /* ── Q42 ── */
    {
      q: "What is 'K-th Smallest Element in a Sorted Matrix'? Given N×N matrix where each row and column is sorted, find K-th smallest.",
      opts: [
        "Flatten matrix and sort: O(N² log N)",
        "Min-Heap: start with matrix[0][0]. Pop minimum, push its right and down neighbors (avoid duplicates). After K pops → answer. O(K log K). Alternative: Binary Search on value range: O(N log(max-min) × log N)",
        "Binary search on column",
        "Two pointers on first row and column",
      ],
      ans: "Min-Heap: start with matrix[0][0]. Pop minimum, push its right and down neighbors (avoid duplicates). After K pops → answer. O(K log K). Alternative: Binary Search on value range: O(N log(max-min) × log N)",
      cat: "DSA",
      exp: "Step 1: Min-Heap approach: initialize with (matrix[0][0], row=0, col=0). Pop minimum. Push right (row, col+1) and down (row+1, col) if within bounds and not already pushed. Repeat K times. O(K log K).<br/>Step 2: Visited set: use a HashSet of (row,col) to avoid pushing duplicates. Or: only push right neighbor OR down neighbor based on a specific strategy.<br/>Step 3: Binary Search approach: lo = matrix[0][0], hi = matrix[N-1][N-1]. For each mid, count elements ≤ mid: for each row, binary search the last column ≤ mid → count. If count ≥ K → hi = mid. Else lo = mid + 1.<br/>Step 4: Binary Search time: O(N log N) per iteration × O(log(max-min)) iterations = O(N log N × log(max-min)).<br/>Step 5: For small K: heap approach better. For large K close to N²: binary search better.<br/>✅ Heap approach: O(K log K). Binary search: O(N log N log(range)).",
    },

    /* ── Q43 ── */
    {
      q: "Interviewer gives you this: 'You have a list of tasks with deadlines and profits. Maximize profit by scheduling at most one task per time unit.' What is the greedy approach?",
      opts: [
        "Sort by deadline and schedule all",
        "Job Sequencing: sort by profit descending. For each job, schedule it in the latest available time slot ≤ its deadline (use Union-Find for O(N log N) slot finding). Greedy: take most profitable jobs first",
        "Sort by deadline ascending always",
        "Knapsack DP on time slots",
      ],
      ans: "Job Sequencing: sort by profit descending. For each job, schedule it in the latest available time slot ≤ its deadline (use Union-Find for O(N log N) slot finding). Greedy: take most profitable jobs first",
      cat: "DSA",
      exp: "Step 1: Sort jobs by profit in descending order (most profitable first).<br/>Step 2: For each job (in order of decreasing profit): find the latest available time slot ≤ job's deadline. If found → assign job there, mark slot used. If no slot → skip job.<br/>Step 3: Naive slot finding: scan from deadline down to 1 → O(N) per job → O(N²) total.<br/>Step 4: Union-Find optimization: parent[i] = latest available slot ≤ i. find(deadline) = latest free slot. After scheduling, union(slot, slot-1) so future finds skip to slot-1. O(N log N) amortized with path compression.<br/>Step 5: Result: selected jobs maximize profit. Each job takes exactly 1 time unit.<br/>Example: Jobs [(A,4,20),(B,1,10),(C,1,40),(D,1,30)]. Sorted by profit: C,D,A,B. C→slot1. D→no slot≤1 free. A→slot4. B→no slot. Profit=60.<br/>✅ Greedy by profit + Union-Find for slot = O(N log N) job sequencing.",
    },

    /* ── Q44 ── */
    {
      q: "You're asked to implement 'Design HashMap' from scratch (no built-in hash maps). Handle collisions, resizing, and load factor.",
      opts: [
        "Use an array of fixed size 1000",
        "Array of linked lists (chaining). hash(key) = key.hashCode() % capacity. Resize (double capacity, rehash all) when loadFactor = size/capacity > 0.75. O(1) average for put/get/remove",
        "Binary search tree per bucket",
        "Sort keys and binary search",
      ],
      ans: "Array of linked lists (chaining). hash(key) = key.hashCode() % capacity. Resize (double capacity, rehash all) when loadFactor = size/capacity > 0.75. O(1) average for put/get/remove",
      cat: "LLD",
      exp: "Step 1: Array of N buckets (linked lists). hash function: index = (key.hashCode() & 0x7FFFFFFF) % capacity.<br/>Step 2: put(key, val): index = hash(key). Walk linked list at index → if key exists → update. Else → prepend new node. Increment size. Check load factor.<br/>Step 3: get(key): index = hash(key). Walk list → find key → return value. O(1) average (short chains if load factor low).<br/>Step 4: Resize: when size/capacity > 0.75 → new capacity = 2 × old capacity. Rehash all existing entries into new array. O(N) rehash cost but O(1) amortized (doubling strategy same as dynamic array).<br/>Step 5: Hash function quality matters: Java uses (h = key.hashCode()) ^ (h >>> 16) to spread bits.<br/>Alternatives: Open addressing (linear probing, quadratic probing, double hashing) — no pointers, better cache performance.<br/>✅ Chaining + load factor + doubling = Java HashMap internals.",
    },

    /* ── Q45 ── */
    {
      q: "Advanced backtracking: 'Expression Add Operators'. Given a number string '123' and target 6, insert +, -, * to make it equal target. What is the key challenge with multiplication?",
      opts: [
        "Multiplication is not allowed",
        "Multiplication breaks left-to-right evaluation. Track 'last multiplied value' to undo and redo: when encountering *, candidate = prevVal - lastMul + lastMul * newNum. This correctly handles precedence in O(N × 4^N)",
        "Use Python eval() function",
        "Sort operators and try combinations",
      ],
      ans: "Multiplication is breaks left-to-right evaluation. Track 'last multiplied value' to undo and redo: when encountering *, candidate = prevVal - lastMul + lastMul * newNum. This correctly handles precedence in O(N × 4^N)",
      cat: "DSA",
      exp: "Step 1: DFS/backtracking: at each position, try all operators (+, -, *) or no operator (concatenate digits).<br/>Step 2: Challenge: '1+2*3' should be 7 (not 9). Operator precedence means * is applied before +.<br/>Step 3: Track: currentValue (running total), lastMultiplied (the operand of last multiplication, to undo it).<br/>Step 4: On +: new currentVal = currentVal + num. lastMul = num.<br/>On -: new currentVal = currentVal - num. lastMul = -num.<br/>On *: new currentVal = currentVal - lastMul + lastMul * num. lastMul = lastMul * num.<br/>Step 5: The * case: undo the last addition (currentVal - lastMul) then apply multiplication (+ lastMul * num). Correct because multiplication has higher precedence.<br/>Time: O(N × 4^N) — N digits, 4 choices at each position (concatenate, +, -, *).<br/>✅ Track lastMul to handle * precedence correctly. Key insight for this backtracking problem.",
    },

    /* ── Q46 ── */
    {
      q: "Visualize: What does a complete topological sort look like for this dependency graph? A→C, B→C, C→D, C→E, D→F, E→F. Which valid orderings exist?",
      opts: [
        "Only one: A,B,C,D,E,F",
        "Multiple valid orderings: [A,B,C,D,E,F], [B,A,C,D,E,F], [A,B,C,E,D,F] — A and B have no dependency on each other; D and E can be swapped",
        "No valid ordering exists (cycle)",
        "Only: D,E,A,B,C,F",
      ],
      ans: "Multiple valid orderings: [A,B,C,D,E,F], [B,A,C,D,E,F], [A,B,C,E,D,F] — A and B have no dependency on each other; D and E can be swapped",
      cat: "DSA",
      exp: "Step 1: In-degrees: A=0, B=0, C=2 (A→C, B→C), D=1 (C→D), E=1 (C→E), F=2 (D→F, E→F).<br/>Step 2: Start: in-degree 0 nodes = {A, B}. Either can go first. Choice 1: A first. Choice 2: B first.<br/>Step 3: After both A and B processed → C's in-degree = 0 → C must be next. After C: D and E both become in-degree 0 → either can go next.<br/>Step 4: After D: E still pending (if E not yet done). After E: F's in-degree = 0 → F last.<br/>Step 5: Valid orderings include: any permutation where A,B before C; C before D,E; D,E before F. Kahn's algorithm produces one valid ordering. There may be many valid ones.<br/>✅ Multiple valid topological orderings exist when independent nodes coexist at the same level.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 295 140" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Topological Sort — Dependency Graph</text>
  <defs><marker id="ta" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 Z" fill="#475569"/></marker></defs>
  <!-- Nodes -->
  <circle cx="30"  cy="70" r="16" fill="#6c63ff" opacity="0.9"/><text x="24"  y="74" fill="white">A</text>
  <circle cx="30"  cy="110" r="16" fill="#6c63ff" opacity="0.9"/><text x="24"  y="114" fill="white">B</text>
  <circle cx="100" cy="90" r="16" fill="#3b82f6" opacity="0.9"/><text x="94"  y="94" fill="white">C</text>
  <circle cx="170" cy="65" r="16" fill="#a78bfa" opacity="0.9"/><text x="164" y="69" fill="white">D</text>
  <circle cx="170" cy="115" r="16" fill="#a78bfa" opacity="0.9"/><text x="164" y="119" fill="white">E</text>
  <circle cx="245" cy="90" r="16" fill="#22c55e" opacity="0.9"/><text x="239" y="94" fill="white">F</text>
  <!-- Edges -->
  <line x1="46"  y1="74"  x2="84"  y2="86"  stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
  <line x1="46"  y1="106" x2="84"  y2="94"  stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
  <line x1="116" y1="82"  x2="154" y2="70"  stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
  <line x1="116" y1="98"  x2="154" y2="110" stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
  <line x1="186" y1="71"  x2="229" y2="84"  stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
  <line x1="186" y1="109" x2="229" y2="96"  stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
  <!-- Valid order -->
  <text x="10" y="132" fill="#fbbf24" font-size="9">Valid: A,B,C,D,E,F or B,A,C,E,D,F or ...</text>
</svg>`,
      },
    },

    /* ── Q47 ── */
    {
      q: "Design a File System (like Unix) supporting: create file/directory, find by path, list directory, delete. What is the core data structure?",
      opts: [
        "Flat list of all files",
        "N-ary Tree: each node is a Directory (name, children: Map<String, Node>) or File (name, size, content). Path traversal: split('/') and traverse. O(path_length) for all operations",
        "HashMap of absolute paths to files",
        "B-tree indexed by filename",
      ],
      ans: "N-ary Tree: each node is a Directory (name, children: Map<String, Node>) or File (name, size, content). Path traversal: split('/') and traverse. O(path_length) for all operations",
      cat: "LLD",
      exp: "Step 1: FileSystemNode (abstract): name, parent, createdAt, permissions. FileNode extends FSNode: size, content (or chunk references). DirectoryNode extends FSNode: Map<String, FileSystemNode> children.<br/>Step 2: create(path, isDir): split path by '/'. Traverse from root. At each level: look up in children map. Create missing intermediate directories if needed. Create final node.<br/>Step 3: find(path): split path. Traverse. Return node or null. O(D) where D = path depth.<br/>Step 4: list(dirPath): find directory node. Return children.keySet() or entries. O(1) after find.<br/>Step 5: delete(path): find parent directory. Remove child from parent's map. If directory: recursively delete subtree (DFS).<br/>Permissions: each node has rwxr-xr-x style bit flags per owner/group/others. Check on every access.<br/>✅ N-ary tree with HashMap children = O(path_length) all operations. Foundation of Unix inode design.",
    },

    /* ── Q48 ── */
    {
      q: "What is the 'Dutch National Flag' problem and how does it extend to sort an array with K distinct values?",
      opts: [
        "BFS on colored nodes",
        "3-way partition (Dijkstra): three pointers lo, mid, hi. Elements < pivot → swap to lo. Elements > pivot → swap to hi. Elements = pivot → skip mid. O(N) one-pass. For K values: apply K-1 partitions",
        "QuickSort always handles it",
        "Counting sort only",
      ],
      ans: "3-way partition (Dijkstra): three pointers lo, mid, hi. Elements < pivot → swap to lo. Elements > pivot → swap to hi. Elements = pivot → skip mid. O(N) one-pass. For K values: apply K-1 partitions",
      cat: "DSA",
      exp: "Step 1: Dutch National Flag: array has only 0s, 1s, 2s. Sort in-place O(N) time O(1) space.<br/>Step 2: lo=0, mid=0, hi=N-1. Invariant: [0..lo-1]=0s, [lo..mid-1]=1s, [hi+1..N-1]=2s, [mid..hi]=unknown.<br/>Step 3: arr[mid]==0 → swap(mid,lo), lo++, mid++. arr[mid]==1 → mid++. arr[mid]==2 → swap(mid,hi), hi-- (don't increment mid — new element at mid is unknown).<br/>Step 4: LeetCode 'Sort Colors' is this exact problem.<br/>Step 5: For K distinct values: counting sort O(N+K) is simpler. Alternatively K-1 passes of Dutch Flag with increasing pivots. Or use a stable radix sort.<br/>Application: QuickSort's 3-way partition handles many duplicates efficiently — degrades to O(N log N) vs O(N²) without it for arrays with many equal elements.<br/>✅ Dutch Flag: O(N) time O(1) space for 3-value sort. Key QuickSort optimization for duplicates.",
    },

    /* ── Q49 ── */
    {
      q: "Solve: Given N meetings with (start, end) times, find the minimum number of conference rooms required. What is the sweepline approach?",
      opts: [
        "Sort by duration and assign greedily",
        "Sort all start and end events together. Sweep through: on start event → rooms needed++. On end event → rooms needed--. Track max rooms needed at any point. O(N log N)",
        "DP on time slots",
        "Graph coloring on interval overlap graph",
      ],
      ans: "Sort all start and end events together. Sweep through: on start event → rooms needed++. On end event → rooms needed--. Track max rooms needed at any point. O(N log N)",
      cat: "DSA",
      exp: "Step 1: Extract all start times and end times. Merge into a single event list: (time, type) where type = +1 for start, -1 for end.<br/>Step 2: Sort events by time. Tiebreak: end events before start events at the same time (a meeting ending frees a room before new meeting starts).<br/>Step 3: Sweep: maintain count = 0. For each event: count += event.type. Track maxCount = max(maxCount, count).<br/>Step 4: maxCount = minimum conference rooms needed.<br/>Step 5: Alternative (Min-Heap): sort meetings by start time. Min-Heap stores end times of ongoing meetings. For each meeting: if heap.top() ≤ current.start → pop (room freed). Push current.end. Heap size = rooms in use. Max heap size = answer. Same O(N log N).<br/>✅ Sweepline or Min-Heap: O(N log N). Min-Heap also tells you WHICH room each meeting uses.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <text x="10" y="14" fill="#94a3b8" font-size="10">Meeting Rooms — Sweep Line</text>
  <!-- Timeline axis -->
  <line x1="20" y1="110" x2="280" y2="110" stroke="#475569" stroke-width="1.5"/>
  <!-- Time marks -->
  <text x="18" y="125" fill="#94a3b8" font-size="8">0</text>
  <text x="58" y="125" fill="#94a3b8" font-size="8">2</text>
  <text x="98" y="125" fill="#94a3b8" font-size="8">4</text>
  <text x="138" y="125" fill="#94a3b8" font-size="8">6</text>
  <text x="178" y="125" fill="#94a3b8" font-size="8">8</text>
  <text x="218" y="125" fill="#94a3b8" font-size="8">10</text>
  <!-- Meeting bars -->
  <rect x="20"  y="30" width="120" height="16" rx="2" fill="#6c63ff" opacity="0.85"/>
  <text x="25"  y="42" fill="white" font-size="8">Meeting A [0,6]</text>
  <rect x="60"  y="52" width="100" height="16" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="65"  y="64" fill="white" font-size="8">Meeting B [2,7]</text>
  <rect x="140" y="74" width="80" height="16" rx="2" fill="#22c55e" opacity="0.85"/>
  <text x="145" y="86" fill="white" font-size="8">Meeting C [6,10]</text>
  <!-- Overlap indicator -->
  <rect x="60" y="28" width="80" height="42" fill="#ef4444" opacity="0.1" rx="2"/>
  <text x="62" y="24" fill="#ef4444" font-size="8">←overlap→ 2 rooms needed</text>
  <text x="10" y="134" fill="#fbbf24" font-size="9">Max concurrent meetings = 2 → 2 rooms required</text>
</svg>`,
      },
    },

    /* ── Q50 ── */
    {
      q: "Final boss: You are designing a distributed rate limiter (multiple API gateway servers, shared state). How do you prevent race conditions with Redis?",
      opts: [
        "Each server has its own rate limiter",
        "Use Redis atomic operations: INCR + EXPIRE in a Lua script (atomic on Redis). Or Redis SETNX for sliding window. Lua scripts execute atomically in Redis — no race conditions across gateway servers",
        "Database-level locking",
        "Rate limiting is impossible across servers",
      ],
      ans: "Use Redis atomic operations: INCR + EXPIRE in a Lua script (atomic on Redis). Or Redis SETNX for sliding window. Lua scripts execute atomically in Redis — no race conditions across gateway servers",
      cat: "LLD",
      exp: "Step 1: Problem: two gateway servers both read count=99 for a user at the same time → both allow the 100th request → count goes to 101. Race condition.<br/>Step 2: Redis Lua script: Redis is single-threaded. Lua scripts execute atomically. No other command runs between script steps → no race condition.<br/>Step 3: Lua fixed window: local count = redis.call('INCR', key). if count == 1 then redis.call('EXPIRE', key, windowSeconds) end. if count > limit then return 0 else return 1 end.<br/>Step 4: Sliding window with sorted set: ZADD user:{id}:requests currentTime currentTime. ZREMRANGEBYSCORE below (now - window). ZCARD = request count. ZADD + EXPIRE all in one Lua script.<br/>Step 5: Redis Cluster: shard by user_id consistently → same user always hits same Redis shard → no cross-shard race. With cluster mode, Lua scripts must operate on same key slot → use hash tags {user_id}.<br/>✅ Lua scripts on Redis = atomic multi-step operations → distributed rate limiting without race conditions.",
    },

    /* ── Q51 ── */
    {
      q: "Advanced LLD: Design an ATM machine. What states, classes, and transactions do you model?",
      opts: [
        "One ATM class with switch-case",
        "States: IDLE, CARD_INSERTED, PIN_ENTERED, SELECTING_TRANSACTION, DISPENSING. Classes: ATM, Card, BankAccount, Transaction, CashDispenser, CardReader, ReceiptPrinter. State pattern + Template Method for transaction flow",
        "Just a UI with buttons",
        "Singleton ATM only",
      ],
      ans: "States: IDLE, CARD_INSERTED, PIN_ENTERED, SELECTING_TRANSACTION, DISPENSING. Classes: ATM, Card, BankAccount, Transaction, CashDispenser, CardReader, ReceiptPrinter. State pattern + Template Method for transaction flow",
      cat: "LLD",
      exp: "Step 1: State machine: IDLE → (insert card) → CARD_INSERTED → (enter PIN) → PIN_ENTERED → (select) → SELECTING_TRANSACTION → (process) → DISPENSING → IDLE.<br/>Step 2: Classes: Card (cardNumber, expiryDate), ATM (state, cashAmount, cardReader, display, dispenser, printer), BankAccount (accountId, balance, transactionHistory), CashDispenser (denominations Map, dispense(amount) → boolean).<br/>Step 3: Transaction (abstract): Withdrawal, Deposit, BalanceInquiry, Transfer. Template Method: Transaction.execute() = validate() + process() + updateRecord() + printReceipt().<br/>Step 4: CashDispenser: greedy denomination selection (100s, 50s, 20s, 10s). If exact change not possible → decline transaction.<br/>Step 5: Security: PIN is never stored plaintext. Card is retained after 3 wrong PINs. Session timeout after inactivity → return to IDLE.<br/>✅ State pattern for flow + Template Method for transactions + denominations = complete ATM LLD.",
    },

    /* ── Q52 ── */
    {
      q: "Given a string, find the longest substring with at most K distinct characters. What is the optimal approach?",
      opts: [
        "O(N²) all substrings",
        "Sliding window: two pointers + HashMap<char, count>. Expand right. When distinct chars > K: shrink left until ≤ K distinct chars. Track max window length. O(N)",
        "Sort characters and scan",
        "DP on all prefixes",
      ],
      ans: "Sliding window: two pointers + HashMap<char, count>. Expand right. When distinct chars > K: shrink left until ≤ K distinct chars. Track max window length. O(N)",
      cat: "DSA",
      exp: "Step 1: Maintain a sliding window [left, right] and a HashMap of character frequencies within the window.<br/>Step 2: Expand right: add s[right] to map. map[s[right]]++. Increment distinct count if frequency went from 0 to 1.<br/>Step 3: Shrink left: while distinct > K: decrement map[s[left]]. If frequency → 0: decrement distinct, remove from map. left++.<br/>Step 4: At each step, update maxLen = max(maxLen, right - left + 1).<br/>Step 5: O(N) — each character added and removed from window at most once. O(K) space for the hashmap (at most K+1 distinct chars at any time).<br/>Variant: exactly K distinct characters = atMostK(K) - atMostK(K-1).<br/>✅ Sliding window for K-distinct is the textbook technique. Know all sliding window variants.",
    },

    /* ── Q53 ── */
    {
      q: "What is 'Matrix Exponentiation' and how can it compute Fibonacci(N) in O(log N)?",
      opts: [
        "Divide array by N",
        "Represent Fib recurrence as 2×2 matrix: [[1,1],[1,0]]^N gives Fib(N+1) at [0][0]. Use fast matrix exponentiation (repeated squaring): O(log N) matrix multiplications × O(1) each = O(log N)",
        "Memoization tree",
        "Binary search on Fibonacci values",
      ],
      ans: "Represent Fib recurrence as 2×2 matrix: [[1,1],[1,0]]^N gives Fib(N+1) at [0][0]. Use fast matrix exponentiation (repeated squaring): O(log N) matrix multiplications × O(1) each = O(log N)",
      cat: "DSA",
      exp: "Step 1: Observation: [[1,1],[1,0]] × [[F(n)],[F(n-1)]] = [[F(n+1)],[F(n)]]. The transformation matrix M = [[1,1],[1,0]] encodes the Fibonacci recurrence.<br/>Step 2: M^N × [[F(1)],[F(0)]] = [[F(N+1)],[F(N)]]. So M^N[0][0] = F(N+1), M^N[0][1] = F(N).<br/>Step 3: Fast matrix exponentiation (repeated squaring): compute M^N by squaring. If N is even: M^N = (M^(N/2))^2. If odd: M^N = M × M^(N-1). O(log N) multiplications.<br/>Step 4: Each 2×2 matrix multiplication: O(2³) = O(8) = O(1). Total: O(8 × log N) = O(log N).<br/>Step 5: Generalization: ANY linear recurrence with constant coefficients can be expressed as matrix exponentiation. E.g., tribonacci uses 3×3 matrix. O(K³ log N) for K-term recurrences.<br/>✅ Matrix exponentiation: O(log N) for Fibonacci. Generalizes to any linear recurrence.",
    },

    /* ── Q54 ── */
    {
      q: "You're designing a Ride-Sharing LLD (like Uber). What are the key classes and how do you match drivers to riders?",
      opts: [
        "Rider class and Driver class only",
        "Rider, Driver, Trip, Location, RideRequest, PricingEngine (strategy), MatchingService (nearest driver via geospatial index), TripState (REQUESTED/DRIVER_ASSIGNED/IN_PROGRESS/COMPLETED)",
        "Database with coordinates",
        "Single DispatchSystem class",
      ],
      ans: "Rider, Driver, Trip, Location, RideRequest, PricingEngine (strategy), MatchingService (nearest driver via geospatial index), TripState (REQUESTED/DRIVER_ASSIGNED/IN_PROGRESS/COMPLETED)",
      cat: "LLD",
      exp: "Step 1: Core entities: Rider (id, rating, paymentMethod), Driver (id, vehicleType, rating, currentLocation, status: AVAILABLE/ON_TRIP), Location (lat, lng), RideRequest (rider, pickupLocation, dropoffLocation, requestedVehicleType).<br/>Step 2: Trip: tripId, rider, driver, state (enum TripState), startTime, endTime, fare, route List<Location>.<br/>Step 3: MatchingService: given RideRequest → find nearest available drivers of requested type. Geospatial index (QuadTree or R-Tree in production, or Uber's geohash ring) → top K nearest → score by distance + rating → assign best match.<br/>Step 4: PricingEngine (Strategy): BaseFare + perKm + perMin + surgeMultiplier. Surge pricing: if demand/supply ratio > threshold → surge. Different strategies for different cities.<br/>Step 5: Observer pattern: Trip state changes → notify Rider + Driver via push notifications. ETA calculation: shortest path (Dijkstra on road graph).<br/>✅ Geospatial matching + Strategy pricing + State machine trips + Observer notifications = Uber LLD.",
    },

    /* ── Q55 ── */
    {
      q: "What is the 'Alien Dictionary' problem and how do you solve it using graph algorithms?",
      opts: [
        "Translate English to alien language",
        "Build a DAG from character ordering constraints derived from adjacent word pairs. Topological sort gives the alien alphabet order. If cycle → invalid. O(C) where C = total characters in all words",
        "Sort words alphabetically",
        "BFS on character frequency",
      ],
      ans: "Build a DAG from character ordering constraints derived from adjacent word pairs. Topological sort gives the alien alphabet order. If cycle → invalid. O(C) where C = total characters in all words",
      cat: "DSA",
      exp: "Step 1: Compare adjacent words in the given sorted dictionary. Find the first differing character between word[i] and word[i+1] → this gives a directed edge: word[i][j] → word[i+1][j] (comes before).<br/>Step 2: Edge case: if word[i] is a prefix of word[i+1] but longer → invalid ordering (e.g., ['abc', 'ab'] in sorted order → return '').<br/>Step 3: Build DAG: nodes = all unique characters. Edges = ordering constraints derived above.<br/>Step 4: Topological sort (Kahn's): if all characters processed → valid ordering. If not all processed (cycle exists) → return '' (invalid).<br/>Step 5: Time: O(C) to process all characters + O(U + E) for topo sort where U = unique chars, E = constraints. Overall O(C).<br/>✅ Alien dictionary = implicit graph + topo sort. Classic graph problem in disguise.",
    },

    /* ── Q56 ── */
    {
      q: "Implement 'Serialize and Deserialize N-ary Tree'. How does the encoding differ from binary tree serialization?",
      opts: [
        "Same as binary tree — just two children",
        "Encode child count per node: pre-order DFS, output 'value childCount' per node. Deserialize: read value, read childCount, recursively build childCount children. No need for null markers",
        "Level-order only works",
        "Store as adjacency list",
      ],
      ans: "Encode child count per node: pre-order DFS, output 'value childCount' per node. Deserialize: read value, read childCount, recursively build childCount children. No need for null markers",
      cat: "LLD",
      exp: "Step 1: Binary tree serialization uses null markers because we need to know if left or right child exists. N-ary tree: variable children count → need to encode count instead.<br/>Step 2: Serialize: pre-order DFS. For each node: output node.val + ',' + children.size() + ','. Then recursively serialize each child.<br/>Step 3: Example: root=1 with children [3,2,4], 3 has children [5,6]. Serialized: '1,3,3,2,5,0,6,0,2,0,4,0'.<br/>Step 4: Deserialize: use a queue/iterator of tokens. Read value → create node. Read childCount. For i in 0..childCount-1 → recursively deserialize one child → add to node.children.<br/>Step 5: O(N) time and space. No null markers needed — child count tells exactly how many children to read. Elegant and compact.<br/>Alternative: use parentheses notation '1(3(5)(6))(2)(4)' for human-readable but harder to parse.<br/>✅ Encode child count per node = cleaner than null markers for N-ary trees.",
    },

    /* ── Q57 ── */
    {
      q: "Given a directed graph, detect all nodes that are part of a cycle. How does this differ from just detecting if a cycle exists?",
      opts: [
        "Same algorithm — DFS with visited set",
        "DFS with three states (WHITE/GRAY/BLACK). After DFS: any node still GRAY → in cycle. Additionally: nodes that only reach cycle nodes can be identified via reverse DFS from cycle nodes",
        "BFS and count back edges",
        "Topo sort and check remaining nodes",
      ],
      ans: "DFS with three states (WHITE/GRAY/BLACK). After DFS: any node still GRAY → in cycle. Additionally: nodes that only reach cycle nodes can be identified via reverse DFS from cycle nodes",
      cat: "DSA",
      exp: "Step 1: Three-color DFS: WHITE (unvisited), GRAY (in current DFS path), BLACK (fully explored).<br/>Step 2: During DFS: if we reach a GRAY node → back edge → cycle. The cycle consists of all nodes on the path from that GRAY node to the current node.<br/>Step 3: To find ALL cycle nodes: Tarjan's SCC algorithm identifies SCCs. An SCC with more than one node OR an SCC with a self-loop contains a cycle. Nodes in such SCCs are cycle nodes.<br/>Step 4: Kahn's approach: run topo sort. Nodes NOT processed (in-degree never reached 0) are part of cycles or can only reach cycle nodes.<br/>Step 5: 'Find all nodes from which we can NOT reach the end': process in reverse → nodes that can reach cycle nodes without escaping = 'unsafe' nodes. LeetCode 'Safe and Unsafe Nodes in a Graph'.<br/>✅ Tarjan's SCC identifies all cycle nodes. Kahn's topo sort identifies nodes stuck in cycles.",
    },

    /* ── Q58 ── */
    {
      q: "Advanced Bit Trick: You have an array where one number appears an ODD number of times and all others appear exactly 3 times. Find the odd-occurrence number.",
      opts: [
        "XOR all elements (works for 2 occurrences, not 3)",
        "Bit counting: for each bit position, count how many numbers have that bit set. count % 3 gives the bit of the answer (since 3 appearances cancel out). O(32 × N) = O(N)",
        "Sort and scan for groups of 3",
        "HashMap of frequencies",
      ],
      ans: "Bit counting: for each bit position, count how many numbers have that bit set. count % 3 gives the bit of the answer (since 3 appearances cancel out). O(32 × N) = O(N)",
      cat: "DSA",
      exp: "Step 1: XOR trick works for 'appears twice' because a XOR a = 0. For 'appears 3 times': a XOR a XOR a = a (not 0). XOR doesn't cancel groups of 3.<br/>Step 2: Bit counting: for each bit position b (0 to 31): count how many numbers in array have bit b set. If count % 3 == 1 → the unique number has bit b set. If count % 3 == 0 → it doesn't.<br/>Step 3: Reconstruct answer: set the appropriate bits. O(32 × N) = O(N).<br/>Step 4: State machine approach (advanced): maintain two variables (ones, twos) representing bits seen 1 mod 3 times and 2 mod 3 times. Update with each element. After all elements: ones = answer. O(N) time O(1) space.<br/>Step 5: ones = (ones ^ x) & ~twos. twos = (twos ^ x) & ~ones. This is the bit circuit that counts mod 3 for each bit simultaneously.<br/>✅ Bit counting mod K handles 'all appear K times except one'. State machine for O(1) space.",
    },

    /* ── Q59 ── */
    {
      q: "Design an online Code Judge (like LeetCode). How do you safely execute untrusted user code?",
      opts: [
        "Run user code directly on the server",
        "Sandboxed execution: Docker container per submission with resource limits (CPU time, memory, network disabled). Queue submissions via message queue. Judge compares output with expected. Sandbox prevents escape, resource abuse",
        "Virtual machine for each run",
        "Store code and run manually",
      ],
      ans: "Sandboxed execution: Docker container per submission with resource limits (CPU time, memory, network disabled). Queue submissions via message queue. Judge compares output with expected. Sandbox prevents escape, resource abuse",
      cat: "LLD",
      exp: "Step 1: Classes: Submission (userId, problemId, code, language, status, submittedAt), Problem (id, title, testCases, timeLimit, memoryLimit), TestCase (input, expectedOutput), ExecutionResult (status: AC/WA/TLE/MLE/RE, stdout, stderr, time, memory).<br/>Step 2: Execution flow: Submission → Kafka queue → Judge worker dequeues → spins up Docker container → runs code → captures output → compares with expected output → updates status.<br/>Step 3: Security: Docker container with: no network access, limited CPU (ulimit), memory limit (cgroups), read-only filesystem (except /tmp), non-root user, seccomp profile (blocks dangerous syscalls like fork bomb, network).<br/>Step 4: Resource limits: CPU time limit (SIGXCPU), wall time limit (watchdog timer kills container), memory limit → SIGKILL on exceed.<br/>Step 5: Languages: compile in container (C++/Java) then execute. Interpreted (Python) run directly. Pre-compiled stubs injected around user code.<br/>✅ Docker + resource limits + network isolation = safe untrusted code execution.",
    },

    /* ── Q60 ── */
    {
      q: "Ultimate LLD interview question: Design WhatsApp end-to-end encryption. How does the Signal Protocol work at a conceptual level?",
      opts: [
        "Encrypt with server's public key",
        "Double Ratchet Algorithm: initial key exchange via X3DH (Extended Triple Diffie-Hellman). Session keys ratchet forward with each message (KDF chain). Compromise of one key doesn't compromise past or future messages (forward secrecy + break-in recovery)",
        "AES with shared password",
        "RSA public key per message",
      ],
      ans: "Double Ratchet Algorithm: initial key exchange via X3DH (Extended Triple Diffie-Hellman). Session keys ratchet forward with each message (KDF chain). Compromise of one key doesn't compromise past or future messages (forward secrecy + break-in recovery)",
      cat: "LLD",
      exp: "Step 1: Key exchange: X3DH (Extended Triple Diffie-Hellman). Each user has long-term, medium-term, and one-time prekeys. Sender and receiver compute a shared secret without transmitting it — Diffie-Hellman magic.<br/>Step 2: Double Ratchet: two ratchets combined. DH Ratchet: advance session root key with each new message exchange round. Symmetric-key Ratchet (KDF chain): advance message key within a round using a key derivation function.<br/>Step 3: Forward secrecy: each message encrypted with a different key derived from the chain. Old keys deleted → past messages not decryptable if current key compromised.<br/>Step 4: Break-in recovery: after compromise, the DH ratchet step generates new keys unpredictable to the attacker → future messages are secure again.<br/>Step 5: From LLD perspective: EncryptedMessage (ciphertext, messageKey, headerKey, messageCounter), Session (rootKey, sendChain, receiveChain), KeyPair (publicKey, privateKey). Protocol state machine for ratchet advancement.<br/>✅ Double Ratchet = forward secrecy + break-in recovery. Foundation of WhatsApp, Signal, Google Messages E2E encryption.",
    },
  ],
};
