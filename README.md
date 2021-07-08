# Your Project Title
Weather Data Download App

## Description

Under Singapore's Greenplan 2030, there is a whole-of-nation push for more energy efficient buildings, driving an increase in efforts by the data science community to perform energy consumption modelling of buildings in Singapore. Historic weather data from data.gov.sg is widely used as part of these efforts. 

This simple web application is a MVP to help users extract and download historic weather data (at hourly intervals).

### Technical Used
Technologies you used to build this project. 
- React
- react-bootstrap
- react-chartjs-2
- styled-components

### Wireframes

Your step by step planning sketch of your project, that you can post them as an image in here.

### User Stories

Target user: Data Science community

User must be able to:
- Input choice of: Weather station, Year and Month of data required
- Extract data
- Observe that data is successfully extracted by seeing chart successfully plotted
- Be informed what are the missing data records in dataset from data.gov.sg 
- Download data

```

---

### Unsolved problems

There is resource capacity limitation to extract data of one month at one go (~700+ API calls).
After this problem is resolved, data spanning beyond one month can be extracted. 

## APIs Used

List your APIs used in this project:
- https://api.data.gov.sg/v1/environment/air-temperature
- https://api.data.gov.sg/v1/environment/wind-speed
- https://api.data.gov.sg/v1/environment/wind-direction

APIs are used for data extraction
---


