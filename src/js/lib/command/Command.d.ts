import { CommandCallback } from './CommandCallback';
export declare abstract class Command {
    protected listenerId: number;
    protected callback: CommandCallback;
    protected next: CommandCallback;
    protected param: any;
    protected success: boolean;
    constructor(callback: CommandCallback, param?: any, listenerId?: number, next?: CommandCallback);
    protected invokeCallback(response: any): void;
    protected abstract respond(): void;
}
