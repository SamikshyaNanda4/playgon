export type SportsType =
    | 'football'
    | 'basketball'
    | 'tennis'
    | 'swimming'
    | 'running'
    | 'cycling'
    | 'cricket'
    | string; // string fallback for unknown types

export interface TagItem {
    sportsType: SportsType;
    // add other item properties as needed
}