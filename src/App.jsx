import './App.css'
import {Routes, Route ,BrowserRouter,} from 'react-router-dom';
import { Home, FullContent} from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/knowmore/:id' element={<FullContent/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
