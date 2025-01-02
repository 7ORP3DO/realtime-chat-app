import MainWindow from './main-window';
import UsersList from './users-list';

type Props = {};

const Dashboard = (props: Props) => {
    return (
        <div className="grid md:grid-cols-[20rem_1fr]">
            <UsersList />
            <MainWindow />
        </div>
    );
};

export default Dashboard;
