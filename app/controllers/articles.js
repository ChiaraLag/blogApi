class PostController {


    constructor() {
        this.posts = []
        this.restController = new RestController()
        //UI
        //this.postsContainer
        this.postContainer
        this.modal
        this.openModalBtn
        this.modalTitle
        this.modalBody
        this.modalPublicCheck
        this.modalFeaturedCheck
        this.modalSubtitle
        this.modalAuthor
        this.modalTag
        this.modalImg
        this.modalCreated_date
        this.addPostBtn
        this.postTag = []
        this.editMode = false
        this.editedPostId = null
        this.editedPost = null


    }

    init() {
        $(document).ready(function () {
            this.postsRow = $("#postsRow")
            this.postContainer = $("#postContainer")
            this.modal = $("#exampleModal")
            this.modalTitle = $("#postTitle")
            this.modalBody = $("#postBody")
            this.modalPublicCheck = $("#publiCheck")
            this.modalFeaturedCheck = $("#featuredCheck")
            this.modalSubtitle = $("#postSubtitle")
            this.modalAuthor = $("#postAuthor")
            this.postTag = $("#postTag")
            this.modalImg = $("#postImg")
            this.modalCreated_date = $("#postDate")
            this.addPostBtn = $("#saveBtn")

            this.addPostBtn.click(function () {

                if (this.editMode === true) {
                    this.editedPost._id = this.editedPost._id
                    this.editedPost.title = this.modalTitle.val()
                    this.editedPost.body = this.modalBody.val()
                    this.editedPost.public = this.modalPublicCheck.is(":checked")
                    this.editedPost.featured = this.modalFeaturedCheck.is(":checked")
                    this.patchPost(this.editedPost)
                } else {

                    var post = new Post(
                        this.modalAuthor.val(),
                        this.modalTitle.val(),
                        this.modalSubtitle.val(),
                        this.modalBody.val(),
                        this.modalPublicCheck.is(":checked"),
                        this.modalFeaturedCheck.is(":checked"),
                        this.modalCreated_date.val(),
                        this.modalImg.val(),
                        this.postTag.val()
                    )
                    this.newPost(post)

                }

                this.closeModal()
                this.resetModal()

            }.bind(this))


            this.getPosts()




        }.bind(this))

    }


    updatePost(post) {
        //call the rest controller      
        //console.log("ID post", post._id)

        var data = {
            "title": post.title,
            "body": post.body,
            "featured": post.featured,
            "public": post.public
        }
        //console.log("ID post", post._id)

        this.restController.updatePost("http://localhost:3000/articles/" + post._id, data,
            function () {
                //this.closeModal()
                //this.resetModal()
                this.updateUIPost(post)
                this.editMode = false
                this.editedPost = null
                location.reload(true)

            }.bind(this)
        )


    }

    patchPost(post) {
        //call the rest controller      
        //console.log("ID post", post._id)

        var data = {
            "title": post.title,
            "body": post.body,
            "featured": post.featured,
            "public": post.public
        }
        //console.log("ID post", post._id)

        this.restController.patch("http://localhost:3000/articles/" + post._id, data,
            function () {
                //this.closeModal()
                //this.resetModal()
                this.updateUIPost(post)
                this.editMode = false
                this.editedPost = null
                //location.reload(true)

            }.bind(this)
        )


    }

    deletePost(post) {

        this.restController.delete("http://localhost:3000/articles/" + post._id,
            function () {
                location.reload(true)
            }.bind(this)
        )


    }

    getPosts() {
        this.restController.get("http://localhost:3000/articles", function (data, status, xhr) {
            console.log("data", data)
            for (var id in data) {
                var post = data[id]
                //console.log("posts", post)
                //console.log("public posts", post)
                //if (post.public === true)
                    this.createUIPost(post)

            }
        }.bind(this))
    }

    newPost(post) {
        //api call

        this.add_element_to_array(post);

        var data = {
            "autore": post.author,
            "title": post.title,
            "subtitle": post.subtitle,
            "body": post.body,
            "public": post.public,
            "featured": post.featured,
            "Created_date": post.created_date,
            "Ttags": post.tag,
            "img_source": post.img_source
        }



        this.restController.post("http://localhost:3000/articles", data, function () {
            this.createUIPost(post)
            //console.log(data)
        }.bind(this))

    }

    getPost(post) {
        this.restController.read_a_post("http://localhost:3000/articles" + post._id, function (data, status, xhr) {
            console.log("data", data)

            createUIArtcle(post)


        }.bind(this))
    }

    createUIPost(post) {
        //console.log("post",post)

        var postContainer = $("#postContainer").clone()
        postContainer.css("display", "block")
        postContainer.attr("id", "")
        postContainer.addClass("class", "postContainer")

        var postAuthor = postContainer.find(".card-author")
        var postHeader = postContainer.find(".card-header")
        var postSubtitle = postContainer.find(".subtitle")
        var postBody = postContainer.find(".card-text")
        var postDate = postContainer.find(".card-date")
        var postTags = postContainer.find(".card-tag")
        var postImg = postContainer.find(".card-img-top")
        //console.log("img", PostImg)

        postAuthor.html(post.author)
        postBody.html(post.body)
        postHeader.html(post.title)
        postSubtitle.html(post.subtitle)
        postDate.html(this.formatDate(post.created_date))
        //console.log("Data", postDate)
        postTags.html(post.tag.toString())
        //console.log("tag",post.tag)
        postImg.attr("src", "" + post.img_source + "")

        postContainer.find("#editPost").click(function () {
            this.editMode = true
            this.editedPost = post
            this.openModal(post)
            //console.log("edited post", this.editedPost)
        }.bind(this))

        postContainer.find("#deletePost").click(function () {
            this.deletePost(post)
        }.bind(this))

        postContainer.find("#readPost").click(function () {
            this.getPost(post)
        }.bind(this))
    };

    createUIComment(){
        var postContainer = $("#postContainer").clone()

        var commentEmail = postContainer.find("#commentEmail")
        var commentName = postContainer.find("#commentName")
        var commentBody = postContainer.find("#commentBody")

        commentEmail.html(comment.email)
        commentName.html(comment.name)
        commentBody.html(comment.body)
        
    };

    closeModal() {
        this.modal.modal('hide')
    };


    openModal(post) {
        var modalTitle = this.modal.find(this.modalTitle)
        var modalBody = this.modal.find(this.modalBody)
        var modalPublicCheck = this.modal.find(this.modalPublicCheck)
        var modalFeaturedCheck = this.modal.find(this.modalFeaturedCheck)

        modalTitle.text(post.title)
        //console.log("titolo", post.title)
        modalBody.html(post.body)
        if (post.public == true) {
            modalPublicCheck.attr("value", "checked")
        } else {
            modalPublicCheck.attr("value", "unchecked")
        }
        //console.log("public", post.public)
        modalFeaturedCheck.prop(":checked", post.featured)
        //console.log("featured", post.featured)

        this.modal.modal('show')
    };


    resetModal(){
        this.modalTitle.val("");
        this.modalBody.val("");
        this.modalPublicCheck.prop("checked", false);
        this.modalFeaturedCheck.prop("checked", false);
    }

    updateUIPost(post) {
        var postContainer = $("#postContainer").clone()
        postContainer.css("display", "block")
        postContainer.attr("id", "")
        postContainer.addClass("class", "postContainer")

        var postHeader = postContainer.find(".card-header")
        var postBody = postContainer.find(".card-text")

        postHeader.html(post.title)
        postBody.html(post.body)
        this.modalPublicCheck.prop("checked", post.public)
        this.modalFeaturedCheck.prop("checked", post.featured)
    }

    add_element_to_array(post) {
        let splits = document.getElementById("postTag").value.split(',');
        for (var i = 0; i < splits.length; i++) {
            post.tag.push(splits[i]);
        }

        document.getElementById("postTag").value = "";
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

}
