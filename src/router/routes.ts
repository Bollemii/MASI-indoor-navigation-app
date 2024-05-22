// If you want to add a new route, you must add it to the RootStackParamList type and to the routes enum.

export type RootStackParamList = {
    Home: undefined;
    AddPoint: undefined;
    Informations: undefined;
    AddNeighbor: undefined;
    NeighborScan: undefined;
    SetStageChange: undefined;
    NewOrientation: undefined;
    NeighborOrientation: undefined;
    StartScan: undefined;
    Destination: undefined;
    Navigation: undefined;
    End: undefined;
    "*": undefined;
};

export enum routes {
    HOME= "Home",
    ADD_POINT= "AddPoint",
    INFORMATIONS= "Informations",
    ADD_NEIGHBOR= "AddNeighbor",
    NEIGHBOR_SCAN= "NeighborScan",
    SET_STAGE_CHANGE= "SetStageChange",
    NEW_ORIENTATION= "NewOrientation",
    NEIGHBOR_ORIENTATION= "NeighborOrientation",
    START_SCAN= "StartScan",
    DESTINATION= "Destination",
    NAVIGATION= "Navigation",
    END= "End",
};
