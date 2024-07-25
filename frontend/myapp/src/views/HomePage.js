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
        
      </main>
      <PiePagina />
    </div>
  );
}

export default Home;