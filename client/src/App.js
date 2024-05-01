import './App.css';
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import Home from './component/Home';
function App() {
  return (
    <div className="App">
  <BrowserRouter>
<Routes>
<Route path='/'element={<Signup/>}/>
<Route path='/home'element={<Home/>}/>
<Route path='/dashboard'element={<Dashboard/>}/>

</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
