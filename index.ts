import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";

const apiKey: string =
	process.env.PULSE_API_KEY !== undefined ? process.env.PULSE_API_KEY : "";
const prisma = new PrismaClient().$extends(withPulse({ apiKey: apiKey }));

async function main() {
	const subscription = await prisma.user.subscribe({
		create: {
			after: {
			  name: 'Ben',
			},
		  },
	  })

	  if (subscription instanceof Error) {
		throw subscription;
	}

	  for await (const event of subscription) {
		console.log("DB just received an Create event:", event);
	}

}
main();
