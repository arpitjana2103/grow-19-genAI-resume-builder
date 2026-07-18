import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <span className={cn("flex items-center", className)}>
            {/*<img src={logoImg} alt="Logo" className="w-12" />*/}
            <h1 className="font-head text-2xl">
                <span>CV</span>
                <span className="text-primaryDark">Lens</span>
            </h1>
        </span>
    );
}
