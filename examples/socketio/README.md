# Socket.io Example
Monitor activations and messages in your browser.

## Prerequisites

* [Node.JS](https://nodejs.org/)
* An Account and Application in the [Dashboard](https://preview.dashboard.thethingsnetwork.org/).
* A working device that sends data to The Things Network.

## Getting Started

1.  First install the dependencies:

    ```bash
    npm install
    ```

2.  Configure your Application Region, ID and Access Key:

    *  Set them as environment variables, e.g. when running the server:

        ```bash
        TTN_REGION=eu TTN_APP_ID=hello TTN_APP_KEY=my-key node .
        ```
        
    *  Or hard-code them in [server.js](server.js#L11).

3.  Run the server:

    ```bash
    node .
    ```
4.  Open [http://localhost:8080](http://localhost:8080/) and see activations and messages come in.
