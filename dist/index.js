#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
async function main() {
    const response = await (0, prompts_1.default)([
        {
            type: 'text',
            name: 'projectName',
            message: 'Project name?',
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
    console.log(response);
}
main();
