import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
}

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
    return (
        <Card className="bg-card text-card-foreground border border-border shadow-sm ">
            <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center text-muted-foreground">
                        <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">
                        {title}
                    </p>
                </div>
                <h3 className="text-4xl font-bold tracking-tight">{value}</h3>
            </CardContent>
        </Card>
    );
}
