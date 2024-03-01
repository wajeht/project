#!/usr/bin/env node

import os from 'os';
import path from 'path';
import fs from 'fs';

const projectPath = path.resolve(path.join(os.homedir(), '.project'));

if (!fs.existsSync(projectPath)) {
	fs.mkdirSync(projectPath, { recursive: true });
}
