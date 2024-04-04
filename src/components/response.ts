export class Response {
    protected readonly _result: string;
    protected readonly _message: string;
    protected readonly _method: string | null;

    constructor(
        result: string,
        message: string,
        method: string | null
    ) {
        this._result = result;
        this._message = message;
        this._method = method;
    }

    public get result(): string {
        return this._result;
    }

    public get message(): string {
        return this._message;
    }

    public get method(): string | null {
        return this._method;
    }

    public toString(): string {
        return JSON.stringify({
            result: this.result,
            message: this.message,
            method: this.method,
        })
    }
}

export class ErrorResponse extends Response {

    constructor(
        message: string,
        method: string | null = null
    ) {
        super('error', message, method);
    }

    public toString(): string {
        return JSON.stringify({
            result: this.result,
            message: this.message,
            method: this.method,
        })
    }
}

export class InvalidSyntaxResponse extends ErrorResponse {

    constructor(
        message: string,
        method: string | null = null
    ) {
        super(message, method);
    }

    public toString(): string {
        return JSON.stringify({
            result: this.result,
            message: this.message,
        })
    }
}


export class ValidationResponse extends ErrorResponse {
    private readonly _errors: string[];

    constructor(
        method: string,
        errors: any,
        message: string = 'Bad request',
    ) {
        super(message, method);
        this._errors = errors;
    }

    public get errors(): any {
        return this._errors;
    }

    public toString(): string {
        return JSON.stringify({
            result: this.result,
            message: this.message,
            method: this.method,
            errors: this.errors,
        })
    }
}

