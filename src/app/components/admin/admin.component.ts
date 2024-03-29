import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from "../../services/authentication.service";
import * as apiData from "../../api_interfaces";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ]
})
export class AdminComponent implements OnInit {

  isNotificationVisible: boolean = false;
  username: string = "";
  users: apiData.User[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  // Lifecycle hook - ngOnInit
  ngOnInit(): void {
    // Fetch user data from the token and set the username
    this.authService.getUserDataFromToken()!.subscribe(
      data => {
        this.username = (data as any).user.username;
      },
      error => {
        console.error('Error occurred:', error);
      }
    );
    // Fetch all users periodically using interval and switchMap

    interval(1000)
      .pipe(
        switchMap(() => this.authService.getAllUsers())
      )
      .subscribe(
        // Update the users array with the fetched data
        (data) => {
          this.users = (data as any).data.map((user: apiData.User)=>({_id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin, roles: user.roles}));
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );

  }
  // Method to delete a user by ID
  deleteUser(id: string){
    this.authService.deleteUser(id);
    // Show notification after deleting a user
    this.showNotification();
  }

  // Method to show a notification with a timeout
  showNotification() {
    this.isNotificationVisible = true;

    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 2000);
  }

}
