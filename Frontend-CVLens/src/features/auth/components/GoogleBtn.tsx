import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import MyButton from "@/components/shared/MyButton";

export default function GoogleBtn({ href }: { href: string }) {
    return (
        <a href={href} className="mb-8 inline-block w-full">
            <MyButton className="relative h-10 w-full bg-primary" varient="holo">
                <span className="absolute top-1/2 left-2 -translate-y-1/2 transform">
                    <HugeiconsIcon
                        icon={GoogleIcon}
                        color="currentColor"
                        fill="white"
                        strokeWidth={2}
                        className="size-6"
                    />
                </span>
                <span className="font-semibold">Continue with Google</span>
            </MyButton>
        </a>
    );
}
