# Django Boilerplate

My go-to boilerplate for web projects using django framework. 

Since this is a python project I wanted to keep all project dependencies within python; That means that there are no nodejs dependencies. So frontend frameworks like angular, react and vue etc. and bundlers like webpack are not part of this boilerplate. Instead, the following python libraries will attempt to provide the similar functionality.

- django-compressor
    - For concatenating and minifying css and javascript files.

- django-htmx
    - For accessing modern browser features directly from HTML rather than relying heavily on javascript. 

Bulma is used as css framework of choice.

This application will load the webpage once and then basically manipulate dom/view with ajax to navigate through different pages with content. 



## Modifications in settings.py
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

