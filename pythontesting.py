from bs4 import BeautifulSoup as bs
from requests import get
page = get('http://example.com/').content
soup = bs(page, 'lxml')
def generatedCode():
	tag0 = soup.findAll('title')
	tag0AttrList = [x.text for x in tag0]