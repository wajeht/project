#!/usr/bin/env node
import prompts from 'prompts';
import fs from 'fs';

async function main() {
	const response = await prompts([
		{
			type: 'text',
			name: 'projectName',
			message: 'Project name?',
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

	// make folder
	if (response.projectName) {
		const projectNameFolderPath = process.cwd() + `/${response.projectName}`;
		if (!fs.existsSync(projectNameFolderPath)) {
			fs.mkdirSync(projectNameFolderPath, { recursive: true });
		}
	}

	console.log(process.cwd());
	console.log(response);
}

main();
