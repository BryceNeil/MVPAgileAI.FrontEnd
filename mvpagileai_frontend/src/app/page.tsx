import React from 'react';
import Body from './components/Body';
import Navbar from './components/Navbar';

const Home: React.FC = () => {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 p-4">  
        {/* <h1 className="text-center text-4xl mb-8">Page Header</h1> */}
        <Navbar />
        <Body />
      </div>
    );
};

export default Home;
