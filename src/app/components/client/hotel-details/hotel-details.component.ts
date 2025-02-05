import { Component } from '@angular/core';
import { Room, RoomService } from '../../../services/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CurrencyPipe,TitleCasePipe],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {
  room_details!:Room
  
  
  constructor(private roomService:RoomService,private route:ActivatedRoute,private router:Router){

  }

  ngOnInit(){
    const id = this.route.snapshot.params['id']
    this.roomService.getRoomsCollection()
        // this.roomService.getRoom(id).subscribe((r)=>this.room_details=r[0])
        // this.room_details=this.roomService.getRoom(id)
        this.roomService.getRoom(id).then((room)=>{
            if(room){
              this.room_details = room
            }
        })
  }


  gotoBookRoom(){
   
    this.router.navigate(['booking'],{relativeTo:this.route})
  }

}
