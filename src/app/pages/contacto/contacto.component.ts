import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public form = new FormGroup({});


  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  enviar()
  {
    const body1 = new HttpParams()
    .set('name', this.form.get('nombre').value)
    .set('email', this.form.get('email').value)
    .set('message', this.form.get('mensaje').value);

    console.log(body1);
    
   
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    this.http.post("http://ivensmedlab.cl/old/assets/contact.php",body1,{ headers }).subscribe((resultado: any) => {
      const returnjson: any[] = Array.of(resultado);
      console.log(resultado);        
      
      })   
    
  }

}
