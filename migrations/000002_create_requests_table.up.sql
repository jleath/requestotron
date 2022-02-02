CREATE TABLE IF NOT EXISTS requests (
    id serial PRIMARY KEY,
    bin_id int NOT NULL,
    created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
    payload_size_bytes int NOT NULL,
    payload_id int NOT NULL,
    FOREIGN KEY(bin_id) REFERENCES bins(id) ON DELETE CASCADE
);
