import { EmployeesService } from "../services/employees.service";
const log = require('../middleware/logs');

export class EmployeesController {
	private _service: EmployeesService = new EmployeesService();
	/**
	 * name
	 */
	public async getEmployees(): Promise<void> {
		const result = await this._service.getEmployees();
		log.debug('Employees', { result });
		await this._service.sendMessage();
	}

	public async sendMessage(): Promise<void> {
		const sendMessageResponse = await this._service.sendMessage();
		log.debug('Employees sendMessageResponse', { sendMessageResponse });
	}
}