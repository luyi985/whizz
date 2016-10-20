

export let photoItem = (detail) =>{
   let imgSrc= "https://farm"+detail.farm+".staticflickr.com/"+detail.server+"/"+detail.id+"_"+detail.secret+"_q.jpg"
   return $('<a href="#" data-title="'+detail.title+'" class="photo-item"><img class="photo-item" src='+imgSrc+' /></a>')
}

export let photoDisplay = (datail) =>{
  
}
