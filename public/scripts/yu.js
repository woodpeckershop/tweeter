
$(document).ready(function () {
  const createTweetElement = (data) => {
    const $username = $('<h2 class = "username">').text(data.user.name);
    const $image = $('<img/>').attr('src', data.user.avatars);
    const $tweetname = $('<h2 class="tweet-name">').text(data.user.handle);
    const $content = $('<p class = "content">').text(data.content.text);
    const $date = $("<span class='dateCreated'>").text(timeago.format(data.created_at));
    const $flag = $('<i id="flag" class="fas fa-flag">');
    const $retweet = $ ('<i id="retweet" class="fas fa-retweet">');
    const $heart = $('<i id="heart" class="fas fa-heart">');

    const $article = $('<article class="tweet">');
    const $header = $('<header>');
    const $profileDiv = $('<div class="profile">');
    const $hr = $('<hr class="line" />');
    const $spanSymbol = $('<span class="symbol">');
    const $footer = $('<footer>');

    $spanSymbol.append($flag,$retweet, $heart);
    $footer.append($date,$spanSymbol);
    $header.append($profileDiv, $tweetname);
    $profileDiv.append($image, $username)
    $article.append($header, $content, $hr, $footer)
    // $allTweets.append($article);


    return $article;

  }

  const renderTweets = function (tweets) {
  //  empty posts on the screen before posting the database
  const $allTweets = $('.all-tweets');
    $allTweets.empty();

    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // console.log(tweet)
      // takes return value and appends it to the tweets container
      $('.all-tweets').prepend($tweet);
    }
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  // renderTweets(data);

  const $form = $('#new-post-form');
  $form.on('submit', function (event) {
    event.preventDefault();
    const $countButton = $(".counter");
    const tweetNumber = Number($countButton.text())
    $('#too-long').slideUp();
    $('#empty').slideUp();
    if (tweetNumber === 140) {
      // $('#empty').slideUp();
      return $('#empty').slideDown();

    };
    if (tweetNumber < 0) {
     
      return $('#too-long').slideDown();
    }

    console.log('the form has submitted');
    // why this = textarea inputs instead of the form as a whole html section?
    const serializedData = $(this).serialize();
    console.log(serializedData);
    $.post('/tweets', serializedData).then(loadTweets)
    // how to slideUp if the client made a second mistake?
    // $('#too-long').slideUp();
    // $('#empty').slideUp();

    // why this does not work?
    const $newPostForm = $('#tweet-text');
    // $newPostForm.empty();
    $newPostForm.val('')
    // .focus();
    $countButton.text(140)
  });

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (posts) => {
        console.log(posts);
        renderTweets(posts);
      },
      error: (err) => {
        console.err(err);
      }
    });
  };


  // loadTweets();



  // $.post('/api/posts', serializedData).then(fetchPosts)
  // $.post('/api/posts', serializedData).then(() => {})
  // $.post('/api/posts', serializedData, (response) => {
  //   console.log(response);
  //   fetchPosts();
  // });
  // });
  // const $tweet = createTweetElement(tweetData);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('.all-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})