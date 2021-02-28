import { ReportsService } from "../services/reports.service";
const log = require('../middleware/logs');

export class ReportsController {
	private _service: ReportsService = new ReportsService();

	public async ReceiveMessage(): Promise<void> {
		const receiveMessageResponse = await this._service.ReceiveMessage();
		log.debug('Report receiveMessageResponse', { receiveMessageResponse });
	}
}