import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Terminal from './Components/Terminal';

function App() {
  // console.log('calling app');

  const url = 'http://localhost:5000/api/';

  useEffect(()=>{
    async function getPutVeto(){
      const data = await getQuery();
      const id = data?._id;
      await putVeto(id);
    }
    // getPutVeto();
    
    // postQuery({ 
    //   query: 'from the app?', 
    //   answer: 'yes it is from the react application' 
    // });

  });

  async function getQuery(){
    console.log('calling getting');
    const response = await (await fetch(`${url}`)).json();
    console.log('get response', response);
    return response;
  }

  async function postQuery(obj: {query: string, answer: string}){
    console.log('posting new query');
    const response = await (await fetch(`${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    })).json();
    console.log('post response', response);
    return response;
  }

  async function putVeto(id: string){
    const response = await (await fetch(`${url}${id}`, {
      method: 'PUT'
    })).json();
    console.log('put veto response', response);
    return response;
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> sandy cheeks save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Terminal />
    </div>
  );
}

export default App;

// maybe some lines roll in all cool, typed out.. like the answers and queries...
// loading indicators for bigger pieces of data. or just data that can be shown faster..
// if the rolling in is too slow they can skip with a key press probs..
// no backgrounds or animations. maybe they have an option for a more tradional gui.. I think it would be fine to let them click somethings too.