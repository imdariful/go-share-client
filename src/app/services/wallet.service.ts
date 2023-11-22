import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './api.constant';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private balanceSource = new BehaviorSubject<string>('');
  currentBalance = this.balanceSource.asObservable();

  public walletIdSource = new BehaviorSubject<string>('');
  currentWalletId = this.walletIdSource.asObservable();

  constructor(private http: HttpClient) {}

  changeBalance(balance: string) {
    this.balanceSource.next(balance);
  }

  setWalletId(walletId: string) {
    this.walletIdSource.next(walletId);
  }

  async patchWallet(balance: number) {
    const walletId = this.walletIdSource.getValue();
    const data = {
      id: walletId,
      balance: balance,
    };
    try {
      const res = await this.http
        .patch(`${apiUrl}wallet/updateBalance`, data)
        .toPromise();
      return res;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.error?.message);
    }
  }
}
