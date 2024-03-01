#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
(async () => {
    const response = await (0, prompts_1.default)({
        type: 'number',
        name: 'value',
        message: 'How old are you?',
        validate: (value) => (value < 18 ? `Nightclub is 18+ only` : true),
    });
    console.log(response); // => { value: 24 }
})();
