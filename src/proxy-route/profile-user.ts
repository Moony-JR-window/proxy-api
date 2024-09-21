import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

const API_SERVICE_URL = process.env.API_SERVICE_URL || 'http://localhost:3030';

export function createDynamicRoute(endpoint: string) {
    app.use(`/v1/user/${endpoint}`, (req: Request, res: Response, next: NextFunction) => {
      if (!req.clientId) {
        console.log('No clientId found, returning 400');
        return res.status(400).send('User ID not found in cookies');
      }
      let route
      if(endpoint==="profile/"){
        route=''
      }
      else{
        route=endpoint
      }
      console.log(`User ID is: ${req.clientId}`);
      const targetUrl = `${API_SERVICE_URL}/v1/user/${route}${req.clientId}`;
      console.log(`Proxying request to: ${targetUrl}`);
      const proxyMiddleware = createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
          [`^/v1/user/${endpoint}`]: '',
        },
      });
      proxyMiddleware(req, res, next);
    });
  }