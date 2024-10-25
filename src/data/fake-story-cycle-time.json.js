import { faker } from "@faker-js/faker";
import { add } from "date-fns";

function random() {
    const id = `FKE-${faker.number.int({ min: 0, max: 99999 })}`;

    const created = faker.date.between({
        from: "2024-01-01",
        to: "2024-12-31",
    });

    const resolved = add(created, {
        hours: faker.number.int({ min: 1, max: 5 * 24 }),
    });

    return { id, created, resolved };
}

const stories = Array.from({ length: 100 }, random);

process.stdout.write(JSON.stringify(stories, null, 4));
