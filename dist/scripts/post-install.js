#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const projectPath = path_1.default.resolve(path_1.default.join(os_1.default.homedir(), 'project'));
if (!fs_1.default.existsSync(projectPath)) {
    fs_1.default.mkdirSync(projectPath, { recursive: true });
}
