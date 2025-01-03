import { useState } from 'react';
import UsersList from '../components/users-list';
import MainWindow from '../components/main-window';

type Props = {};

const Chat = (props: Props) => {
    const [usersOpen, setUsersOpen] = useState(false);

    return (
        <div className="grid md:grid-cols-[20rem_1fr]">
            <UsersList usersOpen={usersOpen} setUsersOpen={setUsersOpen} />
            <MainWindow setUsersOpen={setUsersOpen} />
        </div>
    );
};

export default Chat;
