import { BrainCircuit } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass border-none">
      <div className="flex h-11 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <span className="font-bold text-sm tracking-tight">
            LeetMentor AI
          </span>
        </div>
      </div>
    </header>
  );
}
