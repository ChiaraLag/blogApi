class PostController {


    constructor() {
        this.posts = [];
        this.restController = new RestController();
        //UI
        //this.postsContainer;
        this.postContainer;
        this.modal;
        this.openModalBtn;
        this.modalTitle;
        this.modalBody;
        this.modalPublicCheck;
        this.modalFeaturedCheck;
        this.addPostBtn;

        this.editMode = false;
        this.editedPostId = null;
        this.editedPost = null;


    }

    init() {
        $(document).ready(function () {
            this.postsRow = $("#postsRow");
            this.postContainer = $("#postContainer");
            this.modal = $("#exampleModal");
            this.modalTitle = $("#postTitle");
            this.modalBody = $("#postBody");
            this.modalPublicCheck = $("#publiCheck");
            this.modalFeaturedCheck = $("#featuredCheck");
            this.addPostBtn = $("#saveBtn");

            this.addPostBtn.click(function () {

                if (this.editMode === true) {
                    this.editedPost._id = this.editedPost._id;
                    this.editedPost.title = this.modalTitle.val();
                    this.editedPost.body = this.modalBody.val();
                    this.editedPost.public = this.modalPublicCheck.is(":checked");
                    this.editedPost.featured = this.modalFeaturedCheck.is(":checked");
                    this.updatePost(this.editedPost);
                } else {

                    var post = new Post(
                        this.modalTitle.val(),
                        this.modalBody.val(),
                        this.modalPublicCheck.is(":checked"),
                        this.modalFeaturedCheck.is(":checked")
                    );
                    this.newPost(post);

                }

                this.closeModal();
                this.resetModal();

            }.bind(this));


            this.getPosts();




        }.bind(this));

    }


    updatePost(post) {
        //call the rest controller      
        //console.log("ID post", post._id);

        var data = {
            "title": post.title,
            "body": post.body,
            "featured": post.featured,
            "public": post.public
        }
        //console.log("ID post", post._id);

        this.restController.updatePost("http://localhost:3000/posts/" + post._id, data,
            function () {
                //this.closeModal();
                //this.resetModal();
                this.updateUIPost(post);
                this.editMode = false;
                this.editedPost = null;
                location.reload(true);

            }.bind(this)
        )


    }

    patchPost(post) {
        //call the rest controller      
        //console.log("ID post", post._id);

        var data = {
            "title": post.title,
            "body": post.body,
            "featured": post.featured,
            "public": post.public
        }
        //console.log("ID post", post._id);

        this.restController.patch("http://localhost:3000/posts/" + post._id, data,
            function () {
                //this.closeModal();
                //this.resetModal();
                this.updateUIPost(post);
                this.editMode = false;
                this.editedPost = null;
                location.reload(true);

            }.bind(this)
        )


    }

    deletePost(post) {

        this.restController.delete("http://localhost:3000/posts/" + post._id,
            function () {
                location.reload(true);
            }.bind(this)
        )


    }



    getPosts() {
        this.restController.get("http://localhost:3000/posts", function (data, status, xhr) {
            //console.log("data", data);
            for (var id in data) {
                var post = data[id];
                //console.log("posts", post)
                //console.log("public posts", post)
                if (post.public === true)
                    this.createUIPost(post);

            }
        }.bind(this));
    }

    newPost(post) {
        //api call
        var data = {
            "title": post.title,
            "body": post.body,
            "featured": post.featured,
            "public": post.public
        }


        this.restController.post("http://localhost:3000/posts", data, function () {
            this.createUIPost(post);

        }.bind(this));

    }


    createUIPost(post) {
        var postContainer = $("#postContainer").clone();
        postContainer.css("display", "block");
        postContainer.attr("id", "");
        postContainer.addClass("class", "postContainer");

        var postHeader = postContainer.find(".card-header");
        var postBody = postContainer.find(".card-text");

        postHeader.html(post.title);
        postBody.html(post.body);

        postContainer.find("#editPost").click(function () {
            this.editMode = true;
            this.editedPost = post;
            this.openModal(post);
            //console.log("edited post", this.editedPost);
        }.bind(this));

        postContainer.find("#deletePost").click(function () {
            this.deletePost(post)
        }.bind(this));

        $("#postsRow").append(postContainer);

    }

    closeModal() {
        this.modal.modal('hide');
    }

    openModal(post) {
        var modalTitle = this.modal.find(this.modalTitle);
        var modalBody = this.modal.find(this.modalBody);
        var modalPublicCheck = this.modal.find(this.modalPublicCheck);
        var modalFeaturedCheck = this.modal.find(this.modalFeaturedCheck);

        modalTitle.text(post.title);
        console.log("titolo", post.title);
        modalBody.html(post.body);
        if (post.public == true) {
            modalPublicCheck.attr("value", "checked");
        } else {
            modalPublicCheck.attr("value", "unchecked");
        }
        //console.log("public", post.public);
        modalFeaturedCheck.prop(":checked", post.featured);
        //console.log("featured", post.featured);

        this.modal.modal('show');
    }


    resetModal() {
        this.modalTitle.val("");
        this.modalBody.val("");
        this.modalPublicCheck.prop("checked", false);
        this.modalFeaturedCheck.prop("checked", false);

    }

    updateUIPost(post) {
        var postContainer = $("#postContainer").clone();
        postContainer.css("display", "block");
        postContainer.attr("id", "");
        postContainer.addClass("class", "postContainer");

        var postHeader = postContainer.find(".card-header");
        var postBody = postContainer.find(".card-text");

        postHeader.html(post.title);
        postBody.html(post.body);
        this.modalPublicCheck.prop("checked", post.public);
        this.modalFeaturedCheck.prop("checked", post.featured);
    }



}