class ArticlePageController {

    constructor() {
        this.restController = new RestController()
    }

    init(){
        $(document).ready(function () {

            var post = JSON.parse(sessionStorage.getItem('data'));
            this.getPost(post);
            this.getComments(post);
            //console.log("post", JSON.parse(sessionStorage.getItem('data')))
        }.bind(this))
    }

    getPost(post) {
        this.restController.getArticle("http://localhost:3000/articles/" + post._id, function (data, status, xhr) {
            post = data
            this.createUIArticlePage(post)


        }.bind(this))
    }

    createUIArticlePage(post) {
        var postContainer = $(".articleContainer").clone()
        postContainer.css("display", "block")
        postContainer.attr("id", "")
        postContainer.addClass("class", "articleContainer")

        var postHeader = $(".articleTitle")
        var postSubtitle = $(".articleSubtitle")
        var postBody = $(".articleBody")
        var postImg = $(".img-thumbnail")
        var postAuthor = $(".articleAuthor")
        var postDate = $(".articleDate")
        var postTags = $(".articleTag")

        postAuthor.html(post.autore)
        postBody.html(post.body)
        postHeader.html(post.title)
        postSubtitle.html(post.subtitle)
        postDate.html(this.formatDate(post.Created_date))
        postTags.html(post.Ttags.toString())
        postImg.attr("src", "" + post.img_source + "")

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

    getComments(post) {
        this.restController.getCommentsArticle("http://localhost:3000/comments", function (data, status, xhr) {
            console.log("data", data)
            for (var id in data) {
                var comment = data[id]
                if(comment.id_articolo===post._id&&comment.public===true)
                    this.createUIComment(comment)

            }
        }.bind(this))
    }

    createUIComment(comment) {
        
        var commentDate = $(".commentDate")
        var commentName = $(".commentAuthor")
        var commentBody = $(".commentBody")
        var hideCommentBtn = '<a href="#" class="card-link" id="hideComment">nascondi</a>'

        commentDate.html(this.formatDate(comment.Created_date))
        commentName.html(comment.autore)
        commentBody.html(comment.body)
        $(".row").append(hideCommentBtn)


        $("#hideComment").click(function () {
            comment.public=false
            this.hideComment(comment)
        }.bind(this))

    };

    hideComment(comment) {

        var data = {
            "public": comment.public
        }

        this.restController.hideComment("http://localhost:3000/comments/" + comment._id, data,
            function () {      
                location.reload(true)
            }.bind(this)
        )


    }
}