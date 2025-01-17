"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {

  LayoutGrid as LayoutGridIcon,
  Users as UsersIcon,
  Activity as ActivityIcon,
  Menu as MenuIcon,
  Globe as GlobeIcon,
  Mountain as MountainIcon,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-gray-100 dark:lg:bg-gray-800">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 font-bold" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg">Empresa App</span>
            </Link>
            <nav className="space-y-1">
              {/* <Link
                href="/"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Inicio
              </Link> */}
              <Link
                href="/empresas"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <LayoutGridIcon className="h-5 w-5" />
                Empresas
              </Link>
              <Link
                href="/inventario"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <UsersIcon className="h-5 w-5" />
                inventario
              </Link>
              <Link
                href="/ordenes"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <ActivityIcon className="h-5 w-5" />
                Ordenes
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <Button variant="outline" size="sm" className="w-full">
              Idioma
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <GlobeIcon className="h-5 w-5" />
              <span>Español</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex-1 flex md:hidden">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg">Empresa App</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex h-full flex-col justify-between py-6 px-4">
                  <div className="space-y-6">
                    <nav className="space-y-1">
                      {/* <Link
                        href="/"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                        prefetch={false}
                      >
                        <HomeIcon className="h-5 w-5" />
                        Inicio
                      </Link> */}
                      <Link
                        href="/empresas"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                        prefetch={false}
                      >
                        <LayoutGridIcon className="h-5 w-5" />
                        Empresas
                      </Link>
                      <Link
                        href="/clientes"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                        prefetch={false}
                      >
                        <UsersIcon className="h-5 w-5" />
                        Clientes
                      </Link>
                      {/* <Link
                        href="/ordenes"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                        prefetch={false}
                      >
                        <ActivityIcon className="h-5 w-5" />
                        Ordenes
                      </Link> */}
                    </nav>
                  </div>
                  <div className="space-y-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Idioma
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <GlobeIcon className="h-5 w-5" />
                      <span>Español</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>
    </div>
  );
}
