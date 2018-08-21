import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import { Subject, Observable, fromEvent } from 'rxjs'
//import {distinctUntilChanged} from 'rxjs/operators';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  urlTxt = 'https://www.walmart.com/reviews/product/28806789';
  product: any;
  searchTerm$ = new Subject<string>();
  sub: Subscription;
  @ViewChild('filterText') filterText: ElementRef;

  ngOnInit() {
    this.sub = this.service.product.subscribe(pp =>
      this.product = pp);
  }

  ngAfterViewInit() {
    fromEvent(this.filterText.nativeElement, 'keyup').pipe(debounceTime(200),
      distinctUntilChanged()
    ).subscribe(() => {
      this.service.filterReviews(this.filterText.nativeElement.value.toLowerCase());
    });
  }

  GetData() {
    this.filterText.nativeElement.value="";
    let check: string[];
    check = this.urlTxt.split('/');
    var id = check[check.length - 1];
    this.service.getProductData(Number.parseInt(id));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  constructor(private service: ApiService) { }
}
