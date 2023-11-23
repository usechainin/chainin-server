CREATE TABLE user (
  wallet_address text primary key unique,
  first_name text not null,
  last_name text not null,
  email_address text not null
)