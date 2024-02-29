#!/usr/bin/env node

import os from 'os';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

const projectPath = path.resolve(path.join(os.homedir(), 'project'));

if (!fs.existsSync(projectPath)) {
	fs.mkdirSync(projectPath, { recursive: true });
}
