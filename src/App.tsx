import { Shield, Briefcase, Plus, Link } from "lucide-react";
import { AccountForm } from "./components/AccountForm";
import { AccountCard } from "./components/AccountCard";
import { EmptyState } from "./components/EmptyState";
import { StatsCard } from "./components/StatsCard";
import { SearchBar } from "./components/SearchBar";
import { CreateIdentityCard } from "./components/CreateIdentityCard";
import { useAccounts } from "./hooks/useAccounts";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import { Moon, Sun } from "lucide-react";

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
        <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur">
                <div className="container max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 border border-primary/50 rounded-full">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl leading-none">
                                Account to Service Tracker
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
                                <Button className="gap-2 rounded-full font-semibold hidden md:flex text-background">
                                    <Plus className="h-4 w-4" /> Add Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3">
                        <StatsCard
                            title="Identities"
                            value={accounts.length}
                            icon={Briefcase}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <StatsCard
                            title="Services"
                            value={totalServices}
                            icon={Link}
                        />
                    </div>
                    <div className="md:col-span-6 flex items-center">
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
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <EmptyState />
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="mt-6"
                            >
                                Create your first Identity
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
                                        <CreateIdentityCard
                                            onClick={() => {}}
                                        />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
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
