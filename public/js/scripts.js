$(document).ready(() => {
    $("#bannertitle").fitText(0.7);
});

window.onload = () => {
    $.ajax({
        url: "/getPosts",
        method: "POST",
        error: () => {
        },
        success: (posts) => {
            let numPosts = posts.length;
            for (let i = 0; i < numPosts; i++) {
                $(".posts").append(pugtemplate_post(posts[i]));
            }   
        },
        complete: () => {
        }
    });
}