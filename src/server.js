import {Server} from '@apetrisor/nox-server';
import * as sapper from '@sapper/server';
import config from './lib/config';

const app = Server.init(config);
app.use(
	sapper.middleware({
		session: (req, res) => ({
			settings: req.clientSettings,
		}),
	})
);
app.start();
