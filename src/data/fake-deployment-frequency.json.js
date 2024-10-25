import { faker } from "@faker-js/faker";

function random() {
    const env = faker.helpers.arrayElement(["dev", "staging", "prod"]);

    const date = faker.date.between({
        from: "2024-01-01",
        to: "2024-02-20",
    });

    return { env, date };
}

const events = Array.from({ length: 500 }, random);

process.stdout.write(JSON.stringify(events, null, 4));
