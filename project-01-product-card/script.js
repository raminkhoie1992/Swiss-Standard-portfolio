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