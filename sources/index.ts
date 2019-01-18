export {
    Portalize,
    Requirement,
    CallConfig,
    Event
} from './Portalize';

import { Portalize } from './Portalize';

Portalize.get.setPortal('./portal');
Portalize.get.setModuleName('test');

//Portalize.get.add('caca', {caca: 'caca'}, {desc: 'lol'});
Portalize.get.clean();
