

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { useDialogContext } from "@/context/dialogsEmpresasProvider";
import { useEmpresasStore } from "@/store/empresasStore";
import { useCustomToast } from "@/context/toastContext";



const createEmpresaSchema = z.object({
    nombre: z.string().nonempty("El nombre es requerido"),
    nit: z.string().nonempty("El NIT es requerido"),
    direccion: z.string().optional(),
    telefono: z
        .string()
        .optional()
        .refine((value) => !value || /^[0-9]+$/.test(value), {
            message: "El teléfono debe contener solo números",
        }),
});


type CreateEmpresaFormData = z.infer<typeof createEmpresaSchema>;

const CreateEmpresaForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateEmpresaFormData>({
        resolver: zodResolver(createEmpresaSchema),
    });

    const { fetchEmpresasPaginated } = useEmpresasStore();
    const { closeDialog } = useDialogContext();
    const { showToast } = useCustomToast();

    const onSubmit = async (data: CreateEmpresaFormData) => {
        try {
            await api.post("/empresas", data);
            await fetchEmpresasPaginated(0, 10, "nombre", "asc");
            showToast({
                title: "Empresa creada",
                description: `La empresa ${data.nombre} se creó correctamente.`,
                variant: "default",
            });
            closeDialog();
            reset();
        } catch (error) {
            console.error("Error creando empresa:", error);
            showToast({
                title: "Error",
                description: "No se pudo crear la empresa. Intenta nuevamente.",
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
                <Input id="nombre" {...register("nombre")} />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            </div>

            <div>
                <label htmlFor="nit" className="block text-sm font-medium">
                    NIT
                </label>
                <Input id="nit" {...register("nit")} />
                {errors.nit && <p className="text-red-500 text-sm">{errors.nit.message}</p>}
            </div>

            <div>
                <label htmlFor="direccion" className="block text-sm font-medium">
                    Dirección
                </label>
                <Input id="direccion" {...register("direccion")} />
                {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion.message}</p>}
            </div>

            <div>
                <label htmlFor="telefono" className="block text-sm font-medium">
                    Teléfono
                </label>
                <Input id="telefono" {...register("telefono")} />
                {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
            </div>

            <div className="flex justify-end">
                <Button type="button" variant="secondary" onClick={closeDialog} className="mr-2">
                    Cancelar
                </Button>
                <Button type="submit">Crear Empresa</Button>
            </div>
        </form>
    );
};

export default CreateEmpresaForm;
