export class SignalingManager {
  private ws: WebSocket;
  private static instance: SignalingManager;
  private bufferedMessages: any[] = [];
  private initialized: boolean = false;
  private onMessageCallback: ((message: string) => void) | null = null; // Callback for received messages

  private constructor() {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    // console.log("wsUrl", wsUrl);
    if (!wsUrl) {
      throw new Error("WebSocket URL is not defined");
    }
    this.ws = new WebSocket(wsUrl);
    this.bufferedMessages = [];
    this.init();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SignalingManager();
    }
    return this.instance;
  }

  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((message) => {
        this.ws.send(message);
        console.log("buffered message sent");
      });
      this.bufferedMessages = [];
    };

    // Listen for incoming messages
    this.ws.onmessage = (event) => {
      const message = event.data;
      // console.log("Message received from server:", message);
      if (this.onMessageCallback) {
        this.onMessageCallback(message);
      }
    };

    this.ws.onclose = () => {
      // console.log("WebSocket connection closed.");
      this.initialized = false;
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // console.log("WebSocket initialized");
  }

  sendMessage(message: any) {
    // console.log("sending message");
    const messageToSend = message;
    if (!this.initialized) {
      this.bufferedMessages.push(messageToSend);
      return;
    }
    // console.log("after if");
    this.ws.send(messageToSend);
    // console.log("msg sent");
  }

  setOnMessageCallback(callback: (message: string) => void) {
    this.onMessageCallback = callback;
  }
}
