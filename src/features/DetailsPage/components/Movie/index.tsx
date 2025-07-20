import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { useCombinedFetchStatus } from "../../../../common/hooks/useCombinedFetchStatus";
import { useFetchGenres } from "../../../../common/hooks/useFetchGenres";
import { Credits } from "../EntityDetails/Credits";
import { HorizontalTile } from "../EntityDetails/HorizontalTile";
import { MovieBanner } from "./Banner";
import { MovieCredits } from "../../types/credits.types";
import { DetailedMovieItem } from "../../../../common/aliases/interfaces/movie.types";
import { useEntityDetails } from "../../../../common/hooks/useEntityDetails";
import { useEntityCredits } from "../../../../common/hooks/useEntityCredits";
import { entitiesSingularTypes } from "../../../../common/constants/entityTypes";

export const Movie = () => {
    const { id } = useParams();
    const fetchDependencies = [id!];

    const genresStatus = useFetchGenres();

    const {
        status: movieStatus,
        data: movie,
        isPaused: isMoviePaused,
    } = useEntityDetails<DetailedMovieItem>({ entityId: id!, entityType: entitiesSingularTypes.MOVIE, fetchDependencies });

    const {
        status: movieCreditsStatus,
        data: movieCredits,
        isPaused: isMovieCreditsPaued,
    } = useEntityCredits<MovieCredits>({ entityId: id!, entityType: entitiesSingularTypes.MOVIE, fetchDependencies });

    const combinedFetchStatus = useCombinedFetchStatus(
        [movieStatus, genresStatus, movieCreditsStatus],
        [isMoviePaused, isMovieCreditsPaued]
    );

    if (!movie && !movieCredits) return null;

    return (
        <>
            <Main
                successContent={
                    <>
                        <HorizontalTile entityDetails={movie} />
                        <Credits credists={movieCredits} />
                    </>
                }
                combinedFetchStatus={combinedFetchStatus}
                errorMessage="Details not found"
                bannerElement={
                    <MovieBanner
                        movieDetails={movie}
                    />
                }
            />
        </>
    );
};