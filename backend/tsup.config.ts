import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Punto de entrada
  format: ['esm'],         // Formato de módulo moderno (import/export)
  target: 'node20',        // Versión de Node objetivo
  clean: true,             // Limpiar carpeta dist antes de construir
  bundle: true,            // ¡IMPORTANTE! Empaquetar todo en un solo archivo
  splitting: false,        // No dividir en chunks
  sourcemap: false,        // No generar mapas de fuente para producción
  minify: false,           // No minificar (para depurar mejor si hace falta)
  outDir: 'dist',          // Carpeta de salida
  noExternal: [],          // Dejar dependencias de node_modules como externas (default)
});