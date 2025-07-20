import { BannerContainer, MovieTitle, BannerMainInfo, BannerBackground } from "./styled";
import { DetailedMovieItem } from "../../../../../common/aliases/interfaces/movie.types";
import { apiUrls, pictureWidths } from "../../../../../common/constants/pictureConfigs";
import { OrUndefined } from "../../../../../common/aliases/types/OrUndefined";
import { MovieRating } from "../../../../../common/components/Tile/MovieRating";

interface MovieBannerProps {
    movieDetails: OrUndefined<DetailedMovieItem>;
}

export const MovieBanner = ({ movieDetails }: MovieBannerProps) => {

    const pictureUrl = `${apiUrls.image}${pictureWidths.backdrop}${movieDetails?.backdrop_path}`;

    return (
        <BannerContainer>
            <BannerBackground $backdrop={pictureUrl}>
                <BannerMainInfo>
                    <MovieTitle>{movieDetails?.title}</MovieTitle>
                    <MovieRating
                        voteAverage={movieDetails?.vote_average}
                        voteCount={movieDetails?.vote_count}
                        useBannerStyles
                    />
                </BannerMainInfo>
            </BannerBackground>
        </BannerContainer>
    )
};