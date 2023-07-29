import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc, updateDoc, deleteDoc, docData} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs: Firestore,private toastr: ToastrService) { }

  loadData(){
    const collectionInstance = collection(this.afs,'subscribers');

    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      //console.log("actions",actions);
      return actions.map(a=>{
        //console.log(a);
        const data = a['name'];
        const email = a['email'];
        const id = a['id'];
        let output = {};
        output['name']=data;
        output['email']=email;
        output['id']=id;
        return output;
        //return "vishal";
      })
    }))
  }

  deleteData(id){
    const docInstance = doc(this.afs,'subscribers',id);
    deleteDoc(docInstance).then(docref =>{
      this.toastr.success("Data Deleted..!")
    })
  }
}
