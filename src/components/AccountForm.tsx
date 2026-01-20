import * as React from "react";
import { useAccounts } from "../hooks/useAccounts";
import type { AccountCategory } from "../lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

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
            className="flex flex-col gap-6 text-card-foreground font-mono"
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
                <Select
                    value={category}
                    onValueChange={(value) =>
                        setCategory(value as AccountCategory)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="border border-input font-mono">
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="social">Social Login</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button
                type="submit"
                disabled={!label.trim()}
                className="cursor-pointer"
            >
                Add Account
            </Button>
        </form>
    );
}
