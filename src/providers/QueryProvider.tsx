"use client";
import { queryClient } from '@/context/queryClient';
import { QueryClientProvider } from '@tanstack/react-query'


import React from 'react'

type Props = {
    children: React.ReactNode
}

function QueryProviderCL({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProviderCL