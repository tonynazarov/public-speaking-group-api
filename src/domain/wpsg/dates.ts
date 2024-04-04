import {DateTime} from "luxon";
import {IfValid, Invalid, Valid} from "luxon/src/_util";

export function getDistanceToNow(
    dateTo: DateTime
): IfValid<number, typeof NaN, Valid> | IfValid<number, typeof NaN, Invalid> {
    let dateFrom = DateTime.now();

    return dateTo.diff(dateFrom).milliseconds;
}

export function getNextMondayDate(): DateTime {
    const date = new Date()
    date.setHours(18)
    date.setMinutes(15)
    date.setSeconds(0)
    const clonedDate = new Date(date.getTime());

    const numOfDays = ((7 - clonedDate.getDay()) % 7 + 1) % 7;
    const newDate = clonedDate.getDate() + numOfDays;

    clonedDate.setDate(newDate);

    return DateTime.fromJSDate(clonedDate);
}

export function getTimeUntilTheEndOfBreak(): number {
    return 1000 * 60 * 10;
}

export function getDistanceAsString(distance: number): string {
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}