const menu = [
    {
      id: 1,
      title: "chicken cheese pasta",
      category: "lunch",
      price: 6.30,
      img: "./slike/slika1.jpg",
      desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod.`,
    },
    {
      id: 2,
      title: "avocado toast",
      category: "breakfast",
      price: 4.20,
      img: "./slike/slika2.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod.`,
  
    },
    {
      id: 3,
      title: "steak tartare",
      category: "lunch",
      price: 13.12,
      img: "./slike/slika3.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod.`,
    
    },
    {
      id: 4,
      title: "chia pudding",
      category: "breakfast",
      price: 4.60,
      img: "./slike/slika4.jpg",
      desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod.`,
     
    },
    {
      id: 5,
      title: "cheesecake",
      category: "desert",
      price: 2.60,
      img: "./slike/slika5.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod. `,

    },
    {
      id: 6,
      title: "tofu ramen noodles",
      category: "lunch",
      price: 10.25,
      img: "./slike/slika6.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod.`,

    },
    {
      id: 7,
      title: "spicy chicken chowmain",
      category: "lunch",
      price: 9.60,
      img: "./slike/slika7.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod. `,

    },
    {
      id: 8,
      title: "chili con carne",
      category: "lunch",
      price: 8.90,
      img: "./slike/slika8.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod. `,

    },
    {
      id: 9,
      title: "blueberry oatmeal",
      category: "breakfast",
      price: 4.60,
      img: "./slike/slika9.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod.`,

    },
    {
      id: 10,
      title: "chocolate brownie",
      category: "desert",
      price: 2.60,
      img: "./slike/slika10.jpg",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta. 
      Deserunt, optio! Perspiciatis odit exercitationem maiores autem ullam facere quod.`,

    },
  ];

const sectionCenter = document.querySelector('.section-center');
const container = document.querySelector('.btn-container');
const backToTopButton = document.querySelector('.btn-container2');
const searchInput = document.querySelector('#search-input');
const slider = document.querySelector('#slider');
const fill = document.querySelector('.bar .fill');
const stars = document.querySelector('.stars i');

window.addEventListener('DOMContentLoaded',function(){
    displayMenuItems(menu);
    displayMenuButtons();
});


function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(item){

        //console.log(item);

        return `<article class="menu-item">
        <img src=${item.img} class="photo" alt=${item.title}>
        <div class="item-info">
            <header>
                <h4>${item.title}</h4>
                <h4 class="price">${item.price}€</h4>
            </header>
            <p class="item-text">
            ${item.desc}
            </p>
        </div>
    </article>`;
    })
    displayMenu = displayMenu.join("")
    sectionCenter.innerHTML = displayMenu
}



function displayMenuButtons(){
    const categories = menu.reduce(function(values,item){
        if(!values.includes(item.category)){
            values.push(item.category)
        }

        return values;

    }, ['all']
    );
    const categoryBtns = categories.map(function(category){
        return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
    }).join("");   
    container.innerHTML = categoryBtns;

    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function(btn){
        btn.addEventListener('click', function(e){
            const category = e.currentTarget.dataset.id;
            const menuCategory = menu.filter(function(menuItem){
                //console.log(menuItem.category);
                if(menuItem.category === category){
                    return menuItem; 
                }
    
            });
            //console.log(menuCategory);
    
            if(category === 'all'){
                displayMenuItems(menu);
            }
            else{
                displayMenuItems(menuCategory);
            }
        })
    })
}

backToTopButton.addEventListener('click', scrollToTop);

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMenu = menu.filter(function (menuItem) {
      return menuItem.title.toLowerCase().includes(searchTerm);
    });
    displayMenuItems(filteredMenu);
  });

  function setBar() {
    const sliderValue = slider.value;
    const fillWidth = ((sliderValue - slider.min) / (slider.max - slider.min)) * 100;
    fill.style.width = fillWidth + '%';
  
    const selectedPrice = parseFloat(sliderValue);
    const menuItemsWithinRange = menu.filter(function (menuItem) {
      return menuItem.price <= selectedPrice;
    });
  
    displayMenuItems(menuItemsWithinRange);
  }
  
  slider.addEventListener('input', setBar);
  
  setBar();

  function displayRandomItem() {
    const randomIndex = Math.floor(Math.random() * menu.length);
    const randomItem = menu[randomIndex];
    displayMenuItems([randomItem]);
  }
  
  const randomBtn = document.querySelector('.random-btn');
  randomBtn.addEventListener('click', displayRandomItem);
