import React from 'react';
import logo from './assets/Icons/logo.svg';
import {SApp, SHeader, SLink, SLogo} from "./assets/styles/app.styles";
import TimerPage from "./pages/timer_page";

function App() {
    return (
        <SApp>
          <TimerPage />
        </SApp>
    );
}

export default App;
