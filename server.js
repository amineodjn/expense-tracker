import('https-localhost').then(HttpsLocalhost => {
  // Create an instance
  const app = HttpsLocalhost.default()

  // Serve your app
  app.serve('dist', 4433)
})