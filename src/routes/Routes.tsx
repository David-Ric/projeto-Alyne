import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from '../pages/Game';
import Home from '../pages/Home';
import Interno from '../pages/Interno';
import Login from '../pages/Login';
import Sobre from '../pages/Sobre';

export interface IApplicationProps { }

const Router: React.FunctionComponent<IApplicationProps> = (props) => {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Game />} />
            <Route path='/sobre' element={<Sobre />} />
            <Route path='/interno' element={<Interno />} />
            <Route path='/login' element={<Login />} />
        </Routes>

    </BrowserRouter>
};

export default Router;