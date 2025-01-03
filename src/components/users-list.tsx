import moment from 'moment';
import useOnlineUsers from '../hooks/useOnlineUsers';
import { cn } from '../lib/utils';
import { ScrollArea } from './ui/scroll-area';

type Props = {
    showUsers: boolean;
};

const UsersList = ({ showUsers }: Props) => {
    const { users } = useOnlineUsers({});
    console.log(showUsers);

    return (
        <div
            className={cn(
                'w-full border-r h-full overflow-hidden flex flex-col relative bg-card z-20 transition-all duration-500',
                'absolute md:relative top-0 max-md:-left-full',
                showUsers && 'max-md:left-0'
            )}
        >
            <ScrollArea>
                <div className="space-y-4 px-4 py-12 max-md:pt-24">
                    {[...users, ...users, , ...users].map(user => (
                        <div
                            key={user.id}
                            className={cn(
                                'rounded-md border bg-muted/40 border-muted-foreground/15  px-3 py-1.5 grid grid-cols-[1fr_1rem] items-center',
                                ''
                            )}
                        >
                            <div>
                                <h4 className="capitalize">{user.name}</h4>
                                <p className="text-xs mt-0.5 text-muted-foreground">
                                    <b>Last Seen: </b>
                                    {moment(user.lastOnline).fromNow()}
                                </p>
                            </div>
                            <div>
                                <p
                                    className={cn(
                                        'size-2.5 mx-auto rounded-full ',
                                        user.isOnline ? 'bg-green-500' : 'bg-red-500'
                                    )}
                                ></p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default UsersList;
