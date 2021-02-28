import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const log = require('../middleware/logs');

export class PayrollService {
	private sqs: SQSClient = new SQSClient({ region: "REGION" });

	public async sendMessage(): Promise<void> {
		const params = {
			DelaySeconds: 10,
			MessageBody:
				`This is message from payroll service ${Date.now}`,
			QueueUrl: process.env.SQSREPORTS
		};
		const command = new SendMessageCommand(params);
		const data = await this.sqs.send(command);
		log.debug('The send message respinse', { data });
	}
}
