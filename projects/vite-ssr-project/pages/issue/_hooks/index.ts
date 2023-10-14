import { generateSupplier } from '@common/utils';

import issueHandler from './issueHandler';
import issueInit from './issueInit';
import issueSupply from './issueSupply';

export const useIssue = generateSupplier(issueInit, issueSupply, issueHandler);
