export type AccountCategory = "email" | "social" | "custom";

export type Account = {
    id: string;
    label: string;
    category: AccountCategory;
    services: string[];
    createdAt: number;
};
