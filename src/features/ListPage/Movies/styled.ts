import styled from "styled-components";

export const TilesList = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 24px;
    justify-content: center;
`;