# Ask ERA
This project aims to provide an easy-to-use natural language interface to ERA data.

## Some example requests
"What was the cloud cover in Slovenia on May 10th 2001?"
"Last year was the warmest in recorded history."
"What was the US temperature on November 10th?"
"Give me the highest temperature for last year in London."
"2017 was as cloudy as 2005."


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

### Two Dates
* Query all time steps in between the first and the second year of the query.


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
