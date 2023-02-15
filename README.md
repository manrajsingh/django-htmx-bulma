# Boilerplate for Django HTMX Bulma

My boilerplate for Django web application with HTMX and Bulma CSS providing the frontend / UI.

I wanted to keep all project dependencies within python as much as possible; I try to avoid frontend js compilation dependency etc that warrants nodejs for frontend frameworks like angular, react and vue etc. and bundlers like webpack. 

Using the following python libraries:

- django-compressor
    - For concatenating and minifying css and javascript files.

- django-htmx
    - For accessing modern browser features directly from HTML rather than relying heavily on javascript. Also an attempt to build a single page application. 

- django-allauth
    - for addressing authentication, registration, account management as well as 3rd party account authentication (Oauth).

Bulma is used as css framework of choice.

The idea is to build a single page application leveraging HTMX to handle dynamic content/view.

## Prepare environment

### Create an `.env` file
Create an `.env` file in the root directory with the following content. This file is referenced from `docker-compose.yml` this file basically contains environment specific variables.

```ini
#Django 
DEBUG=0
ALLOWED_HOSTS="localhost 127.0.0.1"
SECRET_KEY="your-django-secret-here-here"

# MariaDB
MARIADB_DATABASE=your_db_name_here
MARIADB_USER=your_db_username_here
MARIADB_PASSWORD=you_db_password_here
MARIADB_ROOT_PASSWORD=your_db_root_password_here

# DB_HOST in docker-compose.yml
DB_HOST=db
DB_NAME="$MARIADB_DATABASE"
DB_USER="$MARIADB_USER"
DB_PASSWORD="$MARIADB_PASSWORD"
DB_PORT=3306
```


### Run application
```bash
$ docker compose up
```

assuming both database and django containers are running .. then in a terminal run the following to initialize the database.

```bash
$ docker container exec -it django-boilerplate--web bash
```

and then from inside the container shell

```bash
> ./manage.py migrate
```

and then create a superuser for django

```bash
> ./manage.py createsuperuser
```

press `CTRL+D` to exit out of container shell.

At this point you should be able to access https://localhost:8000/admin/ and login with the superuser you created.

---



## Using PostgreSQL?

1. Change `DATABASE` in `settings.py`
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('DB_NAME'),
            'USER':  os.environ.get('DB_USER'),
            'PASSWORD': os.environ.get('DB_PASSWORD'),
            'HOST': os.environ.get('DB_HOST'),
            'PORT': os.environ.get('DB_PORT'),
            'CONN_MAX_AGE': 600,
        }
    }

    ```
2. Change the service `db` in `docker-compose.yml`
    ```yml
    db:
        image: postgres
        container_name: django-boilerplate--db
        volumes:
          - db:/var/lib/postgresql/data
        env_file:
          - .env
        healthcheck :
          test: [ "CMD", "pg_isready", "-q", "-d", "$POSTGRES_DB", "-U", "$POSTGRES_USER" ]
          interval : 5s
          timeout : 5s
          retries : 5
    ```

3. Change database related variables in `.env` file
    ```ini
    # PostgreSQL Database
    POSTGRES_HOST=db-host
    POSTGRES_DB=database-name
    POSTGRES_USER=db-user
    POSTGRES_PASSWORD=db-password

    # DB_HOST in docker-compose.yml
    DB_HOST=db
    DB_NAME="$POSTGRES_NAME"
    DB_USER="$POSTGRES_USER"
    DB_PASSWORD="$POSTGRES_PASSWORD"
    DB_PORT=5432
    ```
4. Change `mysqlclient` with `psycopg2-binary` in requirements.txt and rebuild the docker image
    ```bash
    $ docker compose up --build
    ```
---

## Modifications made to settings.py
This is just a summary of what has been done to settings.py from scratch.


Import os in settings.py
```
import os
```

Read the following variables from `.env`

```python
DEBUG = int(os.environ.get('DEBUG', default=0))
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS').split(' ')
SECRET_KEY = os.environ.get('SECRET_KEY')

INSTALL_APPS = [
    ...,
    'compressor',
    'django_htmx',
    ---,
]

MIDDLEWARE = [
    ...
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django_htmx.middleware.HtmxMiddleware',
    ...,
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME' : os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
        'OPTIONS': {
            'sql_mode': 'traditional',
        }

    }
}
```
