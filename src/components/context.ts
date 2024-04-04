import {ProjectStrategy, Scheme} from "./strategy";
import {Command, CommandDecorator} from "./command";
import Validator from "validatorjs";
import {InvalidSyntaxError, ValidationError} from "./error";

export class Context {
    private strategy: ProjectStrategy;

    constructor(strategy: ProjectStrategy) {
        this.strategy = strategy;
    }

    public resolve(method: string): Command {
        let command: Command = this.strategy.resolve(method);

        return new CommandDecorator(command);
    }

    public run(data: any): string {
        let message: any = null;
        try {
            message = JSON.parse(data.toString());
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new InvalidSyntaxError();
            }

            throw error;
        }

        let rules = {
            method: 'required',
        };

        let validation = new Validator(message, rules);
        if (validation.fails()) {
            throw new ValidationError(
                validation.errors.all(),
                message.method
            )
        }

        let response: object = this.resolve(
            message.method
        ).run(message);

        return JSON.stringify(response);
    }

    public getAvailableCommands(): Scheme {
        return this.strategy.scheme
    }
}