import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask  } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Images } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  id: string;
  refList: AngularFireStorageReference[];
  taskList: AngularFireUploadTask[];
  idList: string[];
  constructor(public afStorage: AngularFireStorage,  public angularFirestore: AngularFirestore) { 
    this.refList = [];
    this.taskList = [];
  }

  upload(event) { 
    this.id = this.angularFirestore.createId();
    this.ref = this.afStorage.ref(this.id);
    this.task = this.ref.put(event[0]);
  }
  uploadList(item: Images) { 
    let ref: AngularFireStorageReference;
    let task: AngularFireUploadTask;
    item.idStorage = this.angularFirestore.createId();
    ref = this.afStorage.ref(item.idStorage);
    task = ref.put(item.url[0]);
    task.then(()=>{
      ref.getDownloadURL().subscribe(
        res => {
          item.url = res;
        }
      );
    });
  }
  update(event: any, id: string) {
    this.id = id;
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event[0]);
  }

  getReference(afStorage: AngularFireStorage,id: string): string {
    
    return "";
  }
}
