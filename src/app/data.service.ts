import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {
 

  constructor(private firestore: AngularFirestore) {}

  addStudent(studentData: any) {
    return this.firestore.collection('StudentData').add(studentData);
  }

  getStudentData(): Observable<any[]> {
    return this.firestore.collection('StudentData').valueChanges();
  }

  updateStudent(student: any) {
    const studentId = student.id; // Assuming you have an 'id' property in your student data
    delete student.id; // Remove the 'id' property before updating
    return this.firestore.collection('StudentData').doc(studentId).update(student);
  }

}
