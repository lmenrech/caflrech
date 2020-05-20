import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CacheStore} from '../../objects/CacheStore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private url_reports = 'https://api.dev.combateafraude.com/reports';
  private authorization;
  reports = [];

  constructor(private httpClient: HttpClient, private router: Router, private renderer: Renderer2, private el: ElementRef) {

    let authorization = JSON.parse(CacheStore.getObject('authorization'));
    if (!authorization) {
      this.router.navigate(['/']);
    }
    this.authorization = authorization;

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
      .then(response => {

        console.log(response);

        // @ts-ignore
        CacheStore.addObject('reports', JSON.stringify(response.body));

        // @ts-ignore
        for (let i = 0; i < response.body.length; i++) {
          // @ts-ignore
          this.reports.push(response.body[i]);
        }

      })
      .catch(console.log);

  }

  onClick(id, name) {

    console.log(id);
    CacheStore.addObject('report_id', id);
    CacheStore.addObject('report_name', name);
    this.router.navigate(['/report']);

  }

  ngOnInit(): void {
  }

}
