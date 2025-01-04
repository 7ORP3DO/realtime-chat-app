import moment from 'moment';
import { Message } from '../../types';
import { cn } from '../../lib/utils';

import Linkify from 'linkify-react';
import { Opts } from 'linkifyjs';
import countries from '../../data/country-data';

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

const UserMessage = ({ id, timestamp, content, userName, showName, isOwnMessage, userCountry }: UserMessageProp) => {
    return (
        <div key={id}>
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
                    // isOwnMessage && 'py-2 from-orange-500 via-pink-500 to-purple-600 bg-no-repeat bg-center bg-fixed'
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
    );
};

export default UserMessage;
