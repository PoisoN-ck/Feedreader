# Testing Description

It is a web-based application that reads RSS feeds. The main of goal of this app is to test whether feedreader works as expected. App has 7 test to perform:

1) Whether RSS Feeds exists/defined;
2) It has valid URL;
3) It has a name;
4) The menu is hidden by default;
5) Whether menu is properly working when is shown/hidden;
6) Element(s) is present in the feed;
7) Ensures that the content actually changes when loaded another feed;

# Dependencies

The Feedreader is dependant on a framework called Jasmine (https://jasmine.github.io/) which actually executes all the tests on the page. For any documenation or additional knowledge about the framework, please visit their official website (listed above).

# How to Run?

To actually use the Feedreader and the results of the test simply open index.html in your browser. For editing/checking how the test is arranged please open jasmine/spec/feedreader.js in the Text Editor.