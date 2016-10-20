let apiKey="161db40db683c9acd864c22d26a3454f";
let perPage=20;
let baseUrl="https://api.flickr.com/services/rest/?api_key="+apiKey+"&format=json&nojsoncallback=1&per_page="+perPage;
let searchApi= [baseUrl,"method=flickr.photos.search","tags="].join("&");
let getDetailApi= [baseUrl,"method=flickr.photos.getInfo","photo_id="].join("&");

export let searchByTags = (tags,currentPage)=>{
	return $.ajax(searchApi+tags+"&page="+currentPage);
}


export let getPhotoDetail =(id)=>{
	return $.ajax(getDetailApi+id);
}


