import requests

api_url = "http://127.0.0.1:5000/trades"  # Replace with your API URL


response = requests.get(api_url)

print("------------DATA COLLECTED----------")

if response.status_code == 200:
    data = response.json()
    
    # Example: Print the first 5 Politicians
    print("Politicians:")
    for politician in data["Politians"][:10]:
        print(politician)
else:
    print("Failed to retrieve data from the API. Status code:", response.status_code)

