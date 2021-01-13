import { CmpStatus, DisplayStatus } from '../status';
import { Response } from './Response';
/**
 * Ping response builder
 */
export declare class Ping extends Response {
    /**
     * true - CMP main script is loaded
     * false - still running stub
     */
    cmpLoaded: boolean;
    /**
     * see Ping Status Codes in following table
     */
    cmpStatus: CmpStatus;
    /**
     * see Ping Status Codes in following table
     */
    displayStatus: DisplayStatus;
    /**
     * version of the CMP API that is supported; e.g. “2”
     */
    apiVersion: string;
    /**
     * Version of the GVL currently loaded by the CMP
     * undefined if still the stub
     */
    gvlVersion: number;
    constructor();
}
