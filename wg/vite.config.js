export default {
  build: {
    sourcemap: true,
  },
  server: {
    port: 80,
    proxy: {
      '/geoserver': 'http://localhost:8080',
    }
  },
}
