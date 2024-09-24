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

const createPortfolioGroup = async (id: string): Promise<PortfolioGroup> => {
  const portfolioGroup: PortfolioGroup = new PortfolioGroupSchema({
    name: 'Tech Investments', // Set the name
    color: 'blue', // Set the color (optional, defaults to 'white')
    userId: userId, // Set the userId
  });

  if (!portfolioGroup) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group does not exist.');
    throw new Error('This portfolio group does not exist.');
  }

  return portfolioGroup;
};

export default module.exports = {
  getPortfolioGroup,
  createPortfolioGroup,
};
