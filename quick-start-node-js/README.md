# Introduction

This is a quick start demo for [GreptimeCloud](https://greptime.cloud/). It collects the system metric data such as CPU and memory usage through Opentelemetry and sends the metrics to GreptimeCloud. You can view the metrics on the GreptimeCloud dashboard.

Use the following command line to start it:

```shell
npx -p ts-node greptime-cloud-quick-start --host=<host> --db=<dbname> --username=<username> --password=<password>
```
