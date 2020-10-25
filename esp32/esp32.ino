#include<WiFi.h>
#include<SocketIoClient.h>
//#include<arduino.json>

/// WiFi Creds ///
const char* ssid = "SYS ADMIN_2.4";
const char* password = "HackerMan";

/// Socket.IO Settins ///
char host[] = "192.168.1.2";
int port = 3000;
char path[] = "socket.io/?transports = websocket";

/// Arduino Pin Settins ///


/////////////////////////////////////
////// ESP32 Socket.IO Client //////
///////////////////////////////////

SocketIoClient webSocket;
WiFiClient client;

void socket_Connected(const char * payload, size_t length) {
  Serial.println("Connected UwU");
  webSocket.emit("message", "{\"boop\": 69}");
}

void setup() {
  Serial.begin(115200);
  delay(10);

  //connecting to the network
  Serial.println("Connected to: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }

  Serial.println("WiFi COnected on: ");
  Serial.println(WiFi.localIP());

  webSocket.on("connect", socket_Connected);
  webSocket.begin(host, port, path);
}

void loop() {
  webSocket.loop();
}
