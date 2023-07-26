import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: Firestore,private toastr: ToastrService) { 
    // this.loadData();
  }

  saveData(data){
    const collectionInstance = collection(this.afs,"categories");
    addDoc(collectionInstance,data).then((docref)=>{
      console.log("Data Added Successfully:-",docref);
      this.toastr.success('Data inserted Successfully');


      // // const docInstance =doc(this.afs,'categories',docref.id);
      // // const subCategoryCollectionInstance = collection(docInstance,'subcategories');

      // addDoc(collection(doc(this.afs,'categories',docref.id),'subcategories'),subCategoryData).then((docref1)=>{
      //   console.log(docref1);
      // })
    }).catch((err)=>{
      console.log(err);
    })
  }

  loadData(){
    const collectionInstance = collection(this.afs,'categories');
    // collectionData(collectionInstance).subscribe((val)=>{
    //   console.log(val);
    // })
    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      //console.log("actions",actions);
      return actions.map(a=>{
        //console.log(a);
        const data = a['category'];
        const id = a['id'];
        let output = {};
        output['data']=data;
        output['id']=id;
        return output;
        //return "vishal";
      })
    }))
  }

  updateData(id,EditData){
    const docInstance = doc(this.afs,'categories',id);
    updateDoc(docInstance,EditData).then(docref=>{
      this.toastr.success('Data Updated Successfully ..!');
    })
  }

  deleteData(id){
    const docInstance = doc(this.afs,'categories',id);
    deleteDoc(docInstance).then(docref =>{
      this.toastr.success("Data Deleted..!")
    })
  }
}
