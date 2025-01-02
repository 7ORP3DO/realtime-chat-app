import moment from 'moment';
import { Message } from '../../types';
import { cn } from '../../lib/utils';

interface UserMessageProp extends Message {
    showName: boolean;
    isOwnMessage: boolean;
}

const UserMessage = ({ id, timestamp, content, userName, showName, isOwnMessage }: UserMessageProp) => {
    return (
        <div key={id}>
            {showName && !isOwnMessage && (
                <h4 className={cn('mb-0.5 mt-1.5 ml-0.5 text-muted-foreground text-xs capitalize')}>{userName}</h4>
            )}
            <div
                className={cn(
                    'bg-gradient-to-b from-neutral-900 to-neutral-950 py-1 px-2.5 rounded-xl border min-w-36 max-w-[75%] w-fit shadow-md text-foreground/70',
                    showName && !isOwnMessage && 'rounded-tl-none',
                    isOwnMessage && 'ml-auto rounded-tr-none'
                    // isOwnMessage && 'ml-auto rounded-tr-none bg-foreground text-background'
                )}
            >
                <p className=" text-sm">{content}</p>
                <p className="text-muted-foreground text-[10px] text-right ">{moment(timestamp?.toDate()).fromNow()}</p>
            </div>
        </div>
    );
};

export default UserMessage;
