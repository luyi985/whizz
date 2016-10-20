import "babel-polyfill";
import {state} from './state.js';
import {searchByTags ,getPhotoDetail} from './services/apiService.js';
import {photoDisplay, photoItem} from './services/photoDisplayService.js';



let photoContainer= $("#js-photoDis");
let photoDetailsContainer= ".js-photo-details-container";
let photoitemSelect= ".js-photo-item";
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




$("document").ready(function(){

	//============Init======================================================================

	loadCategory();
	loadPhoto();


    //===========load more btn on click=================================================


	$('body').on('click',loadMoreBtnSelect,function(e){
		if(state.currentPage>=state.totalPage) return;
		let _this=$(this);
		_this.attr("disabled", true).text("loading...");
		loadPhoto(()=>{
			_this.attr("disabled", false).text('Load More');
		})
	});

	//===========Category item on click=================================================

	$('body').on('click',categoryItemSelect,function(e){
		e.preventDefault();
		$(categoryItemSelect).removeClass('active');
		$(this).addClass('active');
		$(photoContainer).html("");
		//------state update----------
		state.currentCategory=$(this).attr('href');
		state.totalPage=0;
		state.currentPage=0;
		loadPhoto();
	});

	//===========Photo item on click=================================================

	$('body').on('click',photoitemSelect,function(e){
		e.preventDefault();
		//$(photoContainer).html("");
		//-------state update-----------------
		state.currentPhoto=$(this).attr('data-id');
		$(photoDetailsContainer).addClass("active");
		getPhotoDetail(state.currentPhoto).done((data)=>{
			$(photoDetailsContainer).find('h1').text(data.photo.title._content);
			$(photoDetailsContainer).find(".js-photo-details-content").html(photoDisplay(data.photo));
		})
	});

	$('body').on('click','.js-photo-details-close', function(e){
		$(photoDetailsContainer).removeClass("active");
		$(photoDetailsContainer).find(".js-photo-details-content").html('');
	});

})