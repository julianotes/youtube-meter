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
let idChannel = 'UC1GZxcmyiOcRwmM2bvURHZw';
let part = 'statistics,brandingSettings';
let nameChannel = document.querySelector("#name-channel");
let descriptionChannel = document.querySelector("#description-channel");
let imageChannel = document.querySelector("#image-channel");
let subscribersChannel = document.querySelector("#count");



let showStat = () => {
    client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${idChannel}&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s`, (response) => {
        // console.log(JSON.parse(response).items[0].statistics.subscriberCount);
        let info = JSON.parse(response).items[0];
        nameChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.description;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
        subscribersChannel.innerText = info.statistics.subscriberCount;
        
    });

}

showStat();

// let showDescription = () => {
//     client.get('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=UC1GZxcmyiOcRwmM2bvURHZw&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s', (response) => {
//         console.log(JSON.parse(response).items[0].brandingSettings.channel.description);
//     })
// }
// showDescription();




