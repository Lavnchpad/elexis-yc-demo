import requests


def get_file_data_from_s3(file_url):
    """
    Fetch the file data from the given URL and return the content.
    """
    response = requests.get(file_url)

    if response.status_code == 200:
        file_content = response.text
    else:
        return {"status": "error", "message": f"Failed to fetch the file. HTTP Status Code: {response.status_code}"}

    return file_content
