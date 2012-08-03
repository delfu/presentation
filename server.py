import os

from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace

STATIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))


class ControlNamespace(BaseNamespace):
    _registry = {}
    _page_num = 0

    def initialize(self):
        self._registry[id(self)] = self
        self.emit("flip", ControlNamespace._page_num)


    def disconnect(self, *args, **kwargs):
        del self._registry[id(self)]
        super(ControlNamespace, self).disconnect(*args, **kwargs)
        

    def on_flip(self, direction):
        ControlNamespace._page_num += direction
        self._broadcast("flip", ControlNamespace._page_num)

    def _broadcast(self, event, message):
        for s in self._registry.values():
            s.emit(event, message)


def application(environ, start_response):
    if environ['PATH_INFO'].startswith('/socket.io'):
        return socketio_manage(environ, { '/control': ControlNamespace })
    else:
        return serve_file(environ, start_response)

def serve_file(environ, start_response):
    path = os.path.normpath(
        os.path.join(STATIC_DIR, environ['PATH_INFO'].lstrip('/')))
    assert path.startswith(STATIC_DIR), path
    if os.path.exists(path):
        start_response('200 OK', [('Content-Type', 'text/html')])
        with open(path) as fp:
            while True:
                chunk = fp.read(4096)
                if not chunk: break
                yield chunk
    else:
        start_response('404 NOT FOUND', [])
        yield 'File not found'


sio_server = SocketIOServer(
    ('', 8080), application, 
    policy_server=False)
sio_server.serve_forever()