import app from './app';
import dotenv from 'dotenv';
import configs from './config';

function RunningPorts() {
  dotenv.config({ path: '.env.development' });
  const PORT = configs.port||3040 ;
  app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
  });

}

RunningPorts()