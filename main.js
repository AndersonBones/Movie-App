const API_KEY = "api_key=c19e47de5ace8c89c96192bc10c2dc45";
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const Search_URL = 'https://api.themoviedb.org/3/search/movie?'+API_KEY+'&query=';

const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},
                {"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},
                {"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},
                {"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},
                {"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},
                {"id":10752,"name":"War"},{"id":37,"name":"Western"}];


var main = document.getElementsByTagName("main")[0];
var posters_img = document.getElementsByTagName("img");
var info_movie = document.getElementsByClassName("info-movie");
var overview = document.getElementsByClassName("overview");
var form = document.getElementsByTagName("form")[0];
var search_value = document.getElementById('search');
var genre_btn = document.getElementsByTagName("button");
var array_genre = [];



set_Genre();

function show_movies(){
    main.style.animation = '';
    setTimeout(()=>{
        main.style.animation = ' myanime 1s ease';
        for(var i=0; i<array_genre.length; i++){
            if(array_genre[i].name == this.innerText){
               getMovies(API_URL+'&with_genres='+array_genre[i].id)
            }
        }
    }, 10)

    

}



function set_Genre(){
    
    for(var i=0; i<genre_btn.length; i++){
        genre_btn[i].innerText = genres[i].name;
        array_genre.push({id:genres[i].id, name:genres[i].name});
    }

    for(var button of genre_btn){
        button.addEventListener("click", show_movies);
    }
}   





form.addEventListener('submit',(e)=>{
    main.style.animation = '';
    e.preventDefault();
    const Search_value = search_value.value;


    if(Search_value){
        setTimeout(()=>{
            main.style.animation = ' myanime 2s ease';
            getMovies(Search_URL+Search_value);
        }, 10)
        
    }
})

getMovies(API_URL);

function getMovies(url){
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        DataMovie(data.results);
    })
}



function DataMovie(data){
    
    for(var i=0; i<overview.length; i++){ 
        overview[i].children[1].innerText = data[i].overview;
    }

    for(var i=0; i<posters_img.length; i++){
        posters_img[i].setAttribute('src', IMG_URL+data[i].poster_path);
        
    }

    for(var i=0; i<info_movie.length; i++){
        info_movie[i].children[0].innerText = data[i].original_title;

        info_movie[i].children[1].innerText = data[i].vote_average;
        set_vote_avarage(info_movie[i].children[1],data[i].vote_average);

    }

}

function set_vote_avarage(element, vote_average){
    if(parseFloat(vote_average) > 7.4){
        element.style.color = 'lightgreen';
    }
    else if(parseFloat(vote_average) < 7.1){
        element.style.color = 'red';
    }
    else if(parseFloat(vote_average) >= 7.1 && parseFloat(vote_average) <= 7.4){
        element.style.color = 'orange';
    }
}

