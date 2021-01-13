import { CommandCallback } from './command/CommandCallback';
interface EventItem {
    callback: CommandCallback;
    param?: any;
    next?: CommandCallback;
}
export declare class EventListenerQueue {
    private eventQueue;
    private queueNumber;
    add(eventItems: EventItem): number;
    remove(listenerId: number): boolean;
    exec(): void;
    clear(): void;
    get size(): number;
}
export {};
