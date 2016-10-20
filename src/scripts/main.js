import "babel-polyfill";
import {state} from './state.js';
import {searchByTags ,getPhotoDetail} from './services/apiService.js';
import {photoDisplay, photoItem} from './services/photoDisplayService.js';



let photoContainer= $("#js-photoDis");
let loadMoreBtnSelect= '.js-loadMoreBtn';
let categoriesSelect= '.js-categories';
let categoryItemSelect= '.js-category-item';
//------------------------------------------------------


let loadPhoto =(callBack) =>{
	searchByTags(state.currentCategory,++state.currentPage).done(function(data){
		console.dir(data);
		state.currentPage=data.photos.page;
		state.totalPage=data.photos.pages;
		data.photos.photo.map((item)=>{
			photoContainer.append(photoItem(item));
		});
		if(callBack){
			callBack();
		}
		
	})
}
let loadCategory = () =>{
	let categoryList= '<ul class="category-list"><li>'+
						state.categories.map((cat)=>{
							return "<a href="+cat+" class='js-category-item'>"+cat+"</a>"
						}).join("</li><li>")+
						"</li>";
	$(categoriesSelect).html(categoryList);
}
let categoryChange = (e) =>{

}




getPhotoDetail(30437411835).done((data)=>{
	console.dir(data);
})





$("document").ready(function(){
	loadCategory();
	loadPhoto();


    //-------------------------------------------------------	
	$('body').on('click',loadMoreBtnSelect,function(e){
		if(state.currentPage>=state.totalPage) return;
		let _this=$(this);
		_this.attr("disabled", true).text("loading...");
		loadPhoto(()=>{
			_this.attr("disabled", false).text('Load More');
		})
	});

	$('body').on('click',categoryItemSelect,function(e){
		e.preventDefault();
		$(categoryItemSelect).removeClass('active');
		$(this).addClass('active');
		$(photoContainer).html("");
		state.currentCategory=$(this).attr('href');
		state.totalPage=0;
		state.currentPage=0;
		loadPhoto();
	});

})