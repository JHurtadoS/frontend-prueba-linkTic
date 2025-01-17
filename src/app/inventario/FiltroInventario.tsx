"use client";

import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useCategoriasStore } from "@/store/categoriasStore";
import { useInventarioStore } from "@/store/inventarioStore";
import { useEmpresasStore } from "@/store/empresasStore";


interface ComboboxProps {
    type: "empresa" | "categoria";
    label: string;
    value: string | null;
}

const ComboboxFiltro: React.FC<ComboboxProps> = ({ type, label, value }) => {
    const [open, setOpen] = useState(false);

    const { categorias, fetchCategorias } = useCategoriasStore();
    const { empresas, fetchEmpresas } = useEmpresasStore();

    const { setEmpresaSeleccionada, setCategoriaSeleccionada } = useInventarioStore();

    useEffect(() => {
        if (type === "empresa") {
            fetchEmpresas();
        } else if (type === "categoria") {
            fetchCategorias();
        }
    }, [type, fetchCategorias, fetchEmpresas]);

    const handleSelect = (selectedValue: string) => {

        if (type === "empresa") {
            setEmpresaSeleccionada(selectedValue);
            setCategoriaSeleccionada(null);
        } else {
            setCategoriaSeleccionada(selectedValue);
            setEmpresaSeleccionada(null);
        }

        setOpen(false);
    };

    console.log(categorias)

    const items = type === "empresa" ? empresas.map((empresa) => ({
        value: empresa.id,
        label: empresa.nombre,
    }))
        : categorias.map((categoria) => ({
            value: categoria.id,
            label: categoria.nombre,
        }));

    return (
        <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? items.find((item) => item.value === value)?.label
                            : `Seleccione ${label.toLowerCase()}...`}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
                        <CommandList>
                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                            <CommandGroup>
                                {items.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        onSelect={() => handleSelect(item.value)}
                                    >
                                        {item.label}
                                        <Check
                                            className={`ml-auto ${value === item.value ? "opacity-100" : "opacity-0"
                                                }`}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ComboboxFiltro;
