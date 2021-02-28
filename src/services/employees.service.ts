import { Employee } from "../models/employee";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const log = require('../middleware/logs');

export class EmployeesService {
	private sqs: SQSClient = new SQSClient({ region: "REGION" });

	public getEmployees(): Promise<any> {
		return new Promise((resolve, reject) => {
			const employees: Employee[] = [
				{
					name: 'Lakshmi',
					village: 'Ongole'
				}
			];
			resolve(employees);
		}).catch((error) => {
			throw error;
		});
	};
	public async sendMessage(): Promise<void> {
		const params = {
			DelaySeconds: 10,
			MessageBody:
				`This is message from employees service ${Date.now}`,
			QueueUrl: process.env.SQSPAYROLL
		};
		const command = new SendMessageCommand(params);
		const data = await this.sqs.send(command);
		log.debug('The send message respinse', { data });
	}
}
