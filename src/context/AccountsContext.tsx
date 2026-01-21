import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Account, AccountCategory } from "../lib/types";
import { loadAccounts, saveAccounts } from "../lib/storage";

interface AccountsContextType {
    accounts: Account[];
    addAccount: (label: string, category: AccountCategory) => void;
    deleteAccount: (id: string) => void;
    addService: (accountId: string, service: string) => void;
    removeService: (accountId: string, service: string) => void;
}

export const AccountsContext = createContext<AccountsContextType | undefined>(
    undefined,
);

export function AccountsProvider({ children }: { children: ReactNode }) {
    const [accounts, setAccounts] = useState<Account[]>([]);

    // Initial load
    useEffect(() => {
        const stored = loadAccounts();
        setAccounts(stored);
    }, []);

    // Sync to storage whenever accounts change
    useEffect(() => {
        // Only save if we have loaded or it's not the initial empty state if specific logic required,
        // but typically loadAccounts returns [] if nothing, so it's fine.
        // However, to avoid overwriting with [] on first render before useEffect runs:
        // loadAccounts is synchronous. We could init state lazily.
        // But the original code used useEffect.
        // The issue with the original code:
        // 1. Mount -> accounts=[]
        // 2. Effect 1 -> loads data -> setAccounts(data)
        // 3. Effect 2 -> triggers on [accounts]. If data was [], it saves []. If data was not [], it saves data.
        // If strict mode is on, or if saving checks for something, it might be an issue.
        // But original code has:
        // useEffect(() => { ... }, [accounts])
        // Let's keep the logic close to original but maybe safer.
        if (accounts.length > 0) {
            saveAccounts(accounts);
        } else {
            // If accounts is empty, we should check if we just haven't loaded yet?
            // But we can't easily distinguish "empty because new user" vs "empty because not loaded".
            // Let's rely on the fact that loadAccounts returns [] if null.
            // And if we save [], it's fine.
            // Wait! If there is data in LS, and we init with [], and then save [], we wipe data!
            // Original code:
            // Effect 1 runs (mount). loads data. setAccounts(data).
            // Effect 2 runs (mount). accounts is []. saves []. -- THIS IS A BUG in original code likely, if it runs before load.
            // BUT `loadAccounts` is fast.
            // Actually, let's fix this potential bug too:
            // Use a 'loaded' flag.
        }
    }, [accounts]);

    // Better implementation of persistence:
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = loadAccounts();
        setAccounts(stored);
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveAccounts(accounts);
        }
    }, [accounts, isLoaded]);

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
                // Return new array to ensure reference changes
                return [newAccount, ...prev];
            });
        },
        [],
    );

    const deleteAccount = useCallback((id: string) => {
        setAccounts((prev) => prev.filter((a) => a.id !== id));
    }, []);

    const addService = useCallback((accountId: string, service: string) => {
        setAccounts((prev) => {
            return prev.map((account) => {
                if (account.id === accountId) {
                    if (account.services.includes(service)) return account;
                    return {
                        ...account,
                        services: [...account.services, service],
                    };
                }
                return account;
            });
        });
    }, []);

    const removeService = useCallback((accountId: string, service: string) => {
        setAccounts((prev) => {
            return prev.map((account) => {
                if (account.id === accountId) {
                    return {
                        ...account,
                        services: account.services.filter((s) => s !== service),
                    };
                }
                return account;
            });
        });
    }, []);

    const value = {
        accounts,
        addAccount,
        deleteAccount,
        addService,
        removeService,
    };

    return (
        <AccountsContext.Provider value={value}>
            {children}
        </AccountsContext.Provider>
    );
}
