import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc, updateDoc, deleteDoc, docData} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: Firestore) { }

  loadData(){
    const collectionInstance = collection(this.afs,'categories');
    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      return actions.map(a=>{
        const data = a['category'];
        const id = a['id'];
        let output={};
        output['data']=data;
        output['id']=id;
        return output;
        //return "vishal";
      })
    }))
  }
}
