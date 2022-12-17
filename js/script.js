let breakingNewsImg = document.querySelector('#breakingNewsImg')
let breakingNewsTitle = document.querySelector('#breakingNews .title')
let breakingNewsAbs = document.querySelector('#breakingNews .abstract')
let topNews = document.querySelector('.topNews')
const apiURL = 'https://api.nytimes.com/svc/topstories/v2/business.json?api-key=9jvp2H7UjFg5PbVRHp3x9HoWR3737TPd';

const getNews = async () => {
    const response = await fetch(apiURL)
    const data = await response.json();
    console.log(data.results);
    return data.results;
}

const breakingNews = (data) => {
    breakingNewsImg.innerHTML = `<img src=${data[0].multimedia[0].url} alt="image">`
    breakingNewsTitle.innerHTML = `<a href=${data[0].title} target="_blank"><h2>${data[0].title}</h2></a>`
    breakingNewsAbs.innerHTML = `${data[0].abstract}`
}
getNews().then(breakingNews);



const listTopNews = (data) => {
    let html = ''
    let title = ''
    data.forEach((element) => {
        let imageUrl;
        if (element.multimedia && element.multimedia.length > 0) {
            imageUrl = element.multimedia[0].url;
        }
        else {
            imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
        }
        if (element.title.length < 100) {
            title = element.title
        }
        else {
            title = element.title.slice(0, 100) + "..."
        }
        html += `<div class="news">
                    <div class="img">
                        <img src=${imageUrl} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    topNews.innerHTML = html
}

getNews().then(listTopNews);
