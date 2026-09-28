console.log('script load');
const btn= document.querySelector('.product-card__button');
console.log('btn found',btn);
function handleAddToCart() {
    
    btn.textContent="added!";
   btn.classList.add('product-card__button--success');
    timer=setTimeout(() => {
        btn.textContent="add to card";
        btn.classList.remove('product-card__button--success');
    }, 2000);
     
   
}
btn.addEventListener('click',handleAddToCart );
//change thubmnail image by click

//set varibales
const mainImage  = document.querySelector('.product-card__image');
const thumbnails = document.querySelectorAll('.thumbnail');
const colors     = document.querySelectorAll('.color-option');
const colorName= document.querySelector('.product-card__color-name');

//cheack to see correct sellect of varibales
console.log('corroct',mainImage);
console.log('thumbnails',thumbnails);
console.log('colors',colors);
console.log(colorName);
//set function  for each
thumbnails.forEach(function (thumb){
    thumb.addEventListener('click',function(){
         mainImage.src = thumb.dataset.image;
         activateThumbnail(thumb);
       
    })
});
function activateThumbnail(thumb) {

    thumbnails.forEach(function (t) {
        t.classList.remove('thumbnail--active');
    });

    thumb.classList.add('thumbnail--active');
}
colors.forEach(function(color){
    color.addEventListener('click',function(){
        activeColor(color);
    })
})
function activeColor(color){
    colors.forEach(function(c){
        c.classList.remove('color-option--active');
    })
    color.classList.add('color-option--active');
    colorName.textContent = color.dataset.color;
}