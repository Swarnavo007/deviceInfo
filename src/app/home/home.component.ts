import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import * as PostActions from '../actions/post.action'

interface AppState {
  post: Post;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  post: Observable<Post> // emits value of type Post
  // emits value of type Post

  // emits value of type Post
  text:string /// form input val
 /// form input val

  constructor(private store: Store<AppState>) { 
    this.post = this.store.select('post')
  }
  

  ngOnInit(): void {
    
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text) )
  }

  resetPost() {
    this.store.dispatch(new PostActions.Reset())
  }

  upvote() {
    this.store.dispatch(new PostActions.Upvote())
  }

  downvote() {
    this.store.dispatch(new PostActions.Downvote())
  }

  

}
