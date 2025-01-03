import { Route, Routes } from 'react-router';
import Dashboard from './components/dashboard';
import Home from './pages/home';
import Chat from './pages/chat';

function App() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="chat" element={<Chat />} />
        </Routes>
    );

    // return (
    //     <div>
    //         <h1>Chat</h1>
    //         <div>
    //             {messages.map(message => (
    //                 <div key={message.id}>
    //                     <strong>{message.userName}</strong>: {message.content}
    //                 </div>
    //             ))}
    //         </div>
    //         <form
    //             onSubmit={e => {
    //                 e.preventDefault();
    //                 const content = (e.target as any).content.value;
    //                 sendMessage(content, user);
    //                 (e.target as any).content.value = '';
    //             }}
    //         >
    //             <input type="text" name="content" id="content" />
    //             <button>Send</button>
    //         </form>
    //         <h2>Online Users {users.length} </h2>
    //         <ul>
    //             {users.map(user => (
    //                 <li key={user.id}>
    //                     {user.name} [{user.isOnline ? 'online' : 'offline'}]
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
}

export default App;
