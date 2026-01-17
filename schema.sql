//schema.sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    recipient_id INTEGER NOT NULL,
    FOREIGN KEY (recipient_id) REFERENCES accounts(id)
);
