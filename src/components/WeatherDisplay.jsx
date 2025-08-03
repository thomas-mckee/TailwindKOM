const WeatherDisplay = ({ weatherData: { name, wind } }) => {
    return (
        <div className="grid place-items-center m-10">
            <div className="flex flex-col justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="rgb(120 159 179)" width="100" height="100" style={{ transform: `rotate(${(wind.deg + 180) % 360}deg)` }}>
                    <path d="M64 1 17.9 127 64 99.8l46.1 27.2L64 1zm0 20.4 32.6 89.2L64 91.3V21.4z" />
                </svg>
                <h2 className="text-5xl font-bold mt-4">{getWindDirection({ direction: wind.deg })}</h2>
            </div>

            <h2 className="text-3xl font-bold">{Math.round(wind.speed * 3.6)} km/h</h2>
            <h2 className="text-xl mt-1 text-gray-500">{name}</h2>
        </div>
    );
};

export default WeatherDisplay;

const getWindDirection = ({ direction }) => {
    const directions = [
        "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
    ];
    
    const index = Math.round(direction / 22.5) % 16;
    return directions[index];
};
