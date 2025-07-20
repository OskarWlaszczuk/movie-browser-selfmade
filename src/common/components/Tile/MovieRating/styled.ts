import styled, { css } from "styled-components";
import { ReactComponent as StarIcon } from "././svgs/Star.svg";
import { MetaData } from "../../MetaData";
interface SharedProps {
    $bannerStyles: boolean;
}

export const StyledMovieRating = styled.section`
    display: flex;
    gap: 12px;
    align-items: end;
    grid-area: movieRating;
    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.laptopXS}) {
        gap: 8px;
    }
`;

export const StyledStarIcon = styled(StarIcon) <SharedProps>`
   svg {
        width: 24px;
        
        @media (max-width: ${({ theme }) => theme.breakpoints.laptopXS}) {
            width: 16px;
        }
   }

    ${({ $bannerStyles }) => $bannerStyles && css`
        svg {
            width: 32px;

            @media (max-width: ${({ theme }) => theme.breakpoints.laptopXS}) {
                width: 24px;
            }
        }
    `}
`;

export const RatingScore = styled.strong<SharedProps>`
    font-size: ${({ theme }) => theme.fontSizes.m};

    @media (max-width: ${({ theme }) => theme.breakpoints.laptopXS}) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }

    ${({ $bannerStyles, theme }) => $bannerStyles && css`
        font-size: ${theme.fontSizes.xl};

        @media (max-width: ${theme.breakpoints.laptopXS}) {
            font-size: ${theme.fontSizes.m};
        }
    `}
`;



export const VotesInfo = styled(MetaData) <SharedProps>`
    ${({ $bannerStyles, theme }) => $bannerStyles && css`
        font-size: ${theme.fontSizes.l};
        color: ${theme.colors.white};
       
        @media (max-width: ${theme.breakpoints.laptopXS}) {
            font-size: ${theme.fontSizes.m};
        }
    `}
`;