from socketIO_client import SocketIO, BaseNamespace
from sense_hat import SenseHat
import time

class DatasNamespace(BaseNamespace):

    def on_connect(self):
        print('[Connected]')

    def on_reconnect(self):
        print('[Reconnected]')

    def on_disconnect(self):
        print('[Disconnected]')

#socketIO = SocketIO('localhost', 3000, Namespace)
#socketIO.wait(seconds=1)

sense = SenseHat()
socketIO = SocketIO('localhost', 3080)
datas_namespace = socketIO.define(DatasNamespace, '/datas')
################################################################################
####                                HUMIDITY                                ####
################################################################################

while 1==1:
    humidity = sense.get_humidity()
    print("Humidity: %s %%rH" % humidity)

    # alternatives
    print(sense.humidity)
    print
    ################################################################################
    ####                                TEMPERATURE                             ####
    ################################################################################
    temp = sense.get_temperature()
    print("Temperature: %s C" % temp)

    # alternatives
    print(sense.temp)
    print(sense.temperature)
    print
    ################################################################################
    ####                                PRESSURE                                ####
    ################################################################################

    pressure = sense.get_pressure()
    print("Pressure: %s Millibars" % pressure)

    # alternatives
    print(sense.pressure)




    json_humidity = {'label': 'humidity', 'value': round(humidity,2), 'unit':"%"}
    json_temperature = {'label': 'temperature', 'value': round(temp,2),'unit':'C'}
    json_pressure = {'label':'pressure','value': round(pressure,2), 'unit':'Millibars'}

    datas = [json_temperature,json_humidity, json_pressure]

    datas_namespace.emit('data',json_temperature)
    datas_namespace.emit('data',json_humidity)
    datas_namespace.emit('data',json_pressure)

    datas_namespace.emit('data.array', datas)
    time.sleep(1)
