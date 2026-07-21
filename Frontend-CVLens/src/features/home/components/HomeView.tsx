import {
    ArrowRight02Icon,
    ArrowUpRight01Icon,
    CloudUploadIcon,
    FavouriteIcon,
    GithubIcon,
    GoogleGeminiIcon,
    QuoteUpIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router";

import expressImg from "@/assets/express.png";
import GeminiImg from "@/assets/gemini.png";
// import puppeteerImg from "@/assets/puppeteer.png";
import postgresImg from "@/assets/postgre.png";
import prismaImg from "@/assets/prisma.png";
import reactImg from "@/assets/react.png";
import reactQuery from "@/assets/reactquery.png";
import schadcnImg from "@/assets/shadcn.png";
import tailwindImg from "@/assets/tailwindcss.png";
import typescriptImg from "@/assets/typescript.png";
import Container from "@/components/layout/Container";
import Logo from "@/components/shared/Logo";
import MyButton from "@/components/shared/MyButton";
import DemoReportView from "@/features/ai/components/DemoReportView";

export default function HomeView() {
    const navigate = useNavigate();
    return (
        <main className="mt-6">
            {" "}
            <Container>
                {/*<p className="mx-auto flex w-fit gap-1 rounded-full bg-white p-1 px-3 shadow-xl">
                <span className="text-primaryDark">NEW</span>{" "}
                <span>AI-Powered Interview Prep with</span>
                <span className="flex items-center gap-1">
                    <span className="text-blue-400">Gemini</span>
                    <img className="h-4 w-4" src={GeminiImg} alt="" />
                </span>
            </p>*/}
                <h1 className="mx-auto mt-20 flex w-fit flex-col items-center font-head text-4xl font-semibold sm:mt-30 sm:text-6xl">
                    <span className="text-center">Master your next interview</span>
                    <span className="text-center text-primaryDark">before it even happens.</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-center">
                    CVLens analyzes your resume against any job description to generate personalized
                    interview questions, identify skill gaps, and build a 10-day mastery plan.
                </p>
                <div className="mt-4 flex justify-center pb-6">
                    <MyButton varient="filled" onClick={() => navigate("/app")} className="mx-auto">
                        <span>Get Started For Free</span>

                        <span>
                            <HugeiconsIcon
                                icon={ArrowRight02Icon}
                                strokeWidth={3}
                                className="size-4 text-primary"
                            />
                        </span>
                    </MyButton>
                </div>
                <DemoReportView />
                <HowItWorksSection />
                <FeatureTestimonialSection />
                <CTASection />{" "}
            </Container>
            <Footer />
        </main>
    );
}

function Footer() {
    return (
        <footer className="overflow-hidden border-t-2 border-primary bg-white py-10">
            <Container className="relative">
                <HugeiconsIcon
                    icon={GoogleGeminiIcon}
                    fill="currentColor"
                    size={1100}
                    className="absolute -top-65 -right-80 z-0 text-primary/15 opacity-0 sm:opacity-100"
                />
                <div className="flex -translate-x-1 items-center gap-6">
                    <Logo />
                    <a
                        href="https://github.com/arpitjana2103/grow-19-CVLens"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-80"
                    >
                        <HugeiconsIcon icon={GithubIcon} />
                    </a>
                </div>
                <p className="z-1000 mt-4 max-w-2xl text-base text-foreground/80">
                    CV Lens is an AI-powered career assistant that analyzes your current resume,
                    personal bio, and a target job description to generate a detailed gap-analysis
                    report with custom interview questions and a day-by-day preparation plan. Using
                    advanced generative AI and Puppeteer, it then instantly rebuilds and exports a
                    highly tailored, ATS-optimized PDF resume designed specifically to land that
                    target role.
                </p>

                <div className="mt-4 flex flex-col gap-2 opacity-95 grayscale-5">
                    <div className="flex items-center gap-3">
                        <a href="https://ai.google.dev/gemini-api/docs" target="_blank">
                            <img
                                src={GeminiImg}
                                alt="Gemini"
                                className="h-8 transition-all hover:grayscale-100"
                            />
                        </a>
                        <a href="https://expressjs.com/" target="_blank">
                            <img
                                src={expressImg}
                                alt="Express"
                                className="h-8 transition-all hover:opacity-50"
                            />
                        </a>
                        <a href="https://www.prisma.io/" target="_blank">
                            <img
                                src={prismaImg}
                                alt="Prisma"
                                className="h-[1.8rem] transition-all hover:grayscale-100"
                            />
                        </a>
                        <a href="https://www.postgresql.org/" target="_blank">
                            <img
                                src={postgresImg}
                                alt="PostgreSQL"
                                className="h-8 transition-all hover:grayscale-100"
                            />
                        </a>
                        {/*<a href="https://pptr.dev/" target="_blank">
                            <img
                                src={puppeteerImg}
                                alt="Puppeteer"
                                className="h-8 pl-0.5 transition-all hover:grayscale-100"
                            />
                        </a>*/}
                        <a href="https://react.dev/" target="_blank">
                            <img
                                src={reactImg}
                                alt="React"
                                className="h-8 transition-all hover:grayscale-100"
                            />
                        </a>
                        <a href="https://tailwindcss.com/" target="_blank">
                            <img
                                src={tailwindImg}
                                alt="Tailwind CSS"
                                className="h-6 transition-all hover:grayscale-100"
                            />
                        </a>
                        <a href="https://tanstack.com/query/latest" target="_blank">
                            <img
                                src={reactQuery}
                                alt="React Query"
                                className="h-8 transition-all hover:grayscale-100"
                            />
                        </a>
                        <a href="https://www.typescriptlang.org/" target="_blank">
                            <img
                                src={typescriptImg}
                                alt="TypeScript"
                                className="h-[1.7rem] pl-0.5 transition-all hover:grayscale-100"
                            />
                        </a>
                        <a href="https://ui.shadcn.com/" target="_blank">
                            <img
                                src={schadcnImg}
                                alt="ShadCN"
                                className="h-[1.6rem] pl-0.5 transition-all hover:opacity-50"
                            />
                        </a>
                    </div>
                </div>

                <div className="z-1000 mt-12 flex justify-end">
                    <p className="z-1000 flex items-center gap-1 text-foreground/80">
                        <span>Made with</span>
                        <span>
                            <HugeiconsIcon
                                icon={FavouriteIcon}
                                size={16}
                                fill="currentColor"
                                className="text-rose-400"
                            />
                        </span>
                        <span>by</span>
                        <a
                            href="https://www.linkedin.com/in/arpitjana2103/"
                            className="ml-1 flex items-center gap-1 border-b border-foreground/60 font-semibold text-foreground/70 transition-all hover:opacity-80"
                        >
                            <span>Arpit Jana</span>
                            <HugeiconsIcon size={16} strokeWidth={2} icon={ArrowUpRight01Icon} />
                        </a>
                    </p>
                </div>
            </Container>
        </footer>
    );
}

function HowItWorksSection() {
    return (
        <section className="mx-auto mt-30 max-w-6xl px-4">
            <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-8">
                {/* Left Side: Text and Steps */}
                <div>
                    <h2 className="font-head text-4xl leading-10 font-semibold text-foreground sm:text-4xl">
                        From Upload to Prepared <br />
                        in <span className="text-primaryDark">30 Seconds</span>
                    </h2>

                    <div className="mt-12 flex flex-col gap-8">
                        {/* Step 1 */}
                        <div className="flex gap-5">
                            <div className="foreground flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/90 text-base font-semibold text-white shadow-md">
                                1
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground/90">
                                    Upload Your Profile
                                </h3>
                                <p className="mt-2 text-foreground/70">
                                    Drop your PDF resume and write a brief self-description of your
                                    key career highlights.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-5">
                            <div className="foreground flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/90 text-base font-semibold text-white shadow-md">
                                2
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground/90">
                                    Paste Job Details
                                </h3>
                                <p className="mt-2 text-foreground/70">
                                    Paste the full job description of the role you're targeting.
                                    We'll extract the hidden requirements.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-5">
                            <div className="foreground flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/90 text-base font-semibold text-white shadow-md">
                                3
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground/90">
                                    Generate Your Lens
                                </h3>
                                <p className="mt-2 text-foreground/70">
                                    Gemini AI synthesizes the data to build a custom interview
                                    report and multi-day preparation strategy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Visual Representation */}
                <div className="relative mx-auto mt-10 w-full max-w-md lg:mt-0 lg:max-w-full lg:pl-10">
                    {/* Main tilted card */}
                    <div className="relative rotate-3 transform rounded-2xl bg-foreground p-6 shadow-xl shadow-slate-200/50 transition-transform duration-300 hover:rotate-0">
                        <div className="flex h-72 flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary bg-transparent">
                            {/* Cloud Icon */}
                            <span>
                                <HugeiconsIcon
                                    icon={CloudUploadIcon}
                                    strokeWidth={1}
                                    className="h-12 w-12 text-primary"
                                />
                            </span>
                            <span className="text-xl font-semibold text-background">
                                Drop your resume here
                            </span>
                            <span className="mt-2 text-sm text-background/50">
                                Supports PDF up to 3MB
                            </span>
                        </div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -bottom-8 -left-8 z-10 flex -rotate-6 transform items-center gap-3 rounded-full bg-primary px-6 py-4 shadow-lg shadow-[#60e0a3]/40 transition-transform hover:-translate-y-1">
                        <div className="flex size-7 items-center justify-center rounded-full bg-foreground text-white">
                            <svg
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <span className="font-bold text-foreground">Report Ready !</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureTestimonialSection() {
    return (
        <section className="mt-30 w-full border-4 border-primary bg-foreground py-12 text-background">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column: AI Description */}
                    <div>
                        {/* Gemini Badge */}
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-background/10">
                                <img src={GeminiImg} alt="Gemini" className="size-8" />
                            </div>
                            <span className="text-sm font-bold tracking-widest text-background">
                                GEMINI INTELLIGENCE
                            </span>
                        </div>

                        <h2 className="font-head text-3xl leading-tight font-semibold text-background sm:text-4xl lg:text-5xl">
                            Advanced Large Language Models at your service.
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-background/70">
                            CVLens leverages the latest Gemini 3.1 architecture to provide highly
                            contextual, nuanced analysis that understands the subtleties of tech
                            roles better than any generic AI.
                        </p>
                    </div>

                    {/* Right Column: Testimonial Card */}
                    <div className="rounded-3xl border border-background/10 bg-background/5 p-8 shadow-2xl sm:p-10">
                        {/* Quote Icon */}
                        <div className="mb-6">
                            <HugeiconsIcon
                                icon={QuoteUpIcon}
                                strokeWidth={2}
                                className="size-12 text-primary/70"
                            />
                        </div>

                        <p className="text-lg leading-relaxed font-medium text-background/90 italic">
                            "I used CVLens for my interview at Meta. The AI predicted 3 of the exact
                            technical questions they asked, and the study plan kept me focused
                            during a stressful week."
                        </p>

                        {/* Author Profile */}
                        <div className="mt-10 flex items-center gap-4">
                            <img
                                src="https://randomuser.me/api/portraits/men/15.jpg"
                                className="h-12 w-12 rounded-full"
                                alt=""
                            />

                            <div>
                                <h4 className="font-semibold text-background">Jhon Doe</h4>
                                <p className="text-sm text-background/60">
                                    Senior Software Engineer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="my-20 w-full">
            <div className="flex flex-col items-center border border-foreground/10 bg-primary/40 px-6 py-6 text-center sm:py-10">
                <h2 className="font-head text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
                    Ready to land the offer ?
                </h2>

                <p className="mt-2 text-lg text-foreground/70 sm:text-xl">
                    Join 10,000+ candidates using CVLens to optimize their interview performance.
                </p>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                    <MyButton
                        varient="filled"
                        onClick={() => navigate("/app")}
                        className="bg-foreground px-8 py-6 text-lg text-background hover:bg-primary hover:text-foreground"
                    >
                        <span>Get My Free Report</span>
                    </MyButton>
                </div>
            </div>
        </section>
    );
}
