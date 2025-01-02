import { useState } from 'react';
import MainWindow from './main-window';
import UsersList from './users-list';

type Props = {};

const Dashboard = (props: Props) => {

    const [usersOpen, setUsersOpen] = useState(false);

    return (
        <div className="grid md:grid-cols-[20rem_1fr]">
            <UsersList usersOpen={usersOpen} setUsersOpen={setUsersOpen} />
            <MainWindow setUsersOpen={setUsersOpen} />
        </div>
    );
};

export default Dashboard;
