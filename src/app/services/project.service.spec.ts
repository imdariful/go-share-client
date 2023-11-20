import { HttpClient } from '@angular/common/http';
import { ProjectService } from './project.service';
import { Truck } from '../interfaces/truck';
import { Prices } from '../config/track.alg';
import { of } from 'rxjs';

jest.mock('@angular/common/http');

describe('ProjectService', () => {
  let projectService: ProjectService;
  let httpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClient = {
      get: jest.fn().mockImplementation(() => of({})),
    } as unknown as jest.Mocked<HttpClient>;
    projectService = new ProjectService(httpClient);
  });

  it('should calculate the original price accurately, handle zero weight and negative dimensions', () => {
    const mockTruck: Truck = {
      id: 3,
      name: 'Box truck',
      height: 10.5,
      width: 7,
      length: 26,
      weight: 10823,
      img: 'box_truck.png',
      title: 'box truck',
      dis: 'Great for Pallets, LTL freight, FTL freight, Home Moves',
      cost: 1115,
    };

    let weightTon = mockTruck.weight / 1000;
    let expectedPrice =
      ((mockTruck.height + mockTruck.width + mockTruck.length) * weightTon) / 2;
    let originalPrice = projectService.calculateOriginalPrice(mockTruck);
    expect(originalPrice).toEqual(expectedPrice);

    mockTruck.weight = 0;
    weightTon = mockTruck.weight / 1000;
    expectedPrice =
      ((mockTruck.height + mockTruck.width + mockTruck.length) * weightTon) / 2;
    originalPrice = projectService.calculateOriginalPrice(mockTruck);
    expect(originalPrice).toEqual(expectedPrice);

    mockTruck.height = -10.5;
    mockTruck.weight = 10000;
    weightTon = mockTruck.weight / 1000;
    expectedPrice =
      ((mockTruck.height + mockTruck.width + mockTruck.length) * weightTon) / 2;
    expect(() => projectService.calculateOriginalPrice(mockTruck)).toThrowError(
      'Truck dimensions and weight must be non-negative'
    );
  });

  it('should handle various scenarios in final price calculation', () => {
    const mockTruck: Truck = {
      id: 3,
      name: 'Box truck',
      height: 10.5,
      width: 7,
      length: 26,
      weight: 10822.699,
      img: 'box_truck.png',
      title: 'box truck',
      dis: 'Great for Pallets, LTL freight, FTL freight, Home Moves',
      cost: 1115,
    };


    let distance = 5000;
    let originalPrice = projectService.calculateOriginalPrice(mockTruck);
    let applicablePriceTier = Prices.find(
      (p) => p.from <= distance / 1000 && (!p.to || p.to >= distance / 1000)
    );

    if (!applicablePriceTier) {
      fail('No applicable price tier found for the given distance');
    }

    let discountMultiplier = (100 - applicablePriceTier.price) / 100;
    let finalPrice = projectService.calculateFinalPrice(
      mockTruck,
      distance,
      originalPrice
    );
    let expectedFinalPrice = Math.round(
      originalPrice * discountMultiplier * (distance / 1000)
    );
    expect(finalPrice).toEqual(expectedFinalPrice);

    distance = 15000;
    originalPrice = projectService.calculateOriginalPrice(mockTruck);
    applicablePriceTier = Prices.find(
      (p) => p.from <= distance / 1000 && (!p.to || p.to >= distance / 1000)
    );
    if (!applicablePriceTier) {
      fail('No applicable price tier found for the given distance');
    }
    discountMultiplier = (100 - applicablePriceTier.price) / 100;
    finalPrice = projectService.calculateFinalPrice(
      mockTruck,
      distance,
      originalPrice
    );
    expectedFinalPrice = Math.round(
      originalPrice * discountMultiplier * (distance / 1000)
    );
    expect(finalPrice).toEqual(expectedFinalPrice);

    distance = 2000000;
    originalPrice = projectService.calculateOriginalPrice(mockTruck);
    applicablePriceTier = Prices.find(
      (p) => p.from <= distance / 1000 && (!p.to || p.to >= distance / 1000)
    );
    if (!applicablePriceTier) {
      fail('No applicable price tier found for the given distance');
    }
    discountMultiplier = (100 - applicablePriceTier.price) / 100;
    finalPrice = projectService.calculateFinalPrice(
      mockTruck,
      distance,
      originalPrice
    );
    expectedFinalPrice = Math.round(
      originalPrice * discountMultiplier * (distance / 1000)
    );
    expect(finalPrice).toEqual(expectedFinalPrice);
  });


  it('should call getProjects with correct URL and config', () => {
    httpClient.get.mockImplementation(() => of({}));

    projectService.getProjects();

    expect(httpClient.get).toHaveBeenCalledWith(projectService.url, projectService.config);
  });
});
