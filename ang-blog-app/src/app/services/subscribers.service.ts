import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc, updateDoc, deleteDoc, docData, where, query, limit, limitToLast, orderBy,getDoc,increment} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs: Firestore) { }

  addSubs(subData){
    const collectionInstance = collection(this.afs,"subscribers");

      addDoc(collectionInstance,subData).then((docref)=>{
      console.log("Data Added Successfully:-",docref);
      //this.toastr.success('Data inserted Successfully');
      });
  }

  checkSubs(subEmail){
    const collectionInstance = query(collection(this.afs,'subscribers'),where('email','==',subEmail));
    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      console.log(actions);
      return actions.map(a=>{
        console.log(a);
        return a;
        //return "vishal";
      })
    }))
  }

}
