CREATE TABLE users (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL,
    verification_code TEXT,
    enabled BOOLEAN,
    verification_code_expires_at TIMESTAMP
);