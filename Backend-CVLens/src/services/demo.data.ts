export const demoResume = `
    Arpit Sharma
    Email: arpit.sharma.dev@example.com
    Phone: +91 98765 43210
    Location: Kolkata, India
    GitHub: github.com/arpitsharma
    LinkedIn: linkedin.com/in/arpitsharma

    SUMMARY

    Full Stack MERN Developer with 2+ years of experience building scalable web applications using MongoDB, Express.js, React.js, and Node.js. Strong understanding of REST APIs, authentication, database design, and modern frontend development. Passionate about writing clean, maintainable code and solving real-world problems.

    TECHNICAL SKILLS

    Languages:
    - JavaScript (ES6+)
    - TypeScript
    - HTML5
    - CSS3

    Frontend:
    - React.js
    - Next.js
    - Redux Toolkit
    - React Query
    - Tailwind CSS
    - Material UI

    Backend:
    - Node.js
    - Express.js
    - JWT Authentication
    - REST APIs
    - Socket.io

    Database:
    - MongoDB
    - Mongoose
    - PostgreSQL
    - Prisma

    Tools:
    - Git
    - GitHub
    - Docker
    - Postman
    - VS Code
    - Linux

    PROJECTS

    1. TaskFlow
    A team task management platform.

    Features:
    - JWT authentication
    - Role-based authorization
    - Kanban board
    - Real-time notifications
    - File uploads

    Tech:
    React, Node.js, Express, MongoDB, Socket.io

    2. ShopSphere
    An e-commerce application.

    Features:
    - Product catalog
    - Shopping cart
    - Payment integration
    - Order tracking
    - Admin dashboard

    Tech:
    React, Redux Toolkit, Express, MongoDB, Stripe

    3. DevConnect
    A social platform for developers.

    Features:
    - User profiles
    - Posts and comments
    - Follow system
    - Like system
    - Responsive UI

    Tech:
    React, Express, MongoDB, Node.js

    EXPERIENCE

    Full Stack Developer
    TechNova Solutions
    July 2023 - Present

    Responsibilities:
    - Developed REST APIs using Express.js.
    - Built reusable React components.
    - Optimized MongoDB queries.
    - Collaborated with designers and backend engineers.
    - Participated in code reviews.
    - Improved application performance by implementing caching strategies.

    EDUCATION

    Bachelor of Technology
    Computer Science and Engineering
    2023

    CERTIFICATIONS

    - MongoDB Developer Basics
    - JavaScript Algorithms and Data Structures
    - Docker Essentials
    `;

export const demoSelfDescription = `
    Hello, my name is Arpit Sharma, and I am a Full Stack MERN Developer with around two years of professional experience building modern web applications.

    My primary tech stack includes MongoDB, Express.js, React.js, and Node.js. I also work with TypeScript, Redux Toolkit, React Query, Prisma, PostgreSQL, and Docker.

    I enjoy designing clean APIs, creating responsive user interfaces, and writing maintainable code. While working on projects, I focus on code quality, scalability, and performance rather than simply making features work.

    In my current role, I have built REST APIs, implemented JWT authentication, optimized database queries, collaborated with frontend and backend teams, and participated in code reviews. I have also developed several personal projects, including a task management application, an e-commerce platform, and a developer social network.

    I enjoy learning new technologies and continuously improving my understanding of software architecture and best development practices. Recently, I have been exploring system design, Docker, PostgreSQL, and scalable backend development.

    I believe I am a quick learner, a collaborative team member, and someone who enjoys solving challenging technical problems. I am excited about opportunities where I can contribute to impactful products while continuing to grow as a software engineer.
    `;

