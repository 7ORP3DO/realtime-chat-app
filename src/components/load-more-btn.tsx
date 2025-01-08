import { cn } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';

const LoadMore = ({ onClick, isLoading }: { onClick?: () => void; isLoading: boolean }) => (
    <button
        className={cn(
            'flex gap-1 items-center flex-col justify-center my-1 mb-5 text-muted-foreground/75 text-sm',
            isLoading && 'opacity-50'
        )}
        disabled={isLoading}
        onClick={onClick}
    >
        <RefreshCcw className={cn('!size-6', isLoading && 'animate-spin')} />
        Load older messages
    </button>
);

export default LoadMore;
