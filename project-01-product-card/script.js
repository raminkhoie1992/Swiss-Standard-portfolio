/* ============================
   1. DATA
   ============================ */
const products = [
    {
        id: 1,
        name: "Keyboard",
        description:"this is keyboard description",
        price: 500,
        images: ["keyboard1-1.jpg", "keyboard1-2.jpg", "keyboard1-3.jpg"],
        colors: [
            { name: "black", hex: "#000000" },
            { name: "brown", hex: "#8b4513" }
        ]
    },
    {
        id: 2,
        name: "Mouse",
        description: "this is mouse description",
        price:350,
        images: ["mouse1-1.jpg","mouse1-2.jpg","mouse1-3.jpg"],
        colors: [
            { name: "black", hex: "#000000" },
            { name: "brown", hex: "#8b4513" }
        ]
    }
];


/* ============================
   2. DOM REFERENCES
   ============================ */
const container = document.querySelector('.products-container');
const template  = document.querySelector('#product-card-template');

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
    
 container.appendChild(clone);   
}

products.forEach(function(product){
    render(product);
})
    
    

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
    if (e.target.closest('.color-option')) {
    const colorBtn = e.target.closest('.color-option');
    const card = colorBtn.closest('.product-card');
        card.querySelectorAll('.color-option').forEach(function(c){
            c.classList.remove('color-option--active');
        })
        colorBtn.classList.add('color-option--active');    
    }
        

});


