import { Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, Firestore, getDoc, getDocs, onSnapshot, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { BehaviorSubject, filter, from, Observable } from 'rxjs';

export type Room={
  id?:string,
  room_name:string,
  room_type:string,
  price:string,
  amenities:string,
  room_image:string,
  description:string,
  available_rooms:number,
  date_posted?:any
}

export type Review={
  user_name:string,
  comment:string,
  date_created:string,
  rating:number
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomBehaviorSubject = new BehaviorSubject<Room[]>([])
  room$ = this.roomBehaviorSubject.asObservable()
  private rooms:Room[]=[]
  constructor(private db:Firestore,private auth:AuthService) { 
  
  }

  async addRoom(room:Room){
    const roomRef = collection(this.db,`rooms`)
    const roomAdded = await addDoc(roomRef,({...room,date_posted:Timestamp.now(),id:roomRef.id}))
   
    return roomAdded 
  }


getRoomsCollection(){
  const q = query(collection(this.db, "rooms"));
  onSnapshot(q, (querySnapshot) => {
    let roomsCollection: Room[]=[]
    querySnapshot.forEach((doc) => {
      if(doc){
        roomsCollection.push(doc.data() as Room);
      }
    });
    this.roomBehaviorSubject.next(roomsCollection)
  });
 
}


async getRoom(id:string){
  const roomsDoc = doc(this.db,`rooms/${id}`)
  const docSnapShot = await getDoc(roomsDoc)
  const room = docSnapShot.data() as Room
  return room
}



}
