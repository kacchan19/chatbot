import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({ icon, title, description, className, children }: EmptyStateProps) {
  return (
    <div className={cn("flex h-full flex-col justify-between p-4", className)}>
      {children}
      <Card className="w-full max-w-md mx-auto border-2 border-dashed bg-transparent shadow-none">
        <CardContent className="p-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            {icon}
          </div>
          <h3 className="mt-4 text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
      <div />
    </div>
  );
}
