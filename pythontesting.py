from bs4 import BeautifulSoup as bs
from requests import get
page = get('https://easyscraper.netlify.app/').content
soup = bs(page, 'lxml')
test = (soup.findAll(class_='field'))
print([x.text for x in test])