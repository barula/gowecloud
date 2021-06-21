import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import {AppComponent} from 'src/app/app.component'
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, tap, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'suscriptions',
  templateUrl: './suscriptions.component.html',
  styleUrls: ['./suscriptions.component.css'],
})
export class SuscriptionsComponent implements OnInit {
  responseJson: string;
  suscriptionJson: string;
  hasSuscriptions: Boolean = false;
  suscriptions = [];
  constructor(private api: ApiService, public app:AppComponent, private auth:AuthService, private http:HttpClient) {}
  
  ngOnInit(): void {
    this.getCode();
  }


  getCode(){
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`https://dev-74frfetg.us.auth0.com/api/v2/users/${user.sub}`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.app.profileJson = JSON.stringify(meta)))
    )
    .subscribe(
      (resp) => (this.suscriptions = JSON.parse(this.app.profileJson).suscriptions)
    );

  }
}
