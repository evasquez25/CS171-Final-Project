I will briefly explain all the data files and how they are used.
s
<financial_crisis_headlines.csv> contains datapoints for headlines.
It contains many different New York Times headlines about the 2007
- 2008 financial crisis, as well as which year they were published. 
This is used for the exploratory feature about the financial
crisis. 

<soviet_headlines.csv> does the same thing and follows the same
structure as financial_crisis_headlines.csv, except that it has
articles that contain the keyword "Soviet". 

<lineGraph_heatMap_data.csv> is pretty self explanatory. It is the
data used by the line graph and the heat map visualizations. Each
row represents the data for one article. The field <ndc> stands for 
"news desk category", which is how the NYT categorizes different
articles that it publishes, <year> is what year that article was
published, <headline_count> is the number of articles that were
published in that news desk category that year, and 
<avg_headline_len> is the average character count for articles of
that news desk category that year.

<news_desks_descriptions.csv> contains the news desks that we
focused on as well as desciptions of that news desk that we found
on the internet or wrote ourselves after reading descriptions
from the internet. 

<wordcloud_data.csv> is the data used for the word cloud 
visualization. It contains <ndc>, which is news desk category,
like it is above. The <word> field contains strings of single words.
All the words in this field are one of the most frequently
occurring words in that news desk category that are not stop words 
and also contain significant meaning. <word_frequency> is just how 
many times that word appeared in that news desk category. 