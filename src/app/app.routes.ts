import { Routes } from '@angular/router';
import { HotelDetailsComponent } from './components/client/hotel-details/hotel-details.component';
import { PaymentPageComponent } from './components/client/payment-page/payment-page.component';
import { BookingFormComponent } from './components/client/booking-form/booking-form.component';
import { DashboardComponent } from './components/vendor/dashboard/dashboard.component';
import { GuestListComponent } from './components/vendor/guest-list/guest-list.component';
import { RevenueComponent } from './components/vendor/revenue/revenue.component';
import { ReservationsComponent } from './components/vendor/reservations/reservations.component';
import { RoomsComponent } from './components/vendor/rooms/rooms.component';
import { LoginComponent } from './components/client/login/login.component';
import { HotelsComponent } from './components/client/hotels/hotels.component';
import { SuccesfulPaymentComponent } from './components/client/succesful-payment/succesful-payment.component';
import { CancelPaymentComponent } from './components/client/cancel-payment/cancel-payment.component';
import { LayoutComponent as clientLayout }  from './components/client/layout/layout.component';
import { LayoutComponent as staffLayout } from './components/vendor/layout/layout.component';
import { SignupComponent } from './components/client/signup/signup.component';

export const routes: Routes = [
    {path:'',redirectTo:'hotel/rooms',pathMatch:'full'},
    {path:'hotel',component:clientLayout,children:[
        {path:'',redirectTo:'rooms',pathMatch:'full'},
        {path:'rooms',component:HotelsComponent},
        {path:'room-details/:id',component:HotelDetailsComponent},
        {path:'room-details/:id/booking',component:BookingFormComponent},
        {path:'room-details/:id/booking/checkout',component:PaymentPageComponent},
        {path:'room-details/:id/booking/checkout/success',component:SuccesfulPaymentComponent},
        {path:'room-details/:id/booking/checkout/cancelled',component:CancelPaymentComponent}
    ]},
    {path:'staff',component:staffLayout,children:
        [
            {path:'',redirectTo:'dashboard',pathMatch:'full'},
            {path:'dashboard',component:DashboardComponent},
            {path:'guests',component:GuestListComponent},
            {path:'revenue',component:RevenueComponent},
            {path:'reservations',component:ReservationsComponent},
            {path:'rooms',component:RoomsComponent},
            {path:'rooms/room-details/booking',component:BookingFormComponent},
            {path:'rooms/room-details/booking/checkout',component:PaymentPageComponent},
            {path:'rooms/room-details/booking/checkout/success',component:SuccesfulPaymentComponent},
            {path:'rooms/room-details/booking/checkout/cancelled',component:CancelPaymentComponent}
        ]
    },
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}
];
