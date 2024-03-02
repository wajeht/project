#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import cp from 'child_process';

async function main() {
	const response = await prompts([
		{
			type: 'text',
			name: 'name',
			message: 'Name?',
			validate: (value: string) => (value.length ? true : false),
		},
		{
			type: 'text',
			name: 'description',
			message: 'Description?',
			validate: (value: string) => (value.length ? true : false),
		},
		{
			type: 'text',
			name: 'author',
			message: 'Author?',
			validate: (value: string) => (value.length ? true : false),
		},
		{
			type: 'confirm',
			name: 'git',
			message: 'Git?',
			validate: (value: string) => (value.length ? true : false),
		},
		{
			type: 'confirm',
			name: 'typescript',
			message: 'Typescript?',
			validate: (value: string) => (value.length ? true : false),
		},
	]);

	const projectNameFolderPath = `${process.cwd()}/${response.name}`;

	// make folder
	if (!fs.existsSync(projectNameFolderPath)) {
		fs.mkdirSync(projectNameFolderPath, { recursive: true });
	} else {
		console.error('Folder exists already');
		return;
	}

	// git init
	try {
		const stdout = cp.execSync(`git init`, { cwd: projectNameFolderPath });
		console.log('\n' + stdout.toString());
	} catch (error) {
		console.error(`Error: ${error}`);
	}

	// copy project files
	const template = path.resolve(path.join(__dirname, '..', 'src', 'templates', 'typescript'));
	try {
		fs.cpSync(template, projectNameFolderPath, { recursive: true });
		console.log('Template files copied successfully.');
	} catch (error) {
		console.error('Error copying template files:', error);
	}

	// rename some stuff

	console.log('\n' + `cd ${response.name}`);
	console.log('npm install');
	console.log('npm run dev\n');
}

main();
