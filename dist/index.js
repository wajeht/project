#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const child_process_1 = __importDefault(require("child_process"));
async function main() {
    const response = await (0, prompts_1.default)([
        {
            type: 'text',
            name: 'projectName',
            message: 'Project name?',
            validate: (value) => (value.length ? true : false),
        },
        {
            type: 'text',
            name: 'description',
            message: 'Description',
            validate: (value) => (value.length ? true : false),
        },
        {
            type: 'confirm',
            name: 'gitInit',
            message: 'Initilialize git?',
            validate: (value) => (value.length ? true : false),
        },
        {
            type: 'confirm',
            name: 'typescript',
            message: 'Typescript?',
            validate: (value) => (value.length ? true : false),
        },
    ]);
    const projectNameFolderPath = `${process.cwd()}/${response.projectName}`;
    // make folder
    if (!fs_1.default.existsSync(projectNameFolderPath)) {
        fs_1.default.mkdirSync(projectNameFolderPath, { recursive: true });
    }
    else {
        console.error('Folder exists already');
        return;
    }
    // git init
    child_process_1.default.exec(`git init`, { cwd: projectNameFolderPath }, (err, stdout, stderr) => {
        if (err)
            console.log(err);
        if (stdout)
            console.log(stdout);
        if (stderr)
            console.log(stderr);
    });
    // copy project files
    const template = path_1.default.resolve(path_1.default.join(__dirname, '..', 'src', 'templates', 'typescript'));
    try {
        fs_1.default.cpSync(template, projectNameFolderPath, { recursive: true });
        console.log('Template files copied successfully.');
    }
    catch (error) {
        console.error('Error copying template files:', error);
    }
}
main();
