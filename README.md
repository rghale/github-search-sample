# github-search-sample
Re-implements a portion of GitHub's Search feature, the user search, using their public API.

## Minimum Requirements
Use https://github.com/search as a reference for functionality, but feel free to change style, behavior, and features as
you see fit and time permitting. It is not necessary to match the actual design of GitHub and we are not expecting a
professional design. Focus on functionality and code.
As a user,
* I can search for users and see a paginated list of results
* I can navigate through the next and previous pages of the paginated results
* I see the total count of search results
* I see notable information for each search result, such as the description, star/follower count, profile pictures, etc.
* I can select a search result and be taken to the applicable page on github.com API
The app should utilize GitHub's public API; either the v3 REST API or the v4 GraphQL version. Examples of the API
call you'll likely need to make:

## Search
Documentation: 
* https://developer.github.com/v3/search/
* https://api.github.com/search/users?q=exampl