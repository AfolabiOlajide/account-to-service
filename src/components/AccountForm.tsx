import * as React from "react";
import { useAccounts } from "../hooks/useAccounts";
import type { AccountCategory } from "../lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";

interface AccountFormProps {
    onSuccess?: () => void;
}

export function AccountForm({ onSuccess }: AccountFormProps) {
    const { addAccount } = useAccounts();
    const [label, setLabel] = React.useState("");
    const [category, setCategory] = React.useState<AccountCategory>("email");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!label.trim()) return;
        addAccount(label.trim(), category);
        setLabel("");
        onSuccess?.();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm"
        >
            <h2 className="text-lg font-semibold">Add New Account</h2>
            <div className="grid gap-2">
                <Label htmlFor="account-label">Account Label</Label>
                <Input
                    id="account-label"
                    placeholder="e.g. personal@gmail.com, GitHub"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="account-category">Category</Label>
                <select
                    id="account-category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value as AccountCategory)
                    }
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                >
                    <option value="email">Email</option>
                    <option value="social">Social Login</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <Button type="submit" disabled={!label.trim()}>
                Add Account
            </Button>
        </form>
    );
}
