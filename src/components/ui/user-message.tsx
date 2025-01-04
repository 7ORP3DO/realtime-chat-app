import moment from 'moment';
import { Message } from '../../types';
import { cn } from '../../lib/utils';

import Linkify from 'linkify-react';
import { Opts } from 'linkifyjs';
import countries from '../../data/country-data';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from './context-menu';
import { Copy } from 'lucide-react';

interface UserMessageProp extends Message {
    showName: boolean;
    isOwnMessage: boolean;
}

const linkOptions: Opts = {
    attributes: {
        onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            if (!confirm('Are you sure you want to leave this page?')) e.preventDefault();
        },
    },
    target: '_blank',
};

interface UserContextMenuProps extends UserMessageProp {
    children: React.ReactNode;
}

const UserContextMenu = ({ children, ...props }: UserContextMenuProps) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent className="min-w-48">
                <ContextMenuLabel className="text-ellipsis text-xs opacity-85">Id: {props.id}</ContextMenuLabel>

                <ContextMenuLabel className="text-ellipsis text-xs opacity-85">User: {props.userName}</ContextMenuLabel>

                <ContextMenuLabel className="text-ellipsis text-xs opacity-85">
                    Country: {countries?.[props.userCountry]?.name}{' '}
                    <img
                        className="size-5 ml-0.5 -translate-y-[1px] inline"
                        src={countries?.[props.userCountry]?.image || countries?.['AC'].image}
                    />
                </ContextMenuLabel>

                <ContextMenuLabel className="text-ellipsis text-xs opacity-85">
                    Time: {moment(props.timestamp?.toDate()).format('D MMM YY, hh:mm A')}
                </ContextMenuLabel>

                <ContextMenuSeparator />

                <ContextMenuItem>
                    Copy Message
                    <ContextMenuShortcut>
                        <Copy className="size-4" />
                    </ContextMenuShortcut>
                </ContextMenuItem>

                <ContextMenuItem>
                    Copy UserId
                    <ContextMenuShortcut>
                        <Copy className="size-4" />
                    </ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

const UserMessage = (props: UserMessageProp) => {
    const { id, timestamp, content, userName, showName, isOwnMessage, userCountry } = props;

    return (
        <UserContextMenu key={id} {...props}>
            <div className='select-none'>
                {/* <span className="text-[10px] lowercase"> from India</span> */}
                {showName && !isOwnMessage && (
                    <h4 className={cn(' mt-1.5 ml-0.5 text-muted-foreground text-xs capitalize w-fit')}>
                        {userName}
                        <img
                            className="size-5 ml-0.5 -translate-y-[1px] inline"
                            src={countries?.[userCountry]?.image || countries?.['AC'].image}
                        />
                    </h4>
                )}

                {isOwnMessage && showName && <p className="mt-2"></p>}

                <div
                    className={cn(
                        'bg-gradient-to-b px-2 rounded-xl min-w-28 max-w-[75%] md:max-w-[60%] w-fit shadow-md ',
                        showName && !isOwnMessage && 'rounded-tl-sm',
                        isOwnMessage && 'ml-auto rounded-br-sm min-w-6',
                        !isOwnMessage &&
                            'border pt-1 pb-0.5 border-neutral-700/50 from-neutral-800/90 to-neutral-900/90 text-foreground/90',
                        isOwnMessage && 'py-2 chat-gradient'
                    )}
                >
                    <p className="[&_a]:text-orange-500 [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-4">
                        <Linkify options={linkOptions}>{content}</Linkify>
                    </p>
                    {!isOwnMessage && (
                        <p className="mt-.5 text-muted-foreground text-[10px] text-right ">
                            {moment(timestamp?.toDate()).format('hh:mm A')}
                        </p>
                    )}
                </div>
            </div>
        </UserContextMenu>
    );
};

export default UserMessage;
