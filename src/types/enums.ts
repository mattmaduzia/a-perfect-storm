export enum WeatherColumn {
  clouds_broken = "clouds_broken",
  clouds_clear = "clouds_clear",
  clouds_few = "clouds_few",
  clouds_overcast = "clouds_overcast",
  clouds_scattered = "clouds_scattered",
  precip = "precip",
  snow_avg = "snow_avg",
  snow_depth_1 = "snow_depth_1",
  snow_depth_5 = "snow_depth_5",
  temp_avg = "temp_avg",
  temp_max = "temp_max",
  temp_min = "temp_min",
  temp_diurnal = "temp_diurnal",
  heat_index = "heat_index",
  wind_chill = "wind_chill",
  wind_speed = "wind_speed",
  none = "",
}

export enum TypeToColumn {
  CloudsBroken = "clouds_broken",
  CloudsClear = "clouds_clear",
  CloudsFew = "clouds_few",
  CloudsOvercast = "clouds_overcast",
  CloudsScattered = "clouds_scattered",
  Precipitation = "precip",
  SnowAverage = "snow_avg",
  SnowDepth1 = "snow_depth_1",
  SnowDepth5 = "snow_depth_5",
  TempAverage = "temp_avg",
  TempMax = "temp_max",
  TempMin = "temp_min",
  TempDiurnal = "temp_diurnal",
  HeatIndex = "heat_index",
  WindChill = "wind_chill",
  WindSpeed = "wind_speed",
}

export enum WeatherType {
  CloudsBroken = "CloudsBroken",
  CloudsClear = "CloudsClear",
  CloudsFew = "CloudsFew",
  CloudsOvercast = "CloudsOvercast",
  CloudsScattered = "CloudsScattered",
  Precipitation = "Precipitation",
  SnowAverage = "SnowAverage",
  SnowDepth1 = "SnowDepth1",
  SnowDepth5 = "SnowDepth5",
  TempAverage = "TempAverage",
  TempMax = "TempMax",
  TempMin = "TempMin",
  TempDiurnal = "TempDiurnal",
  HeatIndex = "HeatIndex",
  WindChill = "WindChill",
  WindSpeed = "WindSpeed",
}

export enum WeatherTitle {
  CloudsBroken = "Clouds Broken",
  CloudsClear = "Clouds Clear",
  CloudsFew = "Clouds Few",
  CloudsOvercast = "Clouds Overcast",
  CloudsScattered = "Clouds Scattered",
  Precipitation = "Average Monthly Precipitation",
  SnowAverage = "Average Snowfall",
  SnowDepth1 = "Days/Month w/1+ Inch Snow",
  SnowDepth5 = "Days/Month w/5+ Inch Snow",
  TempAverage = "Average Temperature",
  TempMax = "Average High",
  TempMin = "Average Low",
  TempDiurnal = "Average Diurnal",
  HeatIndex = "Average Heat Index",
  WindChill = "Average Wind Chill",
  WindSpeed = "Average Wind Speed",
}

export enum WeatherUnits {
  CloudsBroken = "Percent",
  CloudsClear = "Percent",
  CloudsFew = "Percent",
  CloudsOvercast = "Percent",
  CloudsScattered = "Percent",
  Precipitation = "Inches",
  SnowAverage = "Percent Chance",
  SnowDepth1 = "Days",
  SnowDepth5 = "Days",
  TempAverage = "Degrees",
  TempMax = "Degrees",
  TempMin = "Degrees",
  TempDiurnal = "Degrees",
  HeatIndex = "Degrees",
  WindChill = "Degrees",
  WindSpeed = "Miles per hour",
}

export enum PeriodColumn {
  winter = "winter",
  spring = "spring",
  summer = "summer",
  fall = "fall",
  annual = "annual",
}

export enum PeriodToColumn {
  Winter = "winter",
  Spring = "spring",
  Summer = "summer",
  Fall = "fall",
  Annual = "annual",
}

export enum TimePeriod {
  Winter = "Winter",
  Spring = "Spring",
  Summer = "Summer",
  Fall = "Fall",
  Annual = "Annual",
}

export enum ForecastType {
  heatIndex = "heatIndex",
  maxTemperature = "maxTemperature",
  minTemperature = "minTemperature",
  probabilityOfPrecipitation = "probabilityOfPrecipitation",
  skyCover = "skyCover",
  snowfallAmount = "snowfallAmount",
  temperature = "temperature",
  windChill = "windChill",
  windSpeed = "windSpeed",
}

export enum ForecastTitle {
  heatIndex = "Heat Index",
  maxTemperature = "High",
  minTemperature = "Low",
  probabilityOfPrecipitation = "Chance of Precipitation",
  skyCover = "Cloud Cover",
  snowfallAmount = "Snowfall Amount",
  temperature = "Temperature",
  windChill = "Wind Chill",
  windSpeed = "Wind Speed",
}

export enum ForecastUnit {
  heatIndex = "&deg; F",
  maxTemperature = "&deg; F",
  minTemperature = "&deg; F",
  probabilityOfPrecipitation = "%",
  skyCover = "%",
  snowfallAmount = "\"",
  temperature = "&deg; F",
  windChill = "&deg; F",
  windSpeed = "&nbsp;knot(s)",
}
