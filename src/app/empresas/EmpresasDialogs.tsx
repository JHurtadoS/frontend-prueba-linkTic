
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useDialogContext } from "@/context/dialogsEmpresasProvider";
import CreateEmpresaForm from "@/components/Forms/Empresas/CreateEmpresaForm";
import DeleteEmpresaForm from "@/components/Forms/Empresas/DeleteEmpresaForm";
import UpdateEmpresaForm from "@/components/Forms/Empresas/UpdateEmpresaForm";


const EmpresasDialogs: React.FC = () => {
    const {
        isCreateOpen,
        isUpdateOpen,
        isDeleteOpen,
        closeDialog,
    } = useDialogContext();

    return (
        <>
            {isCreateOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Crear Empresa</h2>
                        <CreateEmpresaForm />
                        <Button variant="secondary" onClick={closeDialog} className="mt-4">
                            Cerrar
                        </Button>
                    </div>
                </div>
            )}

            {isUpdateOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Actualizar Empresa</h2>
                        <UpdateEmpresaForm />
                        <Button variant="secondary" onClick={closeDialog} className="mt-4">
                            Cerrar
                        </Button>
                    </div>
                </div>
            )}

            {isDeleteOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Eliminar Empresa</h2>
                        <DeleteEmpresaForm />
                        <Button variant="secondary" onClick={closeDialog} className="mt-4">
                            Cerrar
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmpresasDialogs;
