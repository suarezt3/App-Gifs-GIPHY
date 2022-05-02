import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gifs } from './interfaces/gifs-interface';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  myForm!    : FormGroup;

  
  get result() {
    return this.appService.result
  }


  constructor(private fb: FormBuilder,  private appService: AppService) { this.createForm() }

  createForm() {
    this.myForm = this.fb.group({
      search: ['']
    })

  }

  ngOnInit(): void {
  }

  query() {
    const valor = this.myForm.get('search')?.value
    this.appService.characters(valor)
    this.myForm.get('search')?.reset('')
  }




}


