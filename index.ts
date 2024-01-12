import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";

const apiKey: string =
	process.env.PULSE_API_KEY !== undefined ? process.env.PULSE_API_KEY : "";
const prisma = new PrismaClient().$extends(withPulse({ apiKey: apiKey }));

async function main() {
	/*
	const createSubscription = await prisma.user.subscribe({
		create: {
		  after: {
			name: 'Jim',
		  },
		},
	  })

	if (createSubscription instanceof Error) {
		throw createSubscription;
	}

	for await (const event of createSubscription) {
		console.log("DB just received a CREATE event:", event);
	}
	*/
	
	const subscription = await prisma.user.subscribe({
		update: {},
	  })

	  for await (const event of subscription) {
		console.log("DB just received an UPDATE event:", event);
	}
}
main();
