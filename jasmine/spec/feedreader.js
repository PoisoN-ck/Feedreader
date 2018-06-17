/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Check whether each feed has a defined URL and it is not empty */

        it('have URL', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).not.toBe('');
                expect(allFeeds[i].url).toMatch(/(http|https)\:\/\/(?=\w)/); //To be sure link can http:// or https:// and is not empty
            }
        });

        /* Check whether each feed has a defined name and it is not empty*/

        it('have a name', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).not.toBe('');
                expect(allFeeds[i].name).toMatch(/^\w{3,}/); 
            }
        });

    });


    describe("The menu", function() {
        
        /* Check whether the menu is hidden by default */

        let menuIsHidden = $("body").hasClass("menu-hidden");
        
        it('is hidden', function() {
            expect(menuIsHidden).toBe(true);  
        });
       
        /* Check whether visibility is changed when the menu icon is clicked. When clicked it is shown and when clicked again becomes hidden */
        
        it('is properly working', function() {
            $(".menu-icon-link").trigger("click");
            menuIsHidden = $("body").hasClass("menu-hidden");
            expect(menuIsHidden).toBe(false);
            $(".menu-icon-link").trigger("click");
        });
        
    });


    describe("Initial Entries", function() {

        /*  Ensure that loaded feed has a t least 1 feed element */
        let generalFeed = document.querySelector('.feed');
        let allEntries;
        function feedIsReady(status) {
            setTimeout(function() {
                allEntries = generalFeed.querySelectorAll('.entry');
                if (status) {
                    return status();
                }
            }, 4000);
        }
        beforeEach(function(done) {
            feedIsReady(function() {
                done();
            })
        });
        it('have feed elements', function(done){
            expect(allEntries.length).toBeGreaterThan(0);
            done();
        });
    });
        
    describe("New Feed Selection", function() {

       /* To make sure that content actually changes when new feed was loaded */

       let feedsData = [];

       /* Build an array of feeds list */

       let feeds = Array.prototype.slice.call(document.querySelectorAll('.feed-list a'));
       
       function saveFeed(feedsList, done) {
           loadFeed(feedsList.shift().dataset.id, function() { // Load each feed
                feedsData.push(document.querySelector('.feed').innerHTML); // Add feed data to an array as a new array eleement
                if (feedsList.length > 0) {
                    saveFeed(feedsList, done);
                } else {
                    done();
                }
           })
       }
       

        beforeEach(function(done) {
            /* Alternative variant of simplier solution
            loadFeed(1, function() {
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(2, function() {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
            */ 
           saveFeed(feeds, done);

        });

        it('new content', function(done) {
            for (let i = 0; i < feedsData.length; i++) {
                expect(feedsData[i]).not.toEqual(feedsData[i+1]);
                done();
            }
        });
    });
}());
    