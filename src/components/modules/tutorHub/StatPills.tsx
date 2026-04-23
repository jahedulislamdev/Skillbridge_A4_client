export function StatPill({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ElementType;
    value: string | number;
    label: string;
}) {
    return (
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
                <p className="text-sm font-bold leading-none text-foreground">
                    {value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {label}
                </p>
            </div>
        </div>
    );
}
