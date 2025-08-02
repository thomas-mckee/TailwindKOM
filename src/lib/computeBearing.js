export const computeSegmentBearing = (startLatLng, endLatLng) => {
  const [lat1, lng1] = startLatLng;
  const [lat2, lng2] = endLatLng;

  // Convert to radians
  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δλ = (lng2 - lng1) * (Math.PI / 180);

  // Formula from: https://www.movable-type.co.uk/scripts/latlong.html
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  let θ = Math.atan2(y, x); // radians

  let bearing = (θ * 180 / Math.PI + 360) % 360; // degrees normalized (0-360)
  return bearing;
};
