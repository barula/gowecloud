import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, tap, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from 'src/app/app.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;
  constructor(public auth: AuthService, private http: HttpClient, public app:AppComponent) {}

  ngOnInit() {
    if(!this.profileJson)this.getProfile();
  }
  getProfile(){
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`https://dev-74frfetg.us.auth0.com/api/v2/users/${user.sub}`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.profileJson = JSON.stringify(meta)))
    )
    .subscribe(
      (resp) => (this.app.suscriptions = JSON.parse(this.profileJson).suscriptions)
    );
  }  

  
    /*
      ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }

    */
  //  ngOnInit(): void {
}
