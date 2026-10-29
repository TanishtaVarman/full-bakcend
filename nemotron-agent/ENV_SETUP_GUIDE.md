# 🔑 How to Find Your Nebius API Key & Setup Guide

This guide walks you step-by-step through finding your **Nebius Token Factory API Key** and setting up your environment.

---

## 📌 Part 1: Where to Find Your Nebius API Key

Nebius Token Factory serves NVIDIA open-source models (Nemotron Nano and Nemotron 3 Ultra) through an OpenAI-compatible API.

### Step-by-Step Instructions:

1. **Log in to Nebius Token Factory:**
   * Go to **[https://tokenfactory.nebius.com](https://tokenfactory.nebius.com)** (or **[https://studio.nebius.ai](https://studio.nebius.ai)**).
   * Sign in with your registered email, Google, or GitHub account.

2. **Navigate to API Keys:**
   * In the **left navigation sidebar**, look for the **"API Keys"** section (or key icon 🔑).
   * Direct URL: **[https://tokenfactory.nebius.com/keys](https://tokenfactory.nebius.com/keys)** or **[https://studio.nebius.ai/settings/api-keys](https://studio.nebius.ai/settings/api-keys)**.

3. **Generate a New Key:**
   * Click the blue or purple button: **`+ Create API Key`** (or **`New Secret Key`**).
   * Give it a label (e.g. `CrimeBook-Hackathon`).
   * Click **Create / Confirm**.

4. **Copy Your Key Immediately:**
   * A pop-up will display your secret token (it usually starts with `nbf_...` or a long alphanumeric bearer string).
   * **Copy it immediately** — Nebius will not show this secret again once you close the window.

### 💡 Haven't Claimed Your Free $25–$50 Credits Yet?
* Visit the [Nebius Builder Program Form](https://nebius.com) linked on the Devpost hackathon page.
* Enter your activation code: **`NEBIUS-DEVPOST-GLOBAL26`**.
* This grants free credits to query NVIDIA Nemotron models.

---

## 📌 Part 2: Where to Find Your Tavily API Key (Optional)

1. Go to **[https://tavily.com](https://tavily.com)**.
2. Sign up for a free account (1,000 free searches/month, no credit card needed).
3. On your dashboard, copy your API key (starts with `tvly-...`).

---

## 📌 Part 3: How to Set Up the Keys on Your Computer

In the project folder, you will see a visible file called:
**`env.example.txt`**

1. Create a new file in the root of the project called **`.env.local`**.
2. Paste your keys inside like this:
   ```env
   NEBIUS_API_KEY="nbf_live_your_actual_key_here"
   TAVILY_API_KEY="tvly-your_tavily_key_here"
   ```
3. Save the file and restart your local dev server:
   ```bash
   npm run dev
   ```

---

## ⚡ Don't Have Your API Key Yet? No Problem!

**CrimeBook is built with an automatic intelligent fallback simulation engine:**
* If `NEBIUS_API_KEY` is not present, CrimeBook **does not crash or freeze**.
* It runs high-fidelity simulated responses for:
  1. **Study Chat:** Answering student questions and detecting struggling points.
  2. **Mistake Book:** Automatically logging concepts into the notepad.
  3. **Adaptive Test:** Generating test papers based on your mistakes.
  4. **Test Corrections:** Producing full model solutions and diagnostic mistake breakdowns.
* This means **you can record your 3-minute YouTube video right now** and test the entire frontend UI without waiting for your API key to be approved!
