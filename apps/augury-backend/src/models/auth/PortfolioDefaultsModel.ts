import { Types } from 'mongoose';
import PortfolioDefaultSchema from '../../config/schemas/PortfolioDefaultSchema';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';

const getDefaults = async (id: string | Types.ObjectId) => {
  const defaults = await PortfolioDefaultSchema.findOne({ userId: id });

  if (!defaults) {
    throw new ApiError(
      'Unable to find defaults for user!',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return defaults;
};

export default module.exports = {
  getDefaults,
};
