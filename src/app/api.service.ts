import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  product: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  productValue: any;
  getProductData(id: number) {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url).subscribe(pp => {
      this.productValue = pp;
      this.product.next(pp)
    });
  }

  filterReviews(term) {
    let newP= Object.assign({},this.productValue);
   // var newP = this.productValue;
    if (newP != undefined && newP.reviews != undefined) {
     newP.reviews= newP.reviews.filter(re => re.title.toLowerCase().includes(term) |
        re.reviewText.toLowerCase().includes(term));
      this.product.next(newP);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };
}


