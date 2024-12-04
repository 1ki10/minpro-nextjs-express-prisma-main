interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
  }
  
  export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        {icon && <div className="text-gray-400 mb-4">{icon}</div>}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
            {description}
          </p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  }