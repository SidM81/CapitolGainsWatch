from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize WebDriver
driver = webdriver.Firefox()

# Load the webpage
URL = "https://www.capitoltrades.com/trades"
driver.get(URL)

# Wait for the content to load
wait = WebDriverWait(driver, 10)
wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "q-tr")))

# Find all elements with class name "q-tr"
result = driver.find_elements(By.CLASS_NAME, "q-tr")

# Lists to store extracted data
Politians = []
Politians_info = []
Issuers = []
Issuers_token = []
Published = []
Traded = []
Filed = []
Type = []
Amount = []
Prices = []

# Iterate over each row element
for row in result:
    # Extract Politians' names
    names = row.find_elements(By.CLASS_NAME, "q-fieldset.politician-name")
    for name in names:
        Politians.append(name.text.strip())
    
    # Extract Politians' info (Party, House, State)
    infos = row.find_elements(By.CLASS_NAME, "q-fieldset.politician-info")
    for div in infos:
        spans = div.find_elements(By.TAG_NAME, "span")
        info = [span.text.strip() for span in spans]
        Politians_info.append(info)

    # Extract Issuer Information
    issues = row.find_elements(By.CLASS_NAME, "q-fieldset.issuer-name")
    issues_token = row.find_elements(By.CSS_SELECTOR, "span.q-field.issuer-ticker")
    for issue in issues:
        Issuers.append(issue.text.strip())
    
    for issue in issues_token:
        s = issue.text.strip()
        if s != "N/A":
            s = s[:-3]
        Issuers_token.append(s)

    # Extract When Published
    publishes = row.find_elements(By.CLASS_NAME, "q-td.q-column--pubDate")
    for publish in publishes:
        div = publish.find_elements(By.CLASS_NAME, "q-label")
        test = [d.text.strip() for d in div]
        div = publish.find_elements(By.CLASS_NAME, "q-value")
        test.extend(d.text.strip() for d in div)
        Published.append(test)

    publishes2 = row.find_elements(By.CSS_SELECTOR,"td.q-td.q-column--txDate")
    for publish in publishes2:
        Date = publish.find_elements(By.CSS_SELECTOR,"div.text-size-3.font-medium")
        Year = publish.find_elements(By.CSS_SELECTOR,"div.text-size-2.text-txt-dimmer")
        D = ""
        Y = ""
        for e in Date:
            D = e.text.strip()
        for e in Year:
            Y = e.text.strip()
        Traded.append(f"{D},{Y}")

    # Extract Filed After
    tds = row.find_elements(By.CLASS_NAME, "q-td.q-column--reportingGap")
    for td in tds:
        spans = td.find_elements(By.TAG_NAME, "span")
        for span in spans:
            Filed.append(span.text.strip())
    
    # Extract Type (Buy,Sell)
    tds3 = row.find_elements(By.CLASS_NAME, "q-td.q-column--txType")
    for td in tds3:
        spans = td.find_elements(By.TAG_NAME, "span")
        for span in spans:
            Type.append(span.text.strip())
    
    # Extract Amount
    tds4 = row.find_elements(By.CLASS_NAME, "q-td.q-column--value")
    for td in tds4:
        spans = td.find_elements(By.CLASS_NAME, "q-label")
        for span in spans:
            Amount.append(span.text.strip())
    
    # Extract Prices
    tds4 = row.find_elements(By.CLASS_NAME, "q-td.q-column--price")
    for td in tds4:
        spans = td.find_elements(By.TAG_NAME, "span")
        for span in spans:
            Prices.append(span.text.strip())

# Print extracted data
print(Politians)
print(Politians_info)
print(Issuers)
print(Issuers_token)
print(Published)
print(Traded)
print(Filed)
print(Type)
print(Amount)
print(Prices)

# Close the WebDriver
driver.quit()