import time
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import (
    ConsoleMetricExporter,
    PeriodicExportingMetricReader,
)
from opentelemetry import metrics
from opentelemetry.instrumentation.system_metrics import SystemMetricsInstrumentor
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter


# Service name is required for most backends
resource = Resource(attributes={
    SERVICE_NAME: "quick-start-demo"
})

exporter = OTLPMetricExporter(endpoint="http://192.168.216.234:4000/v1/otlp/v1/metrics")
# exporter = ConsoleMetricExporter()
metric_reader = PeriodicExportingMetricReader(exporter, 1000)
provider = MeterProvider(resource=resource ,metric_readers=[metric_reader])

# Sets the global default meter provider
metrics.set_meter_provider(provider)
configuration = {
    "system.memory.usage": ["used", "free", "cached"],
    "system.cpu.time": ["idle", "user", "system", "irq"],
    "process.runtime.memory": ["rss", "vms"],
    "process.runtime.cpu.time": ["user", "system"],
}
SystemMetricsInstrumentor(config=configuration).instrument()

print("Sending data...")

while True:
    time.sleep(2)
