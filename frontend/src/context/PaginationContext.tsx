import { createContext, useContext, useState } from "react";

interface PaginationContextType {
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);

    return (
        <PaginationContext.Provider value={{ currentPage, pageSize, setCurrentPage, setPageSize }}>
            {children}
        </PaginationContext.Provider>
    );
};

export function usePaginationContext() {
    const ctx = useContext(PaginationContext);
    if (!ctx) throw new Error("usePaginationContext must be used within a PaginationProvider");
    return ctx;
}
