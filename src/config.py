DB_CONNECTION="mysql"
DB_USERNAME="root"
DB_PASSWORD="pwd"
DB_HOST="127.0.0.1"
DB_DATABASE="codecharacter-web"

DB_URI = "{}://{}:{}@{}/{}".format(
    DB_CONNECTION,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DATABASE
)
