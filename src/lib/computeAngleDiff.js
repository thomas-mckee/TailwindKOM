export const computeAngleDiff = (segmentBearing, windBearing) => {
    const angleDiff = Math.abs(segmentBearing - windBearing);
    return angleDiff
};