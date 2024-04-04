import {InvalidSyntaxResponse, ValidationResponse} from "./response";

export class InvalidSchemaMethod extends Error {

}

export class InvalidSyntaxError extends Error {

    constructor() {
        super();
        this.message = 'Invalid JSON'
    }
}

export class ValidationError extends Error {
    private readonly _method: string;
    private readonly _errors: any;

    constructor(errors: any, method: string) {
        super();
        this.message = 'Validation error'
        this._method = method;
        this._errors = errors;
    }

    public get errors(): any {
        return this._errors;
    }

    public get method(): string {
        return this._method;
    }
}

export class ErrorHandler {
    public static resolveError(error: any, cb: (message: string) => void): void {
        console.log('error: %s', error)

        if (error instanceof InvalidSyntaxError) {
            let response = new InvalidSyntaxResponse(
                error.message
            );


            cb(response.toString());

            return;
        }

        if (error instanceof ValidationError) {
            let response = new ValidationResponse(
                error.method,
                error.errors,
                error.message
            );

            cb(response.toString());

            return;
        }

        throw error;
    }
}