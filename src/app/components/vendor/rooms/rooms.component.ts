import { Component, ElementRef, ViewChild } from '@angular/core';
import { Room, RoomService } from '../../../services/room.service';
import {FormsModule,NgForm,NgModel} from '@angular/forms'
import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { HotelCardComponent } from "../../client/hotel-card/hotel-card.component";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, HotelCardComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  @ViewChild('addRoomDialog') dialog: ElementRef | undefined;
  rooms:Room[]=[]
  room$!: Observable<any>;
  room_image:any
 
  constructor(private roomService:RoomService){}

  ngOnInit(){
    this.roomService.getRoomsCollection()
    this.loadRooms()

  }

  loadRooms(){
    this.roomService.room$.subscribe(rooms=>{
      this.rooms = rooms
    })
  }

  imageHandler(e:any){
    const image = e.target.files[0]
    if(image){
      const reader=new FileReader()
      reader.onload=()=>{
        this.room_image=reader.result as string
      }
      reader.readAsDataURL(image)
    }
  }

  onSubmit(form:NgForm){
    const d = this.dialog?.nativeElement as HTMLDialogElement
    
    const room:Room = {
      room_name: form.control.value.room_name,
      room_type: form.control.value.room_type,
      price: form.control.value.price,
      amenities: form.control.value.amenities,
      room_image: this.room_image,
      description: form.control.value.description,
      available_rooms: form.control.value.numberOfRooms
    }
  
  
    this.roomService.addRoom(room)
    .then((data)=>{
      d.close()
    })
    .catch((error)=>console.log(error.message))
  }

  showRoomPop(){
    const d = this.dialog?.nativeElement as HTMLDialogElement
    d.showModal()
  }

  closePop(){
    const d = this.dialog?.nativeElement as HTMLDialogElement
    d.close()
  }
}
