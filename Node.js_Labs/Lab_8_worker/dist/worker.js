"use strict";
const { parentPort } = require("worker_threads");
// Handle incoming messages from the main thread
parentPort.on("message", (message) => {
    if (message.task === "longCalculation") {
        console.log("Worker received data:", message.data);
        for (let index = 0; index < 9999999999; index++) { }
        // Send the result back to the main thread
        parentPort.postMessage("ressss");
    }
});
