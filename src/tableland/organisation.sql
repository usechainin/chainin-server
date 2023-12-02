CREATE TABLE organisation (
  organisation_id integer primary key unique,
  organisation_name text not null,
  organisation_symbol text not null,
  description text,
  picture_url text not null,
  website_url text,
  creator_wallet_address text not null,
  nft_contract_address text not null,
  organisation_type text
)