<p align="center">
  <a href="https://mistcast-weather.netlify.app/forecast" rel="noopener noreferrer">
    <img width=100% style="border-radius:0.4rem" src="https://i.imghippo.com/files/GDb8018Ac.png">
  </a>
</p>

# CVLens - Resume Analyser & Creator

<div align="center">

[![Live](https://img.shields.io/badge/Live-cv--lens--prod.netlify.app-00C7B7?style=flat&logo=netlify)](https://cv-lens-prod.netlify.app/)

<h4>CV Lens is an AI-powered career assistant that analyzes your current resume, personal bio, and a target job description to generate a detailed gap-analysis report with custom interview questions and a day-by-day preparation plan. Using advanced generative AI and Puppeteer, it then instantly rebuilds and exports a highly tailored, ATS-optimized PDF resume designed specifically to land that target role.</h4>

[![Repo Type](https://img.shields.io/badge/repo_type-Public-fcc419?logo=applepodcasts&style=flat)](https://github.com/arpitjana2103/grow-14-open-weather-cast)
[![License](https://img.shields.io/badge/license-MIT-85e2cd.svg?logo=unlicense&logoColor=white)](https://opensource.org/license/mit/)

</div>

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-e2e8f0?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React--Router-7-CA4245?style=flat&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Schadcn](https://img.shields.io/badge/Schadcn-4-e2e8f0?style=flat&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-e2e8f0?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-6-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-25-40B5A4?style=flat&logo=puppeteer&logoColor=white)](https://pptr.dev/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=flat&logo=neon&logoColor=white)](https://neon.com/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5-e2e8f0?style=flat&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

</div>

## A Demo Report

<img style="width:100%" src="https://i.imghippo.com/files/GuJC4390II.png">

## Application Features

CV Lens is a full-stack AI career assistant built with React, Node.js, and Google's Generative AI, delivering highly personalized resume analysis and dynamic resume recreation through a sleek, intuitive interface.

1. **Intelligent Contextual Analysis:** Upload your current PDF resume, input a target job description, and add a personal bio. CV Lens parses the document using pdf-parse and cross-references all data points to evaluate your candidacy.
2. **Comprehensive Gap-Analysis Reports:** Receive a detailed match score (%) alongside a severity-graded breakdown of your skill gaps (Low, Medium, High) - all powered by the Google Gemini API.
3. **Targeted Interview Simulation:** Anticipate the interview with auto-generated, role-specific behavioral and technical questions, complete with the recruiter's underlying intention and suggested answers.
4. **Actionable Preparation Plan:** Get a structured, day-by-day study and preparation guide directly aligned with the target job requirements and your identified weaknesses.
5. **Dynamic Resume Generation:** Bypass manual editing. The app instantly rebuilds your resume to perfectly align with the target job description and exports it as a polished, ATS-optimized PDF using Puppeteer.
6. **Secure Authentication & History:** Log in via Local credentials or Google OAuth 2.0. All user sessions are securely managed by Redis, and past interview reports are saved to a PostgreSQL database (via Prisma) for future reference.
7. **Modern & Responsive UI:** A visually rich, responsive dashboard built with Tailwind CSS, Shadcn UI, and React Query for seamless, state-managed data fetching across all devices.

## Run Locally

**Step 1 :** Clone the repository

```bash
git clone https://github.com/arpitjana2103/grow-19-CVLens.git
cd grow-19-CVLens
```

**Step 2 :** Install `npm packages`

```bash
npm install
```

**Step 3 :**

Create a `.env` file into the `Backend-CVLens` dir.

Create a `.env.local` file into the `Frontend-CVLens` dir.

Refer - `Backend-CVLens\.env-example`

Refer - `Frontend-CVLens\.env.local-exmaple`

**Step 4 :** Start the development server

```bash
ForntEnd : npm run dev
BackEnd : npm run start:dev
```

## Tech Stack & Tools

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React--Router-7-CA4245?style=flat&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Schadcn](https://img.shields.io/badge/Schadcn-4-e2e8f0?style=flat&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-e2e8f0?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-6-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-25-40B5A4?style=flat&logo=puppeteer&logoColor=white)](https://pptr.dev/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=flat&logo=neon&logoColor=white)](https://neon.com/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5-e2e8f0?style=flat&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

[![Vite](https://img.shields.io/badge/Vite-8-7c86ff?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Zed](https://img.shields.io/badge/Zed-Editor-2b7fff?style=flat&logo=zedindustries&logoColor=white)](https://zed.dev/)
[![Git](https://img.shields.io/badge/Git-VCS-F05032?style=flat&logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-e2e8f0?style=flat&logo=github&logoColor=white)](https://github.com/)
[![Claude](https://img.shields.io/badge/Claude-Sonnet%204.6-EB6E4B?style=flat&logo=anthropic&logoColor=white)](https://www.anthropic.com/)

## Contact Me

[![Gmail ](https://img.shields.io/badge/Email-arpitjana2103@gmail.com-ff6467?style=flat&logo=gmail&logoColor=white&link=mailto:arpitjana2103@gmail.com)](mailto:arpitjana2103@gmail.com)
[![LinkedIn ](https://img.shields.io/badge/LinkedIn-@arpitjana2103-0077b5?style=flat&logo=signal&logoColor=white&link=https://www.linkedin.com/in/arpitjana2103/)](https://www.linkedin.com/in/arpitjana2103/)

## License

[![License](https://img.shields.io/badge/license-MIT-85e2cd.svg?logo=unlicense&logoColor=white)](https://opensource.org/license/mit/)

Copyright (c) 2026 Arpit Jana
