export enum WaypointType {
    ENTRY_EXIT = "ENTRY_EXIT",
    ROOM = "ROOM",
    CORRIDOR_INTERSECTION = "CORRIDOR_INTERSECTION",
    STAIRS = "STAIRS",
    ELEVATOR = "ELEVATOR",
};

export const WaypointTypeStages = [
    WaypointType.STAIRS,
    WaypointType.ELEVATOR,
];
