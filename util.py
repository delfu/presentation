import os

STATIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))

def route(environ, pattern):
    if environ['PATH_INFO'].startswith('/' + pattern):
        return True
    else:
        return False

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

def expose(fn):
    def wrapped(start_response, args):
        start_response('200 OK', [('Content-Type', 'text/html')])
        return fn(start_response, args)
    return wrapped

def get_args(environ):
    return environ['PATH_INFO'].split("/")[2:]