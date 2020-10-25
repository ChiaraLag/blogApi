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
        this.postTags = []
        this.editMode = false
        this.editedPostId = null
        this.editedPost = null
        this.commentAuthor
        this.commentBody
        this.CommentDate
        this.commentPublic
        this.commentArticleId
        this.article


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
            this.commentAuthor = $("#commentAuthor")
            this.commentBody = $("#commentBody")
            this.commentDate = $("#commentDate")
            this.addPostBtn = $("#saveBtn")

            this.addPostBtn.click(function () {
                if (this.editMode === true) {
                    this.editedPost._id = this.editedPost._id
                    this.editedPost.title = this.modalTitle.val()
                    this.editedPost.body = this.modalBody.val()
                    this.editedPost.public = this.modalPublicCheck.is(":checked")
                    this.editedPost.featured = this.modalFeaturedCheck.is(":checked")
                    this.editedPost.subtitle = this.modalSubtitle.val()
                    this.editedPost.created_date = this.modalCreated_date.val()
                    this.posTags = this.postTag.val()
                    this.editedPost.tag = this.postTags
                    console.log("valore", this.postTags)
                    this.editedPost.autore = this.modalAuthor.val()
                    this.editedPost.img_source = this.modalImg.val()
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


            //$('#readPost').on('click',function(){ //change the selectors according to your HTML
               // localStorage.setItem("articleLink", $(this).data('target-article')); // dynamic assignment       
              //);

        }.bind(this))

    }

    patchPost(post) {
        //call the rest controller      
        //console.log("ID post", post._id)
        
        console.log("content", post)
        this.add_element_to_array(post)
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
        //console.log("ID post", post._id)

        this.restController.patch("http://localhost:3000/articles/" + post._id, data,
            function () {
                //this.closeModal()
                //this.resetModal()
                this.updateUIPost(post)
                this.editMode = false
                this.editedPost = null       
                location.reload(true)
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
            location.reload(true)
        }.bind(this))

    }

    createUIPost(post) {
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

        /*if(post.featured){
            console.log("true",post.featured)
            $(".card").css("border-color", "red")
        }
        else{
            console.log("false",post.featured)   
            $(".card").css("border-color", "black")
        }*/

        if (post.featured === true) {
            postHeader.css("background-color", "#64b5f6");         
            postHeader.css("font-weight", "bold");
        };

        postAuthor.html(post.autore)
        postBody.html(post.body)
        postHeader.html(post.title)
        postSubtitle.html(post.subtitle)
        postDate.html(this.formatDate(post.Created_date))
        postTags.html(post.Ttags.toString())
        postImg.attr("src", "" + post.img_source + "")

        postContainer.find("#editPost").click(function () {
            this.editMode = true
            this.editedPost = post
            this.openModal(post)
        }.bind(this))

        postContainer.find("#deletePost").click(function () {
            this.deletePost(post)
        }.bind(this))

        postContainer.find("#readPost").click(function (e) {
            e.preventDefault();
            sessionStorage.setItem('data', JSON.stringify(post))
            window.location.href = 'article_page.html'
        }.bind(this))

        $("#postsRow").append(postContainer)
    };

    closeModal() {
        this.modal.modal('hide')
    };

    openModal(post) {
        var modalTitle = this.modal.find(this.modalTitle)
        var modalBody = this.modal.find(this.modalBody)
        var modalPublicCheck = this.modal.find(this.modalPublicCheck)
        var modalFeaturedCheck = this.modal.find(this.modalFeaturedCheck)
        var modalSubtitle = this.modal.find("#postSubtitle")
        var modalAuthor = this.modal.find("#postAuthor")
        var modalTag = this.modal.find("#postTag")
        var modalImg = this.modal.find("#postImg")
        var modalCreated_date = this.modal.find("#postDate")

        modalTitle.attr("value",""+post.title+"")
        modalBody.html(post.body)
        modalPublicCheck.prop("checked", post.public)
        modalFeaturedCheck.prop("checked", post.featured)
        modalSubtitle.attr("value", "" + post.subtitle + "")
        modalAuthor.attr("value", "" + post.autore + "")
        modalCreated_date.val(post.Created_date)
        //console.log("date",post.Created_date)
        modalTag.attr("value", post.Ttags)
        modalImg.attr("value", "" + post.img_source + "")

        this.modal.modal('show')
    };

    resetModal() {
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
        var postAuthor = postContainer.find(".card-author")
        var postSubtitle = postContainer.find(".subtitle")
        var postDate = postContainer.find(".card-date")
        var postTag = postContainer.find(".card-tag")
        var postImg = postContainer.find(".card-img-top")

        postHeader.html(post.title)
        postBody.html(post.body)
        //this.modalPublicCheck.prop("checked", post.public)
        //this.modalFeaturedCheck.prop("checked", post.featured)
        postSubtitle.html(post.subtitle)
        postAuthor.html(post.autore)
        postDate.val(post.created_date)
        console.log("date",post.Created_date)
        postTags.html(post.Ttags.toString())    
        console.log("date",post.Ttags)
        postImg.attr("src", "" + post.img_source + "")
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
