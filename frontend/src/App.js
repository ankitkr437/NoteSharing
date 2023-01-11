 import React, { useContext } from "react";
import { Route,Routes, Switch ,Navigate} from "react-router-dom";
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp';
import Home from './pages/home/Home';
import Topbar from './component/topbar/Topbar';
import Profile from './pages/profile/Profile';
import Notifications from './pages/notifications/Notifications' ;
import Cart from './pages/cart/Cart';
import Note from './pages/notes/Note';
import Update from "./component/update/Update";
import Comment from '../src/component/comment/Comment';
import UpdatePost from "./component/updatepost/UpdatePost";
import Chat from "./pages/home/right/Chat/Chat.jsx";
import HomepageMessage from "./pages/home/right/HomepageMessageBox/HomepageMessage";
import { AuthContext } from "./context/AuthContext";
 
function App() {
  const {user}=useContext(AuthContext);
  return (
    <>
    <Topbar />
    <Routes>
     <Route path="/"  exact element={user?<Home />:<SignUp />} />
     <Route path="/login"  element={user?<Navigate to="/" />:<Login />} />
     <Route path="/register"  element={user?<Navigate to="/" />:<SignUp />} />
     <Route path="/message" element={<Chat />} />
     <Route path="/message/:currentchatId" element={<Chat />} />
     <Route path="/messageauthor" element={<HomepageMessage />} />
     <Route path="/profile/:userId"   element={<Profile />} />
     <Route path="/notes/:notesid"   element={<Note />} />
     <Route path="/cart/:notesid"   element={<Cart />} />
     <Route path="/profile/update"   element={<Update />} />
     <Route path="/note/update/:notesid"   element={<UpdatePost />} />
     <Route path="/notifications"   element={<Notifications />} />
     <Route path="/viewcomment/:notesid"   element={<Comment />} />
     </Routes>
    </> 
  );
}

export default App;
