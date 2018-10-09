'use strict';

var HttpClient = function HttpClient() {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    };
};
var client = new HttpClient();
var idChannel = 'UC1GZxcmyiOcRwmM2bvURHZw';
var part = 'statistics,brandingSettings';
var nameChannel = document.querySelector("#name-channel");
var descriptionChannel = document.querySelector("#description-channel");
var imageChannel = document.querySelector("#image-channel");
var subscribersChannel = document.querySelector("#count");

var showStat = function showStat() {
    client.get('https://www.googleapis.com/youtube/v3/channels?part=' + part + '&id=' + idChannel + '&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s', function (response) {
        // console.log(JSON.parse(response).items[0].statistics.subscriberCount);
        var info = JSON.parse(response).items[0];
        nameChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.description;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
        subscribersChannel.innerText = info.statistics.subscriberCount;
    });
};

showStat();

// let showDescription = () => {
//     client.get('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=UC1GZxcmyiOcRwmM2bvURHZw&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s', (response) => {
//         console.log(JSON.parse(response).items[0].brandingSettings.channel.description);
//     })
// }
// showDescription();