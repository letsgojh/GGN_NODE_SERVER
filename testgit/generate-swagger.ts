import fs from 'fs';
import specs from './src/swagger.ts';

fs.writeFileSync('./swagger.json', JSON.stringify(specs, null, 2), 'utf-8');