import { Briefcase, Plus, Link, Blocks } from "lucide-react";
import { AccountForm } from "./components/AccountForm";
import { AccountCard } from "./components/AccountCard";
import { EmptyState } from "./components/EmptyState";
import { StatsCard } from "./components/StatsCard";
import { SearchBar } from "./components/SearchBar";
import { useAccounts } from "./hooks/useAccounts";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog";
import { Moon, Sun } from "lucide-react";
import { CreateAccountCard } from "./components/CreateAccountCard";

function App() {
    const { accounts } = useAccounts();
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    };

    const totalServices = accounts.reduce(
        (acc, curr) => acc + curr.services.length,
        0,
    );

    const filteredAccounts = accounts.filter(
        (account) =>
            account.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.services.some((s) =>
                s.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
    );

    return (
        <div className="min-h-screen bg-background text-foreground font-mono transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur">
                <div className="container max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 border border-primary/50 ">
                            <Blocks className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl leading-none">
                                ATS Tracker
                            </h1>
                            <p className="text-xs text-muted-foreground mt-1">
                                Track your accounts and services
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="cursor-pointer"
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </Button>
                        <Dialog
                            open={isCreateOpen}
                            onOpenChange={setIsCreateOpen}
                        >
                            <DialogTrigger asChild>
                                <Button className="gap-2 font-semibold hidden md:flex text-background cursor-pointer">
                                    <Plus className="h-4 w-4" /> Add Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="hidden">
                                    <DialogTitle>Add Account</DialogTitle>
                                    <DialogDescription>
                                        Add a new account to track your signups.
                                    </DialogDescription>
                                </DialogHeader>
                                <AccountForm
                                    onSuccess={() => setIsCreateOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl mx-auto p-4 sm:px-6 md:py-8 space-y-10">
                {/* Stats & Search Row */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-6">
                    <div className="md:col-span-2">
                        <StatsCard
                            title="Identities"
                            value={accounts.length}
                            icon={Briefcase}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <StatsCard
                            title="Services"
                            value={totalServices}
                            icon={Link}
                        />
                    </div>
                    <div className="col-span-2 md:col-span-8 flex items-center">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search services (e.g., Netflix) or emails..."
                        />
                    </div>
                </div>

                {/* Content Grid */}
                <section>
                    {accounts.length === 0 && !searchQuery ? (
                        <div className="flex flex-col items-center justify-center text-center">
                            <EmptyState />
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="mt-6 text-background font-bold cursor-pointer"
                            >
                                Create your first Account
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAccounts.map((account) => (
                                <AccountCard
                                    key={account.id}
                                    account={account}
                                />
                            ))}
                            <Dialog
                                open={isCreateOpen}
                                onOpenChange={setIsCreateOpen}
                            >
                                <DialogTrigger asChild>
                                    <div className="h-full">
                                        <CreateAccountCard onClick={() => {}} />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader className="hidden">
                                        <DialogTitle>Add Account</DialogTitle>
                                        <DialogDescription>
                                            Add a new account to track your
                                            signups.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AccountForm
                                        onSuccess={() => setIsCreateOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
