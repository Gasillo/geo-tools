// Function necessary for calculating tiles coordinates by Lat,Lng,Zoom params
// in Spherical Mercator projection,
// EPSG:900913 (EPSG:Google, Google Maps Global Mercator), EPSG:3785, OSGEO:41001.

function getTileCoordinates(lat, lng, zoom) {
    var TILE_SIZE = 256;

    var point = {x: null, y: null};
    point.x = (TILE_SIZE / 2) + lng * (TILE_SIZE / 360);
    var siny = Math.sin(lat * (Math.PI / 180));
    if (siny < -0.9999) siny = -0.9999;
    if (siny > 0.9999) siny = 0.9999;
    point.y = (TILE_SIZE / 2) + 0.5 * Math.log((1 + siny) / (1 - siny)) * -(TILE_SIZE / (2 * Math.PI));

    var pixelGlobalCoord = {
        x: point.x * Math.pow(2, zoom),
        y: point.y * Math.pow(2, zoom)
    };

    return {
        x: Math.floor(pixelGlobalCoord.x / TILE_SIZE),
        y: Math.floor(pixelGlobalCoord.y / TILE_SIZE)
    }
}

console.log(getTileCoordinates(48.923473, 24.714388, 7));
// must print Object {x=72, y=43}
