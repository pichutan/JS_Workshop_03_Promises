
# Exercise 3: Working with promises

## Story

The following exercise should help you to try out promises by asking an API for data and processing it as soon as it arrives.

## Task 1
Write a function which gets the data for Germany and Vietnam and display it with Bootstrap 5 cards. The cards should contain the name, flag, capital, their timezone and their currency. Display the data as soon as it is ready in their respective card.

## Task 2
Create a function which gets the data for a given list of countries (minimum 5). Wait for all `Promises`to be ready and fullfilled and display all countries in a Bootstrap 5 slider with the following data:  
- name  
- flag  
- capital  
- timezone   
- currency

## Task 3
Create a function which accepts the name of a country and receives the countries data from the API. The data will be shown in a card like in Task 1.  Add an additional error handling if the requested country does not exist or the `Promise`in general is not fulfilled and rejected. There should be a Modal / Dialog which shows a small error message.

## Task 4
Create a card from the template in the `task04_mockup`folder. This card contains the flag, some data and addtionally all countries which are neighbors to the specific country. When you click on a neighbor country flag, it will ask the API for all the data to the specific country, create a card again with all neighbors.

Don't fetch all data until you really need them. Only fetch the data which is necessary for your task.

## Additional Task
Exchange the dummy icons with new ones, which describe the data better. You can checkout https://fontawesome.com/ for different icons. Be aware: You can only use the free version icons for it.

## Additional information
For those task you should use the `Fetch API`. Call the given resource with `fetch(resourcename)`. The result is a promise you can work with.  
To get the details of a country you can use the following URL: `https://restcountries.com/v3.1/name/{countryname}`. Replace `{countryname}` with the name of the country you want to get the data from.

## Techniques you may use
- Promises & Rest API & Fetch API
- ES6 features like
	- template literals
	- destructuring objects
	- and more

## Useful links
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API    - https://restcountries.com/#api-endpoints
- https://getbootstrap.com/docs/5.0/components/modal/ - https://getbootstrap.com/docs/5.0/components/carousel/