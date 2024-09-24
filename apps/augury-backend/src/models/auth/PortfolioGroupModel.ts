import mongoose from 'mongoose';
import PortfolioGroup from '../../config/interfaces/PortfolioGroup';
import { Color } from '../../config/interfaces/PortfolioGroup';
import PortfolioGroupSchema from '../../config/schemas/PortfolioGroup';

const getPortfolioGroup = async (id: string): Promise<PortfolioGroup> => {
  const portfolioGroup: PortfolioGroup = await PortfolioGroupSchema.findById(
    new mongoose.Types.ObjectId(id)
  );

  if (!portfolioGroup) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group does not exist.');
    throw new Error('This portfolio group does not exist.');
  }

  return portfolioGroup;
};

const createPortfolioGroup = async (
  name: string,
  color: Color,
  userId: string
): Promise<PortfolioGroup> => {
  try {
    const portfolioGroup = await PortfolioGroupSchema.create({
      name: name, // Set the name
      color: color || Color.WHITE, // Set the color (optional, defaults to 'white')
      userId: new mongoose.Types.ObjectId(userId), // Set the userId
    });

    if (!portfolioGroup) {
      // TODO: Replace when merged with error handling middlware
      // throw new ApiError('This portfolio group could not be created.');
      throw new Error('This portfolio group could not be created.');
    }

    return portfolioGroup;
  } catch (error) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group could not be created.');
    throw new Error('This portfolio group could not be created.');
  }
};

const updatePortfolioGroup = async (
  id: string,
  name: string,
  color: Color,
  userId: string
): Promise<PortfolioGroup> => {
  try {
    const portfolioGroup: PortfolioGroup = await PortfolioGroupSchema.findById(
      new mongoose.Types.ObjectId(id)
    );

    if (!portfolioGroup) {
      // TODO: Replace when merged with error handling middlware
      // throw new ApiError('This portfolio group does not exist.');
      throw new Error('This portfolio group does not exist.');
    }

    if (name) portfolioGroup.name = name;
    if (color) portfolioGroup.color = color;
    if (userId) portfolioGroup.userId = new mongoose.Types.ObjectId(userId);
    const updatedPortfolioGroup = await portfolioGroup.save();

    if (!updatedPortfolioGroup) {
      // TODO: Replace when merged with error handling middlware
      // throw new ApiError('This portfolio group could not be updated.');
      throw new Error('This portfolio group could not be updated.');
    }

    return updatedPortfolioGroup;
  } catch (error) {
    // TODO: Replace when merged with error handling middlware
    // throw new ApiError('This portfolio group could not be updated.');
    throw new Error('This portfolio group could not be updated.');
  }
};

export default module.exports = {
  getPortfolioGroup,
  createPortfolioGroup,
  updatePortfolioGroup,
};
