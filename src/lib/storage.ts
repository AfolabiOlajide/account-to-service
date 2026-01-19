import type { Account } from "./types";

const STORAGE_KEY = "account-tracker-data";

export const loadAccounts = (): Account[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as Account[];
    } catch (error) {
        console.error("Failed to load accounts", error);
        return [];
    }
};

export const saveAccounts = (accounts: Account[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    } catch (error) {
        console.error("Failed to save accounts", error);
    }
};
