"use client";

import * as React from "react";
import { ToastProvider as RadixToastProvider, ToastProps as RadixToastProps, ToastViewport } from "@/components/ui/toast";
import { Toast, ToastTitle, ToastDescription, ToastAction } from "@/components/ui/toast";

interface ToastProps extends RadixToastProps {
    description?: React.ReactNode;
    action?: React.ReactNode;
}

interface ToastContextType {
    showToast: (toast: ToastProps) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const CustomToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = React.useState<ToastProps[]>([]);

    const showToast = (toast: ToastProps) => {
        setToasts((prev) => [...prev, toast]);
        setTimeout(() => {
            setToasts((prev) => prev.slice(1));
        }, 5000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <RadixToastProvider swipeDirection="right">
                {children}
                {toasts.map((toast, index) => (
                    <Toast
                        key={index}
                        className={toast.className}
                        variant={toast.variant}
                        open={true}
                        onOpenChange={(open) => {
                            if (!open) {
                                setToasts((prev) => prev.filter((_, i) => i !== index));
                            }
                        }}
                    >
                        <ToastTitle>{toast.title}</ToastTitle>
                        {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
                        {toast.action && <ToastAction asChild altText={""}>{toast.action}</ToastAction>}
                    </Toast>
                ))}
                <ToastViewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[25px]" />
            </RadixToastProvider>
        </ToastContext.Provider>
    );
};

export const useCustomToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useCustomToast must be used within a CustomToastProvider");
    }
    return context;
};