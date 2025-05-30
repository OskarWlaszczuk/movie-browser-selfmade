import { Movie } from "../../aliases/interfaces/Movie";
import { Person } from "../../aliases/interfaces/Person";
import { GenresIds } from "../../aliases/types/genre.types";
import { pictureWidths } from "../../constants/pictureConfigs";
import { routes } from "../../functions/routes";
import { GenresList } from "../GenresList";
import { MetaData } from "../MetaData";
import { MovieRating } from "../MovieRating";
import { Picture } from "../Picture";
import { InfoWrapper, Overview, StyledTile, Title } from "./styled";

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
};
interface TileProps {
    id: number;
    picture: string;
    title: string;
    subTitle?: string | number;
    horizontalLayout?: boolean;
    movieDetails?: {
        genresIds: GenresIds;
        voteAverage: Movie["vote_average"];
        voteCount: Movie["vote_count"];
        releaseDate?: Movie["release_date"];
        productionCountries?: ProductionCountry[];
        overview?: Movie["overview"];
    };
    personDetails?: {
        biography: Person["biography"];
        birthday: Person["birthday"];
        placeOfBirth: Person["place_of_birth"];
    };
};

export const Tile = ({ id, picture, title, subTitle, horizontalLayout, movieDetails, personDetails }: TileProps) => {

    const entityType = movieDetails ? "movie" : "person";
    return (
        <StyledTile $horizontalLayout={horizontalLayout} to={entityType === "movie" ? routes.movieDetails(id) : routes.personDetails(id)}>
            <Picture picturePath={picture} pictureWidth={pictureWidths.tile} entityType={entityType} entityName={title} />
            <InfoWrapper>
                <Title>{title}</Title>
                {subTitle && <MetaData>{subTitle}</MetaData>}
                {movieDetails && <GenresList genresIds={movieDetails.genresIds} />}
            </InfoWrapper>
            {movieDetails && <MovieRating voteAverage={movieDetails?.voteAverage} voteCount={movieDetails?.voteCount} />}
            {movieDetails?.overview && <Overview>{movieDetails.overview}</Overview>}
        </StyledTile>
    );
};