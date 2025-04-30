import "./styles/main.scss"
import {Route, Routes, BrowserRouter} from "react-router-dom";

import Layout from "./pages/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import AuthPage from "./pages/Auth/Auth.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import WritePost from "./pages/WritePost/WritePost.jsx";


function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="/login" element={<AuthPage/>}/>
              <Route path="/profile/:username" element={<Profile/>}/>
              <Route path="/write-post" element={<WritePost/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
