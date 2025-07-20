import { useParams } from "react-router-dom";
import { PersonCredits } from "../../types/credits.types";
import { useEntityCredits } from "../../../../common/hooks/useEntityCredits";
import { useEntityDetails } from "../../../../common/hooks/useEntityDetails";
import { useCombinedFetchStatus } from "../../../../common/hooks/useCombinedFetchStatus";
import { HorizontalTile } from "../EntityDetails/HorizontalTile";
import { Credits } from "../EntityDetails/Credits";
import { Main } from "../../../../common/components/Main";
import { entitiesSingularTypes } from "../../../../common/constants/entityTypes";
import { DetailedPersonItem } from "../../../../common/aliases/interfaces/person.types";

export const Person = () => {
    const { id } = useParams();

    const fetchDependencies = [id!];

    const {
        status: personStatus,
        data: person,
        isPaused: isPersonPaused,
    } = useEntityDetails<DetailedPersonItem>({ entityId: id!, entityType: entitiesSingularTypes.PERSON, fetchDependencies });

    const {
        status: personFilmographyStatus,
        data: personFilmography,
        isPaused: isPersonFilmographyPaused,
    } = useEntityCredits<PersonCredits>({ entityId: id!, entityType: entitiesSingularTypes.PERSON, fetchDependencies });

    const combinedFetchStatus = useCombinedFetchStatus(
        [personStatus, personFilmographyStatus],
        [isPersonPaused, isPersonFilmographyPaused]
    );

    return (
        <>
            <Main
                successContent={
                    <>
                        <HorizontalTile entityDetails={person} />
                        <Credits credists={personFilmography} />
                    </>
                }
                combinedFetchStatus={combinedFetchStatus}
                errorMessage="Details not found"
            />
        </>
    );
};