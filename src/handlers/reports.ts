import { ReportsController } from './../controllers/reports.controller';
import { Context, Handler, ScheduledEvent } from "aws-lambda";
const log = require('../middleware/logs');

const reportsController: ReportsController = new ReportsController();
export const handler: Handler = async (event: ScheduledEvent, _context: Context): Promise<Object> => {
	log.debug('The Report handler event', { event })
	await reportsController.ReceiveMessage();
	return {
		statusCode: 200,
		body: 'Okay'
	};
};
