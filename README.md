# 🎬 [Movie Browser](https://oskarwlaszczuk.github.io/movie-browser-selfmade/)

**Movie Browser** is a web application for browsing movies and people related to the film industry. It uses data provided by [The Movie Database (TMDB)](https://developer.themoviedb.org/reference/intro/getting-started).

**Check demo**, published on GitHubPages: <br>https://oskarwlaszczuk.github.io/movie-browser-selfmade/

## About This Project

This repository (`movie-browser-selfmade`) contains the original version of the Movie Browser application.  
It showcases the initial implementation, core features, and layout that served as the foundation for further development.  

A newer version ([`movie-browser-selfmade-2.0`](https://github.com/OskarWlaszczuk/movie-browser-selfmade-2.0.git)) is currently in progress, aiming to introduce improved design and additional functionalities.

## 🧭 Features

- 🔍 Search for movies and people (actors, directors, etc.)
- 🎥 Browse lists of popular movies and people
- 📄 View detailed information:
  - For movies: description, release date, genres, cast and crew
  - For people: biography, filmography, birth date, etc.
- ⚙️ TMDB API integration

## 🗂 App Structure

The application is divided into two main feature pages:

1. **List Page** – displays a list of popular movies or people by default. When the user performs a search, the results replace the default list.
2. **Details Page** – displays detailed information about a selected movie or person, including credits: cast and crew sections.

## 🧱 Technologies Used

- **React** (v19)
- **Redux Toolkit**
- **Redux Saga**
- **React Router DOM**
- **Styled-components**
- **TanStack React Query**
- **Axios**
- **TMDB API**
- **GitHub Pages** – for deployment

## Code Structure & Key Implementation Details

This section explains the key code patterns and utility mechanisms used in the project. It covers how specific parts of the codebase are structured and how reusable logic has been implemented to keep the code maintainable, scalable, and DRY.

### 🗂️ Entity Types Config – Centralized Entity Type Management

This setup helps manage all data categories (like movies, people, or TV shows) from one place using two constant objects: entitiesSingularTypes and entitiesPluralTypes. These are defined in entityTypes.ts and serve as the foundation for generating other parts of the app dynamically.

***Core Benefits:***

- Easily control what entity types exist in the app.

- Dynamically generate routing and API paths using Object.values(...).

- No need to manually update every route or API method when a new type is added—just update the entity config objects.
***

<br>`entityTypes.ts`

``` tsx
export const entitiesSingularTypes = {
  MOVIE: "movie",
  PERSON: "person",
  TV: "tv",
} as const;

export const entitiesPluralTypes = {
  MOVIES: "movies",
  PEOPLE: "people",
  TVS: "tvs",
} as const;
```
***

🧭` routes.ts` – **Dynamic Route Generators**

```tsx
import { entitiesPluralTypes } from "../constants/entityTypes";

export const detailsRoutes = Object.fromEntries(
  Object.values(entitiesPluralTypes).map(entity => {
    const method = (id: number) => `/${entity}/${id}`;
    return [entity, method];
  })
);

export const listRoutes = Object.fromEntries(
  Object.values(entitiesPluralTypes).map(entity => [entity, `/${entity}`])
);
```
***

🔌`apiEndpointsPaths.ts` – **API Endpoint Builders**

```tsx
import { entitiesSingularTypes } from "./entityTypes";

export const apiEntityPathSegments = Object.fromEntries(
  Object.values(entitiesSingularTypes).map(entity => [entity, `${entity}/`])
);

export const apiPopularEndpointPaths = Object.fromEntries(
  Object.values(entitiesSingularTypes).map(entity => [entity, `${entity}/popular`])
);

export const apiSearchEndpointPaths = Object.fromEntries(
  Object.values(entitiesSingularTypes).map(entity => [entity, `search/${entity}`])
);
```
***

**⚠️ Current Limitation**
<br>The only challenge for now is how to strictly type the objects created during those iterations so that TypeScript provides full IntelliSense and property suggestions. This is a known issue and will be improved later with more advanced typing techniques.
***

### 🧠 [useSelectVerticalTileProps](https://github.com/OskarWlaszczuk/movie-browser-selfmade-2.0/blob/main/src/common/components/TilesListSection/VerticalTile/useSelectVerticalTileProps.tsx) – Adaptive Tile Prop Selector
This custom React hook simplifies how different data types are transformed into props for a generic Tile component. 
<br>It leverages TypeScript type guards and a centralized configuration array to define mappings between data types (e.g., Movie, Person, CastMember, etc.) and the corresponding UI rendering logic.

**Highlights**:

- Uses a configuration array (tilePropsConfigs) for easy extension: just add a new object to support another data type.

- Makes the Tile component highly reusable by standardizing props across multiple entities.

- Uses react-responsive to conditionally render content based on screen size.

 - Keeps the mapping logic declarative and scalable.

This pattern makes the application easy to extend in the future. If a new type of entity is introduced, you only need to add its type guard and props function to the config array—no need to rewrite component logic.

### 🧩 [EntityList](https://github.com/OskarWlaszczuk/movie-browser-selfmade-2.0/blob/main/src/features/ListPage/components/EntityList/index.tsx) – Generic List Renderer for Any Entity Type
The EntityList component serves as a reusable list page for any entity type (e.g., movies or people). It abstracts away the logic of fetching, handling, and displaying search results and popular content based on the type passed as props.

**Key Features:**

- Works with any entity type just by passing the correct popularListApiPath, searchApiPath, and entityPluralType.

- Supports search with debounce using useSearchDebounce.

- Combines multiple fetch statuses (e.g., genres, list data) into a single combinedFetchStatus for unified loading/error/success handling.

- Automatically displays a search header when needed.

**Usage Example:**

``` tsx
<EntityList
  popularListApiPath={apiPopularEndpointPaths.movie}
  searchApiPath={apiSearchEndpointPaths.movie}
  entityPluralType={entitiesPluralTypes.MOVIES}
/>
```

This makes the component plug-and-play for any future entities you might add, with minimal boilerplate.

### 🧱 [EntityDetails](https://github.com/OskarWlaszczuk/movie-browser-selfmade-2.0/blob/main/src/features/DetailsPage/components/EntityDetails/index.tsx) – Universal Details Page Component

EntityDetails handles rendering the details view for any given entity category (e.g., movie or person). It fetches genres and specific entity data, then passes them to detail subcomponents like Credits, HorizontalTile, etc.

**Advantages**:

- Only needs an entityPathSegment (e.g., "movie" or "person") to know which details to fetch and display.

- Internally uses custom hooks like useFetchDetailsPageData to orchestrate API calls.

- Shares layout and loading state management with EntityList for consistency across the app.

- This approach provides strong code reusability and makes it easy to maintain or expand entity types without duplicating the details page logic.

**Usage Example:**

``` tsx
<EntityDetails 
        entityPathSegment={apiEntityPathSegments.person} 
/>
```

## 🚀 How to Run Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/OskarWlaszczuk/movie-browser-selfmade.git
   cd movie-browser-selfmade
