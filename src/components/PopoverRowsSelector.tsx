"use client";

import React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useInventarioStore } from "@/store/inventarioStore";


const rowsOptions = [10, 25, 50, 100];

const PopoverRowsSelector: React.FC = () => {
    const rowsPerPage = useInventarioStore((state) => state.rowsPerPage);
    const setRowsPerPage = useInventarioStore((state) => state.setRowsPerPage);

    const [open, setOpen] = React.useState(false);

    const handleSelect = (rows: number) => {
        setRowsPerPage(rows);
        setOpen(false);
    };

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[150px] justify-between"
                    >
                        {`Filas: ${rowsPerPage}`}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                    <Command>
                        <CommandList>
                            <CommandEmpty>No options available</CommandEmpty>
                            <CommandGroup>
                                {rowsOptions.map((rows) => (
                                    <CommandItem
                                        key={rows}
                                        onSelect={() => handleSelect(rows)}
                                    >
                                        {`${rows} filas`}
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

export default PopoverRowsSelector;
