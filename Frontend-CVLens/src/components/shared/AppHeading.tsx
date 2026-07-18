import geminiImg from "@/assets/gemini.png";
export default function AppHeading() {
    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xl sm:text-2xl">
            <span className="font-head">Generate your custom interview plan with</span>
            <span className="flex items-center gap-1.5 rounded-[0.3rem] bg-white p-1 px-1.5 pr-2 text-xl shadow-md">
                <span>
                    <img className="h-6 w-6" src={geminiImg} alt="" />
                </span>
                <span className="font-gemini font-medium text-[#3186ff]">Gemini</span>
            </span>
        </div>
    );
}
