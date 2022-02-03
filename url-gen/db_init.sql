CREATE TABLE bins (
  id serial,
  url varchar UNIQUE NOT NULL,
  created timestamp DEFAULT CURRENT_TIMESTAMP,
  creator_ip varchar,
  PRIMARY KEY(id)
);

CREATE TABLE requests (
  id serial,
  bin_id int NOT NULL,
  created timestamp DEFAULT CURRENT_TIMESTAMP,
  payload_size_bytes int NOT NULL,
  payload_id text NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(bin_id) REFERENCES bins(id) ON DELETE CASCADE
);
