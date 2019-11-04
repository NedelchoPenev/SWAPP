# SWAPP
Star Wars App
## Idea
A simple web application where you can explore data from Star Wars movies. Build with React, Graphql, and Apollo.
## Design
The application is split into six parts.
* Login area
  * Guests are not allowed into the system.
  * Login page is provided.
  * Credentials
    * Email: demo@st6.io
    * Password: demo1234
* Episodes area
  * First seven episodes, with poster and synopsis.
  * Link to an episode details page.
* Characters area
  * Moves characters page with pagination.
  * Link to a character details page.
* Episode details area
  * An episode details page where we can find information about:
    * Title 
    * Poster
    * Sinopsis
    * Director
    * Release data
    * Characters in the episode with pagination
  * Link to a character details page.
* Character details area
  * A Character details page where we can find information about:
    * The name of the character 
    * Height
    * Weight
    * Species
    * Home World
    * Piloted Starships
  * Link to Piloted Starships details page.
* Starship details area
  * A Starship details page where we can find information about:
    * The name of the starship 
    * Class
    * Cost
    * Crew
    * Max Atmospheric Speed
    * Hyperdrive Rating
    * Radar chart comparison with the other starships from the same class.
* Additional
  * Theme change
  * Navigation
  * Logout