export const demoJobDescription = `
    Position: MERN Stack Developer

    Company Overview

    We are looking for a passionate MERN Stack Developer to join our engineering team and help build scalable web applications used by thousands of customers.

    Responsibilities

    - Develop responsive web applications using React.js.
    - Build secure REST APIs using Node.js and Express.js.
    - Design and maintain MongoDB databases.
    - Collaborate with UI/UX designers and product managers.
    - Write clean, reusable, and maintainable code.
    - Optimize application performance.
    - Implement authentication and authorization.
    - Participate in code reviews.
    - Debug production issues.
    - Work in an Agile development environment.

    Required Skills

    - Strong knowledge of JavaScript and TypeScript.
    - Experience with React.js and modern React Hooks.
    - Experience with Node.js and Express.js.
    - Good understanding of MongoDB and Mongoose.
    - Knowledge of REST API design.
    - Experience with Git and GitHub.
    - Understanding of authentication using JWT.
    - Familiarity with Docker.
    - Good debugging and problem-solving skills.

    Preferred Skills

    - Experience with PostgreSQL or MySQL.
    - Experience with Prisma ORM.
    - Familiarity with React Query or Redux Toolkit.
    - Experience with AWS deployment.
    - Knowledge of CI/CD pipelines.
    - Basic understanding of system design.

    Qualifications

    - Bachelor's degree in Computer Science or related field.
    - 1 to 3 years of experience in full-stack web development.
    - Good communication and teamwork skills.
    - Passion for learning new technologies and improving engineering practices.
    `;

const demoReportResponse = {
    jobTitle: "MERN Stack Developer",
    matchScore: 92,
    technicalQuestions: [
        {
            question:
                "How do you handle state management in complex React applications, and why would you choose Redux Toolkit over React Context or vice-versa?",
            intention:
                "To test your depth in frontend architecture and your ability to choose the right tool for the scale of the application.",
            answer: "Explain that React Context is excellent for low-frequency updates like theme or user session, while Redux Toolkit is better for complex, high-frequency state changes. Mention performance benefits like memoization and the organized structure of Redux.",
        },
        {
            question:
                "Explain the difference between MongoDB and PostgreSQL, and describe a scenario where you would prefer a Relational Database over a NoSQL one.",
            intention:
                "To evaluate your architectural knowledge and understanding of data modeling beyond just MERN stack defaults.",
            answer: "Discuss schema flexibility in MongoDB vs. ACID compliance and structured data integrity in PostgreSQL. Use a banking or financial ledger system as a classic example for why you would choose a RDBMS.",
        },
        {
            question: "How do you ensure the security of your Node.js/Express REST APIs?",
            intention: "To assess your knowledge of backend security best practices.",
            answer: "Cover points like JWT implementation, password hashing (bcrypt), input validation/sanitization (e.g., using Joi or Zod), rate limiting to prevent DDoS, and using Helmet.js to set secure HTTP headers.",
        },
    ],
    behavioralQuestions: [
        {
            question:
                "Tell me about a time you faced a difficult bug in production. How did you identify and resolve it?",
            intention: "To assess your debugging methodology and how you handle pressure.",
            answer: "Use the STAR method (Situation, Task, Action, Result). Focus on the tools you used (e.g., logs, Postman, browser dev tools) and the steps you took to prevent recurrence.",
        },
        {
            question:
                "How do you handle disagreements with designers or product managers regarding technical feasibility?",
            intention: "To test your collaboration and communication skills within an Agile team.",
            answer: "Emphasize your role as a partner. Explain that you provide data-backed reasons for feasibility (e.g., complexity, performance impact) and offer alternative solutions that meet the business goal without compromising application health.",
        },
    ],
    skillGaps: [
        {
            skill: "AWS Deployment / Cloud Infrastructure",
            severity: "Medium",
        },
        { skill: "CI/CD Pipeline implementation", severity: "Medium" },
        { skill: "Advanced System Design", severity: "Low" },
    ],
    preparationPlan: [
        {
            day: 1,
            focus: "Backend Architecture & Databases",
            tasks: "Review PostgreSQL vs MongoDB design patterns. Practice writing complex Prisma queries and optimizing MongoDB indexing.",
        },
        {
            day: 2,
            focus: "Advanced React Ecosystem",
            tasks: "Deep dive into React Query's caching mechanisms and compare it against Redux Toolkit's RTK Query.",
        },
        {
            day: 3,
            focus: "DevOps & Deployment",
            tasks: "Watch tutorials on basic CI/CD (GitHub Actions) and AWS Elastic Beanstalk or EC2 deployment workflows.",
        },
        {
            day: 4,
            focus: "System Design & Scalability",
            tasks: "Study high-level concepts: Load balancing, horizontal vs vertical scaling, and caching strategies (Redis).",
        },
        {
            day: 5,
            focus: "Mock Interview & Behavioral",
            tasks: "Prepare STAR-method anecdotes for common behavioral questions. Perform a mock interview focusing on technical communication.",
        },
    ],
};
