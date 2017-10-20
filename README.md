# Code Character Web

### Setup Instructions:

1. Create and activate a virtualenv, and run `pip install -r requirements.txt`

2. Create a MySQL database and update DB information in `src/config.py`

3. Run 
```
python src/migrate.py db init
python src/migrate.py db migrate
python src/migrate.py db upgrade
```

4. Start the development server with `./run.sh`
