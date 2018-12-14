 FROM python:3.7
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /backend
 WORKDIR /backend
 COPY requirements.txt /backend/
 COPY wait-for-it.sh wait-for-it.sh
 RUN chmod +x wait-for-it.sh
 RUN pip install -r requirements.txt
 COPY . /backend/