import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
}: SearchBarProps) {
    return (
        <div className="relative w-full h-full">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-16 h-20 md:h-full bg-card border shadow-sm text-base "
                placeholder={placeholder}
            />
        </div>
    );
}
