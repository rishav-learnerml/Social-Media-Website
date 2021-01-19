import { ApiUrls } from "../helpers/urls";
import { ADD_POST, UPDATE_POSTS } from "./actionTypes";

export function fetchPosts() {
    return (
        dispatch=>{
            const url = ApiUrls.fetchPosts();
            fetch(url)
            .then((res)=>{return res.json()})
            .then((data)=>{
                console.log(data);
                dispatch(updatePosts(data.data.posts));
            })
        }
    )
}

export function updatePosts(posts){
    return{
        type: UPDATE_POSTS,
        posts
    }
}

export function addPost (post){
    return {
        type:ADD_POST,
        post,
    };
}