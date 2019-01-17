 FROM python:3.7
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /backend
 WORKDIR /backend
 COPY . /backend/
 COPY requirements.txt /backend/
 COPY wait-for-it.sh wait-for-it.sh
 RUN chmod +x wait-for-it.sh
 RUN python -m venv _pyvenv
 RUN pip install -r requirements.txt
 RUN apt-get update
 RUN apt-get install graphviz