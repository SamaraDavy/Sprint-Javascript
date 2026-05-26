
let carouselArr = [];

class Carousel {
    constructor(image, text, link) {
        this.image = image;
        this.text = text;
        this.link = link;
    }

    static Start(arr) {
        if (arr && arr.length > 0) {
            Carousel._arr = arr;
            Carousel._sequence = 0;
            Carousel.Render(); 
            Carousel.StartInterval();
        } else {
            throw "Method Start needs an Array Variable.";
        }
    }

    static Render() {
        const item = Carousel._arr[Carousel._sequence];
        const divImg = document.getElementById("carousel");
        const divTitle = document.getElementById("carousel-title");

        if (divImg && divTitle) {
          
            divImg.innerHTML = `
                <div class="carousel-container">
                    <button onclick="Carousel.Prev()" class="btn-carousel prev">&#10094;</button>
                    <a href="${item.link}">
                        <img src="img/${item.image}" class="carousel-image">
                    </a>
                    <button onclick="Carousel.Next()" class="btn-carousel next">&#10095;</button>
                </div>
            `;
            divTitle.innerHTML = `<h2>${item.text}</h2>`;
        }
    }

    static Next() {
        Carousel._sequence++;
        if (Carousel._sequence >= Carousel._arr.length) {
            Carousel._sequence = 0;
        }
        Carousel.Render();
        Carousel.ResetInterval();
    }

    static Prev() {
        Carousel._sequence--;
        if (Carousel._sequence < 0) {
            Carousel._sequence = Carousel._arr.length - 1;
        }
        Carousel.Render();
        Carousel.ResetInterval();
    }

    static StartInterval() {
        Carousel._interval = setInterval(function() { 
            Carousel.Next(); 
        }, 5000);
    }

    static ResetInterval() {
        clearInterval(Carousel._interval);
        Carousel._interval = setInterval(function() { Carousel.Next(); }, 5000);
    }
}