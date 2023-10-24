from django.db import models

class Device(models.Model):
    device_ip = models.CharField(max_length=255, null=True)
    device_name = models.CharField(max_length=255, null=True)
    extra = models.TextField(null=True, blank=True)
    is_on = models.BooleanField(default=False)

    def __str__(self):
        return str(self.device_name)

class Relay(models.Model):
    relay_pin = models.IntegerField()
    is_on = models.BooleanField(default=False)
    relay_name = models.CharField(max_length=255, null=True)
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name='relays')

    def __str__(self):
        return f"Relay {self.relay_pin} for Device {self.device_id}"

class RelayGroup(models.Model):
    group_name = models.CharField(max_length=255, unique=True)
    is_on = models.BooleanField(default=True)
    relays = models.ManyToManyField(Relay)

    def __str__(self):
        return str(self.group_name)

