var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        let anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}
let client = new HttpClient();
let idChannel = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
let part = 'statistics,brandingSettings';
let titleChannel = document.querySelector("#title-channel");
let descriptionChannel = document.querySelector("#description-channel");
let imageChannel = document.querySelector("#image-channel");
let subscribersChannel = document.querySelector("#count");
let form = document.querySelector('#form');


let showStat = (id) => {
    client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s`, (response) => {
        // console.log(JSON.parse(response).items[0].statistics.subscriberCount);
        let info = JSON.parse(response).items[0];
        titleChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.description;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
        subscribersChannel.innerText = info.statistics.subscriberCount;
        
    });
    
}

let searchChannel = (nameChannel) => {
    client.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${nameChannel}&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s`, (responce) => {
        let info = JSON.parse(responce).items[0].snippet.channelId;
        console.log(info);
        showStat(info);
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let nameChannel = document.querySelector('#name-channel').value;
    searchChannel(nameChannel);
    
})

showStat(idChannel);

// let showDescription = () => {
//     client.get('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=UC1GZxcmyiOcRwmM2bvURHZw&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s', (response) => {
//         console.log(JSON.parse(response).items[0].brandingSettings.channel.description);
//     })
// }
// showDescription();




