
import React from 'react';

import NavigationTab from 'Containers/NavigationTab/NavigationTab';
import MainContainer from 'Containers/MainContainer/MainContainer';
import ReferenceTab from 'Containers/ReferenceTab/ReferenceTab';
import './App.scss';

const App = () => (
  <div id="app">
    <NavigationTab />
    <MainContainer />
    <ReferenceTab />
  </div>
);

export default App;
