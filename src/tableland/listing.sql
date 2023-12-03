CREATE TABLE listing (
  listing_id integer not null primary key unique,
  organisation_id integer not null,
  listing_title text not null,
  employment_status text,
  location text,
  description text,
)