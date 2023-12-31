import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {
  isEmailError: boolean = false;
  isSubscribed: boolean = false;
  constructor(private subService: SubscribersService){}
  ngOnInit(): void{}
  onSubmit(formVal){
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email
    }
    //this.subService.addSubs(subData);
    this.subService.checkSubs(subData.email).subscribe(val=>{
      console.log(val);
      if(val.length==0){
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      }else{
        console.log("email already in use");
        this.isEmailError = true;
      }
    })
  }
}
