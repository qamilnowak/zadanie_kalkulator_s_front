import {Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {FormBuilder,  FormGroup} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import {send} from 'q';

interface Wage {
  kwota: number;
  waluta: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  wages = Array<Wage>();
  newWage: Wage = {kwota: 0, waluta: 'PLN'};
  public myForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
  this.check();
    this.myForm = this.formbuilder.group({
      kwota: '',
      waluta: ''
    });
    setInterval(() => {
      this.check(); } , 1000 );
  }
check() {
  this.http.get('/api/wages').subscribe((data: Array<Wage>) => {
    this.wages = data;
  });
}

  send() {
    let formObj  = this.myForm.getRawValue();
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    let serializedForm = JSON.stringify(formObj);

    this.http.post('/api/wages1', serializedForm, httpOptions)
      .subscribe(
        data => console.log('działa!', data),
        error => console.error('nie działa zią bo:', error)
      );
  }

}
