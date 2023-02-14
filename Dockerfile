FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN useradd -ms /bin/bash django
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
RUN chown -R django:django /app
USER django
EXPOSE 8000
CMD ["python", "-m", "gunicorn", "--preload", "--timeout", "120", "--access-logfile", "./logs/access.log", "--error-logfile", "./logs/error.log", "--workers", "4", "--bind", "0.0.0.0:8000", "appconfig.wsgi:application"]