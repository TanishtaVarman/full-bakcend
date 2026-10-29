# Devpost Submission Form Guide & Copy-Paste Text
**Project Title:** CrimeBook: Personal AI Mistake Notebook & Study Companion  
**Tagline:** An always-on personal AI that tracks your study mistakes, builds adaptive crime books, and generates diagnostic tests.  
**Track:** Personal AI Track  
**Bonus Awards Opt-In:** 
- [x] Best Use of Tavily ($3,000 USD)
- [x] City Winner Award (Tokyo) ($500 USD)
- [x] Most Valuable Feedback ($100 USD + NVIDIA Swag Pack)

---

## 📝 Submission Form Fields (Copy-Paste Ready)

### Inspiration
Whenever we study using modern AI chatbots, we run into the same frustration: **conversations vanish into endless chat history**. 

Whether we are preparing for coding interviews (tripping on *C++ function creation and pointer syntax*), working through *3D coordinate geometry formulas*, or memorizing *history timelines*, there are always specific concepts we ask about repeatedly. We struggle, get confused, make mistakes on practice tests, and forget the exact rule we learned two days ago. 

We asked ourselves: *What if our AI study companion didn't just answer questions, but actively kept a "Mistake Notebook" — a Crime Book — of everywhere we tripped up?* What if it organized our mistakes into a dedicated notepad by subject, allowed us to refine them with a side-chat, and automatically generated adaptive test papers to turn our weaknesses into mastery?

Inspired by the **Personal AI Track** of the Nebius x NVIDIA Hackathon ("an always-on, private assistant with persistent memory, reusable skills, and data under your control"), we built **CrimeBook**.

---

### What it does
**CrimeBook** is a personal AI study assistant that turns your study mistakes into personalized learning assets across 4 unified views:
1. **Interactive Study Chat (View 1):** Study any subject or uploaded notes. When you ask questions repeatedly or express confusion (e.g. *"can you expand on the topic in more easy terms? I didn't get C++ function creation"*), CrimeBook's background agent detects your struggle and instantly logs it to your Crime Book.
2. **Mistake Book / Notepad (View 2):** Opens a two-column study sanctuary. On the left is a clean, bulleted **Notepad** detailing every concept you tripped on, its frequency, and golden rules to remember. On the right is a persistent **Side Chatbot** where you can ask clarifying questions while looking at your notes, automatically updating your notebook in real time.
3. **Adaptive Test Section (View 3):** Generates diagnostic exam papers specifically targeting your logged mistake topics, accompanied by contextual hints and a "Search Paper" metadata card.
4. **Test Corrections & Diagnostics (View 4):** Evaluates your submitted answers by displaying the **Correct Model Answer** first, followed by **Your Answers and Mistakes Made**, diagnosing whether your error was a *Concept Misunderstanding*, *Formula Error*, or *Syntax Slip*, and syncing new gaps directly back to your Crime Book!

---

### How we built it
We engineered CrimeBook as a high-performance full-stack TypeScript / Next.js application powered by open infrastructure:
1. **NVIDIA Nemotron Tiered Architecture on Nebius Token Factory:**
   - **`nvidia/nemotron-nano-4b`:** Performs real-time, sub-200ms mistake classification on student messages during study chats without introducing latency. Also handles fast diagnostic test question generation.
   - **`nvidia/nemotron-3-ultra`:** Serves as the master pedagogical evaluator during Test Corrections. It performs deep comparative reasoning between the student's submission and the model solution to pinpoint the underlying misconception.
2. **Tavily AI Search Integration:**
   - Grounding engine that fetches verified academic definitions, textbook explanations, and canonical reference examples when explaining complex concepts.
3. **Product Design & Aesthetic Experience:**
   - Designed with a bespoke, soft light pink, warm beige, and deep maroon palette (`#E5B6A8`, `#FAF7F2`, `#3B1320`) to create a calm, focused, and aesthetic study sanctuary.
   - Structured navigation tree with collapsible subject sub-views (Study Chat, Mistake Book, Test, Test Corrections).

---

### Challenges we ran into
- **Detecting Confusion Without Intrusion:** We had to carefully prompt Nemotron Nano to differentiate between an ordinary factual question and a student genuinely struggling with a concept. We tuned the prompt to identify phrases like "easy terms", "expand on", "didn't get", and repeated inquiries.
- **Pedagogical Diagnostic Parsing:** Grading free-form student answers is notoriously hard. Using Nemotron 3 Ultra with structured JSON output enabled us to separate the correct model answer from the diagnostic mistake taxonomy (Concept vs Formula vs Syntax).

---

### Accomplishments that we're proud of
- **True Personal AI with Persistent Memory:** Every subject maintains its own memory of mistakes, test scores, and trouble spots that persist across sessions.
- **Flawless Multi-Model Synergy:** Using Nemotron Nano for fast real-time chat evaluation and Nemotron 3 Ultra for deep test grading proves the power of tiered model deployment on Nebius Token Factory.
- **Zero Local GPU Required:** 100% accessible on any laptop or browser while keeping user data private.

---

### What we learned
- Multi-tier model routing is the future of interactive AI: lightweight models keep interactions snappy and low-cost, while reasoning heavyweights excel at evaluation and synthesis.
- Turning errors into structured "Crime Books" fundamentally changes the psychology of studying: mistakes stop being failures and become actionable study items.

---

### What's next for CrimeBook
- **Spaced Repetition Flashcards (SRS):** Integrating an automated Leitner card system that surfaces mistake topics right before memory decay occurs.
- **Multi-Modal Homework Upload:** Allowing students to snap a photo of handwritten exam papers or math equations and extracting errors directly via Nemotron multimodal vision models.

---

## 📣 Feedback on Nebius Token Factory & NVIDIA Technologies
*(Eligible for the $100 Cash + NVIDIA Swag Pack Award)*

1. **Nebius Token Factory:**
   - **Highlights:** Excellent API responsiveness and OpenAI compatibility made testing and swapping models instantaneous. Token pricing on open models is drastically cheaper than proprietary clouds.
   - **Suggestions:** Adding built-in structured JSON schema enforcement at the inference engine level (e.g., via guided decoding) would further speed up JSON outputs.
2. **NVIDIA Nemotron Models:**
   - **Highlights:** Nemotron Nano's low latency makes it phenomenal for real-time background classification tasks. Nemotron 3 Ultra's diagnostic explanations showed nuanced pedagogical reasoning that rivals proprietary 70B+ models.
3. **Tavily API:**
   - **Highlights:** Quick response times and clean markdown extractions without search engine clutter.

---

## 🛠️ Built With
- `nebius-token-factory`
- `nvidia-nemotron`
- `tavily-search-api`
- `nextjs`
- `typescript`
- `tailwind-css`
- `react`
- `lucide-react`
