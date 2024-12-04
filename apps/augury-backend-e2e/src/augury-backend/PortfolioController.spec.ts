import { Request, Response } from 'express';
import PortfolioModel from '../../../augury-backend/src/models/auth/PortfolioModel';
import PortfolioController from '../../../augury-backend/src/controllers/auth/PortfolioController';
import ApiError from 'apps/augury-backend/src/errors/ApiError';
import ClientError from 'apps/augury-backend/src/errors/ClientError';

jest.mock('../../../augury-backend/src/models/auth/PortfolioModel'); // Mock PortfolioModel

describe('PortfolioController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('createPortfolio', () => {
    it('should create a portfolio and return it', async () => {
      req.body = {
        name: 'Test Portfolio',
        riskPercentage1: 60,
        riskPercentage2: 40,
        sectorTags: ['materials'],
      };

      const mockResponse = {
        id: '12345',
        name: 'Test Portfolio',
        riskPercentage1: 60,
        riskPercentage2: 40,
        sectorTags: ['materials'],
      };

      (PortfolioModel.createPortfolio as jest.Mock).mockResolvedValue(
        mockResponse
      );

      await PortfolioController.createPortfolio(
        req as Request,
        res as Response
      );

      expect(PortfolioModel.createPortfolio).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ portfolio: mockResponse });
    });
  });

  describe('getPortfolio', () => {
    it('should return a portfolio by ID', async () => {
      req.params = { id: '12345' };

      const mockPortfolio = {
        id: '12345',
        name: 'Test Portfolio',
        riskPercentage1: 60,
        riskPercentage2: 40,
        sectorTags: ['Tech'],
      };

      (PortfolioModel.getPortfolio as jest.Mock).mockResolvedValue(
        mockPortfolio
      );

      await PortfolioController.getPortfolio(req as Request, res as Response);

      expect(PortfolioModel.getPortfolio).toHaveBeenCalledWith('12345');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ portfolio: mockPortfolio });
    });

    it('should return an error if the portfolio is not found', async () => {
      req.params = { id: '12345' };

      (PortfolioModel.getPortfolio as jest.Mock).mockResolvedValue(null);

      await expect(
        PortfolioController.getPortfolio(req as Request, res as Response)
      ).rejects.toThrow(ApiError);

      expect(PortfolioModel.getPortfolio).toHaveBeenCalledWith('12345');
    });
  });

  describe('updatePortfolio', () => {
    it('should update a portfolio and return it', async () => {
      req.params = { id: '12345' };
      req.body = {
        name: 'Updated Portfolio',
        riskPercentage1: 70,
        riskPercentage2: 30,
        sectorTags: ['financials'],
      };

      const mockResponse = {
        id: '12345',
        name: 'Updated Portfolio',
        riskPercentage1: 70,
        riskPercentage2: 30,
        sectorTags: ['financials'],
      };

      (PortfolioModel.updatePortfolio as jest.Mock).mockResolvedValue(
        mockResponse
      );

      await PortfolioController.updatePortfolio(
        req as Request,
        res as Response
      );

      expect(PortfolioModel.updatePortfolio).toHaveBeenCalledWith({
        id: '12345',
        ...req.body,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ portfolio: mockResponse });
    });

    it('should return an error if the update fails', async () => {
      req.params = { id: '12345' };
      req.body = {
        name: 'Updated Portfolio',
        riskPercentage1: 70,
        riskPercentage2: 30,
        sectorTags: ['financials'],
      };

      (PortfolioModel.updatePortfolio as jest.Mock).mockResolvedValue(null);

      await expect(
        PortfolioController.updatePortfolio(req as Request, res as Response)
      ).rejects.toThrow(ApiError);

      expect(PortfolioModel.updatePortfolio).toHaveBeenCalledWith({
        id: '12345',
        ...req.body,
      });
    });
  });

  describe('deletePortfolio', () => {
    it('should delete a portfolio by ID and return it', async () => {
      req.params = { id: '12345' };

      const mockPortfolio = {
        id: '12345',
        name: 'Test Portfolio',
        riskPercentage1: 60,
        riskPercentage2: 40,
        sectorTags: ['Tech'],
      };

      (PortfolioModel.deletePortfolio as jest.Mock).mockResolvedValue(
        mockPortfolio
      );

      await PortfolioController.deletePortfolio(
        req as Request,
        res as Response
      );

      expect(PortfolioModel.deletePortfolio).toHaveBeenCalledWith('12345');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ portfolio: mockPortfolio });
    });

    it('should return an error if the portfolio is not found', async () => {
      req.params = { id: '12345' };

      (PortfolioModel.deletePortfolio as jest.Mock).mockResolvedValue(null);

      await expect(
        PortfolioController.deletePortfolio(req as Request, res as Response)
      ).rejects.toThrow(ApiError);

      expect(PortfolioModel.deletePortfolio).toHaveBeenCalledWith('12345');
    });
  });
});
