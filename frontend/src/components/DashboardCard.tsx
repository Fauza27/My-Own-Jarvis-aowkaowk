import { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type DashboardCardProps = {
  title: string;
  icon?: LucideIcon;
  iconImage?: string;
  href: string;
  description?: string;
};

export function DashboardCard({ title, icon: Icon, iconImage, href, description }: DashboardCardProps) {
  return (
    <Link href={href} className="group block">
      <div
        className="
          relative bg-card rounded-2xl p-5 min-h-35 border
          flex flex-col
           hover:shadow-md
          transition-all duration-200
          hover:border-primary/30 hover:-translate-y-0.5
        "
      >
        <div className="pr-16 pb-10">
          <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>}
        </div>

        <div className="absolute right-4 bottom-4">
          <div className={`${iconImage ? "w-14 h-14" : "w-10 h-10"} rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors`}>
            {iconImage ? <Image src={iconImage} alt={`${title} icon`} width={44} height={44} className="rounded-md object-contain" /> : Icon && <Icon className="w-5 h-5 text-primary" />}
          </div>
        </div>
      </div>
    </Link>
  );
}
