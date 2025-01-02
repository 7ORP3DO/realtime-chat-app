import moment from 'moment';
import useOnlineUsers from '../hooks/useOnlineUsers';
import { cn } from '../lib/utils';
import { Card, CardDescription, CardTitle } from './ui/card';

type Props = {};

const UsersList = (props: Props) => {
    const { users } = useOnlineUsers();

    return (
        <div className="w-full border-r h-screen overflow-y-auto bg-card">
            <div className="p-4 py-3 border-b border-border">
                <h2 className="text-lg font-semibold text-primary">Online Users</h2>
            </div>
            <div className="space-y-4 mt-8 px-4">
                {users.map(user => (
                    <div
                        key={user.id}
                        className="rounded-md  border bg-muted/40 border-muted-foreground/15  px-3 py-1.5 grid grid-cols-[1fr_1rem] items-center"
                    >
                        <div>
                            <h4 className="capitalize">{user.name}</h4>
                            <p className="text-xs mt-0.5 text-muted-foreground">
                                <b>Last Seen: </b>
                                {user.isOnline ? 'online' : moment(user.lastOnline?.toDate()).fromNow()}
                            </p>
                        </div>
                        <div>
                            <p
                                className={cn(
                                    'size-2.5 mx-auto rounded-full',
                                    user.isOnline ? 'bg-green-500' : 'bg-red-500'
                                )}
                            ></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

{
    /* <Card
                        key={user.id}
                        className="rounded-md  bg-gradient-to-b border border-neutral-800 from-neutral-950 to-neutral-800/70 px-3 py-1.5 grid grid-cols-[1fr_1rem] items-center"
                    >
                        <div>
                            <h4 className="capitalize">{user.name}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5 ">
                                <b>Last Seen: </b>
                                {(new Date(user.lastOnline)).toLocaleString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="size-3 mx-auto bg-green-500 rounded-full"></p>
                        </div>
                    </Card> */
}

export default UsersList;
