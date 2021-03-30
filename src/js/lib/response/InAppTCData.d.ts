import { PurposeRestrictionVector, Vector } from '@iabtcf/core';
import { Restrictions } from './Restrictions';
import { TCData } from './TCData';
/**
 * InAppTCData response builder
 */
export declare class InAppTCData extends TCData {
    constructor(vendorIds?: number[]);
    /**
     * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
     * @override
     * @param {Vector} vector
     * @return {string}
     */
    protected createVectorField(vector: Vector): string;
    /**
     * Creates a restrictions object given a PurposeRestrictionVector
     * @override
     * @param {PurposeRestrictionVector} purpRestrictions
     * @return {Restrictions}
     */
    protected createRestrictions(purpRestrictions: PurposeRestrictionVector): Restrictions;
}
