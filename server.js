import { handler } from './build/handler.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import polka from 'polka';

const backendUri = process.env.BACKEND_URL || 'http://localhost:3000';

console.log(`Proxying requests to ${backendUri}`);

const api = createProxyMiddleware({
  target: backendUri,
  changeOrigin: true,
  cookieDomainRewrite: {
    'api.tf2pickup.pl': 'tf2pickup.pl',
  },
  pathRewrite: {
    '^/api': '',
  },
});

const socketIo = createProxyMiddleware({
  target: backendUri,
  changeOrigin: true,
  ws: true,
});

polka()
  .use('/api', api)
  .use('/socket.io', socketIo)
  .use((req, res, next) => {
    if (req.url.startsWith('/api') || req.url.startsWith('/socket.io')) {
      return next();
    }

    return handler(req, res, next);
  })
  .listen(3000, () => {
    console.log(`> Running on 3000`);
  });
