 import React, { useContext } from "react";
import { Route,Routes, Switch ,Navigate} from "react-router-dom";
import Login from './pages/login/Login';
import Regiser from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import UpdateUser from "./component/updateUser/UpdateUser";
import Comment from '../src/component/comment/Comment';
import UpdatePost from "./component/updatepost/UpdatePost";
import Chat from "./pages/home/right/Chat/Chat.jsx";
import HomepageMessage from "./pages/home/right/HomepageMessageBox/HomepageMessage";
import {useSelector} from 'react-redux'
function App() {
  const {currentUser}=useSelector((state)=>state.user)

  return (
    <>
    <Routes>
     <Route path="/"  exact element={currentUser?<Home />:<Regiser />} />
     <Route path="/login"  element={currentUser?<Navigate to="/" />:<Login />} />
     <Route path="/register"  element={currentUser?<Navigate to="/" />:<Regiser />} />
     <Route path="/message" element={<Chat />} />
     <Route path="/chat/:currentchatId" element={<Chat />} />
     <Route path="/messageauthor" element={<HomepageMessage />} />
     <Route path="/profile/:userId"   element={<Profile />} />
     <Route path="/profile/update"   element={<UpdateUser />} />
     <Route path="/note/update/:notesid"   element={<UpdatePost />} />
     <Route path="/viewcomment/:notesid"   element={<Comment />} />
     </Routes>
    </> 
  );
}

export default App;
