import { useEffect, useState } from "react"

export const useOffline = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        window.addEventListener("offline", () => setIsOffline(true));
        window.addEventListener("online", () => setIsOffline(false));

        return () => {
            window.removeEventListener("offline", () => setIsOffline(true));
            window.removeEventListener("online", () => setIsOffline(false));
        };
    }, []);

    return isOffline;
}