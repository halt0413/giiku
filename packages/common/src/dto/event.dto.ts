export interface EventDto {
    id: string;
    // host_user: string;
    location_name: string;
    latitude: number;
    longitude: number;
    meeting_time: Date;
}

export interface CreateEventDto {
    id : string;
    user?: string;
    members?: string[];
}