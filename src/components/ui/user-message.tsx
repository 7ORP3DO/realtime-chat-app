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
                <h4 className={cn(' mt-1.5 ml-0.5 text-muted-foreground text-xs capitalize')}>
                    {userName}
                    <img
                        className="size-5 ml-0.5 -translate-y-[1px] inline"
                        src={countries?.[userCountry]?.image || countries?.['AC'].image}
                    />
                </h4>
            )}
            <div
                className={cn(
                    'bg-gradient-to-b from-neutral-800/80 to-neutral-900 py-1 px-2.5 rounded-xl border min-w-36 max-w-[75%] w-fit shadow-md text-foreground/90',
                    showName && !isOwnMessage && 'rounded-tl-none',
                    isOwnMessage && 'ml-auto rounded-tr-none'
                )}
            >
                <p className="[&_a]:text-orange-500 [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-4">
                    <Linkify options={linkOptions}>{content}</Linkify>
                </p>
                <p className="mt-.5 text-muted-foreground text-[10px] md:text-xs text-right ">
                    {moment(timestamp?.toDate()).fromNow()}
                </p>
            </div>
        </div>
    );
};

export default UserMessage;
