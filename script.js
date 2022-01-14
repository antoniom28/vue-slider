const images = [
    {
        image: 'img/01.jpg',
        title: 'Svezia',
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
    },
    {
        image: 'img/02.jpg',
        title: 'Svizzera',
        text: 'Lorem ipsum',
    },
    {
        image: 'img/03.jpg',
        title: 'Gran Bretagna',
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
        image: 'img/04.jpg',
        title: 'Germania',
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
    },
    {
        image: 'img/05.jpg',
        title: 'Paradise',
        text: 'Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
    },
];

const min = 0;
const max = images.length;
let startImage = 0;
imageAutoChange = setInterval(changeImageButton, 3000);

var app = new Vue(
    {
        el: "#container",
        data: {
            mainTitle: images[startImage].title,
            mainText: images[startImage].text,
            mainImage: `url(${images[startImage].image})`,
            size: "normal",
            imagePreview: images.map(x => `url(${x.image})`),
            imageStatus: ["selected", "", "", "", ""],
        },
        methods: {
            autoChange: imageAutoChange,
            down: changeImageButton,
            up: changeImageButton,
            reSize: function () {
                if (this.size == "normal")
                    this.size = 'big';
                else
                    this.size = "normal"
            },
            changeImageOnClick: changeImageClick,
        },
    }
);

function changeImageButton(direction) {
    const elemento = app.$data;
    elemento.imageStatus[startImage] = ""; //rimuove lo stato selected dalla precedente immagine
    if (direction == 'up') {
        if (startImage == min)
            startImage = max;
        startImage--;
    } else { // down
        startImage++;
        if (startImage == max)
            startImage = min;
    }

    changeImage(elemento, startImage);
}

function changeImageClick(index) {
    const elemento = app.$data;
    startImage = index;
    for (let i = 0; i < max; i++)
        elemento.imageStatus[i] = ""; //rimuove lo stato selected da tutte

    changeImage(elemento, startImage);
}

function changeImage(elemento, indice) {
    elemento.imageStatus[indice] = "selected"; //inseriamo selected alla nuova immagine principale
    elemento.mainImage = `url(${images[indice].image})`;
    elemento.mainTitle = images[indice].title;
    elemento.mainText = images[indice].text;
}

document.getElementById('carousel').addEventListener('mouseenter', () => {
    clearInterval(imageAutoChange);
});
document.getElementById('carousel').addEventListener('mouseleave', () => {
    imageAutoChange = setInterval(changeImageButton, 3000);
});