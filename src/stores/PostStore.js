import { observable, action } from 'mobx';
import {createContext} from "react";
import axios from 'axios'
//import { actionFieldDecorator } from 'mobx/lib/internal';
class PostStore{
  @observable posts = {};
  static instance = null;

  static getInstance () {
    if (!PostStore.instance) 
      this.instance = new PostStore();
    return PostStore.instance;
  }
  constructor(){
    this.context = createContext(this)
  }
  @action 
  async readAll(){
    const result = await axios.get(
        `/api/post/all`
    ).catch(error => {return null });
    return result === null ? null : result.data
  }
  @action 
  async search(category, input){
    const result = await axios.get(
      // something
    ).catch(error => {return null});
    return result === null ? null : result.data
  }
}
export default  PostStore = PostStore.getInstance()