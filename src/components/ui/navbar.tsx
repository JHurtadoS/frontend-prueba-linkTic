"use client";

import { User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/context/store/authStore";
import { useRouter } from "next/navigation";

export function Navbar({ children, className }: { children?: React.ReactNode, className?: string }) {
    const { role, username, clearAuth } = useAuthStore((state) => ({
        role: state.role,
        username: state.username,
        clearAuth: state.clearAuth,
    }));

    console.log(username)

    const router = useRouter();

    const handleLogout = () => {
        clearAuth();
        router.push("/login");
    };

    return (
        <header className={`flex h-16 w-full shrink-0 items-center px-4 md:px-6 bg-white border-b ${className}`}>
            {/* Main content area */}
            <div className="flex-1">
                {children}
            </div>

            {/* Right side actions */}
            <div className="ml-auto flex items-center gap-4">
                {/* <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button> */}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User className="h-5 w-5" />
                            <span className="sr-only">User menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Cuenta: {username || "Usuario"} ({role || "Sin rol"})</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>Cerrar Sesión</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
