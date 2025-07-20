import { useQuery } from "@tanstack/react-query";
import { CreditsTypeUnion } from "../../features/DetailsPage/types/credits.types";
import { EntitySingularType } from "../aliases/types/entityTypes.types";
import { fetchApi } from "../functions/fetchApi";
import { AxiosError } from "axios";

interface UseEntityCreditsProps {
    entityType: EntitySingularType;
    entityId: string;
    fetchDependencies: string[];
}

export const useEntityCredits = <EntityCreditsType extends CreditsTypeUnion>({ entityType, entityId, fetchDependencies }: UseEntityCreditsProps) => {
    const endpoint = `${entityType}/${entityId}/credits`;

    const { status, data, isPaused } = useQuery<EntityCreditsType, AxiosError>({
        queryKey: [entityType, ...fetchDependencies],
        queryFn: () => fetchApi<EntityCreditsType>({ endpoint }),
        enabled: !!entityId,
    });

    return {
        status,
        data,
        isPaused
    };
};
