import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask  } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  id: string;
  constructor(private afStorage: AngularFireStorage,  public angularFirestore: AngularFirestore) { }

  upload(event) { debugger
    this.id = this.angularFirestore.createId();
    this.ref = this.afStorage.ref(this.id);
    this.task = this.ref.put(event[0]);
  }
}
