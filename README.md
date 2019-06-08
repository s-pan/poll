# Poll 
Simple poll API module built with Node.js (Expressjs) and SQLITE (sqlite3). Admin and public example are included.

## API authentication
API requires authentication with simple API key, sent as HTTP Authorization request header

## API

| Endpoint        | Method           | Description  |
| -------------   |:-------------:| -----:|
| /polls           |  GET          | Get all polls |
| /poll/:pollSlug |  GET          | Get single poll  |
| /poll/create    | POST      |    Create poll | 
| /poll/delete    |  POST          | Delete poll |
| /poll/update/:pollSlug |  POST          | Update poll  |
| /poll/vote/:pollSlug    | POST      |    Update poll votes | 
| /poll/results/:poll    | GET      |    Get poll results | 
