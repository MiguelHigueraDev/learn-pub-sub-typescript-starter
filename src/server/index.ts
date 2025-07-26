import amqp from "amqplib";

const RABBITMQ_URL = "amqp://guest:guest@localhost:5672/";

let connection: amqp.ChannelModel | null = null;

async function main() {
  connection = await amqp.connect(RABBITMQ_URL);
  console.log("Connected to RabbitMQ");
}

process.on("SIGINT", async () => {
  if (connection) {
    try {
      await connection.close();
      console.log("RabbitMQ connection closed");
    } catch (err) {
      console.error("Error closing RabbitMQ connection:", err);
    }
  }

  process.exit(0);
});

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
