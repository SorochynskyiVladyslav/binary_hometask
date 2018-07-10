function sort_posts(sort_posts=posts, sort_type) {
    
    let date = sort_type.date;
    posts_tag_count(sort_posts, sort_type.tags);

    sort_posts.sort((a, b) => {
        
        if (a.tag_count > b.tag_count) return -1;
        if (a.tag_count < b.tag_count) return 1;
        
        if (date == 'down') {
            if (a.date > b.date) return -1;
            if (b.date > a.date) return 1;
        }
        else {
            if (a.date > b.date) return 1;
            if (b.date > a.date) return -1;
        }
        return 0;
    });
}

function get_sort_type() {
    let sort_type = {date: 'down', tags: []};
    if (localStorage.getItem('sort_type'))
        return JSON.parse(localStorage.getItem('sort_type'));
    return sort_type;
}

function posts_tag_count(posts, tags) {
    if (tags.length == 0) return;
    for (let i=0; i<posts.length; i++) {
        posts[i].tag_count = 0;
        for (let j=0; j<tags.length; j++){
            if (posts[i].tags.includes(tags[j])) posts[i].tag_count++;
        }
        
    }
}

function tags_included(post, tags) {
    if (!tags || tags.length == 0) return 0;
    let count = 0;
    for (let i=0; i<tags.length; i++) {
        if (post.tags.includes(tags[i])) count++;
    }
    return count;
}