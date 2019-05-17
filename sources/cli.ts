import { Module, ConfigurationChecker } from './Configuration';
import * as path from 'path';
import * as Fs from 'fs';
import * as rimraf from 'rimraf';
import * as tar from 'tar';

import chalk   from 'chalk';
import moment = require('moment');
import * as fs from 'fs';

const log_err = (e: Error): void => {
    console.error(`Error: ${chalk.red(e.message)}`);
    process.exit(1);
};

const soft_log_err = (e: Error): void => {
    console.error(`Error: ${chalk.red(e.message)}`);
};

if (process.argv.length !== 4) {
    console.error(`Usage: ${chalk.blue('portalize')} ${chalk.green('<action>')} ${chalk.yellow('<configuration_file>')}`);
    process.exit(1);
}

const configuration_path: string = path.resolve(process.argv[3]);
const action: string = process.argv[2];
const directory_name: string = path.dirname(configuration_path);
let configuration: Module[];
let main: Module;

if (['init', 'info', 'dismantle', 'freeze'].indexOf(action) === -1) {
    console.log(`Error: Invalid action ${chalk.red(action)}`);
    process.exit(1);
}

try {
    configuration = ConfigurationChecker(JSON.parse(Fs.readFileSync(configuration_path).toString()));
    for (const module of configuration) {
        module.path = path.join(directory_name, module.path);
        if (module.name === 'main') main = module;
    }

    if (!main) {
        console.error(`Missing mandatory ${chalk.bold('main')} module in ${chalk.yellow(configuration_path)}`);
        process.exit(1);
    }

} catch (e) {
    log_err(e);
}

switch (action) {
    case 'init':

        try {
            console.log(`[${chalk.green('+')}] Creating ${chalk.blue('main')} module directory at ${chalk.yellow(main.path)}`);
            Fs.mkdirSync(main.path);

            for (const module of configuration) {
                if (module.name !== 'main') {
                    console.log(`[${chalk.green('+')}] Creating ${chalk.green(module.name)} module link at ${chalk.yellow(module.path)}`);
                    Fs.symlinkSync(main.path, module.path);
                    console.log(`[${chalk.green('+')}] Creating ${chalk.green(module.name)} module directory at ${chalk.yellow(path.join(main.path, module.name))}`);
                    Fs.mkdirSync(path.join(main.path, module.name));
                }
            }

            console.log(`[${chalk.green('+')}] Saving configuration at ${chalk.yellow(path.join(main.path, 'config.json'))}`);
            Fs.writeFileSync(path.join(main.path, 'config.json'), JSON.stringify(configuration, null, 4));
            console.log(`[${chalk.green('+')}] Creating event directory at ${chalk.yellow(path.join(main.path, '.events'))}`);
            Fs.mkdirSync(path.join(main.path, '.events'));
        } catch (e) {
            soft_log_err(e);
        }

        break ;
    case 'dismantle':

        try {
            for (const module of configuration) {
                if (module.name !== 'main') {
                    try {
                        console.log(`[${chalk.red('-')}] Removing ${chalk.green(module.name)} module link at ${chalk.yellow(module.path)}`);
                        Fs.unlinkSync(module.path);
                    } catch (e) {
                        soft_log_err(e);
                    }
                }
            }

            console.log(`[${chalk.red('-')}] Removing ${chalk.blue('main')} module directory at ${chalk.yellow(main.path)}`);
            rimraf.sync(main.path);
        } catch (e) {
            log_err(e);
        }

        break ;

    case 'info':

        let healthy: boolean = true;
        if (Fs.existsSync(main.path)) {
            console.log(`[${chalk.blue('i')}] ${chalk.blue('main')} module directory exists at ${chalk.yellow(main.path)}`);
        } else {
            console.log(`[${chalk.red('i')}] ${chalk.blue('main')} module directory is missing at ${chalk.yellow(main.path)}`);
            healthy = false;
        }

        for (const module of configuration) {
            if (module.name !== 'main') {
                if (Fs.existsSync(module.path)) {
                    console.log(`[${chalk.blue('i')}] ${chalk.green(module.name)} module link exists at ${chalk.yellow(module.path)}`);
                } else {
                    console.log(`[${chalk.red('i')}] ${chalk.green(module.name)} module link is missing at ${chalk.yellow(module.path)}`);
                    healthy = false;
                }
            }
        }

        if (!healthy) {
            console.log();
            console.log(`[${chalk.red('i')}] Try running ${chalk.yellow('dismantle')} and ${chalk.yellow('init')} again`);
        }

        break ;

    case 'freeze':

        const date = moment(Date.now()).format('DD_MM_YYYY_HH_mm_ss');

        const archive_name = (process.env.PORTALIZE_ARCHIVE_NAME || 'portalize.archive') + `.${date}.tar.gz`;
        const portal_content = fs.readdirSync(main.path);

        tar.c({
            gzip: true,
            file: archive_name,
            C: main.path
        }, portal_content)
            .then((): void => {
                console.log(`[${chalk.green('+')}] Created archive ${archive_name}`);
            });

}
