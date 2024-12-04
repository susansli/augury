import { Request, Response } from 'express';
import UserController from '../../../augury-backend/src/controllers/auth/UserController';
import UserModel from '../../../augury-backend/src/models/auth/UserModel';
import PortfolioDefaultModel from '../../../augury-backend/src/models/auth/PortfolioDefaultModel';
import ClientError from '../../../augury-backend/src/errors/ApiError';

jest.mock('../../../augury-backend/src/models/auth/PortfolioDefaultModel');
jest.mock('../../../augury-backend/src/models/auth/UserModel');

describe('UserController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn();
    sendMock = jest.fn();
    mockRequest = {};
    mockResponse = {
      status: statusMock.mockReturnValue({ send: sendMock }),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should return user data for a valid ID', async () => {
      // Mocked user data including `_id`
      const mockUser = {
        _id: '123', // Adding _id for Mongoose compatibility
        email: 'test@example.com',
        balance: 500,
      };

      // Mocking UserModel.getUser
      jest.spyOn(UserModel, 'getUser').mockResolvedValue(mockUser as any);

      // Setting mock request params
      mockRequest.params = { id: '123' };

      // Call the controller method
      await UserController.getUser(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assertions
      expect(UserModel.getUser).toHaveBeenCalledWith('123');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should return an error if the user does not exist', async () => {
      // Mocking UserModel.getUser to return null
      jest.spyOn(UserModel, 'getUser').mockResolvedValue(null);

      // Setting mock request params
      mockRequest.params = { id: '123' };

      // Call the controller method and expect an error
      await expect(
        UserController.getUser(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow('Unable to retrieve records for this user');

      expect(UserModel.getUser).toHaveBeenCalledWith('123');
    });
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      // Mocked user data including `_id`
      const mockUser = {
        _id: '456',
        email: 'newuser@example.com',
        firstName: 'John',
        lastName: 'Doe',
        googleId: 'google123',
        balance: 1000,
      };

      // Mocking UserModel.createUser
      jest.spyOn(UserModel, 'createUser').mockResolvedValue(mockUser as any);

      // Setting mock request body
      mockRequest.body = {
        email: 'newuser@example.com',
        firstName: 'John',
        lastName: 'Doe',
        googleId: 'google123',
        balance: 1000,
      };

      // Call the controller method
      await UserController.createUser(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assertions
      expect(UserModel.createUser).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        firstName: 'John',
        lastName: 'Doe',
        googleId: 'google123',
        balance: 1000,
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should throw an error if required fields are missing', async () => {
      // Setting mock request body with missing fields
      mockRequest.body = {
        firstName: 'John',
        lastName: 'Doe',
      };

      // Call the controller method and expect an error
      await expect(
        UserController.createUser(
          mockRequest as Request,
          mockResponse as Response
        )
      ).rejects.toThrow('Invalid email provided');

      expect(UserModel.createUser).not.toHaveBeenCalled();
    });
  });
});
