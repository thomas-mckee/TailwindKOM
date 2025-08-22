import { MapPin, TrendingUp, Clock, Trophy, Wind, Bike } from 'lucide-react';
import { getScoreColour, getScoreBorderColour } from "../utils/windScore";

export const SegmentCard = ({ segment }) => { 
    const windScoreColourClass = getScoreColour(segment.windScore.score);
    const windScoreBorderClass = getScoreBorderColour(segment.windScore.score);
    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const formatDistance = (meters) => {
        if (meters < 1000) {
            return `${Math.round(meters)}m`;
        }
        return `${(meters / 1000).toFixed(1)}km`;
    }

    const formatGrade = (grade) => {
        return `${grade > 0 ? '+' : ''}${grade.toFixed(1)}%`;
    };

    const getWindImpactIcon = () => {
        switch (segment.windScore.impact) {
        case 'tailwind':
            return (
                <div className='flex justify-center  text-gray-700'>
                    <Wind className="h-5 w-5" /> 
                    <Bike className='h-5 w-5' />
                </div>
                )
        case 'headwind':
            return (
                <div className='flex justify-center  text-gray-700'>                 
                    <Bike className='h-5 w-5' />
                    <Wind className="h-5 w-5 rotate-180" /> 
                </div>
                )
        default:
            return (
                <div className='flex justify-center  text-gray-700'>        
                    <Wind className="h-5 w-5 -rotate-45" />          
                    <Bike className='h-5 w-5' />                    
                </div>
                )
        }
    };

    const getWindImpactText = () => {
        switch (segment.windScore.impact) {
        case 'tailwind':
            return 'Tailwind';
        case 'headwind':
            return 'Headwind';
        default:
            return 'Crosswind';
        }
    };

    return (
        <a 
            href={`https://www.strava.com/segments/${segment.id}`} 
            target="_blank"
            rel="noopener noreferrer"
            className={`block bg-white rounded-lg shadow-md border-l-4 sm:border-l-6 ${windScoreBorderClass} p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate mb-2">
                        {segment.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                        {segment.distance !== 0 && (
                        <div className="flex items-center space-x-1">
                            <Bike className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{formatDistance(segment.distance)}</span>
                        </div>
                        )}
                        {segment.average_grade !==0 && (
                        <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{formatGrade(segment.average_grade)}</span>
                        </div>
                        )}
                        <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="truncate">{segment.city}, {segment.state}</span>
                        </div>
                    </div>
                </div>
        
                <div className={`text-base sm:text-lg px-3 sm:px-4 py-1 rounded-full font-semibold ${windScoreColourClass} flex-shrink-0`}>
                    {Math.round(segment.windScore.score)}
                </div>
            </div>

            <div className='grid grid-cols-3 gap-2 sm:gap-4'>
                <div className='text-center p-2 sm:p-3 bg-blue-50 rounded-lg'>
                    <Clock className='h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mb-1 mx-auto'/>
                    <p className='text-xs text-gray-600 mb-1'>Your Best</p>
                    <p className='text-sm sm:text-base font-semibold text-blue-600'>
                        {segment.athlete_pr_effort?.elapsed_time ? formatTime(segment.athlete_pr_effort.elapsed_time) : 'N/A'}
                    </p>
                </div>
                <div className='text-center p-2 sm:p-3 bg-yellow-50 rounded-lg'>
                    <Trophy className='h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mb-1 mx-auto'/>
                    <p className='text-xs text-gray-600 mb-1'>KOM</p>
                    <p className='text-sm sm:text-base font-semibold text-yellow-600'>
                        {segment?.athelete_pr_effor ? (segment.athelete_pr_effor.is_kom ? formatTime(segment.athlete_pr_effort.elapsed_time) : 'No') : 'No'}
                    </p>
                </div>
                <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                    {getWindImpactIcon()}
                    <p className="text-xs text-gray-600 mb-1 capitalize">{getWindImpactText()}</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-700">
                        {`${Math.round(segment.weather.wind.speed * 3.6)} km/h`}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-4">
                <div className="flex items-center space-x-2">
                    <Wind className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Wind Score: {Math.round(segment.windScore.score)}/100</span>
                </div>
                <div>
                    Elevation: {Math.round(segment.elevation_high - segment.elevation_low)}m
                </div>
            </div>
        </a>
    )
}
