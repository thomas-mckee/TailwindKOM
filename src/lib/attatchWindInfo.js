import { computeSegmentBearing } from "./computeBearing";
import { computeAngleDiff } from "./computeAngleDiff";

export const attatchWindInfo = (segments, windBearing) => {
    return segments.map((segment) => {
        const start = segment.start_latlng;
        const end = segment.end_latlng;

        if(!start || !end) return segment;

        const bearing = computeSegmentBearing(start, end);
        const angleDiff = computeAngleDiff(bearing, windBearing);
        
        return {
            ...segment,
            bearing: parseFloat(bearing.toFixed(2)),
            angleDiff: parseFloat(angleDiff.toFixed(2)),
        };
    });
};