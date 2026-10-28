# CrimeBook 📕⚡
> **Your Personal AI Mistake Notebook & Adaptive Study Companion**  
> *Powered by NVIDIA Nemotron (Nano & 3 Ultra) on Nebius Token Factory with Tavily Educational Grounding*

[![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg)](https://opensource.org/licenses/MIT)
[![Nebius Token Factory](https://img.shields.io/badge/Hosted_on-Nebius_Token_Factory-8A2BE2.svg)](https://nebius.com)
[![NVIDIA Nemotron](https://img.shields.io/badge/Model-NVIDIA_Nemotron_Tiered-76B900.svg)](https://developer.nvidia.com)
[![Tavily Search](https://img.shields.io/badge/Grounding-Tavily_AI_Search-0099FF.svg)](https://tavily.com)
[![Personal AI Track](https://img.shields.io/badge/Track-Personal_AI_Track-maroon.svg)](https://nebiusglobalaihackathon.devpost.com)

Built for the **Nebius x NVIDIA Global AI Hackathon**  
**Track:** Personal AI Track  
**Bonus Target:** Best Use of Tavily ($3,000 Award) • City Winner Award (Tokyo) • Most Valuable Feedback ($100 + Swag)

---

## 🌟 What is CrimeBook?

When students and engineers study using standard chatbots, a fundamental flaw exists: **conversations disappear into chat history**. 

You ask about difficult concepts again and again — whether it's *C++ function creation and pointer dereferencing*, *3D coordinate geometry distance signs*, or *complex history dates*. You struggle, you trip, you make mistakes on tests, but normal chatbots treat every session as day zero.

**CrimeBook** is an always-on, private personal AI assistant that turns your study struggles into your greatest learning advantage:
- As you study and chat, CrimeBook's background agent (**NVIDIA Nemotron Nano**) detects the exact places where you tripped up, asked repeated questions, or got confused.
- It automatically curates a persistent **"Mistake Book" (Crime Book)** for each subject — a clean, structured notepad listing your weak spots, mental hooks, and rules to remember.
- When you open your Mistake Book, it features a split-screen: your **Notepad** on the left and a dedicated **Side Chatbot** on the right to ask clarifying questions that dynamically update your notes.
- It generates **adaptive diagnostic tests** targeting your exact mistakes.
- Once you submit your test, **NVIDIA Nemotron 3 Ultra** produces deep diagnostic corrections: showing the correct model answer, comparing it to your answer, and pinpointing whether you made a *Concept Misunderstanding*, *Formula Error*, or *Syntax Slip*!

---

## 🎨 The 4 Core Views (Inspired by the Clean Blush & Maroon Design)

1. **Study Chat (Mockup Page 1):** The primary conversational tutor. Ask anything, request simpler terms, and watch CrimeBook flag confusion points and log them straight to your Crime Book.
2. **Mistake Book / Notepad (Mockup Page 2):** A two-column study sanctuary. On the left is your notepad of difficult topics and rules to remember; on the right is a persistent side-chat to dive deeper into tricky concepts.
3. **Adaptive Test Section (Mockup Page 3):** Generates custom diagnostic test papers based on your logged mistakes, complete with question hints and the dedicated "Search Paper" metadata card.
4. **Test Corrections & Diagnosis (Mockup Page 4):** Displays the model solution followed by a deep breakdown of your answer, diagnosing what went wrong (concept gap, formula mistake, syntax slip) with remedy tips.

---

## 🏗️ Architecture & Model Routing

```
[ Student Study Question / Uploaded Notes ]
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│ Stage 1: Real-time Mistake Detection (Nemotron Nano)   │
│ Model: nvidia/nemotron-nano-4b on Nebius Token Factory │
│ • Evaluates confusion & repeated inquiry patterns      │
│ • Sub-200ms latency without interrupting chat flow     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Stage 2: Persistent Mistake Book (Crime Book)          │
│ • Groups by subject: Maths, C++/DSA, History, Science  │
│ • Tracks mistake frequency (e.g., "Tripped 3x")        │
│ • Interactive side-chat to refine definitions          │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Stage 3: Adaptive Test Generation (Nemotron Nano)      │
│ Model: nvidia/nemotron-nano-4b on Nebius Token Factory │
│ • Crafts questions targeting active mistake concepts   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Stage 4: Diagnostic Grading & Remedy (Nemotron 3 Ultra)│
│ Model: nvidia/nemotron-3-ultra on Nebius Token Factory │
│ • Evaluates student answers against model solutions   │
│ • Categorizes error: Concept vs Formula vs Syntax      │
│ • Automatically syncs new gaps back to Crime Book!     │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart Guide

CrimeBook runs on standard web infrastructure with **zero local GPU requirements** — all AI inference runs on **Nebius Token Factory**, and reference material queries run via **Tavily**.

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/crimebook-ai.git
cd crimebook-ai
npm install
```

### 2. Configure API Keys (Optional)

Create a `.env.local` file:

```env
# Nebius Token Factory API Key (NVIDIA Nemotron Nano & 3 Ultra)
NEBIUS_API_KEY="your-nebius-api-key"

# Tavily AI Search API Key (for educational grounding)
TAVILY_API_KEY="your-tavily-api-key"
```

*(Note: CrimeBook comes with pre-loaded mock subjects for Maths: Geometry, C++ Functions, History, and Science, plus built-in simulation so you can test all 4 views immediately even without API keys!)*

### 3. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎁 Free Hackathon Credits Guide

- **Nebius Token Factory ($25 to $50 Credits):**
  - Sign up via the hackathon resources form.
  - Enter promo code: `NEBIUS-DEVPOST-GLOBAL26`
  - Get instant access to `nvidia/nemotron-nano-4b` and `nvidia/nemotron-3-ultra`.
- **Tavily Search API (1,000 Free Searches/Month):**
  - Register at [tavily.com](https://tavily.com).

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
