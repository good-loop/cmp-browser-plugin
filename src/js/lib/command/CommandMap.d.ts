import { PingCommand } from './PingCommand';
import { GetTCDataCommand } from './GetTCDataCommand';
import { GetInAppTCDataCommand } from './GetInAppTCDataCommand';
import { GetVendorListCommand } from './GetVendorListCommand';
import { AddEventListenerCommand } from './AddEventListenerCommand';
import { RemoveEventListenerCommand } from './RemoveEventListenerCommand';
import { TCFCommand } from './TCFCommand';
export declare class CommandMap {
    static [TCFCommand.PING]: typeof PingCommand;
    static [TCFCommand.GET_TC_DATA]: typeof GetTCDataCommand;
    static [TCFCommand.GET_IN_APP_TC_DATA]: typeof GetInAppTCDataCommand;
    static [TCFCommand.GET_VENDOR_LIST]: typeof GetVendorListCommand;
    static [TCFCommand.ADD_EVENT_LISTENER]: typeof AddEventListenerCommand;
    static [TCFCommand.REMOVE_EVENT_LISTENER]: typeof RemoveEventListenerCommand;
}
