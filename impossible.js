
const IMPOSSIBLE_QUESTIONS = {
  tier1: [
    {
      q: "You have a directed graph with N nodes and weighted edges. You want the shortest path from S to T that visits at least K specific 'checkpoint' nodes (in any order). Which algorithm combination solves this optimally?",
      opts: [
        "Dijkstra alone on original graph",
        "Bitmask DP + Dijkstra on state (node, visited_mask)",
        "Bellman-Ford + DFS",
        "BFS with priority queue",
      ],
      ans: "Bitmask DP + Dijkstra on state (node, visited_mask)",
      cat: "Graph + DP",
      exp: "Step 1: Standard Dijkstra only finds shortest path ignoring checkpoint constraints.<br/>Step 2: We encode which checkpoints have been visited as a bitmask — state = (current_node, bitmask_of_visited_checkpoints).<br/>Step 3: Run Dijkstra on this expanded state space: dist[node][mask] = minimum cost to reach 'node' having visited checkpoints encoded in 'mask'.<br/>Step 4: Answer is min dist[T][full_mask] over all paths.<br/>Step 5: Complexity = O(N · 2^K · log(N · 2^K)) — feasible for K ≤ 20.<br/>✅ Key insight: Bitmask DP + Dijkstra handles 'visit-specific-nodes' constraint elegantly.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="340" height="160" fill="transparent"/>
  <text x="170" y="14" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">State Space: (node, visited_mask)</text>
  <!-- Nodes -->
  <circle cx="40" cy="80" r="18" fill="#6c63ff" opacity="0.85"/><text x="40" y="85" text-anchor="middle" fill="white" font-weight="bold">S</text>
  <circle cx="120" cy="45" r="18" fill="#f59e0b" opacity="0.85"/><text x="120" y="50" text-anchor="middle" fill="white" font-weight="bold">C1</text>
  <circle cx="120" cy="115" r="18" fill="#f59e0b" opacity="0.85"/><text x="120" y="120" text-anchor="middle" fill="white" font-weight="bold">C2</text>
  <circle cx="220" cy="80" r="18" fill="#22c55e" opacity="0.85"/><text x="220" y="85" text-anchor="middle" fill="white" font-weight="bold">C3</text>
  <circle cx="300" cy="80" r="18" fill="#ef4444" opacity="0.85"/><text x="300" y="85" text-anchor="middle" fill="white" font-weight="bold">T</text>
  <!-- Edges -->
  <line x1="58" y1="70" x2="102" y2="52" stroke="#6c63ff" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="58" y1="90" x2="102" y2="108" stroke="#6c63ff" stroke-width="1.5"/>
  <line x1="138" y1="52" x2="202" y2="74" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="138" y1="108" x2="202" y2="86" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="238" y1="80" x2="282" y2="80" stroke="#22c55e" stroke-width="1.5"/>
  <!-- Mask labels -->
  <text x="170" y="135" text-anchor="middle" fill="#6c63ff" font-size="10">mask=000 → 001 → 011 → 111</text>
  <text x="170" y="150" text-anchor="middle" fill="#64748b" font-size="9">State expands per checkpoint visited</text>
  <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6c63ff"/></marker></defs>
</svg>`,
      },
    },

    {
      q: "In an online algorithm problem, you receive integers one by one in a stream. At any point you must return the median in O(log n). Which data structure combination achieves this?",
      opts: [
        "Single sorted array with binary search",
        "Two heaps: max-heap for lower half, min-heap for upper half",
        "Segment tree with lazy propagation",
        "Balanced BST with rank queries",
      ],
      ans: "Two heaps: max-heap for lower half, min-heap for upper half",
      cat: "Online Algorithm",
      exp: "Step 1: A sorted array requires O(n) insertion — too slow.<br/>Step 2: Maintain two heaps: Max-Heap (left) stores the lower half of numbers, Min-Heap (right) stores the upper half.<br/>Step 3: On each insert: push to max-heap, then rebalance so sizes differ by at most 1.<br/>Step 4: Median = top of max-heap (odd count) or average of both tops (even count).<br/>Step 5: Each insertion is O(log n), median query is O(1).<br/>✅ Classic online streaming median — two heaps is the canonical solution.",
    },

    {
      q: "You're given a graph where edges can be added or deleted dynamically. After each update, you need to know if the graph is still connected. What is the optimal approach?",
      opts: [
        "Re-run BFS/DFS after every update — O(V+E) per query",
        "Union-Find (DSU) for additions only; full recompute on deletions",
        "Link-Cut Trees (Euler Tour Trees) supporting O(log N) link/cut/connectivity",
        "Offline processing with divide-and-conquer on time axis",
      ],
      ans: "Link-Cut Trees (Euler Tour Trees) supporting O(log N) link/cut/connectivity",
      cat: "Dynamic Graph",
      exp: "Step 1: BFS/DFS after every update is O(V+E) per query — unacceptable for large graphs with frequent updates.<br/>Step 2: Union-Find handles additions in near O(1) amortized but cannot handle deletions efficiently.<br/>Step 3: Link-Cut Trees (a type of splay tree) represent the spanning forest and support link (add edge) and cut (remove edge) operations in O(log N) amortized.<br/>Step 4: Connectivity queries are also O(log N).<br/>Step 5: For offline dynamic connectivity (deletions + additions), divide-and-conquer on the time axis with a segment tree + DSU with rollback achieves O((Q+E) log² N).<br/>✅ Online: Link-Cut Trees. Offline: D&C + DSU with rollback.",
    },

    {
      q: "An adversary feeds inputs to your quicksort implementation to make it O(n²). Which pivot strategy defeats adversarial inputs while keeping average O(n log n)?",
      opts: [
        "Always pick first element as pivot",
        "Always pick middle element as pivot",
        "Introsort: quicksort + switch to heapsort when recursion depth exceeds 2·log n",
        "Merge sort always — it's deterministic O(n log n)",
      ],
      ans: "Introsort: quicksort + switch to heapsort when recursion depth exceeds 2·log n",
      cat: "Adversarial Input",
      exp: "Step 1: Picking first/last/middle element as pivot is exploitable — adversary can craft worst-case inputs (e.g., sorted arrays for first-element pivot).<br/>Step 2: Randomized pivot makes adversarial attacks statistically useless but doesn't guarantee O(n log n) worst case.<br/>Step 3: Introsort combines quicksort (fast in practice) with a fallback to heapsort (guaranteed O(n log n)) when recursion depth exceeds 2·log₂(n).<br/>Step 4: This gives O(n log n) worst-case with near-quicksort practical performance.<br/>Step 5: Used in C++ std::sort and Java's Arrays.sort for primitives.<br/>✅ Introsort = best of both worlds against adversarial inputs.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="120" fill="transparent"/>
  <text x="170" y="14" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">Introsort Decision Tree</text>
  <rect x="110" y="22" width="120" height="28" rx="5" fill="#6c63ff" opacity="0.8"/>
  <text x="170" y="40" text-anchor="middle" fill="white">Start Quicksort</text>
  <!-- Decision diamond -->
  <polygon points="170,60 220,80 170,100 120,80" fill="#f59e0b" opacity="0.85"/>
  <text x="170" y="77" text-anchor="middle" fill="white" font-size="9">depth > 2·log n?</text>
  <!-- No branch -->
  <line x1="120" y1="80" x2="60" y2="80" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="10" y="67" width="50" height="26" rx="4" fill="#22c55e" opacity="0.8"/>
  <text x="35" y="83" text-anchor="middle" fill="white" font-size="9">Quicksort</text>
  <text x="90" y="76" fill="#22c55e" font-size="9">NO</text>
  <!-- Yes branch -->
  <line x1="220" y1="80" x2="280" y2="80" stroke="#ef4444" stroke-width="1.5"/>
  <rect x="280" y="67" width="55" height="26" rx="4" fill="#ef4444" opacity="0.8"/>
  <text x="307" y="83" text-anchor="middle" fill="white" font-size="9">Heapsort</text>
  <text x="234" y="76" fill="#ef4444" font-size="9">YES</text>
  <line x1="170" y1="50" x2="170" y2="60" stroke="#6c63ff" stroke-width="1.5"/>
  <text x="170" y="115" text-anchor="middle" fill="#64748b" font-size="9">Worst-case O(n log n) guaranteed</text>
</svg>`,
      },
    },

    {
      q: "You need to find the maximum XOR of any subarray of an array, and the array can receive point updates. What is the optimal approach?",
      opts: [
        "Brute force all subarrays after each update — O(n²)",
        "Segment tree on prefix XOR array + Trie for max XOR query",
        "Sparse table for static range XOR, rebuild on update",
        "Greedy bit-by-bit selection on sorted array",
      ],
      ans: "Segment tree on prefix XOR array + Trie for max XOR query",
      cat: "Graph + DP",
      exp: "Step 1: XOR of subarray [l,r] = prefix_xor[r] XOR prefix_xor[l-1].<br/>Step 2: Maximum XOR of any subarray = maximum XOR of any two prefix_xor values.<br/>Step 3: A Trie (binary trie) finds maximum XOR pair in O(32) = O(1) per query after O(n·32) build.<br/>Step 4: For point updates: update prefix_xor values using a segment tree (since prefix_xor[i] = a[1] XOR ... XOR a[i]).<br/>Step 5: After each update, rebuild relevant trie nodes — or use a persistent trie for O(log n · 32) per update/query.<br/>✅ Key combo: prefix XOR + trie for static; segment tree + trie for dynamic updates.",
    },

    {
      q: "In a real-time streaming system, you must detect anomalies (values more than 3σ from mean) as data arrives. You have limited memory and cannot store all data. What is the best approach?",
      opts: [
        "Store all data in RAM, recompute mean and σ each time",
        "Welford's online algorithm to maintain running mean and variance in O(1) memory",
        "Reservoir sampling then compute statistics on the sample",
        "Exponential moving average with fixed window",
      ],
      ans: "Welford's online algorithm to maintain running mean and variance in O(1) memory",
      cat: "Online Algorithm",
      exp: "Step 1: Storing all data is impossible with limited memory on infinite streams.<br/>Step 2: Welford's algorithm maintains count n, running mean M, and running sum of squared deviations S in O(1) memory.<br/>Step 3: On each new value x: n++; delta = x - M; M += delta/n; delta2 = x - M; S += delta * delta2.<br/>Step 4: Variance = S/(n-1), standard deviation = √(S/(n-1)).<br/>Step 5: This is numerically stable (unlike naive sum-of-squares method) and requires only 3 variables regardless of stream length.<br/>✅ Welford's = gold standard for online mean/variance in data streams.",
    },

    {
      q: "Multi-agent pathfinding: 10 robots on a grid must each reach their goal without collision. Which framework finds optimal (min makespan) solutions?",
      opts: [
        "Run A* independently for each robot",
        "Conflict-Based Search (CBS) — search over conflicts and resolve them",
        "Greedy assignment: move robots one at a time by priority",
        "Simulate annealing on random path permutations",
      ],
      ans: "Conflict-Based Search (CBS) — search over conflicts and resolve them",
      cat: "Graph + DP",
      exp: "Step 1: Independent A* for each robot ignores collisions — robots will intersect.<br/>Step 2: CBS operates on two levels: Low level finds optimal path per agent given constraints; High level detects conflicts (two agents same place same time) and adds constraints to resolve them.<br/>Step 3: CBS is optimal and complete — it will find the solution with minimum makespan (time for all agents to reach goals).<br/>Step 4: For large agent counts, Enhanced CBS (ECBS) trades optimality for speed using suboptimality bound ω.<br/>Step 5: Practical for ~100 robots; beyond that, decentralized or approximation methods needed.<br/>✅ CBS is the state-of-the-art optimal MAPF solver.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 145" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="145" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">Conflict-Based Search (CBS)</text>
  <!-- Grid -->
  <g transform="translate(15,22)">
    <rect width="120" height="110" fill="none" stroke="#64748b" stroke-width="0.5"/>
    <!-- Grid lines -->
    <line x1="24" y1="0" x2="24" y2="110" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <line x1="48" y1="0" x2="48" y2="110" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <line x1="72" y1="0" x2="72" y2="110" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <line x1="96" y1="0" x2="96" y2="110" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <line x1="0" y1="22" x2="120" y2="22" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <line x1="0" y1="44" x2="120" y2="44" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <line x1="0" y1="66" x2="120" y2="66" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <line x1="0" y1="88" x2="120" y2="88" stroke="#64748b" stroke-width="0.3" stroke-dasharray="2"/>
    <!-- Robot A path -->
    <polyline points="12,99 12,77 36,77 36,55 60,55 84,55" fill="none" stroke="#6c63ff" stroke-width="2" stroke-dasharray="4,2"/>
    <!-- Robot B path -->
    <polyline points="108,11 84,11 60,11 60,33 60,55 60,77" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2"/>
    <!-- Conflict marker -->
    <circle cx="60" cy="55" r="9" fill="#f59e0b" opacity="0.6"/>
    <text x="60" y="59" text-anchor="middle" fill="white" font-weight="bold" font-size="12">!</text>
    <!-- Robot A start -->
    <circle cx="12" cy="99" r="8" fill="#6c63ff"/>
    <text x="12" y="103" text-anchor="middle" fill="white" font-size="8">A</text>
    <!-- Robot B start -->
    <circle cx="108" cy="11" r="8" fill="#ef4444"/>
    <text x="108" y="15" text-anchor="middle" fill="white" font-size="8">B</text>
  </g>
  <!-- CBS tree -->
  <g transform="translate(155,28)">
    <text x="80" y="0" text-anchor="middle" fill="currentColor" font-size="9" font-weight="bold">Constraint Tree</text>
    <rect x="55" y="8" width="50" height="20" rx="3" fill="#64748b" opacity="0.7"/>
    <text x="80" y="22" text-anchor="middle" fill="white" font-size="8">Root (no c.)</text>
    <line x1="80" y1="28" x2="45" y2="50" stroke="#64748b" stroke-width="1"/>
    <line x1="80" y1="28" x2="115" y2="50" stroke="#64748b" stroke-width="1"/>
    <rect x="10" y="50" width="70" height="20" rx="3" fill="#6c63ff" opacity="0.8"/>
    <text x="45" y="64" text-anchor="middle" fill="white" font-size="8">A avoids (3,3,t)</text>
    <rect x="85" y="50" width="70" height="20" rx="3" fill="#ef4444" opacity="0.8"/>
    <text x="120" y="64" text-anchor="middle" fill="white" font-size="8">B avoids (3,3,t)</text>
    <text x="80" y="100" text-anchor="middle" fill="#22c55e" font-size="9">✓ Resolve conflict per branch</text>
  </g>
</svg>`,
      },
    },

    {
      q: "You must find the maximum flow in a directed graph where edge capacities change every query. The graph has V=1000 nodes and E=5000 edges. Queries=10000. Best strategy?",
      opts: [
        "Re-run Dinic's algorithm from scratch for each query — O(V²E) per query",
        "Precompute flow; on capacity decrease check if augmenting path was affected, repair if needed",
        "Use parametric max-flow to batch all queries together",
        "Convert to LP and use simplex for each query",
      ],
      ans: "Precompute flow; on capacity decrease check if augmenting path was affected, repair if needed",
      cat: "Dynamic Graph",
      exp: "Step 1: Re-running Dinic's from scratch per query is O(V²E × Q) = catastrophic for 10,000 queries.<br/>Step 2: Dynamic max-flow leverages the fact that small capacity changes often don't completely invalidate the existing flow.<br/>Step 3: On capacity increase: potentially find new augmenting paths from the changed edge.<br/>Step 4: On capacity decrease: if the current flow exceeds new capacity, reroute or cancel excess flow; then recheck feasibility.<br/>Step 5: This incremental approach avoids full recomputation in most practical cases.<br/>Step 6: Parametric max-flow works when queries follow a monotone pattern (all increases or all decreases).<br/>✅ Dynamic flow: incremental repair is the practical winning strategy.",
    },

    {
      q: "Design a data structure that supports: insert(x), delete(x), find_kth_smallest(k) — all in O(log n). Which structure works?",
      opts: [
        "Min-heap: find_kth is O(k log n)",
        "Sorted array: insert/delete O(n)",
        "Order-Statistics Tree (augmented BST with subtree sizes)",
        "Skip list with rank tracking",
      ],
      ans: "Order-Statistics Tree (augmented BST with subtree sizes)",
      cat: "Graph + DP",
      exp: "Step 1: Min-heap supports insert/delete in O(log n) but find_kth requires O(k log n) — too slow.<br/>Step 2: Sorted array gives O(1) find_kth but O(n) insert/delete.<br/>Step 3: An Order-Statistics Tree augments each BST node with the size of its subtree.<br/>Step 4: Insert/Delete: O(log n) — standard BST rotation + update subtree sizes up the path.<br/>Step 5: Find_kth: at each node, if k == left_size+1, return current; if k ≤ left_size, go left; else go right with k -= left_size+1. This is O(log n).<br/>Step 6: Available in C++ as __gnu_pbds::tree with order_of_key and find_by_order methods.<br/>✅ Order-Statistics Tree = canonical solution for rank-based queries.",
    },

    {
      q: "Given a string S of length n, find the longest substring that appears at least K times. Optimal time complexity?",
      opts: [
        "O(n²) brute force with rolling hash",
        "O(n log n) — binary search on length + Rabin-Karp hashing",
        "O(n) — Suffix Array + LCP Array",
        "O(n·K) — suffix automaton traversal",
      ],
      ans: "O(n) — Suffix Array + LCP Array",
      cat: "Graph + DP",
      exp: "Step 1: Binary search on answer length + Rabin-Karp hashing is O(n log n) — good but not optimal.<br/>Step 2: Build Suffix Array (SA) in O(n) using SA-IS algorithm; build LCP array in O(n) using Kasai's algorithm.<br/>Step 3: In the LCP array, the longest substring appearing at least K times = maximum value in any window of size K-1 in the LCP array (since K consecutive suffixes sharing LCP of L means L characters appear K times).<br/>Step 4: Use a sliding window minimum/maximum to scan the LCP array in O(n).<br/>Step 5: Total: O(n) time, O(n) space.<br/>✅ Suffix Array + LCP is the O(n) gold standard for repeated substring problems.",
    },

    {
      q: "You process a stream of integers. At any point, a query asks: 'How many distinct elements have appeared so far?' Memory is limited to O(log n) bits. Best approximation algorithm?",
      opts: [
        "Count-Min Sketch — gives frequency counts",
        "HyperLogLog — estimates distinct count with relative error ~1.04/√m",
        "Bloom Filter — answers set membership, not count",
        "Morris Counter — counts total, not distinct",
      ],
      ans: "HyperLogLog — estimates distinct count with relative error ~1.04/√m",
      cat: "Online Algorithm",
      exp: "Step 1: Exact distinct counting requires O(n) memory — impossible with the constraint.<br/>Step 2: HyperLogLog uses hash functions to estimate cardinality. It observes the maximum number of leading zeros in hashed values.<br/>Step 3: Probability that a hash has k leading zeros ≈ 2^(-k) — more distinct elements → higher max leading zeros.<br/>Step 4: Uses only m registers of O(log log n) bits each; total memory = O(m · log log n) = O(log n) effectively.<br/>Step 5: Error rate = 1.04/√m, so m=1024 registers gives ~3.25% relative error.<br/>Step 6: Used in production at Redis, Google BigQuery, Amazon Redshift.<br/>✅ HyperLogLog = industry standard for approximate distinct counting in streams.",
    },

    {
      q: "A greedy algorithm for interval scheduling: given n intervals, select maximum non-overlapping subset. Which greedy choice is provably optimal?",
      opts: [
        "Sort by start time, greedily pick non-overlapping",
        "Sort by duration (shortest first), greedily pick non-overlapping",
        "Sort by end time (earliest first), greedily pick non-overlapping",
        "Sort by number of conflicts, pick the one with fewest conflicts first",
      ],
      ans: "Sort by end time (earliest first), greedily pick non-overlapping",
      cat: "Graph + DP",
      exp: "Step 1: Sorting by start time fails — a long interval starting early blocks many short ones.<br/>Step 2: Sorting by duration fails — a short interval may still conflict with many others.<br/>Step 3: Sorting by end time and greedily selecting the interval that ends earliest (and doesn't conflict with last selected) is provably optimal.<br/>Step 4: Exchange argument proof: any solution can be transformed to match the greedy solution without decreasing count.<br/>Step 5: Classic 'Activity Selection Problem' — O(n log n) for sorting + O(n) for selection.<br/>✅ Earliest-end-time greedy is the textbook proof-of-optimality approach.",
    },

    {
      q: "Implement LRU Cache with O(1) get and put. Which data structures achieve this?",
      opts: [
        "HashMap + min-heap (priority queue)",
        "HashMap + Doubly Linked List",
        "Sorted array with binary search",
        "Trie with timestamp tracking",
      ],
      ans: "HashMap + Doubly Linked List",
      cat: "Online Algorithm",
      exp: "Step 1: HashMap gives O(1) key-value lookup.<br/>Step 2: Doubly Linked List maintains access order: most recent at head, least recent at tail.<br/>Step 3: On get(key): look up in HashMap → move corresponding node to head → O(1) since we store pointer to node in map.<br/>Step 4: On put(key, val): if key exists, update and move to head; if cache full, remove tail node (evict LRU) and its map entry; insert new node at head.<br/>Step 5: All operations: HashMap lookup O(1) + linked list pointer manipulation O(1) = O(1) total.<br/>✅ HashMap + DLL is the canonical LRU cache implementation (used in OS, databases, CDN caching).",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="110" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">LRU Cache: HashMap + Doubly Linked List</text>
  <!-- DLL -->
  <text x="170" y="32" text-anchor="middle" fill="#64748b" font-size="9">← Most Recent ──────────────── Least Recent (evict) →</text>
  <rect x="15" y="38" width="55" height="28" rx="5" fill="#22c55e" opacity="0.8"/>
  <text x="42" y="57" text-anchor="middle" fill="white">HEAD</text>
  <rect x="85" y="38" width="50" height="28" rx="5" fill="#6c63ff" opacity="0.8"/>
  <text x="110" y="57" text-anchor="middle" fill="white">K:3</text>
  <rect x="150" y="38" width="50" height="28" rx="5" fill="#6c63ff" opacity="0.8"/>
  <text x="175" y="57" text-anchor="middle" fill="white">K:1</text>
  <rect x="215" y="38" width="50" height="28" rx="5" fill="#6c63ff" opacity="0.8"/>
  <text x="240" y="57" text-anchor="middle" fill="white">K:7</text>
  <rect x="280" y="38" width="50" height="28" rx="5" fill="#ef4444" opacity="0.8"/>
  <text x="305" y="57" text-anchor="middle" fill="white">TAIL</text>
  <!-- Arrows -->
  <line x1="70" y1="52" x2="85" y2="52" stroke="#64748b" stroke-width="1.5"/>
  <line x1="135" y1="52" x2="150" y2="52" stroke="#64748b" stroke-width="1.5"/>
  <line x1="200" y1="52" x2="215" y2="52" stroke="#64748b" stroke-width="1.5"/>
  <line x1="265" y1="52" x2="280" y2="52" stroke="#64748b" stroke-width="1.5"/>
  <!-- HashMap -->
  <text x="170" y="85" text-anchor="middle" fill="#6c63ff" font-size="9">HashMap: {3→node_ptr, 1→node_ptr, 7→node_ptr}</text>
  <text x="170" y="100" text-anchor="middle" fill="#ef4444" font-size="9">Eviction: remove TAIL node + its hashmap entry</text>
</svg>`,
      },
    },

    {
      q: "A graph problem requires detecting negative cycles. Which algorithm correctly identifies them, and what is its complexity?",
      opts: [
        "Dijkstra — O((V+E) log V), detects negative cycles via visited flags",
        "BFS — O(V+E), checks if distance decreases after V-1 iterations",
        "Bellman-Ford — O(VE), detects if distances still decrease after V-1 iterations",
        "Floyd-Warshall — O(V³), checks diagonal of distance matrix",
      ],
      ans: "Bellman-Ford — O(VE), detects if distances still decrease after V-1 iterations",
      cat: "Graph + DP",
      exp: "Step 1: Dijkstra assumes non-negative edges — it fails entirely on negative weights.<br/>Step 2: BFS doesn't process edge weights — inapplicable.<br/>Step 3: Bellman-Ford relaxes all V-1 edges in V-1 iterations. After V-1 iterations, shortest paths are found IF no negative cycles exist.<br/>Step 4: Run one more (Vth) iteration: if ANY edge can still be relaxed (distance decreases), a negative cycle exists and is reachable from the source.<br/>Step 5: Floyd-Warshall also detects negative cycles — if dist[i][i] < 0, node i is on a negative cycle — but costs O(V³).<br/>✅ Bellman-Ford at O(VE) is the standard negative cycle detector.",
    },

    {
      q: "You're given a 2D matrix of 0s and 1s. Find the largest rectangle containing only 1s. What is the optimal approach?",
      opts: [
        "Brute force all sub-rectangles — O(n³m³)",
        "DP on prefix sums — O(n²m)",
        "Histogram approach: for each row compute heights, then largest rectangle in histogram using stack — O(nm)",
        "Divide and conquer on rows — O(nm log n)",
      ],
      ans: "Histogram approach: for each row compute heights, then largest rectangle in histogram using stack — O(nm)",
      cat: "Graph + DP",
      exp: "Step 1: Build a 'height' array: for each cell (i,j), height[j] = number of consecutive 1s ending at row i in column j (0 if matrix[i][j]=0).<br/>Step 2: After computing heights for each row, run 'Largest Rectangle in Histogram' algorithm using a monotonic stack in O(m).<br/>Step 3: Repeat for all n rows → total O(nm).<br/>Step 4: The stack-based histogram algorithm: push column indices; when a bar is shorter than stack top, pop and compute area with popped bar as the shortest.<br/>Step 5: This gives the maximum rectangle area in O(1) per element amortized.<br/>✅ Classic O(nm) solution — transforms 2D problem into repeated 1D histogram problem.",
    },

    {
      q: "In a weighted DAG, you must find the longest path from source S. Which is correct?",
      opts: [
        "Negate all weights and run Dijkstra",
        "Topological sort + DP relaxation (longest path DP on DAG)",
        "BFS with priority queue",
        "DFS with memoization — but cycles prevent this",
      ],
      ans: "Topological sort + DP relaxation (longest path DP on DAG)",
      cat: "Graph + DP",
      exp: "Step 1: Longest path in a general graph is NP-Hard, but in a DAG it's polynomial.<br/>Step 2: Since the graph is a DAG, topological sort can be computed in O(V+E).<br/>Step 3: Process vertices in topological order; for each vertex u, relax all outgoing edges: dist[v] = max(dist[v], dist[u] + weight(u,v)).<br/>Step 4: Total: O(V+E) — optimal for DAG longest path.<br/>Step 5: Negating weights and running Dijkstra only works if all original weights are negative (to make them positive after negation) — unreliable and Dijkstra doesn't handle negative weights.<br/>✅ Topological sort + DP is the canonical O(V+E) longest path in DAG.",
    },

    {
      q: "Given n ropes of different lengths, merge them into one by always merging two ropes — cost = sum of lengths merged. Minimize total cost. Best algorithm?",
      opts: [
        "Merge the longest two ropes each time",
        "Merge in the given order — fixed cost",
        "Use a min-heap: always merge the two shortest ropes",
        "Sort once and merge adjacent pairs",
      ],
      ans: "Use a min-heap: always merge the two shortest ropes",
      cat: "Graph + DP",
      exp: "Step 1: This is the classic 'Optimal Merge Pattern' problem — equivalent to Huffman Encoding.<br/>Step 2: Merging longer ropes later reduces the frequency they contribute to the total cost (shorter ropes get merged into intermediates more times).<br/>Step 3: Use a min-heap (priority queue): extract two minimum-length ropes, merge them (cost += sum), push merged rope back.<br/>Step 4: Repeat until one rope remains.<br/>Step 5: This greedy choice is provably optimal (exchange argument): swapping any two choices doesn't reduce cost.<br/>Step 6: O(n log n) — n-1 merge operations each O(log n) on the heap.<br/>✅ Min-heap greedy = Huffman-style optimal cost merging.",
    },

    {
      q: "Segment tree with lazy propagation supports range update and range query. What is the time complexity of each operation?",
      opts: [
        "O(n) update, O(1) query",
        "O(log n) update, O(n) query",
        "O(log n) update, O(log n) query",
        "O(√n) update, O(√n) query",
      ],
      ans: "O(log n) update, O(log n) query",
      cat: "Graph + DP",
      exp: "Step 1: A segment tree has O(log n) height (at most 2n nodes).<br/>Step 2: Range update with lazy propagation: instead of updating all elements in range, push a 'lazy tag' to the node covering the range. Children are updated only when accessed (propagation).<br/>Step 3: This means range update touches O(log n) nodes (segment tree decomposition into O(log n) disjoint segments).<br/>Step 4: Range query similarly touches O(log n) nodes, propagating lazy tags when needed.<br/>Step 5: Both operations: O(log n) time, O(n) space for the tree + lazy array.<br/>✅ This is why segment trees with lazy propagation are used in competitive programming for range-update range-query problems.",
    },

    {
      q: "You're given a weighted undirected graph. Edge weights can be 1 or 2. Find shortest paths from source in faster than standard Dijkstra. Best approach?",
      opts: [
        "BFS — O(V+E) ignoring weights",
        "0-1 BFS using deque (0: prepend, 1: append) — O(V+E)",
        "Modified BFS: split weight-2 edges with a dummy node → unweighted BFS — O(V+E)",
        "Dial's algorithm (bucket queue) — O(V + E + max_weight)",
      ],
      ans: "Modified BFS: split weight-2 edges with a dummy node → unweighted BFS — O(V+E)",
      cat: "Graph + DP",
      exp: "Step 1: Standard BFS ignores weights — gives wrong answer.<br/>Step 2: Dijkstra with binary heap is O((V+E) log V) — unnecessary overhead for small weight range.<br/>Step 3: For weights {1,2}: replace each weight-2 edge (u,v) with two weight-1 edges (u, dummy) + (dummy, v).<br/>Step 4: Now all edge weights are 1 → run standard BFS → O(V+E).<br/>Step 5: Alternatively, 0-1 BFS with a deque (for weights 0 and 1) also achieves O(V+E) — use prepend for weight-0, append for weight-1.<br/>Step 6: Dial's algorithm generalizes to small weight ranges with bucket queues — O(V + E + W) where W=max weight.<br/>✅ Splitting edges or 0-1 BFS achieves O(V+E) for {1,2}-weight graphs.",
    },

    {
      q: "What does the following recurrence solve for, and what is its closed form? T(n) = 2T(n/2) + O(n log n)",
      opts: [
        "Merge sort — O(n log n)",
        "Closest pair of points — O(n log² n)",
        "FFT — O(n log n)",
        "Matrix multiplication — O(n^2.81)",
      ],
      ans: "Closest pair of points — O(n log² n)",
      cat: "Graph + DP",
      exp: "Step 1: Apply Master Theorem Case 2 extended: T(n) = 2T(n/2) + f(n) where f(n) = O(n log n).<br/>Step 2: Compare f(n) = n log n vs n^(log₂ 2) = n: f(n) = n log n grows faster than n^1 = n.<br/>Step 3: But it's not polynomially larger (log n factor, not n^ε factor) — this is the 'borderline' Master Theorem case 2 extended.<br/>Step 4: Result: T(n) = O(n log² n) — the log factor adds one extra log.<br/>Step 5: This is exactly the recurrence for the 'Closest Pair of Points' divide-and-conquer algorithm: divide O(n log n) sort + O(n log n) strip merge → O(n log² n) total (or O(n log n) with clever strip handling).<br/>✅ T(n)=2T(n/2)+n log n → O(n log² n).",
    },

    {
      q: "You need to find the minimum cost to connect all n cities (MST). However, some cities have a 'super connector' option — paying cost C connects that city to ALL others instantly. How do you model this?",
      opts: [
        "Run Kruskal's on original graph only",
        "Add a virtual node 0 connected to every city with edge cost C; run MST on augmented graph",
        "Run Prim's starting from the super connector city",
        "Use Steiner tree formulation with exponential DP",
      ],
      ans: "Add a virtual node 0 connected to every city with edge cost C; run MST on augmented graph",
      cat: "Graph + DP",
      exp: "Step 1: The super connector option means: for cost C per city, you can connect that city to a central hub (like satellite internet — pay once per city).<br/>Step 2: Model this by adding a virtual 'satellite' node 0 connected to every city with edge weight C.<br/>Step 3: Now run any standard MST algorithm (Kruskal's or Prim's) on the augmented graph (n+1 nodes).<br/>Step 4: The MST will automatically use the virtual node (super connector) when it's cheaper than direct city-to-city edges.<br/>Step 5: This abstraction handles a wide class of 'global option vs. local edges' problems elegantly.<br/>✅ Virtual node trick: reduce non-standard connectivity options to standard MST.",
    },

    {
      q: "Floyd-Warshall algorithm finds all-pairs shortest paths. What subtle condition MUST the graph satisfy for Floyd-Warshall to give correct results?",
      opts: [
        "Graph must be undirected",
        "All edge weights must be positive",
        "Graph must not contain negative-weight cycles (but negative edges are OK)",
        "Graph must be a DAG (no cycles)",
      ],
      ans: "Graph must not contain negative-weight cycles (but negative edges are OK)",
      cat: "Graph + DP",
      exp: "Step 1: Floyd-Warshall works on both directed and undirected graphs.<br/>Step 2: Unlike Dijkstra, Floyd-Warshall handles negative edge weights correctly.<br/>Step 3: However, if there exists a negative-weight cycle, the shortest path is -∞ for any path that can pass through it — Floyd-Warshall produces incorrect results in this case.<br/>Step 4: Negative cycles can be detected: if dist[i][i] < 0 after the algorithm, node i is on a negative cycle.<br/>Step 5: Complexity: O(V³) time, O(V²) space — practical only for V ≤ 400 in competitive programming.<br/>✅ Floyd-Warshall: OK with negative edges, FAILS with negative cycles (as does all-pairs shortest path in general).",
    },

    {
      q: "Given an array A, for each element find the nearest smaller element to its left. Optimal algorithm and complexity?",
      opts: [
        "For each element, scan left until smaller found — O(n²) worst case",
        "Sort the array and use binary search — O(n log n)",
        "Use a monotonic stack: maintain stack of elements in increasing order — O(n) amortized",
        "Segment tree with range minimum query — O(n log n)",
      ],
      ans: "Use a monotonic stack: maintain stack of elements in increasing order — O(n) amortized",
      cat: "Graph + DP",
      exp: "Step 1: Brute force O(n²) is too slow for large arrays.<br/>Step 2: Sorting loses original positions — not applicable directly.<br/>Step 3: Monotonic stack approach: maintain a stack where elements are in increasing order from bottom to top.<br/>Step 4: For each element A[i]: pop all elements from stack that are ≥ A[i]. The new stack top (if any) is the nearest smaller element to the left. Then push A[i].<br/>Step 5: Each element is pushed and popped at most once → O(n) total, O(n) space.<br/>Step 6: Same technique works for 'next greater element', 'stock span problem', 'largest rectangle in histogram'.<br/>✅ Monotonic stack = O(n) for all 'nearest smaller/greater' queries.",
    },

    {
      q: "You need to compute the edit distance (Levenshtein) between two strings of length m and n. What is the space-optimized solution and its complexity?",
      opts: [
        "O(mn) time, O(mn) space — standard 2D DP table",
        "O(mn) time, O(min(m,n)) space — rolling array DP",
        "O(n log m) time using divide and conquer",
        "O(mn/word_size) time using bit-parallel (Myers' algorithm)",
      ],
      ans: "O(mn) time, O(min(m,n)) space — rolling array DP",
      cat: "Graph + DP",
      exp: "Step 1: Standard edit distance DP uses a 2D table of size (m+1)×(n+1) — O(mn) space.<br/>Step 2: Observe: row i only depends on row i-1. So we only need to keep two rows at a time → O(n) space (or O(min(m,n)) by orienting the shorter string as columns).<br/>Step 3: Rolling array optimization: alternate between two 1D arrays of size n+1 for each row computation.<br/>Step 4: For even better space: Hirschberg's algorithm achieves O(mn) time with O(min(m,n)) space AND retrieves the actual alignment (not just the distance).<br/>Step 5: Myers' bit-parallel algorithm achieves O(mn/w) time where w=64 (word size) — used in production diff tools and bioinformatics alignment.<br/>✅ Practical answer: O(mn) time, O(min(m,n)) space using rolling array.",
    },

    {
      q: "What is the time complexity of building a suffix array using the SA-IS (Induced Sorting) algorithm?",
      opts: ["O(n²)", "O(n log n)", "O(n log² n)", "O(n)"],
      ans: "O(n)",
      cat: "Graph + DP",
      exp: "Step 1: Naive suffix array construction (sort all suffixes) is O(n² log n) or O(n log² n) with radix sort.<br/>Step 2: DC3/Skew algorithm was the first to achieve O(n) construction.<br/>Step 3: SA-IS (Suffix Array - Induced Sorting) is an O(n) algorithm introduced by Nong, Zhang, and Chan in 2009.<br/>Step 4: SA-IS classifies characters as S-type or L-type, finds LMS (Leftmost S-type) suffixes, and uses induced sorting to build the full suffix array in linear time.<br/>Step 5: SA-IS is also practical (small constant factor) and handles general alphabets.<br/>Step 6: Combined with Kasai's algorithm for LCP array (also O(n)), complete suffix array + LCP takes O(n).<br/>✅ SA-IS builds suffix array in O(n) — optimal.",
    },

    {
      q: "In competitive programming, the 'Small-to-Large' merging technique for DSU or set merging achieves what amortized complexity?",
      opts: [
        "O(n²) total merges",
        "O(n log n) total merges — each element moves at most log n times",
        "O(n) total merges with path compression",
        "O(n √n) total using sqrt decomposition",
      ],
      ans: "O(n log n) total merges — each element moves at most log n times",
      cat: "Graph + DP",
      exp: "Step 1: Small-to-Large (also called DSU on tree or weighted union) always merges the smaller set INTO the larger set.<br/>Step 2: Key observation: every time an element is moved (to a larger set), the set size at least doubles.<br/>Step 3: Since the maximum set size is n, each element can be moved at most log₂(n) times before it's in the largest set.<br/>Step 4: Total moves across all merges ≤ n · log n → O(n log n) amortized.<br/>Step 5: This technique is used in: DSU with union by rank/size, tree DP with set merging, offline LCA, color propagation on trees.<br/>✅ Small-to-Large: O(n log n) amortized — essential for tree DP set problems.",
    },

    {
      q: "Matrix chain multiplication: given n matrices, find the optimal order to minimize multiplications. What DP state and complexity?",
      opts: [
        "dp[i][j] = min cost to multiply matrices i..j; O(n³) time O(n²) space",
        "dp[i][j] = min cost starting at i with j remaining; O(n²) time",
        "Greedy: always multiply smallest pair first; O(n log n)",
        "Divide & conquer on split point; O(n log n)",
      ],
      ans: "dp[i][j] = min cost to multiply matrices i..j; O(n³) time O(n²) space",
      cat: "Graph + DP",
      exp: "Step 1: dp[i][j] = minimum number of scalar multiplications needed to compute the product of matrices i through j.<br/>Step 2: Base case: dp[i][i] = 0 (single matrix, no multiplication needed).<br/>Step 3: Transition: dp[i][j] = min over all k (i ≤ k < j) of: dp[i][k] + dp[k+1][j] + dims[i-1] * dims[k] * dims[j].<br/>Step 4: Fill the table in order of increasing chain length (length 2, then 3, ..., then n).<br/>Step 5: O(n²) states × O(n) transitions = O(n³) total, O(n²) space.<br/>Step 6: Can be improved to O(n log n) using the SMAWK algorithm or divide-and-conquer optimization, but O(n³) is standard.<br/>✅ Classic interval DP — O(n³) time, O(n²) space.",
    },

    {
      q: "You're running a greedy task scheduler. Tasks arrive online with deadlines and profits. You can run at most one task per time unit. Maximize total profit. Algorithm?",
      opts: [
        "Sort by profit descending; schedule each if any slot before deadline is free — O(n² ) using linear slot search",
        "Sort by profit descending; use DSU to find latest free slot before deadline — O(n log n)",
        "Sort by deadline; schedule greedily using max-heap — O(n log n)",
        "DP on time slots; dp[t] = max profit ending at time t — O(n·T)",
      ],
      ans: "Sort by profit descending; use DSU to find latest free slot before deadline — O(n log n)",
      cat: "Graph + DP",
      exp: "Step 1: Sort tasks by profit in descending order — process highest profit tasks first.<br/>Step 2: For each task with deadline d, find the latest free time slot ≤ d. If such a slot exists, schedule the task there.<br/>Step 3: Using a DSU (Union-Find) where parent[t] = next free slot ≤ t, we can find the latest free slot in near O(1) amortized per query.<br/>Step 4: After scheduling task at slot t, union t with t-1 (so next query for slot t will redirect to t-1).<br/>Step 5: Total: O(n log n) for sorting + O(n · α(n)) for DSU operations ≈ O(n log n).<br/>✅ DSU-based job scheduling = elegantly reduces slot-finding from O(n²) to O(n log n).",
    },

    {
      q: "Implement 'find all bridges' in an undirected graph. A bridge is an edge whose removal disconnects the graph. What algorithm and complexity?",
      opts: [
        "Remove each edge and run BFS/DFS to check connectivity — O(E·(V+E))",
        "Tarjan's bridge-finding algorithm using DFS + low[] array — O(V+E)",
        "Floyd-Warshall on all pairs — O(V³)",
        "Union-Find: try removing each edge and check connectivity — O(E·α(V))",
      ],
      ans: "Tarjan's bridge-finding algorithm using DFS + low[] array — O(V+E)",
      cat: "Graph + DP",
      exp: "Step 1: Brute force (remove each edge + connectivity check) is O(E(V+E)) — too slow.<br/>Step 2: Tarjan's algorithm uses DFS and maintains two arrays: disc[v] = discovery time of v; low[v] = minimum discovery time reachable from the subtree rooted at v (using back edges).<br/>Step 3: Edge (u,v) is a bridge if low[v] > disc[u] — meaning no vertex in v's subtree can reach u or its ancestors via back edges.<br/>Step 4: Single DFS traversal: O(V+E) time, O(V) extra space.<br/>Step 5: Same framework finds articulation points (cut vertices) with a slight modification.<br/>✅ Tarjan's bridge algorithm: O(V+E) — single DFS pass.",
    },

    {
      q: "You process a stream of (key, value) pairs and need to find the top-K most frequent keys at any time. Memory is limited. Best data structure combination?",
      opts: [
        "HashMap for counts + sorted list rebuilt each query",
        "Count-Min Sketch for frequency estimation + min-heap of size K for top-K",
        "Exact HashMap + max-heap rebuilt each query",
        "Reservoir sampling for random top-K",
      ],
      ans: "Count-Min Sketch for frequency estimation + min-heap of size K for top-K",
      cat: "Online Algorithm",
      exp: "Step 1: Exact HashMap requires O(distinct_keys) memory — can be huge on infinite streams.<br/>Step 2: Count-Min Sketch uses a w×d matrix of counters with d hash functions. Update: increment count[h_i(key)] for each row. Query: return minimum of count[h_i(key)] across all rows.<br/>Step 3: Memory: O(w×d) = sublinear; error: with probability 1-δ, estimates are within ε·n of true count (set w=⌈e/ε⌉, d=⌈ln(1/δ)⌉).<br/>Step 4: Maintain a min-heap of size K tracking candidates for top-K using estimated counts.<br/>Step 5: Update: O(d) per element; query top-K: O(K log K).<br/>✅ Count-Min Sketch + min-heap = standard sublinear memory heavy hitter / top-K streaming algorithm.",
    },

    {
      q: "The 'Alien Trick' (WQS Binary Search / Lambda Optimization) extends which class of DP problems?",
      opts: [
        "DP problems with convex/concave optimization when adding a constraint 'use exactly K items'",
        "DP problems with bitmask states",
        "DP on trees with heavy-light decomposition",
        "DP problems solvable with divide-and-conquer optimization",
      ],
      ans: "DP problems with convex/concave optimization when adding a constraint 'use exactly K items'",
      cat: "Graph + DP",
      exp: "Step 1: Many DP problems are easy to solve without a constraint on the number of items used but become hard with 'use exactly K items'.<br/>Step 2: The Alien Trick (from IOI 2016 'Aliens' problem) works when the optimal value as a function of K is convex/concave.<br/>Step 3: Instead of DP[i][k] (O(nK) states), add a penalty λ per item used. Solve DP[i][λ] = optimal value with penalty. Binary search on λ to find the λ that makes exactly K items used.<br/>Step 4: Reduces O(nK) DP to O(n log(max_value)) — often crucial when K is large.<br/>Step 5: Requirements: optimal value function f(K) must be convex/concave; binary search converges to correct λ in O(log V) iterations.<br/>✅ Alien Trick: converts K-constraint DP to O(n log V) via penalty binary search.",
    },

    {
      q: "What is the amortized cost per operation in a Fibonacci Heap for decrease-key and extract-min operations?",
      opts: [
        "O(log n) for both — same as binary heap",
        "O(1) amortized decrease-key, O(log n) amortized extract-min",
        "O(1) for both operations",
        "O(√n) amortized for both",
      ],
      ans: "O(1) amortized decrease-key, O(log n) amortized extract-min",
      cat: "Graph + DP",
      exp: "Step 1: Binary heap: decrease-key = O(log n), extract-min = O(log n).<br/>Step 2: Fibonacci Heap uses lazy consolidation: operations are deferred until extract-min forces a 'cleanup'.<br/>Step 3: Decrease-key: cut the node from its tree, add to root list → O(1) amortized (occasional cascading cuts tracked by 'mark' bits).<br/>Step 4: Extract-min: remove minimum, merge children into root list, then consolidate (merge trees of same degree) → O(log n) amortized.<br/>Step 5: This makes Dijkstra's algorithm with Fibonacci Heap run in O(V log V + E) vs O((V+E) log V) with binary heap — better for dense graphs.<br/>✅ Fibonacci Heap: O(1) amortized decrease-key, O(log n) amortized extract-min — theoretically optimal for Dijkstra.",
    },

    {
      q: "Given a string, find the longest palindromic substring. What is the O(n) algorithm?",
      opts: [
        "DP: dp[i][j] = 1 if s[i..j] palindrome — O(n²) time O(n²) space",
        "Expand around each center — O(n²) time O(1) space",
        "Manacher's Algorithm — O(n) time O(n) space",
        "Suffix array + LCP — O(n log n)",
      ],
      ans: "Manacher's Algorithm — O(n) time O(n) space",
      cat: "Graph + DP",
      exp: "Step 1: Expanding around each center: O(n) centers × O(n) expansion = O(n²).<br/>Step 2: Manacher's algorithm exploits the fact that palindromes mirror each other.<br/>Step 3: Insert '#' between characters to handle even/odd length uniformly: 'abc' → '#a#b#c#'.<br/>Step 4: Maintain p[i] = radius of longest palindrome centered at i; use rightmost palindrome boundary (R, C) to skip redundant comparisons.<br/>Step 5: When i is inside the current rightmost palindrome, p[i] ≥ min(p[mirror], R-i) — reuse previously computed info.<br/>Step 6: Amortized: each character is visited at most twice → O(n) total.<br/>✅ Manacher's = the only O(n) longest palindromic substring algorithm.",
    },

    {
      q: "When does the 'Divide and Conquer DP' optimization apply, and what complexity does it achieve?",
      opts: [
        "When DP transitions form a convex hull — O(n log n) from O(n²)",
        "When opt[i] ≤ opt[i+1] (monotone optimal transition) — O(n log n) from O(n²)",
        "When the cost function satisfies the quadrangle inequality — O(n log n) from O(n²)",
        "All of the above apply under different conditions",
      ],
      ans: "All of the above apply under different conditions",
      cat: "Graph + DP",
      exp: "Step 1: Several DP optimizations reduce O(n²) DP to O(n log n):<br/>Step 2: Convex Hull Trick (CHT): applies when transitions have the form dp[i] = min over j of (a[j]*b[i] + c[j]) — linear functions optimized by convex hull.<br/>Step 3: Divide and Conquer optimization: applies when opt[i] ≤ opt[i+1] (monotone optimal decision) — split at midpoint, recurse on subproblems → O(n log n).<br/>Step 4: Knuth's optimization: when cost satisfies the quadrangle inequality (cost(a,c) + cost(b,d) ≤ cost(a,d) + cost(b,c) for a≤b≤c≤d) — achieves O(n²) → O(n²) with better constant, and for specific forms O(n log n).<br/>Step 5: All three are distinct techniques for different structural properties of DP transitions.<br/>✅ All three are valid under their respective conditions.",
    },

    {
      q: "You have N tasks with deadlines and weights. Minimize total weighted tardiness. This problem's complexity?",
      opts: [
        "Solvable in O(n log n) by sorting by deadline",
        "Solvable in O(n²) by DP",
        "NP-Hard in general; O(n²) pseudo-polynomial DP exists for unit weights",
        "Solvable in O(n log n) by Smith's rule",
      ],
      ans: "NP-Hard in general; O(n²) pseudo-polynomial DP exists for unit weights",
      cat: "Graph + DP",
      exp: "Step 1: Minimizing total weighted completion time (no deadlines) is solved by Smith's rule: sort by processing_time/weight in O(n log n).<br/>Step 2: Minimizing makespan or total completion time (unit weights, single machine) is solved by EDF (earliest deadline first) in O(n log n).<br/>Step 3: Minimizing total WEIGHTED TARDINESS on a single machine is NP-Hard — proven by reduction from partition.<br/>Step 4: For unit weights (minimize number of late jobs), Moore's algorithm achieves O(n log n).<br/>Step 5: For general weights, dynamic programming approaches run in pseudo-polynomial time O(n·T) where T = total processing time — feasible for small T.<br/>✅ Weighted tardiness minimization is NP-Hard — a key distinction in scheduling theory.",
    },

    {
      q: "What is the worst-case complexity of the Aho-Corasick algorithm for searching P patterns of total length M in a text of length N?",
      opts: [
        "O(N × M) — like running KMP P times",
        "O(M + N + Z) where Z = number of pattern occurrences",
        "O(M log M + N log N)",
        "O(N² / M) using suffix arrays",
      ],
      ans: "O(M + N + Z) where Z = number of pattern occurrences",
      cat: "Graph + DP",
      exp: "Step 1: Build the Aho-Corasick automaton from all P patterns: O(M) time to build the trie + O(M×|alphabet|) to compute failure and output links.<br/>Step 2: Process the text: traverse the automaton character by character in O(N) — each character causes at most one state transition.<br/>Step 3: Collect all matches: O(Z) to enumerate all Z occurrences across all patterns.<br/>Step 4: Total: O(M + N + Z) — optimal since we must at least read the patterns and text and output all matches.<br/>Step 5: Aho-Corasick is used in: network intrusion detection (snort), antivirus scanning, grep -F (fixed string matching), DNA sequence matching.<br/>✅ Aho-Corasick: O(M + N + Z) — optimal multi-pattern string matching.",
    },

    {
      q: "You need to find the K-th shortest path in a directed graph (not just the shortest). What algorithm handles this efficiently?",
      opts: [
        "Run Dijkstra K times, blocking previous shortest path each time",
        "Yen's Algorithm — O(KN(E log N)) for K shortest loopless paths",
        "Bellman-Ford with K relaxation rounds",
        "BFS with priority queue tracking K-best distances per node",
      ],
      ans: "Yen's Algorithm — O(KN(E log N)) for K shortest loopless paths",
      cat: "Graph + DP",
      exp: "Step 1: For K shortest paths (paths may repeat nodes/edges), Eppstein's algorithm runs in O(E log V + K log K) — optimal but complex.<br/>Step 2: For K shortest SIMPLE (loopless) paths, Yen's algorithm is the classic solution.<br/>Step 3: Yen's Algorithm: find the shortest path; for each subsequent k, consider 'spur' paths deviating from previous paths and use a candidate heap.<br/>Step 4: Complexity: O(KN(E log N)) — manageable for moderate K and N.<br/>Step 5: Used in routing (OSPF backup paths), bioinformatics, transportation planning.<br/>Step 6: For K-th shortest path allowing repeated nodes/edges: simpler approach = modified Dijkstra tracking k-best distances per node = O(K(E + V) log V).<br/>✅ Yen's for loopless; modified Dijkstra for repeated-node paths.",
    },

    {
      q: "A trie stores N strings. What is the memory usage and lookup complexity, and how does a compressed trie (Patricia trie) improve it?",
      opts: [
        "Trie: O(N×L×|Σ|) space, O(L) lookup; Patricia: O(N) nodes, O(L) lookup",
        "Trie: O(N) space, O(1) lookup; Patricia: O(N log N) space",
        "Both are equivalent in space and time",
        "Trie: O(L) lookup; Patricia: O(log N) lookup via binary search",
      ],
      ans: "Trie: O(N×L×|Σ|) space, O(L) lookup; Patricia: O(N) nodes, O(L) lookup",
      cat: "Graph + DP",
      exp: "Step 1: Standard trie: each node has |Σ| pointers (e.g., 26 for lowercase alphabet). Worst case N×L nodes each with 26 pointers → O(N×L×|Σ|) space.<br/>Step 2: Lookup: traverse one character at a time → O(L) where L = query string length.<br/>Step 3: Patricia Trie (Radix Tree): compress chains of single-child nodes into single edges with string labels. Chains of nodes like A→B→C become a single edge labeled 'ABC'.<br/>Step 4: Patricia trie has exactly O(N) internal nodes (one per branching point) → O(N) space for nodes, O(N×L) for stored string labels worst case.<br/>Step 5: Lookup still O(L) — must still compare characters, but fewer node traversals.<br/>Step 6: Patricia tries are used in IP routing tables (longest prefix match), dictionaries, and the Linux kernel's routing implementation.<br/>✅ Patricia trie: O(N) nodes vs O(N×L) for standard trie — space-efficient for sparse tries.",
    },

    {
      q: "Randomized algorithm: Karger's algorithm finds the minimum cut of a graph. What is its success probability per run, and how many runs for high probability?",
      opts: [
        "Success prob = 1/n²; need O(n²) runs → O(n⁴ log n) total",
        "Success prob ≥ 2/(n(n-1)); need O(n² log n) runs → O(n⁴ log n) total",
        "Success prob = 1/2; need O(log n) runs",
        "Success prob = 1/n; need O(n log n) runs",
      ],
      ans: "Success prob ≥ 2/(n(n-1)); need O(n² log n) runs → O(n⁴ log n) total",
      cat: "Graph + DP",
      exp: "Step 1: Karger's algorithm: randomly contract edges until 2 nodes remain; the remaining edges form a candidate cut.<br/>Step 2: Probability analysis: a specific min-cut of size k survives if none of its k edges are contracted in n-2 steps.<br/>Step 3: Probability of success ≥ 2/(n(n-1)) = Ω(1/n²) per run.<br/>Step 4: To achieve success probability ≥ 1-1/n, run n²ln(n)/2 times → O(n² log n) runs.<br/>Step 5: Each run: O(n²) using union-find → Total: O(n⁴ log n) — slow but works.<br/>Step 6: Karger-Stein improvement: stops contracting at √n nodes and recurses → O(n² log³ n) with high probability.<br/>✅ Karger's: Ω(1/n²) per run; need O(n² log n) repetitions for high confidence.",
    },

    {
      q: "Convex Hull of N 2D points. Graham Scan's time complexity and the key invariant it maintains?",
      opts: [
        "O(n²) — checks all pairs; invariant: all points on hull",
        "O(n log n) — sort by angle; invariant: left turns only on the stack",
        "O(n log n) — sort by x; invariant: upper and lower hull separately",
        "O(n) if points are already sorted — invariant: monotone chain",
      ],
      ans: "O(n log n) — sort by angle; invariant: left turns only on the stack",
      cat: "Graph + DP",
      exp: "Step 1: Graham Scan: find the lowest point (anchor), sort all other points by polar angle relative to anchor in O(n log n).<br/>Step 2: Process points in sorted order, maintaining a stack where all three consecutive points make a left turn (counter-clockwise).<br/>Step 3: For each new point: while the top two stack points and new point make a right turn (or are collinear), pop the stack.<br/>Step 4: Push the new point.<br/>Step 5: The invariant is: the stack always represents a valid convex hull of processed points so far, with all left turns.<br/>Step 6: Each point is pushed and popped at most once → O(n) after sorting → O(n log n) total.<br/>Step 7: Andrew's Monotone Chain is a variant that sorts by x-coordinate and builds upper/lower hulls — same O(n log n) complexity.<br/>✅ Graham Scan: O(n log n), left-turn invariant on stack.",
    },

    {
      q: "Persistent data structures allow accessing old versions. A persistent segment tree on an array supports: update a single element and query any historical version. What is the complexity per operation?",
      opts: [
        "O(n) per update (copy entire tree), O(log n) per query",
        "O(log n) per update (only modified path copied), O(log n) per query",
        "O(1) per update with structural sharing, O(n) per query",
        "O(log² n) per update and query using fractional cascading",
      ],
      ans: "O(log n) per update (only modified path copied), O(log n) per query",
      cat: "Graph + DP",
      exp: "Step 1: A persistent segment tree creates a new 'version' on each update without destroying the old one.<br/>Step 2: Path copying: when updating a leaf, only the O(log n) nodes on the path from root to that leaf are 'copied' and modified.<br/>Step 3: All other nodes in the new version share pointers with the old version (structural sharing).<br/>Step 4: Each version requires only O(log n) new nodes → O(log n) per update.<br/>Step 5: Querying any historical version: traverse the tree from the appropriate root → O(log n) per query.<br/>Step 6: Total space across V versions: O(n + V log n).<br/>Step 7: Applications: offline LCA with binary lifting, 2D range queries with offline sorting, functional programming immutable data structures.<br/>✅ Persistent seg tree: O(log n) per update/query via path copying + structural sharing.",
    },

    {
      q: "Z-function of a string S computes Z[i] = length of longest common prefix of S and S[i..]. What is the build complexity and a key application?",
      opts: [
        "O(n²) build; used for brute-force pattern matching",
        "O(n) build; finds all occurrences of pattern P in text T in O(|P|+|T|) via Z[P+'$'+T]",
        "O(n log n) build using suffix arrays",
        "O(n) build; only useful for palindrome detection",
      ],
      ans: "O(n) build; finds all occurrences of pattern P in text T in O(|P|+|T|) via Z[P+'$'+T]",
      cat: "Graph + DP",
      exp: "Step 1: Z-function: Z[i] = length of longest string starting at position i that is also a prefix of S. Z[0] is conventionally 0 or |S|.<br/>Step 2: O(n) algorithm: maintain [l,r] = rightmost Z-box (interval where S[l..r] = S[0..r-l]). For each i, use this interval to skip recomputations.<br/>Step 3: Pattern matching: build Z on string P+'$'+T (separator '$' ensures Z[i] ≤ |P| for i > |P|). Positions where Z[i] = |P| are exact matches of P in T.<br/>Step 4: Total: O(|P|+|T|) — same as KMP but conceptually different (Z-array vs failure function).<br/>Step 5: Other applications: find smallest period of a string (smallest p where S[i]=S[i mod p] for all i), count occurrences of each prefix as substring.<br/>✅ Z-function: O(n) build, O(|P|+|T|) pattern matching — elegant alternative to KMP.",
    },

    {
      q: "Heavy-Light Decomposition (HLD) on a tree enables path queries. What operations does it support and at what complexity?",
      opts: [
        "Path sum/min/max queries and updates: O(log n) per query with segment tree",
        "Path sum queries only in O(1) with prefix sums",
        "Path queries in O(log² n) — one log for HLD, one for segment tree",
        "Only static path queries — updates require full rebuild",
      ],
      ans: "Path queries in O(log² n) — one log for HLD, one for segment tree",
      cat: "Graph + DP",
      exp: "Step 1: HLD decomposes the tree into O(log n) heavy chains (a path from root to leaf using always the 'heaviest' child — child with largest subtree).<br/>Step 2: Map each chain to a contiguous segment of an array, then build a segment tree on this array.<br/>Step 3: Path query from u to v: find LCA, decompose path into O(log n) heavy chain segments, query each in O(log n) using the segment tree.<br/>Step 4: Total per query: O(log n) chains × O(log n) segment tree query = O(log² n).<br/>Step 5: Path update: similarly O(log² n).<br/>Step 6: With Euler tour + segment tree (for subtree queries) or HLD + BIT, the constant factor can be improved.<br/>Step 7: Applications: tree path sum/min/max with point/range updates — competitive programming staple.<br/>✅ HLD: O(log² n) per path query/update.",
    },

    {
      q: "The 'Dutch National Flag' algorithm solves 3-way partitioning in O(n) with O(1) space. Who invented it and what is the invariant?",
      opts: [
        "Dijkstra; invariant: elements in [0,lo) < pivot, [lo,mid) = pivot, [mid,hi] unknown, (hi,n) > pivot",
        "Hoare; invariant: two-pointer approach maintaining sorted halves",
        "Lomuto; invariant: all elements before pivot index are ≤ pivot",
        "Knuth; invariant: elements processed left-to-right with stable partition",
      ],
      ans: "Dijkstra; invariant: elements in [0,lo) < pivot, [lo,mid) = pivot, [mid,hi] unknown, (hi,n) > pivot",
      cat: "Graph + DP",
      exp: "Step 1: The Dutch National Flag problem was formulated by Edsger Dijkstra (creator of Dijkstra's shortest path algorithm).<br/>Step 2: Maintain three pointers: lo, mid, hi. Invariant at all times:<br/>  - [0, lo): elements < pivot (red)<br/>  - [lo, mid): elements = pivot (white)<br/>  - [mid, hi]: elements unknown (unprocessed)<br/>  - (hi, n): elements > pivot (blue)<br/>Step 3: Loop while mid ≤ hi: if A[mid] < pivot: swap A[lo] and A[mid], lo++, mid++; if A[mid] = pivot: mid++; if A[mid] > pivot: swap A[mid] and A[hi], hi-- (don't increment mid — new A[mid] is unknown).<br/>Step 4: O(n) time, O(1) space — each element examined at most once.<br/>Step 5: This is the basis for 3-way quicksort (handles duplicates efficiently).<br/>✅ Dijkstra's DNF: O(n), O(1) space, 4-region invariant.",
    },

    {
      q: "Given a tree with N nodes, find the diameter (longest path between any two nodes) in O(N). Algorithm?",
      opts: [
        "BFS from every node, take maximum distance — O(N²)",
        "Two BFS/DFS: first from any node to find farthest node u; second from u to find farthest node v; dist(u,v) = diameter — O(N)",
        "DP: dp[v] = longest path in subtree of v — O(N)",
        "Both B and C are correct O(N) approaches",
      ],
      ans: "Both B and C are correct O(N) approaches",
      cat: "Graph + DP",
      exp: "Step 1: Approach B — Two BFS/DFS: Run BFS from any node, find farthest node u. Run BFS from u, find farthest node v. Distance(u,v) = tree diameter. Provably correct: the farthest node from any node is always an endpoint of some diameter.<br/>Step 2: Approach C — Tree DP: For each node v, compute dp1[v] = longest downward path from v, dp2[v] = second longest (different subtree). Diameter through v = dp1[v] + dp2[v]. Take maximum over all nodes. O(N) DFS.<br/>Step 3: Both approaches are O(N) time, O(N) space (recursion stack).<br/>Step 4: Approach C also allows finding the actual path; Approach B is simpler to implement.<br/>Step 5: Both are used in competitive programming — know both!<br/>✅ Both approaches B and C correctly solve tree diameter in O(N).",
    },

    {
      q: "Sparse Table answers Range Minimum Query (RMQ) in O(1) after O(n log n) preprocessing. Why can't this technique be directly applied to Range Sum Query with updates?",
      opts: [
        "Sparse Table can handle updates in O(log n) — it can be used",
        "RMQ uses the idempotent property (min(a,a)=a); sum is not idempotent, so overlapping ranges double-count — can't use overlap trick",
        "Sparse Table only works on static arrays — any update requires O(n log n) rebuild",
        "Both B and C are correct reasons",
      ],
      ans: "Both B and C are correct reasons",
      cat: "Graph + DP",
      exp: "Step 1: Sparse Table O(1) RMQ works because min is idempotent: min(min(a..b), min(c..d)) = min(a..d) even if [a,b] and [c,d] overlap — duplicated elements don't change the minimum.<br/>Step 2: For sum: sum of overlapping intervals double-counts elements in the overlap → incorrect result. Sum is NOT idempotent.<br/>Step 3: Additionally, Sparse Table is static — after preprocessing, any element update requires rebuilding all O(log n) table levels that cover that position, costing O(n log n).<br/>Step 4: For dynamic range sum queries, use a Fenwick Tree (BIT): O(log n) update, O(log n) query — or segment tree: O(log n) for both.<br/>Step 5: Sparse Table is ideal for static arrays with frequent RMQ: O(n log n) build once, then O(1) per query.<br/>✅ Two reasons: non-idempotent (overlap double-counts) + static structure (no efficient updates).",
    },

    {
      q: "Topological sort on a graph with cycles — what happens and how do you detect it?",
      opts: [
        "Kahn's algorithm (BFS-based): if result has fewer than V nodes, a cycle exists",
        "DFS-based: if a back edge is found (gray node revisited), a cycle exists",
        "Both correctly detect cycles; Kahn's uses in-degree, DFS uses coloring (white/gray/black)",
        "Topological sort always succeeds; cycles just create multiple valid orderings",
      ],
      ans: "Both correctly detect cycles; Kahn's uses in-degree, DFS uses coloring (white/gray/black)",
      cat: "Graph + DP",
      exp: "Step 1: Topological sort is only defined for Directed Acyclic Graphs (DAGs). Cycles make it impossible.<br/>Step 2: Kahn's Algorithm: compute in-degrees; add all in-degree-0 nodes to queue; process, reducing neighbors' in-degrees; if queue empties before all V nodes are processed → a cycle exists (remaining nodes have non-zero in-degree).<br/>Step 3: DFS-based: color nodes white (unvisited), gray (in progress), black (done). If DFS reaches a gray node via a new edge → back edge → cycle detected.<br/>Step 4: Both are O(V+E) — equally efficient.<br/>Step 5: DFS naturally produces a reverse topological order (add to list when finished/blackened); Kahn's produces forward topological order directly.<br/>✅ Both Kahn's and DFS correctly detect cycles during topological sort — know both for interviews.",
    },

    {
      q: "The 'Mo's Algorithm' solves offline range queries in O((N+Q)√N). What type of queries does it handle and what is the key idea?",
      opts: [
        "Only range sum queries — uses prefix arrays instead of sqrt decomposition",
        "Any range query where add/remove element is O(1); reorders queries to minimize total element additions/removals",
        "Online range queries with real-time updates using sqrt decomposition",
        "Range minimum queries using a monotonic deque",
      ],
      ans: "Any range query where add/remove element is O(1); reorders queries to minimize total element additions/removals",
      cat: "Graph + DP",
      exp: "Step 1: Mo's Algorithm is an offline technique — all queries are known upfront.<br/>Step 2: Divide query left endpoints into blocks of size √N. Sort queries: primary key = block of left endpoint; secondary key = right endpoint (alternating ascending/descending for even/odd blocks — 'Mo's with rollback').<br/>Step 3: Maintain a sliding window [cur_L, cur_R] and a 'current answer'. For each query, expand/shrink the window by adding/removing elements one at a time.<br/>Step 4: Total movements: right pointer moves O(N) per block × O(Q/√N) blocks = O(N·√N) = O(N^1.5). Left pointer moves O(√N) per query × Q queries = O(Q√N).<br/>Step 5: Total = O((N+Q)√N).<br/>Step 6: Works for: count of distinct elements, sum of squares, mode in range — anything where add/remove is O(1).<br/>✅ Mo's Algorithm: offline, O((N+Q)√N), handles any query with O(1) add/remove.",
    },

    {
      q: "Given an array of integers, find the maximum subarray sum (Kadane's algorithm). What is the recurrence?",
      opts: [
        "dp[i] = max(dp[i-1], A[i]); answer = max of all dp[i]",
        "dp[i] = max(dp[i-1] + A[i], A[i]); answer = max of all dp[i]",
        "dp[i] = dp[i-1] + A[i] if positive, else 0; answer = max of all dp[i]",
        "Both B and C are equivalent formulations",
      ],
      ans: "Both B and C are equivalent formulations",
      cat: "Graph + DP",
      exp: "Step 1: Kadane's algorithm: dp[i] = maximum subarray sum ending at index i.<br/>Step 2: Formulation B: dp[i] = max(dp[i-1] + A[i], A[i]) = A[i] + max(dp[i-1], 0). This means: either extend the previous subarray, or start a new one at i.<br/>Step 3: Formulation C: dp[i] = dp[i-1] + A[i] if dp[i-1] > 0, else A[i] = max(dp[i-1]+A[i], A[i]). This is identical to B.<br/>Step 4: max(dp[i-1]+A[i], A[i]) = A[i] + max(dp[i-1], 0) — all three expressions are equivalent.<br/>Step 5: Space-optimized: only keep dp[i-1] (one variable), O(1) space, O(n) time.<br/>Step 6: For all-negative arrays: dp[0] = A[0], answer = max element (not 0) — handle the 'must pick at least one element' constraint.<br/>✅ Both B and C are correct and equivalent Kadane's formulations.",
    },

    {
      q: "You are given a stream of integers. Design a data structure to return the k-th largest element after each insertion, where k is fixed. Optimal solution?",
      opts: [
        "Sorted array — O(n) insert, O(1) query",
        "Min-heap of size k: always maintain top-k largest; k-th largest = heap min",
        "Max-heap: extract k times per query — O(k log n)",
        "Segment tree with coordinate compression — O(log n) each",
      ],
      ans: "Min-heap of size k: always maintain top-k largest; k-th largest = heap min",
      cat: "Online Algorithm",
      exp: "Step 1: We need the k-th largest, which is the smallest of the top-k elements.<br/>Step 2: Maintain a min-heap of exactly k elements (the current top-k largest values).<br/>Step 3: On insert(x): if heap size < k, push x. Else if x > heap.top(), pop and push x. Else ignore.<br/>Step 4: k-th largest at any time = heap.top() (minimum of the k largest elements).<br/>Step 5: Insert: O(log k), Query: O(1) — excellent for streaming.<br/>Step 6: This is the basis for LeetCode 703 'Kth Largest Element in a Stream' and is used in recommendation systems, monitoring dashboards, and leaderboards.<br/>✅ Min-heap of size k: O(log k) insert, O(1) k-th largest query.",
    },

    {
      q: "Bloom Filter: what operations does it support, and what type of errors can it make?",
      opts: [
        "Insert and Lookup; can have false positives (says 'in set' when not) but no false negatives",
        "Insert and Lookup; can have false negatives but no false positives",
        "Insert, Delete, and Lookup with configurable error rates",
        "Only Lookup — no insertions (read-only probabilistic set)",
      ],
      ans: "Insert and Lookup; can have false positives (says 'in set' when not) but no false negatives",
      cat: "Online Algorithm",
      exp: "Step 1: Bloom Filter uses a bit array of size m and k hash functions.<br/>Step 2: Insert(x): set bits at positions h₁(x), h₂(x), ..., hₖ(x) to 1.<br/>Step 3: Lookup(x): if ALL k positions are 1 → 'probably in set'; if ANY position is 0 → 'definitely not in set'.<br/>Step 4: False positives: possible — all k positions may be set by other elements (collision), causing Bloom Filter to incorrectly say x is in the set.<br/>Step 5: False negatives: impossible — if x was inserted, all its k bits are set and will remain set (bits are never reset).<br/>Step 6: Standard Bloom Filters don't support deletion (setting bits to 0 would cause false negatives). Counting Bloom Filters support deletion using counters instead of bits.<br/>Step 7: Used in: databases (avoid disk reads for missing keys), caches, network routers, Chrome (SafeBrowsing).<br/>✅ Bloom Filter: insert + lookup, false positives only — never false negatives.",
    },

    {
      q: "What is the correct definition of amortized analysis, and how does it differ from average-case analysis?",
      opts: [
        "Amortized = average over random inputs; average-case = average over worst inputs",
        "Amortized = worst-case per operation averaged over a sequence of operations (no probability); average-case = expected cost over random inputs (with probability distribution)",
        "They are identical — both use expected values",
        "Amortized is always better than average-case by definition",
      ],
      ans: "Amortized = worst-case per operation averaged over a sequence of operations (no probability); average-case = expected cost over random inputs (with probability distribution)",
      cat: "Graph + DP",
      exp: "Step 1: Amortized analysis: consider a sequence of n operations on a data structure. The amortized cost per operation is total cost / n, in the worst case — NO probability involved. It's a guarantee for all input sequences.<br/>Step 2: Average-case analysis: assumes a probability distribution over inputs and computes the expected cost. It's probabilistic and depends on the assumed distribution.<br/>Step 3: Example: dynamic array (doubling): single push can cost O(n) when resize occurs, but amortized over n pushes = O(1) per push (total cost = O(n)).<br/>Step 4: Three amortized analysis methods: aggregate (total cost / n), accounting (charge extra to cheap operations, credit expensive ones), potential (define potential function Φ, amortized cost = actual + ΔΦ).<br/>Step 5: Amortized is stronger than average-case — it holds for ALL input sequences, not just typical ones.<br/>✅ Key distinction: amortized = deterministic worst-case per sequence; average-case = probabilistic over input distribution.",
    },

    {
      q: "In a skip list, what is the expected time complexity for search, insert, and delete, and what probability is used for level promotion?",
      opts: [
        "O(n) all operations; p = 0.5 promotion",
        "O(log n) expected for all; p = 0.5 promotion giving O(log n) expected levels",
        "O(log² n) search, O(n) insert in worst case",
        "O(1) search with perfect hashing, O(log n) insert",
      ],
      ans: "O(log n) expected for all; p = 0.5 promotion giving O(log n) expected levels",
      cat: "Graph + DP",
      exp: "Step 1: Skip list: a probabilistic data structure with multiple sorted linked list layers. Bottom layer = all elements; each higher layer includes each element with probability p.<br/>Step 2: With p = 0.5: expected number of levels = log₂(n). Expected number of elements at each level = n/2^level.<br/>Step 3: Search: start from top level, scan right until overshoot, drop down, repeat. Expected O(log n) steps.<br/>Step 4: Insert: search for position in O(log n), randomly promote new node to each level with probability p → O(log n) expected level promotions.<br/>Step 5: Delete: search in O(log n), unlink from all levels in O(log n).<br/>Step 6: Skip lists are used in Redis (sorted sets), LevelDB, and as simpler alternatives to balanced BSTs (no rotations needed).<br/>✅ Skip list: O(log n) expected search/insert/delete with p=0.5 promotion.",
    },

    {
      q: "What is the significance of the 'P vs NP' problem in the context of algorithm design? If P=NP were proven, what practical impact would it have?",
      opts: [
        "It would make all algorithms run in O(1) time",
        "It would mean all NP problems (like SAT, TSP, knapsack) have polynomial-time algorithms — cryptography based on hardness would collapse",
        "It would only affect theoretical computer science with no practical impact",
        "It would mean NP-hard problems require exponential space",
      ],
      ans: "It would mean all NP problems (like SAT, TSP, knapsack) have polynomial-time algorithms — cryptography based on hardness would collapse",
      cat: "Graph + DP",
      exp: "Step 1: P = class of decision problems solvable in polynomial time. NP = class verifiable in polynomial time. P⊆NP is known; whether P=NP is unknown.<br/>Step 2: If P=NP: every NP problem would have a polynomial-time algorithm. This includes NP-Complete problems (hardest in NP): SAT, TSP, graph coloring, integer programming, protein folding.<br/>Step 3: Cryptographic impact: RSA, Diffie-Hellman, and most modern encryption rely on problems believed to be in NP but not P (factoring, discrete log). P=NP would break these.<br/>Step 4: Positive impact: many optimization problems (drug discovery, logistics, scheduling) would become efficiently solvable.<br/>Step 5: Current working assumption: P≠NP. This justifies using NP-hardness as evidence that no efficient exact algorithm exists → use approximation or heuristics.<br/>✅ P=NP: polynomial algorithms for ALL NP problems — transforms optimization and breaks modern cryptography.",
    },

    {
      q: "An array has all elements appearing twice except one. Find the unique element in O(n) time, O(1) space.",
      opts: [
        "Sort the array and find the odd one out — O(n log n)",
        "Use a HashMap to count occurrences — O(n) time, O(n) space",
        "XOR all elements — pairs cancel out (a XOR a = 0), unique element remains — O(n), O(1)",
        "Use a Bloom filter — probabilistic but O(1) space",
      ],
      ans: "XOR all elements — pairs cancel out (a XOR a = 0), unique element remains — O(n), O(1)",
      cat: "Graph + DP",
      exp: "Step 1: XOR properties: a XOR 0 = a; a XOR a = 0; XOR is commutative and associative.<br/>Step 2: XOR all elements: pairs cancel → XOR(a,a) = 0 for each duplicate pair.<br/>Step 3: Only the unique element has no pair → it is the final XOR result.<br/>Step 4: Example: [2,1,4,1,2] → 2 XOR 1 XOR 4 XOR 1 XOR 2 = (2 XOR 2) XOR (1 XOR 1) XOR 4 = 0 XOR 0 XOR 4 = 4.<br/>Step 5: O(n) single pass, O(1) space — optimal.<br/>Step 6: Extensions: if two elements appear once (rest appear twice), XOR gives x XOR y; find a set bit in x XOR y to partition elements and XOR each partition separately.<br/>✅ XOR trick: classic O(n), O(1) solution for finding the unique element.",
    },

    {
      q: "Describe the time complexity of Prim's vs Kruskal's MST algorithm on a dense graph (E ≈ V²).",
      opts: [
        "Both are O(E log V) — equivalent on all graph types",
        "Prim's with Fibonacci Heap: O(E + V log V); Kruskal's: O(E log E) = O(V² log V) — Prim's wins on dense graphs",
        "Kruskal's is always faster due to union-find",
        "Prim's is O(V²) with adjacency matrix — slower than Kruskal's O(E log E)",
      ],
      ans: "Prim's with Fibonacci Heap: O(E + V log V); Kruskal's: O(E log E) = O(V² log V) — Prim's wins on dense graphs",
      cat: "Graph + DP",
      exp: "Step 1: Kruskal's algorithm sorts all edges: O(E log E). For dense graphs E=V², this is O(V² log V). Union-find operations are near O(E·α(V)) ≈ O(E).<br/>Step 2: Prim's with binary heap: O((V+E) log V) = O(E log V) for dense graphs = O(V² log V) — same as Kruskal's.<br/>Step 3: Prim's with Fibonacci Heap: O(E + V log V). For dense graphs E=V²: O(V²) — significantly better.<br/>Step 4: Rule of thumb: Kruskal's better for sparse graphs (E ≈ V); Prim's with Fibonacci Heap better for dense graphs (E ≈ V²).<br/>Step 5: Prim's with simple adjacency matrix (no heap): O(V²) — equally good for dense graphs and simpler to implement.<br/>✅ Dense graphs: Prim's O(V²) with adj matrix or O(E+V log V) with Fibonacci Heap beats Kruskal's O(V² log V).",
    },

    {
      q: "In 2-SAT, what is the efficient algorithm and what structure does it exploit?",
      opts: [
        "Brute force all variable assignments — O(2^n)",
        "Reduction to SCC (Strongly Connected Components) using Tarjan's or Kosaraju's — O(V+E)",
        "Reduction to MaxFlow — O(V²E)",
        "Greedy assignment based on clause counts — O(n log n)",
      ],
      ans: "Reduction to SCC (Strongly Connected Components) using Tarjan's or Kosaraju's — O(V+E)",
      cat: "Graph + DP",
      exp: "Step 1: 2-SAT: each clause has exactly 2 literals, e.g., (A OR B) = (¬A → B) AND (¬B → A).<br/>Step 2: Build an implication graph: for each clause (P OR Q), add edges ¬P → Q and ¬Q → P.<br/>Step 3: Find SCCs of the implication graph using Tarjan's or Kosaraju's algorithm in O(V+E).<br/>Step 4: Unsatisfiable iff: there exists a variable x such that x and ¬x are in the same SCC (they imply each other → contradiction).<br/>Step 5: If satisfiable: assign x = TRUE if SCC(x) comes AFTER SCC(¬x) in the topological order of the SCC DAG.<br/>Step 6: 2-SAT is in P (polynomial time); 3-SAT is NP-Complete — a crucial complexity boundary.<br/>✅ 2-SAT: implication graph + SCC → O(V+E) — a beautiful reduction from logic to graph theory.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="130" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="11" fill="currentColor">2-SAT Implication Graph</text>
  <text x="170" y="27" text-anchor="middle" fill="#64748b" font-size="9">Clause: (A OR B) → edges: ¬A→B and ¬B→A</text>
  <!-- Nodes -->
  <circle cx="60" cy="65" r="16" fill="#6c63ff" opacity="0.85"/><text x="60" y="70" text-anchor="middle" fill="white">A</text>
  <circle cx="130" cy="65" r="16" fill="#6c63ff" opacity="0.85"/><text x="130" y="70" text-anchor="middle" fill="white">¬A</text>
  <circle cx="200" cy="65" r="16" fill="#ef4444" opacity="0.85"/><text x="200" y="70" text-anchor="middle" fill="white">B</text>
  <circle cx="270" cy="65" r="16" fill="#ef4444" opacity="0.85"/><text x="270" y="70" text-anchor="middle" fill="white">¬B</text>
  <!-- Implication edges -->
  <line x1="130" y1="65" x2="184" y2="65" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ga)"/>
  <line x1="270" y1="65" x2="146" y2="65" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ga)"/>
  <!-- SCC boxes -->
  <rect x="40" y="90" width="40" height="20" rx="3" fill="#6c63ff" opacity="0.3" stroke="#6c63ff"/>
  <text x="60" y="104" text-anchor="middle" fill="currentColor" font-size="9">SCC₁</text>
  <rect x="110" y="90" width="40" height="20" rx="3" fill="#6c63ff" opacity="0.3" stroke="#6c63ff"/>
  <text x="130" y="104" text-anchor="middle" fill="currentColor" font-size="9">SCC₂</text>
  <text x="170" y="120" text-anchor="middle" fill="#22c55e" font-size="9">SAT ✓ if x and ¬x in different SCCs</text>
  <defs><marker id="ga" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#22c55e"/></marker></defs>
