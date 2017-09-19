$(document).ready(() => {
    $("#bannertitle").fitText(0.7);
});

window.onload = () => {
    getPosts();
}

function addPost() {    
    $.ajax({
        url: "/addPost",
        method: "POST",
        data: $('#postform').serializeArray(),
        error: () => {
        },
        success: () => {
            getPosts();
        },
        complete: () => {
        }
    });
}

function getPosts() {
    $.ajax({
        url: "/getPosts",
        method: "POST",
        error: () => {
        },
        success: (posts) => {
            $("#posts").empty();
            let numPosts = posts.length;
            for (let i = 0; i < numPosts; i++) {
                $("#posts").append(pugtemplate_post(posts[i]));
            }
        },
        complete: () => {
        }
    });
}