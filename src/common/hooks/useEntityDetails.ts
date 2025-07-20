import { useQuery } from "@tanstack/react-query";
import { DetailedEntityItem } from "../aliases/types/DetailedEntityItem";
import { EntitySingularType } from "../aliases/types/entityTypes.types";
import { fetchApi } from "../functions/fetchApi";
import { AxiosError } from "axios";

interface UseEntityDetailsProps {
    entityType: EntitySingularType;
    entityId: string;
    fetchDependencies: string[]
}

export const useEntityDetails = <EntityDetailsType extends DetailedEntityItem>({ entityType, entityId,  fetchDependencies }: UseEntityDetailsProps) => {
    const endpoint = `${entityType}/${entityId}`;

    const { status, data, isPaused } = useQuery<EntityDetailsType, AxiosError>({
        queryKey: [entityType, ...fetchDependencies],
        queryFn: () => fetchApi<EntityDetailsType>({ endpoint }),
        enabled: !!entityId,
    });

    return {
        status,
        data,
        isPaused
    };
};