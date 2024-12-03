import PortfolioGroupController from '../PortfolioGroupController';
import PortfolioGroupModel from '../../../models/auth/PortfolioGroupModel';
import { Request, Response } from 'express';
import ApiError from 'apps/augury-backend/src/errors/ApiError';
import ClientError from 'apps/augury-backend/src/errors/ClientError';

jest.mock('../../../models/auth/PortfolioGroupModel');

describe('PortfolioGroupController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: sendMock });
    mockRequest = {};
    mockResponse = {
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPortfolioGroup', () => {
    it('should create a portfolio group with valid data', async () => {
      const requestBody = {
        userId: 'user1',
        name: 'Test Group',
        color: 'blue',
        portfolios: ['portfolio1', 'portfolio2'],
      };
      const mockResponseData = {
        group: { id: 'group1', ...requestBody },
        portfolios: requestBody.portfolios,
      };

      mockRequest.body = requestBody;
      (PortfolioGroupModel.createPortfolioGroup as jest.Mock).mockResolvedValue(
        mockResponseData
      );

      await PortfolioGroupController.createPortfolioGroup(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(PortfolioGroupModel.createPortfolioGroup).toHaveBeenCalledWith(
        { userId: 'user1', name: 'Test Group', color: 'blue' },
        ['portfolio1', 'portfolio2']
      );
      expect(sendMock).toHaveBeenCalledWith(mockResponseData);
    });

    it('should throw an error if userId is missing', async () => {
      mockRequest.body = {
        name: 'Test Group',
        color: 'blue',
        portfolios: ['portfolio1', 'portfolio2'],
      };

      await expect(
        PortfolioGroupController.createPortfolioGroup(
          mockRequest as Request,
          mockResponse as Response
        )
      ).rejects.toThrow(ClientError);

      expect(PortfolioGroupModel.createPortfolioGroup).not.toHaveBeenCalled();
    });
  });

  describe('getPortfolioGroup', () => {
    it('should retrieve a portfolio group by ID', async () => {
      const groupId = 'group1';
      const mockResponseData = {
        group: { id: groupId, name: 'Test Group' },
        portfolios: ['portfolio1', 'portfolio2'],
      };

      mockRequest.params = { id: groupId };
      (PortfolioGroupModel.getPortfolioGroup as jest.Mock).mockResolvedValue(
        mockResponseData
      );

      await PortfolioGroupController.getPortfolioGroup(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(PortfolioGroupModel.getPortfolioGroup).toHaveBeenCalledWith(
        groupId
      );
      expect(sendMock).toHaveBeenCalledWith(mockResponseData);
    });

    it('should throw an error if group ID is missing', async () => {
      mockRequest.params = {};

      await expect(
        PortfolioGroupController.getPortfolioGroup(
          mockRequest as Request,
          mockResponse as Response
        )
      ).rejects.toThrow(ClientError);

      expect(PortfolioGroupModel.getPortfolioGroup).not.toHaveBeenCalled();
    });
  });

  describe('updatePortfolioGroup', () => {
    it('should update a portfolio group with valid data', async () => {
      const groupId = 'group1';
      const requestBody = {
        id: groupId,
        name: 'Updated Group',
        color: 'red',
      };
      const mockResponseData = {
        group: { id: groupId, name: 'Updated Group', color: 'red' },
        portfolios: ['portfolio1'],
      };

      mockRequest.body = requestBody;
      (PortfolioGroupModel.updatePortfolioGroup as jest.Mock).mockResolvedValue(
        mockResponseData
      );

      await PortfolioGroupController.updatePortfolioGroup(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(PortfolioGroupModel.updatePortfolioGroup).toHaveBeenCalledWith(
        groupId,
        {
          name: 'Updated Group',
          color: 'red',
        }
      );
      expect(sendMock).toHaveBeenCalledWith(mockResponseData);
    });
  });
  describe('getPortfolioGroupsByUserId', () => {
    it('should retrieve all portfolio groups for a user', async () => {
      const userId = 'user1';
      const mockResponseData = [
        { id: 'group1', name: 'Group 1' },
        { id: 'group2', name: 'Group 2' },
      ];

      mockRequest.params = { id: userId };
      (
        PortfolioGroupModel.getPortfolioGroupsByUserId as jest.Mock
      ).mockResolvedValue(mockResponseData);

      await PortfolioGroupController.getPortfolioGroupsByUserId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(
        PortfolioGroupModel.getPortfolioGroupsByUserId
      ).toHaveBeenCalledWith(userId);
      expect(sendMock).toHaveBeenCalledWith({ groups: mockResponseData });
    });

    it('should throw an error if user ID is missing', async () => {
      mockRequest.params = {};

      await expect(
        PortfolioGroupController.getPortfolioGroupsByUserId(
          mockRequest as Request,
          mockResponse as Response
        )
      ).rejects.toThrow(ClientError);

      expect(
        PortfolioGroupModel.getPortfolioGroupsByUserId
      ).not.toHaveBeenCalled();
    });
  });
});
