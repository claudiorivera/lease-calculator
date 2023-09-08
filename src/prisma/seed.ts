import { faker } from "@faker-js/faker";
import { prisma } from "~/server/db";

async function main() {
	await prisma.user.deleteMany();

	await prisma.user.create({
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
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
