const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const { latitude, longitude} = position.coords;
        socket.emit("send-location", { latitude, longitude});

    }, 
    (error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy: true,
        timeout:5000,
        maximumAge: 0,

    }
    );
}

const map =Location.map("map").setView([0,0],10);

Location.titleLayer("https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "OpenStreetmap"
}).addTo(map)

const marker = {};

socket.on("receive-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    } else {
        markers[id]=Location.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", ()=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id]
    }
})