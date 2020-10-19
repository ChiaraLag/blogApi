class ArticlePageController {

    constructor() {
        this.posts = []
        this.restController = new RestController()
        this.articleContainer
        this.articleTitle
        this.articleImage
        this.addPostBtn
        this.postTag = []
        this.readPostBtn

    }

    init() {
        $(document).ready(function () {
            this.articleContainer = $("#articleContainer")
            this.articleAuthor = $("#articleAuthor")
            this.articleTitle = $("#articleTitle")
            this.articleSubtitle = $("#articleSubtitle")
            this.articleBody = $("#articleBody")
            this.articleDate = $("#articleDate")
            this.articleImgage = $("articleImg")
            this.articleTag = $("articleTag")

            this.getPost(post)
            

        }.bind(this))
    }

    getPost(post) {
        this.restController.read_a_post("http://localhost:3000/posts" + post._id, function (data, status, xhr) {
            console.log("data", data)

            createUIArtcle(post)


        }.bind(this))
    }

    createUIArticle(post) {
        //console.log("post",post)

        var postContainer = $("#articleContainer").clone()
        postContainer.css("display", "block")
        postContainer.attr("id", "")
        postContainer.addClass("class", "articleContainer")

        var postAuthor = postContainer.find("#articleAuthor")
        var postHeader = postContainer.find("#articleTitle")
        var postSubtitle = postContainer.find("#articleSubtitle")
        var postBody = postContainer.find("#articleBody")
        var postDate = postContainer.find("#articleDate")
        var postTag = postContainer.find("#articleTag")
        var postImg = postContainer.find("#articleImg")
        console.log("img", post.img_source)

        postAuthor.html(post.author)
        postBody.html(post.body)
        postHeader.html(post.title)
        postSubtitle.html(post.subtitle)
        postDate.html(this.formatDate(post.created_date))
        console.log("Data",this.formatDate(post.created_date))
        postTag.html(post.tag.toString())  
        postImg.attr("src",""+post.img_source+"")

    }
}