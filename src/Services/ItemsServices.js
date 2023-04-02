/*CON FETCH
export function getAllNoticias (){
    return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res=>res.json())

}

export function getNoticiaById (id){
    return fetch("https://jsonplaceholder.typicode.com/posts/"+id)
    .then(res=>res.json())
}*/

//CON AXIOS

import instance from "../Config/axios";
export function getAllNoticias(){
    return instance.get();
}
export function getNoticiaById (id){
    return instance.get(id);
}
        




