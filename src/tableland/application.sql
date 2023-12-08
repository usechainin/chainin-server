CREATE TABLE application (
  subgraph_id text not null primary key unique,
  applicant_wallet_address text not null,
  listing_id integer not null,
  profile_url text not null,
)