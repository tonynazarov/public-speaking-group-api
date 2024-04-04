import {Message} from "../../components/message";
import {getNextMondayDate, getTimeUntilTheEndOfBreak} from "./dates";
import {Command} from "../../components/command";
import {State} from "../../components/config";
import {DateTime} from "luxon";

const questions = [
    'If you could deliver a speech to any historical figure, who would it be and why?',
    'What\'s the most memorable presentation or speech you\'ve ever witnessed, and what made it stand out to you?',
    'Imagine you\'re tasked with giving a TED Talk tomorrow on a topic of your choice. What would your talk be about, and why?',
    'How do you typically prepare for a public speaking engagement? Do you have any rituals or practices that help calm your nerves?',
    'If you had to give a spontaneous speech on a topic you know nothing about, how would you approach it?',
    'What advice would you give to someone who struggles with stage fright or anxiety when speaking in front of an audience?',
    'Can you recall a time when you had to improvise during a presentation? How did you handle it, and what did you learn from the experience?',
    'What role do you think humor plays in effective public speaking? Do you intentionally incorporate humor into your speeches, and if so, how?',
    'Reflecting on your past speaking experiences, what\'s one mistake you\'ve made that taught you a valuable lesson about communication?',
    'If you could attend any public speaking event, past or present, which one would you choose and why?'
]

const warmupQuestions = [
    'Tell me about your fear',
];

export class GetDefaultQuestionCommand implements Command {
    run(): string {
        const length = questions.length;
        const random = Math.floor(Math.random() * length)

        let state = State.getInstance();
        state.setQuestionId(random);

        return questions[random];
    }
}

export class GetRandomQuestionCommand implements Command {
    run(): string {
        const length = questions.length;
        const random = Math.floor(Math.random() * length)

        let state = State.getInstance();
        state.setQuestionId(random);

        return questions[random];
    }
}

export class RunQuestionCommand implements Command {
    run(): string {
        let state = State.getInstance();

        return questions[state.getQuestionId()];
    }
}

export class GetWarmUpQuestionCommand implements Command {
    run(): string {
        const length = warmupQuestions.length;
        const random = Math.floor(Math.random() * length)

        return warmupQuestions[random];
    }
}

export class GetNextEventStartTimeCommand implements Command {
    run(message: Message): DateTime {
        return getNextMondayDate();
    }
}

export class RunMeetupSpeakingStageCommand implements Command {
    run(): void {

    }
}

export class RunPauseBreakMinutesCommand implements Command {
    run(): number {
        return getTimeUntilTheEndOfBreak();
    }
}


export class GetSyncCurrentStateCommand implements Command {
    run(): string {
        return State.getInstance().getCurrentState();
    }
}
