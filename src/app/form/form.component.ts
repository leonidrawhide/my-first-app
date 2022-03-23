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
  skillsCopy: Skill[] = [{name: 'Жизнерадостность'}, {name: 'Заинтересованность'}, {name: 'Интеллект'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skillsCopy.push({name: value});
      this.skills.push(this.fb.control(value));
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    const index = this.skillsCopy.indexOf(skill);

    if (index >= 0) {
      this.skillsCopy.splice(index, 1);
      this.skills.removeAt(index);
    }
  }

  clearForm() {
    this.form.reset();
    this.skills.clear()
    this.skillsCopy = [{name: 'Жизнерадостность'}, {name: 'Заинтересованность'}, {name: 'Интеллект'}];
    for (let i = 0; i < this.skillsCopy.length; i++) {
      this.skills.push(this.fb.control(this.skillsCopy[i].name));
    }
  }

  constructor(private fb: FormBuilder, private element: ElementRef) {
    for (let i = 0; i < this.skillsCopy.length; i++) {
      this.skills.push(this.fb.control(this.skillsCopy[i].name));
    }
    console.log(this.element)
    // console.log(document.getElementById('skills-input'))
  }

  ngOnInit(): void {
    console.log(this.skillsCopy)
    console.log(this.skills)
  }

}
