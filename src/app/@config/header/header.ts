import { HttpHeaders } from '@angular/common/http';

export const contentHeaders = {
  headers: new HttpHeaders({
   'Content-Type':'application/json',
  })
};