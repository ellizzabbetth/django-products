import urllib.parse import urljoin
import requests
from app.settings import OTHERAPP_BASE_URL

def otherapp_post_request(base_url, body):
    try:
        response = requests.post(
            urljoin(OTHERAPP_BASE_URL, base_url),
            headers={
                'Content-type': 'application/json',
                'Authorization': 'Token ' + OTHERAPP_BASE_URL
            },
            json=body
        )
        return response.json()
    except Exception as e:
        return e


def send_data_to_otherapp(body, user):
    url = '/api/endpoint'
    otherappBody = {

        'test': body.get('test_id')
    }
    otherapp_post_request = otherapp_post_request(url, otherappBody)
    return otherapp_post_request