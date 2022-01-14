const images = [
    {
        image : 'img/01.jpg',
        title : 'Svezia',
        text :'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
    },
    {
        image : 'img/02.jpg',
        title : 'Svizzera',
        text :'Lorem ipsum',
    },
    {
        image : 'img/03.jpg',
        title : 'Gran Bretagna',
        text :'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
        image : 'img/04.jpg',
        title : 'Germania',
        text :'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
    },
    {
        image : 'img/05.jpg',
        title : 'Paradise',
        text :'Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
    },
];

const min = 0;
const max = images.length;
let startImage = 0;
imageAutoChange = setInterval(changeImageDown,3000);

var app = new Vue(
    {
        el:"#container",
        data:{
            mainTitle : images[startImage].title,
            mainText : images[startImage].text,
            mainImage : `url(${images[startImage].image})`,
            imagePreview : images.map(x => `url(${x.image})`),
            imageStatus : ["selected","","","",""],
        },
        methods:{
            autoChange : imageAutoChange,
            down : changeImageDown,
            up : changeImageUp,
            reSize : function(){
                this.className += 'ciao';
                console.log('resizeee');
            }
        },
    }
);

function changeImageDown(){
    const elemento = app.$data;
    elemento.imageStatus[startImage] = ""; //rimuove lo stato selected dalla precedente immagine
    startImage++;
    if(startImage == max)
        startImage = min;
    elemento.imageStatus[startImage] = "selected"; //inseriamo selected alla nuova immagine principale
    console.log(startImage,max);
    elemento.mainImage = `url(${images[startImage].image})`;
    elemento.mainTitle = images[startImage].title;
    elemento.mainText = images[startImage].text;
}

function changeImageUp(){
    const elemento = app.$data;
    elemento.imageStatus[startImage] = ""; //rimuove lo stato selected dalla precedente immagine
    if(startImage == min)
        startImage = max;
    startImage--;
    elemento.imageStatus[startImage] = "selected"; //inseriamo selected alla nuova immagine principale
    console.log(startImage,images.length);
    elemento.mainImage = `url(${images[startImage].image})`;
    elemento.mainTitle = images[startImage].title;
    elemento.mainText = images[startImage].text;
}

document.getElementById('carousel').addEventListener('mouseenter',() =>{
    clearInterval(imageAutoChange);
});
document.getElementById('carousel').addEventListener('mouseleave',() =>{
    imageAutoChange = setInterval(changeImageDown,3000);
});