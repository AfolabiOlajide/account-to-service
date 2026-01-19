import type { Account, AccountCategory } from "../lib/types";
import { useAccounts } from "../hooks/useAccounts";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
    Trash2,
    Mail,
    Briefcase,
    UserCircle,
    Shield,
    Globe,
} from "lucide-react";
import { ServiceInput } from "./ServiceInput";
import { ServiceList } from "./ServiceList";

interface AccountCardProps {
    account: Account;
}

const CategoryIcons: Record<AccountCategory | string, React.ElementType> = {
    email: Mail,
    social: UserCircle,
    custom: Globe,
    personal: UserCircle,
    work: Briefcase,
};

export function AccountCard({ account }: AccountCardProps) {
    const { deleteAccount, addService, removeService } = useAccounts();

    // Determine icon based on category or try simple heuristic if category is generic
    // Defaulting to mapping but fallback to specialized logic if needed in future
    let Icon = CategoryIcons[account.category] || Shield;

    // Simple heuristcs for better UI if category is just "email" but label implies work
    if (account.category === "email") {
        if (
            account.label.includes("work") ||
            account.label.includes("corp") ||
            account.label.includes("inc")
        ) {
            Icon = Briefcase;
        }
    }

    return (
        <Card className="flex flex-col h-full bg-card/60 backdrop-blur-sm border-border/60 shadow-sm hover:border-primary/50 hover:shadow-md transition-all rounded-3xl">
            <div className="p-6 pb-2">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                            <h3
                                className="font-semibold text-lg truncate pr-1"
                                title={account.label}
                            >
                                {account.label}
                            </h3>
                            <Badge
                                variant="secondary"
                                className="mt-0.5 font-normal text-md px-4 py-2 h-7 bg-primary/10 text-primary"
                            >
                                {account.category}
                            </Badge>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 trantision-colors"
                        onClick={() => deleteAccount(account.id)}
                        aria-label="Delete account"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <CardContent className="flex-1 flex flex-col pt-2 gap-4">
                <div>
                    <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 ml-1">
                        Linked Services
                    </h4>
                    <ServiceList
                        services={account.services}
                        onRemove={(service) =>
                            removeService(account.id, service)
                        }
                    />
                </div>

                <div className="mt-auto pt-2">
                    <ServiceInput
                        onAdd={(service) => addService(account.id, service)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
