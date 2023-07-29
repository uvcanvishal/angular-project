import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc, updateDoc, deleteDoc, docData, where, query, limit, limitToLast, orderBy,getDoc,increment} from '@angular/fire/firestore';
import { list, ref } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: Firestore) { }
  loadFeatured(){
    const collectionInstance = query(collection(this.afs,'posts'),where('isFeatured','==',true),limit(4));
    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      return actions.map(a=>{
        return a;
        //return "vishal";
      })
    }))
  }

  loadLatest(){
    const collectionInstance = query(collection(this.afs,'posts'),orderBy('createdAt',"desc"));
    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      return actions.map(a=>{
        return a;
        //return "vishal";
      })
    }))
  }

  loadCategoryPosts(categoryId){
    const collectionInstance = query(collection(this.afs,'posts'),where('category.categoryId', '==',categoryId),limit(4));
    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      return actions.map(a=>{
        return a;
        //return "vishal";
      })
    }))
  }

  loadOnePost(postId){
    const docInstance = doc(this.afs,'posts',postId);
    return getDoc(docInstance).then(docref=>{
      return docref.data();
    })
    //return doc(this.afs,`posts/${postId}`);
    
    // const collectionInstance = query(collection(this.afs,`posts/${postId}`));
    // return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
    //   return actions.map(a=>{
    //     return a;
    //     //return "vishal";
    //   })
    // }))
  }

  loadSimilar(catId){
    const collectionInstance = query(collection(this.afs,'posts'),where('category.categoryId', '==',catId),limit(4));
    return collectionData(collectionInstance, {idField:'id'}).pipe(map(actions => {
      return actions.map(a=>{
        return a;
        //return "vishal";
      })
    }))
  }

  countViews(postId){
      const viewsCount = {
        views: firebase.firestore.FieldValue.increment(1)
      }
      const docInstance = doc(this.afs,'posts',postId);
      updateDoc(docInstance,viewsCount).then(docref=>{
        console.log('Views Count Updated ..!');
      })
  }
}
