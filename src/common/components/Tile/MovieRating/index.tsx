import { SimplefiedMovieItem } from "../../../aliases/interfaces/movie.types";
import { OrUndefined } from "../../../aliases/types/OrUndefined";
import { RatingScore, StyledMovieRating, StyledStarIcon, VotesInfo } from "./styled";

interface MovieRatingProps {
    voteAverage: OrUndefined<SimplefiedMovieItem["vote_average"]>;
    voteCount: OrUndefined<SimplefiedMovieItem["vote_count"]>;
    useBannerStyles?: boolean;
}

export const MovieRating = ({ voteAverage, voteCount, useBannerStyles }: MovieRatingProps) => {
    const areVotesAvailable = voteCount !== 0;

    return (
        <StyledMovieRating>
            {areVotesAvailable && (
                <>
                    <StyledStarIcon $bannerStyles={useBannerStyles || false} />
                    <RatingScore $bannerStyles={useBannerStyles || false}>{voteAverage?.toFixed(1).replace('.', ',')}</RatingScore>
                </>
            )}
            <VotesInfo $bannerStyles={useBannerStyles || false}>{areVotesAvailable ? `${voteCount} votes` : "No votes yet"}</VotesInfo>
        </StyledMovieRating>
    );
};