import { Plus } from "lucide-react";

interface CreateAccountCardProps {
    onClick: () => void;
}

export function CreateAccountCard({ onClick }: CreateAccountCardProps) {
    return (
        <button
            onClick={onClick}
            className="group flex flex-col items-center justify-center w-full h-full min-h-[300px] border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/50 transition-colors cursor-pointer"
        >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted group-hover:bg-muted/80 mb-4 transition-colors">
                <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Create New Account
            </span>
        </button>
    );
}
