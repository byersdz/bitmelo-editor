
import React from 'react';

import NavigationTab from 'Containers/NavigationTab/NavigationTab';
import MainContainer from 'Containers/MainContainer/MainContainer';
import ReferenceTab from 'Containers/ReferenceTab/ReferenceTab';
import BitmeloAudio from 'Containers/BitmeloAudio/BitmeloAudio';
import './App.scss';

const App = () => (
  <div id="app">
    <NavigationTab />
    <MainContainer />
    <ReferenceTab />
    <BitmeloAudio />
  </div>
);

export default App;
