import { SubjectData } from './types';

export const INITIAL_SUBJECTS: SubjectData[] = [
  {
    id: 'maths-geometry',
    name: 'Maths: Geometry',
    category: 'Mathematics',
    paperInfo: {
      topic: 'Euclidean Geometry & 3D Coordinates',
      date: 'Oct 25, 2026',
      keywords: ['Pythagoras 3D', 'Coordinate Planes', 'Circle Theorems', 'Trigonometric Ratios'],
    },
    chatMessages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'can you expand on the topic in more easy terms? I keep getting confused about how to find distance between two points in 3D geometry compared to 2D.',
        timestamp: '10:14 AM',
        detectedMistake: {
          topic: '3D Pythagorean Distance Extension',
          description: 'Tripping on extending the 2D distance formula d = sqrt(dx^2 + dy^2) to 3D with the z-axis.',
          mistakeType: 'Concept Misunderstanding',
        },
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: `Think of 3D distance like walking across a room, then climbing a ladder!

In 2D (on a flat floor):
Distance = √(Δx² + Δy²)

In 3D (walking across the floor AND going up to the ceiling):
You just add the vertical climb (Δz) inside the same square root:
Distance = √(Δx² + Δy² + Δz²)

It's the exact same Pythagorean theorem applied twice! First across the floor, then up the vertical height.`,
        timestamp: '10:15 AM',
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Wait, what if one coordinate is negative? Do I subtract it inside the square root?',
        timestamp: '10:17 AM',
        detectedMistake: {
          topic: 'Negative Coordinate Squaring Rule',
          description: 'Repeated doubt: Forgetting that squaring a negative difference always yields a positive number.',
          mistakeType: 'Formula / Calculation Error',
        },
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: `Great question! You ALWAYS square the difference, so it never stays negative!

For example, if x₁ = 2 and x₂ = -3:
Δx = 2 - (-3) = 5
Even if you did (-3 - 2) = -5, when you square it: (-5)² = +25.

Because squares are always positive (or zero), distance is always a real, positive number. Never put a minus sign between the squared terms!`,
        timestamp: '10:18 AM',
      },
    ],
    mistakeBook: [
      {
        id: 'm-1',
        topic: '3D Pythagorean Distance Formula',
        triggerQuestion: 'How to calculate distance between (x1, y1, z1) and (x2, y2, z2)',
        mistakeDescription: 'Frequently forgetting to include the Δz² term, or accidentally putting a minus sign between the squared terms when coordinates are negative.',
        simplifiedExplanation: 'Distance is always √(Δx² + Δy² + Δz²). Squaring (-Δx)² always gives a positive value, so terms inside the root are always added together.',
        mistakeType: 'Formula / Calculation Error',
        frequency: 3,
        lastEncountered: 'Today at 10:17 AM',
        notes: [
          'Rule: (x2 - x1)² is always ≥ 0. Never write √(x² - y²)!',
          'Analogy: Floor diagonal first, then ladder height.',
          'Review before test: Double check sign inside the square root.',
        ],
      },
      {
        id: 'm-2',
        topic: 'Circle Theorem: Subtended Angle at Center',
        triggerQuestion: 'Angle subtended at the center vs angle at the circumference',
        mistakeDescription: 'Confusing whether the angle at the center is double or half the angle at the circumference.',
        simplifiedExplanation: 'The angle at the center is always BIGGER (2x). The circumference angle is smaller (1/2x). Center = 2 × Circumference.',
        mistakeType: 'Concept Misunderstanding',
        frequency: 2,
        lastEncountered: 'Yesterday at 4:30 PM',
        notes: [
          'Memory hook: The center is the "heart", so it has twice the power.',
          'Always look for the arrowhead shape.',
        ],
      },
    ],
    testQuestions: [
      {
        id: 'q-1',
        questionNumber: 1,
        questionText: 'Calculate the straight-line distance between point A(1, -2, 4) and point B(4, 2, -1) in 3-dimensional space. State the formula and show each step.',
        targetedMistakeTopic: '3D Pythagorean Distance Formula',
        hint: 'Remember that differences are squared, so negative coordinate subtractions turn positive.',
        userAnswer: 'Distance = sqrt((4-1)^2 - (2 - (-2))^2 + (-1 - 4)^2) = sqrt(9 - 16 + 25) = sqrt(18) = 4.24',
      },
      {
        id: 'q-2',
        questionNumber: 2,
        questionText: 'An arc of a circle subtends an angle of 74° at the center of the circle. What is the angle subtended by the same arc at any point on the remaining circumference?',
        targetedMistakeTopic: 'Circle Theorem: Subtended Angle at Center',
        hint: 'Is the circumference angle half or double the center angle?',
        userAnswer: 'The angle at the circumference is 2 * 74 = 148 degrees.',
      },
    ],
    testCorrections: [
      {
        questionNumber: 1,
        questionText: 'Calculate the straight-line distance between point A(1, -2, 4) and point B(4, 2, -1) in 3-dimensional space.',
        correctAnswer: `Step 1: Formula d = √((x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²)\nStep 2: Δx = 4 - 1 = 3  =>  3² = 9\nStep 3: Δy = 2 - (-2) = 4  =>  4² = 16\nStep 4: Δz = -1 - 4 = -5  =>  (-5)² = 25\nStep 5: d = √(9 + 16 + 25) = √50 ≈ 7.07 units.`,
        userAnswer: `Distance = sqrt((4-1)^2 - (2 - (-2))^2 + (-1 - 4)^2) = sqrt(9 - 16 + 25) = sqrt(18) = 4.24`,
        isCorrect: false,
        mistakeType: 'Formula / Calculation Error',
        diagnosticFeedback: 'Formula Sign Slip: You placed a minus sign between the Δx² and Δy² terms (9 - 16). In Euclidean distance, all squared coordinate differences must be ADDED together because distance cannot decrease along orthogonal axes.',
        whatWentWrong: 'You wrote (9 - 16 + 25) instead of (9 + 16 + 25). The negative coordinate y1 = -2 confused the operator before the parenthesis.',
        remedyTip: 'Always write out the general template d = √( [ ]² + [ ]² + [ ]² ) with plus signs first before inserting numbers!',
      },
      {
        questionNumber: 2,
        questionText: 'An arc of a circle subtends an angle of 74° at the center. What is the angle subtended at the circumference?',
        correctAnswer: `Angle at circumference = (1/2) × Angle at center = 74° / 2 = 37°.`,
        userAnswer: `The angle at the circumference is 2 * 74 = 148 degrees.`,
        isCorrect: false,
        mistakeType: 'Concept Misunderstanding',
        diagnosticFeedback: 'Inverted Multiplier: You multiplied by 2 instead of dividing by 2. The angle at the center of a circle is always twice as large as the angle subtended at the circumference, never smaller.',
        whatWentWrong: 'Reversed the relationship: thought Circumference = 2 × Center instead of Center = 2 × Circumference.',
        remedyTip: 'Visual Check: Points on the circumference are further away from the arc, so the angle opens up narrower (smaller). Center is closer, so it opens wider.',
      },
    ],
    sideChatMessages: [
      {
        id: 'sc-1',
        role: 'assistant',
        content: 'Hi! I am looking at your Maths: Geometry Mistake Book. What concept would you like to review or ask about right now?',
        timestamp: '10:20 AM',
      },
    ],
  },
  {
    id: 'dsa-cpp',
    name: 'DSA: C++ Functions & Pointers',
    category: 'Computer Science',
    paperInfo: {
      topic: 'Function Declarations, Pointers & Recursion in C++',
      date: 'Oct 24, 2026',
      keywords: ['Pointers', 'Pass-by-Reference', 'Memory Addresses', 'Base Cases'],
    },
    chatMessages: [
      {
        id: 'dsa-msg-1',
        role: 'user',
        content: 'I did not get C++ function creation with pointers. Why do we write void update(int* ptr) and then in main call update(&x)? What is the difference between * and &?',
        timestamp: 'Yesterday',
        detectedMistake: {
          topic: 'Pointer Dereferencing vs Address-Of Operator',
          description: 'Confusing the address-of operator (&) with the dereference operator (*), and understanding why pointers are required for mutating variables in functions.',
          mistakeType: 'Concept Misunderstanding',
        },
      },
      {
        id: 'dsa-msg-2',
        role: 'assistant',
        content: `Here is the simplest mental model:

1. \`&\` means **"Where do you live?"** (Address).
When you write \`&x\`, you are passing the home address of \`x\`.

2. \`*\` in the function parameter \`int* ptr\` means:
**"I am an address envelope that holds a house address."**

3. \`*\` inside the function \`*ptr = 100;\` means:
**"Open the door of that house and put 100 inside."**

If you don't use pointers or references, C++ creates a **photocopy** of the variable. Any change you make to the photocopy is thrown away when the function finishes!`,
        timestamp: 'Yesterday',
      },
    ],
    mistakeBook: [
      {
        id: 'm-dsa-1',
        topic: 'Pointer Syntax: & (Address) vs * (Value at Address)',
        triggerQuestion: 'How to pass a variable by pointer to mutate it inside a function',
        mistakeDescription: 'Mixing up when to use & vs *. Forgetting that & extracts the memory address to give to a pointer, while * dereferences the pointer to read/write the value.',
        simplifiedExplanation: '& = "Get address". *ptr = "Visit address and change value". Parameter `int*` declares that it expects an address.',
        mistakeType: 'Syntax / Definition Slip',
        frequency: 4,
        lastEncountered: 'Yesterday',
        notes: [
          'Pass by value: void func(int x) -> makes a copy.',
          'Pass by pointer: void func(int* ptr) -> caller passes &x.',
          'Pass by reference (clean C++): void func(int& x) -> caller just passes x.',
        ],
      },
    ],
    testQuestions: [
      {
        id: 'q-dsa-1',
        questionNumber: 1,
        questionText: 'Write a C++ function `swap` that takes two integers and swaps their values in the caller function using pointers. Show the function signature and the call in `main()`.',
        targetedMistakeTopic: 'Pointer Syntax: & (Address) vs * (Value at Address)',
        hint: 'Use int* as parameters and pass &a, &b in main.',
        userAnswer: '',
      },
    ],
    testCorrections: [],
    sideChatMessages: [
      {
        id: 'sc-dsa-1',
        role: 'assistant',
        content: 'Viewing C++ Functions & Pointers Mistake Book. Ask any doubt and we will log insights right into your notepad!',
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'history-french-rev',
    name: 'History: French Revolution',
    category: 'Social Studies',
    paperInfo: {
      topic: 'Causes, Estates-General & Reign of Terror',
      date: 'Oct 23, 2026',
      keywords: ['Estates General', 'Bastille', 'Jacobins', 'Robespierre'],
    },
    chatMessages: [
      {
        id: 'hist-1',
        role: 'user',
        content: 'Which estate had to pay all the taxes before 1789?',
        timestamp: '2 days ago',
      },
      {
        id: 'hist-2',
        role: 'assistant',
        content: 'The **Third Estate** (peasants, merchants, artisans, lawyers) made up about 98% of the population and paid virtually all the taxes (taille, tithes, gabelle), while the First Estate (Clergy) and Second Estate (Nobility) enjoyed tax exemptions.',
        timestamp: '2 days ago',
      },
    ],
    mistakeBook: [
      {
        id: 'm-hist-1',
        topic: 'Taxation of the Three Estates',
        triggerQuestion: 'Which estate paid taxes in pre-revolutionary France?',
        mistakeDescription: 'Confused Second Estate (Nobility) with Third Estate (Commoners) regarding feudal obligations.',
        simplifiedExplanation: '1st = Clergy (No tax), 2nd = Nobility (No tax), 3rd = Commoners (Paid ALL taxes).',
        mistakeType: 'Memory / Fact Retrieval',
        frequency: 1,
        lastEncountered: '2 days ago',
        notes: ['Remember: 98% population bore 100% tax burden.'],
      },
    ],
    testQuestions: [
      {
        id: 'q-hist-1',
        questionNumber: 1,
        questionText: 'Explain the social structure of the Three Estates in 18th-century France and why the voting system in the Estates-General triggered the creation of the National Assembly.',
        targetedMistakeTopic: 'Taxation of the Three Estates',
        userAnswer: '',
      },
    ],
    testCorrections: [],
    sideChatMessages: [],
  },
  {
    id: 'science-ch2',
    name: 'Science chapter 2',
    category: 'Biology',
    paperInfo: {
      topic: 'Cellular Respiration & Photosynthesis',
      date: 'Oct 22, 2026',
      keywords: ['Mitochondria', 'ATP', 'Glycolysis', 'Krebs Cycle'],
    },
    chatMessages: [],
    mistakeBook: [],
    testQuestions: [],
    testCorrections: [],
    sideChatMessages: [],
  },
  {
    id: 'english-lesson12',
    name: 'English lesson: 12',
    category: 'Literature',
    paperInfo: {
      topic: 'Grammar: Subjunctive Mood & Complex Clauses',
      date: 'Oct 21, 2026',
      keywords: ['Subjunctive', 'Conditional', 'Syntax'],
    },
    chatMessages: [],
    mistakeBook: [],
    testQuestions: [],
    testCorrections: [],
    sideChatMessages: [],
  },
];
