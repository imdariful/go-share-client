import { ResolveFn } from '@angular/router';

export const stateResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
