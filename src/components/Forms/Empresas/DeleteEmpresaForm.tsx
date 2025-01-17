

import React from "react";

import { Button } from "@/components/ui/button";
import { deshabilitarEmpresa } from "@/services/empresas";
import { useEmpresasStore } from "@/store/empresasStore";
import { useDialogContext } from "@/context/dialogsEmpresasProvider";

const DeleteEmpresaForm: React.FC = () => {
    const { fetchEmpresasPaginated } = useEmpresasStore();
    const { selectedEmpresa, closeDialog } = useDialogContext();

    const handleDelete = async () => {
        if (!selectedEmpresa) return;

        try {

            await deshabilitarEmpresa(selectedEmpresa.id);
            await fetchEmpresasPaginated(0, 10, "nombre", "asc");
            closeDialog();
        } catch (error) {
            console.error("Error deshabilitando empresa:", error);
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600">
                ¿Estás seguro de que deseas deshabilitar la empresa &quot;{selectedEmpresa?.nombre}&quot;?
                Esta acción puede revertirse habilitándola nuevamente.
            </p>

            <div className="flex justify-end">
                <Button type="button" variant="secondary" onClick={closeDialog} className="mr-2">
                    Cancelar
                </Button>
                <Button type="button" variant="destructive" onClick={handleDelete}>
                    Deshabilitar Empresa
                </Button>
            </div>
        </div>
    );
};

export default DeleteEmpresaForm;
