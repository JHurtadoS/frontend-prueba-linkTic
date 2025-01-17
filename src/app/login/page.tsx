"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useCustomToast } from "@/context/toastContext";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setToken = useAuthStore((state) => state.setToken);
    const setRole = useAuthStore((state) => state.setRole);
    const setUsername = useAuthStore((state) => state.setUsername);

    const router = useRouter();
    const { showToast } = useCustomToast();

    const handleLogin = async () => {
        setLoading(true);
        try {
            setError(null);
            const response = await api.post("/auth/login", { email, password });
            const { token } = response.data;


            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            console.log(decodedToken)

            const isAdmin = decodedToken.isAdmin;
            const username = decodedToken.sub;
            setUsername(username);

            setToken(token);
            console.log(isAdmin)
            console.log(decodedToken)
            setRole(isAdmin ? "admin" : "externo");

            showToast({
                title: "Login successful!",
                description: "Redirecting...",
                variant: "default",
            });


            router.push(isAdmin ? "/empresas/admin" : "/empresas");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error during login:", err);
            setError(err.response?.data?.error || "An unexpected error occurred.");
            showToast({
                title: "Login failed!",
                description: "Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-[400px] p-6">
                <CardContent className="space-y-6">
                    <div className="space-y-4 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center mx-auto">
                            <span className="text-xl font-semibold">A</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-0 border-b border-gray-200 rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-gray-900"
                                disabled={loading}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-0 border-b border-gray-200 rounded-none px-0 pr-8 shadow-none focus-visible:ring-0 focus-visible:border-gray-900"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-2.5 text-gray-400 hover:text-gray-600"
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
                        >
                            {loading ? "Loading..." : "LOGIN"}
                        </Button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        {"Don't have an account? "}
                        <Link href="/signup" className="text-gray-900 hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
