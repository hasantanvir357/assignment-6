# 🏋️ FITLOG — Interactive Workout Planner & Exercise Library

**FITLOG** is a modern, responsive, and high-performance workout planning application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **DaisyUI**. Designed to deliver a slick dark-mode aesthetic with custom lime accents (`#ccff00`), FITLOG helps users browse, sort, save, and manage their daily training routines seamlessly.

---

## 🚀 Live Demo & Links

- **Live Web Application:** [https://assignment-6-delta-eight.vercel.app/](https://assignment-6-delta-eight.vercel.app/)
- **GitHub Repository:** [https://github.com/hasantanvir357/assignment-6](https://github.com/hasantanvir357/assignment-6)

---

## ✨ 5 Key Features

1. **Dynamic Exercise Sorting (C1 Requirement):**
   Users can effortlessly sort exercises in the library by **Duration**, **Calories**, or **Rating** in real time via an intuitive dropdown selector.

2. **Interactive Plan Management (C3 Requirement):**
   Dedicated **My Plan** page featuring real-time workout metrics (Total Exercises, Minutes, and Calories). Allows users to mark exercises as **"✓ Done"** or **"✕ Remove"** with instant toast feedback.

3. **Smart LocalStorage Data Persistence (Bonus):**
   Ensures that added plans and saved exercises persist across browser refreshes without losing state or causing Next.js SSR hydration bugs.

4. **Cap of 5 Lifts Rule (Bonus):**
   Enforces a strict limit of 5 workouts per day to encourage realistic training goals, giving a clear warning toast when the limit is reached.

5. **Custom 404 & Loading States (General Requirement):**
   Features a custom-styled 404 "Page Not Found" card banner matching the app's dark lime theme and clean loading states during asynchronous API data fetching.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | React Framework & File-based Routing |
| **TypeScript** | Type-safe code architecture |
| **Tailwind CSS** | Utility-first custom styling |
| **DaisyUI** | UI Component library support |
| **React Hot Toast** | Toast notifications for user feedback |
| **Google Fonts (Oswald & Inter)** | Custom modern typography |

---

## 💻 Local Setup & Installation

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/hasantanvir357/assignment-6.git](https://github.com/hasantanvir357/assignment-6.git)
   cd assignment-6
