# Introduction

This is a quick start demo for [GreptimeCloud](https://greptime.cloud/). It collects the system metric data such as CPU and memory usage through Opentelemetry and sends the metrics to GreptimeCloud. You can view the metrics on the GreptimeCloud dashboard.

Use the following command line to start it in Python 3.10:

```shell
pip install -r requirements.txt
```

```shell
python app.py -host <host> -db <dbname> -u <username> -p <password>
```
