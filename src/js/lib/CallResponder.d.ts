import { CommandCallback } from './command';
import { CustomCommands } from './CustomCommands';
export declare const API_KEY = "__tcfapi";
export declare type APIArgs = [string, number, CommandCallback, ...any[]];
export declare class CallResponder {
    private callQueue;
    private readonly customCommands;
    constructor(customCommands?: CustomCommands);
    /**
     * Handler for all page call commands
     * @param {string} command
     * @param {number} version
     * @param {CommandCallback} callback
     * @param {any} [param]
     */
    apiCall(command: string, version: number, callback: CommandCallback, ...params: any): void | never;
    /**
     * purgeQueuedCalls - if there have been calls that are queued up this method
     * will go through and call them in a FIFO order
     *
     * @return {void}
     */
    purgeQueuedCalls(): void;
    /**
     * Checks to see if the command exists in the set of custom commands
     *
     * @param {string} command - command to check
     * @return {boolean} - whether or not this command is a custom command
     */
    private isCustomCommand;
    /**
     * Checks to see if the command exists in the set of TCF Commands
     *
     * @param {string} command - command to check
     * @return {boolean} - whether or not this command is a built-in command
     */
    private isBuiltInCommand;
}
