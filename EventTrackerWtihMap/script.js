const form = document.querySelector("form");
const description = document.querySelector(".description");

const date = document.querySelector(".date");
let obj = {};
var map;
let mapEve, arr;
let onj;

let info = [];
if (localStorage.getItem("info") != null) {
  onj = JSON.parse(localStorage.getItem("info"));
  info = onj;
}
let bar = [{}];

const list = document.querySelectorAll(".message");
confirm("click on the map and fill the form");
///////

function updateui(onj) {
  ///////////////////////////////////

  if (onj) {
    onj.forEach(function (el) {
      form.insertAdjacentHTML(
        "afterend",
        `<div class="message"> <div><h1 id="desc">${el.event}</h1><p>${el.date}</p></div >
   </div>`
      );
      console.log(el.lng);
      onj.forEach(function (el) {
        L.marker([el.lat, el.lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 170,
              minWidth: 100,
              closeOnClick: false,
              autoClose: false,
              className: "popup",
            })
          )
          .setPopupContent(el.event)
          .openPopup();
      });
    });
  }
}

/////
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(mapEve);
  L.marker([mapEve.latlng.lat, mapEve.latlng.lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 170,
        minWidth: 100,
        closeOnClick: false,
        autoClose: false,
        className: "popup",
      })
    )
    .openPopup()
    .setPopupContent(description.value);
  // L.marker(arr).addTo(map).bindPopup().setPopupContent("helllo").openPopup();
  obj = {
    event: description.value,
    date: date.value,
    lat: mapEve.latlng.lat,
    lng: mapEve.latlng.lng,
  };
  info.push(obj);
  form.classList.add("hidden");
  // if (info.length == 0) return;

  form.insertAdjacentHTML(
    "afterend",
    `<div class="message"> <div><h1 id="desc">${description.value}</h1><p>${date.value}</p></div >
    </div>`
  );
  localStorage.setItem("info", JSON.stringify(info));
  date.value = "";
  description.value = "";
  // console.log(info);
});

//////////////////
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      arr = [position.coords.latitude, position.coords.longitude];
      map = L.map("map").setView(arr, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      updateui(onj);
      map.on("click", function (mapEvent) {
        form.classList.remove("hidden");
        mapEve = mapEvent;
      });
    },
    function () {
      alert("404 connect to the internet to fetch location and try again");
    }
  );
}
/////////////

// console.log(list);
