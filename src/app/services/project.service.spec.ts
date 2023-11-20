import { HttpClient } from '@angular/common/http';
import { ProjectService } from './project.service';
import { Truck } from '../interfaces/truck';
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

    let originalPrice = projectService.calculateOriginalPrice(mockTruck);
    expect(originalPrice).toEqual(235.40025);

    mockTruck.weight = 0;
    originalPrice = projectService.calculateOriginalPrice(mockTruck);
    expect(originalPrice).toEqual(0);

    mockTruck.weight = 10823;
    mockTruck.height = -10.5;
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
      weight: 10823,
      img: 'box_truck.png',
      title: 'box truck',
      dis: 'Great for Pallets, LTL freight, FTL freight, Home Moves',
      cost: 1115,
    };

    let finalPrice = projectService.calculateFinalPrice(
      mockTruck,
      5000,
      235.40025
    );
    expect(finalPrice).toEqual(1036);

    finalPrice = projectService.calculateFinalPrice(
      mockTruck,
      15000,
      235.40025
    );
    expect(finalPrice).toEqual(3107);

    expect(() =>
      projectService.calculateFinalPrice(mockTruck, -20, 235.40025)
    ).toThrowError('Distance must be non-negative');
  });

  it('should call getProjects with correct URL and config', () => {
    httpClient.get.mockImplementation(() => of({}));

    projectService.getProjects();

    expect(httpClient.get).toHaveBeenCalledWith(
      projectService.url,
      projectService.config
    );
  });
});
