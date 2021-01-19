import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/alice.jpg'} style={{width: "120px"}} alt='Our muse' />
        <p>
          Welcome to Alice, your new best friend.
        </p>
      </header>
    </div>
  );
}

export default Home;