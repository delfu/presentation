import os

from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace

from mako.template import Template
from mako.lookup import TemplateLookup

import util
from util import route
from util import STATIC_DIR


class ControlNamespace(BaseNamespace):
    _registry = {}
    _page_num = 0

    def initialize(self):
        self._registry[id(self)] = self
        self.emit("flip", ControlNamespace._page_num)


    def disconnect(self, *args, **kwargs):
        del self._registry[id(self)]
        super(ControlNamespace, self).disconnect(*args, **kwargs)
        

    def on_flip(self, new_slide):
        ControlNamespace._page_num = new_slide
        self._broadcast("flip", ControlNamespace._page_num)

    def _broadcast(self, event, message):
        for s in self._registry.values():
            s.emit(event, message)

@util.expose
def presentation(start_response, args):
    id = args[0]
    #TODO: fetch data from database
    template = template_lookup.get_template("presentation.mako") 
    return template.render(json_path="/data/final_presentation/slides.json")

@util.expose
def controller(start_response, args):
    id = args[0]
    #TODO: fetch data from database
    print "hit here"
    template = template_lookup.get_template("controller.mako") 
    return template.render(json_path="/data/final_presentation/slides.json")


template_lookup = TemplateLookup(directories=[STATIC_DIR + "/templates"])


def application(environ, start_response):
    args = util.get_args(environ)
    if route(environ, 'socket.io'):
        return socketio_manage(environ, { '/control': ControlNamespace })
    elif route(environ, 'presentation'):
        return presentation(start_response, args)
    elif route(environ, 'controller'):
        return controller(start_response, args)
    else:
        return util.serve_file(environ, start_response)


sio_server = SocketIOServer(
    ('', 8080), application, 
    policy_server=False)
sio_server.serve_forever()