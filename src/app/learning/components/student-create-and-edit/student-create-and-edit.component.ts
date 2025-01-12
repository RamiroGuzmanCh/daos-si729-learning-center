import { Component } from '@angular/core';

import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Student } from "../../model/student.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-student-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './student-create-and-edit.component.html',
  styleUrl: './student-create-and-edit.component.css'
})
export class StudentCreateAndEditComponent {

  // Attributes
  @Input() student: Student;
  @Input() editMode: boolean = false;
  @Output() studentAdded: EventEmitter<Student> = new EventEmitter<Student>();
  @Output() studentUpdated: EventEmitter<Student> = new EventEmitter<Student>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('studentForm', {static: false}) studentForm!: NgForm;

  // Methods
  constructor() {
    this.student = {} as Student;
  }

  // Private methods
  private resetEditState(): void {
    this.student = {} as Student;
    this.editMode = false;
    this.studentForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.studentForm.form.valid) {
      let emitter: EventEmitter<Student> = this.editMode ? this.studentUpdated : this.studentAdded;
      emitter.emit(this.student);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
