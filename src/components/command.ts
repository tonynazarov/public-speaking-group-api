import {Message} from "./message";
import {State} from "./config";
import {Scheme} from "./strategy";

export interface Command {
    run(message: Message): any;
}

export class CommandDecorator implements Command {
    private readonly command: Command;
    private readonly data: any;

    constructor(command: Command) {
        this.command = command;
    }

    run(message: Message): object {

        if (this.command instanceof SchemaCommand) {
            return {
                "result": "error",
                "message": "Invalid method",
                "availableMethods": this.command.run(this.data),
                "method": message.method
            };
        }


        let state: State = State.getInstance();
        state.setCurrentState(this.command.constructor.name);


        return {
            "result": "success",
            "message": this.command.run(this.data),
            "type": message.method
        };
    }
}

export class SchemaCommand implements Command {
    private readonly schema: Scheme;

    constructor(schema: Scheme) {
        this.schema = schema;
    }

    run(message: Message): any {
        return Object.keys(this.schema)
    }
}