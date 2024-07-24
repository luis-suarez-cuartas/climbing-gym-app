import '../App.css';
import React from 'react';
import { BarraNavegacion } from '../components/BarraNavegacion';  // Importación de exportaciones con nombre
import { PiePagina } from '../components/PiePagina';  // Importación de exportaciones con nombre
import { GrowthSection } from '../components/Centro'; 
function Home() {
  return (
    <div>
      <BarraNavegacion />
      <br />
        <br />
        <br />
        <br />
        <br />
        <GrowthSection />
      <main className="container">
        <h1>Welcome to Our Home Page</h1>
        <p>This is the Home page of our website. Here, you can find various information about our services and offers.</p>
      </main>
      <PiePagina />
    </div>
  );
}

export default Home;