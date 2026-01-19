import { useState, useEffect, useCallback } from "react";
import type { Account, AccountCategory } from "../lib/types";
import { loadAccounts, saveAccounts } from "../lib/storage";

export function useAccounts() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    // Initial load
    useEffect(() => {
        const stored = loadAccounts();
        setAccounts(stored);
    }, []);

    // Sync to storage whenever accounts change
    useEffect(() => {
        // We only save if we have loaded at least once (or empty)
        // However, since we load in useEffect, there is a small race if we save immediately.
        // But load is synchronous in our util (localStorage is sync).
        // Be careful not to overwrite with empty array before load.
        // Actually, loadAccounts is sync. So we can init state with it if we wanted,
        // but explicit effect is safer for hydration if we moved to async later.
        // For sync localStorage, we can lazy init.
    }, [accounts]);

    const addAccount = useCallback(
        (label: string, category: AccountCategory) => {
            const newAccount: Account = {
                id: crypto.randomUUID(),
                label,
                category,
                services: [],
                createdAt: Date.now(),
            };
            setAccounts((prev) => {
                const next = [newAccount, ...prev];
                saveAccounts(next);
                return next;
            });
        },
        [],
    );

    const deleteAccount = useCallback((id: string) => {
        setAccounts((prev) => {
            const next = prev.filter((a) => a.id !== id);
            saveAccounts(next);
            return next;
        });
    }, []);

    const addService = useCallback((accountId: string, service: string) => {
        setAccounts((prev) => {
            const next = prev.map((account) => {
                if (account.id === accountId) {
                    // Prevent duplicates
                    if (account.services.includes(service)) return account;
                    return {
                        ...account,
                        services: [...account.services, service],
                    };
                }
                return account;
            });
            saveAccounts(next);
            return next;
        });
    }, []);

    const removeService = useCallback((accountId: string, service: string) => {
        setAccounts((prev) => {
            const next = prev.map((account) => {
                if (account.id === accountId) {
                    return {
                        ...account,
                        services: account.services.filter((s) => s !== service),
                    };
                }
                return account;
            });
            saveAccounts(next);
            return next;
        });
    }, []);

    return {
        accounts,
        addAccount,
        deleteAccount,
        addService,
        removeService,
    };
}
