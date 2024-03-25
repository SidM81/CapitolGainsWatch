from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/trades', methods=['GET'])
def get_trades():
    URL = "https://www.capitoltrades.com/trades"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content,"lxml")
    result = soup.find_all("tr", {"class": "q-tr"})

    data = {
        "Politians": [],
        "Politians_info": [],
        "Issuers": [],
        "Issuers_Token": [],
        "Published": [],
        "Traded": [],
        "Filed": [],
        "Type": [],
        "Amount": [],
        "Prices": []
    }

    for row in result:
        # Names of Politians
        names = row.find_all("h3",{"class":"q-fieldset politician-name"})
        for name in names:
            data["Politians"].append(name.text.strip())
        
        # Info of Politians (Party,House,State)
        infos = row.find_all("div",{"class":"q-fieldset politician-info"})
        for div in infos:
            spans  = div.find_all("span")
            info = []
            for span in spans:
                info.append(span.text.strip())
            data["Politians_info"].append(info)

        # Issuer Information
        issues = row.find_all("h3","q-fieldset issuer-name")
        issues_token =  row.find_all("span","q-field issuer-ticker")
        for issue in issues:
            data["Issuers"].append(issue.text.strip())

        for issue in issues_token:
            s = issue.text.strip()
            if(s!="N/A") :
                s = s[:-3]
            data["Issuers_Token"].append(s)

        # When Published
        publishes = row.find_all("td",{"class":"q-td q-column--pubDate"})
        for publish in publishes:
            div = publish.find_all("div",{"class":"q-label"})
            test = []
            for d in div:
                test.append(d.text.strip())
            div = publish.find_all("div",{"class":"q-value"})
            for d in div:
                test.append(d.text.strip())
            data["Published"].append(test)

        #When Traded
        publishes2 = row.find_all("td",{"class":"q-td q-column--txDate"})
        for publish in publishes2:
            div = publish.find_all("div",{"class":"q-label"})
            test = []
            for d in div:
                test.append(d.text.strip())
            div = publish.find_all("div",{"class":"q-value"})
            for d in div:
                test.append(d.text.strip())
            data["Traded"].append(test)

        #Filed After
        tds = row.find_all("td",{"class":"q-td q-column--reportingGap"})
        for td in tds:
            spans = td.find_all("span")
            for span in spans:
                data["Filed"].append(span.text.strip())
        
        #Type (Buy,Sell)
        tds3 = row.find_all("td",{"class":"q-td q-column--txType"})
        for td in tds3:
            spans = td.find_all("span")
            for span in spans:
                data["Type"].append(span.text.strip())
        
        #Amount
        tds4 = row.find_all("td",{"class":"q-td q-column--value"})
        for td in tds4:
            spans = td.find_all("span",{"class":"q-label"})
            for span in spans:
                data["Amount"].append(span.text.strip())
        
        #Prices
        tds4 = row.find_all("td",{"class":"q-td q-column--price"})
        for td in tds4:
            spans = td.find_all("span")
            for span in spans:
                data["Prices"].append(span.text.strip())

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
