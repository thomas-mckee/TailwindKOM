const SegmentList = ({ segments }) => {
  return (
    <div className="flex flex-wrap -mx-2">
      {segments
        .sort((a, b) => b.angleDiff - a.angleDiff)
        .map((segment) => (
          <div key={segment.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-4 border rounded shadow h-full">
              <h3 className="text-lg font-semibold">{segment.name}</h3>
              <p>Distance: {(segment.distance / 1000).toFixed(2)} km</p>
              <p>Bearing: {segment.bearing?.toFixed(1)}°</p>
              <p>Wind Impact Score: {segment.angleDiff.toFixed(1)}</p>
              <a
                href={`https://www.strava.com/segments/${segment.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline"
              >
                View on Strava
              </a>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SegmentList
