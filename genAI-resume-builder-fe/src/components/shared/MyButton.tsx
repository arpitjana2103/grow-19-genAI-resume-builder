import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

type MyButtonProps = {
    children: React.ReactNode;
    className?: string;
    type: "holo" | "filled";
    onClick?: () => void;
};

export default function MyButton({ children, className, type, onClick }: MyButtonProps) {
    const btnTypes = {
        holo: "bg-transparent text-foreground",
        filled: "bg-foreground text-background hover:bg-foreground/90 hover:border-foreground/90",
    };
    return (
        <Button
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-sm border-2 border-foreground",
                className,
                btnTypes[type],
            )}
        >
            {children}
        </Button>
    );
}
