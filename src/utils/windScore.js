
export const calculateWindScore = (segment, weather) => {
    const segmentBearing = calculateSegmentBearing(segment.start_latlng, segment.end_latlng);

    const windDirection = weather.wind.deg;
    const windSpeed = weather.wind.speed;

    const relativeAngle = calculateRelativeWindAngle(segmentBearing, windDirection);
    const alignmentFactor = calculateAlignmentFactor(relativeAngle);

    const score = calculateScore(alignmentFactor, windSpeed);

    const impact = determineWindImpact(relativeAngle);

    return {
        score,
        impact,
    };
}

export const calculateSegmentBearing = (startLatLng, endLatLng) => {
    const [lat1, lng1] = startLatLng;
    const [lat2, lng2] = endLatLng;

    const dLng = (lng2 - lng1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;

    const y = Math.sin(dLng) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);

    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    
    return (bearing + 360) % 360;;
};

const calculateRelativeWindAngle = (segmentBearing, windDirection) => {
    let angleDiff = Math.abs(segmentBearing - windDirection);
    if (angleDiff > 180) {
        angleDiff = 360 - angleDiff;
    }
    return angleDiff;
}

const calculateAlignmentFactor = (angleDifference) => {
    return -1 * Math.cos(angleDifference * Math.PI / 180);
}

const calculateScore = (alignmentFactor, windSpeed) => {
    const maxWindSpeed = 12;
    const windSpeedFactor = Math.min(windSpeed, maxWindSpeed) / maxWindSpeed;
    
    // Use exponential scaling for more dramatic differences
    const windPower = Math.pow(windSpeedFactor, 1.4);
    console.log(windPower);
    // Create more extreme scoring based on wind direction
    let score;
    if (alignmentFactor > 0.6) {
        // Strong tailwind: 70-100
        score = 70 + (30 * windPower * (alignmentFactor - 0.5) / 0.3);
    } else if (alignmentFactor > 0) {
        // Weak tailwind: 50-70  
        score = 50 + (20 * windPower * alignmentFactor / 0.7);
    } else if (alignmentFactor > -0.6) {
        // Weak headwind: 20-50
        score = 30 + (30 * windPower * alignmentFactor / 0.7);
    } else {
        // Strong headwind: 0-20
        score = 0 + (20 * windPower * (alignmentFactor + 0.5) / 0.3);
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

const determineWindImpact = (relativeAngle) => {
    if (relativeAngle <= 45) {
      return 'headwind';
    } else if (relativeAngle <= 135) {
      return 'crosswind';
    } else {
      return 'tailwind';
    }
}


export const getScoreColour = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 65) return 'text-green-500 bg-green-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    if (score >= 35) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
}

export const getScoreBorderColour = (score) => {
    if (score >= 80) return 'border-green-200';
    if (score >= 65) return 'border-green-100';
    if (score >= 50) return 'border-yellow-200';
    if (score >= 35) return 'border-orange-200';
    return 'border-red-200';
}