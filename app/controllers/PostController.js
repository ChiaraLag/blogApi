class PostController {

    costructor() {
        this.posts = [];
        this.postContainer;
        this.postsContainer;
        this.modal;
        this.openModalBtn;
        this.modalTitle;
        this.modalDescription;
        this.madalPublicCheck;
        this.addPostBtn;

        this.editMode = false;
        this.editedPostId = null;
        this.editedPost = null;
    };

    init() {
        $(document).ready(function () {
            this.postsRow = $("postsRow");
            this.postContainer = $("#postContainer");
            this.modal = $("#exampleModal");
            this.modalTitle = $("#postTitle");
            this.modalBody = $("#postBody");
            this.modalCheck = $("#publiCheck")
            this.addPostBtn = $("saveBtn");

            this.addPostBtn.click(function () {

                if (editMode) {
                    //
                    this.updatePost(editedPost);


                } else {

                    var post = new Post(
                        this.modalTitle.val(),
                        this.modalBody.val(),
                        this.modalCheck.is(":checked"),
                        false
                    );
                    this.newPost(post);


                }

                this.closeModal();
                this.resetModal();

            }.bind(this));

            this.showPosts();

        }.bind(this));
    }

    closeModal() {
        $("#exampleModal").modal("hide");
    }

    resetModal() {
        $("#postTitle").val("");
        $("#postContent").val("");
        $("#publiCheck").prop("checked", false);
        $("#featuredCheck").val("checked", false);

    }

    addPost() {

        postC.closeModal();

        var title = $("#postTitle").val();
        var content = $("#postContent").val();
        var publicc = $('#publiCheck').is(":checked");
        var featured = $('#featuredCheck').is(":checked");

        postC.resetModal();

        var post = new Post(title, content, publicc, featured);
        posts.push(post);

        postC.generatePosts(post);

        return posts;
    }

    generatePosts(post) {

        var postContainer = $("#postContainer").clone();
        postContainer.css("display", "block");
        postContainer.attr("id", "");
        postContainer.addClass("class", "postContainer");

        var postHeader = postContainer.find(".card-header");
        var postBody = postContainer.find(".card-text");
        /*var postTags = postContainer.find(".tags");*/
        var cardBody = postContainer.find(".card-body")

        if (post.featured === true) {
            postHeader.css("background-color", "#64b5f6");
            cardBody.css("background-color", "#64b5f6");
        };

        postHeader.html(post.title);
        postBody.html(post.body);
        /*if ((post.tag) !== undefined) {
            postTags.html("Tags: " + (post.tag).toString());
        }*/

        postContainer.find("#editPost").click(function () {
            this.editMode = true;
            this.editedPost = post;
            this.openModal(post);

        }.bind(this));

        $("#postsRow").append(postContainer);



    }

    showPosts() {
        this.restController.get("http://localhost:3000/posts", function (data, status, xhr) {
            for (var id in data) {
                var post = data[id];
                if (post.public === true) {
                    this.createUIPost(post);
                }
            }
        }.bind(this));
    }

    updatePost(post) {
        //call the rest controller

        this.restController.updatePost("http://localhost:3000/posts/" + post.id,
            function () {
                this.closeModal();
                this.resetModal();
                //update UI 
                editMode = false;
                editedPost = null;

            }.bind(this)
        )

    }
}
//var posts = [];

/*posts.push(new Post("Je", "blablabla", true, false))
posts.push(new Post("Ne", "blablabla", true, false))
posts.push(new Post("Sais", "blablabla", true, false))
posts.push(new Post("Pas", "blablabla", true, false))

let postC = new PostController();

$(document).ready(function () {

    $("#saveBtn").click(function () {
        postC.addPost();
    });

    postC.showPosts(posts);

});*/
