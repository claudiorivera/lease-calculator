import { faker } from "@faker-js/faker";
import { db } from "~/server/db";

async function main() {
	await db.user.deleteMany();

	await db.user.create({
		data: {
			name: faker.person.fullName(),
			leases: {
				create: [
					{
						name: faker.vehicle.vehicle(),
						startDate: faker.date.past(),
						numberOfMonths:
							Math.round(
								faker.number.int({
									min: 12,
									max: 60,
								}) / 12,
							) * 12,
						allowedMiles: faker.number.int({
							min: 10000,
							max: 50000,
						}),
						excessFeePerMileInCents: faker.number.int({
							min: 10,
							max: 100,
						}),
					},
				],
			},
		},
	});
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
