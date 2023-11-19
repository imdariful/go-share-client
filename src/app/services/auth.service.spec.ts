import { AuthService } from './auth.service';
import axios from 'axios';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

jest.mock('axios');
jest.mock('ngx-cookie');

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: jest.Mocked<CookieService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    router = {} as any;
    service = new AuthService(cookieService, router);
  });

  it('should sign up a user', async () => {
    const userData = { username: 'test', password: 'test' };
    const response = { data: { token: 'test-token' } };

    (axios.post as jest.Mock).mockResolvedValue(response);

    const result = await service.signUp(userData);

    expect(result).toEqual(response.data);
    expect(axios.post).toHaveBeenCalledWith(
      `${service.url}signup`,
      userData,
      service.config
    );
  });

  it('should sign in a user', async () => {
    const userData = { username: 'test', password: 'test' };
    const response = { data: { token: 'test-token' } };

    (axios.post as jest.Mock).mockResolvedValue(response);

    const result = await service.signIn(userData);

    expect(result).toEqual(response.data);
    expect(axios.post).toHaveBeenCalledWith(
      `${service.url}signin`,
      userData,
      service.config
    );
  });
});
