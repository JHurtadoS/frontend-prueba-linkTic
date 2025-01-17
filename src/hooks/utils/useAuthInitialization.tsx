import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function useAuthInitialization() {
    const setRole = useAuthStore((state) => state.setRole);
    const setUsername = useAuthStore((state) => state.setUsername);

    useEffect(() => {

        const localRole = localStorage.getItem("role");
        if (localRole) {
            const storedRole: "admin" | "externo" = localRole as "admin" | "externo";
            setRole(storedRole);
        }

        const localUsername = localStorage.getItem("username");
        if (localUsername) {
            setUsername(localUsername);
        }
    }, [setRole, setUsername]);
}
