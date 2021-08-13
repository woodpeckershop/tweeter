/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // submit event handler
  const $form = $(".submitForm");
  $form.on("submit", function (event) {
    event.preventDefault();
    const urlEncodedData = $(this).serialize();
    const $countButton = $(".counter");
    const tweetNumber = Number($countButton.text());
    $('#too-long').slideUp('fast');
    $('#empty').slideUp('fast');
    if (tweetNumber === 140) {
      
          return $('#empty').slideDown('fast');
    }
    if (tweetNumber < 0) {
 
      return $('#too-long').slideDown('fast');
    }
    console.log(urlEncodedData);

    $.post("/tweets", urlEncodedData).then(loadTweets);
  });

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (posts) => {
        console.log(posts);
        renderTweets(posts);
      },
      error: (err) => {
        console.err(err);
      },
    });
  };
  // loadTweets()

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  const createTweetElement = (tweet) => {
    const $content = $("<div class = 'content'>").text(tweet.content.text);
    const $postDate = $("<span class = 'postDate'>").text(
      timeago.format(tweet.created_at)
    );

    const $tweet = $("<article>").addClass("tweet");

    //header
    const $header = $("<header>").addClass("profile");
    const $user = $("<span>").addClass("user");

    const $username = $("<span class = 'username'>").text(tweet.user.name);
    const $avatar = $("<img class = 'avatar'>").attr("src", tweet.user.avatars);
    $user.append($avatar, $username);
    const $handle = $("<span class = 'at'>").text(tweet.user.handle);
    $header.append($user, $handle);
    const $footer = $("<footer>");

    const $div = $("<div>");
    const $icon1 = $("<i>").addClass("fas fa-flag");
    const $icon2 = $("<i>").addClass("fas fa-retweet");
    const $icon3 = $("<i>").addClass("fas fa-heart");
    $div.append($icon1, $icon2, $icon3);

    $tweet.append($header, $content, $footer);

    $footer.append($postDate, $div);

    return $tweet;
  };

  // renderTweets(data);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
});
