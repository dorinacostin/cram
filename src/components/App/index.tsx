import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Favourites from '../../pages/Favourites';
import Description from '../../pages/Description';

const App = () => {
    return(
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/favourites' element={<Favourites/>} />
        <Route path='/:id' element={<Description/>} />
    </Routes>  
    )
}

export default App