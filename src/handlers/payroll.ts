import { PayrollController } from './../controllers/payroll.controller';
import { Context, SQSEvent } from "aws-lambda";
const log = require('../middleware/logs');

const payrollController: PayrollController = new PayrollController();
export const handler = async (event: SQSEvent, _context: Context): Promise<Object> => {
	log.debug('The Payroll handler event', { event })
	const records = event.Records;
	log.debug('The Payroll records', { records })
	await payrollController.sendMessage();
	return {
		statusCode: 200,
		body: 'Okay'
	};
};
