import { generateSupplier } from '@common/utils';

import homeHandler from './homeHandler';
import homeInit from './homeInit';
import homeSupply from './homeSupply';

export const useHome = generateSupplier(homeInit, homeSupply, homeHandler);
