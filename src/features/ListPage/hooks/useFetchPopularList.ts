import { useFetchApi } from "../../../common/hooks/useFetchApi";
import { PopularMovieApi, PopularPeopleApi } from "../types/popularListApi.types";

export const useFetchPopularList = <PopularListApiResponse extends PopularMovieApi | PopularPeopleApi>(url: string) => {
    const {
        status: popularListStatus,
        data: popularList
    } = useFetchApi<PopularListApiResponse>({ queryKey: "popularList", url });

    return { popularList, popularListStatus };
};