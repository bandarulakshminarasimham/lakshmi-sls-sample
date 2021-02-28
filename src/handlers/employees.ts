import { EmployeesController } from './../controllers/employees.controller.';
import { Handler, SQSEvent, Context } from "aws-lambda";
const log = require('../middleware/logs');

const employeesController: EmployeesController = new EmployeesController();
export const handler: Handler = async (event: SQSEvent, _context: Context): Promise<Object> => {
	log.debug('The Employee handler event', { event })
	const records = event.Records;
	console.log('Employees Records', { records });
	await employeesController.getEmployees();
	await employeesController.sendMessage();
	return {
		statusCode: 200,
		body: 'Okay'
	};
};
