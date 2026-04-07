import { LucideIcon } from "lucide-react";
import Link from "next/link";

type DashboardCardProps = {
  title: string;
  icon: LucideIcon;
  href: string;
  description?: string;
};

export function DashboardCard({ title, icon: Icon, href, description }: DashboardCardProps) {
  return (
    <Link href={href} className="group block">
      <div
        className="
          bg-card border border-border rounded-2xl p-5
          shadow-sm hover:shadow-md
          transition-all duration-200
          hover:border-primary/30 hover:-translate-y-0.5
        "
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
        )}
      </div>
    </Link>
  );
}
