import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Skill } from './form';
import { ValidateCyrillic } from '../../shared/cyrillic.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {  

  constructor(private fb: FormBuilder) {
    for (let i = 0; i < this.skillsBasic.length; i++) {
      this.skills.push(this.fb.control(this.skillsBasic[i].name));
    }
  }

  form = this.fb.group({
    name: this.fb.group({
      firstName: ['', [Validators.required, ValidateCyrillic]],
      lastName: ['', [Validators.required, ValidateCyrillic]],
      fathersName: ['', [Validators.required, ValidateCyrillic]],
    }),
    email: ['', Validators.email],
    skills: this.fb.array([])
  });
  
  get skills() {
    return this.form.get('skills') as FormArray;
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skillsBasic: Skill[] = [{name: 'Жизнерадостность'}, {name: 'Заинтересованность'}, {name: 'Интеллект'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push(this.fb.control(value));
    }

    event.chipInput!.clear();
  }

  remove(index: number): void {
    if (index >= 0) {
      this.skills.removeAt(index);
    }
  }

  clearForm() {
    this.form.reset();
    this.skills.clear()

    for (let i = 0; i < this.skillsBasic.length; i++) {
      this.skills.push(this.fb.control(this.skillsBasic[i].name));
    }
  }

  ngOnInit(): void {
  }

}
