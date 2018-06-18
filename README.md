## get started

just open index.html in a browser and type in:

- url of server that processes the image data. *1
- frame rate per seconds

and hit RUN.

*1 server should:

- expect ``{'base64': ['MIMETYPE;base64,']IMAGE_BASE_64_DATA_STRING', ['frame_count': int§]}`` as input
- respond with ``{'base64': IMAGE_PNG_BASE_64_DATA_STRING}``
