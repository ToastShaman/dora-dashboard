import * as fs from 'node:fs';
import csv from 'csv-parser';
import { parse } from 'date-fns';

const formatString = 'dd.MM.yyyy HH:mm';

const results = [];

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (!data.Created || !data.Resolved) return;
        const id = data.Key;
        const created = parse(data.Created, formatString, new Date());
        const resolved = parse(data.Resolved, formatString, new Date());
        results.push({id, created, resolved});
    })
    .on('end', () => {
        console.log(JSON.stringify(results, null, 2));
    });