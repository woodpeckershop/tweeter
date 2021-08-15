/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $(".write").click(function () {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });

  const scrollFunc = () => {
    // Get the current scroll value
    let y = window.scrollY;

    // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
    if (y > 0) {
      $("#upScroll").show();
    } else {
      $("#upScroll").hide();
    }
  };
  $(window).scroll(scrollFunc);

  $("#upScroll").click(function () {
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
    document.documentElement.scrollTop = 0;
  });

  const $form = $(".submitForm");
  // submit event handler
  $form.on("submit", function (event) {
    event.preventDefault();
    const urlEncodedData = $(this).serialize();
    const $countButton = $(".counter");
    const tweetNumber = Number($countButton.text());
    //edge cases
    $("#too-long").slideUp("fast");
    $("#empty").slideUp("fast");
    if (tweetNumber === 140) {
      return $("#empty").slideDown("fast");
    }
    if (tweetNumber < 0) {
      return $("#too-long").slideDown("fast");
    }

    //post request - call loadtweets
    $.post("/tweets", urlEncodedData).then(loadTweets);
    $("#tweet-text").val("");
    $countButton.text(140);
  });

  //ajax get request
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (posts) => {
        renderTweets(posts);
      },
      error: (err) => {
        console.err(err);
      },
    });
  };

  //call function when refresh page
  loadTweets();

  //function - render all tweets
  const renderTweets = function (tweets) {
    //  empty posts on the screen before posting the database
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };

  //function - create tweet HTML
  const createTweetElement = (tweet) => {
    const $tweet = $("<article>").addClass("tweet");

    //header
    const $header = $("<header>").addClass("profile");
    const $user = $("<span>").addClass("user");
    const $username = $("<span class = 'username'>").text(tweet.user.name);
    const $avatar = $("<img class = 'avatar'>").attr("src", tweet.user.avatars);
    $user.append($avatar, $username);
    const $handle = $("<span class = 'handleName'>").text(tweet.user.handle);
    $header.append($user, $handle);
    //content
    const $content = $("<p class = 'content'>").text(tweet.content.text);

    //footer
    const $footer = $("<footer>");
    const $postDate = $("<span class = 'postDate'>").text(
      timeago.format(tweet.created_at)
    );
    const $div = $("<div>");
    const $icon1 = $("<i>").addClass("fas fa-flag");
    const $icon2 = $("<i>").addClass("fas fa-retweet");
    const $icon3 = $("<i>").addClass("fas fa-heart");
    $div.append($icon1, $icon2, $icon3);
    $footer.append($postDate, $div);

    $tweet.append($header, $content, $footer);
    return $tweet;
  };
});
