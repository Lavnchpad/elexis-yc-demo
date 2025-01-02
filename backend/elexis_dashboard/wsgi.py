"""
WSGI config for elexis_dashboard project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import threading

from django.core.wsgi import get_wsgi_application

from elexis.sqs_consumer import start_sqs_consumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'elexis_dashboard.settings')
threading.Thread(target=start_sqs_consumer, daemon=True).start()

application = get_wsgi_application()
