#!/usr/bin/env ts-node

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

import {OTLPMetricExporter} from "@opentelemetry/exporter-metrics-otlp-proto";
import {PeriodicExportingMetricReader, MeterProvider} from "@opentelemetry/sdk-metrics";
import {HostMetrics} from '@opentelemetry/host-metrics';

function main() {
    var argv = require('minimist')(process.argv.slice(2));
    const dbHost = argv.host
    const db = argv.db
    const username = argv.username
    const password = argv.password

    const auth = Buffer.from(`${username}:${password}`).toString('base64')

    const metricReader = new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: `https://${dbHost}/v1/otlp/v1/metrics`,
            headers: {
                Authorization: `Basic ${auth}`,
                "x-greptime-db-name": db,
            },
            timeoutMillis: 5000,
        }),
        exportIntervalMillis: 2000,
    })

    const meterProvider = new MeterProvider();
    meterProvider.addMetricReader(metricReader);
    const hostMetrics = new HostMetrics({ meterProvider, name: 'quick-start-demo-node' });
    hostMetrics.start();
    console.log('Sending metrics...')
    setInterval(() => {}, 1000);
}

if (require.main === module) {
    main();
}

