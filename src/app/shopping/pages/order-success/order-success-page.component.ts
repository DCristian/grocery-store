import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success-page.component.html'
})
export class OrderSuccessPageComponent implements OnInit {
  id: string;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
  }
}
