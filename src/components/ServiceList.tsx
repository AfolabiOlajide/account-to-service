import { Badge } from "./ui/badge";
import { X } from "lucide-react";

interface ServiceListProps {
    services: string[];
    onRemove: (service: string) => void;
}

export function ServiceList({ services, onRemove }: ServiceListProps) {
    if (services.length === 0) {
        return (
            <p className="text-sm text-muted-foreground italic py-2">
                No services mapped yet.
            </p>
        );
    }

    return (
        <div className="flex flex-wrap gap-2 py-2">
            {services.map((service) => (
                <Badge
                    key={service}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1"
                >
                    {service}
                    <button
                        onClick={() => onRemove(service)}
                        className="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/20 focus:outline-none"
                        aria-label={`Remove ${service}`}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
        </div>
    );
}
