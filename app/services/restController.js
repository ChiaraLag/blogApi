class RestController{


    constructor(){        
    }

    get(url,onSuccess,onError){
        $.get({
            url: url,
            success: onSuccess
          });


    }

    post(url,data,onSuccess,onError){
        $.post({
            url: url,
            data:JSON.stringify(data),
            contentType: "application/json",
            success: onSuccess
          });

    }

    updatePost(url,data,onSuccess,onError){
        $.ajax({
            url: url,
            type: 'PUT',
            data:JSON.stringify(data),
            contentType: "application/json",
            success: onSuccess
        });
    }

    patch(url,data,onSuccess,onError){
        $.ajax({
            url: url,
            type: 'PATCH',
            data:JSON.stringify(data),
            contentType: "application/json",
            success: onSuccess
        });
    }

    delete(url,onSuccess,onError){
        $.ajax({
            url: url,
            type: 'DELETE',
            contentType: "application/json",
            success: onSuccess
        });
    }

}    