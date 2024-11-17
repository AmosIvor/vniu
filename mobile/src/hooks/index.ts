import {UseApps} from './app/index';
import {Authen} from './auth';
import {Invest} from './invest';
import {useSnapShotPhoto} from './kyc/useSnapShotPhoto';

export const Hooks = {App: UseApps, Invest, Authen, Kyc: useSnapShotPhoto};
