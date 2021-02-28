import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
const log = require('../middleware/logs');

export class ReportsService {
	private sqs: SQSClient = new SQSClient({ region: "REGION" });

	public async ReceiveMessage(): Promise<void> {
		const params = {
			QueueUrl: process.env.SQSREPORTS,
		};
		const command = new ReceiveMessageCommand(params);
		const data = await this.sqs.send(command);
		log.debug('The receive message response', { data });
	}
}
