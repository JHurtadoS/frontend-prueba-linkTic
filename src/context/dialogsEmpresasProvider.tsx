"use client";

import { Empresa } from "@/services/empresas";
import React, { createContext, useContext, useState } from "react";


interface DialogContextProps {
    isCreateOpen: boolean;
    isUpdateOpen: boolean;
    isDeleteOpen: boolean;
    selectedEmpresa: Empresa | null;
    openCreateDialog: () => void;
    openUpdateDialog: (empresa: Empresa) => void;
    openDeleteDialog: (empresa: Empresa) => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [isUpdateOpen, setUpdateOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

    const openCreateDialog = () => setCreateOpen(true);

    const openUpdateDialog = (empresa: Empresa) => {
        setSelectedEmpresa(empresa);
        setUpdateOpen(true);
    };

    const openDeleteDialog = (empresa: Empresa) => {
        setSelectedEmpresa(empresa);
        setDeleteOpen(true);
    };

    const closeDialog = () => {
        setCreateOpen(false);
        setUpdateOpen(false);
        setDeleteOpen(false);
        setSelectedEmpresa(null);
    };

    return (
        <DialogContext.Provider
            value={{
                isCreateOpen,
                isUpdateOpen,
                isDeleteOpen,
                selectedEmpresa,
                openCreateDialog,
                openUpdateDialog,
                openDeleteDialog,
                closeDialog,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogProvider");
    }
    return context;
}
