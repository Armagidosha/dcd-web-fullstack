import Link from "next/link";
import IconButton from "@/app/shared/ui/IconButton";

interface AsideProps {
  anchors: { anchor: string; icon: React.ElementType; label: string }[];
}

export default function Aside({ anchors }: AsideProps) {
  return (
    <aside className="hidden 2xl:block fixed left-2 top-1/2 -translate-y-1/2 z-50">
      <nav className="relative">
        <div className="relative flex flex-col gap-3 p-3">
          {anchors.map((link) => (
            <Link
              key={link.anchor}
              href={link.anchor}
              className="group relative"
            >
              <IconButton
                className="p-3 rounded-xl bg-secondary hover:bg-primary!"
                icon={link.icon}
              />

              <div className="absolute left-8/10 ml-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                <div className="bg-surface-variant backdrop-blur-xl border border-border rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap">
                  <span className="text-sm font-medium text-white-text">
                    {link.label}
                  </span>
                </div>
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-border" />
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
