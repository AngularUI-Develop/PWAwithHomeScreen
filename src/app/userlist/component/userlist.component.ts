import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/get-userlist';
import  { WebNotificationService } from '../../services/web-notification.service';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  postDataListing: any = [] ;
  dataArray = [];
  //constructor(private webNotificationService:WebNotificationService) { }
  constructor(private userService:UserService,private swPush: SwPush,
    private webNotificationService:WebNotificationService) { 
    this.swPush.notificationClicks.subscribe( event => {
      console.log('Received notification: ', event);
      const url = event.notification.data.url;
      window.open(url, '_blank');
  });
  }
 
  ngOnInit() {
    this.getUserDetails();
    
  }
  subscribe(){
    this.webNotificationService.subscribeToNotification();
  }
 
  getUserDetails() {
    const resu = this.userService.getUsers().subscribe((users:any)=> 
    {
      this.postDataListing = users ;
     
      this.dataArray = this.postDataListing['data'];
   
    });
    return resu;
 
}
}
