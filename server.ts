import config from 'config';
import { connect } from '@nc/utils/db';
import { connectClient } from '@nc/domain-expense/data';
import context from './middleware/context';
import { createServer as createHTTPServer } from 'http';
import { createServer as createHTTPSServer } from 'https';
import { router as expenseRoutes } from '@nc/domain-expense';
import express from 'express';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';
import { SecureServer, Server } from './types';

const logger = Logger('server');
const app = express();
const server: SecureServer | Server = (config.https.enabled === true) ? <SecureServer>createHTTPSServer(config.https, app as any) : <Server>createHTTPServer(app as any);
server.ready = false;

gracefulShutdown(server);
app.use(helmet());
app.get('/readycheck', function readinessEndpoint(req, res) {
  const status = (server.ready) ? 200 : 503;
  res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
});

app.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).send('OK');
});

app.use(context);
app.use(security);
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

app.use(function(req, res) {
  res.status(404).json({
    error: `${req.method} method is not defined on ${req.path}`,
  });
});

(async () => {
  await connect();
  await connectClient();
  server.listen(config.port, () => {
    server.ready = true;
    logger.log(`Server started on  ${config.port}`);
  });
})();

export default server;
