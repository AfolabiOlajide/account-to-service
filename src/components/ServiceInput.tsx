import * as React from "react";
import { Input } from "./ui/input";
import { CornerDownLeft } from "lucide-react";

interface ServiceInputProps {
    onAdd: (service: string) => void;
}

export function ServiceInput({ onAdd }: ServiceInputProps) {
    const [value, setValue] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onAdd(value.trim().toLowerCase());
        setValue("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex w-full items-center"
        >
            <Input
                placeholder="Add service + enter"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="pr-10 bg-muted/50 border-input/50 focus-visible:bg-muted transition-colors rounded-full"
            />
            <button
                type="submit"
                disabled={!value.trim()}
                className="absolute right-3 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
            >
                <CornerDownLeft className="h-4 w-4" />
                <span className="sr-only">Add</span>
            </button>
        </form>
    );
}
