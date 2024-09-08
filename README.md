# Chat Application

A scalable chat application built using **Next.js**, **Tailwind**, **WebSockets**, and **Redis Pub/Sub** for real-time communication. The app is designed to handle multiple rooms across different WebSocket servers, ensuring scalability and efficient message delivery.

When a user sends a message, the WebSocket server forwards it to the Redis Pub/Sub system, which broadcasts it to all WebSocket servers subscribed to that room. This architecture allows seamless communication between users across different servers.

## Features:
- **Real-time messaging** across multiple rooms.
- **Scalable architecture** utilizing WebSockets and Redis.
- Easy setup with **Docker**.

## Tech Stack

- Next.js
- Tailwind
- Websockets
- Redis Pub-Subs
- Docker
- CI/CD for deployment to docker hub

## Architecture

![workflow](images/workflow.png)

When a user selects a particular room, if there are no users already present in that room, the WebSocket server subscribes to that room. Any messages sent by the user are published to the Redis Pub/Sub system via the WebSocket server. From there, Redis broadcasts the message to all WebSocket servers subscribed to that room. This approach allows the app to scale efficiently.

### Example:
Let's say two WebSocket servers are running, `ws1` and `ws2`. A user connects to `ws1` and joins `room1`. Since this is the first user in `room1`, `ws1` subscribes to `room1`. Now, if another user joins `room1` through `ws1`, there is no need for `ws1` to subscribe again.

If the first user sends a message in `room1`, it is sent from `ws1` to Redis Pub/Sub, which then broadcasts it back to `ws1`. The message is then delivered to the users in `room1`.

Why is this important?

Later, if a third user connects to `ws2` and joins `room1`, `ws2` will subscribe to `room1` via the Pub/Sub system. This ensures that both WebSocket servers (`ws1` and `ws2`) are now in sync with `room1`, allowing the chat to scale seamlessly across multiple servers.


## Preview


![chatroom](images/chatroom.png)

<p align="center">
  <img src="images/preview.gif" />
</p>

## Running the project locally

There is a [docker-compose.yml](./docker-compose.yml) in the project's root dir, run

```shell
git clone https://github.com/Ayush272002/Chat-App.git
cd Chat-App
docker-compose up
```

## Contributing

Contributions are welcome! If you have suggestions for new features, bug fixes, or improvements, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, please feel free to contact.