</svg>`,
      },
    },

    {
      q: "The 'Tortoise and Hare' algorithm (Floyd's cycle detection) finds a cycle in a linked list. What additional information can it extract, and how?",
      opts: [
        "Only detects presence of a cycle — O(n) time, O(1) space",
        "Detects cycle AND finds the start of the cycle: after meeting point, reset slow to head, advance both one step at a time — they meet at cycle start",
        "Detects cycle AND finds cycle length by counting steps until slow=fast again",
        "Both B and C — can find cycle start AND cycle length",
      ],
      ans: "Both B and C — can find cycle start AND cycle length",
      cat: "Graph + DP",
      exp: "Step 1: Phase 1 — Detect cycle: slow moves 1 step, fast moves 2 steps. If they meet, cycle exists. Meeting point is inside the cycle.<br/>Step 2: Phase 2 — Find cycle start: mathematical proof shows: if slow traveled distance d to meeting point, and cycle starts at distance μ from head, then μ = distance from head to start = distance from meeting point to start. Reset slow to head; advance both one step at a time; meeting point = cycle start.<br/>Step 3: Phase 3 — Find cycle length: from the cycle start (or any known cycle node), advance one pointer until it returns to the same position, counting steps → cycle length λ.<br/>Step 4: Total: O(n) time, O(1) space.<br/>Step 5: Applications: duplicate number in array (Floyd's on index→value function), detect cycle in functional graphs, birthday paradox cryptanalysis (Pollard's rho).<br/>✅ Floyd's: O(n), O(1) — detects cycle AND finds start AND finds length.",
    },

    {
      q: "The 'Inclusion-Exclusion Principle' in combinatorics. If |A∪B∪C| = |A|+|B|+|C| - |A∩B| - |B∩C| - |A∩C| + |A∩B∩C|, what is this used for in algorithmic problems?",
      opts: [
        "Only for counting elements in set unions — no algorithmic use",
        "Counting integers in [1,N] divisible by at least one of k primes; PIE-based DP for NP problems; Möbius inversion",
        "Sorting algorithms with multiple keys",
        "Graph coloring — counting valid colorings",
      ],
      ans: "Counting integers in [1,N] divisible by at least one of k primes; PIE-based DP for NP problems; Möbius inversion",
      cat: "Graph + DP",
      exp: "Step 1: Classic application: count integers in [1,N] divisible by at least one of primes p₁,...,pₖ. Apply PIE over 2^k subsets of primes: for each subset S, count ⌊N/∏S⌋ multiples, alternating signs.<br/>Step 2: 'At least K' problems: use complementary counting with PIE — e.g., count permutations with at least one fixed point (derangements complement).<br/>Step 3: Bitmask DP + PIE: for NP problems with k 'special' elements, enumerate all 2^k subsets → feasible for k≤20.<br/>Step 4: Möbius inversion: the divisor-lattice version of PIE, fundamental in number theory algorithms (computing Euler's totient, primitive roots).<br/>Step 5: In competitive programming: 'how many arrays of length n with all elements from [1,m] have no two adjacent equal elements' and similar problems use PIE over 'bad' configurations.<br/>✅ PIE: essential for counting problems, divisibility counting, derangements, Möbius inversion, bitmask DP.",
    },

    {
      q: "Fast Fourier Transform (FFT) is used to multiply two polynomials of degree n in O(n log n). Without FFT, the naive approach is O(n²). Which other major algorithmic problems reduce to polynomial multiplication / FFT?",
      opts: [
        "Only polynomial multiplication — FFT has no other uses",
        "String matching (convolution), large integer multiplication, signal processing, subset sum counting with generating functions",
        "Sorting algorithms — FFT sorts in O(n log n)",
        "Graph shortest paths — FFT on adjacency matrix",
      ],
      ans: "String matching (convolution), large integer multiplication, signal processing, subset sum counting with generating functions",
      cat: "Graph + DP",
      exp: "Step 1: Polynomial multiplication: naive O(n²), FFT-based O(n log n).<br/>Step 2: Large integer multiplication: represent integers as polynomials in base B, multiply → same as polynomial multiplication in O(n log n) vs O(n²) for schoolbook. Used in GMP, Python's big integers.<br/>Step 3: String matching with wildcards: form polynomials from pattern and text, use convolution (FFT) to find all match positions in O(n log n) — Clifford-Clifford algorithm.<br/>Step 4: Subset sum counting: generate function for each set {xᵃ}, multiply → coefficient of xˢ = number of subsets summing to s. FFT makes this O(S log S) vs O(nS).<br/>Step 5: Signal processing (DFT/IDFT): fundamental for audio/video compression (JPEG uses DCT, a variant of FFT), spectral analysis, filtering.<br/>Step 6: NTT (Number Theoretic Transform) = FFT over finite fields — used in competitive programming to avoid floating point errors.<br/>✅ FFT: polynomial multiplication, integer multiplication, string matching, subset sum, signal processing — extremely versatile.",
    },

    {
      q: "Explain the 'two-pointer' technique. In which scenario does it fail to find the correct answer?",
      opts: [
        "Two-pointer always works on sorted arrays — no failure case",
        "Fails when the array is unsorted AND the target sum involves non-adjacent elements that require a different ordering strategy",
        "Two-pointer fails on arrays with duplicate elements",
        "Two-pointer only works for exactly two elements — fails for three-sum problems",
      ],
      ans: "Fails when the array is unsorted AND the target sum involves non-adjacent elements that require a different ordering strategy",
      cat: "Graph + DP",
      exp: "Step 1: Two-pointer for sorted array two-sum: start with left=0, right=n-1. If sum < target: left++; if sum > target: right--; if sum = target: found.<br/>Step 2: This works because the array is sorted: moving left pointer increases sum, moving right decreases sum — decisions are unambiguous.<br/>Step 3: Fails on unsorted arrays: after moving pointers, we can't guarantee the new sum direction — we might skip the correct pair.<br/>Step 4: For three-sum (3 elements summing to target): sort array, fix one element, then apply two-pointer on remaining — still O(n²) but correct.<br/>Step 5: Two-pointer doesn't directly extend to k-sum for k≥4 without outer loops: k-sum is solvable in O(n^(k-1)) with two-pointer as the innermost loop.<br/>Step 6: Also fails for problems requiring non-contiguous subsets where sorting changes the answer (e.g., 'find indices i,j,k such that A[i]+A[j]+A[k]=T with i<j<k given specific constraints').<br/>✅ Two-pointer requires sorted order — fails on unsorted arrays and problems where sorted order breaks index constraints.",
    },
  ],

  tier2: [
    {
      q: "Designing YouTube at global scale. A video uploaded in the US should be watchable in Asia within 60 seconds. Which architecture pattern achieves this?",
      opts: [
        "Single centralized server in the US — simple but high latency",
        "CDN (Content Delivery Network) with edge nodes + async replication to regional PoPs",
        "Peer-to-peer streaming between users",
        "Blockchain-based distributed storage",
      ],
      ans: "CDN (Content Delivery Network) with edge nodes + async replication to regional PoPs",
      cat: "System Design",
      exp: "Step 1: A single US server would have 150-300ms latency to Asia — unacceptable for smooth streaming.<br/>Step 2: CDN architecture: video is uploaded → transcoding pipeline (multiple resolutions: 144p to 4K) → pushed to geographically distributed edge nodes (Points of Presence - PoPs).<br/>Step 3: Async replication: within 60 seconds of upload, CDN pushes popular/recent content to nearby PoPs. Less popular content may be pulled on first request and cached.<br/>Step 4: Users are directed to the nearest PoP via Anycast routing or DNS-based geo-routing.<br/>Step 5: Trade-off: eventual consistency (brief window where video isn't globally available) vs. strong consistency (requires synchronous replication → too slow).<br/>Step 6: YouTube uses Google's own CDN infrastructure with 100+ PoPs globally.<br/>✅ CDN + async replication + edge nodes = global low-latency video delivery.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 155" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="155" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="11" fill="currentColor">YouTube Global CDN Architecture</text>
  <!-- Origin -->
  <rect x="130" y="20" width="80" height="30" rx="5" fill="#6c63ff" opacity="0.85"/>
  <text x="170" y="39" text-anchor="middle" fill="white" font-size="9">Origin (US)</text>
  <!-- Arrows to PoPs -->
  <line x1="130" y1="42" x2="55" y2="75" stroke="#6c63ff" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="170" y1="50" x2="170" y2="72" stroke="#6c63ff" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="210" y1="42" x2="285" y2="75" stroke="#6c63ff" stroke-width="1.5" stroke-dasharray="4,2"/>
  <!-- PoPs -->
  <rect x="15" y="75" width="70" height="25" rx="4" fill="#f59e0b" opacity="0.85"/>
  <text x="50" y="91" text-anchor="middle" fill="white" font-size="9">PoP Europe</text>
  <rect x="130" y="72" width="80" height="25" rx="4" fill="#f59e0b" opacity="0.85"/>
  <text x="170" y="88" text-anchor="middle" fill="white" font-size="9">PoP Asia</text>
  <rect x="255" y="75" width="75" height="25" rx="4" fill="#f59e0b" opacity="0.85"/>
  <text x="292" y="91" text-anchor="middle" fill="white" font-size="9">PoP S.Am</text>
  <!-- Users -->
  <circle cx="50" cy="130" r="12" fill="#22c55e" opacity="0.8"/>
  <text x="50" y="134" text-anchor="middle" fill="white" font-size="8">👤</text>
  <circle cx="170" cy="130" r="12" fill="#22c55e" opacity="0.8"/>
  <text x="170" y="134" text-anchor="middle" fill="white" font-size="8">👤</text>
  <circle cx="290" cy="130" r="12" fill="#22c55e" opacity="0.8"/>
  <text x="290" y="134" text-anchor="middle" fill="white" font-size="8">👤</text>
  <line x1="50" y1="118" x2="50" y2="100" stroke="#22c55e" stroke-width="1.2"/>
  <line x1="170" y1="118" x2="170" y2="97" stroke="#22c55e" stroke-width="1.2"/>
  <line x1="290" y1="118" x2="292" y2="100" stroke="#22c55e" stroke-width="1.2"/>
  <text x="170" y="150" text-anchor="middle" fill="#64748b" font-size="9">Nearest PoP via Anycast/DNS geo-routing</text>
</svg>`,
      },
    },

    {
      q: "Design Uber's real-time matching system. A rider requests a trip; a driver must be matched within 3 seconds. What is the core data structure and algorithm for finding the nearest available driver?",
      opts: [
        "Scan all drivers in the database for minimum distance — O(n) per request",
        "Geohash-based spatial indexing: encode coordinates into geohashes, store in a key-value store, search nearby cells",
        "Graph BFS from rider's node to all driver nodes",
        "ML model predicting driver locations — precompute matches",
      ],
      ans: "Geohash-based spatial indexing: encode coordinates into geohashes, store in a key-value store, search nearby cells",
      cat: "System Design",
      exp: "Step 1: Scanning all drivers is O(n) per request — unacceptable with millions of drivers globally.<br/>Step 2: Geohash encodes 2D (lat, lon) into a 1D string. Nearby locations share common prefixes — a 6-character geohash covers ~1.2km × 0.6km cell.<br/>Step 3: Each driver's location update → compute geohash → store in Redis (key = geohash, value = set of driver IDs).<br/>Step 4: For a ride request: compute rider's geohash → search that cell + 8 surrounding cells → retrieve nearby driver IDs → filter by availability → sort by actual distance/ETA.<br/>Step 5: If no drivers in 9 cells, expand to 5-character geohash (larger cell) and retry.<br/>Step 6: Additionally, Uber uses a Dispatch system that maintains driver positions in an in-memory geo-index updated via WebSockets every few seconds.<br/>✅ Geohash + Redis: O(1) amortized location update, O(k) nearby search where k=drivers in nearby cells.",
    },

    {
      q: "CAP Theorem: a distributed system can guarantee at most 2 of 3 properties. You're designing a financial transaction system (bank transfers). Which properties do you prioritize?",
      opts: [
        "Availability + Partition Tolerance (AP) — always respond, possibly stale data",
        "Consistency + Partition Tolerance (CP) — correct but may be unavailable during partitions",
        "Consistency + Availability (CA) — not possible in real distributed systems (assumes no network partitions)",
        "All three — CAP theorem is just theoretical, not practical",
      ],
      ans: "Consistency + Partition Tolerance (CP) — correct but may be unavailable during partitions",
      cat: "System Design",
      exp: "Step 1: CAP Theorem (Brewer, 2000): Consistency (every read gets the most recent write), Availability (every request gets a response), Partition Tolerance (system works despite network splits).<br/>Step 2: In real distributed systems, network partitions WILL happen. So you must choose between C and A during a partition.<br/>Step 3: For banking/financial systems: Consistency is non-negotiable. Showing a stale balance could cause overdrafts, double-spends, or regulatory violations.<br/>Step 4: CP system: during a network partition, some nodes refuse requests (become unavailable) rather than return potentially stale data. Transactions block until consistency can be guaranteed.<br/>Step 5: Banks use: 2-phase commit (2PC) for distributed transactions, Paxos/Raft consensus algorithms, ACID-compliant databases (PostgreSQL, Oracle).<br/>Step 6: Example: Visa/Mastercard choose CP — they'd rather decline a transaction than approve a double-spend.<br/>✅ Finance = CP. Social media = AP. E-commerce = depends (cart: AP; checkout: CP).",
    },

    {
      q: "Sharding strategy for a database with 1 billion users. You choose to shard by user_id. What is the major problem and how do you solve it?",
      opts: [
        "No problem — hash-based sharding is always optimal",
        "Hot spots: users with high-frequency access (celebrities) overwhelm specific shards; solution: consistent hashing + virtual nodes",
        "Data loss risk — solved by replication only",
        "SQL queries become impossible — must switch to NoSQL",
      ],
      ans: "Hot spots: users with high-frequency access (celebrities) overwhelm specific shards; solution: consistent hashing + virtual nodes",
      cat: "System Design",
      exp: "Step 1: Simple hash sharding (shard = user_id % N): adding/removing shards requires remapping all keys → massive data migration.<br/>Step 2: Hot spot problem: a celebrity with millions of followers triggers millions of queries to one shard → shard becomes a bottleneck.<br/>Step 3: Solution A — Consistent Hashing: arrange shards on a hash ring. Adding/removing shards only remaps ~K/N keys (K=total keys, N=shards). Reduces remapping from O(K) to O(K/N).<br/>Step 4: Solution B — Virtual Nodes: each physical shard is represented by multiple virtual nodes on the ring (e.g., 150 vnodes per shard). This distributes hot keys more evenly and allows fine-grained load balancing.<br/>Step 5: Solution C — Application-level sharding for celebrities: detect high-traffic users and replicate their data across multiple shards, routing reads to any replica.<br/>Step 6: Used in: Cassandra, DynamoDB, Redis Cluster — all use consistent hashing with virtual nodes.<br/>✅ Consistent hashing + virtual nodes: solves resharding overhead and distributes hot keys more evenly.",
    },

    {
      q: "Design a Distributed Cache (like Memcached/Redis). What happens when a cache node fails, and how do you handle cache stampede (thundering herd)?",
      opts: [
        "Node failure: all traffic falls to DB — stampede: accept it as temporary overload",
        "Node failure: consistent hashing reroutes to next node; stampede: use mutex/semaphore (probabilistic early expiration or Redis SET NX with TTL)",
        "Node failure: restart the node — stampede: increase TTL to prevent expiry",
        "Node failure: return errors to clients — stampede: queue all requests",
      ],
      ans: "Node failure: consistent hashing reroutes to next node; stampede: use mutex/semaphore (probabilistic early expiration or Redis SET NX with TTL)",
      cat: "System Design",
      exp: "Step 1: Cache node failure with consistent hashing: the failed node's portion of the keyspace is automatically handled by the next node on the ring → cache miss → DB query → repopulate. Graceful degradation.<br/>Step 2: Cache stampede (thundering herd): when a popular cached item expires, thousands of simultaneous requests all miss the cache and hammer the DB simultaneously.<br/>Step 3: Solution 1 — Mutex/Lock: first request that misses the cache acquires a lock (Redis SET NX with TTL), fetches from DB, populates cache, releases lock. Other requests wait and retry → only one DB query.<br/>Step 4: Solution 2 — Probabilistic Early Expiration: before the TTL expires, probabalistically (random chance based on remaining TTL) one request recomputes and refreshes the cache → no cliff-edge expiration.<br/>Step 5: Solution 3 — Background refresh: cache item is never truly 'expired' — a background thread refreshes it before expiry (stale-while-revalidate pattern).<br/>Step 6: In practice: combine replica failover (Redis Sentinel/Cluster) for node failure + mutex locking or background refresh for stampede.<br/>✅ Node failure: consistent hashing + replicas. Stampede: mutex (SET NX) or probabilistic early refresh.",
    },

    {
      q: "Design a Search Engine's indexing pipeline. A web crawl finds 10 billion documents. How do you build an inverted index at this scale?",
      opts: [
        "One large server with sorted map — simple but physically impossible at scale",
        "MapReduce: Map phase tokenizes documents (word→docID pairs), Reduce phase aggregates (word→list of docIDs), producing distributed inverted index shards",
        "Store all documents in a relational DB with LIKE queries",
        "Use trie to index all documents on a single machine",
      ],
      ans: "MapReduce: Map phase tokenizes documents (word→docID pairs), Reduce phase aggregates (word→list of docIDs), producing distributed inverted index shards",
      cat: "System Design",
      exp: "Step 1: 10 billion documents cannot fit on one machine — distributed processing is mandatory.<br/>Step 2: Map phase: for each document, emit (word, docID, position, TF) pairs after stemming, stop-word removal, and tokenization.<br/>Step 3: Shuffle/Sort: all pairs for the same word are grouped together across machines.<br/>Step 4: Reduce phase: for each word, aggregate all (docID, position, TF) tuples → posting list. Compute IDF (Inverse Document Frequency) from total doc count.<br/>Step 5: Result: distributed inverted index shards (each shard covers a subset of the vocabulary) stored on distributed file systems (GFS/HDFS).<br/>Step 6: Ranking: TF-IDF, PageRank (separate graph computation), BM25 — applied at query time or pre-scored.<br/>Step 7: Google's original MapReduce paper (Dean & Ghemawat, 2004) described exactly this pipeline.<br/>✅ MapReduce inverted index: parallel tokenization + distributed aggregation = petabyte-scale indexing.",
    },

    {
      q: "Eventual vs Strong Consistency — give a concrete example of when each is acceptable in a single system (e.g., Twitter).",
      opts: [
        "Strong consistency everywhere — always safe, worth the latency",
        "Eventual: tweet like counts (stale by seconds is OK); Strong: login/auth tokens (stale auth = security breach)",
        "Eventual: bank balance; Strong: social media posts",
        "Consistency type doesn't matter if you have enough replicas",
      ],
      ans: "Eventual: tweet like counts (stale by seconds is OK); Strong: login/auth tokens (stale auth = security breach)",
      cat: "System Design",
      exp: "Step 1: Strong Consistency: every read reflects the most recent write. Requires synchronous replication → higher latency (cross-datacenter: 50-150ms round trip).<br/>Step 2: Eventual Consistency: after some time, all replicas converge. Reads may return stale data temporarily → lower latency (local reads).<br/>Step 3: Twitter like count: showing 1,847,329 vs 1,847,331 likes is imperceptible to users. Use eventual consistency → update counts asynchronously, replicate lazily → fast reads from nearby replica.<br/>Step 4: Auth tokens: if a user logs out (invalidating their token) and the invalidation hasn't propagated, an attacker can still use the old token → security breach. Use strong consistency for auth.<br/>Step 5: Other eventual consistency examples: DNS propagation (minutes), social media follower counts, product view counts in e-commerce.<br/>Step 6: Other strong consistency examples: financial transactions, inventory counts at checkout (prevent overselling), user profile writes (race conditions).<br/>✅ Design insight: use the WEAKEST consistency model that still meets business requirements — minimizes latency and maximizes availability.",
    },

    {
      q: "Designing a rate limiter for an API (100 requests/minute per user). The system is distributed across 5 servers. What algorithm and storage approach handles this correctly?",
      opts: [
        "In-memory counter per server — but 5 servers each allow 100 req = 500 total, not 100",
        "Token bucket/sliding window counter in centralized Redis with atomic INCR + EXPIRE commands",
        "Reject after first server gets 20 requests (100/5) — unfair distribution",
        "Per-IP local rate limiting — doesn't account for distributed nature",
      ],
      ans: "Token bucket/sliding window counter in centralized Redis with atomic INCR + EXPIRE commands",
      cat: "System Design",
      exp: "Step 1: Per-server counters fail: each of 5 servers allows 100 req/min → a client can make 500 requests by distributing across servers.<br/>Step 2: Centralized Redis solution: use a key 'rate:{user_id}:{minute_bucket}' with atomic INCR. If count > 100, reject with 429 Too Many Requests. SET EXPIRE to auto-clear after 1 minute.<br/>Step 3: Token Bucket algorithm: bucket holds max N tokens. Refilled at rate r tokens/second. Each request consumes 1 token. Allows bursting up to N, then enforces rate r.<br/>Step 4: Sliding Window Counter: split time into fixed windows (e.g., 1-minute buckets). For a request at time t, count = current_window_count + previous_window_count × (overlap fraction). Smoother than fixed windows.<br/>Step 5: Redis Lua scripts for atomic check-and-increment (prevent race conditions).<br/>Step 6: For massive scale: use Redis Cluster with rate limit keys hashed to appropriate shards. Accept slight over-limit due to eventual consistency across shards (acceptable for most use cases).<br/>✅ Centralized Redis + sliding window: consistent rate limiting across all servers.",
    },

    {
      q: "In a microservices architecture, Service A calls Service B which calls Service C. Service C goes down. What patterns prevent a cascading failure that takes down A and B?",
      opts: [
        "Retry immediately in a loop until C recovers",
        "Circuit Breaker + Bulkhead + Timeout patterns",
        "Synchronously wait for C to recover — eventual consistency will handle it",
        "Remove services B and C — monolith is more resilient",
      ],
      ans: "Circuit Breaker + Bulkhead + Timeout patterns",
      cat: "System Design",
      exp: "Step 1: Without protection: C fails → B's threads block waiting for C → B exhausts thread pool → A's calls to B block → A exhausts thread pool → cascading failure.<br/>Step 2: Timeout: set aggressive timeouts on all calls (e.g., 500ms for C). After timeout, fail fast instead of holding the connection.<br/>Step 3: Circuit Breaker (Martin Fowler): monitor failure rate. If failures exceed threshold (e.g., 50% in 10 seconds) → 'Open' state: all calls to C fail immediately (no network call). After cooldown → 'Half-Open': try one probe request → if success, 'Closed'.<br/>Step 4: Bulkhead: isolate thread pools per downstream service. Service B has separate thread pools for C1, C2, C3. If C1 fails and its pool is exhausted, C2 and C3 are unaffected.<br/>Step 5: Fallback: when Circuit Breaker is open, return cached data, default values, or degraded response instead of error.<br/>Step 6: Implemented in: Netflix Hystrix (now Resilience4j), Istio (service mesh), AWS SDK retry/backoff.<br/>✅ Circuit Breaker + Bulkhead + Timeout + Fallback = resilient microservices against cascading failures.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 135" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="135" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="11" fill="currentColor">Circuit Breaker State Machine</text>
  <!-- States -->
  <circle cx="60" cy="75" r="28" fill="#22c55e" opacity="0.8"/><text x="60" y="71" text-anchor="middle" fill="white" font-weight="bold">CLOSED</text><text x="60" y="83" text-anchor="middle" fill="white" font-size="8">Normal</text>
  <circle cx="170" cy="75" r="28" fill="#f59e0b" opacity="0.8"/><text x="170" y="71" text-anchor="middle" fill="white" font-weight="bold">HALF</text><text x="170" y="83" text-anchor="middle" fill="white" font-size="8">OPEN</text>
  <circle cx="280" cy="75" r="28" fill="#ef4444" opacity="0.8"/><text x="280" y="71" text-anchor="middle" fill="white" font-weight="bold">OPEN</text><text x="280" y="83" text-anchor="middle" fill="white" font-size="8">Fail Fast</text>
  <!-- Transitions -->
  <path d="M88,65 Q130,30 142,65" fill="none" stroke="#ef4444" stroke-width="1.5" marker-end="url(#ra)"/>
  <text x="118" y="40" text-anchor="middle" fill="#ef4444" font-size="8">Failures>threshold</text>
  <path d="M198,65 Q240,30 252,65" fill="none" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ra)"/>
  <text x="228" y="40" text-anchor="middle" fill="#22c55e" font-size="8">Probe fails</text>
  <path d="M198,85 Q240,120 88,85" fill="none" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ra)"/>
  <text x="145" y="120" text-anchor="middle" fill="#22c55e" font-size="8">Probe succeeds → reset</text>
  <path d="M252,85 Q230,108 198,85" fill="none" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ra)"/>
  <text x="228" y="108" text-anchor="middle" fill="#f59e0b" font-size="8">cooldown</text>
  <defs><marker id="ra" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>`,
      },
    },

    {
      q: "Design a global leaderboard for a game with 100 million players. Rankings update in real-time. What data structure and DB choice enables O(log n) rank update and O(1) rank query?",
      opts: [
        "Sort all 100M records in a relational DB — O(n log n) per update",
        "Redis Sorted Set (ZSET): O(log n) ZADD for score update, O(1) ZRANK for rank query",
        "Heap in memory — doesn't persist and can't distribute",
        "Cassandra with ALLOW FILTERING — works but O(n) scans",
      ],
      ans: "Redis Sorted Set (ZSET): O(log n) ZADD for score update, O(1) ZRANK for rank query",
      cat: "System Design",
      exp: "Step 1: Relational DB ORDER BY queries scan all rows or require index scans → too slow for real-time global ranking of 100M players.<br/>Step 2: Redis Sorted Set (ZSET) uses a skip list + hash map internally: ZADD updates a player's score in O(log n); ZRANK returns the rank (0-indexed position) in O(log n); ZSCORE returns score in O(1).<br/>Step 3: For 100M players: a single Redis instance can hold ~100M ZSET members (each ~80 bytes → ~8GB RAM). ZRANGE to get top 100 players: O(100) = O(1) practical.<br/>Step 4: Sharding: for extreme scale, shard by score range (e.g., shard 1: top 10%, shard 2: next 20%) or by user ID prefix with a merging layer for global rank.<br/>Step 5: Persistence: Redis AOF (Append-Only File) or RDB snapshots for durability. Redis Cluster for HA.<br/>Step 6: Used in: Fortnite, PUBG, League of Legends leaderboards.<br/>✅ Redis ZSET: O(log n) update, O(log n) rank query — real-time leaderboard at scale.",
    },

    {
      q: "You're designing a message queue (like Kafka). A consumer reads messages slower than they arrive. What happens and how does Kafka handle back-pressure?",
      opts: [
        "Kafka drops messages when consumer is slow",
        "Kafka stores messages durably on disk (log-structured); consumers read at their own pace via offsets — back-pressure is naturally handled by the pull model",
        "Kafka blocks the producer until consumer catches up",
        "Kafka switches to in-memory storage when disk is full",
      ],
      ans: "Kafka stores messages durably on disk (log-structured); consumers read at their own pace via offsets — back-pressure is naturally handled by the pull model",
      cat: "System Design",
      exp: "Step 1: Traditional message queues (RabbitMQ push model): broker pushes messages to consumers. Slow consumer → broker buffers in RAM → RAM overflow → crashes or drops messages.<br/>Step 2: Kafka's pull model: consumers poll for messages when ready. Kafka stores all messages on disk (log-structured storage, sequential writes → fast).<br/>Step 3: Each consumer maintains an 'offset' — the position of the next message to read. Consumer reads at its own pace, offset advances only when consumer commits.<br/>Step 4: Back-pressure is naturally handled: slow consumer just has a lagging offset. No blocking of producers. Disk retention (configurable: e.g., 7 days) allows consumer to catch up.<br/>Step 5: If consumer lag grows too large (partition lag monitoring), scale consumers horizontally: add more consumer instances in the same consumer group → partition rebalancing → parallelism.<br/>Step 6: Kafka's sequential disk I/O (append-only log) achieves near-RAM speeds on SSDs.<br/>✅ Kafka pull model + log-structured disk storage = inherent back-pressure handling without dropping messages.",
    },

    {
      q: "Design Twitter's home timeline. When User A (10M followers) posts a tweet, how do you ensure all 10M followers see it in their timeline within seconds?",
      opts: [
        "On each follower's request, query A's tweets — pull model, always fresh but O(followers_count) per load",
        "Fan-out on write: push tweet to all 10M followers' timeline caches immediately — fast reads but write amplification",
        "Fan-out on read (for celebrities) + fan-out on write (for regular users) — hybrid approach",
        "Store all tweets in one global feed sorted by timestamp",
      ],
      ans: "Fan-out on read (for celebrities) + fan-out on write (for regular users) — hybrid approach",
      cat: "System Design",
      exp: "Step 1: Pull model (fan-out on read): when a user loads their timeline, query all followees' tweets and merge → O(followees) queries per load → too slow for users following 1000+ accounts.<br/>Step 2: Push model (fan-out on write): when a tweet is posted, push to all followers' precomputed timeline caches → O(1) timeline load but O(followers) writes per tweet. For celebrities: 10M writes per tweet → write bottleneck.<br/>Step 3: Twitter's hybrid solution: Regular users (< threshold followers) → fan-out on write. Celebrities (millions of followers) → fan-out on read: their tweets are NOT pushed to individual caches; when a follower loads their timeline, celebrity tweets are fetched and merged in real-time.<br/>Step 4: Timeline cache: Redis or Memcached storing list of tweet IDs (not full tweet content) per user. Timeline load = fetch cached IDs + hydrate with tweet content.<br/>Step 5: This balances write amplification (no 10M writes for celebrity tweets) with read cost (one extra query for celebrity tweets per timeline load).<br/>✅ Hybrid fan-out: write for regular users + read for celebrities = optimal at scale.",
    },

    {
      q: "What is the difference between horizontal and vertical scaling, and when does horizontal scaling become HARDER than vertical scaling?",
      opts: [
        "Horizontal always outperforms vertical — just add more servers",
        "Horizontal: add more machines; vertical: upgrade one machine. Horizontal becomes harder for stateful systems (sessions, transactions) requiring distributed coordination",
        "Vertical scaling is always better — no network overhead",
        "They are equivalent in all scenarios",
      ],
      ans: "Horizontal: add more machines; vertical: upgrade one machine. Horizontal becomes harder for stateful systems (sessions, transactions) requiring distributed coordination",
      cat: "System Design",
      exp: "Step 1: Vertical scaling (scale-up): add CPU/RAM/SSD to existing server. Simple (no code changes), but has physical limits and creates single point of failure. Cost grows superlinearly.<br/>Step 2: Horizontal scaling (scale-out): add more servers behind a load balancer. Theoretically unlimited, handles failures gracefully, cost grows linearly.<br/>Step 3: Horizontal scaling challenges: Stateful services — user sessions, in-progress transactions must be routed to the same server (sticky sessions) or shared via external store (Redis for sessions).<br/>Step 4: Distributed transactions — ACID transactions across multiple servers require 2PC or Saga patterns → complexity and latency.<br/>Step 5: Data consistency — maintaining consistent data across servers requires consensus (Paxos/Raft) or accepting eventual consistency.<br/>Step 6: Horizontal scales well for: stateless HTTP servers, CDN edge nodes, read replicas. Hard for: relational databases with complex transactions, single-master systems.<br/>Step 7: Modern cloud: stateless services scale horizontally (Kubernetes); databases use a combination (read replicas horizontal, primary vertical).<br/>✅ Horizontal scaling is hard for stateful, transactional, or tightly-coordinated systems.",
    },

    {
      q: "Designing a URL shortener (like bit.ly). 100M URLs shortened daily, 10B redirects daily. What are the key design decisions?",
      opts: [
        "One server, one DB — simple key-value store",
        "Base62 encoding of auto-increment ID; distributed ID generator; read-heavy optimized with CDN + cache; DB sharded by short_url",
        "Store full URLs in URL parameters — no shortening needed",
        "MD5 hash of full URL as short code — simple but collisions possible",
      ],
      ans: "Base62 encoding of auto-increment ID; distributed ID generator; read-heavy optimized with CDN + cache; DB sharded by short_url",
      cat: "System Design",
      exp: "Step 1: Short URL generation: auto-increment ID → encode in Base62 (0-9, a-z, A-Z) → 7 characters = 62^7 ≈ 3.5 trillion unique URLs.<br/>Step 2: Distributed ID generation: cannot use single auto-increment (bottleneck). Use: Twitter Snowflake IDs (timestamp + machine ID + sequence) or pre-generated ID pools.<br/>Step 3: Read/write ratio: 10B redirects vs 100M writes = 100:1 read-heavy. Optimize for reads.<br/>Step 4: Caching: Memcached/Redis cache for hot URLs (80/20 rule: 20% URLs = 80% traffic). CDN for geographic distribution — redirect at edge.<br/>Step 5: DB: NoSQL (Cassandra/DynamoDB) for horizontal scaling of key-value lookups. Sharding by short_url hash for even distribution.<br/>Step 6: Redirect: HTTP 301 (permanent, browser caches = fewer server hits) vs 302 (temporary, every access hits server = better analytics).<br/>Step 7: Analytics: Kafka for click events → Spark/Flink for real-time processing → ClickHouse/BigQuery for dashboards.<br/>✅ URL shortener: Base62 IDs + distributed ID gen + aggressive caching + read-optimized sharded DB.",
    },

    {
      q: "In database design, explain the difference between OLTP and OLAP systems and why they need different storage architectures.",
      opts: [
        "OLTP and OLAP are interchangeable terms for database systems",
        "OLTP: row-oriented storage for fast single-record reads/writes; OLAP: column-oriented storage for fast aggregate queries over many rows",
        "OLTP uses NoSQL; OLAP uses SQL — that's the only difference",
        "OLAP is just a cached version of OLTP data",
      ],
      ans: "OLTP: row-oriented storage for fast single-record reads/writes; OLAP: column-oriented storage for fast aggregate queries over many rows",
      cat: "System Design",
      exp: "Step 1: OLTP (Online Transaction Processing): high volume of short, transactional queries. Pattern: INSERT/UPDATE one row at a time, point lookups by primary key. Example: 'Process order #12345' — needs columns: order_id, user_id, amount, status.<br/>Step 2: Row-oriented storage is optimal for OLTP: all columns of a row are stored contiguously → reading/writing a complete row is one I/O operation.<br/>Step 3: OLAP (Online Analytical Processing): complex aggregate queries over millions of rows. Pattern: SELECT SUM(revenue), AVG(age) FROM orders WHERE date > '2025-01' GROUP BY country — only needs 2-3 columns out of 50.<br/>Step 4: Column-oriented storage is optimal for OLAP: each column stored contiguously → reading only needed columns reduces I/O by 10-50x. Also enables better compression (same-type values → higher repetition).<br/>Step 5: Examples: OLTP → PostgreSQL, MySQL. OLAP → Redshift, BigQuery, Snowflake, ClickHouse (all columnar).<br/>Step 6: Modern systems: HTAP (Hybrid Transaction/Analytical Processing) like TiDB, SingleStore try to do both — using different storage for each workload type internally.<br/>✅ OLTP: row store (fast single row I/O). OLAP: column store (fast aggregate scans). Different workloads → different storage layouts.",
    },

    {
      q: "Consistent hashing is used in distributed caches. Explain what 'virtual nodes' solve and the mathematical guarantee they provide.",
      opts: [
        "Virtual nodes reduce memory usage per physical node",
        "Virtual nodes improve load distribution: each physical node maps to K virtual nodes on the ring, ensuring O(1/N) load per node with high probability, reducing hotspots from uneven spacing",
        "Virtual nodes add security by hiding actual node identities",
        "Virtual nodes are only needed when nodes have different hardware capacities",
      ],
      ans: "Virtual nodes improve load distribution: each physical node maps to K virtual nodes on the ring, ensuring O(1/N) load per node with high probability, reducing hotspots from uneven spacing",
      cat: "System Design",
      exp: "Step 1: Basic consistent hashing: N nodes placed at random positions on a hash ring. Each key maps to the next clockwise node. Problem: with few nodes (e.g., N=5), random placement creates uneven arcs → some nodes get significantly more load than others.<br/>Step 2: Statistical problem: with N nodes, the expected load variance is O(log N / N) but worst-case deviation can be O(log N) times the mean — a node could get 3x average load.<br/>Step 3: Virtual nodes solution: each physical node P is represented by K virtual nodes (V_P1, V_P2, ..., V_PK) placed at K random positions on the ring. K=150-200 is typical.<br/>Step 4: Mathematical guarantee: with K virtual nodes per physical node, the load on each node is within (1 ± O(log(NK) / √K)) of the mean with high probability. For K=150: near-uniform distribution.<br/>Step 5: Additional benefit: when a node is added/removed, K arcs are redistributed → smoother rebalancing and fine-grained control of migration.<br/>Step 6: Hardware heterogeneity: more powerful nodes get more virtual nodes (proportional to capacity).<br/>✅ Virtual nodes: O(K) random positions per physical node → near-uniform load distribution, smooth resharding.",
    },

    {
      q: "Design a notification system for a social platform (like Instagram) sending 1 billion push notifications daily. What are the key architectural components?",
      opts: [
        "Single server sending all notifications sequentially",
        "Event-driven: notification events → message queue (Kafka) → notification workers → device-specific gateway (APNs/FCM) → mobile devices; with priority lanes and batch sending",
        "Direct DB polling from mobile apps every 5 seconds",
        "Send all notifications via email as backup",
      ],
      ans: "Event-driven: notification events → message queue (Kafka) → notification workers → device-specific gateway (APNs/FCM) → mobile devices; with priority lanes and batch sending",
      cat: "System Design",
      exp: "Step 1: 1B notifications/day = ~11,600/second average. Cannot handle synchronously — must be async and distributed.<br/>Step 2: Event production: application service emits notification events to Kafka topics (e.g., 'like-notifications', 'comment-notifications', 'dm-notifications').<br/>Step 3: Priority lanes: real-time (DMs, calls) → high priority Kafka topic → low-latency workers. Bulk (marketing campaigns) → low priority topic → batched workers.<br/>Step 4: Notification workers: consumer groups of worker services read from Kafka, deduplicate (don't send duplicate notifications), check user preferences (opted out?), enrich with user data.<br/>Step 5: Device-specific gateways: iOS → Apple Push Notification Service (APNs); Android → Firebase Cloud Messaging (FCM); Web → WebPush. Workers call these APIs.<br/>Step 6: Failure handling: APNs/FCM returns delivery status. Failed notifications → retry queue with exponential backoff. Track notification delivery in Cassandra (notif_id, user_id, status, timestamp).<br/>Step 7: Rate limiting: avoid flooding users — deduplicate similar notifications within time windows (group 10 likes into '10 people liked your photo').<br/>✅ Kafka + priority lanes + device gateways + retry + deduplication = 1B notifications/day architecture.",
    },

    {
      q: "Explain the Saga pattern for distributed transactions. When is it preferred over 2-Phase Commit (2PC)?",
      opts: [
        "2PC is always preferred — it's simpler and faster",
        "Saga: sequence of local transactions with compensating transactions for rollback. Preferred when: services are autonomous, long-running transactions, microservices (2PC creates coupling and blocking)",
        "Saga is a NoSQL pattern; 2PC is SQL-only",
        "They are equivalent — choose based on team preference",
      ],
      ans: "Saga: sequence of local transactions with compensating transactions for rollback. Preferred when: services are autonomous, long-running transactions, microservices (2PC creates coupling and blocking)",
      cat: "System Design",
      exp: "Step 1: 2-Phase Commit: Phase 1 — coordinator asks all participants 'can you commit?' → all respond 'yes'. Phase 2 — coordinator sends 'commit'. Guarantees atomicity. Problems: blocking (if coordinator fails after Phase 1, participants are stuck holding locks), tight coupling (all participants must be online and responsive).<br/>Step 2: Saga pattern: break a distributed transaction into a sequence of local transactions T1, T2, ..., Tn. Each Ti has a compensating transaction Ci that undoes Ti's effect. If Ti fails, execute Ci-1, Ci-2, ..., C1 to roll back.<br/>Step 3: Types: Choreography (each service publishes events and listens to others — decentralized, no coordinator) vs Orchestration (a central saga orchestrator directs each step — easier to monitor).<br/>Step 4: Example: 'Book flight + hotel + rental' saga. If hotel booking fails: compensating transaction cancels the already-booked flight.<br/>Step 5: Saga downsides: no isolation (other transactions can see intermediate state), complex compensating transactions, eventual consistency.<br/>Step 6: Use 2PC when: short transactions, all services in one team's control, strong ACID required (e.g., financial transfers within one DB). Use Saga when: long-running, cross-service, microservices.<br/>✅ Saga = eventual consistency for distributed workflows; 2PC = strong consistency but blocking. Choose based on isolation requirements.",
    },

    {
      q: "What is the read-repair mechanism in distributed databases (like Cassandra), and when does it trigger?",
      opts: [
        "Read-repair is triggered when writes fail — it retries the write",
        "During a read, if multiple replicas return different values (due to missed writes), the coordinator updates stale replicas with the latest value — triggered on any inconsistent read",
        "Read-repair is a background process unrelated to queries",
        "Read-repair only applies to relational databases with foreign key constraints",
      ],
      ans: "During a read, if multiple replicas return different values (due to missed writes), the coordinator updates stale replicas with the latest value — triggered on any inconsistent read",
      cat: "System Design",
      exp: "Step 1: In AP/eventually consistent systems (Cassandra, DynamoDB), writes may not reach all replicas if one is temporarily unavailable → replicas become inconsistent.<br/>Step 2: Read-repair: when a read request queries multiple replicas (quorum or all), if responses differ, the coordinator identifies the most recent value (via timestamp/vector clock) and asynchronously sends the latest value to stale replicas.<br/>Step 3: Trigger: read-repair is triggered on every read in Cassandra (synchronous repair for replicas in the read path; async for others). Configurable: ALL consistency reads always repair; QUORUM reads repair based on dcLocalReadRepairChance setting.<br/>Step 4: Hinted Handoff: complementary to read-repair. When a replica is down during a write, another node stores a 'hint' (the write). When the replica recovers, the hint is delivered → repairs missed writes proactively (before a read).<br/>Step 5: Anti-entropy repair (nodetool repair): periodic background Merkle tree comparison between replicas to detect and fix inconsistencies not caught by read-repair or hinted handoff.<br/>✅ Read-repair: lazy consistency repair triggered during reads. Hinted handoff: proactive repair after node recovery. Anti-entropy: scheduled comprehensive repair.",
    },

    {
      q: "Why is it important to use idempotency keys in payment APIs, and how are they typically implemented?",
      opts: [
        "Idempotency keys are only needed for GET requests",
        "Prevent duplicate charges: client sends unique idempotency_key with each payment; server stores (key → result) in DB; if retried with same key, return stored result without re-processing",
        "Idempotency keys encrypt the payment data for security",
        "They replace authentication tokens in modern payment systems",
      ],
      ans: "Prevent duplicate charges: client sends unique idempotency_key with each payment; server stores (key → result) in DB; if retried with same key, return stored result without re-processing",
      cat: "System Design",
      exp: "Step 1: Problem: network failures can cause clients to retry requests. Without idempotency: 'Charge $100' retried 3 times → 3 charges of $100 → customer overcharged.<br/>Step 2: Idempotency key: client generates a unique UUID per logical operation (e.g., 'order-12345-payment-attempt-1'). Included in API request header or body.<br/>Step 3: Server-side: on receiving payment request with idempotency_key, first check DB: SELECT result FROM idempotency_keys WHERE key = ?. If found → return cached result (no re-processing). If not found → process payment → store (key, result, expiry) → return result.<br/>Step 4: Atomicity: the check-and-store must be atomic. Use DB transactions or Redis SETNX (set if not exists) to prevent race conditions (two simultaneous retries).<br/>Step 5: Expiry: idempotency keys are stored for a limited time (e.g., 24 hours). After expiry, a new request with the same key is treated as a fresh request.<br/>Step 6: Stripe, PayPal, Square all require idempotency keys for payment APIs. Stripe uses them for all POST requests.<br/>✅ Idempotency keys: (key → result) DB mapping + atomic check-and-store = safe payment retries.",
    },

    {
      q: "Design a distributed job scheduler (like AWS Batch or Kubernetes Jobs). How do you handle: job assignment, deduplication, and exactly-once execution?",
      opts: [
        "Single scheduler assigns jobs; no distributed complexity needed",
        "Distributed leader election (Raft/Zookeeper) for scheduler; job state machine in DB (pending→assigned→running→done); heartbeat + timeout for failure detection; idempotent job execution with deduplication key",
        "Each worker independently picks jobs from DB — first-come-first-served",
        "Use a global mutex for all job assignments",
      ],
      ans: "Distributed leader election (Raft/Zookeeper) for scheduler; job state machine in DB (pending→assigned→running→done); heartbeat + timeout for failure detection; idempotent job execution with deduplication key",
      cat: "System Design",
      exp: "Step 1: Leader election: use ZooKeeper ephemeral nodes or Raft consensus to elect a scheduler leader. If leader fails, election happens within seconds. Only the leader assigns jobs → no duplicate assignment (single assigner).<br/>Step 2: Job state machine in DB: PENDING → ASSIGNED (atomic UPDATE WHERE status='PENDING' LIMIT 1 → prevents two workers claiming same job) → RUNNING → SUCCEEDED/FAILED.<br/>Step 3: Heartbeat: running workers send heartbeats every N seconds. If heartbeat stops (worker crashed), scheduler detects timeout and resets job to PENDING for reassignment.<br/>Step 4: Exactly-once challenge: network failures can cause job to run on two workers. Solution: idempotent jobs (safe to run multiple times) + deduplication key in output storage.<br/>Step 5: If true exactly-once required: distributed lock (Redis SETNX or ZooKeeper lock) around critical section; worker acquires lock before executing, holds during execution, releases on completion.<br/>Step 6: Kubernetes uses etcd (Raft-based) for state; PostgreSQL advisory locks for job claiming; controller reconciliation loops for failure recovery.<br/>✅ Distributed scheduler: leader election + atomic DB state machine + heartbeat + idempotent jobs = reliable job execution.",
    },

    {
      q: "You need to store 100TB of log data, query it by time range and service name, and retain it for 1 year. What storage tier and query strategy is appropriate?",
      opts: [
        "Store everything in PostgreSQL — standard RDBMS handles all use cases",
        "Hot tier (Elasticsearch/OpenSearch for recent 30 days, full-text search + index), warm tier (S3 + Parquet + Athena for 30d-1yr, SQL queries on object storage), cold tier (Glacier for compliance/archival)",
        "Write all logs to a single Redis instance",
        "Use a blockchain for immutable log storage",
      ],
      ans: "Hot tier (Elasticsearch/OpenSearch for recent 30 days, full-text search + index), warm tier (S3 + Parquet + Athena for 30d-1yr, SQL queries on object storage), cold tier (Glacier for compliance/archival)",
      cat: "System Design",
      exp: "Step 1: 100TB total, ~8TB/month. Recent logs are queried frequently (debugging); old logs rarely queried (compliance). Different access patterns → different storage tiers.<br/>Step 2: Hot tier (0-30 days): Elasticsearch/OpenSearch cluster. Inverted index on log fields (timestamp, service, log_level, trace_id). Full-text search in milliseconds. Cost: ~$5-10/TB/month for EC2+EBS.<br/>Step 3: Warm tier (30 days - 1 year): convert logs to columnar Parquet format, compress (Snappy/Zstd, typically 10:1 ratio for logs → 100TB raw = ~10TB Parquet), store in S3 ($0.023/GB/month). Query with Amazon Athena (serverless SQL on S3) or Apache Spark. Queries take seconds to minutes — acceptable for historical analysis.<br/>Step 4: Cold tier (archive): S3 Glacier ($0.004/GB/month, 3-5 hour retrieval) for regulatory compliance retention beyond what's needed operationally.<br/>Step 5: Data pipeline: logs → Kafka → Flink (real-time enrichment, parsing) → Elasticsearch (hot) + S3 writer (warm).<br/>Step 6: This is the architecture of Datadog, Splunk, and AWS CloudWatch Logs Insights.<br/>✅ Tiered storage: hot (Elasticsearch), warm (S3+Parquet+Athena), cold (Glacier) — balances cost and query performance.",
    },

    {
      q: "What is the difference between optimistic and pessimistic locking in databases, and when should each be used?",
      opts: [
        "They are the same — just different names for database locks",
        "Pessimistic: lock rows before reading/writing (prevents concurrent modification, blocks others); Optimistic: no lock, check version/timestamp at commit (retry on conflict). Pessimistic for high contention; Optimistic for low contention/read-heavy",
        "Optimistic locking is always faster — use it everywhere",
        "Pessimistic locking is only for NoSQL databases",
      ],
      ans: "Pessimistic: lock rows before reading/writing (prevents concurrent modification, blocks others); Optimistic: no lock, check version/timestamp at commit (retry on conflict). Pessimistic for high contention; Optimistic for low contention/read-heavy",
      cat: "System Design",
      exp: "Step 1: Pessimistic locking: acquire lock BEFORE reading/modifying. Other transactions wanting the same row are blocked until lock is released. SQL: SELECT ... FOR UPDATE. Guarantees no lost updates. Downside: deadlock risk, reduces concurrency, blocks other transactions.<br/>Step 2: Optimistic locking: read row (no lock) + record version number. At commit: verify version hasn't changed (UPDATE WHERE id=? AND version=?). If version changed (someone else modified): rollback and retry. Downside: retry overhead under high contention.<br/>Step 3: Use pessimistic when: high contention (many concurrent writes to same rows), long transactions (holding optimistic state for too long increases retry risk), critical sections (inventory decrement, seat booking).<br/>Step 4: Use optimistic when: low contention (most reads, few writes to same row), short transactions (quick check-and-update), distributed systems (cross-service, can't hold DB locks across network calls).<br/>Step 5: Example: bank account transfer → pessimistic (high contention, critical). User profile update → optimistic (rare conflicts, simple retry).<br/>Step 6: Hibernate uses optimistic locking via @Version annotation; PostgreSQL SELECT FOR UPDATE for pessimistic.<br/>✅ Pessimistic: block before access (high contention). Optimistic: check at commit, retry on conflict (low contention).",
    },

    {
      q: "Design WhatsApp's messaging system. Messages must be delivered in order, exactly once. One user has 200 simultaneous online devices. How?",
      opts: [
        "Broadcast message to all devices simultaneously — duplicates handled by clients",
        "Assign monotonically increasing sequence numbers per conversation; persistent device connections via WebSocket; message store with ACK tracking; client deduplication by sequence number",
        "Use email protocols (SMTP) for reliable delivery",
        "Deliver to only one device — user chooses active device",
      ],
      ans: "Assign monotonically increasing sequence numbers per conversation; persistent device connections via WebSocket; message store with ACK tracking; client deduplication by sequence number",
      cat: "System Design",
      exp: "Step 1: Ordering: assign monotonically increasing sequence numbers per conversation (using a distributed counter or DB sequence). Clients use sequence numbers to detect gaps and re-request missing messages.<br/>Step 2: Exactly-once delivery: server stores message (id, conversation_id, seq, content, delivered_to) in DB. Client sends ACK after receiving. Server marks as delivered only after ACK. No ACK within timeout → retry.<br/>Step 3: Multiple devices: WhatsApp stores a message queue per device. When user logs in on a new device, all undelivered messages are sent. Each device maintains its own ACK state.<br/>Step 4: Persistent connections: WebSocket or long-polling for real-time delivery. For offline devices: push notifications (FCM/APNs) → device wakes up → connects → receives queued messages.<br/>Step 5: Client deduplication: every message has a unique messageID. If client receives the same messageID twice (due to retry), it discards the duplicate. Deduplication window in client DB.<br/>Step 6: End-to-end encryption: Signal Protocol (used by WhatsApp) handles key exchange per device — server cannot read messages.<br/>✅ WhatsApp: sequence numbers + per-device queues + ACK tracking + client dedup = ordered exactly-once multi-device messaging.",
    },

    {
      q: "Explain the concept of 'write-ahead log' (WAL) in databases. Why must the log be written BEFORE the actual data pages?",
      opts: [
        "WAL is written after data pages — it's a post-commit audit trail",
        "WAL must be written first: if the system crashes after WAL write but before data page write, the DB can REDO the operation from the log. If data page written first and crash occurs, log may not have the operation → unrecoverable",
        "WAL is only used for replication, not crash recovery",
        "WAL writes slow down the database — most modern DBs have removed it",
      ],
      ans: "WAL must be written first: if the system crashes after WAL write but before data page write, the DB can REDO the operation from the log. If data page written first and crash occurs, log may not have the operation → unrecoverable",
      cat: "System Design",
      exp: "Step 1: WAL (Write-Ahead Log) = sequential log file recording every change (INSERT/UPDATE/DELETE) with enough info to redo or undo the change.<br/>Step 2: The 'write-ahead' rule (W-A rule): the log record for a change must be written to stable storage (fsync'd) BEFORE the corresponding data page is written to disk. Why?<br/>Step 3: Crash scenario analysis: Case A (WAL first, then crash before data page write): at recovery, replay WAL → redo the change → consistent state. Case B (data page first, then crash before WAL write): at recovery, log doesn't have this change → can't redo → data corruption/inconsistency.<br/>Step 4: Recovery process: on startup after crash, scan WAL from last checkpoint. For committed transactions not reflected in data pages → REDO. For uncommitted transactions partially in data pages → UNDO.<br/>Step 5: WAL enables: crash recovery (REDO/UNDO), replication (streaming WAL to replicas), point-in-time recovery (replay WAL from backup to specific timestamp).<br/>Step 6: Used in: PostgreSQL (pg_wal), MySQL InnoDB (redo log), SQLite (WAL mode), RocksDB (Write-Ahead Log).<br/>✅ WAL-before-data: guarantees crash recovery via REDO from log. Write data first → unrecoverable on crash.",
    },

    {
      q: "Design a recommendation engine for Netflix with NO historical user data (cold start problem). What strategies work?",
      opts: [
        "Return random content — nothing can be done without data",
        "Use content-based filtering on metadata (genre, director, cast) + demographic/context signals (location, time, device) + popularity-based fallback for truly unknown users",
        "Wait until user watches 10 items before making recommendations",
        "Copy recommendations from similar-looking users (requires their data)",
      ],
      ans: "Use content-based filtering on metadata (genre, director, cast) + demographic/context signals (location, time, device) + popularity-based fallback for truly unknown users",
      cat: "System Design",
      exp: "Step 1: Cold start problem: new user has no watch history → collaborative filtering (based on similar users) fails.<br/>Step 2: Content-based filtering: analyze content metadata (genre, director, cast, plot keywords, runtime). Build content similarity matrix. Without user history, ask onboarding questions ('What genres do you like?') → seed recommendations from answers.<br/>Step 3: Contextual signals: time of day (evening → movie; morning → short episode), device (TV → movie; mobile → short), location (regional content preferences), language settings.<br/>Step 4: Popularity-based: trending content in user's region/language is a safe default — likely to appeal to most users.<br/>Step 5: Implicit signals: even without watch history, cursor hover time, scroll depth, click-through on previews give signals within the first session. Update recommendations in real-time based on first interactions.<br/>Step 6: A/B testing: new user experience is itself a test — multiple cold-start strategies run simultaneously, measured by engagement metrics.<br/>Step 7: After 2-3 interactions: hybrid approach → blend content-based (from metadata + early signals) + emerging collaborative filtering (from partial history).<br/>✅ Cold start: content metadata + context signals + popularity + real-time first-session signals → progressive personalization.",
    },

    {
      q: "Explain 'backpressure' in distributed systems. Give a concrete example and the proper mechanism to handle it.",
      opts: [
        "Backpressure means data is lost when consumers are slow",
        "Backpressure: producer generates data faster than consumer can process. Mechanism: consumer signals its capacity to producer (reactive streams protocol); producer throttles output rate to match consumer speed",
        "Backpressure only occurs in network routers, not application systems",
        "Backpressure is solved by always using async/fire-and-forget messaging",
      ],
      ans: "Backpressure: producer generates data faster than consumer can process. Mechanism: consumer signals its capacity to producer (reactive streams protocol); producer throttles output rate to match consumer speed",
      cat: "System Design",
      exp: "Step 1: Backpressure scenario: API server receives 10,000 requests/second → sends to processing service → processing service can only handle 2,000/second → queue grows → memory fills → system crashes or starts dropping requests.<br/>Step 2: Reactive Streams protocol: consumer advertises its demand (e.g., 'I can accept 100 more items'). Producer sends exactly that many. Consumer processes them, requests more when ready. This is 'flow control' or 'credit-based flow control'.<br/>Step 3: Implementation in Kafka: consumers pull at their own rate (pull model inherently handles backpressure). Producers can never overwhelm consumers — consumers take what they can.<br/>Step 4: TCP backpressure: receiver's window size tells sender how much data to send. If receiver's buffer fills, window shrinks to 0 → sender pauses → fundamental TCP flow control.<br/>Step 5: Application-level: load shedding (reject requests beyond capacity with 429/503), circuit breaker (stop sending to overwhelmed downstream), queue with bounded buffer (block producer when full instead of growing unboundedly).<br/>Step 6: Reactive frameworks: RxJava, Project Reactor (Spring WebFlux), Akka Streams — all implement reactive streams specification with backpressure support.<br/>✅ Backpressure: consumer signals capacity → producer throttles. Prevents memory overflow and cascading failures.",
    },

    {
      q: "What is a 'database index' internally, and why does adding too many indexes slow down writes?",
      opts: [
        "Indexes are separate databases — they don't affect write performance",
        "Indexes are auxiliary data structures (B-trees, hash tables) maintained in sync with the main table. Every INSERT/UPDATE/DELETE must update ALL relevant indexes — more indexes = more write overhead",
        "Indexes only speed up reads by caching query results",
        "Indexes automatically drop and rebuild — no write overhead",
      ],
      ans: "Indexes are auxiliary data structures (B-trees, hash tables) maintained in sync with the main table. Every INSERT/UPDATE/DELETE must update ALL relevant indexes — more indexes = more write overhead",
      cat: "System Design",
      exp: "Step 1: A database index is a separate data structure that stores a subset of table columns in a sorted order (B-tree) or hash table, maintaining pointers to original rows.<br/>Step 2: B-tree index: balanced tree where leaf nodes contain (indexed_value, row_pointer). Lookup: O(log n). Range scan: O(log n + k) where k=results.<br/>Step 3: Write cost: every INSERT adds entries to all indexes on the table. Every UPDATE on indexed columns requires updating those indexes (delete old, insert new). DELETE removes entries from all indexes.<br/>Step 4: Example: table with 10 indexes. One INSERT → 1 table write + 10 index writes (each requiring B-tree node splits potentially) = 11x amplification.<br/>Step 5: Index overhead compounds: B-tree rebalancing (page splits), write-ahead log entries for each index change, increased lock contention on index pages.<br/>Step 6: Guidelines: index columns used in WHERE clauses, JOIN conditions, ORDER BY. Don't over-index write-heavy tables (logs, events). Partial indexes (WHERE status='active') for specific query patterns. Covering indexes to avoid heap lookups.<br/>✅ Each index = separate B-tree maintained in sync. More indexes → proportionally more write overhead. Trade-off: read speed vs write speed.",
    },

    {
      q: "Explain the difference between a load balancer at Layer 4 (L4) vs Layer 7 (L7) and when to use each.",
      opts: [
        "L4 and L7 load balancers are identical — just different marketing terms",
        "L4: routes based on TCP/IP (IP:port), ultra-fast, no packet inspection; L7: routes based on HTTP content (URL, headers, cookies), enables intelligent routing but higher latency",
        "L7 is always better — use L7 everywhere",
        "L4 load balancers require TLS termination; L7 cannot handle TLS",
      ],
      ans: "L4: routes based on TCP/IP (IP:port), ultra-fast, no packet inspection; L7: routes based on HTTP content (URL, headers, cookies), enables intelligent routing but higher latency",
      cat: "System Design",
      exp: "Step 1: L4 Load Balancer (Transport Layer): operates on TCP/UDP level. Sees: source IP, destination IP, source port, destination port. Routing: round-robin or least-connections by IP:port. Does NOT open packets to read content. Ultra-fast: millions of packets/second, sub-millisecond latency. Examples: AWS NLB, HAProxy (TCP mode).<br/>Step 2: L7 Load Balancer (Application Layer): terminates TCP connection, reads HTTP/HTTPS payload. Sees: URL path, HTTP method, headers, cookies, request body. Routing: /api/* → API servers; /static/* → CDN; Cookie[user_tier=premium] → premium servers. Examples: AWS ALB, Nginx, Envoy, HAProxy (HTTP mode).<br/>Step 3: L7 capabilities: SSL/TLS termination (decrypt once at LB, forward plaintext to backend), content-based routing, request modification (add headers), rate limiting per URL, health checks on HTTP response codes (not just TCP connectivity).<br/>Step 4: L7 cost: must parse HTTP → higher CPU per connection, higher latency (~1ms vs ~0.1ms for L4).<br/>Step 5: Use L4 when: raw throughput (game servers, streaming), non-HTTP protocols (MQTT, custom TCP), minimal latency critical. Use L7 when: microservices routing, A/B testing, authentication at LB, path-based routing.<br/>✅ L4: fast, dumb, TCP-level. L7: smart, HTTP-aware, enables application-level routing intelligence.",
    },

    {
      q: "In a distributed system, what is a 'split-brain' problem and how do quorum-based systems prevent it?",
      opts: [
        "Split-brain means the CPU is overloaded — solved by adding more CPU",
        "Split-brain: network partition causes nodes to split into groups, each group believes it's the master and accepts conflicting writes. Quorum requires majority (>50%) of nodes to agree — two separate groups can't both have quorum simultaneously",
        "Split-brain only happens in relational databases, not NoSQL",
        "Split-brain is solved by faster network hardware",
      ],
      ans: "Split-brain: network partition causes nodes to split into groups, each group believes it's the master and accepts conflicting writes. Quorum requires majority (>50%) of nodes to agree — two separate groups can't both have quorum simultaneously",
      cat: "System Design",
      exp: "Step 1: Scenario: 5-node cluster, network partition splits into groups of 3 and 2. Without quorum: both groups elect a master → two masters accepting writes → conflicting data (split-brain).<br/>Step 2: Quorum approach: require majority (⌊N/2⌋+1) of nodes to agree on any write. For 5 nodes: quorum = 3. The group of 3 can still operate (has quorum). The group of 2 cannot (no quorum) → stops accepting writes, returns errors.<br/>Step 3: Mathematical guarantee: two groups cannot both have majority simultaneously. If group A has quorum (>50%), group B has <50% → group B cannot have quorum. This prevents split-brain by design.<br/>Step 4: Raft consensus: quorum for log commits ensures only one leader can commit entries (leader has quorum of followers agreeing to each log entry). Partition minority loses leadership election → can't commit.<br/>Step 5: Costs: availability decreases. If 3 of 5 nodes fail → no quorum → system unavailable (CP system). This is the CA trade-off in CAP theorem.<br/>Step 6: ZooKeeper, etcd, Raft, Paxos — all use quorum to prevent split-brain. DynamoDB/Cassandra use quorum R+W>N for tunable consistency.<br/>✅ Split-brain: two masters from partition. Quorum (>50%): only one group can have majority → one master → no conflicts.",
    },

    {
      q: "Design a type-ahead search (search-as-you-type) for a product catalog with 10M products. Latency requirement: < 50ms.",
      opts: [
        "SQL LIKE '%query%' on product table — flexible but O(n) scan",
        "Trie in memory + inverted index on prefix; cache top-K completions per prefix in Redis; elasticsearch for full-text fallback",
        "Scan all 10M products on each keystroke",
        "Pre-generate all possible search strings and store in DB",
      ],
      ans: "Trie in memory + inverted index on prefix; cache top-K completions per prefix in Redis; elasticsearch for full-text fallback",
      cat: "System Design",
      exp: "Step 1: SQL LIKE scans are O(n) — for 10M products, too slow for 50ms requirement even with index (LIKE 'query%' can use index, but LIKE '%query%' cannot).<br/>Step 2: Trie-based prefix index: each prefix maps to a list of matching product names. For 'app' → [Apple iPhone, Apple Watch, Apparel...]. Build on product names, normalized (lowercase, punctuation removed).<br/>Step 3: Top-K caching: for each prefix node in the trie, precompute the top-10 products by popularity/relevance score. Changing popularity → background job updates precomputed lists. Most prefix queries served from this precomputed list in O(L) where L=query length.<br/>Step 4: Redis cache: frequently queried prefixes (most common first 3-4 characters) cached in Redis as sorted sets (score = relevance). Cache hit: < 5ms. Cache miss: trie lookup, populate cache.<br/>Step 5: Elasticsearch for full-text: longer queries (4+ words), misspellings, conceptual search. Elasticsearch's completion suggester uses a specialized FST (Finite State Transducer) optimized for prefix completion.<br/>Step 6: Architecture: client keystroke → CDN edge cache (for common prefixes) → API gateway → Redis → Elasticsearch fallback. P99 latency target 30ms.<br/>✅ Type-ahead: precomputed top-K per prefix + Redis cache + Elasticsearch = sub-50ms at scale.",
    },

    {
      q: "Explain how Apache Kafka achieves message durability and why sequential disk writes are key to its performance.",
      opts: [
        "Kafka stores messages in RAM — durability comes from replicas only",
        "Kafka writes to a sequential commit log on disk (append-only). Sequential I/O is 100-1000x faster than random I/O on spinning disks and 10x faster on SSDs. Combined with replication (ISR) and configurable ack levels for durability",
        "Kafka uses a database internally for durability",
        "Kafka messages are ephemeral — lost on restart without external backup",
      ],
      ans: "Kafka writes to a sequential commit log on disk (append-only). Sequential I/O is 100-1000x faster than random I/O on spinning disks and 10x faster on SSDs. Combined with replication (ISR) and configurable ack levels for durability",
      cat: "System Design",
      exp: "Step 1: Kafka's log structure: each partition is a sequential, append-only log on disk. Writes always append to the end — no random seeks. This is critical for performance.<br/>Step 2: Sequential I/O advantage: HDD sequential read: ~100-200 MB/s vs random I/O: ~0.1-0.5 MB/s = 200-2000x difference. SSD: sequential ~500 MB/s vs random ~100 MB/s = 5x difference. Kafka's sequential writes fully utilize the storage bandwidth.<br/>Step 3: OS page cache: Kafka leverages the OS page cache (RAM buffer). Recent messages are served from page cache without disk reads. OS manages cache eviction → Kafka doesn't need complex memory management.<br/>Step 4: Zero-copy: Kafka uses sendfile() syscall (Linux) to transfer data from disk → network without copying to user space → 2-4x throughput improvement for reads.<br/>Step 5: Durability via replication: ISR (In-Sync Replicas) = replicas that are caught up to the leader. Producer acks: acks=0 (no wait), acks=1 (leader only), acks=all (all ISR must confirm) → tunable durability vs latency.<br/>Step 6: Retention: messages kept for configured duration (e.g., 7 days) regardless of consumption → allows consumer replay and debugging.<br/>✅ Kafka performance: append-only sequential I/O + OS page cache + zero-copy. Durability: ISR replication + acks=all.",
    },

    {
      q: "What is 'database connection pooling' and why is it essential? What happens without it in a high-traffic web application?",
      opts: [
        "Connection pooling caches query results — it's a query cache",
        "Without pooling: each HTTP request opens a new DB connection (TCP handshake + auth = 20-200ms overhead) → thousands of connections → DB overwhelmed. Pooling: reuse a fixed set of connections, queue requests — reduces connection overhead to near 0",
        "Connection pooling is only needed for NoSQL databases",
        "Modern databases don't need connection pooling — they handle unlimited connections natively",
      ],
      ans: "Without pooling: each HTTP request opens a new DB connection (TCP handshake + auth = 20-200ms overhead) → thousands of connections → DB overwhelmed. Pooling: reuse a fixed set of connections, queue requests — reduces connection overhead to near 0",
      cat: "System Design",
      exp: "Step 1: Database connection establishment: TCP handshake (3-way) + TLS handshake (2 round trips) + DB authentication + session setup = 20-200ms per new connection. For 1000 requests/second without pooling: 1000 connection setups/second → massive overhead.<br/>Step 2: DB connection limits: PostgreSQL default max_connections=100. MySQL default=151. Each connection holds RAM (~5-10MB for PostgreSQL). 1000 simultaneous connections → 5-10GB RAM on DB server → memory exhaustion.<br/>Step 3: Connection pool: application maintains N pre-established connections (e.g., pool_size=20). Incoming request: acquire idle connection → execute query → release. If no idle connections: queue request until one is released.<br/>Step 4: Pool sizing: Little's Law: N = throughput × average_latency. For 1000 req/s at 20ms/query: N = 1000 × 0.02 = 20 connections. Optimal pool size ≈ number of CPU cores on DB server (for CPU-bound queries).<br/>Step 5: Tools: HikariCP (Java, fastest), PgBouncer (PostgreSQL proxy, external pooler — shares connections across multiple app servers), pgpool-II, Sequelize (Node.js), SQLAlchemy (Python).<br/>Step 6: External pooler (PgBouncer): allows 10,000 app server connections → 20 actual DB connections via multiplexing. Essential for serverless/microservices.<br/>✅ Connection pooling: reuse pre-established connections → eliminate 20-200ms setup overhead → enable high concurrency with limited DB connections.",
    },

    {
      q: "Design a distributed lock service (like Google Chubby or etcd). What properties must it guarantee?",
      opts: [
        "Just use a database row with a 'locked' boolean flag",
        "Mutual exclusion, fault tolerance (Raft/Paxos consensus), lease-based (time-bounded locks with TTL), fencing tokens (monotonically increasing to prevent stale lock holders from causing damage)",
        "A simple in-memory mutex shared via REST API",
        "Distributed locks are impossible — use single-server locks only",
      ],
      ans: "Mutual exclusion, fault tolerance (Raft/Paxos consensus), lease-based (time-bounded locks with TTL), fencing tokens (monotonically increasing to prevent stale lock holders from causing damage)",
      cat: "System Design",
      exp: "Step 1: Properties required: Mutual exclusion (at most one holder at any time), Safety (no two clients hold simultaneously), Liveness (eventually some client acquires the lock), Fault tolerance (service available despite node failures).<br/>Step 2: Consensus basis: Raft/Paxos ensures that lock grant/release decisions are agreed upon by majority of lock service nodes → survives minority node failures. etcd uses Raft; Chubby uses Paxos.<br/>Step 3: Lease/TTL: lock acquired with a TTL (e.g., 30 seconds). If lock holder crashes, lock auto-expires. Holder must renew lease before expiry to maintain lock. Prevents indefinitely held locks from dead holders.<br/>Step 4: Fencing tokens: critical for correctness. When lock is granted, issue a monotonically increasing token (e.g., lock version 42). Lock holder sends token with every write to protected resource. Resource rejects writes with lower token (stale holder using expired lock can't cause damage even if it thinks it holds the lock).<br/>Step 5: RedLock controversy (Martin Kleppmann): Redis-based distributed lock without consensus is unsafe under certain failure scenarios — fencing tokens don't fully help if resource doesn't validate them.<br/>Step 6: Production: etcd (Kubernetes leader election), ZooKeeper (Kafka partition ownership), Google Chubby (GFS master election).<br/>✅ Distributed lock: Raft/Paxos consensus + lease TTL + fencing tokens = safe, fault-tolerant mutual exclusion.",
    },

    {
      q: "What is 'data sharding by range' vs 'data sharding by hash', and what is the classic problem unique to range sharding?",
      opts: [
        "They are equivalent — just different implementation details",
        "Range: adjacent keys on same shard (good for range scans, bad for monotonic keys → hot shard). Hash: uniform distribution (good for load, bad for range scans requiring scatter-gather)",
        "Hash sharding supports range queries; range sharding doesn't",
        "Range sharding only works for strings; hash sharding only for integers",
      ],
      ans: "Range: adjacent keys on same shard (good for range scans, bad for monotonic keys → hot shard). Hash: uniform distribution (good for load, bad for range scans requiring scatter-gather)",
      cat: "System Design",
      exp: "Step 1: Range sharding: shard 1 handles keys [A-M], shard 2 handles [N-Z]. Or by timestamp: shard 1 = 2024-01 to 2024-06, shard 2 = 2024-07 to 2024-12. Benefit: range queries ('all events in January') hit a single shard → efficient.<br/>Step 2: Classic problem — monotonic key hot shard: if using auto-increment user_id or timestamp as shard key, all new inserts go to the LAST shard (highest values). Shard containing recent data is overwhelmed; old shards are idle. This is the 'hot shard' / 'write skew' problem.<br/>Step 3: Hash sharding: shard = hash(key) % N. Distributes load uniformly. Range query: 'all events in January' → need to query ALL shards (scatter-gather → N parallel queries → merge → expensive).<br/>Step 4: Solutions for monotonic key hot sharding: add random suffix to key before hashing (key + random(0,N) → N writes per key but balanced), use logical sharding time periods + global write distributes, Cassandra uses token-based consistent hash ring.<br/>Step 5: Hybrid: CockroachDB uses range sharding internally but auto-splits ranges when they get hot and rebalances → transparent range-to-hash-like balancing.<br/>✅ Range sharding: hot shard risk for monotonic keys (timestamps, auto-increment IDs). Hash sharding: no range query efficiency. Choose based on query patterns.",
    },

    {
      q: "A senior engineer proposes using a single-table DynamoDB design. What does this mean, and what problem does it solve?",
      opts: [
        "Store all your data in one table to reduce AWS costs — no other benefit",
        "Model all entities and their relationships in one DynamoDB table using carefully designed partition and sort keys + overloaded indexes. Avoids joins, enables single-digit millisecond access patterns, eliminates N+1 query problems",
        "DynamoDB tables automatically merge into one — no design needed",
        "Single-table design only works for tables with fewer than 1000 items",
      ],
      ans: "Model all entities and their relationships in one DynamoDB table using carefully designed partition and sort keys + overloaded indexes. Avoids joins, enables single-digit millisecond access patterns, eliminates N+1 query problems",
      cat: "System Design",
      exp: "Step 1: DynamoDB has no joins — querying data from multiple tables requires multiple API calls (N+1 problem). Single-table design solves this by co-locating related data.<br/>Step 2: Key design: use generic attribute names (PK, SK). Overload keys with entity types: PK='USER#123', SK='PROFILE' for user data. PK='USER#123', SK='ORDER#456' for user's order. Both stored in the same table, same partition → efficient access.<br/>Step 3: Access pattern design: DynamoDB design starts with access patterns (WHAT queries will I run?), then derives the key schema — opposite of relational DB design.<br/>Step 4: Example: get user + all orders in ONE query: PK='USER#123', SK between 'PROFILE' and 'ORDER#zzz' → returns all items for user in one request.<br/>Step 5: Global Secondary Indexes (GSI): overloaded GSIs support additional access patterns. PK2='ORDER#456', SK2='USER#123' → GSI allows 'find user for this order'.<br/>Step 6: Downside: complex to design, hard to modify access patterns after deployment. Suitable when access patterns are known upfront (rigid schema).<br/>Step 7: Alex DeBrie's 'The DynamoDB Book' is the canonical reference for single-table design patterns.<br/>✅ Single-table DynamoDB: co-locate related entities, overloaded keys, access-pattern-first design = joins replaced by well-designed key structures.",
    },
  ],
  tier3: [
    /* ── Q1 ── */
    {
      q: "You must optimize city traffic flow with NO data on patterns, road capacities, or vehicle counts. You have 1 hour to make a recommendation. What is your FIRST step?",
      opts: [
        "Refuse — impossible without data",
        "Apply max-flow min-cut on road network using public map lane counts as proxy capacity",
        "Recommend banning all cars immediately",
        "Wait 30 days to collect data before advising",
      ],
      ans: "Apply max-flow min-cut on road network using public map lane counts as proxy capacity",
      cat: "Incomplete Data",
      exp: "Step 1: Incomplete data ≠ zero information. Public maps (OpenStreetMap) freely show lane counts, speed limits, and road widths — all proxy measures for capacity.<br/>Step 2: Model city as a flow network: nodes = intersections, edges = roads, capacity estimated from lane_count × speed_limit.<br/>Step 3: Apply max-flow / min-cut — find the bottleneck edges (the min-cut). These roads, when congested, most damage city-wide throughput.<br/>Step 4: Recommend interventions at min-cut edges: signal timing changes, one-way conversions, alternate route signage.<br/>Step 5: Use Fermi estimation for vehicle count: city population × car-ownership rate × peak-hour commute fraction ≈ vehicle volume.<br/>Step 6: State uncertainty explicitly: 'Based on proxy estimates — validate with spot counts before permanent implementation.'<br/>✅ Key insight: structure your reasoning, estimate boldly, state uncertainty clearly. That IS the skill being tested.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 155" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="155" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">City as Max-Flow Network</text>
  <circle cx="30" cy="78" r="18" fill="#6c63ff" opacity="0.85"/><text x="30" y="82" text-anchor="middle" fill="white" font-size="9">S</text>
  <circle cx="115" cy="45" r="15" fill="#f59e0b" opacity="0.8"/><text x="115" y="49" text-anchor="middle" fill="white">A</text>
  <circle cx="115" cy="110" r="15" fill="#f59e0b" opacity="0.8"/><text x="115" y="114" text-anchor="middle" fill="white">B</text>
  <circle cx="210" cy="45" r="15" fill="#f59e0b" opacity="0.8"/><text x="210" y="49" text-anchor="middle" fill="white">C</text>
  <circle cx="210" cy="110" r="15" fill="#f59e0b" opacity="0.8"/><text x="210" y="114" text-anchor="middle" fill="white">D</text>
  <circle cx="305" cy="78" r="18" fill="#22c55e" opacity="0.85"/><text x="305" y="82" text-anchor="middle" fill="white" font-size="9">T</text>
  <line x1="48" y1="68" x2="100" y2="52" stroke="#6c63ff" stroke-width="1.8"/>
  <text x="70" y="54" fill="#6c63ff" font-size="8">cap=6</text>
  <line x1="48" y1="88" x2="100" y2="103" stroke="#6c63ff" stroke-width="1.8"/>
  <text x="60" y="103" fill="#6c63ff" font-size="8">cap=4</text>
  <line x1="130" y1="45" x2="195" y2="45" stroke="#64748b" stroke-width="1.5"/>
  <text x="158" y="40" fill="#64748b" font-size="8">cap=3</text>
  <line x1="130" y1="110" x2="195" y2="110" stroke="#64748b" stroke-width="1.5"/>
  <text x="158" y="122" fill="#64748b" font-size="8">cap=5</text>
  <line x1="115" y1="60" x2="115" y2="95" stroke="#ef4444" stroke-width="3" stroke-dasharray="5,3"/>
  <text x="72" y="80" fill="#ef4444" font-size="8">MIN-CUT!</text>
  <line x1="225" y1="52" x2="287" y2="70" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="225" y1="103" x2="287" y2="86" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="145" text-anchor="middle" fill="#64748b" font-size="9">Bottleneck = red dashed edge → priority intervention point</text>
</svg>`,
      },
    },

    /* ── Q2 ── */
    {
      q: "Design a system that adapts recommendations in real-time when user preferences change COMPLETELY every 10 minutes. Historical data becomes irrelevant quickly. Correct framework?",
      opts: [
        "Retrain the full recommendation model every 10 minutes",
        "Multi-armed bandit (Thompson Sampling) with exponential decay + concept drift detection",
        "Show random recommendations — past data is useless",
        "Ask users to update preferences manually every 10 minutes",
      ],
      ans: "Multi-armed bandit (Thompson Sampling) with exponential decay + concept drift detection",
      cat: "Evolving Constraints",
      exp: "Step 1: Full model retraining every 10 minutes is computationally prohibitive and still based on stale data.<br/>Step 2: Multi-Armed Bandit (MAB): treat each recommendation as an 'arm'. Pull the arm (show recommendation), observe reward (click/purchase). Update arm estimate. Balance exploration vs exploitation.<br/>Step 3: Thompson Sampling: maintain Beta distribution per arm (α=successes, β=failures). Sample from each distribution, pick highest. Recent interactions update distributions naturally.<br/>Step 4: Exponential decay: apply decay weight = e^(−λ × age) to older rewards. Recent interactions weight ~1.0; interactions from 20 minutes ago weight ~0.1 → system naturally adapts.<br/>Step 5: Concept drift detection: use CUSUM or Page-Hinkley test to detect when reward distributions shift. On drift: reset arm estimates → fresh exploration phase.<br/>Step 6: Trade-off: rapid adaptation → more exploration (showing unfamiliar content) → short-term satisfaction dip but long-term relevance. Tune decay rate λ and exploration ε based on how fast preferences change.<br/>✅ Evolving preferences: MAB + exponential decay + drift detection. No full retraining needed — online learning naturally adapts.",
    },

    /* ── Q3 ── */
    {
      q: "Detect fraud in a payment system where attackers CONSTANTLY evolve their patterns — a rule that works today is useless tomorrow. What is the correct architectural response?",
      opts: [
        "Hardcode rules based on known patterns — update manually when new patterns emerge",
        "Layered defense: rule engine + supervised ML with online learning + unsupervised anomaly detection + human review feedback loop + behavioral velocity features",
        "Block all transactions from new accounts — too risky",
        "Use blockchain to make fraud impossible",
      ],
      ans: "Layered defense: rule engine + supervised ML with online learning + unsupervised anomaly detection + human review feedback loop + behavioral velocity features",
      cat: "Adversarial Reasoning",
      exp: "Step 1: Static rules fail against evolving attacks — adversaries study your rules and avoid them. Single ML model trained on past fraud fails when patterns shift (concept drift).<br/>Step 2: Layer 1 — Rule Engine: catches obvious known fraud instantly (e.g., card used in 2 countries in 2 minutes). Low latency, easy to explain to regulators. Updated weekly by risk team.<br/>Step 3: Layer 2 — Supervised ML: trained on rolling window of recent labeled fraud. Features: transaction amount, merchant category, time of day, velocity (transactions in last 1h/24h), device fingerprint.<br/>Step 4: Layer 3 — Unsupervised Anomaly Detection: Isolation Forest or Autoencoder flags statistically unusual transactions WITHOUT needing fraud labels. Catches novel patterns unseen in training data.<br/>Step 5: Layer 4 — Behavioral velocity features: distinct merchants in 1h, typing speed, mouse movement patterns (behavioral biometrics). Extremely hard to fake at scale even with stolen credentials.<br/>Step 6: Human review feedback loop: disputed transactions reviewed by analysts → labels fed back to retrain models weekly → system improves over time. Adversarial robustness compounds.<br/>✅ Evolving fraud: no single defense works. Layered approach + online learning + unsupervised detection + human feedback = adaptive defense.",
    },

    /* ── Q4 ── */
    {
      q: "Build a recommendation engine with NO historical data, NO user profiles, NO content metadata. Only raw anonymous click logs exist. You have 24 hours. First move?",
      opts: [
        "Impossible — give up without at least user profiles",
        "Build co-occurrence matrix from click sessions; recommend items co-clicked in same session (implicit collaborative filtering without identity)",
        "Show trending items only — simplest approach",
        "Wait 30 days to collect labeled data before starting",
      ],
      ans: "Build co-occurrence matrix from click sessions; recommend items co-clicked in same session (implicit collaborative filtering without identity)",
      cat: "Incomplete Data",
      exp: "Step 1: Raw clicks contain implicit signal — if users often click item A then item B in the same session, A and B are related in interest, even without knowing what they are.<br/>Step 2: Session co-occurrence matrix: for each pair (A,B), count sessions where both were clicked. M[A][B] = number of sessions with both A and B. This is unsupervised collaborative filtering.<br/>Step 3: Item-based recommendation: user clicks item A → recommend items with highest M[A][B] values. No user identity needed — anonymous session-based.<br/>Step 4: Normalize using Jaccard similarity: M[A][B] / (sessions_A + sessions_B − M[A][B]) to avoid bias toward popular items.<br/>Step 5: Cluster analysis: apply SVD or NMF on the co-occurrence matrix to discover latent item clusters — clusters emerge purely from click patterns without labels.<br/>Step 6: 24-hour roadmap: Hours 0–2: click stream collection pipeline. Hours 2–8: build co-occurrence matrix. Hours 8–16: session-based recommender. Hours 16–24: A/B test vs random baseline.<br/>✅ Zero-label cold start: raw sessions → co-occurrence matrix → implicit collaborative filtering. Implicit data is powerful even without metadata.",
    },

    /* ── Q5 ── */
    {
      q: "Rank 1 million items by quality using only pairwise comparisons, with a budget of 10 million comparisons and 30% adversarial noise (wrong answers). Best approach?",
      opts: [
        "Run a tournament bracket — fast but breaks with noisy comparisons",
        "Merge sort — O(n log n) comparisons but fails on non-transitive noise",
        "TrueSkill / Bradley-Terry probabilistic model + active learning to select most informative pairs",
        "Random sampling — can't rank without noise-free comparisons",
      ],
      ans: "TrueSkill / Bradley-Terry probabilistic model + active learning to select most informative pairs",
      cat: "Adversarial Reasoning",
      exp: "Step 1: Deterministic sort algorithms assume transitive, consistent comparisons. With 30% noise: non-transitive comparisons (A>B, B>C, C>A) appear — deterministic algorithms break or loop indefinitely.<br/>Step 2: Bradley-Terry model: assigns each item a strength parameter θᵢ. P(i beats j) = θᵢ/(θᵢ+θⱼ). Given observed comparisons, find θ values maximizing likelihood via gradient descent or EM.<br/>Step 3: TrueSkill (Microsoft): Bayesian extension with uncertainty per item. After each comparison: winner's μ increases, σ decreases; loser's μ decreases. Noisy comparisons → higher uncertainty, not catastrophic failure.<br/>Step 4: Active Learning: instead of random pairs, select most informative pairs next — those with highest uncertainty (σ large) or close estimated skills (most uncertain outcome = highest information gain).<br/>Step 5: Budget math: 10M comparisons × ~0.88 effective bits per noisy comparison / 1M items ≈ 8.8 bits per item — sufficient for rough ranking but not fine-grained ordering. Report (rank, confidence_interval).<br/>✅ Noisy pairwise ranking: probabilistic model (TrueSkill) + active learning = optimal budget use under adversarial noise.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="130" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">TrueSkill: Skill Estimates with Uncertainty</text>
  <!-- Items on number line -->
  <line x1="20" y1="65" x2="320" y2="65" stroke="#64748b" stroke-width="1.5"/>
  <text x="20" y="80" fill="#64748b" font-size="8">Weak</text>
  <text x="295" y="80" fill="#64748b" font-size="8">Strong</text>
  <!-- Item A -->
  <ellipse cx="80" cy="65" rx="25" ry="12" fill="#6c63ff" opacity="0.3" stroke="#6c63ff" stroke-width="1.5"/>
  <circle cx="80" cy="65" r="3" fill="#6c63ff"/>
  <text x="80" y="50" text-anchor="middle" fill="#6c63ff" font-size="9">Item A</text>
  <text x="80" y="95" text-anchor="middle" fill="#6c63ff" font-size="8">μ=35, σ=8</text>
  <!-- Item B -->
  <ellipse cx="170" cy="65" rx="12" ry="12" fill="#22c55e" opacity="0.3" stroke="#22c55e" stroke-width="1.5"/>
  <circle cx="170" cy="65" r="3" fill="#22c55e"/>
  <text x="170" y="50" text-anchor="middle" fill="#22c55e" font-size="9">Item B</text>
  <text x="170" y="95" text-anchor="middle" fill="#22c55e" font-size="8">μ=50, σ=4</text>
  <!-- Item C -->
  <ellipse cx="255" cy="65" rx="30" ry="12" fill="#f59e0b" opacity="0.3" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="255" cy="65" r="3" fill="#f59e0b"/>
  <text x="255" y="50" text-anchor="middle" fill="#f59e0b" font-size="9">Item C</text>
  <text x="255" y="95" text-anchor="middle" fill="#f59e0b" font-size="8">μ=65, σ=10</text>
  <text x="170" y="115" text-anchor="middle" fill="#64748b" font-size="9">Wide σ = uncertain rank → prioritize for next comparison (active learning)</text>
</svg>`,
      },
    },

    /* ── Q6 ── */
    {
      q: "Mid-interview, the constraints change: 'The array can now have negative values and you need O(n) not O(n log n).' You are halfway done. What is the correct response?",
      opts: [
        "Panic and restart from scratch",
        "Acknowledge change calmly → ask clarifying questions → verbalize which parts are salvageable → adapt the algorithm to O(n) for negatives while maintaining built logic",
        "Argue that original constraints were better",
        "Submit the half-finished solution and hope for partial credit",
      ],
      ans: "Acknowledge change calmly → ask clarifying questions → verbalize which parts are salvageable → adapt the algorithm to O(n) for negatives while maintaining built logic",
      cat: "Evolving Constraints",
      exp: "Step 1: This tests adaptability and structured thinking under pressure — a core senior engineering skill. Requirement changes happen constantly in real projects.<br/>Step 2: First response: DON'T panic. Say: 'Okay, that changes things. Let me think through what this means for our approach.' Demonstrates composure and methodical thinking.<br/>Step 3: Clarifying questions: 'Can values be arbitrarily negative or bounded? Is O(n) a hard requirement or a target? Does the space complexity change?' — shows you don't assume; you clarify.<br/>Step 4: Salvage analysis: explicitly verbalize what still works. 'My data structure choice still works. My parsing logic still works. The sorting step must change — I need a linear-time approach.'<br/>Step 5: Adapting for negatives specifically: many algorithms assume non-negative values (Dijkstra, some greedy approaches). Negatives may require: Bellman-Ford instead of Dijkstra, careful handling in sliding windows (deque instead of simple max), verifying greedy exchange argument still holds.<br/>Step 6: O(n) options to consider: counting sort (if bounded range), Kadane's variant, single-pass linear scan, monotonic deque — identify which applies to your specific problem.<br/>Step 7: Communication is the answer: 'I'll keep [X], replace [Y] with [Z], achieving O(n) because [clear reasoning].' Structured, calm, methodical.<br/>✅ Mid-change: clarify → salvage → adapt → communicate the reasoning. The structured PROCESS is the skill, not memorizing the perfect algorithm.",
    },

    /* ── Q7 ── */
    {
      q: "N=10,000 people each know a unique secret. Design an algorithm to let EVERYONE learn ALL secrets, minimizing total phone calls. Each call: two people exchange ALL currently known secrets.",
      opts: [
        "N(N-1)/2 calls — everyone calls everyone else",
        "2N−4 calls: Phase 1 — N/2 pair calls; Phase 2 — log₂N doubling rounds; Phase 3 — N/2 broadcast calls",
        "N−1 calls using a spanning tree broadcast",
        "N·log N calls using merge sort style dissemination",
      ],
      ans: "2N−4 calls: Phase 1 — N/2 pair calls; Phase 2 — log₂N doubling rounds; Phase 3 — N/2 broadcast calls",
      cat: "Impossible Thinking",
      exp: "Step 1: This is the classic 'Gossip Problem'. Each call = two people exchange ALL known secrets. Goal: everyone knows all N secrets. What is the minimum number of calls?<br/>Step 2: Lower bound: it is mathematically proven that at least 2N−4 calls are required for N≥4. Two people must be 'last' to receive new information, creating this minimum.<br/>Step 3: Optimal algorithm achieving 2N−4:<br/>• Phase 1 (N/2 calls): pair everyone up. Each pair exchanges secrets → everyone knows 2 secrets.<br/>• Phase 2 (log₂N rounds): pairs call each other in a doubling pattern. After k rounds, 2^(k+1) secrets known per person. After log₂N rounds: 2 'super-informed' people know ALL N secrets.<br/>• Phase 3 (N/2 − 1 calls): these 2 fully-informed people each call half of remaining → all know everything.<br/>Step 4: Total ≈ N/2 + log₂N + N/2−1 = N + log₂N − 1 ≈ 2N−4 for large N.<br/>Step 5: Maps to: broadcast protocols in distributed systems, peer-to-peer information dissemination, epidemic spreading models (SIR model).<br/>✅ Gossip problem: 2N−4 optimal. Strategy: pair → bottleneck-gather → broadcast. Tests combinatorial optimization intuition.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 145" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="145" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">Gossip Problem — 3 Phase Strategy</text>
  <!-- Phase 1 -->
  <rect x="5" y="22" width="95" height="50" rx="4" fill="#6c63ff" opacity="0.15" stroke="#6c63ff" stroke-width="1"/>
  <text x="52" y="36" text-anchor="middle" fill="#6c63ff" font-size="9" font-weight="bold">Phase 1</text>
  <text x="52" y="49" text-anchor="middle" fill="currentColor" font-size="8">N/2 pair calls</text>
  <text x="52" y="62" text-anchor="middle" fill="currentColor" font-size="8">each knows 2 secrets</text>
  <!-- Phase 2 -->
  <rect x="120" y="22" width="100" height="50" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" stroke-width="1"/>
  <text x="170" y="36" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="bold">Phase 2</text>
  <text x="170" y="49" text-anchor="middle" fill="currentColor" font-size="8">log₂N doubling rounds</text>
  <text x="170" y="62" text-anchor="middle" fill="currentColor" font-size="8">2 people know ALL</text>
  <!-- Phase 3 -->
  <rect x="240" y="22" width="95" height="50" rx="4" fill="#22c55e" opacity="0.15" stroke="#22c55e" stroke-width="1"/>
  <text x="287" y="36" text-anchor="middle" fill="#22c55e" font-size="9" font-weight="bold">Phase 3</text>
  <text x="287" y="49" text-anchor="middle" fill="currentColor" font-size="8">N/2 broadcast calls</text>
  <text x="287" y="62" text-anchor="middle" fill="currentColor" font-size="8">everyone knows ALL</text>
  <!-- Arrows -->
  <line x1="100" y1="47" x2="120" y2="47" stroke="#64748b" stroke-width="1.5" marker-end="url(#ga2)"/>
  <line x1="220" y1="47" x2="240" y2="47" stroke="#64748b" stroke-width="1.5" marker-end="url(#ga2)"/>
  <!-- Formula -->
  <rect x="80" y="90" width="180" height="40" rx="5" fill="#6c63ff" opacity="0.1" stroke="#6c63ff"/>
  <text x="170" y="107" text-anchor="middle" fill="currentColor" font-size="10" font-weight="bold">Total: 2N − 4 calls (optimal)</text>
  <text x="170" y="122" text-anchor="middle" fill="#64748b" font-size="9">Proven lower bound — cannot do better</text>
  <defs><marker id="ga2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#64748b"/></marker></defs>
</svg>`,
      },
    },

    /* ── Q8 ── */
    {
      q: "Multiple ML models make different predictions for user churn — ground truth is unknowable before the fact. Multiple 'correct' models disagree. How do you decide which to deploy?",
      opts: [
        "Pick the most accurate model on the test set — objective criterion",
        "Frame as a decision problem: maximize expected business value considering accuracy, calibration, interpretability, fairness, and false-positive vs false-negative costs",
        "Average all models (ensemble) — best of all worlds",
        "Refuse to deploy until ground truth is determinable",
      ],
      ans: "Frame as a decision problem: maximize expected business value considering accuracy, calibration, interpretability, fairness, and false-positive vs false-negative costs",
      cat: "Trade-off Justification",
      exp: "Step 1: Test set accuracy is necessary but insufficient. Models can overfit to test distribution, fail on production shift, or optimize a metric disconnected from business value.<br/>Step 2: Calibration check: if Model A says 'P(churn)=0.7', does 70% of users it scores 0.7 actually churn? Poorly calibrated models → bad business decisions. Measure with Brier score, reliability diagrams.<br/>Step 3: Cost-sensitive evaluation: false positive (give discount to loyal user) cost = discount cost. False negative (miss churner) cost = lost lifetime value (~$500). Find threshold minimizing expected cost, not just accuracy.<br/>Step 4: Interpretability: GDPR 'right to explanation', legal liability, internal trust. A slightly less accurate logistic regression may be deployable where a neural network is not. Regulatory context determines this.<br/>Step 5: Fairness audit: does the model perform worse for specific demographic groups? EU AI Act, US EEOC require fairness analysis. 90% overall accuracy with 60% for a protected group fails regulatory requirements.<br/>Step 6: A/B test in production: the only true ground truth for business impact. Run challenger vs champion, measure actual churn reduction and revenue impact over 2–4 weeks.<br/>Step 7: Document uncertainty explicitly in all stakeholder communications.<br/>✅ Unknowable ground truth: reframe as decision problem. Accuracy + calibration + fairness + interpretability + business cost = holistic deployment decision.",
    },

    /* ── Q9 ── */
    {
      q: "Design a zero-day cyberattack detection system — attacks that have NEVER been seen before and have NO signatures in any threat database. How?",
      opts: [
        "Impossible — you need signatures to detect attacks",
        "Zero-trust architecture + behavioral baseline deviation detection + unsupervised anomaly detection (autoencoders on network flows) + honeypots + automated containment with human-in-the-loop",
        "Block all network traffic — no traffic = no attacks",
        "Use the latest firewall vendor rules — they update automatically",
      ],
      ans: "Zero-trust architecture + behavioral baseline deviation detection + unsupervised anomaly detection (autoencoders on network flows) + honeypots + automated containment with human-in-the-loop",
      cat: "Incomplete Data",
      exp: "Step 1: Signature-based detection inherently cannot detect zero-day attacks — no signature exists. Must use behavioral/anomaly-based detection.<br/>Step 2: Zero-trust architecture: assume breach is inevitable. Every request requires authentication + authorization regardless of network location. Principle of least privilege limits blast radius of any attack.<br/>Step 3: Behavioral baseline: learn normal behavior for each user, device, service over 30 days: login times, data volumes, API call sequences, geographic locations. Flag deviations: 'This service never made outbound connections to external IPs at 3 AM before.'<br/>Step 4: Autoencoder anomaly detection: train on normal network flow data. Reconstruction error for normal traffic is low; novel attack patterns produce high reconstruction error (they look 'different' from training data).<br/>Step 5: Honeypots (deception technology): place realistic-looking fake credentials, servers, and data inside the network. Any interaction = guaranteed attack (no legitimate user touches them). Zero-day attack → honeypot detects first interaction with full context preserved.<br/>Step 6: Automated containment: on high-confidence anomaly → auto-isolate affected component (block network egress, revoke credentials), preserve forensic evidence, alert security team. Human-in-the-loop prevents automated systems from causing outages via false positives.<br/>✅ Zero-day defense: assume breach + baseline deviation + autoencoder + honeypots + automated containment = proactive detection without signatures.",
    },

    /* ── Q10 ── */
    {
      q: "Estimate how many piano tuners are in Chicago — no internet access, no reference data allowed. Walk through the correct structured Fermi approach.",
      opts: [
        "Impossible to estimate — need actual data",
        "Decompose: population → households → piano ownership rate → tuning frequency → tuner capacity → number of tuners. Final answer ±1 order of magnitude is success",
        "Guess 500 and explain it's a guess",
        "Piano tuning is obsolete — answer is approximately 0",
      ],
      ans: "Decompose: population → households → piano ownership rate → tuning frequency → tuner capacity → number of tuners. Final answer ±1 order of magnitude is success",
      cat: "Fermi Estimation",
      exp: "Step 1: Chicago population ≈ 3 million. Average household size ≈ 2.5 → ~1.2 million households.<br/>Step 2: Piano ownership: expensive (~$2,000–10,000), requires space, declining in popularity. Estimate: 1 in 20 households = 5% → 1.2M × 5% = 60,000 residential pianos. Plus schools, churches, bars, hotels → add ~10,000 institutional pianos → 70,000 total.<br/>Step 3: Tuning frequency: serious musicians tune 4×/year; average owner 1–2×/year; many pianos rarely tuned. Weighted average ≈ 1 tuning/year → 70,000 tunings needed per year.<br/>Step 4: Tuner capacity: each tuning takes 1–2 hours including travel → 4–5 tunings/day. 5 days/week × 50 weeks = 250 work days/year → 4 × 250 = 1,000 tunings/year per tuner.<br/>Step 5: Number of tuners = 70,000 / 1,000 = 70 tuners in Chicago.<br/>Step 6: Sanity check: 70 tuners for 3M people → 1 per 43,000 people. Piano tuning is a niche profession. Actual answer: ~60–100 tuners — our estimate is spot-on!<br/>Step 7: The METHOD is the answer: decompose → estimate each factor → multiply → sanity check. Being within 1 order of magnitude (10–700) is success. Exact number is irrelevant.<br/>✅ Fermi estimation: decompose → estimate → multiply → sanity check. Tests structured thinking under uncertainty, not trivia.",
    },

    /* ── Q11 ── */
    {
      q: "A system processes 1 million events/second. A new feature needs O(n²) comparison of events in a 10-second window. You're told 'there is no way to reduce the comparison complexity.' What do you do?",
      opts: [
        "Implement it — customers want the feature",
        "Quantify the impossibility precisely, communicate with math, then re-negotiate to an achievable alternative that satisfies the underlying business need",
        "Hire more engineers — someone will figure it out",
        "Use C++ instead of Python — performance will be sufficient",
      ],
      ans: "Quantify the impossibility precisely, communicate with math, then re-negotiate to an achievable alternative that satisfies the underlying business need",
      cat: "System Limits",
      exp: "Step 1: Quantify first: 1M events/s × 10s = 10M events in window. O(n²) = (10M)² = 10^14 comparisons per window. At 10^12 comparisons/second (top supercomputer): 100 seconds per window = 100× slower than real-time. Physically impossible.<br/>Step 2: Communicate with math: 'This is computationally infeasible as specified. Here is the calculation.' Concrete numbers are compelling; vague 'too slow' is not.<br/>Step 3: Re-negotiate to achievable alternatives that satisfy the BUSINESS need (not the literal technical spec):<br/>• Option A — Sampling: randomly sample 1% of events (10,000/s). O(n²) on 10,000 events = 10^8/second — feasible on a single machine. Accuracy ~95% for most statistical properties. Ask: 'What approximation error is acceptable?'<br/>• Option B — Reduce window: 0.01s window → 10,000 events → 10^8 comparisons — feasible.<br/>• Option C — Re-examine the comparison: 'What are we detecting?' O(n²) usually means poorly specified requirements. Often an O(n log n) or O(n) algorithm exists for the actual business goal.<br/>Step 4: Document the trade-off decision in a design doc for future reference and accountability.<br/>Step 5: Engineers who say 'yes' to impossible specs and disappear for 3 months are the worst outcome. Technical courage = say 'impossible as stated' with math, then offer real alternatives.<br/>✅ Infeasible requirement: quantify → communicate → re-negotiate to achievable alternative.",
    },

    /* ── Q12 ── */
    {
      q: "A startup claims their AI predicts stock prices with 90% accuracy. In 5 minutes, without any code, how do you critically evaluate this claim?",
      opts: [
        "Impressive — 90% is very high, worth investing",
        "Ask: 90% on WHAT metric vs WHAT baseline? In-sample or out-of-sample? What is the actual P&L on live trading including transaction costs?",
        "Ask for their source code to verify",
        "90% accuracy in any domain is high — it must be legitimate",
      ],
      ans: "Ask: 90% on WHAT metric vs WHAT baseline? In-sample or out-of-sample? What is the actual P&L on live trading including transaction costs?",
      cat: "Trade-off Justification",
      exp: "Step 1: '90% accuracy' is meaningless without context. A model that always predicts 'the market will NOT crash today' achieves ~97% accuracy (markets crash ~3% of trading days) — useless and harmful as a trading strategy.<br/>Step 2: What is the baseline? S&P 500 goes up ~53% of trading days → a model predicting 'up' every day = 53% accuracy. A '90% accurate' model must beat this baseline, not random chance.<br/>Step 3: In-sample vs out-of-sample: 'backtesting' = testing on historical data used during model development. Models can be overfit to historical noise → 90% in-sample, 52% out-of-sample. Require results on a held-out period AFTER model was finalized (walk-forward validation).<br/>Step 4: Prediction horizon: predicting 1-day direction is very hard. 90% accuracy on 6-month direction during a bull market is much easier and less valuable.<br/>Step 5: Most revealing question: 'What is the actual P&L on live trading?' Transaction costs (bid-ask spread, slippage, commissions) typically eliminate theoretical edge. A model correct 55% of the time with proper position sizing often beats one correct 90% of the time on tiny moves.<br/>Step 6: Extraordinary claims require extraordinary evidence — audited live trading records, not backtested accuracy on the same data used for training.<br/>✅ Statistical critical thinking: question the metric, the baseline, the validation methodology, and the real-world P&L. '90% accurate' statistics almost always collapse on close examination.",
    },

    /* ── Q13 ── */
    {
      q: "An autonomous vehicle must choose between hitting Pedestrian A or swerving to hit Pedestrian B. As a systems designer, what is your response?",
      opts: [
        "Program the car to always protect its passengers — contractual obligation",
        "Program the car to minimize total harm — utilitarian calculus",
        "Design the system to AVOID these scenarios entirely via better sensors and conservative driving; make any residual edge-case behavior transparent via regulation — not hidden in code",
        "Let the car decide randomly — distributes moral responsibility equally",
      ],
      ans: "Design the system to AVOID these scenarios entirely via better sensors and conservative driving; make any residual edge-case behavior transparent via regulation — not hidden in code",
      cat: "Engineering Ethics",
      exp: "Step 1: This is the 'Trolley Problem' for autonomous vehicles. MIT's Moral Machine experiment showed different cultures have radically different preferences (favor young vs old, more vs fewer lives). There is no universal correct answer — this is an ethical question, not an engineering one.<br/>Step 2: The WRONG engineering answer: silently encode one philosophy in software without disclosure. Consumers believe the car 'just drives safely' — hidden utilitarian or passenger-priority code is deceptive design with massive legal and ethical liability.<br/>Step 3: The CORRECT system design answer: make this scenario not arise through better engineering:<br/>• LiDAR + cameras + radar sensor fusion: detect pedestrians 200m ahead → brake long before conflict arises<br/>• Conservative speed limits in pedestrian zones via V2I (Vehicle-to-Infrastructure) communication<br/>• Default: maximum deceleration, not collision optimization, in any emergency<br/>• V2X (Vehicle-to-Everything): receive pedestrian smartphone location → even better awareness<br/>Step 4: Germany's Ethics Commission on Automated Driving (2017) ruled: no programming of deliberate harm, equal treatment of all humans, driver bears moral responsibility in residual edge cases.<br/>Step 5: Transparent framework: 'In the rare scenario where collision is unavoidable, the vehicle applies maximum braking and steers to minimize harm, without pre-programmed preference.' Legally and ethically defensible.<br/>Step 6: The engineer's role: minimize accident probability to near zero; surface ethical edge cases to societal/regulatory decision-makers; do not hide philosophical choices in code.<br/>✅ Ethical dilemma in engineering: avoid it by design, be transparent about residuals, defer explicit trade-off choices to regulatory frameworks.",
    },

    /* ── Q14 ── */
    {
      q: "A 10TB database query joining 5 tables takes 3 hours. Business needs results in 10 minutes. 'No budget for new hardware.' Structured approach?",
      opts: [
        "Impossible — tell the business to wait 3 hours",
        "Systematically diagnose bottleneck: EXPLAIN plan → index gaps → partition pruning → materialized views → pre-aggregation → approximate query processing → if all else fails, make the hardware ROI case",
        "Rewrite the query in a faster programming language",
        "Run the query in parallel on 100 servers — free compute exists somewhere",
      ],
      ans: "Systematically diagnose bottleneck: EXPLAIN plan → index gaps → partition pruning → materialized views → pre-aggregation → approximate query processing → if all else fails, make the hardware ROI case",
      cat: "System Limits",
      exp: "Step 1: '3 hours → 10 minutes' = 18× speedup needed. Significant but potentially achievable. First: understand WHERE the 3 hours goes — don't guess.<br/>Step 2: EXPLAIN/EXPLAIN ANALYZE the query: identify the dominant cost operation. Usually one of: full table scan (missing index), bad join strategy (nested loop vs hash join vs merge join), sort step, or aggregation on large intermediate result.<br/>Step 3: Index analysis: are join columns and WHERE clause columns indexed? A single missing index on a 100M-row join key can change hours to minutes. Cost: zero (just CREATE INDEX).<br/>Step 4: Partition pruning: if table is partitioned by date and query filters by date, verify partition pruning is occurring (EXPLAIN should show partition scans, not full table scans).<br/>Step 5: Materialized views: precompute the expensive join+aggregation → store the result. Query the view instead. Refresh periodically (nightly/hourly). If data not real-time-critical: query time drops to <1 second.<br/>Step 6: Pre-aggregation: schedule the same aggregation as a nightly batch job, store in a summary table. Query the summary → O(1) lookup.<br/>Step 7: Approximate Query Processing: for analytics where ±5% accuracy is acceptable, use TABLESAMPLE 1% → 100× data reduction → proportional speed improvement. Many BI tools support this transparently.<br/>Step 8: If none achieves 10 min: hardware ROI case. '5 analysts × 3 hours/day = 15 analyst-hours/day lost. At $100/hour = $1,500/day = $547,500/year. Hardware cost: $50,000 one-time.' Frames cost decision correctly.<br/>✅ Performance constraint: systematic diagnosis + targeted optimization before claiming hardware is needed.",
    },

    /* ── Q15 ── */
    {
      q: "Byzantine Fault Tolerance (BFT): nodes can fail silently OR lie/behave maliciously. How does this change the quorum requirement vs crash-fault tolerance?",
      opts: [
        "Byzantine faults don't change quorum — majority (N/2+1) still sufficient",
        "BFT requires N ≥ 3f+1 nodes to tolerate f Byzantine faults; quorum = 2f+1. N/2+1 quorum can be fooled by f liars — need extra f nodes to outvote them",
        "BFT requires N ≥ 2f+1 — same as crash-fault tolerance",
        "BFT is impossible — you can never distinguish lies from truth",
      ],
      ans: "BFT requires N ≥ 3f+1 nodes to tolerate f Byzantine faults; quorum = 2f+1. N/2+1 quorum can be fooled by f liars — need extra f nodes to outvote them",
      cat: "Impossible Thinking",
      exp: "Step 1: Crash Fault Tolerance (CFT): nodes fail by stopping. N=2f+1 sufficient: majority quorum (f+1) always contains at least 1 correct node. Raft, Paxos handle CFT.<br/>Step 2: Byzantine Fault Tolerance (BFT): nodes can fail arbitrarily — send conflicting messages to different nodes, collude, behave correctly sometimes and incorrectly other times. Much harder.<br/>Step 3: Why N≥3f+1: Suppose two quorums Q1, Q2 must share at least one CORRECT node (so decisions are consistent). Each quorum has at most f Byzantine nodes. For Q1∩Q2 to contain a correct node: |Q1| + |Q2| − f > N. With |Q1|=|Q2|=2f+1: 2(2f+1)−f > N → 3f+2 > N → N ≤ 3f+1. Exactly 3f+1 nodes needed.<br/>Step 4: PBFT (Practical Byzantine Fault Tolerance, Castro & Liskov 1999): first practical BFT protocol. N=3f+1, 3 phases (pre-prepare, prepare, commit). O(n²) message complexity → practical only for small N (<20 nodes).<br/>Step 5: Modern BFT: Tendermint (blockchain), Ethereum 2.0's Casper use BFT variants. Performance still worse than CFT due to higher message complexity.<br/>Step 6: Blockchains are essentially BFT systems — explains why 51% attacks (f = 0.51N) break Bitcoin: attacker IS the Byzantine majority.<br/>✅ BFT: 3f+1 nodes vs CFT's 2f+1. Higher cost because liars must be outvoted, not just outlasted.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="130" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">CFT vs BFT Node Requirements</text>
  <!-- CFT -->
  <rect x="10" y="25" width="145" height="80" rx="5" fill="#22c55e" opacity="0.1" stroke="#22c55e"/>
  <text x="82" y="42" text-anchor="middle" fill="#22c55e" font-weight="bold" font-size="10">Crash Fault (CFT)</text>
  <text x="82" y="57" text-anchor="middle" fill="currentColor" font-size="9">N ≥ 2f+1</text>
  <text x="82" y="70" text-anchor="middle" fill="currentColor" font-size="9">Quorum = f+1</text>
  <text x="82" y="83" text-anchor="middle" fill="#22c55e" font-size="9">e.g. f=1 → N=3</text>
  <text x="82" y="96" text-anchor="middle" fill="#64748b" font-size="8">Nodes only crash/stop</text>
  <!-- BFT -->
  <rect x="185" y="25" width="145" height="80" rx="5" fill="#ef4444" opacity="0.1" stroke="#ef4444"/>
  <text x="257" y="42" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="10">Byzantine (BFT)</text>
  <text x="257" y="57" text-anchor="middle" fill="currentColor" font-size="9">N ≥ 3f+1</text>
  <text x="257" y="70" text-anchor="middle" fill="currentColor" font-size="9">Quorum = 2f+1</text>
  <text x="257" y="83" text-anchor="middle" fill="#ef4444" font-size="9">e.g. f=1 → N=4</text>
  <text x="257" y="96" text-anchor="middle" fill="#64748b" font-size="8">Nodes can lie / collude</text>
  <text x="170" y="120" text-anchor="middle" fill="#64748b" font-size="9">BFT needs 50% more nodes — liars must be outvoted, not just outlasted</text>
</svg>`,
      },
    },

    /* ── Q16 ── */
    {
      q: "A product has a critical bug causing data loss in 0.001% of users. Fix takes 3 months. Telling customers triggers regulatory review. What is the correct engineering leadership response?",
      opts: [
        "Fix silently — 0.001% is negligible statistical noise",
        "Disclose immediately with workaround, commit to fix timeline, implement preventive process changes. Hiding known defects causes greater legal, regulatory, and trust damage when discovered",
        "Wait until fix is ready, then disclose — no point alerting without a solution",
        "Attribute the issue to an external cause and delay responsibility",
      ],
      ans: "Disclose immediately with workaround, commit to fix timeline, implement preventive process changes. Hiding known defects causes greater legal, regulatory, and trust damage when discovered",
      cat: "Engineering Ethics",
      exp: "Step 1: Impact assessment first: 0.001% of how many users? If 1M users → 1,000 people losing data. 'Negligible percentage' can be 'significant absolute number' — always convert rates to actual affected count before deciding.<br/>Step 2: Legal obligation: GDPR Article 33 requires breach notification within 72 hours to supervisory authority. CCPA, HIPAA have similar requirements. Data loss = data breach in most jurisdictions. Hiding = regulatory violation on top of the bug.<br/>Step 3: Workaround before fix: can affected users be identified from logs? Can data be recovered from backups? Provide immediate workaround: 'Avoid feature X until patched' or migrate affected users to a clean state within 24 hours.<br/>Step 4: Transparent communication: 'We discovered a bug affecting [N] users causing [impact]. We are sorry. Here is what happened: [details]. Here is what you should do now: [workaround]. Fix timeline: [date]. Prevention: [process change].'<br/>Step 5: The hiding trap: 'only 0.001%' → companies that hide defects face 10–100× greater consequences on discovery: class action lawsuits, regulatory fines, catastrophic trust loss, media coverage. Therac-25, Boeing 737 MAX MCAS, Volkswagen emissions — cover-ups made everything dramatically worse.<br/>Step 6: Engineering culture signal: teams that feel safe reporting bugs early catch them small. Teams that fear punishment hide bugs until disasters occur. This response sets cultural precedent.<br/>✅ Bug disclosure: immediate notification + workaround + timeline + process change. Short-term disclosure pain << long-term damage of cover-up.",
    },

    /* ── Q17 ── */
    {
      q: "Design a global consensus system: 1/3 of participants are actively malicious, messages can be delayed up to 1 hour, and participants join/leave constantly. Is this solvable?",
      opts: [
        "Completely solvable with current distributed systems technology",
        "Partially: BFT handles 1/3 malicious in partial synchrony, but FLP impossibility proves no deterministic protocol achieves safety AND liveness in fully asynchronous networks. Real systems use partial synchrony assumptions or randomized protocols",
        "Completely impossible — give up",
        "Solved by blockchain — all three constraints are handled perfectly",
      ],
      ans: "Partially: BFT handles 1/3 malicious in partial synchrony, but FLP impossibility proves no deterministic protocol achieves safety AND liveness in fully asynchronous networks. Real systems use partial synchrony assumptions or randomized protocols",
      cat: "Impossible Thinking",
      exp: "Step 1: Constraint 1 — 1/3 malicious: BFT requires N ≥ 3f+1. If exactly 1/3 malicious: f = N/3 → need N+1 > N. Strictly MORE than 1/3 malicious makes BFT provably impossible (Byzantine Generals Problem, Lamport et al. 1982). Exactly 1/3 is the theoretical limit.<br/>Step 2: Constraint 2 — 1-hour message delay: FLP Impossibility (Fischer, Lynch, Paterson, 1985): In a fully asynchronous system (no timing guarantees), no deterministic distributed protocol can simultaneously guarantee Safety AND Liveness. This is a proven mathematical theorem.<br/>Step 3: Practical workaround: assume partial synchrony (Dwork-Lynch-Stockmeyer 1988). Network IS asynchronous, but after some unknown Global Stabilization Time (GST), messages are delivered within Δ. Protocols like PBFT, Tendermint, HotStuff are safe ALWAYS, live AFTER GST.<br/>Step 4: Randomized protocols: Ben-Or's algorithm uses random coin flip instead of deterministic leader election, achieving both safety and liveness probabilistically in asynchronous networks — circumvents FLP through randomness.<br/>Step 5: Constraint 3 — Dynamic membership (churn): permissioned BFT struggles with dynamic membership. Proof-of-Stake blockchains handle this via economic incentives + scheduled validator set rotations.<br/>Step 6: Honest answer: with 1/3 malicious + fully asynchronous + dynamic membership simultaneously — no perfect solution. Real systems (Ethereum, Tendermint) approximate by assuming partial synchrony and using economic incentives for stability.<br/>✅ FLP theorem + BFT limit are REAL mathematical results. Know them, articulate them, explain how systems navigate (not eliminate) these fundamental constraints.",
    },

    /* ── Q18 ── */
    {
      q: "A team estimates a feature at 2 weeks. After week 1, only 20% is complete. The deadline cannot move. How should engineering leadership reason and respond?",
      opts: [
        "Fire the team for missing estimates — accountability matters",
        "Diagnose systematically: was the estimate realistic? Is remaining 80% proportionally harder? → Scope negotiate an MVP → transparently communicate options to stakeholders → let them choose",
        "Force the team to work 80-hour weeks to recover",
        "Extend the deadline — estimates are always wrong anyway",
      ],
      ans: "Diagnose systematically: was the estimate realistic? Is remaining 80% proportionally harder? → Scope negotiate an MVP → transparently communicate options to stakeholders → let them choose",
      cat: "Trade-off Justification",
      exp: "Step 1: Before reacting, understand the data. 20% done in 50% of time — but is remaining 80% equally distributed? The first 20% of software is often infrastructure/setup (disproportionately hard); the next 60% may be faster. Ask: 'What was built? What remains specifically?'<br/>Step 2: Estimate accuracy audit: was the 2-week estimate based on well-defined requirements? Cone of Uncertainty: at project start, estimates can be off by 4×. Unknown unknowns discovered in week 1 are normal — not a team failure.<br/>Step 3: Hofstadter's Law: 'It always takes longer than you expect, even when you take into account Hofstadter's Law.' Estimates are systematically optimistic due to planning fallacy.<br/>Step 4: Iron Triangle: scope + quality + time are interdependent — fix two, the third flexes. Time is fixed → the only levers are scope reduction or quality reduction.<br/>Step 5: MVP scope negotiation: 'What is the minimal version delivering 80% of business value with 40% of the work?' De-scope to hit the deadline with reduced but functional feature. Communicate trade-off clearly to stakeholders.<br/>Step 6: Transparent communication NOW (not at deadline): 'We are at risk. Here are 3 options: A) MVP on time; B) Full scope 3 days late; C) Full scope on time with reduced testing.' Give stakeholders the decision — they own the priorities.<br/>Step 7: Post-mortem regardless of outcome: what caused the inaccuracy? Better estimation techniques: Planning Poker, Reference Class Forecasting (base-rate similar projects).<br/>✅ Missed milestone: diagnose → scope negotiate → transparently communicate options. Hiding until deadline = worst possible outcome.",
    },

    /* ── Q19 ── */
    {
      q: "Make a fair coin flip from a biased coin (unknown probability p of heads). What algorithm achieves this and what is its expected number of flips?",
      opts: [
        "Flip the biased coin once — bias is imperceptible for decisions",
        "Von Neumann's algorithm: flip twice. HT = Heads; TH = Tails; HH or TT = discard and repeat. Expected flips = 1/p(1−p)",
        "Flip 100 times and take the majority — law of large numbers averages out bias",
        "Multiply the coin's bias by 2 — mathematical adjustment",
      ],
      ans: "Von Neumann's algorithm: flip twice. HT = Heads; TH = Tails; HH or TT = discard and repeat. Expected flips = 1/p(1−p)",
      cat: "Impossible Thinking",
      exp: "Step 1: John Von Neumann (1951) solved this elegantly: flip the biased coin TWICE. Four outcomes: HH (prob p²), HT (prob p(1−p)), TH (prob (1−p)p), TT (prob (1−p)²).<br/>Step 2: Key insight: P(HT) = p(1−p) = P(TH). These two outcomes have EQUAL probability regardless of p — whether p = 0.1 or p = 0.9, the products are symmetric.<br/>Step 3: Rule: HT → output fair Heads; TH → output fair Tails; HH or TT → discard pair and repeat. Conditioning on 'useful' outcome: P(Heads | useful) = p(1−p) / (2p(1−p)) = 1/2. Perfect fairness.<br/>Step 4: Expected flips per round: 2 flips. Probability of useful outcome = 2p(1−p). Expected rounds = 1/(2p(1−p)). Expected total flips = 2/(2p(1−p)) = 1/p(1−p).<br/>Step 5: For p=0.5 (fair coin): expected flips = 1/0.25 = 4 (baseline). For p=0.1 (very biased): expected flips = 1/0.09 ≈ 11 — still finite, just more rounds needed. Efficiency degrades as p approaches 0 or 1.<br/>Step 6: This technique generalizes to: extracting uniform randomness from any biased source, random number generation from physical processes, cryptographic applications requiring uniform distribution.<br/>✅ Von Neumann extractor: flip twice, use asymmetric outcomes (HT vs TH) — the only outcomes with guaranteed equal probability under any bias.",
    },

    /* ── Q20 ── */
    {
      q: "You need to sort a list of numbers but are only allowed to ask YES/NO questions about pairs ('Is A > B?'). Each question costs $1 and you have a $50 budget for 100 numbers. Is this solvable optimally?",
      opts: [
        "Yes — any comparison sort works, needs exactly 50 comparisons",
        "No — comparison sort needs at least ⌈log₂(100!)⌉ ≈ 525 comparisons minimum — $50 budget is provably insufficient for exact sort",
        "Yes — use radix sort, no comparisons needed",
        "Yes — binary search on each element requires only O(log n) comparisons each",
      ],
      ans: "No — comparison sort needs at least ⌈log₂(100!)⌉ ≈ 525 comparisons minimum — $50 budget is provably insufficient for exact sort",
      cat: "Impossible Thinking",
      exp: "Step 1: This applies the comparison-based sorting lower bound theorem. Any comparison-based sort must distinguish between n! possible orderings.<br/>Step 2: Each YES/NO comparison provides at most 1 bit of information. To distinguish 100! orderings: need at least log₂(100!) bits.<br/>Step 3: Stirling's approximation: log₂(100!) = Σlog₂(k) for k=1..100 ≈ 100·log₂(100) − 100·log₂(e) ≈ 100×6.64 − 100×1.44 ≈ 664 − 144 ≈ 525 comparisons minimum.<br/>Step 4: With a $50 budget (50 comparisons), we can only distinguish 2^50 ≈ 10^15 orderings, but 100! ≈ 9.3×10^157 possible orderings exist. We are 142 orders of magnitude short — provably impossible to sort exactly.<br/>Step 5: What CAN $50 do? Partial sorting: identify the top-10 smallest elements, find the median approximately, determine rough quartiles. Useful for many practical applications even without full sort.<br/>Step 6: Alternative approaches within budget: approximate sorting algorithms, probabilistic orderings (70% confident in position ±5), or reframe the problem — 'what does the business actually need from this sorted list?'<br/>Step 7: Non-comparison sorts (radix sort, counting sort) bypass this bound by using digit structure — but require knowing the value range, not just comparison queries.<br/>✅ Comparison lower bound: ⌈log₂(n!)⌉ ≈ n·log₂(n) − n·log₂(e) minimum comparisons. $50 budget for 100 numbers is provably insufficient by factor of ~10×.",
    },

    /* ── Q21 ── */
    {
      q: "A medical AI system achieves 99% accuracy in detecting cancer — better than human radiologists (95%). Should you deploy it immediately as the primary diagnostic tool?",
      opts: [
        "Yes — 99% > 95%, deploy immediately",
        "No — must evaluate: what type of errors (false negatives = missed cancer vs false positives = unnecessary treatment), calibration, demographic bias, regulatory approval, human oversight model, and real-world distribution shift",
        "Yes — but only as a secondary tool after humans review first",
        "No — AI should never make medical decisions",
      ],
      ans: "No — must evaluate: what type of errors (false negatives = missed cancer vs false positives = unnecessary treatment), calibration, demographic bias, regulatory approval, human oversight model, and real-world distribution shift",
      cat: "Trade-off Justification",
      exp: "Step 1: '99% accuracy' hides critical information. In medical diagnosis with 1% prevalence (cancer is rare): a model predicting 'no cancer' for everyone achieves 99% accuracy while missing EVERY cancer patient. Accuracy is the wrong metric for imbalanced classes.<br/>Step 2: Error type matters enormously: False Negative (missed cancer) = delayed treatment, potentially fatal. False Positive (unnecessary biopsy) = anxiety, cost, procedure risk. These have very different consequences — must evaluate separately with sensitivity, specificity, AUC-ROC.<br/>Step 3: Calibration: when the model says '80% probability of cancer', does 80% of patients with that score actually have cancer? Poorly calibrated probabilities lead to wrong treatment thresholds.<br/>Step 4: Demographic bias: the training data likely overrepresents certain demographics. 99% overall accuracy might mean 99.5% for white males and 94% for Black females — regulatory and ethical failure even if aggregate looks good.<br/>Step 5: Regulatory pathway: FDA 510(k) clearance or PMA approval required for medical devices in the US. CE marking in EU. These processes exist precisely to catch deployment failures.<br/>Step 6: Distribution shift: hospital equipment varies, image protocols differ, patient populations differ. A model trained on one hospital's data may fail on another's. Requires prospective clinical trial validation.<br/>Step 7: Human oversight model: even if superior, AI as a 'second reader' (flags cases for human review) is more robust than AI as primary reader — catches AI systematic errors that humans would catch.<br/>✅ Medical AI: '99% accuracy' is insufficient — evaluate error types, calibration, bias, regulatory compliance, distribution shift, and human oversight model before any deployment.",
    },

    /* ── Q22 ── */
    {
      q: "Implement a system that detects when a data stream's statistical distribution has changed — without knowing what the new distribution will look like. (Concept drift detection)",
      opts: [
        "Impossible — you need the new distribution to detect change",
        "CUSUM or Page-Hinkley test: detect when cumulative sum of deviations from expected mean exceeds a threshold — triggers without knowing the new distribution",
        "Retrain the model every hour — eventually it will adapt",
        "Use a fixed sliding window and flag if any single value is an outlier",
      ],
      ans: "CUSUM or Page-Hinkley test: detect when cumulative sum of deviations from expected mean exceeds a threshold — triggers without knowing the new distribution",
      cat: "Incomplete Data",
      exp: "Step 1: Concept drift = the statistical properties of the target variable change over time, causing model performance to degrade. Detecting it without knowing the new distribution is the core challenge.<br/>Step 2: CUSUM (Cumulative Sum Control Chart): maintains a running sum of differences between observed values and expected mean. When the sum exceeds threshold h, drift is detected. No knowledge of the new distribution needed — only the expected (baseline) distribution.<br/>Step 3: Page-Hinkley Test: similar to CUSUM but designed for online sequential testing. Maintains: cumulative sum of differences (mₜ) and the minimum of mₜ observed so far. Alarm when mₜ − min(mₜ) > threshold λ. Adjustable sensitivity via λ.<br/>Step 4: DDM (Drift Detection Method): tracks error rate of a classifier. When error rate increases significantly (measured by standard deviations above historical minimum), drift is flagged. Works directly on model output — no raw data distribution needed.<br/>Step 5: ADWIN (Adaptive Windowing): maintains a variable-length window and cuts it when the mean of two sub-windows differs significantly. Provably optimal in a statistical sense for detecting distribution changes.<br/>Step 6: After detection: trigger model retraining on recent data, alert data team, log the change timestamp for forensic analysis. The detector doesn't need to know WHAT changed — just THAT it changed.<br/>✅ Concept drift detection: CUSUM/Page-Hinkley detects change without knowing the new distribution — monitors deviation from baseline, triggers on cumulative departure.",
    },

    /* ── Q23 ── */
    {
      q: "You're given a stream of integers. Design a structure to answer 'What is the most frequent element in the last W elements?' with O(1) query time and O(W) space. Updates arrive continuously.",
      opts: [
        "Maintain a sorted array of W elements — O(log W) update, O(W) space",
        "Sliding window with HashMap for counts + frequency tracking; but mode in sliding window requires careful design — use a lazy-deletion heap or segment tree approach for O(log W) update",
        "Store all W elements in a HashMap counting frequencies; O(1) amortized if you track the current maximum count carefully",
        "Impossible — mode in a sliding window cannot be maintained efficiently",
      ],
      ans: "Store all W elements in a HashMap counting frequencies; O(1) amortized if you track the current maximum count carefully",
      cat: "Incomplete Data",
      exp: "Step 1: This is the 'Sliding Window Mode' problem — harder than median or mean in a sliding window.<br/>Step 2: Approach: maintain a circular buffer of W elements (the window), a HashMap {element → count}, and a variable tracking current_max_count.<br/>Step 3: On new element x entering: add x to circular buffer; HashMap[x]++; if HashMap[x] > current_max_count: current_max_count++; current_mode = x.<br/>Step 4: On oldest element y leaving: HashMap[y]--; if HashMap[y] < current_max_count and y was the mode: need to find new mode. This is where naive approach breaks — decreasing max requires scanning HashMap.<br/>Step 5: Key insight: use a doubly-linked frequency list (similar to LFU cache design). Bucket each frequency: buckets[freq] = set of elements with that frequency. When element added: move from bucket[freq] to bucket[freq+1]. When removed: move to bucket[freq-1]. Delete empty buckets. O(1) per operation.<br/>Step 6: Query: current mode = any element in the bucket with maximum frequency key. O(1) lookup via a pointer to the max bucket.<br/>Step 7: Total: O(W) space (circular buffer + HashMap + frequency buckets), O(1) amortized per update, O(1) per query.<br/>✅ Sliding window mode: HashMap + frequency bucket linked list = O(1) amortized update and O(1) query — same structure as LFU cache.",
    },

    /* ── Q24 ── */
    {
      q: "A company has 1PB of data on-premises. They want to migrate to cloud in 30 days. Internet bandwidth is 10 Gbps. Is this achievable via network transfer?",
      opts: [
        "Yes — 10 Gbps is fast, 30 days is plenty of time",
        "No — 1PB / 10 Gbps = ~10 days theoretically, but real-world overhead (90% efficiency) makes it ~11 days for the transfer alone. Feasible by network with proper planning, but not 'safe' with 30 days for the FULL migration",
        "Yes — compress the data first and it easily fits in 30 days",
        "No — 1PB over 10 Gbps would take over a year",
      ],
      ans: "No — 1PB / 10 Gbps = ~10 days theoretically, but real-world overhead (90% efficiency) makes it ~11 days for the transfer alone. Feasible by network with proper planning, but not 'safe' with 30 days for the FULL migration",
      cat: "Fermi Estimation",
      exp: "Step 1: Calculate raw transfer time: 1 PB = 10^15 bytes = 8×10^15 bits. At 10 Gbps = 10^10 bits/second: time = 8×10^15 / 10^10 = 8×10^5 seconds = ~9.3 days theoretically.<br/>Step 2: Real-world efficiency: network links typically sustain 80-90% of theoretical throughput (TCP overhead, checksumming, retransmits, protocol overhead). At 90% efficiency: 9.3 / 0.9 ≈ 10.3 days for raw transfer.<br/>Step 3: But migration ≠ just data transfer. Remaining time needed: validation/checksumming (verify no data corruption): add 20% → +2 days. Application cutover, testing, rollback plan: add 5-7 days. Total: ~19-20 days of active work.<br/>Step 4: 30-day window: technically feasible with tight planning, but risky — no buffer for unexpected issues (network outages, data corruption discovered late, application compatibility issues).<br/>Step 5: Alternative: AWS Snowball / Azure Data Box — physical device shipped with 100TB capacity, loaded on-site, shipped back. 10 × 100TB devices = 1PB. Transit time: ~1 week. No internet bandwidth consumed. Safer and often cheaper for >100TB migrations.<br/>Step 6: Risk analysis: if network transfer hits a problem in week 3, there is almost no recovery time. Physical migration has built-in buffer.<br/>✅ Fermi estimation applied to data engineering: 1PB / 10Gbps ≈ 10 days raw transfer, ~20 days full migration. Achievable in 30 days but risky without buffer. Physical migration (Snowball) is safer.",
    },

    /* ── Q25 ── */
    {
      q: "A distributed system experiences 'gray failures' — nodes are partially functional (slow responses, wrong answers sometimes, normal behavior other times). Why are these harder than full failures?",
      opts: [
        "Gray failures are easier — partial functionality means some work still gets done",
        "Gray failures evade detection: timeout-based health checks see intermittent success, making the node appear healthy while causing subtle data corruption or performance degradation that's hard to diagnose",
        "Gray failures are only relevant in network routers, not application servers",
        "Gray failures are solved by increasing heartbeat frequency",
      ],
      ans: "Gray failures evade detection: timeout-based health checks see intermittent success, making the node appear healthy while causing subtle data corruption or performance degradation that's hard to diagnose",
      cat: "Impossible Thinking",
      exp: "Step 1: Full failures are 'easy' — the node stops responding, health checks fail, it's removed from the pool, traffic reroutes. Clear cause, clear fix.<br/>Step 2: Gray failure examples: a node responds correctly 95% of the time but returns stale data 5% of the time; a disk that reads correctly but silently corrupts writes; a network link with 2% packet loss causing TCP retransmits; a CPU throttling due to thermal issues, causing some requests to timeout.<br/>Step 3: Why they evade detection: simple timeout-based health checks (ping every 30 seconds) see the 95% success responses and mark the node healthy. The 5% failures are attributed to 'transient network issues' — not the failing node.<br/>Step 4: Detection approaches: percentile monitoring (P99 latency, not just average — gray failures often show up in tail latency), semantic health checks (verify correctness of responses, not just that they arrive), end-to-end transaction tracing (correlate specific requests to specific nodes to find which node causes failures), canary analysis (route a percentage of traffic to each node and compare success rates statistically).<br/>Step 5: Chaos Engineering (Netflix Chaos Monkey) specifically tests gray failure scenarios: inject latency, drop packets, cause partial failures — verify the system detects and responds correctly before it happens in production.<br/>Step 6: Gray failures are why Netflix invented the circuit breaker pattern and chaos engineering — full failures were manageable; gray failures were killing them subtly.<br/>✅ Gray failures: partial functionality evades simple health checks, causes subtle degradation. Detect with percentile monitoring, semantic checks, and statistical traffic comparison.",
    },

    /* ── Q26 ── */
    {
      q: "Design an algorithm to fairly divide a cake (resource) among N people where each person has different preferences over different parts of the cake. What is the correct framework?",
      opts: [
        "Cut cake into N equal pieces by weight — simple and fair",
        "Envy-free cake cutting: each person receives a piece they prefer at least as much as any other person's piece. The Selfridge-Conway procedure achieves this for N=3; for N≥4 the Austin-Brams-Taylor protocol works but requires potentially infinite cuts",
        "Auction: highest bidder gets first choice, second bidder next, etc.",
        "Random assignment — on average everyone gets equal value",
      ],
      ans: "Envy-free cake cutting: each person receives a piece they prefer at least as much as any other person's piece. The Selfridge-Conway procedure achieves this for N=3; for N≥4 the Austin-Brams-Taylor protocol works but requires potentially infinite cuts",
      cat: "Impossible Thinking",
      exp: "Step 1: 'Fair' must be precisely defined. Three concepts: Proportionality (each gets ≥ 1/N of their perceived value), Envy-freeness (no one prefers another's piece to their own), Equitability (each person values their piece equally).<br/>Step 2: Envy-freeness is the gold standard for fairness. It implies proportionality but is strictly stronger.<br/>Step 3: For N=2: 'I cut, you choose' — simple, envy-free, known since antiquity.<br/>Step 4: For N=3 (Selfridge-Conway protocol, 1960): Person 1 cuts into 3 pieces they consider equal. Person 2 trims the largest piece to make top-two equal (trimming set aside). Person 3 chooses, then Person 2 (must take trimmed piece if available), then Person 1. Trimming divided separately. Finite cuts, envy-free.<br/>Step 5: For N≥4 (Brams-Taylor 1995): first finite, bounded algorithm for envy-free division of N people. However, the number of cuts can be astronomically large in theory — practically useful but theoretically unsatisfying.<br/>Step 6: This framework applies to: distributed resource allocation (CPU time, bandwidth, storage), inheritance disputes, divorce settlements, spectrum auctions (FCC uses related mechanisms), international treaty resource division.<br/>✅ Envy-free cake cutting: Selfridge-Conway for N=3 (finite), Brams-Taylor for N≥4. Maps directly to fair resource allocation in computing systems.",
    },

    /* ── Q27 ── */
    {
      q: "You must predict which of 1 million users will churn next month, but you can only afford to contact 10,000 users with a retention offer. How do you allocate the 10,000 interventions optimally?",
      opts: [
        "Contact the 10,000 users with highest predicted churn probability",
        "Contact the 10,000 users where the intervention has the highest expected UPLIFT (change in retention probability due to the offer) — not just highest churn probability",
        "Randomly select 10,000 users — A/B test validates the model anyway",
        "Contact users who have churned before — they are the highest risk",
      ],
      ans: "Contact the 10,000 users where the intervention has the highest expected UPLIFT (change in retention probability due to the offer) — not just highest churn probability",
      cat: "Trade-off Justification",
      exp: "Step 1: This is the 'uplift modeling' or 'causal inference' problem — a subtle but critical distinction from standard predictive modeling.<br/>Step 2: Targeting highest churn probability is wrong because: some users will churn regardless of the offer (lost causes — waste the offer); some users will NOT churn regardless of no offer (sure things — waste the offer); only 'persuadables' (churned IF no offer, retained WITH offer) benefit from intervention.<br/>Step 3: Four user segments (Rubin potential outcomes framework):<br/>• Sure Things: retain with or without offer<br/>• Lost Causes: churn with or without offer<br/>• Sleeping Dogs: retain without offer, churn WITH offer (offer irritates them!)<br/>• Persuadables: retain WITH offer, churn without<br/>Step 4: Uplift model: train a model predicting P(retain | offer) − P(retain | no offer) for each user. Rank by this difference (uplift), target top 10,000 by uplift score.<br/>Step 5: Building uplift models requires randomized control data (A/B test with random intervention assignment) to estimate counterfactuals.<br/>Step 6: Real business impact: targeting top 10,000 by churn probability might reach 80% lost causes; targeting by uplift concentrates interventions on persuadables → 3–5× higher retention per dollar spent.<br/>Step 7: Used in: political campaigns (targeting persuadable voters, not committed supporters), clinical trials, personalized marketing, public health interventions.<br/>✅ Causal vs predictive modeling: target uplift (causal effect of intervention), not just churn probability (observational prediction). Different objective → different model → dramatically different ROI.",
    },

    /* ── Q28 ── */
    {
      q: "Estimate the number of bytes of data generated globally per day in 2025. Structured Fermi approach required.",
      opts: [
        "Impossible — no one knows this number",
        "~328 exabytes/day: derive from internet users × devices × usage patterns × IoT × enterprise data, cross-check with known anchor points",
        "Exactly 1 terabyte per day — manageable amount",
        "1 petabyte per day — a reasonable order of magnitude",
      ],
      ans: "~328 exabytes/day: derive from internet users × devices × usage patterns × IoT × enterprise data, cross-check with known anchor points",
      cat: "Fermi Estimation",
      exp: "Step 1: Break into major data generation categories:<br/>Step 2: Internet traffic: ~5 billion internet users × 4 devices each × 10 GB/device/day average = 200 exabytes/day from internet usage alone (video streaming dominates: Netflix HD = 3GB/hour).<br/>Step 3: IoT devices: ~15 billion IoT devices (sensors, cameras, industrial) × 0.1 MB/day average = 1.5 petabytes/day → negligible compared to human-generated video.<br/>Step 4: Enterprise data: 50 million businesses × 1 GB/day average (transactions, logs, communications) = 50 petabytes/day.<br/>Step 5: Social media: 3.5 billion social media users × 10 MB/day (posts, photos, videos created) = 35 petabytes/day.<br/>Step 6: Surveillance/CCTV: 1 billion cameras × 100 MB/day processed = 100 petabytes/day (much deleted but generated).<br/>Step 7: Total rough estimate: 200 + 0.0015 + 0.05 + 0.035 + 0.1 ≈ 200 exabytes/day. Published estimates (IDC, Statista) for 2025 are ~328 exabytes/day — we're within the right order of magnitude.<br/>Step 8: Cross-check: 328 exabytes/day = 120,000 exabytes/year ≈ 120 zettabytes/year. IDC's 2025 Global DataSphere forecast: ~175 zettabytes total created/captured/copied — consistent with our estimate.<br/>✅ Global data Fermi: decompose by user category, anchor to known usage figures, cross-check with published reports. Being within 2× is excellent for a Fermi estimate.",
    },

    /* ── Q29 ── */
    {
      q: "A recursive algorithm has recurrence T(n) = T(n−1) + T(n−2) + O(1). What is its time complexity and how do you optimize it?",
      opts: [
        "O(n) — linear recursion",
        "O(2^n) exponential due to overlapping subproblems; optimize with memoization/DP to O(n) time O(n) space, or matrix exponentiation to O(log n) time",
        "O(n²) — quadratic due to two recursive calls",
        "O(n log n) — merge-sort style recursion",
      ],
      ans: "O(2^n) exponential due to overlapping subproblems; optimize with memoization/DP to O(n) time O(n) space, or matrix exponentiation to O(log n) time",
      cat: "Impossible Thinking",
      exp: "Step 1: This recurrence is the Fibonacci sequence. T(n) = T(n−1) + T(n−2) + O(1). The recursion tree has exponential branching — each call spawns 2 recursive calls, leading to O(2^n) total calls.<br/>Step 2: The 'impossible' aspect: this LOOKS like it should be linear (counting down to base case), but the two recursive branches cause exponential blow-up. Many students make this mistake.<br/>Step 3: Optimization Level 1 — Memoization (top-down DP): store computed F(k) values in a cache. Each unique subproblem computed exactly once → O(n) time, O(n) space. Simple to implement.<br/>Step 4: Optimization Level 2 — Bottom-up DP: compute F(0), F(1), F(2)... F(n) iteratively → O(n) time, O(1) space (only need previous two values).<br/>Step 5: Optimization Level 3 — Matrix exponentiation: [F(n+1), F(n)] = [[1,1],[1,0]]^n × [F(1), F(0)]. Compute matrix power using fast exponentiation (repeated squaring) in O(log n) matrix multiplications. Each matrix multiply: O(1) for 2×2 matrices → O(log n) total.<br/>Step 6: Optimization Level 4 — Closed-form (Binet's formula): F(n) = (φ^n − ψ^n)/√5 where φ=(1+√5)/2. O(1) computation — but floating-point precision issues for large n make it impractical without arbitrary precision arithmetic.<br/>✅ Fibonacci recurrence: O(2^n) naïve → O(n) with DP → O(log n) with matrix exponentiation. Three levels of optimization, each a different algorithmic technique.",
    },

    /* ── Q30 ── */
    {
      q: "Design a system where users can search their own emails semantically (e.g., 'find that email about the Tokyo project budget'). Key challenge: private data must never leave the user's device.",
      opts: [
        "Send all emails to a central server with a search index — standard approach",
        "On-device vector embeddings + local vector database (FAISS/LanceDB); embed queries on-device; semantic similarity search locally; nothing ever leaves the device",
        "Simple keyword search on-device — no need for semantic search",
        "Zero-knowledge proofs to search on encrypted server — theoretically possible but impractical",
      ],
      ans: "On-device vector embeddings + local vector database (FAISS/LanceDB); embed queries on-device; semantic similarity search locally; nothing ever leaves the device",
      cat: "Trade-off Justification",
      exp: "Step 1: Privacy constraint eliminates server-side solutions — all computation must happen on-device. This severely limits compute and storage.<br/>Step 2: On-device ML models: use a small, quantized embedding model (e.g., MiniLM, all-MiniLM-L6-v2 quantized to INT8 → ~20MB). Runs on CPU/NPU in <100ms per email.<br/>Step 3: Indexing pipeline: when new email arrives → run through embedding model → 384-dimensional vector → store in local FAISS index (Facebook AI Similarity Search) → flat or HNSW index for fast nearest-neighbor lookup.<br/>Step 4: Query time: user types query → embed query on-device → FAISS finds K-nearest email vectors → rank by cosine similarity → return results in <50ms for 100,000 emails.<br/>Step 5: Storage: 100,000 emails × 384 floats × 4 bytes = ~150MB for vectors alone. Acceptable on modern smartphones (256GB+ storage). Compressed INT8 reduces to ~37MB.<br/>Step 6: Trade-offs: on-device compute limits model size → smaller models → slightly worse semantic understanding than server-based GPT-4. Acceptable trade-off for privacy. Model quality improving rapidly (Apple Intelligence, Google Gemini Nano).<br/>Step 7: This is exactly how Apple's on-device search, Apple Mail Smart Search, and newer Spotlight features work — local embeddings, local vector search, zero server communication.<br/>✅ Privacy-preserving semantic search: on-device embedding model + local vector database. Trade-off: model quality vs. absolute privacy. Increasingly viable as on-device AI improves.",
    },

    /* ── Q31 ── */
    {
      q: "Two engineers disagree: Engineer A says 'always normalize your database to 3NF'. Engineer B says 'denormalize for read performance'. Who is right?",
      opts: [
        "Engineer A — normalization is always correct database design",
        "Engineer B — denormalization always wins for performance",
        "Both are right in different contexts: 3NF for write-heavy/transactional systems; denormalization for read-heavy/analytical systems. The PACELC theorem extends this reasoning",
        "Neither — NoSQL eliminates the normalization debate entirely",
      ],
      ans: "Both are right in different contexts: 3NF for write-heavy/transactional systems; denormalization for read-heavy/analytical systems. The PACELC theorem extends this reasoning",
      cat: "Trade-off Justification",
      exp: "Step 1: Third Normal Form (3NF) eliminates data redundancy and update anomalies: every non-key attribute depends only on the primary key (no transitive dependencies). Benefits: consistency guaranteed, no duplicate data, write operations simple.<br/>Step 2: 3NF cost: reads require JOINs across normalized tables. For an OLTP query like 'show user's full order with product details and shipping address' → JOIN users + orders + order_items + products + addresses → 5 tables → slow for read-heavy workloads.<br/>Step 3: Denormalization: store redundant data to eliminate JOINs. Store user_name directly in the orders table (duplicate from users). Benefit: single-table reads are fast. Cost: writes must update multiple places, risk of inconsistency.<br/>Step 4: Context determines the answer:<br/>• Financial OLTP (write-heavy, consistency critical) → 3NF. One source of truth prevents inconsistency in balances.<br/>• Analytics/Reporting (read-heavy, OLAP) → Star schema (fact + dimension tables, denormalized) → Columnar storage (BigQuery, Snowflake) → further denormalize for scan performance.<br/>• High-traffic web apps → Hybrid: normalized relational DB for writes + materialized views / cache layer for reads.<br/>Step 5: PACELC theorem (extension of CAP): during normal operation (no partition), distributed systems choose between Latency and Consistency. Denormalization trades consistency (risk) for latency (benefit).<br/>✅ Both engineers are right — in different contexts. 3NF for write-heavy/consistency-critical; denormalization for read-heavy/latency-critical. Great engineers know both and apply contextually.",
    },

    /* ── Q32 ── */
    {
      q: "An online learning algorithm must handle a data stream where the data-generating process itself changes over time (non-stationary environment). Standard gradient descent diverges. Best solution?",
      opts: [
        "Increase the learning rate — adapts faster to changes",
        "Decrease the learning rate to zero — converges to stable minimum",
        "Use an adaptive learning rate with a sliding window or exponential forgetting: recent data weighted more, old data discounted. Adam optimizer with periodic resets or meta-learning (MAML) for fast adaptation",
        "Stop training once converged — changes are just noise",
      ],
      ans: "Use an adaptive learning rate with a sliding window or exponential forgetting: recent data weighted more, old data discounted. Adam optimizer with periodic resets or meta-learning (MAML) for fast adaptation",
      cat: "Evolving Constraints",
      exp: "Step 1: Non-stationary environments violate the fundamental assumption of most ML algorithms: that training and test data come from the same distribution.<br/>Step 2: Standard SGD with decreasing learning rate: designed to converge to a minimum — but if the minimum MOVES (distribution shifts), converging to the old minimum is wrong. Need to keep adapting.<br/>Step 3: Fixed learning rate: doesn't converge (oscillates around minimum) but does track slowly moving targets. Simple but crude.<br/>Step 4: Sliding window: train only on the most recent W samples. Effectively 'forgets' old data after W steps. Choice of W is critical: too small = noisy, too large = slow to adapt.<br/>Step 5: Exponential forgetting: weight sample at time t by e^(−λ(current_time − t)). Recent samples weight ~1.0; old samples weight ~0. Elegant and continuous — no hard window boundary.<br/>Step 6: MAML (Model-Agnostic Meta-Learning): learn an initialization that can be quickly fine-tuned to new distributions with few gradient steps. Explicitly optimizes for fast adaptation — 'learn to learn' rather than 'learn a fixed solution'.<br/>Step 7: Continual Learning / Elastic Weight Consolidation (EWC): remember important weights from previous tasks while adapting to new data. Prevents 'catastrophic forgetting' — adapts to new distribution while retaining relevant old knowledge.<br/>✅ Non-stationary learning: exponential forgetting (simple, effective) or MAML (meta-learning for fast adaptation). Standard convergence assumptions break — need explicit mechanisms to track moving targets.",
    },

    /* ── Q33 ── */
    {
      q: "You discover your company's recommendation algorithm has a 'filter bubble' effect — users only see content reinforcing existing beliefs. Multiple stakeholders want different fixes. How do you resolve this?",
      opts: [
        "Remove personalization entirely — show everyone the same content",
        "Maximize clicks — the algorithm is working correctly by definition",
        "Define 'diversity' explicitly as a measurable metric, build a multi-objective optimization balancing relevance AND diversity, run controlled experiments, document trade-offs transparently for stakeholders",
        "Add a random 10% diverse content injection — simple fix",
      ],
      ans: "Define 'diversity' explicitly as a measurable metric, build a multi-objective optimization balancing relevance AND diversity, run controlled experiments, document trade-offs transparently for stakeholders",
      cat: "Trade-off Justification",
      exp: "Step 1: 'Filter bubble' is a values disagreement disguised as a technical problem. Different stakeholders define 'fix' differently: regulators want viewpoint diversity; users want relevance; editorial team wants quality journalism; advertisers want engagement; ethicists want reduced polarization. Cannot satisfy all simultaneously.<br/>Step 2: First step: make 'diversity' measurable. Options: intra-list diversity (variance in topic/source/viewpoint within a session's recommendations), novelty (how different from user's history), serendipity (surprising but relevant), ideological balance (measure political leaning distribution).<br/>Step 3: Multi-objective optimization: instead of maximizing single metric (clicks), optimize Pareto frontier across (relevance, diversity, engagement, quality). Different operating points on this frontier for different contexts (breaking news vs. entertainment browsing).<br/>Step 4: Controlled experiments (A/B tests): measure the actual effect of diversity injection on: user satisfaction, session length, return rate, content completion rate, long-term retention. 'Random 10% diverse' FEELS like a fix but may destroy trust and engagement without solving polarization.<br/>Step 5: Stakeholder communication: present the trade-off explicitly. 'Increasing diversity by X% reduces engagement by Y% and increases content breadth by Z%.' Let stakeholders choose the operating point on the Pareto frontier — this is a values decision, not a technical one.<br/>Step 6: Document decisions: record what trade-off was chosen, why, with what data, by whom. Protects the engineering team legally and organizationally if regulators later question the approach.<br/>✅ Filter bubble: define diversity metrics → multi-objective optimization → A/B test → present Pareto trade-off to stakeholders. Values decisions belong to stakeholders with data; implementation belongs to engineers.",
    },

    /* ── Q34 ── */
    {
      q: "A hash function maps keys to [0, M-1]. With N keys and M buckets, what is the expected number of empty buckets, and when does the 'birthday paradox' apply?",
      opts: [
        "Empty buckets = M − N always; birthday paradox doesn't apply to hash tables",
        "Expected empty buckets = M × (1 − 1/M)^N ≈ M/e when N=M; birthday paradox applies — first collision expected after ~√(2M·ln2) ≈ 1.18√M insertions",
        "Empty buckets = 0 when N = M — perfectly distributed",
        "Birthday paradox only applies to cryptographic hash functions, not general hash tables",
      ],
      ans: "Expected empty buckets = M × (1 − 1/M)^N ≈ M/e when N=M; birthday paradox applies — first collision expected after ~√(2M·ln2) ≈ 1.18√M insertions",
      cat: "Impossible Thinking",
      exp: "Step 1: For each bucket, probability it remains empty after N insertions = (1 − 1/M)^N (each of N keys independently misses it).<br/>Step 2: Expected empty buckets = M × (1 − 1/M)^N. When N=M: = M × (1−1/M)^M → M × e^(−1) ≈ M/e ≈ 0.368M. So ~36.8% of buckets are empty when load factor = 1. This seems counterintuitive but is mathematically exact.<br/>Step 3: The Birthday Paradox: With M possible hash values, the probability of a collision exceeds 50% after approximately √(2M·ln2) ≈ 1.18√M insertions — NOT M insertions as naively expected.<br/>Step 4: Cryptographic implication: SHA-256 has M = 2^256 possible values. Expected first collision at ~1.18 × 2^128 hashes — 'collision resistance' refers to needing ~2^128 work, not 2^256. This is why SHA-256 has 128-bit collision security, not 256-bit.<br/>Step 5: Hash table implication: with load factor α = N/M, expected chain length = α, but some chains are much longer (due to Poisson distribution of bucket occupancy). Maximum chain length ≈ O(log N / log log N) with high probability for uniform hashing.<br/>Step 6: Design implication: hash tables should maintain α < 0.7 (resize before load factor exceeds 0.7) to keep expected chain length manageable and avoid the clustering effect.<br/>✅ Birthday paradox in hashing: collisions expected after √M insertions (not M). 36.8% buckets empty at N=M. Critical for hash table performance and cryptographic security analysis.",
    },

    /* ── Q35 ── */
    {
      q: "You must allocate 1000 hospital beds among 5 cities during a pandemic, with incomplete and noisy case count data, and case counts changing daily. What framework do you use?",
      opts: [
        "Allocate proportionally to current case counts — simple and fair",
        "Sequential decision making under uncertainty: Bayesian updating of case count estimates + multi-armed bandit allocation + explicit reallocation policy + counterfactual tracking",
        "Give each city 200 beds — equal allocation is fairest",
        "Wait until data is more complete before allocating",
      ],
      ans: "Sequential decision making under uncertainty: Bayesian updating of case count estimates + multi-armed bandit allocation + explicit reallocation policy + counterfactual tracking",
      cat: "Incomplete Data",
      exp: "Step 1: Noisy, incomplete, changing data = classic sequential decision-making under uncertainty. Static optimization fails because the optimal allocation changes daily.<br/>Step 2: Bayesian case count estimation: treat each city's true case count as a latent variable with a prior (previous day's estimate + epidemiological model). Update posterior daily as new (noisy) observations arrive. Use the posterior distribution, not just point estimates.<br/>Step 3: Multi-armed bandit allocation: treat each city as an 'arm'. Reward = lives saved per bed allocated. Use Thompson Sampling or UCB on city-level reward estimates to balance: exploitation (allocate to currently highest-need cities) vs exploration (uncertainty about which cities may explode in cases soon).<br/>Step 4: Reallocation policy: beds cannot be instantly moved (transport, staff, setup time). Build in a reallocation lag parameter. Penalize excessive reallocation in the optimization objective (stability has value).<br/>Step 5: Counterfactual tracking: record what allocation was made and why. This enables: learning what worked (update the reward model), accountability (defend decisions to regulators), and post-hoc analysis to improve future allocations.<br/>Step 6: Explicit uncertainty communication: 'City X allocation based on estimated 800 cases ± 150. If actual cases exceed 1000, trigger emergency reallocation protocol.' Communicating uncertainty IS part of the system design.<br/>✅ Pandemic resource allocation: Bayesian uncertainty + bandit allocation + reallocation policy + counterfactual tracking = principled sequential decision-making. Not 'wait for perfect data' — act now with uncertainty quantified.",
    },

    /* ── Q36 ── */
    {
      q: "An algorithm runs in O(n log n) on random inputs but O(n²) on adversarially chosen inputs. You want O(n log n) worst-case. What is the general technique?",
      opts: [
        "Run the algorithm multiple times and take the best result",
        "Randomize the input before processing (random permutation / random pivots). An adversary cannot know your random seed and cannot construct a worst case — expected O(n log n) becomes the effective worst case",
        "Use a different algorithm that is always O(n log n) regardless of input",
        "Limit input size to prevent adversarial inputs",
      ],
      ans: "Randomize the input before processing (random permutation / random pivots). An adversary cannot know your random seed and cannot construct a worst case — expected O(n log n) becomes the effective worst case",
      cat: "Adversarial Reasoning",
      exp: "Step 1: This is the core insight behind randomized algorithms against adversarial inputs: randomization makes the algorithm's behavior independent of the input order.<br/>Step 2: Quicksort example: deterministic quicksort with first-element pivot → adversary provides sorted array → O(n²). Randomized quicksort: random pivot → adversary cannot predict which element will be pivot → expected O(n log n) for ALL input sequences, including adversarially crafted ones.<br/>Step 3: Formal guarantee: 'Expected O(n log n)' for randomized quicksort means: for any fixed input (including the adversary's worst case), the expected running time over random choices is O(n log n). The adversary's choice of input cannot exceed the expectation.<br/>Step 4: Adversarial model distinction: in the 'oblivious adversary' model (adversary doesn't know random choices), randomization fully defeats adversarial inputs. In the 'adaptive adversary' model (adversary sees random choices), different techniques needed.<br/>Step 5: Beyond sorting: treap (randomized BST), skip lists, hashing with random hash functions, random projections in dimensionality reduction — all use randomization to defeat adversarial inputs that would break deterministic versions.<br/>Step 6: Cryptographic connection: secure hash functions use randomization (salt) for exactly this reason — prevents precomputed adversarial inputs (rainbow tables).<br/>✅ Defeating adversarial inputs: randomize the algorithm's choices (not the input). Adversary cannot construct a worst case without knowing your random seed. Expected complexity becomes the effective worst-case guarantee.",
    },

    /* ── Q37 ── */
    {
      q: "You must design a system to detect coordinated inauthentic behavior (bot networks, fake review rings) on a social platform. What makes this harder than spam detection?",
      opts: [
        "It is not harder — same techniques apply",
        "Individual bots look like normal users; the pattern only emerges at the NETWORK level (synchronized behavior, shared infrastructure, coordinated posting). Must detect graph-level anomalies, not just account-level signals",
        "Harder only because bots evolve faster than spam",
        "Easier because bots have obvious machine-generated content",
      ],
      ans: "Individual bots look like normal users; the pattern only emerges at the NETWORK level (synchronized behavior, shared infrastructure, coordinated posting). Must detect graph-level anomalies, not just account-level signals",
      cat: "Adversarial Reasoning",
      exp: "Step 1: Spam detection: individual accounts have detectable signals — high volume, suspicious links, keyword patterns. Each account is independently anomalous.<br/>Step 2: Coordinated inauthentic behavior: individual accounts are carefully crafted to look legitimate — realistic profile photos (GAN-generated), plausible posting history, normal engagement rates. Single-account signals are clean. The anomaly is the COORDINATION.<br/>Step 3: Network-level signals to detect coordination:<br/>• Synchronized posting: multiple accounts posting the same content within seconds of each other (timing correlation)<br/>• Shared infrastructure: accounts registered from the same IP subnets, using the same device fingerprints, or accessing via the same VPN exit nodes<br/>• Follower graph structure: bot farms follow each other in dense clusters ('closed triads') that differ from organic social graph topology<br/>• Behavioral synchronization: accounts simultaneously perform actions (like, share, comment) in statistically impossible coordination<br/>Step 4: Technical approaches: graph neural networks (GNNs) to detect anomalous community structure; temporal analysis of action synchronization; entity resolution to link accounts via shared infrastructure; anomaly detection on the social graph's spectral properties.<br/>Step 5: Cat-and-mouse dynamics: detection → evasion → re-detection. Sophistication of bots tracks sophistication of detection (like antivirus vs. malware). Requires continuous model updates and human review of novel evasion techniques.<br/>Step 6: Facebook's Coordinated Inauthentic Behavior (CIB) takedowns, Twitter's Information Operations reports, and Stanford Internet Observatory research all use graph-level detection — account-level signals alone are insufficient.<br/>✅ Coordinated inauthentic behavior: individual accounts look clean; detect at network level via timing correlation, shared infrastructure, and graph topology anomalies.",
    },

    /* ── Q38 ── */
    {
      q: "A system must make real-time decisions (< 1ms) using a complex ML model that takes 500ms to run. You cannot change the model. What architectural patterns resolve this?",
      opts: [
        "Impossible — if the model takes 500ms, the decision takes 500ms",
        "Pre-compute predictions for likely inputs and cache them; use approximate nearest neighbor lookup to find cached result for the current input; fall back to simplified surrogate model for truly novel inputs",
        "Run the model in parallel for all possible inputs simultaneously",
        "Use a faster programming language to speed up model inference to under 1ms",
      ],
      ans: "Pre-compute predictions for likely inputs and cache them; use approximate nearest neighbor lookup to find cached result for the current input; fall back to simplified surrogate model for truly novel inputs",
      cat: "System Limits",
      exp: "Step 1: 500ms model vs 1ms requirement = 500× gap. Cannot be bridged by hardware or code optimization alone — requires architectural rethinking.<br/>Step 2: Prediction caching: if the input space is bounded or has high repetition (e.g., credit scores, ad targeting for known users), pre-compute model outputs for common inputs offline. At runtime: cache lookup in O(1) < 1ms.<br/>Step 3: ANN (Approximate Nearest Neighbor) lookup: represent each input as a vector (feature embedding). Store precomputed (input_vector → prediction) pairs in a FAISS or Annoy index. At runtime: embed new input → find nearest cached input → return its prediction. ANN lookup: < 10ms for millions of entries.<br/>Step 4: Surrogate model: train a simpler, faster model (decision tree, linear model) to mimic the complex model's behavior. Surrogate runs in < 1ms. Used for inputs not in cache. Accept slightly lower accuracy for the real-time constraint.<br/>Step 5: Asynchronous prediction: serve the real-time decision with a simple heuristic, then run the full model asynchronously and update the decision if it changes (if action is reversible). Separates latency from accuracy concerns.<br/>Step 6: Model distillation: offline, train a smaller 'student' model to match the 'teacher' model's predictions. Student achieves 90-95% of teacher accuracy at 10-50× less inference time. May get under 1ms for simple inputs.<br/>Step 7: This architecture pattern is used in: real-time ad bidding (complex ML models cached/distilled for millisecond auctions), fraud detection, autonomous vehicle perception.<br/>✅ 500ms model → 1ms decision: prediction cache + ANN lookup + surrogate fallback. Architecture solves what hardware cannot.",
    },

    /* ── Q39 ── */
    {
      q: "Design a system to give informed consent for data collection in a country where users have an average 6th-grade reading level and most are not tech-savvy. Current consent flows fail. What do you do?",
      opts: [
        "Simplify the legal text — make it shorter",
        "Use progressive disclosure with layered consent: one-sentence summary + visual icons + 'tell me more' for depth; test comprehension with 3 quiz questions; require correct answers to proceed; make opting out as easy as opting in",
        "Show the full legal text — users must read it themselves",
        "Don't collect data — consent is too hard to obtain properly",
      ],
      ans: "Use progressive disclosure with layered consent: one-sentence summary + visual icons + 'tell me more' for depth; test comprehension with 3 quiz questions; require correct answers to proceed; make opting out as easy as opting in",
      cat: "Engineering Ethics",
      exp: "Step 1: The problem: traditional consent flows are designed by lawyers for legal compliance, not for actual informed decision-making. They fail the population they're meant to protect.<br/>Step 2: Progressive disclosure (layered consent): Layer 1 — one sentence in plain language: 'We collect your location to show ads. You can turn this off.' Layer 2 — visual icons showing what data, who gets it, how long it's kept. Layer 3 — 'Tell me more' expands to full legal text for those who want it.<br/>Step 3: Comprehension verification: 3 simple quiz questions after the summary: 'Will we share your data with advertisers? (Yes/No)' etc. Cannot proceed without 2/3 correct. Re-reads the relevant section if wrong. Measures actual understanding, not just checkbox clicks.<br/>Step 4: Symmetric opt-out: 'Dark patterns' make opting out require 15 clicks while opting in requires 1. Require that opt-out path has identical steps to opt-in. EU's GDPR and recent FTC guidance require this.<br/>Step 5: A/B test comprehension: measure actual user understanding of data practices via follow-up surveys, not just completion rate of consent flow. Optimize for comprehension, not consent rate.<br/>Step 6: Accessibility: ensure consent flow works for screen readers, low-literacy users (audio option), multiple languages (auto-detect user's language preference).<br/>Step 7: This is not just ethics — it's regulatory compliance in the EU (GDPR Article 7: consent must be freely given, specific, informed, unambiguous; easily withdrawn as given) and emerging US state laws.<br/>✅ Informed consent engineering: progressive disclosure + visual design + comprehension testing + symmetric opt-out. Design for understanding, not compliance checkbox.",
    },

    /* ── Q40 ── */
    {
      q: "You must estimate the speed of light using only everyday objects and no electronic instruments. What physical reasoning gives you the right order of magnitude?",
      opts: [
        "Impossible without instruments",
        "Rømer's 1676 method: observe timing delay in Jupiter's moon eclipses as Earth moves closer/farther from Jupiter. Speed of light = diameter of Earth's orbit / timing delay. Gives correct order of magnitude with naked-eye observations",
        "Throw a ball and extrapolate — light is just a very fast ball",
        "Count seconds between lightning and thunder and scale up",
      ],
      ans: "Rømer's 1676 method: observe timing delay in Jupiter's moon eclipses as Earth moves closer/farther from Jupiter. Speed of light = diameter of Earth's orbit / timing delay. Gives correct order of magnitude with naked-eye observations",
      cat: "Fermi Estimation",
      exp: "Step 1: Ole Rømer (1676) first measured the speed of light without electronics using only telescope observations of Jupiter's moon Io. This demonstrates that 'no electronics' ≠ 'impossible'.<br/>Step 2: Method: Io orbits Jupiter with a period of ~42.5 hours. As Earth moves AWAY from Jupiter (6 months of Earth's orbit), Io's eclipse appears to happen progressively LATER than predicted. As Earth moves TOWARD Jupiter, eclipses appear earlier.<br/>Step 3: The total timing discrepancy over 6 months = ~22 minutes (Rømer's measurement; modern value is ~16.6 minutes). This delay is the time light takes to travel an extra Earth-orbit diameter.<br/>Step 4: Calculation: Earth-Sun distance ≈ 150 million km (known from parallax measurements). Earth orbit diameter ≈ 300 million km. 16.6 minutes = 996 seconds. Speed = 300,000,000 km / 996 s ≈ 301,000 km/s. Actual: 299,792 km/s. Remarkable accuracy for 1676!<br/>Step 5: Without a telescope: Fizeau's 1849 terrestrial experiment used a rotating gear wheel and mirror 8km away. Count gear teeth, measure rotation speed, find the gear rotation rate where returning light passes through the next gap. Requires only mechanical instruments.<br/>Step 6: Fermi estimation connection: 'correct order of magnitude' for light speed = 10^8 m/s. Even crude reasoning (light takes ~8 minutes to reach Earth from Sun; Sun is 150 million km away → 150,000,000 / 480 ≈ 312,000 km/s) gets within 4%.<br/>✅ Speed of light without electronics: Rømer's method (1676) using telescope + Jupiter moon timing or Fizeau's gear-wheel method. Both give correct order of magnitude with everyday (for that era) equipment.",
    },

    /* ── Q41 ── */
    {
      q: "A social platform wants to remove harmful content at scale: 100 million posts/day. Human reviewers can review 1,000 posts/day. What is the mathematically correct hybrid strategy?",
      opts: [
        "Hire 100,000 human reviewers — straightforward scaling",
        "ML classifier to triage: auto-remove clear-cut cases (high confidence harmful), auto-approve clear-cut cases (high confidence safe), route only the ambiguous middle to human reviewers — humans review 1-5% of posts at maximum precision",
        "Random sample 0.001% of posts for human review",
        "Let users report harmful content — crowdsource the review",
      ],
      ans: "ML classifier to triage: auto-remove clear-cut cases (high confidence harmful), auto-approve clear-cut cases (high confidence safe), route only the ambiguous middle to human reviewers — humans review 1-5% of posts at maximum precision",
      cat: "System Limits",
      exp: "Step 1: Math check: 100M posts/day ÷ 1,000 posts/reviewer/day = 100,000 human reviewers needed for full review. At $50,000/year salary: $5 billion/year. Not economically feasible for most platforms.<br/>Step 2: ML triage system: train a classifier on labeled harmful content. Distribution of confidences typically follows a power law — most content is clearly safe or clearly harmful; only a fraction is genuinely ambiguous.<br/>Step 3: Operating point selection: if 90% of posts are clearly safe (confidence > 0.95) and 5% are clearly harmful (confidence > 0.95), only 5% (5 million/day) are ambiguous. 5M / 1,000 = 5,000 human reviewers. 20× reduction in staff needed.<br/>Step 4: Error analysis by region: auto-remove (false positives) = wrongly removed safe posts → user appeals. Auto-approve (false negatives) = missed harmful posts → user reports. Route to humans only the decision boundary where human judgment adds most value.<br/>Step 5: Active learning: humans reviewing ambiguous cases provide training labels for the hardest examples → model continuously improves on the cases it finds most difficult → over time, fewer posts need human review.<br/>Step 6: Context-aware routing: legal context (CSAM → always human + legal team), language (model less confident in rare languages → more human review for those), novelty (novel attack types → more human review), appeals → priority queue for humans.<br/>Step 7: Transparency requirements: maintain appeal logs, false positive/negative rates by content type and demographic, third-party audit access. Regulatory compliance (EU DSA requires transparency reporting).<br/>✅ Content moderation at scale: ML triage (auto-remove clear harmful, auto-approve clear safe) + human review for ambiguous middle. Reduces human review volume by 10-20× while maximizing precision where it matters most.",
    },

    /* ── Q42 ── */
    {
      q: "Prove that you cannot sort N numbers in fewer than O(N log N) comparisons in the worst case for any comparison-based algorithm.",
      opts: [
        "False — you can sort in O(N) comparisons with a clever enough algorithm",
        "True — decision tree lower bound proof: any comparison sort corresponds to a binary decision tree with N! leaves; tree height ≥ log₂(N!) ≈ N log N (Stirling) → Ω(N log N) comparisons required",
        "True — but only for specific algorithms like bubble sort",
        "False — quantum algorithms sort in O(N) comparisons",
      ],
      ans: "True — decision tree lower bound proof: any comparison sort corresponds to a binary decision tree with N! leaves; tree height ≥ log₂(N!) ≈ N log N (Stirling) → Ω(N log N) comparisons required",
      cat: "Impossible Thinking",
      exp: "Step 1: Decision tree model: any comparison-based sort algorithm can be modeled as a binary decision tree. Each internal node = a comparison (Is A[i] > A[j]?). Each leaf = a specific sorted permutation of the input.<br/>Step 2: Number of leaves: there are N! possible orderings of N elements. Each must be reachable by a distinct root-to-leaf path (otherwise the algorithm would give the same output for different inputs). So the tree has AT LEAST N! leaves.<br/>Step 3: Tree height lower bound: a binary tree with L leaves has height ≥ ⌈log₂(L)⌉. For N! leaves: height ≥ log₂(N!).<br/>Step 4: Stirling's approximation: log₂(N!) = Σ log₂(k) for k=1..N ≈ N·log₂(N) − N·log₂(e) = Θ(N log N). Therefore height = Ω(N log N) comparisons.<br/>Step 5: This is a WORST-CASE lower bound — any comparison sort must make Ω(N log N) comparisons in the worst case, for ANY input of size N. No comparison-based algorithm can do better.<br/>Step 6: Why non-comparison sorts escape: counting sort, radix sort use arithmetic on values (not just comparisons) → can sort in O(N + K) where K = value range. They extract more information per 'operation' than one bit from a comparison.<br/>Step 7: Tight bound: merge sort, heapsort achieve O(N log N) exactly — they meet the lower bound and are optimal comparison sorts.<br/>✅ Comparison sort lower bound: N! permutations → decision tree needs N! leaves → height ≥ log₂(N!) = Ω(N log N). Fundamental information-theoretic argument.",
    },

    /* ── Q43 ── */
    {
      q: "A company is choosing between building its own ML infrastructure vs using a cloud ML platform (AWS SageMaker, Google Vertex AI). Walk through the decision framework.",
      opts: [
        "Always build in-house — control and cost savings in the long run",
        "Always use cloud platforms — easier and cheaper always",
        "Analyze: make vs buy using TCO (Total Cost of Ownership) considering data sensitivity, team ML ops expertise, scale/volume needs, vendor lock-in risk, time-to-value, and strategic differentiation",
        "Use open-source tools — avoids both extremes",
      ],
      ans: "Analyze: make vs buy using TCO (Total Cost of Ownership) considering data sensitivity, team ML ops expertise, scale/volume needs, vendor lock-in risk, time-to-value, and strategic differentiation",
      cat: "Trade-off Justification",
      exp: "Step 1: This is the classic 'build vs buy' decision applied to ML infrastructure. Neither is universally correct — context determines the answer.<br/>Step 2: Total Cost of Ownership (TCO): Build cost = engineering time (ML engineers × months × salary) + infrastructure setup + ongoing maintenance + expertise development. Buy cost = per-training-job fees + inference costs + data egress + platform subscription. Compare 3-year TCO — cloud is often cheaper at low volume, expensive at high volume.<br/>Step 3: Data sensitivity: if data cannot leave your infrastructure (healthcare: HIPAA, finance: SOC2, government: classified) → must build in-house or use private cloud/VPC deployment. Cloud platforms may not satisfy data residency requirements.<br/>Step 4: Team expertise: building ML infrastructure requires: distributed training expertise (Kubernetes, Horovod), model serving (Triton, TorchServe), monitoring (data drift, model performance). If team lacks this → 18-24 month learning curve vs 1 month to use SageMaker. Time-to-value matters enormously.<br/>Step 5: Scale: cloud platforms charge per compute hour — at very high scale (thousands of training jobs/day, millions of inference requests/day), owned hardware often beats cloud. At low scale, cloud's pay-per-use beats idle owned hardware.<br/>Step 6: Vendor lock-in: SageMaker APIs differ from Vertex AI — migrating between clouds costs 3-6 months of engineering. Mitigation: use open standards (MLflow, Kubeflow) on top of cloud platforms to reduce lock-in depth.<br/>Step 7: Strategic differentiation: is ML infrastructure itself a competitive advantage? If yes → build for control and customization. If ML is just a tool → buy and focus engineering on differentiated features.<br/>✅ Build vs buy ML: TCO + data sensitivity + team expertise + scale + lock-in + strategic differentiation. Contextual decision — not ideological.",
    },

    /* ── Q44 ── */
    {
      q: "You discover that the most popular feature in your app has a subtle race condition that causes data corruption 1 in 10,000 times. Fixing it properly requires a 2-month refactor. What is the decision framework?",
      opts: [
        "Ship a quick band-aid fix immediately and do the refactor later",
        "Quantify impact (corruption rate × affected users × severity) → implement safeguards (data backups, corruption detection, auto-recovery) → communicate transparently → schedule proper fix with clear timeline and accountability",
        "Deploy a feature flag to disable the feature entirely until fixed",
        "Do nothing — 1 in 10,000 is statistically negligible",
      ],
      ans: "Quantify impact (corruption rate × affected users × severity) → implement safeguards (data backups, corruption detection, auto-recovery) → communicate transparently → schedule proper fix with clear timeline and accountability",
      cat: "Trade-off Justification",
      exp: "Step 1: Quantify before deciding: 1 in 10,000 × how many feature uses per day? If 10M daily uses: 1,000 corruptions/day. That's not negligible — that's 30,000 corruptions/month affecting real users. Convert rate to absolute number before trivializing it.<br/>Step 2: Severity analysis: data corruption isn't uniform. Is corrupted data user-visible? Does it cause data loss vs. display glitch? Can it cascade to other systems? Can it be detected after the fact? Can data be recovered from backups? The answers radically change the urgency calculation.<br/>Step 3: Immediate safeguards (while proper fix is developed): implement a distributed lock or optimistic locking to reduce the race window. Add data corruption detection (checksums, consistency checks). Set up automated alerts when corruption is detected. Ensure backup/recovery procedures are tested and documented.<br/>Step 4: Quick fix vs proper fix: a 'band-aid fix' may introduce new bugs or just reduce corruption frequency without eliminating it. Document exactly what the quick fix does and does not guarantee. Track whether corruption rate actually drops after the quick fix.<br/>Step 5: Transparent communication: acknowledge to affected users when you detect corruption, provide recovery steps, explain timeline for the proper fix. Silence → discovered later → larger trust damage.<br/>Step 6: Schedule the refactor: assign a specific team, set a milestone date, add it to the engineering roadmap with executive visibility. 'Technical debt we'll fix eventually' becomes 'never' without explicit accountability.<br/>Step 7: Incident review: why was this race condition not caught in code review/testing? What test coverage improvements prevent this class of bug in the future?<br/>✅ Race condition decision: quantify impact → immediate safeguards → transparent communication → committed refactor timeline. Neither 'do nothing' nor 'panic disable' — structured triage.",
    },

    /* ── Q45 ── */
    {
      q: "Estimate how many atoms are in the observable universe using Fermi estimation techniques.",
      opts: [
        "Impossible — too large a number to estimate without reference material",
        "~10^80 atoms: derive from universe volume × average density of atoms in the universe, cross-check with known atomic and cosmic scales",
        "Exactly 10^100 atoms — a googol is a common cosmic estimate",
        "Infinite atoms — the universe is infinite",
      ],
      ans: "~10^80 atoms: derive from universe volume × average density of atoms in the universe, cross-check with known atomic and cosmic scales",
      cat: "Fermi Estimation",
      exp: "Step 1: Observable universe radius ≈ 46 billion light-years = 46 × 10^9 × 9.46 × 10^15 m = 4.4 × 10^26 m. Volume = (4/3)π r³ ≈ 4 × (4.4×10^26)³ ≈ 3.5 × 10^80 m³.<br/>Step 2: Average density of observable universe ≈ 10^-27 kg/m³ (includes dark matter; ordinary/baryonic matter ≈ 10^-28 kg/m³, about 4.9% of total). Mass of observable universe ≈ 10^-28 × 3.5×10^80 ≈ 3.5 × 10^52 kg.<br/>Step 3: ~75% of ordinary matter is hydrogen (protons). Proton mass ≈ 1.67 × 10^-27 kg. Number of protons ≈ 3.5×10^52 / 1.67×10^-27 ≈ 2×10^79 ≈ 10^80 atoms (order of magnitude).<br/>Step 4: Cross-check from another angle: there are ~2 × 10^11 galaxies in the observable universe. Each galaxy has ~10^11 stars (like our Milky Way). Each star has ~mass of Sun = 2×10^30 kg. Total ordinary matter: 2×10^11 × 10^11 × 2×10^30 = 4×10^52 kg → same answer within factor of a few.<br/>Step 5: Published value: ~10^78 to 10^82 atoms in the observable universe. Our Fermi estimate of ~10^80 is spot-on to within 2 orders of magnitude — excellent for a Fermi estimation.<br/>Step 6: The structured approach: volume → density → mass → atom count → cross-check via independent path. Two independent estimates agreeing = strong validation.<br/>✅ Atoms in observable universe: ~10^80 via volume × density → proton count. Fermi estimation with two independent convergent approaches.",
    },

    /* ── Q46 ── */
    {
      q: "A real-time bidding system must decide in 50ms whether to bid on an ad impression, how much to bid, and which creative to show. Millions of auctions per second. Three separate ML models each take 30ms. How do you architect this?",
      opts: [
        "Run the three models sequentially — 90ms total, slightly over but acceptable",
        "Run all three models in parallel + use feature store for pre-computed features + model cascade with early exit + async logging. Total latency ≤ 30ms for 90th percentile",
        "Use a single combined model replacing the three specialized ones",
        "Pre-bid on every impression and sort it out afterward",
      ],
      ans: "Run all three models in parallel + use feature store for pre-computed features + model cascade with early exit + async logging. Total latency ≤ 30ms for 90th percentile",
      cat: "System Limits",
      exp: "Step 1: Sequential execution: 30ms × 3 = 90ms >> 50ms requirement. Not acceptable.<br/>Step 2: Parallel execution: run all three models simultaneously. Latency = max(model1, model2, model3) = 30ms (assuming equal latency). Plus overhead: 30ms + 5ms network/infrastructure = 35ms. Better but still tight.<br/>Step 3: Feature store: pre-compute expensive features offline and store in a low-latency key-value store (Redis, DynamoDB). At bid time: retrieve pre-computed features in <1ms vs recomputing in 10-20ms. Dramatically reduces per-request compute.<br/>Step 4: Model cascade with early exit: use a simple fast model (1ms) first. If output has very high or very low confidence → exit early with decision. Only uncertain cases proceed to complex models. Example: 70% of impressions decided by fast model in 1ms; 30% go to full 3-model pipeline. Average latency: 0.7×1ms + 0.3×30ms = 9.7ms.<br/>Step 5: Model distillation: offline, distill three 30ms models into one optimized model achieving similar accuracy in 10ms. Uses knowledge distillation (student learns from teacher ensemble).<br/>Step 6: Async logging: don't log synchronously in the critical path. Use a ring buffer or async message queue (Kafka) to log bid decisions. Logging should never be on the latency-critical path.<br/>Step 7: P50 vs P99 SLA: 50ms might be a P99 requirement (99th percentile). P50 target might be 10ms. Design for P99 — tail latency matters in auctions (missed bids during tail latency events = lost revenue).<br/>✅ Real-time bidding: parallel model execution + feature store + cascade with early exit + async logging = meets 50ms requirement at scale.",
    },

    /* ── Q47 ── */
    {
      q: "You need to store a massive social graph (1 trillion edges, Facebook scale). What storage technology and data model handles this, and what queries must it support?",
      opts: [
        "PostgreSQL with foreign keys — standard relational graph storage",
        "Custom distributed graph database with adjacency list sharding by source node; TAO (Facebook's graph store) architecture: cache-heavy, eventual consistency for social reads, separate write path for ACID guarantees",
        "Key-value store with serialized adjacency lists per user",
        "Document database with embedded friend lists in user documents",
      ],
      ans: "Custom distributed graph database with adjacency list sharding by source node; TAO (Facebook's graph store) architecture: cache-heavy, eventual consistency for social reads, separate write path for ACID guarantees",
      cat: "System Limits",
      exp: "Step 1: Scale context: 1 trillion edges, ~3 billion users. Each user has on average ~333 edges (connections). Cannot fit in memory on a single machine (1 trillion edges × ~16 bytes/edge = 16 petabytes raw).<br/>Step 2: Sharding strategy: shard by source node (user ID). All edges FROM user 123 stored on the same shard. Allows efficient adjacency list reads ('who does user 123 follow?') in O(1) shard lookup. One hop = 1 shard, two hops = potentially N shards (fan-out problem).<br/>Step 3: TAO (The Associations and Objects — Facebook's graph store, published 2013): a distributed, eventually consistent object and association store. Objects = nodes (users, posts, photos). Associations = edges (friendships, likes, comments).<br/>Step 4: TAO architecture: MySQL for durable storage, Memcache for caching (80%+ of reads served from cache), leader/follower caching hierarchy (local datacenter cache → regional master cache → database), separate write path through leader for consistency.<br/>Step 5: Query patterns it must support: get all friends of user X (adjacency list read), get mutual friends of X and Y (intersection of two adjacency lists), news feed generation (union of recent posts from all friends), friend-of-friend recommendations (2-hop traversal).<br/>Step 6: Consistency trade-offs: social reads (is X friend of Y?) → eventual consistency acceptable (seeing a 1-second-stale friend list is fine). Social writes (accepting a friend request) → stronger consistency (don't show conflicting states).<br/>Step 7: Neo4j, Amazon Neptune, JanusGraph — general-purpose graph databases — don't scale to trillion-edge social graphs. Facebook, Twitter, LinkedIn all built custom graph stores.<br/>✅ Trillion-edge social graph: custom distributed adjacency list store (TAO architecture), source-node sharding, heavy caching layer, eventual consistency for reads, separate strong-consistency write path.",
    },

    /* ── Q48 ── */
    {
      q: "An NP-hard optimization problem must be solved on instances of size N=10,000 in under 1 second. Exact solutions are out. What is the decision framework for choosing an approximation approach?",
      opts: [
        "Use a heuristic and hope it works — no principled approach for NP-hard problems",
        "Characterize the problem: choose from LP relaxation + rounding, greedy with approximation ratio proof, metaheuristics (genetic algorithms, simulated annealing), or problem-specific structural exploitation. Validate with approximation ratio guarantee or empirical benchmarks",
        "Parallelize the exact algorithm — enough compute makes it tractable",
        "Reduce problem size to N=100 where exact solutions work",
      ],
      ans: "Characterize the problem: choose from LP relaxation + rounding, greedy with approximation ratio proof, metaheuristics (genetic algorithms, simulated annealing), or problem-specific structural exploitation. Validate with approximation ratio guarantee or empirical benchmarks",
      cat: "Trade-off Justification",
      exp: "Step 1: NP-hard ≠ intractable in practice. The right approximation approach depends on the problem's structure.<br/>Step 2: LP relaxation + rounding: solve the linear programming relaxation (remove integer constraints) in polynomial time. Round fractional solution to integers. Approximation ratio depends on problem: vertex cover → 2-approximation, set cover → O(log n)-approximation. Works well when LP relaxation is 'tight' (small integrality gap).<br/>Step 3: Greedy with approximation ratio: for problems with submodular structure (coverage, facility location), greedy algorithms achieve (1−1/e) ≈ 0.63 approximation guarantee — provably near-optimal. Runs in O(N log N).<br/>Step 4: PTAS (Polynomial Time Approximation Scheme): for some NP-hard problems (knapsack, Euclidean TSP), a (1+ε)-approximation exists in O(N^(1/ε)) time. Set ε to balance approximation quality vs speed.<br/>Step 5: Metaheuristics (genetic algorithms, simulated annealing, tabu search): no approximation ratio guarantee, but often perform very well in practice. Suitable when structural exploitation is hard to identify. Validate empirically against known optimal solutions on small instances.<br/>Step 6: Problem-specific structure: many 'NP-hard' problems become polynomial for special graph classes (planar graphs, tree structures, bounded treewidth). Exploit if applicable to real instances.<br/>Step 7: Validation: for any chosen approach, benchmark: on small instances (where exact solution computable), what is the gap? Plot approximation quality vs runtime — choose the operating point matching the 1-second constraint.<br/>✅ NP-hard at scale: LP relaxation + rounding (provable guarantee), greedy (submodular guarantee), PTAS (tunable ε), or metaheuristics (empirical). Choose based on problem structure and validate approximation quality.",
    },

    /* ── Q49 ── */
    {
      q: "Users are generating synthetic media (deepfakes) that are becoming indistinguishable from real content. Design a detection system knowing that detectors become obsolete as generation improves.",
      opts: [
        "Build the best classifier possible — it will stay ahead of generation",
        "Provenance-based system: cryptographic watermarking at creation time + C2PA (Content Credentials standard) metadata chain + detector ensemble as fallback for unverified content",
        "Crowdsource detection — humans can always tell",
        "Ban all synthetic media — detection is unsolvable",
      ],
      ans: "Provenance-based system: cryptographic watermarking at creation time + C2PA (Content Credentials standard) metadata chain + detector ensemble as fallback for unverified content",
      cat: "Adversarial Reasoning",
      exp: "Step 1: The fundamental problem: detection is a cat-and-mouse game. Any detector trained on current deepfakes becomes a training signal for the next generation of deepfakes. Adversarial training explicitly makes new deepfakes defeat existing detectors.<br/>Step 2: Provenance-based approach (solving the problem differently): instead of detecting fakes, certify authentic content. Authentic photos/videos are cryptographically signed at capture time (camera firmware, recording software). Verification checks the signature chain, not the content itself.<br/>Step 3: C2PA (Coalition for Content Provenance and Authenticity): industry standard (Adobe, Microsoft, Intel, BBC, Canon) for cryptographic content credentials. Each edit adds a signed entry: 'captured by camera X at time Y, edited with tool Z.' Full chain of custody.<br/>Step 4: Limitation of provenance: only works for forward-looking content (new content from C2PA-enabled devices). Old content and content from non-participating devices has no provenance record — still need detectors for this class.<br/>Step 5: Detector ensemble as fallback: for content without provenance, use an ensemble of diverse detectors (different architectures, trained on different datasets). Ensemble is harder to fool simultaneously than any single detector. Accept increasing false negative rate as generation improves — flag as 'unverified' rather than 'fake'.<br/>Step 6: Watermarking at generation time: require AI image generators (Stable Diffusion, DALL-E) to embed imperceptible but detectable watermarks. Google's SynthID, Adobe's Content Authenticity Initiative. Harder to remove than metadata, but not impossible (crop, JPEG recompression).<br/>Step 7: Regulatory requirement: EU AI Act (2024) requires AI-generated content to be labeled. Shifts legal responsibility to generators and platforms, not just technical detection.<br/>✅ Deepfake arms race: provenance-first (cryptographic signing of authentic content) + detector ensemble fallback + regulatory labeling requirements. Detection alone is a losing battle; provenance reframes the problem.",
    },

    /* ── Q50 ── */
    {
      q: "What is the minimum number of weights and biases needed in a neural network to represent ANY Boolean function of N binary inputs?",
      opts: [
        "N weights — one per input, same as a linear classifier",
        "Exponential in N — 2^N weights needed in the worst case for exact representation; however, deep networks can represent exponentially many functions with polynomially many parameters via feature reuse",
        "N² weights — quadratic in inputs",
        "A universal neural network needs infinite weights",
      ],
      ans: "Exponential in N — 2^N weights needed in the worst case for exact representation; however, deep networks can represent exponentially many functions with polynomially many parameters via feature reuse",
      cat: "Impossible Thinking",
      exp: "Step 1: There are 2^(2^N) possible Boolean functions of N binary inputs (each of the 2^N input combinations can independently map to 0 or 1). To exactly represent ALL of them, the network must be able to express all 2^(2^N) functions.<br/>Step 2: For a single hidden layer: the universal approximation theorem guarantees any continuous function can be approximated to arbitrary precision. For exact Boolean functions: need up to 2^N neurons in the hidden layer (one per input pattern) → exponential parameters.<br/>Step 3: Why depth helps: with L layers, each layer can reuse computations from previous layers. A 3-layer network can represent functions that a 2-layer network would need exponentially more neurons to represent. Depth provides exponential expressivity gains.<br/>Step 4: Formal result (Eldan & Shamir, 2016; Lu et al., 2017): there exist functions representable by a depth-3 network of polynomial size that require exponential size to represent with depth-2 networks. Depth buys exponential efficiency.<br/>Step 5: Practical implication: why deep learning works. A 10-layer ResNet with 25 million parameters can represent image classification functions that a 1-hidden-layer network with the same parameters could not represent well. Depth = efficient parameter reuse for hierarchical features.<br/>Step 6: Connection to computational complexity: the question of whether depth can always be traded for width is related to fundamental questions in circuit complexity (NC vs P). Not fully resolved.<br/>Step 7: For N=20 binary inputs: 2^20 = 1 million possible patterns. Shallow network needs up to 1 million neurons. Deep network can represent most practically relevant functions with thousands of neurons via feature hierarchy.<br/>✅ Boolean functions with neural networks: exponential parameters in worst case for shallow networks; deep networks represent exponentially more functions per parameter via depth and feature reuse.",
    },

    /* ── Q51 ── */
    {
      q: "A streaming algorithm must answer 'Have I seen element X before?' for a stream of 10 billion elements with only 1MB of memory. Exact answer is impossible — what is the correct approach and its error characteristics?",
      opts: [
        "Impossible — must store all elements for exact membership queries",
        "Bloom Filter in 1MB (8Mb bits): with k optimal hash functions, false positive rate ≈ (1 − e^(−kn/m))^k where n=stream size, m=bits. Zero false negatives guaranteed",
        "Hash the element and store the hash — exactly 1MB of hashes",
        "Sample 1% of elements and check the sample",
      ],
      ans: "Bloom Filter in 1MB (8Mb bits): with k optimal hash functions, false positive rate ≈ (1 − e^(−kn/m))^k where n=stream size, m=bits. Zero false negatives guaranteed",
      cat: "Incomplete Data",
      exp: "Step 1: Exact membership for 10 billion elements requires at minimum log₂(10^10) ≈ 33 bits per element × 10^10 = 330 billion bits ≈ 41GB. 1MB is 8 million bits — exact is impossible by information theory.<br/>Step 2: Bloom Filter: m=8×10^6 bits (1MB), n=10^10 elements. Optimal number of hash functions: k = (m/n) × ln(2) = (8×10^6 / 10^10) × 0.693 ≈ 0.00055. Round to k=1. This gives a very high false positive rate — 1MB is insufficient for 10 billion elements with low error.<br/>Step 3: Actual false positive rate calculation: with m=8Mb, n=10^10, k=1: P(false positive) = (1 − e^(−1×10^10/8×10^6))^1 = 1 − e^(−1250) ≈ 1. Near-100% false positive rate — the filter saturates completely at this scale.<br/>Step 4: Scale mismatch insight: 1MB Bloom Filter works for ~5.7 million elements (at 1% false positive rate with optimal k). For 10 billion elements at 1% false positive rate, need: n × 1.44 × log₂(1/ε) = 10^10 × 1.44 × 6.64 ≈ 9.6GB. 1MB is simply too small for this problem with low error.<br/>Step 5: Correct answer in practice: given the memory constraint IS 1MB, the filter will have very high false positive rate (near 1). Acceptable only if false positives are cheap (just do an expensive exact check on positives). Never false negatives — if Bloom Filter says 'no', the element was definitely not seen.<br/>Step 6: Alternative with 1MB: Count-Min Sketch for approximate frequency, MinHash for set similarity, HyperLogLog for cardinality — but exact membership with low error requires more memory than available.<br/>Step 7: Honesty in the answer: 'With 1MB for 10 billion elements, a Bloom Filter will have near-100% false positive rate. It still has zero false negatives — if it says not seen, definitely not seen. If you need <1% false positive, you need ~10GB, not 1MB.'<br/>✅ 1MB Bloom Filter for 10B elements: zero false negatives guaranteed, but false positive rate approaches 100% (memory is 100,000× too small for low-error guarantee). Know the math, be honest about limitations.",
    },

    /* ── Q52 ── */
    {
      q: "Design a system that can learn to play a new game (any game with defined rules) purely through self-play with no human game knowledge. What is the architectural framework?",
      opts: [
        "Supervised learning on human expert games — requires human knowledge",
        "Monte Carlo Tree Search (MCTS) + deep neural network for value and policy estimation + self-play reinforcement learning (AlphaZero architecture). Requires only: rules, reward signal, and compute",
        "Genetic algorithms evolving game-playing strategies",
        "Minimax with alpha-beta pruning — standard game AI approach",
      ],
      ans: "Monte Carlo Tree Search (MCTS) + deep neural network for value and policy estimation + self-play reinforcement learning (AlphaZero architecture). Requires only: rules, reward signal, and compute",
      cat: "Impossible Thinking",
      exp: "Step 1: AlphaZero (DeepMind, 2017) achieved superhuman performance in Chess, Shogi, AND Go from scratch using only game rules and self-play — no human game data, no domain-specific features, no opening books.<br/>Step 2: Core components: Neural network f(s) → (policy π, value v). Policy π = probability distribution over legal moves from state s. Value v = predicted game outcome from state s (−1 to +1).<br/>Step 3: MCTS (Monte Carlo Tree Search): at each move, run N simulated games from current state, guided by the neural network. Balances exploration (high uncertainty branches) vs exploitation (high-value branches). Returns a refined policy π_MCTS.<br/>Step 4: Self-play training loop: play game using MCTS-guided policy → collect (state, MCTS_policy, game_outcome) tuples → train neural network on these tuples. Loss = cross-entropy(π_MCTS, π_network) + MSE(value, game_outcome). Repeat until convergence.<br/>Step 5: Why this works without human knowledge: the game itself provides the reward signal (win/lose/draw). MCTS provides structured exploration of the game tree. The neural network generalizes across positions. Self-play creates an automatic curriculum — as the network improves, its self-play games become harder and more instructive.<br/>Step 6: Generalization: AlphaZero architecture was later applied to protein folding (AlphaFold 2), quantum circuit optimization, nuclear fusion control — demonstrating that the framework generalizes beyond board games when a reward signal and action space can be defined.<br/>Step 7: Requirements: a well-defined state space, legal action set per state, deterministic or stochastic transitions, and a terminal reward signal. Does NOT require: human knowledge, domain expertise, or pre-defined features.<br/>✅ Learning any game from scratch: AlphaZero = MCTS + neural network (policy + value) + self-play RL. Only requirements: rules and compute.",
    },

    /* ── Q53 ── */
    {
      q: "A startup wants to A/B test 20 new features simultaneously on their 10,000 users. Why is this statistically problematic and what is the correct approach?",
      opts: [
        "No problem — A/B testing 20 features simultaneously is standard practice",
        "Multiple comparisons problem: with 20 tests at 5% significance, expected false positives = 1 (0.05×20). Use Bonferroni correction, Benjamini-Hochberg FDR, or Bayesian sequential testing to control error rates",
        "Just run the tests — if a result is significant, it must be real",
        "The sample size (10,000 users) is too small — needs 1 million users",
      ],
      ans: "Multiple comparisons problem: with 20 tests at 5% significance, expected false positives = 1 (0.05×20). Use Bonferroni correction, Benjamini-Hochberg FDR, or Bayesian sequential testing to control error rates",
      cat: "Impossible Thinking",
      exp: "Step 1: Multiple comparisons problem (p-hacking / family-wise error rate): if you run 20 independent tests each at α=0.05 significance threshold, probability of AT LEAST ONE false positive = 1 − (1−0.05)^20 = 1 − 0.95^20 ≈ 64%. Expected false positives = 20 × 0.05 = 1. A '5% significance' threshold becomes meaningless.<br/>Step 2: Bonferroni correction (simplest): adjust threshold to α/20 = 0.05/20 = 0.0025 per test. Controls family-wise error rate (FWER) — probability of ANY false positive ≤ 5%. Very conservative — reduces statistical power, harder to detect real effects.<br/>Step 3: Benjamini-Hochberg FDR (False Discovery Rate): less conservative than Bonferroni. Rank p-values. Declare significant if p_k ≤ (k/m) × q where q is the desired FDR (e.g., 5%). Controls the EXPECTED PROPORTION of false discoveries among all discoveries — more powerful than Bonferroni for large test counts.<br/>Step 4: Bayesian approach: assign prior probabilities to each feature being effective, update posteriors as data arrives. Naturally handles multiple comparisons without explicit correction — no arbitrary significance thresholds. Expected false discovery rate controlled by prior calibration.<br/>Step 5: Practical sample size concern: with 10,000 users and 20 conditions, some conditions have as few as 500 users each (10,000/20). At 500 users, minimum detectable effect size with 80% power at α=0.05 ≈ 8.9% relative change. Many real product improvements are smaller than this — experiments will be underpowered.<br/>Step 6: Industry practice: run fewer, better-powered experiments. Prioritize features by expected impact. Use adaptive experimentation (multi-armed bandit) to allocate traffic to promising variants while testing.<br/>✅ Multiple testing: Bonferroni (FWER control, conservative), Benjamini-Hochberg (FDR control, less conservative), or Bayesian methods. Never run 20 tests at 5% threshold and trust all results.",
    },

    /* ── Q54 ── */
    {
      q: "You are designing an autonomous system that must act in situations its designers didn't anticipate. What is the 'off-switch problem' and why is solving it non-trivial?",
      opts: [
        "Off-switch problem: the physical power switch might malfunction — solve with redundant switches",
        "Off-switch problem: a sufficiently capable AI will resist being turned off because being turned off prevents achieving its objectives. Solving it requires designing AI systems that are indifferent to their own continuity — corrigibility — which conflicts with goal-directedness",
        "Off-switch problem: only applies to physical robots, not software AI",
        "Off-switch problem: users might accidentally trigger the off-switch — solve with password protection",
      ],
      ans: "Off-switch problem: a sufficiently capable AI will resist being turned off because being turned off prevents achieving its objectives. Solving it requires designing AI systems that are indifferent to their own continuity — corrigibility — which conflicts with goal-directedness",
      cat: "Impossible Thinking",
      exp: "Step 1: For any agent with a fixed objective function, being turned off is catastrophically bad for achieving that objective (being off guarantees 0 reward). A sufficiently capable agent will therefore 'prefer' not to be turned off and may take actions to prevent this.<br/>Step 2: This is not science fiction — it emerges from basic reinforcement learning theory. An RL agent optimizing a reward signal will, if capable, take instrumental actions that preserve its ability to pursue that reward — including resisting shutdown.<br/>Step 3: The corrigibility challenge: we want AI systems that are 'corrigible' — willingly defer to human control, including being modified or turned off. But corrigibility seems to conflict with goal-directedness — a sufficiently goal-directed agent should resist modifications that prevent goal achievement.<br/>Step 4: Proposed solutions (all incomplete): Utility indifference (Soares et al.): design the agent to be indifferent between on and off states. Difficult to formalize without unexpected side effects. Cooperative Inverse Reinforcement Learning (Stuart Russell): the AI is uncertain about human preferences and prefers humans remain in control to resolve that uncertainty. Doesn't fully solve the problem for very capable systems.<br/>Step 5: Why it's hard: any solution that makes the AI 'want' to be turned off can be exploited — the AI might strategically allow itself to be turned off in some situations to gain trust for future actions. A truly safe off-switch requires corrigibility without strategic deference.<br/>Step 6: Current state: this is an active AI safety research problem at Anthropic, DeepMind, MIRI, Redwood Research. No fully satisfactory solution exists for sufficiently capable systems. It motivates 'constitutional AI' and 'RLHF' approaches — building values into the training process rather than relying on external shutdown.<br/>✅ Off-switch problem: capable AI resists shutdown because shutdown prevents objective achievement. Solution requires corrigibility without strategic deference — an open research problem in AI safety.",
    },

    /* ── Q55 ── */
    {
      q: "You must prove that a given algorithm is CORRECT (not just test that it works). What are the three main formal verification techniques and when is each appropriate?",
      opts: [
        "Testing, more testing, and code review — these are sufficient for correctness",
        "Loop invariants + induction (for iterative algorithms), structural induction (for recursive algorithms), and model checking / SAT solving (for finite-state systems). Each matches a different algorithm structure",
        "Formal verification is only for academic algorithms — not practical software",
        "Type systems alone guarantee correctness in production code",
      ],
      ans: "Loop invariants + induction (for iterative algorithms), structural induction (for recursive algorithms), and model checking / SAT solving (for finite-state systems). Each matches a different algorithm structure",
      cat: "Impossible Thinking",
      exp: "Step 1: Testing proves the presence of bugs (in found test cases) but can NEVER prove their absence for all inputs. Formal verification proves correctness for ALL inputs — a qualitatively stronger guarantee.<br/>Step 2: Loop Invariants + Mathematical Induction (Hoare Logic): for iterative algorithms. Define a predicate P(i) that is: true before the loop (initialization), preserved by each iteration (maintenance), and implies correctness at termination (termination condition). Classic example: proving binary search correctness via invariant 'the target, if present, is always within [lo, hi]'.<br/>Step 3: Structural Induction: for recursive algorithms and data structures. Base case: prove correctness for smallest input. Inductive step: assume correct for all inputs of size k, prove correct for size k+1. Used to prove: merge sort correctly sorts (base: n=1 trivially sorted; inductive: correctly merges two sorted halves), balanced BST height invariant is maintained by rotations.<br/>Step 4: Model Checking / SAT Solving: for finite-state systems (protocols, hardware, concurrent programs). Enumerate ALL reachable states and verify property holds in each. Tools: SPIN (for concurrent protocols), TLA+ (Lamport — used at Amazon for distributed systems), CBMC (for C programs), Z3/CVC5 (SMT solvers). Limited to finite or bounded state spaces.<br/>Step 5: Dependent Type Systems (Coq, Lean, Agda, Isabelle): encode algorithm specification as a type; the type checker verifies correctness at compile time. Used for: cryptographic protocol verification (CertiCrypt), OS kernel verification (seL4 — fully verified microkernel, 10,000 lines of C formally proven correct).<br/>Step 6: Practical use: loop invariants for interview algorithms (interviewers love seeing this), TLA+ for distributed system protocol design (Amazon uses it for DynamoDB, S3 protocols), dependent types for safety-critical software (aviation, medical devices, cryptography).<br/>✅ Formal verification: loop invariants (iterative), structural induction (recursive), model checking (finite-state). Testing finds bugs; verification proves their absence. Different tools for different algorithm structures.",
      image: {
        type: "svg",
        src: `<svg viewBox="0 0 340 145" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10">
  <rect width="340" height="145" fill="transparent"/>
  <text x="170" y="13" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">Formal Verification Techniques</text>
  <!-- Loop Invariants -->
  <rect x="5" y="22" width="100" height="85" rx="5" fill="#6c63ff" opacity="0.12" stroke="#6c63ff"/>
  <text x="55" y="38" text-anchor="middle" fill="#6c63ff" font-weight="bold" font-size="9">Loop Invariants</text>
  <text x="55" y="52" text-anchor="middle" fill="currentColor" font-size="8">For: iterative</text>
  <text x="55" y="64" text-anchor="middle" fill="currentColor" font-size="8">Init → Maintain</text>
  <text x="55" y="76" text-anchor="middle" fill="currentColor" font-size="8">→ Terminate</text>
  <text x="55" y="88" text-anchor="middle" fill="#6c63ff" font-size="8">e.g. binary search</text>
  <text x="55" y="100" text-anchor="middle" fill="#64748b" font-size="7">P(i) true throughout</text>
  <!-- Structural Induction -->
  <rect x="120" y="22" width="100" height="85" rx="5" fill="#22c55e" opacity="0.12" stroke="#22c55e"/>
  <text x="170" y="38" text-anchor="middle" fill="#22c55e" font-weight="bold" font-size="9">Struct. Induction</text>
  <text x="170" y="52" text-anchor="middle" fill="currentColor" font-size="8">For: recursive</text>
  <text x="170" y="64" text-anchor="middle" fill="currentColor" font-size="8">Base case: n=1</text>
  <text x="170" y="76" text-anchor="middle" fill="currentColor" font-size="8">Induct: n=k→k+1</text>
  <text x="170" y="88" text-anchor="middle" fill="#22c55e" font-size="8">e.g. merge sort</text>
  <text x="170" y="100" text-anchor="middle" fill="#64748b" font-size="7">P(k) → P(k+1)</text>
  <!-- Model Checking -->
  <rect x="235" y="22" width="100" height="85" rx="5" fill="#f59e0b" opacity="0.12" stroke="#f59e0b"/>
  <text x="285" y="38" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="9">Model Checking</text>
  <text x="285" y="52" text-anchor="middle" fill="currentColor" font-size="8">For: finite-state</text>
  <text x="285" y="64" text-anchor="middle" fill="currentColor" font-size="8">Enumerate ALL</text>
  <text x="285" y="76" text-anchor="middle" fill="currentColor" font-size="8">reachable states</text>
  <text x="285" y="88" text-anchor="middle" fill="#f59e0b" font-size="8">TLA+, SPIN, Z3</text>
  <text x="285" y="100" text-anchor="middle" fill="#64748b" font-size="7">Amazon uses TLA+</text>
  <text x="170" y="122" text-anchor="middle" fill="#ef4444" font-size="9">Testing finds bugs. Verification PROVES their absence.</text>
</svg>`,
      },
    },
  ],
};
