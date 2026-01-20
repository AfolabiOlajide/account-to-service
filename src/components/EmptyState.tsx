import { ShieldCheck } from "lucide-react";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-input border-dashed bg-muted/50 text-muted-foreground w-full">
            <ShieldCheck className="h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-semibold">No Accounts Tracked</h3>
            <p className="text-sm">
                Add an account above to start tracking your signups.
            </p>
        </div>
    );
}
