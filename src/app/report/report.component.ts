import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Main} from '../../objects/Main';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent extends Main implements OnInit {

  private url_executions = 'https://api.dev.combateafraude.com/reports/{id}/executions';
  private authorization;
  public selectedFilter;

  filters = ['TODOS'];
  headers = [];
  rows = [];
  reportName = "";

  constructor(private httpClient: HttpClient, private router: Router, private renderer: Renderer2, private el: ElementRef) {
    super();
    this.onSubmit();
  }

  onSubmit(status = null) {

    let authorization = JSON.parse(this.getCache().getObject('authorization'));
    if (!authorization) {
      this.router.navigate(['/']);
    }
    this.authorization = authorization;

    this.reportName = this.getCache().getObject('report_name');
    this.headers = [];
    this.rows = [];

    let url = this.url_executions;
    if (status != null && status != 'TODOS') {
      url += '?status=' + status;
      console.log("Status: " + status);
    } else {
      console.log("No status.");
    }

    this.setLoading(true);
    this.httpClient.get(
      url.replace('{id}', this.getCache().getObject('report_id')),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authorization.idToken
        })
      }
    )
      .toPromise()
      .then((response : ExecutionResponse) => {this.handleResponse(response)})
      .catch(exception => this.onError(exception));

  }

  addHeader(row) {
    for (let a = 0; a < Object.keys(row).length; a++) {
      this.headers.push(Object.keys(row)[a]);
    }
  }

  addRow(row) {
    if (!this.filters.includes(row.status)) {
      this.filters.push(row.status);
    }
    let _row = [];
    for (let a = 0; a < Object.keys(row).length; a++) {
      let key = Object.keys(row)[a];
      let str = row[key].toString();
      if (row[key] instanceof Object) {
        str = JSON.stringify(row[key]);
      }
      _row.push(str);
    }
    this.rows.push(_row);
  }

  ngOnInit(): void {
  }

  handleResponse(response : ExecutionResponse) {

    this.getCache().addObject('executions', JSON.stringify(response.docs));

    let headerRow = 0;
    let headerColumns = 0;
    for (let i = 0; i < response.docs.length; i++) {
      let row = response.docs[i];
      if (Object.keys(row).length > headerColumns) {
        headerRow = i;
      }
    }

    this.addHeader(response.docs[headerRow]);

    for (let i = 0; i < response.docs.length; i++) {
      let row = response.docs[i];
      this.addRow(row);
    }
    this.setLoading(false);

  }

}

interface ExecutionResponse {
  docs: Array<Object>
}
