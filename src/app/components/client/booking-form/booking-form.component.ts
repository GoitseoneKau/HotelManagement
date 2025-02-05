import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { RoomService } from '../../../services/room.service';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {
  constructor(private roomService:RoomService,private route:ActivatedRoute,private router:Router){}
ngOnInit(){
 
} 
}
