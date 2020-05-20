import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CacheStore} from '../../objects/CacheStore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private url_login = 'https://api.dev.combateafraude.com/auth/signin';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(user, password) {

    this.httpClient.post(
      this.url_login,
      JSON.stringify({
        email: user,
        password: password
      }),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
      .toPromise()
      .then(response => {

        console.log(response);

        // @ts-ignore
        CacheStore.addObject('authorization', JSON.stringify(response.body));
        this.router.navigate(['/home']);

      })
      .catch(console.log);

  }


}
