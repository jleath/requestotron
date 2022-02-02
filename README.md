## App Server (Requestotron) ##
1. Request New URL Bin (POST, createBinHandler)
  - ‘/’
  - IP + Timestamp into Hash function to create new URL
  - INSERT Query into PostgreSQL (created_at, URL)
2. View URL Bin (GET, readBinHandler)
  - /:url?inspect
  - SELECT Query PostrgeSQL (get payload_id for each request in the bin)
  - Use id from PostgreSQL to Query MongoDB (get payload data for each request in bin)
3.  Add Request to Bin (ALL, createRequestHandler)
  - /:url
  - Validate URL request:
    - Query PostgreSQL to get the URL bin ID
  - Insert into MongoDB to get the Mongo ID
  - Insert into PostgreSQL w/ the mongoID and bin ID
  - Limit responses sent to client to 20 and ignore the rest
4.  Deletion after 48hrs
  - Cron job every 24 hours
  - Triggers another Node file to cleanup PostgreSQL and Mongo


Wes did this part!
