# Ask ERA
This project aims to provide an easy-to-use natural language interface to ERA data.

## Some example requests
* "Was it cloudy in Slovenia on May 10th 2011?"
* "Did it rain in Glasgow on December 5th 2012?"
* "Was it windy in Chicago on 25th March 2017?"
* "Was it cloudy in San Francisco on 13th March 2014?"
* "It was rainy in Leipzig on June 3rd 2013."
* "There was a storm in Reykjavik on December 15th 2016."
* "It was hot in Freiburg on July 20th 2017."

## Entity Categories
### Location
* Query the location (continent, city, place or country name).

### Single Date
* Query all time steps within the year indicated in the key phrase. If missing, use the year when the news item was published.

phrase | query
--- | ---
specific year, "year", "last year", "previous year" | entire year
specific month, "month", "last month", "previous month" | month of the current year
specific season | meteorological season (DJF, MAM, JJA, SON) of the current year
"day", "today" | day prior to the day when the news item was published
"night" | night prior to the day when the news item was published
specific day (Monday - Sunday) | day in the year when the news item was published


## Key phrases
phrase | definition | variable | statistic
--- | --- | --- | ---
darkest, cloud, cloudy | period with the cloudiest conditions | total_cloud_cover | maximum
sun, sunny | period with the least cloudy conditions | total_cloud_cover | minimum
stormy, storm, windy | period with the highest average wind speed | 10m_wind_speed | maximum
record warm, warmest, record hot, hottest, record high, record-high, record-breaking hot, record-braking temperatures | hot temperature extreme in given period | maximum_2m_temperature_since_previous_post_processing OR 2m_temperature | maximum
record cold, coldest, record low, record-cold  | cold temperature extreme in given period | minimum_2m_temperature_since_previous_post_processing OR 2m_temperature | minimum
rainy, rainiest, wettest | period with the most precipitation | total_precipitation | maximum
dryest | period with the least precipitation | total_precipitation | minimum
