#!/usr/bin/env node

import { Command, Option } from 'commander';
import axios from 'axios';
import fs from 'fs';

const program = new Command();
const GATEWAY_API_URL = process.env.GATEWAY_API_URL;
const TOKEN_STORAGE_PATH = './.token';

program
    .command('login')
    .description('Login to get a token')
    .addOption(new Option('-u, --username <username>', 'Username').required())
    .addOption(new Option('-p, --password <password>', 'Password').required())
    .action(async (options) => {
        // ... Cognito 로그인 로직
        // 로그인에 성공하면, 토큰을 TOKEN_STORAGE_PATH에 저장~!
    });

program
    .command('get')
    .description('Retrieve the secret')
    .addOption(new Option('-k, --key <fileKey>', 'Your file key').required())
    .action(async (options) => {
        const token = fs.readFileSync(TOKEN_STORAGE_PATH, 'utf-8');
        try {
            const response = await axios.get(`${GATEWAY_API_URL}/secret?fileKey=${options.key}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Your secret is:', response.data.secret);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error('Error:', error.response.data.message);
            } else {
                console.error('Failed to retrieve the secret:', error.message);
            }
        }
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
