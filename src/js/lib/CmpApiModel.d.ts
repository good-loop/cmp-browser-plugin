import { CmpStatus, DisplayStatus, EventStatus } from './status';
import { EventListenerQueue } from './EventListenerQueue';
import { TCModel } from '@iabtcf/core';
/**
 * Class holds shareable data across cmp api and provides change event listener for TcModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export declare class CmpApiModel {
    static readonly apiVersion = "2";
    static tcfPolicyVersion: number;
    static readonly eventQueue: EventListenerQueue;
    static cmpStatus: CmpStatus;
    static disabled: boolean;
    static displayStatus: DisplayStatus;
    static cmpId: number;
    static cmpVersion: number;
    static eventStatus: EventStatus;
    static gdprApplies: boolean;
    static tcModel: TCModel;
    static tcString: string;
    static reset(): void;
}
