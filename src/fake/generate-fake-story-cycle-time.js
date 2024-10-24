import { faker } from '@faker-js/faker';
import { add } from "date-fns";

const stories = [];

for (let i = 0; i < 100; i++) {
    const id = `TMO-${faker.number.int({ min: 0, max: 99999 })}`;
    const status = faker.helpers.arrayElement(["Open", "In Progress", "Resolved", "Closed", "Rejected"]);
    const created = faker.date.between({ from: '2024-01-01', to: '2024-12-31' });
    const resolved = add(created, { hours: faker.number.int({ min: 1, max: 5 * 24 }) });
    const summary = faker.lorem.sentence();

    stories.push({ id, status, created, resolved, summary, });
}

console.log(JSON.stringify(stories, null, 4));
