const http = require('http');

const PORT = process.env.PORT || 8080;
const VERSION = process.env.APP_VERSION || '1.0.0';
const ENV = process.env.NODE_ENV || 'unknown';

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();

  console.log(`${timestamp} ${req.method} ${req.url}`);

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: timestamp
    }));
  } else if (req.url === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      app: 'ecso-test-app',
      version: VERSION,
      environment: ENV,
      timestamp: timestamp,
      hostname: process.env.HOSTNAME || 'unknown'
    }));
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>ECSO Test App</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #333; margin-bottom: 30px; }
    .info { background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0; }
    .info p { margin: 8px 0; }
    .label { font-weight: 600; color: #666; }
    .value { color: #333; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 4px; background: #28a745; color: white; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 ECSO Test App</h1>
    <span class="status">Running</span>
    <div class="info">
      <p><span class="label">Version:</span> <span class="value">${VERSION}</span></p>
      <p><span class="label">Environment:</span> <span class="value">${ENV}</span></p>
      <p><span class="label">Hostname:</span> <span class="value">${process.env.HOSTNAME || 'unknown'}</span></p>
      <p><span class="label">Timestamp:</span> <span class="value">${timestamp}</span></p>
    </div>
    <h3>Endpoints</h3>
    <ul>
      <li><a href="/health">/health</a> - Health check</li>
      <li><a href="/info">/info</a> - Application info (JSON)</li>
    </ul>
  </div>
</body>
</html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`ECSO Test App v${VERSION} (${ENV})`);
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
