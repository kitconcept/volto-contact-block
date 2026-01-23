from plone import api
from plone.app.uuid.utils import uuidToObject
from zExceptions import Unauthorized

import re


RESOLVEUID_RE = re.compile(r"resolveuid/([^/]+)")


def path_to_object(href: str):
    "Resolve a UID-based or portal-relative path to a content item"
    obj = None
    match = RESOLVEUID_RE.search(href)
    if match:
        uid = match.group(1)
        try:
            obj = uuidToObject(uid)
        except Unauthorized:
            pass
    else:
        # we have a non-UID based path
        catalog = api.portal.get_tool("portal_catalog")
        portal = api.portal.get()
        path = "/".join(api.portal.get().getPhysicalPath()) + href.replace(
            portal.absolute_url(), ""
        )
        results = catalog.searchResults(path={"query": path, "depth": 0})
        if results:
            brain = results[0]
            try:
                obj = brain.getObject()
            except Unauthorized:
                pass
    return obj
