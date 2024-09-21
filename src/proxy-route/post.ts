import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

const API_SERVICE_URL = process.env.API_SERVICE_URL || 'http://localhost:3030';

export function Post(post: string) {

    app.use(`/v1/user/${post}`, (req: Request, res: Response, next: NextFunction) => {
      let route
      if(post==="register"){
        route=''
      }
      else{
        route=post
      }
      console.log(`User ID is: ${req.clientId}`);
      const targetUrl = `${API_SERVICE_URL}/v1/user/${route}`;
      console.log(`Proxying request to: ${targetUrl}`);
      const proxyMiddleware = createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
          [`^/v1/user/${post}`]: '',
        },
      });
      proxyMiddleware(req, res, next);
    });
  }