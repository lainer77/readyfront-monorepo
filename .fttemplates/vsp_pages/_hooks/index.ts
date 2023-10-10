import { generateSupplier } from '@common/utils';

import <FTName | camelcase>Handler from './<FTName | camelcase>Handler';
import <FTName | camelcase>Init from './<FTName | camelcase>Init';
import <FTName | camelcase>Supply from './<FTName | camelcase>Supply';

export const use<FTName | capitalize> = generateSupplier(<FTName | camelcase>Init, <FTName | camelcase>Supply, <FTName | camelcase>Handler);
