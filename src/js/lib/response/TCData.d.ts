import { PurposeRestrictionVector, Vector } from '@iabtcf/core';
import { BooleanVector } from './BooleanVector';
import { Restrictions } from './Restrictions';
import { Booleany } from './Booleany';
import { Response } from './Response';
import { EventStatus, CmpStatus } from '../status';
export declare class TCData extends Response {
    tcString: string;
    listenerId: number;
    eventStatus: EventStatus;
    cmpStatus: CmpStatus;
    isServiceSpecific: Booleany;
    useNonStandardStacks: Booleany;
    publisherCC: string;
    purposeOneTreatment: Booleany;
    outOfBand: {
        allowedVendors: BooleanVector | string;
        disclosedVendors: BooleanVector | string;
    };
    purpose: {
        consents: BooleanVector | string;
        legitimateInterests: BooleanVector | string;
    };
    vendor: {
        consents: BooleanVector | string;
        legitimateInterests: BooleanVector | string;
    };
    specialFeatureOptins: BooleanVector | string;
    publisher: {
        consents: BooleanVector | string;
        legitimateInterests: BooleanVector | string;
        customPurpose: {
            consents: BooleanVector | string;
            legitimateInterests: BooleanVector | string;
        };
        restrictions: Restrictions;
    };
    /**
     * Constructor to create a TCData object from a TCModel
     * @param {number[]} vendorIds - if not undefined, will be used to filter vendor ids
     * @param {number} listenerId - if there is a listenerId to add
     */
    constructor(vendorIds?: number[], listenerId?: number);
    /**
     * Creates a restrictions object given a PurposeRestrictionVector
     * @param {PurposeRestrictionVector} purpRestrictions
     * @return {Restrictions}
     */
    protected createRestrictions(purpRestrictions: PurposeRestrictionVector): Restrictions;
    /**
     * Creates a string bit field with a value for each id where each value is
     * '1' if its id is in the passed in vector Can be overwritten to return a
     * string
     * @param {Vector} vector
     * @param {number[]} ids filter
     * @return {BooleanVector | string}
     */
    protected createVectorField(vector: Vector, ids?: number[]): BooleanVector | string;
}
