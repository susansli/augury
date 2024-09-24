import mongoose from 'mongoose';
import PortfolioGroup from '../../config/interfaces/PortfolioGroup';
import PortfolioGroupSchema from '../../config/schemas/PortfolioGroup';

const getPortfolioGroup = async (
  id: mongoose.Types.ObjectId
): Promise<PortfolioGroup> => {
  const portfolioGroup = await PortfolioGroupSchema.findById(id);

  if (!portfolioGroup) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group does not exist.');
    throw new Error('This portfolio group does not exist.');
  }

  return portfolioGroup;
};

const createPortfolioGroup = async (
  data: PortfolioGroup
): Promise<PortfolioGroup> => {
  const portfolioGroup = await PortfolioGroupSchema.create(data);

  if (!portfolioGroup) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group could not be created.');
    throw new Error('This portfolio group could not be created.');
  }

  return portfolioGroup;
};

const updatePortfolioGroup = async (
  id: mongoose.Types.ObjectId,
  data: PortfolioGroup
): Promise<PortfolioGroup> => {
  const portfolioGroup = await PortfolioGroupSchema.findById(id);

  if (!portfolioGroup) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group does not exist.');
    throw new Error('This portfolio group does not exist.');
  }

  if (data.name) portfolioGroup.name = data.name;
  if (data.color) portfolioGroup.color = data.color;
  if (data.userId) portfolioGroup.userId = data.userId;
  const updatedPortfolioGroup = await portfolioGroup.save();

  if (!updatedPortfolioGroup) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group could not be updated.');
    throw new Error('This portfolio group could not be updated.');
  }

  return updatedPortfolioGroup;
};

const deletePorfolioGroup = async (
  id: mongoose.Types.ObjectId
): Promise<PortfolioGroup> => {
  const portfolioGroup = await PortfolioGroupSchema.findByIdAndDelete(id);

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
  updatePortfolioGroup,
  deletePorfolioGroup,
};
