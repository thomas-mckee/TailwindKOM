// Mock segments pointing in each cardinal direction for wind score calibration
// Wind direction: 180° (from South - tailwind for North-bound segments)
export const mockSegments = [
  // NORTH (0°) - Perfect tailwind with South wind (180°)
  {
    id: 1001,
    name: "North Bound Highway",
    distance: 2000,
    average_grade: 1.0,
    elevation_high: 250,
    elevation_low: 230,
    city: "Winnipeg",
    state: "Manitoba",
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.9000, -97.1400], // Due North
    athlete_pr_effort: { elapsed_time: 180 },
    kom_time: 165,
    weather: { wind: { speed: 10, deg: 180 } } // South wind
  },
  
  // NORTHEAST (45°) - Good tailwind with South wind
  {
    id: 1002,
    name: "Northeast Trail",
    distance: 1500,
    average_grade: 0.5,
    elevation_high: 245,
    elevation_low: 237,
    city: "Winnipeg", 
    state: "Manitoba",
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.8971, -97.1329], // Northeast
    athlete_pr_effort: { elapsed_time: 140 },
    kom_time: 125,
    weather: { wind: { speed: 10, deg: 180 } }
  },

  // EAST (90°) - Crosswind with South wind
  {
    id: 1003,
    name: "East Parkway",
    distance: 1800,
    average_grade: -0.2,
    elevation_high: 242,
    elevation_low: 236,
    city: "Winnipeg",
    state: "Manitoba", 
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.8900, -97.1300], // Due East
    athlete_pr_effort: { elapsed_time: 165 },
    kom_time: 148,
    weather: { wind: { speed: 10, deg: 180 } }
  },

  // SOUTHEAST (135°) - Slight headwind with South wind
  {
    id: 1004,
    name: "Southeast Climb",
    distance: 2200,
    average_grade: 2.8,
    elevation_high: 280,
    elevation_low: 218,
    city: "Winnipeg",
    state: "Manitoba",
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.8829, -97.1329], // Southeast
    athlete_pr_effort: { elapsed_time: 210 },
    kom_time: 185,
    weather: { wind: { speed: 10, deg: 180 } }
  },

  // SOUTH (180°) - Perfect headwind with South wind
  {
    id: 1005,
    name: "South Ridge",
    distance: 1600,
    average_grade: -1.5,
    elevation_high: 240,
    elevation_low: 216,
    city: "Winnipeg",
    state: "Manitoba",
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.8800, -97.1400], // Due South
    athlete_pr_effort: { elapsed_time: 155 },
    kom_time: 135,
    weather: { wind: { speed: 10, deg: 180 } }
  },

  // SOUTHWEST (225°) - Slight headwind with South wind
  {
    id: 1006,
    name: "Southwest Valley",
    distance: 1900,
    average_grade: 0.8,
    elevation_high: 255,
    elevation_low: 240,
    city: "Brandon",
    state: "Manitoba",
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.8829, -97.1471], // Southwest
    athlete_pr_effort: { elapsed_time: 175 },
    kom_time: 160,
    weather: { wind: { speed: 10, deg: 180 } }
  },

  // WEST (270°) - Crosswind with South wind
  {
    id: 1007,
    name: "West Plains",
    distance: 2500,
    average_grade: 0.0,
    elevation_high: 242,
    elevation_low: 242,
    city: "Brandon",
    state: "Manitoba",
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.8900, -97.1500], // Due West
    athlete_pr_effort: { elapsed_time: 230 },
    kom_time: 210,
    weather: { wind: { speed: 10, deg: 180 } }
  },

  // NORTHWEST (315°) - Good tailwind with South wind
  {
    id: 1008,
    name: "Northwest Express",
    distance: 1300,
    average_grade: -0.8,
    elevation_high: 245,
    elevation_low: 235,
    city: "Brandon",
    state: "Manitoba",
    start_latlng: [49.8900, -97.1400],
    end_latlng: [49.8971, -97.1471], // Northwest
    athlete_pr_effort: { elapsed_time: 120 },
    kom_time: 105,
    weather: { wind: { speed: 10, deg: 180 } }
  }
];