"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { SidebarContent } from "./Sidebar";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mr-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <div className="relative w-64 h-full bg-slate-50 border-r shadow-lg animate-in slide-in-from-left z-[101]">
              <div className="flex h-11 items-center justify-between px-4 border-b border-border/40">
                <span className="font-bold text-sm tracking-tight text-foreground">
                  Menu
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <div className="h-[calc(100vh-2.75rem)] w-full pb-4">
                <SidebarContent onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
