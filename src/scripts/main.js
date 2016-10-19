import "babel-polyfill";
import {searchByTags ,getPhotoDetail} from './services/apiService.js';
searchByTags("girls",2).done(function(data){
	console.dir(data);
})


getPhotoDetail(30437411835).done((data)=>{
	console.dir(data);
})