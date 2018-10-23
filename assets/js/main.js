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
var idChannel = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
var part = 'statistics,brandingSettings';
var titleChannel = document.querySelector("#title-channel");
var descriptionChannel = document.querySelector("#description-channel");
var imageChannel = document.querySelector("#image-channel");
var subscribersChannel = document.querySelector("#count");
var form = document.querySelector('#form');

var showStat = function showStat(id) {
    client.get('https://www.googleapis.com/youtube/v3/channels?part=' + part + '&id=' + id + '&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s', function (response) {
        // console.log(JSON.parse(response).items[0].statistics.subscriberCount);
        var info = JSON.parse(response).items[0];
        titleChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.description;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
        subscribersChannel.innerText = info.statistics.subscriberCount;
    });
};

var searchChannel = function searchChannel(nameChannel) {
    client.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=' + nameChannel + '&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s', function (responce) {
        var info = JSON.parse(responce).items[0].snippet.channelId;
        console.log(info);
        showStat(info);
    });
};

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var nameChannel = document.querySelector('#name-channel').value;
    searchChannel(nameChannel);
});

showStat(idChannel);

// let showDescription = () => {
//     client.get('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=UC1GZxcmyiOcRwmM2bvURHZw&key=AIzaSyDkdWOFwaXBG9WlVVGt8CfDeRNdsD7uC6s', (response) => {
//         console.log(JSON.parse(response).items[0].brandingSettings.channel.description);
//     })
// }
// showDescription();