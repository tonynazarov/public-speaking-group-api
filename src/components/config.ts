export interface Config {
    [key: string]: number | string | undefined | null;
}


export class State {
    private static instance: State;
    private readonly config: Config;

    private constructor() {
        this.config = {};
    }

    public static getInstance(): State {
        if (!State.instance) {
            State.instance = new State();
        }

        return State.instance;
    }


    public setQuestionId(id: number): this {
        this.config['questionId'] = id;

        return this;
    }

    public setCurrentState(state: string): this {
        this.config['state'] = state;

        return this;
    }

    public getQuestionId(): number {
        return <number>this.config['questionId'];
    }

    public getCurrentState(): string {
        return <string>this.config['state'];
    }
}
