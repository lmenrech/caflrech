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
  private authorization;
  reports = [];

  constructor(private httpClient: HttpClient, private router: Router, private renderer: Renderer2, private el: ElementRef) {
    super();

    let authorization = JSON.parse(this.getCache().getObject('authorization'));
    if (!authorization) {
      this.router.navigate(['/']);
    }
    this.authorization = authorization;

    this.setLoading(true);
    this.httpClient.get(
      this.url_reports,
      {
        headers: new HttpHeaders( {
          'Content-Type': 'application/json',
          'Authorization': authorization.idToken
        })
      }
    )
      .toPromise()
      .then((response : ReportsResponse) => {this.handleResponse(response)})
      .catch(exception => this.onError(exception));

  }

  onClick(id, name) {
    this.getCache().addObject('report_id', id);
    this.getCache().addObject('report_name', name);
    this.router.navigate(['/report']);
  }

  ngOnInit(): void {
  }

  handleResponse(response : ReportsResponse) {
    this.getCache().addObject('reports', JSON.stringify(response.body));
    for (let i = 0; i < response.body.length; i++) {
      this.reports.push(response.body[i]);
    }
    this.setLoading(false);
  }

}

interface ReportsResponse {
  body: Array<Object>
}
