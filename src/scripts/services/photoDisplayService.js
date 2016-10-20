

export let photoItem = (detail) =>{
   let imgSrc= "https://farm"+detail.farm+".staticflickr.com/"+detail.server+"/"+detail.id+"_"+detail.secret+"_q.jpg"
   return $('<a href="#" data-title="'+detail.title+'" data-id="'+detail.id+'" class="js-photo-item photo-item"><img class="photo-item" src='+imgSrc+' /></a>')
}

export let photoDisplay = (detail) =>{
  console.dir(detail)
  let imgSrc= "https://farm"+detail.farm+".staticflickr.com/"+detail.server+"/"+detail.id+"_"+detail.secret+"_b.jpg"
  let detalsDescription=detail.description._content||"No description for this photo";
  let detalsTaken=detail.dates.taken;
  let detalsOwner=detail.owner.username;
  let detalsUrl=detail.urls.url[0]._content;


  return '<div class="photo-detail-img"><img src="'+imgSrc+'"/></div>'+
  		 '<div class="photo-detail-text">'+
  		 	 '<div class="photo-detail-owner">'+detalsOwner+'</div>'+
  		 	 '<div class="photo-detail-taken">'+detalsTaken+'</div>'+
  		 	 '<div class="photo-detail-url"><a href="'+detalsUrl+'" target="_blank" >'+detalsUrl+'</a></div>'+
  		 	 '<div class="photo-detail-description"><p>'+detalsDescription+'</p></div>'+
  		 '</div>'
}
