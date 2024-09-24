import mongoose from 'mongoose';
import PortfolioGroup from '../../config/interfaces/PortfolioGroup';
import PortfolioGroupSchema from '../../config/schemas/PortfolioGroup';

const getPortfolioGroup = async (id: string): Promise<PortfolioGroup> => {
  const portfolioGroup: PortfolioGroup = await PortfolioGroupSchema.findOne(
    new mongoose.Types.ObjectId(id)
  );

  if (!portfolioGroup) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group does not exist.');
    throw new Error('This portfolio group does not exist.');
  }

  return portfolioGroup;
};

export default module.exports = {
  getPortfolioGroup,
};
