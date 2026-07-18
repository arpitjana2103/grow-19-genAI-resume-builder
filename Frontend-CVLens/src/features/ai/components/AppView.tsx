import {
    Briefcase07Icon,
    DocumentAttachmentIcon,
    Job,
    Male02Icon,
    Pdf02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import AppHeading from "@/components/shared/AppHeading";

export default function AppView() {
    return (
        <>
            <AppHeading />
            <div className="mx-auto mt-8 h-160 w-full border-2 border-border bg-primary p-6">
                <div className="flex h-full">
                    <JobDescription />
                    <Profile />
                </div>
                <div className="hidden">
                    <p>AI Powered Strategy Generation • 30s Approx </p>
                    <button>Generate My Interview Strategy</button>
                </div>
            </div>
        </>
    );
}

function JobDescription() {
    return (
        <div className="flex flex-1 flex-col border-r-2 border-border pr-6">
            <div className="mb-4 flex items-center gap-2">
                <p className="flex items-center gap-2">
                    <HugeiconsIcon strokeWidth={2} className="h-6 w-6" icon={Briefcase07Icon} />
                    <span className="font-head text-lg">Target Job Description</span>
                </p>
            </div>
            <textarea className="grow resize-none bg-foreground p-3 text-base text-background focus:outline-none"></textarea>
        </div>
    );
}

function Profile() {
    return (
        <div className="flex flex-1 flex-col pl-6">
            <p className="mb-2 flex items-center gap-2">
                <HugeiconsIcon strokeWidth={2} className="h-6 w-6" icon={Male02Icon} />
                <span className="font-head text-lg">Your Profile</span>
            </p>
            <ResumeUpload />
            <SelfDescription />
        </div>
    );
}

function SelfDescription() {
    return (
        <div className="flex grow flex-col">
            <p className="mt-4 mb-2 font-head text-lg">Self Description</p>
            <textarea className="w-full grow resize-none bg-foreground p-3 text-base text-background focus:outline-none"></textarea>
        </div>
    );
}

function ResumeUpload() {
    const [file, setFile] = useState(null);

    function handleSelect() {}

    return (
        <div>
            <p className="mb-2 font-head text-lg">Upload Resume</p>
            <label
                htmlFor="resume-upload"
                className="block w-full cursor-pointer bg-foreground p-2"
            >
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary p-6 text-background">
                    <span>
                        <HugeiconsIcon
                            icon={DocumentAttachmentIcon}
                            className="h-10 w-10 text-primary"
                        />
                    </span>
                    <p className="mt-4 text-lg">Click to Upload Resume or Drag & Drop </p>
                    <p className="mt-1 text-sm text-background/70">{`File Type : PDF | Max Size : 3MB | Max PageCount : 2`}</p>
                </div>
            </label>
            <input type="file" onSelect={handleSelect} id="resume-upload" className="hidden" />
        </div>
    );
}
