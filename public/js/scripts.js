$(document).ready(() => {
    $("#bannertitle").fitText(0.7);
});

window.onload = () => {
    getPosts();
}

function addPost() {
    let valid = true;
    $.each($('#postform').serializeArray(), (i, param) => {
        if (!param.value) {
            valid = false;
            return;
        }
    });

    if (!valid) return;

    $.ajax({
        url: "/addPost",
        method: "POST",
        data: $('#postform').serializeArray(),
        error: () => {},
        success: () => {
            getPosts();
        },
        complete: () => {}
    });
}

function deletePost(id) {
    if (!confirm("Are you sure?")) {
        return;
    }

    $.ajax({
        url: `/deletePost/${id}`,
        method: "POST",
        error: () => {},
        success: () => {
            $('.post').find(`id:contains(${id})`)
            .parent().parent().remove();
        },
        complete: () => {}
    });
}

function getPosts() {
    $.ajax({
        url: "/getPosts",
        method: "POST",
        error: () => {},
        success: (posts) => {
            clearPosts();
            let numPosts = posts.length;
            for (let i = 0; i < numPosts; i++) {
                $("#posts").
                append(pugtemplate_post(posts[i]));
            }
        },
        complete: () => {}
    });
}

function truncatePosts() {
    if (!confirm("Are you sure?")) {
        return;
    }

    $.ajax({
        url: "/truncatePosts",
        method: "POST",
        error: () => {},
        success: () => {
            clearPosts();
        },
        complete: () => {}
    });
}

function clearPosts() {
    $("#posts").empty();
}