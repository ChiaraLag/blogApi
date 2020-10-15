var postContainer;
var modal;
var saveBtn;
var articles = [];
var tags = [];
var article;

init();

function init() {

    $(document).ready(function () {

        //$("#saveBtn").click(addPost);

        $.get({
            url: "https://texty-89895.firebaseio.com/posts.json",
            success: function (result, textStatus, jqXHR) {
                for (var id in result) {
                    var post = result[id];
                    if (post.public === true)
                        generatePosts(post);
                    console.log(post.public);

                }
            }
        });

        $("saveBtn").click(function () {
            $.post({
                url: "https://texty-89895.firebaseio.com/posts.json",
                data: JSON.stringify(addPost),
                success: function (data, textStatus, jqXHR) {
                    
                }
            })
        });

    });
}

function closeModal() {
    $("#exampleModal").modal("hide");
}

function resetModal() {
    $("#postTitle").val("");
    $("#postContent").val("");
    $("#publiCheck").prop("checked", false);
    $("#featuredCheck").val("checked", false);

}

function addPost() {

    closeModal();

    var title = $("#postTitle").val();
    var body = $("#postContent").val();
    var public = $('#publiCheck').is(":checked");
    var featured = $('#featuredCheck').is(":checked");
    var post = new Post(title, body, public, featured);
    resetModal();

    return post;
    //posts.push(post)

    //generatePosts(post);

    //return posts;
}

function generatePosts(post) {

    var postContainer = $("#postContainer").clone();
    postContainer.css("display", "block");
    postContainer.attr("id", "");
    postContainer.addClass("class", "postContainer");

    var postHeader = postContainer.find(".card-header");
    var postBody = postContainer.find(".card-text");
    var postTags = postContainer.find(".tags");
    var cardBody = postContainer.find(".card-body")

    if (post.featured === true) {
        postHeader.css("background-color", "#64b5f6");
        cardBody.css("background-color", "#64b5f6");
    };

    postHeader.html(post.title);
    postBody.html(post.body);
    if ((post.tag) !== undefined) {
        postTags.html("Tags: " + (post.tag).toString());
    }
    $("#postsRow").append(postContainer);

}

function showPosts(articles) {

    for (var id in result) {
        var post = result[id];
        if (post.public === true)
            generatePosts(post);
        console.log(post.public);

    }

}

function getSortOrder(prop) {
    return function (a, b) {
        if (a[prop] === false && b[prop] === true) {
            return 1;
        } else if (a[prop] === true && b[prop] === false) {
            return -1;
        }
        return 0;
    }
} 