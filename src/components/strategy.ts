import {
    Command,
    SchemaCommand
} from "./command";

export interface ProjectStrategy {
    resolve(method: string): Command;

    get scheme(): Scheme;
}

export interface Scheme {
    [key: string]: any;
}


export abstract class Strategy {
    protected schema: Scheme = {};

    public get scheme(): Scheme {
        return this.schema;
    }

    public resolve(method: string): Command {
        if (!this.schema.hasOwnProperty(method)) {
            return new SchemaCommand(this.schema)
        }

        return new this.schema[method];
    }
}
