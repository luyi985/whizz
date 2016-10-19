
let perPage=20;
let baseUrl=" https://api.flickr.com/services/rest/?api_key=48daca318ea080f4513f975e6a084b05&format=json&nojsoncallback=1&per_page="+perPage;
let searchApi= [baseUrl,"method=flickr.photos.search","tags="].join("&");
let getDetailApi= [baseUrl,"method=flickr.photos.getInfo","photo_id="].join("&");

export let searchByTags = (tags,currentPage)=>{
	return $.ajax(searchApi+tags+"&page="+currentPage);
}


export let getPhotoDetail =(id)=>{
	return $.ajax(getDetailApi+id);
}


