const genresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37] as const;

export type GenreId = typeof genresIds[number];
export type GenresIds = GenreId[];
export interface GenreResponse {
    id: GenreId,
    name: string;
}