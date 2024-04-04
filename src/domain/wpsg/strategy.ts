import {Scheme} from "../../components/strategy";
import {Strategy} from "../../components/strategy";
import {
    GetDefaultQuestionCommand,
    GetNextEventStartTimeCommand,
    GetRandomQuestionCommand,
    GetSyncCurrentStateCommand,
    GetWarmUpQuestionCommand,
    RunMeetupSpeakingStageCommand,
    RunPauseBreakMinutesCommand,
    RunQuestionCommand,
} from "./command";

export class WpsgStrategy extends Strategy {
    protected schema: Scheme = {
        'GetNextEventStartTimeCommand': GetNextEventStartTimeCommand,
        'GetDefaultQuestionCommand': GetDefaultQuestionCommand,
        'GetRandomQuestionCommand': GetRandomQuestionCommand,
        'RunQuestionCommand': RunQuestionCommand,
        'GetWarmUpQuestionCommand': GetWarmUpQuestionCommand,
        'RunMeetupSpeakingStageCommand': RunMeetupSpeakingStageCommand,
        'GetSyncCurrentStateCommand': GetSyncCurrentStateCommand,
        'RunPauseBreakMinutesCommand': RunPauseBreakMinutesCommand,
    };

    public get scheme(): Scheme {
        return this.schema;
    }
}
