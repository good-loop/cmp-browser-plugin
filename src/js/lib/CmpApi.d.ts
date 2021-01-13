import { CustomCommands } from './CustomCommands';
export declare class CmpApi {
    private callResponder;
    private isServiceSpecific;
    private numUpdates;
    /**
     * @param {number} cmpId - IAB assigned CMP ID
     * @param {number} cmpVersion - integer version of the CMP
     * @param {boolean} isServiceSpecific - whether or not this cmp is configured to be service specific
     * @param {CustomCommands} [customCommands] - custom commands from the cmp
     */
    constructor(cmpId: number, cmpVersion: number, isServiceSpecific?: boolean, customCommands?: CustomCommands);
    private throwIfInvalidInt;
    /**
     * update - When the state of a CMP changes this function should be called
     * with the updated tc string and whether or not the UI is visible or not
     *
     * @param {string|null} encodedTCString - set a string to signal that
     * gdprApplies and that an encoded tc string is being passed.  If GDPR does
     * not apply, set to null.
     * @param {boolean} uiVisible - default false.  set to true if the ui is
     * being shown with this tc string update, this will set the correct values
     * for eventStatus and displayStatus.
     * @return {void}
     */
    update(encodedTCString: string | null, uiVisible?: boolean): void;
    /**
     * Disables the CmpApi from serving anything but ping and custom commands
     * Cannot be undone
     *
     * @return {void}
     */
    disable(): void;
}
