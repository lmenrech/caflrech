import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Main} from '../../objects/Main';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent extends Main implements OnInit {

  private url_reports = 'https://api.dev.combateafraude.com/reports';
  public reports: Array<Object> = [];

  constructor(private httpClient: HttpClient, private router: Router, private renderer: Renderer2, private el: ElementRef) {
    super();
    this.setLoading(true);
  }

  onSubmit() {
    let authorization = JSON.parse(this.getCache().getObject('authorization'));
    if (!authorization) {
      this.router.navigate(['/']);
    }

    this.httpClient.get(
      this.url_reports,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': authorization.idToken
        })
      }
    )
      .toPromise()
      .then((response: ReportsResponse) => {
        this.handleResponse(response);
      })
      .catch(exception => this.onError(exception));
  }

  onClick(id, name) {
    this.router.navigate(['/report', id, name]);
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  handleResponse(response: ReportsResponse) {
    response.body.map(data => {
        this.reports.push(data);
      }
    );
    this.setLoading(false);
  }

}

interface ReportsResponse {
  body: Array<Object>
}
