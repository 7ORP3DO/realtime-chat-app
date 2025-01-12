import { cn } from '@/lib/utils';
import { TypingStatus } from '@/types';
import { AnimatePresence, motion } from 'motion/react';

const TypingBubble = ({ typingUsers }: { typingUsers: TypingStatus[] }) => {
    const Bubble = () => (
        <motion.div
            key={'typing-bubble'}
            exit={{ opacity: 0, scale: 0, x: '-50%' }}
            initial={{ opacity: 0, scale: 0, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%' }}
            className="absolute bg-background top-4 z-40 w-fit -translate-x-1/2 left-1/2 pointer-events-none"
        >
            <div
                className={cn(
                    'border rounded-md px-2.5 py-[3px] text-xs  ',
                    'bg-gradient-to-b border-green-600 text-green-500 from-green-500/20 to-green-500/30'
                )}
            >
                <p>{typingUsers.map(u => u.name).join(', ')} is typing...</p>
            </div>
        </motion.div>
    );

    return <AnimatePresence key={'typing'}>{typingUsers.length > 0 && Bubble()}</AnimatePresence>;
};

export default TypingBubble;
