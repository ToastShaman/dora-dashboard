import { faker } from "@faker-js/faker";
import { add } from "date-fns";

function random() {
    const id = `INC-${faker.number.int({ min: 0, max: 99999 })}`;

    const created = faker.date.between({
        from: "2024-01-01",
        to: "2024-06-31",
    });

    const resolved = add(created, {
        hours: faker.number.int({ min: 1, max: 1 * 24 }),
    });

    return { id, created, resolved };
}

const events = Array.from({ length: 200 }, random);

process.stdout.write(JSON.stringify(events, null, 4));
