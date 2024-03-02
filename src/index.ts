#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import cp from 'child_process';

async function main() {
	const response = await prompts([
		{
			type: 'text',
			name: 'projectName',
			message: 'Project name?',
			validate: (value: string) => (value.length ? true : false),
		},
		{
			type: 'text',
			name: 'description',
			message: 'Description',
			validate: (value: string) => (value.length ? true : false),
		},
		{
			type: 'confirm',
			name: 'gitInit',
			message: 'Initilialize git?',
			validate: (value: string) => (value.length ? true : false),
		},
		{
			type: 'confirm',
			name: 'typescript',
			message: 'Typescript?',
			validate: (value: string) => (value.length ? true : false),
		},
	]);

	const projectNameFolderPath = `${process.cwd()}/${response.projectName}`;

	// make folder
	if (!fs.existsSync(projectNameFolderPath)) {
		fs.mkdirSync(projectNameFolderPath, { recursive: true });
	} else {
		console.error('Folder exists already');
		return;
	}

	// git init
	cp.exec(`git init`, { cwd: projectNameFolderPath }, (err, stdout, stderr) => {
		if (err) console.log(err);
		if (stdout) console.log(stdout);
		if (stderr) console.log(stderr);
	});

	// copy project files
	const template = path.resolve(path.join(__dirname, '..', 'src', 'templates', 'typescript'));
	try {
		fs.cpSync(template, projectNameFolderPath, { recursive: true });
		console.log('Template files copied successfully.');
	} catch (error) {
		console.error('Error copying template files:', error);
	}
}

main();
