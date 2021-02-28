import { PayrollService } from "../services/payroll.service";
const log = require('../middleware/logs');

export class PayrollController {
	private _service: PayrollService = new PayrollService();
	public async sendMessage(): Promise<void> {
		const sendMessageResponse = await this._service.sendMessage();
		log.debug('Payroll sendMessageResponse', { sendMessageResponse });
	}
}