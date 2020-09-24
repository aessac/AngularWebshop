import { IOrderAdmin } from './../../interfaces/IOrderAdmin';
import { OrderService } from './../../services/orders/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { faArchive, faAddressCard, faCalendarAlt, faEnvelope, faMoneyCheck, faDollarSign, faExclamationCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  //Fontawesome
  archiveIcon = faArchive;
  addressIcon = faAddressCard;
  calanderIcon = faCalendarAlt;
  mailIcon = faEnvelope;
  moneyIcon = faMoneyCheck;
  dollarIcon = faDollarSign;
  statusIcon = faExclamationCircle;
  deleteIcon = faTrash;

  defaultOrders: IOrderAdmin[] = []

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    //Call getMovieData function from productService
    this.orderService.getOrdersData().subscribe((order: IOrderAdmin[]) => {
      this.defaultOrders = order;
    });
  }

  //Call deleteOrderData function then update the presentation
  deleteOrder(id: number) {
    this.orderService.deleteOrderData(id).pipe(
      switchMap(() => this.orderService.getOrdersData())
    ).subscribe((data) => {
      this.defaultOrders = data;
    });
  }
}