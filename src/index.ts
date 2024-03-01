#!/usr/bin/env node

import prompts from 'prompts';

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
	]);

	console.log(response);
}

main();
