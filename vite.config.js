import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reemplaza el contenido de tu vite.config.js con esto
export default defineConfig({
  // CLAVE: Añadir la base con el nombre exacto de tu repositorio, rodeado de barras.
  base: "/blackwolf-web/", 
  
  plugins: [react()],
});