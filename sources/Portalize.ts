import * as Fs      from 'fs';
import * as Path    from 'path';
import { sha3_224 } from 'js-sha3';

/**
 * Configuration for method calls
 */
export interface CallConfig {
    module?: string;
    desc?: string;
}

/**
 * Structure of Event files
 */
export interface Event {
    file: string;
    module: string;
    action: string;
    desc: string;
}

/**
 * Arguments for the require method
 */
export interface Requirement {
    from: string;
    to?: string;
    file: string;
    desc?: string;
    action: string;
}

export class Portalize {

    private static instance: Portalize;
    private portal: string;
    private module: string;

    private constructor() {
    }

    /**
     * Static instance getter. Portalize is a singleton.
     */
    static get get(): Portalize {
        return (Portalize.instance || (Portalize.instance = new Portalize()));
    }

    /**
     * Sets current module's portal path. Should be called before `setModuleName`
     *
     * @param portal
     */
    public setPortal(portal: string): void {
        this.portal = portal;
        if (!Fs.existsSync(this.portal)) {
            throw new Error(`Portal ${this.portal} does no exist`);
        }
    }

    /**
     * Sets current module name. `setPortal` should be called first.
     *
     * @param name
     */
    public setModuleName(name: string): void {
        if (!this.portal) {
            throw new Error('Set portal before module name.');
        }
        this.module = name;
        if (!Fs.existsSync(Path.join(this.portal, this.module)) || !Fs.statSync(Path.join(this.portal, this.module)).isDirectory()) {
            throw new Error(`Portal ${this.portal} does no exist`);
        }
    }

    /**
     * Adds file.
     * If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module.
     * If `desc` is provided, description will be saved in event, otherwise event will have the end checksum of the file as description. Useful to tag events that will be required in the future.
     *
     * @param file
     * @param data
     * @param config
     */
    public add<T = any>(file: string, data: T, config?: CallConfig): void {
        this.ready();

        if (!config) {
            config = {};
        }

        if (!config.module) {
            config.module = this.module;
        } else {
            if (!Fs.existsSync(Path.join(this.portal, config.module))) {
                throw new Error(`Specified module ${config.module} does not exist`);
            }
        }

        const file_path: string = Path.join(this.portal, config.module, file);
        if (Fs.existsSync(file_path)) {
            throw new Error(`Cannot create ${file_path}, file exists.`);
        }

        const write_data: string = JSON.stringify(data);

        Fs.writeFileSync(file_path, write_data);

        this.event(Path.join(config.module, file), 'add', config.desc || sha3_224(write_data));
    }

    /**
     * Sets file.
     * If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module.
     * If `desc` is provided, description will be saved in event, otherwise event will have the end checksum of the file as description. Useful to tag events that will be required in the future.
     *
     * @param file
     * @param data
     * @param config
     */
    public set<T = any>(file: string, data: T, config?: CallConfig): void {
        this.ready();

        if (!config) {
            config = {};
        }

        if (!config.module) {
            config.module = this.module;
        } else {
            if (!Fs.existsSync(Path.join(this.portal, config.module))) {
                throw new Error(`Specified module ${config.module} does not exist`);
            }
        }

        const file_path: string = Path.join(this.portal, config.module, file);

        const write_data: string = JSON.stringify(data);

        Fs.writeFileSync(file_path, write_data);

        this.event(Path.join(config.module, file), 'set', config.desc || sha3_224(write_data));
    }

    /**
     * Gets file.
     * If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module.
     *
     * @param file
     * @param config
     */
    public get<T = any>(file: string, config?: CallConfig): T {
        this.ready();

        if (!config) {
            config = {};
        }

        if (!config.module) {
            config.module = this.module;
        } else {
            if (!Fs.existsSync(Path.join(this.portal, config.module))) {
                throw new Error(`Specified module ${config.module} does not exist`);
            }
        }

        const file_path: string = Path.join(this.portal, config.module, file);

        const data: Buffer = Fs.readFileSync(file_path);
        return JSON.parse(data.toString()) as T;
    }

    /**
     * Removes file.
     * If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module.
     * If `desc` is provided, description will be saved in event, otherwise event will have 'rm' as description. Useful to tag events that will be required in the future.
     *
     * @param file
     * @param config
     */
    public rm(file: string, config?: CallConfig): void {
        this.ready();

        if (!config) {
            config = {};
        }

        if (!config.module) {
            config.module = this.module;
        } else {
            if (!Fs.existsSync(Path.join(this.portal, config.module))) {
                throw new Error(`Specified module ${config.module} does not exist`);
            }
        }

        const file_path: string = Path.join(this.portal, config.module, file);

        Fs.unlinkSync(file_path);

        this.event(Path.join(config.module, file), 'rm', config.desc || 'rm');
    }

    /**
     * Check if the given requirements have occured. If `desc` is provided, check if any event has the exact same `desc`.
     * `to` and `from` can be different. `from` defines the module that emits the action, `to` defines the module containing the file.
     * If `to` is not provided, `to` == `from`
     *
     * @param requirement
     */
    public requires(requirement: Requirement): boolean {
        if (!requirement.to) {
            requirement.to = requirement.from;
        }

        const events_dir: string = Path.join(this.portal, '.events');
        console.log(Path.join(this.portal, '.events', `${requirement.from}_${requirement.to}-${requirement.file}_${requirement.action}`));
        const events: string[] = Fs.readdirSync(events_dir)
            .map((event: string): string => Path.join(this.portal, '.events', event))
            .filter((event: string): boolean =>
                event.indexOf(Path.join(this.portal, '.events', `${requirement.from}_${requirement.to}-${requirement.file}_${requirement.action}`)) === 0);
        console.log(events);
        if (!requirement.desc && events.length) {
            return true;
        }

        for (const event of events) {
            const data: Event = JSON.parse(Fs.readFileSync(event).toString());
            if (data.desc === requirement.desc) return true;
        }

        return false;
    }

    private ready(): void {
        if (!(!!this.portal && !!this.module)) {
            throw new Error('Portalize needs to be intialized: use setPortal and setModuleName !');
        }
    }

    private event(file: string, action: string, desc: string): void {
        const now: number = Date.now();

        let event_path: string = Path.join(this.portal, '.events', `${this.module}_${file.replace('/', '-')}_${action}_${now}.json`);
        let idx: number = 0;

        while (Fs.existsSync(event_path)) {
            event_path = Path.join(this.portal, '.events', `${this.module}_${file.replace('/', '-')}_${action}_${now}_${idx}.json`);
            ++idx;
        }

        Fs.writeFileSync(event_path, JSON.stringify({
            file,
            module: this.module,
            action,
            desc
        }));
    }

}
