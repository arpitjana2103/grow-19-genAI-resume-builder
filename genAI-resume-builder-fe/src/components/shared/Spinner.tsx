import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export default function Spinner({
    className,
    strokeWidth,
}: {
    className?: string;
    strokeWidth?: number;
}) {
    return (
        <div>
            <LoaderCircle
                className={cn("animate-spin", className)}
                size={18}
                strokeWidth={strokeWidth ?? 2}
            />
        </div>
    );
}
