import { Loader2 } from "lucide-react";

export default function HomePageLoading() {
    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-background animate-in fade-in duration-300"
            role="status"
            aria-label="Loading page content"
        >
            <Loader2 className="w-8 h-8 animate-spin text-violet-600 dark:text-violet-400" />
        </div>
    );
}
