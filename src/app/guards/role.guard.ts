import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(loggedInUser);
  const requiredRole = route.data?.['role'];

  if (user.role !== requiredRole) {
    console.error(`Access denied - required role: ${requiredRole}, user role: ${user.role}`);
    router.navigate(['/home']);
    return false;
  }

  return true;
};
