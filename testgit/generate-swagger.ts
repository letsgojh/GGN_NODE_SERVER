import fs from 'fs';
import specs from './src/swagger.js';

fs.writeFileSync('./swagger.json', JSON.stringify(specs, null, 2), 'utf-8');