from bs4 import BeautifulSoup as bs
from requests import get
page = get('https://easyscraper.netlify.app/').content
soup = bs(page, 'lxml')

class0 = soup.findAll(class_='field')
class0Attrlist=[]
for i in class0:
	class0Attrlist.append(i.get('src'))
print(class0Attrlist)