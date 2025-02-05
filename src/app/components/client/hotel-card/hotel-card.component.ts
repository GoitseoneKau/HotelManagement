import { Component,  input, output } from '@angular/core';
import { Room } from '../../../services/room.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'hotel-card',
  standalone: true,
  imports: [CurrencyPipe,TitleCasePipe],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.scss'
})
export class HotelCardComponent {
data =input<Room>()
gotoMoreDetails=output()


more(){
  this.gotoMoreDetails.emit();
}

}
