#!/bin/bash
gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker server:application
