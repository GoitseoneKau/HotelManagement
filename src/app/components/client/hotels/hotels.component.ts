import { Component } from '@angular/core';
import { HotelCardComponent } from "../hotel-card/hotel-card.component";
import { Room, RoomService } from '../../../services/room.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [HotelCardComponent],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent {
  rooms:Room[]=[];

  constructor(private roomService:RoomService,private router:Router,private route:ActivatedRoute){}

  ngOnInit(){
    this.roomService.getRoomsCollection()
    this.loadRooms()

  }

  loadRooms(){
    this.roomService.room$.subscribe(rooms=>{
      this.rooms = rooms
    })
  }

  moreDetails(roomID:string){
    this.router.navigate(['room-details',roomID],{relativeTo:this.route.parent})
  }
}
