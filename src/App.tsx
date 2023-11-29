import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Terminal from './Components/Terminal';

function App() {
  // const url = 'http://localhost:5000/api/';

  // useEffect(()=>{
  //   async function getPutVeto(){
  //     const data = await getQuery();
  //     const id = data?._id;
  //     await putVeto(id);
  //   }
    // getPutVeto();
    
    // postQuery({ 
    //   query: 'from the app?', 
    //   answer: 'yes it is from the react application' 
    // });

  // });

  // async function getQuery(){
  //   console.log('calling getting');
  //   const response = await (await fetch(`${url}`)).json();
  //   console.log('get response', response);
  //   return response;
  // }

  // async function postQuery(obj: {query: string, answer: string}){
  //   console.log('posting new query');
  //   const response = await (await fetch(`${url}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(obj)
  //   })).json();
  //   console.log('post response', response);
  //   return response;
  // }

  // async function putVeto(id: string){
  //   const response = await (await fetch(`${url}${id}`, {
  //     method: 'PUT'
  //   })).json();
  //   console.log('put veto response', response);
  //   return response;
  // }

  return (
    <div className="App">
      <Terminal />
    </div>
  );
}

export default App;
