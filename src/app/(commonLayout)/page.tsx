import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
    // we can't get session bcz for getting session we have to send cookie to server
    // though it's a server component it's have no access in borwer cookies
    // that's why we need to send it manually ,

    //* const session = await authClient.getSession();
    // const session = authClient.useSession(); //* is's a reactive way to get session but in client component
    // console.log(session);

    return (
        <div className="min-h-screen bg-background">
            {/* --- Hero Section --- */}
            <section className="container mx-auto px-4 py-24 text-center">
                <Badge
                    variant="secondary"
                    className="mb-4 py-1 px-4 text-sm rounded-full"
                >
                    ✨ Over 10,000+ Expert Tutors
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Learn anything, <br />
                    <span className="text-primary">anytime, anywhere.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Connect with verified tutors for 1-on-1 lessons tailored to
                    your unique learning style. Boost your grades and your
                    confidence today.
                </p>

                {/* Search Bar UI */}
                <div className="flex w-full max-w-md mx-auto items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm">
                    <Search className="ml-2 text-muted-foreground w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search subjects (e.g. Calculus, Python...)"
                        className="border-none shadow-none focus-visible:ring-0"
                    />
                    <Button type="submit">Search</Button>
                </div>
            </section>
        </div>
    );
}
