'use strict';

var probeLayer = L.layerGroup();
var baseStationsCluster;

var probes = [];
var baseStations = [];
var popup = L.popup();

//defining custom icon for base stations
var baseIcon = L.Icon.extend({
    iconSize:     [5, 5],
    iconAnchor:   [22, 94],
    popupAnchor:  [-3, -76]
});
var bsOKicon = new baseIcon({iconUrl:'/production/images/BS_OK.png'}),
    bsALARMicon = new baseIcon({iconUrl:'/production/images/BS_ALARM.png'}),
    bsFAULTicon = new baseIcon({iconUrl:'/production/images/BS_FAULT.png'});

//defining custom icon for probes
var probeIcon = L.Icon.extend({
    iconSize: [3,3],
    iconAnchor: [22,94],
    popupAnchor: [-3,-76]
});
var pbOKIcon = new probeIcon({iconUrl:'/production/images/PB_OK.png'}),
    pbALARMIcon = new probeIcon({iconUrl:'/production/images/PB_ALARM.png'}),
    pbFAULTIcon = new probeIcon({iconUrl:'/production/images/PB_FAULT.png'});

var baseStationsALARM = [];
var baseStationsFAULT = [];
var probesFault = [];


function initMap(){
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets'
    }).addTo(map);

    map.on('click', onMapClick);
    renderMarkers(baseStations);

}

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
    map.removeLayer(probeLayer);
    fillLatLng(e);
}

function fillLatLng(e){
    var latInput = document.querySelector('#lat');
    var longInput = document.querySelector('#long');
    var pbLatInput = document.querySelector('#pb_lat');
    var pngLngInput = document.querySelector('#pb_long');

    if(latInput){
        latInput.value = parseFloat(e.latlng.lat.toFixed(5));
        longInput.value = (parseFloat(e.latlng.lng.toFixed(5)));
    } else {
        pbLatInput.value = parseFloat(e.latlng.lat.toFixed(5));
        pngLngInput.value = (parseFloat(e.latlng.lng.toFixed(5)));
    }
}
function renderMarkers(baseStationData){

    if (baseStationsCluster){
        map.removeLayer(baseStationsCluster);
    }
    if (probeLayer) {
        map.removeLayer(probeLayer)
    }
    baseStationsCluster = L.markerClusterGroup.layerSupport();
    baseStationsCluster.addTo(map);
    baseStationData.forEach(function(baseStation) {
        if (baseStation.status == "OK") {
            renderBsMarker(baseStation,bsOKicon);
        } else if (baseStation.status == "ALARM") {
            renderBsMarker(baseStation,bsALARMicon);
        } else if (baseStation.status == "FAULT") {
            renderBsMarker(baseStation,bsFAULTicon);
        }
    });
}

function renderBsMarker(bs, bsIcon){
    var bsPopUpInfo = "<b>SerialNo: </b>" +
        "<a href='/simulator/" + bs.serial + "'>" + bs.serial + "</a>" +
        "<br/><b>Location: <br/></b> " + bs.lat + " ; " + bs.long +
        "<br/><b>Battery voltage:</b>" +  bs.battery;

    var bsMarker = L.marker([bs.lat, bs.long], {icon: bsIcon}).addTo(map);
    bsMarker.bindPopup(bsPopUpInfo);
    bsMarker.on('click', function(){
        if (probeLayer) {
        map.removeLayer(probeLayer)
    }
        renderProbes(bs);} );
    baseStationsCluster.addLayer(bsMarker);
}

function renderProbes(baseStation){
    var probeMarker;
    var probeMarkers = [];
    probes.forEach(function (probe) {
        if (probe.bsSerial == baseStation.serial) {
            if (probe.status == "OK") {
                probeMarker = L.marker([probe.lat, probe.long], {icon: pbOKIcon});
                console.log("serial match");
            } else if (probe.status == "FAULT") {
                probeMarker = L.marker([probe.lat, probe.long], {icon: pbFAULTIcon});
            } else if (probe.status == "ALARM") {
                probeMarker = L.marker([probe.lat, probe.long], {icon: pbALARMIcon});
            }
            probeMarker.bindPopup("<b>" + probe.time + "</b>" +
                "<br/><b>SerialNo: </b>" +
                "<a href='/probe/" + probe.serial + "'>" + probe.serial + "</a>" +
                "<br/><b> GasLevel: </b> " + probe.gasLevel + " % LEL " +
                "<br/><b> Alarm Setpoint:</b> not set");
            probeMarkers.push(probeMarker);
            probeLayer = L.layerGroup(probeMarkers);
            map.addLayer(probeLayer);
        } else {
            console.log("serial does not match");
        }
    });
}
/*
* Dashboard javascript for rendering BS according to status
* */
function onBsTotalClick(){
    renderBaseStationsByStatus("total");
}
function onBsFaultClick(){
    renderBaseStationsByStatus("faults");
}
function onBsAlarmClick() {
    renderBaseStationsByStatus("alarms");
}

function renderBaseStationsByStatus(status) {
    if (baseStationsCluster){
        map.removeLayer(baseStationsCluster);
    }
    if (probeLayer) {
        map.removeLayer(probeLayer)
    }
    switch (status){
        case "total":
            console.log('Click event triggered for bs total');
            renderMarkers(baseStations);
            break;
        case "alarms":
            console.log('Click event triggered for bs alarms');
            renderMarkers(baseStationsALARM);
            break;
        case "faults":
            console.log('Click event triggered for bs faults');
            renderMarkers(baseStationsFAULT);
            break;
        case "pbfaults":
            console.log('Click event triggered for pb fault');
            break;
        default:
            renderMarkers(baseStations);
            break;
    }
}

function onPbFaultClick() {
    if (baseStationsCluster){
        map.removeLayer(baseStationsCluster);
    }
    if (probeLayer) {
        map.removeLayer(probeLayer)
    }
    var faultProbe;
    var faultProbeMarkers = [];
    if (probeLayer) {
        map.removeLayer(probeLayer)
    }
    probesFault.forEach(function (probe) {
        faultProbe = L.marker([probe.lat, probe.long], {icon: pbFAULTIcon});
        faultProbe.bindPopup("<b>" + probe.time + "</b>" +
            "<br/><b>SerialNo: </b>" +
            "<a href='probe/" + probe.serial + "'>" + probe.serial + "</a>" +
            "<br/><b> GasLevel: </b> " + probe.gasLevel + " % LEL " +
            "<br/><b> Alarm Setpoint:</b> not set");
        faultProbeMarkers.push(faultProbe);
        probeLayer = L.layerGroup(faultProbeMarkers);
        map.addLayer(probeLayer);
    });
}