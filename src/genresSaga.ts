import { call, put, takeLatest } from "redux-saga/effects";
import { fetchGenres, handleGenresFailed, setFetchedGenres } from "./genresSlice";
import { GenreResponse } from "./common/aliases/types/genre.types";
import { fetchFromAPI } from "./common/functions/fetchFromAPI";
import { SagaIterator } from "redux-saga";

interface GenresApiResponse {
    genres: GenreResponse[]
}

function* fetchGenresHandler(): SagaIterator {
    try {
        const typedFetch = fetchFromAPI<GenresApiResponse>;
        const genresList: GenresApiResponse = yield call(typedFetch, "/genres.json");
        yield put(setFetchedGenres(genresList.genres));
    } catch {
        yield put(handleGenresFailed());
    };
};

type FetchGenresAction = ReturnType<typeof fetchGenres>;

export function* genresSaga() {
    yield takeLatest<FetchGenresAction>(
        fetchGenres.type,
        fetchGenresHandler
    );
};