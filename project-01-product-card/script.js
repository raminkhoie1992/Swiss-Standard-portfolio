/* ============================
   1. DATA
   ============================ */
const container = document.querySelector('.products-container');
const template  = document.querySelector('#product-card-template');

fetch('data.json')
    .then(function(response) {
        // بررسی می‌کنیم آیا درخواست موفق بوده یا نه
        if (!response.ok) {
            throw new Error('خطای شبکه: ' + response.status);
        }
        // تبدیل پاسخ به فرمت JSON قابل خواندن
        return response.json(); 
    })
    .then(function(data) {
        // حالا داده‌ها آماده‌اند! پیام لودینگ را پاک کن
        container.innerHTML = '';
        
        // حلقه را دقیقاً اینجا بنویس، جایی که داده‌ها موجود هستند
        data.forEach(function(product) {
            render(product);
        });
    })
    .catch(function(error) {
        // اگر هر خطایی (مثل پیدا نشدن فایل) رخ داد، اینجا اجرا می‌شود
        console.error('خطا:', error);
        container.innerHTML = '<p>خطا در دریافت اطلاعات. لطفاً صفحه را رفرش کنید.</p>';
    });
/* ============================
   2. DOM REFERENCES
   ============================ */

/* ============================
   3. RENDER
   ============================ */
// اینجا کارت می‌سازیم
function render(product){
    const clone =template.content.cloneNode(true);
    clone.querySelector('.product-card__title').textContent = product.name;
    clone.querySelector('.product-card__description').textContent = product.description;
    clone.querySelector('.product-card__price').textContent= `Price:$${product.price}`;
    clone.querySelector('.product-card__image').src = product.images[0];
    
    const thumbsContainer=clone.querySelector('.product-card__thumbnails');
    product.images.forEach(function(imgSrc,index){
        const btn = document.createElement('button');
             btn.className = 'thumbnail';
             btn.dataset.image = imgSrc;
             btn.type = 'button';
            
         const img = document.createElement('img');
             img.src = imgSrc;
             img.alt = 'view ' + (index + 1);
             btn.appendChild(img);
             thumbsContainer.appendChild(btn);
         
    })
    const colorContainer=clone.querySelector('.color-options');
    product.colors.forEach(function(color,index){
        const colorbtn=document.createElement('button');
        colorbtn.className='color-option';
        colorbtn.dataset.color=color.name;
        colorbtn.style.background=color.hex;
        colorbtn.type='button';
        if (index === 0) {
        colorbtn.classList.add('color-option--active');
    }
    colorContainer.appendChild(colorbtn);
    })
    const cart_info=clone.querySelector('.product-card__info');
    const removebtn=document.createElement('button');
            removebtn.className="product-card__remove";
            removebtn.textContent="Remove!";
            removebtn.type="button";    

cart_info.appendChild(removebtn);
container.appendChild(clone);   

}


/* ============================
   4. EVENTS
   ============================ */
// اینجا کلیک‌ها
container.addEventListener('click', function (e) {
    if (e.target.closest('.thumbnail')) {
         const thumb = e.target.closest('.thumbnail');   // خود دکمه
         const card  = thumb.closest('.product-card');   // کارت والدش
         const image = card.querySelector('.product-card__image');

            image.src = thumb.dataset.image;
        }
     if(e.target.closest('.product-card__button')){
        const btn=e.target.closest('.product-card__button');
        btn.textContent="Added ✓";
        btn.classList.add('product-card__button--success');
         btn.disabled = true;
     }   
     if(e.target.closest('.product-card__remove')) {
        const btn = e.target.closest('.product-card__remove');
        const card = btn.closest('.product-card');
         card.remove(); 
     }  
    if (e.target.closest('.color-option')) {
    const colorBtn = e.target.closest('.color-option');
    const card = colorBtn.closest('.product-card');
        card.querySelectorAll('.color-option').forEach(function(c){
            c.classList.remove('color-option--active');
        })
        colorBtn.classList.add('color-option--active');    
    }
        

});


