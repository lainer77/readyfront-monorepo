#!/usr/bin/env node

import { Command, Option } from 'commander';
import axios from 'axios';

const program = new Command();
const GATEWAY_API_URL = process.env.GATEWAY_API_URL;

program
    .command('get')
    .description('Retrieve the secret')
    .addOption(new Option('-p, --password <password>', 'Password for secret').required())
    .addOption(new Option('-k, --key <fileKey>', 'Your file key').required())
    .action(async (options) => {
        try {
            const response = await axios.get(`${GATEWAY_API_URL}/secret?fileKey=${options.key}`, {
                headers: {
                    password: options.password,
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

// If no command is provided, it will output help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
