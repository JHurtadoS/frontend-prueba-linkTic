

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { actualizarEmpresa } from "@/services/empresas";
import { useEmpresasStore } from "@/store/empresasStore";
import { useDialogContext } from "@/context/dialogsEmpresasProvider";
import { useCustomToast } from "@/context/toastContext";


const updateEmpresaSchema = z.object({
    nombre: z.string().optional(),
    nit: z.string().optional(),
    direccion: z.string().optional(),
    telefono: z
        .string()
        .optional()
        .refine((value) => !value || /^[0-9]+$/.test(value), {
            message: "El teléfono debe contener solo números",
        }),
});


type UpdateEmpresaFormData = z.infer<typeof updateEmpresaSchema>;

const UpdateEmpresaForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
    } = useForm<UpdateEmpresaFormData>({
        resolver: zodResolver(updateEmpresaSchema),
    });

    const { fetchEmpresasPaginated } = useEmpresasStore();
    const { selectedEmpresa, closeDialog } = useDialogContext();
    const { showToast } = useCustomToast();

    const onSubmit = async (data: UpdateEmpresaFormData) => {
        try {

            const updatedData = Object.keys(data)
                .filter((key) => touchedFields[key as keyof UpdateEmpresaFormData])
                .reduce((obj, key) => {
                    obj[key as keyof UpdateEmpresaFormData] = data[key as keyof UpdateEmpresaFormData];
                    return obj;
                }, {} as UpdateEmpresaFormData);

            if (selectedEmpresa && Object.keys(updatedData).length > 0) {
                await actualizarEmpresa(selectedEmpresa.id, updatedData);
                await fetchEmpresasPaginated(0, 10, "nombre", "asc");
                showToast({
                    title: "Empresa actualizada",
                    description: `La empresa ${selectedEmpresa.nombre} se actualizó correctamente.`,
                    variant: "default",
                });
                closeDialog();
                reset();
            }
        } catch (error) {
            console.error("Error actualizando empresa:", error);
            showToast({
                title: "Error",
                description: "No se pudo actualizar la empresa. Intenta nuevamente.",
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium">
                    Nombre
                </label>
                <Input id="nombre" defaultValue={selectedEmpresa?.nombre} {...register("nombre")} />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            </div>

            <div>
                <label htmlFor="nit" className="block text-sm font-medium">
                    NIT
                </label>
                <Input id="nit" defaultValue={selectedEmpresa?.nit} {...register("nit")} />
                {errors.nit && <p className="text-red-500 text-sm">{errors.nit.message}</p>}
            </div>

            <div>
                <label htmlFor="direccion" className="block text-sm font-medium">
                    Dirección
                </label>
                <Input id="direccion" defaultValue={selectedEmpresa?.direccion} {...register("direccion")} />
                {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion.message}</p>}
            </div>

            <div>
                <label htmlFor="telefono" className="block text-sm font-medium">
                    Teléfono
                </label>
                <Input id="telefono" defaultValue={selectedEmpresa?.telefono} {...register("telefono")} />
                {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
            </div>

            <div className="flex justify-end">
                <Button type="button" variant="secondary" onClick={closeDialog} className="mr-2">
                    Cancelar
                </Button>
                <Button type="submit">Actualizar Empresa</Button>
            </div>
        </form>
    );
};

export default UpdateEmpresaForm;
