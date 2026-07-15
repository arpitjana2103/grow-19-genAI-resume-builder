import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

type MyButtonProps = React.ComponentProps<typeof Button> & {
    varient: "holo" | "filled";
};

export default function MyButton({ children, className, varient, ...props }: MyButtonProps) {
    const btnVarients = {
        holo: "bg-transparent text-foreground",
        filled: "bg-foreground text-white hover:bg-foreground hover:bg-foreground/95 hover:border-border/95",
    };
    return (
        <Button
            className={cn(
                "cursor-pointer rounded-sm border-2 border-border",
                btnVarients[varient],
                className,
            )}
            {...props}
        >
            {children}
        </Button>
    );
}
