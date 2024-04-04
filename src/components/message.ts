class Collection {
    messages: Array<string> = [];

    constructor(message: string) {
        this.messages.push(message);
    }
}

interface Message {
    readonly method: string,
    readonly data?: any,
}

export {Message, Collection};

