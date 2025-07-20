import styled from "styled-components";

export const BannerContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.woodsmoke};
`;

interface BannerBackgroundProps {
    $backdrop: string;
}

export const BannerBackground =
    styled.div.attrs<BannerBackgroundProps>(({ $backdrop }) => ({
        style: {
            backgroundImage: `url(${$backdrop})`
        }
    }))`
    width: 80%;

    margin: auto;
    padding-top: 27%;
    padding-bottom: 3%;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    color: ${({ theme }) => theme.colors.white};
    box-shadow: inset 0px 5px 21px 23px ${({ theme }) => theme.colors.woodsmoke};;

    @media (max-width: ${({ theme }) => theme.breakpoints.tabletL}) {
    box-shadow: inset 0px 5px 24px 27px
        ${({ theme }) => theme.colors.woodsmoke};
    };

    @media (max-width: ${({ theme }) => theme.breakpoints.mobileM}) {
        box-shadow: inset 0px 5px 14px 11px 
            ${({ theme }) => theme.colors.woodsmoke};
            padding-top: 20%;
            background-size: 100%;
    };

    @media (max-width: ${({ theme }) => theme.breakpoints.mobileS}) {
        background-size: cover;
    };
`;

export const BannerMainInfo = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;

    @media (max-width:  ${({ theme }) => theme.breakpoints.mobileL}) {
        gap: 12px;
    };
`;

export const MovieTitle = styled.header`
    font-size: 64px;
    font-weight: 600;

    @media (max-width:  ${({ theme }) => theme.breakpoints.tabletL}) {
        font-size: 45px;
    };

    @media (max-width:  ${({ theme }) => theme.breakpoints.mobileL}) {
        font-size: 24px;
        transform: translateY(19px);
    };
`;