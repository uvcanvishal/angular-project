import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore,collection,addDoc,collectionData,doc, updateDoc, deleteDoc, docData} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: Firestore,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private router: Router
    ) { }

  uploadImage(selectedImage, postData, formStatus, id){
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath,selectedImage).then(()=>{
      console.log('post image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL =>{
        //console.log(postData);
        postData.postImgPath = URL;
        console.log(postData);

        if(formStatus == 'Edit'){
          this.updateData(id,postData);
        }else{
          this.saveData(postData);
        }
      })
    })
  }
    saveData(postData){
      const collectionInstance = collection(this.afs,"posts");

      addDoc(collectionInstance,postData).then((docref)=>{
      console.log("Data Added Successfully:-",docref);
      this.toastr.success('Data inserted Successfully');
      });
      this.router.navigate(['/posts']);
  }

  loadData(){
    const collectionInstance = collection(this.afs,'posts');

    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      return actions.map(a=>{
        return a;
        //return "vishal";
      })
    }))
  }

  loadOneData(id){
    const docInstance = doc(this.afs,'posts',id);
    return docData(docInstance,{idField: 'id'});
  }

  updateData(id,postData){
    const docInstance = doc(this.afs,'posts',id);
    updateDoc(docInstance,postData).then(docref=>{
      this.toastr.success('Data Updated Successfully ..!');
      this.router.navigate(['/posts']);
    })
  }
}
