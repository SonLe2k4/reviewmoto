import { Route, Routes, Outlet } from 'react-router-dom'
import './App.scss';
import { Navbar, Footer, Backtop } from './Component'
import { Home, View, Contact, SignUp, MoreInfoMoto } from './pages'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/reviewmoto" element={<Home />}></Route>
        <Route path="/reviewmoto/view" element={<View />}></Route>
        <Route path="/reviewmoto/contact" element={<Contact />}></Route>
        <Route path="/reviewmoto/sign_up" element={<SignUp />}></Route>
        <Route path="/reviewmoto/moreInfoMoto" element={<MoreInfoMoto />}></Route>
      </Routes>
      <Backtop />
      <Footer />
      <Outlet />
    </div>
  );
}

export default App;
