import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Main} from '../../objects/Main';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Main implements OnInit {

  private url_login = 'https://api.dev.combateafraude.com/auth/signin';

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
  }

  ngOnInit(): void {
  }

  onSubmit(user, password) {

    this.setLoading(true);
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
      .then((response : LoginResponse) => this.handleResponse(response))
      .catch(exception => this.onError(exception));

  }

  handleResponse(response : LoginResponse) {
      this.getCache().addObject('authorization', JSON.stringify(response.body));
      this.setLoading(false);
      this.router.navigate(['/home']);
  }

}

interface LoginResponse {
  body: {
    accessToken: string,
    expiresIn: bigint,
    idToken: string,
    refreshToken: string,
    tokenType: string
  }
}
