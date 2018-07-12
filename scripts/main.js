var posts = [];
var search_result = [];
var sort_type = get_sort_type();
var display = 10;
var tag_set = new Set();

window.onload = async () => {
    
    await load_posts().catch((err) => { console.log(err); });
    generate_aside_tags();

    if (sort_type.date == 'down') {
        document.getElementById('sort-date-down').classList.toggle('active');
    }
    if (sort_type.date == 'up') {
        document.getElementById('sort-date-up').classList.toggle('active');
    }

    sort_posts(posts, sort_type);
    show_posts();
    

    window.onscroll = () => {
        let more_element = document.getElementById('more');
        var more_element_rect = more_element.getBoundingClientRect();

        if (more_element_rect.bottom - window.innerHeight <= 0) {
            if (search_result.length > 0) new_display(0, search_result);
            else new_display(display + 10);
            let up_btn = document.getElementById('btn-up');
            up_btn.style.visibility = 'visible';
        }
    }

    document.getElementById('btn-up').addEventListener("click", () => {
        ten_posts();
        document.documentElement.scrollTop = 0;
        display = 10;
        document.getElementById('btn-up').style.visibility = 'hidden';
    })

    document.getElementById('sort-date-up').addEventListener("click", () => {
        document.getElementsByClassName('search-form')[0].childNodes[1].value = '';
        search_result = [];
        if (sort_type.date == 'up') return;
        if (sort_type.date == 'down') {
            sort_type.date = 'up';
            document.getElementById('sort-date-up').classList.toggle('active');
            document.getElementById('sort-date-down').classList.toggle('active');
        }
        update_posts();
        localStorage.setItem('sort_type', JSON.stringify(sort_type));
    })

    document.getElementById('sort-date-down').addEventListener("click", () => {
        document.getElementsByClassName('search-form')[0].childNodes[1].value = '';
        search_result = [];
        if (sort_type.date == 'down') return;
        if (sort_type.date == 'up') {
            sort_type.date = 'down';
            document.getElementById('sort-date-up').classList.toggle('active');
            document.getElementById('sort-date-down').classList.toggle('active');
        }
        update_posts();
        localStorage.setItem('sort_type', JSON.stringify(sort_type));
    })

    for (let i=0; i<document.getElementsByClassName('tag').length; i++) {
        let tag = document.getElementsByClassName('tag')[i];
        if (tag.parentElement.classList.contains('aside')){
            tag.addEventListener("click", (event) => {
                document.getElementsByClassName('search-form')[0].childNodes[1].value = '';
                search_result = [];
                let tag_name = event.currentTarget.innerText;
                event.currentTarget.classList.toggle('active');
                
                if (sort_type.tags.includes(tag_name)) sort_type.tags.splice(sort_type.tags.indexOf(tag_name), 1 );
                else sort_type.tags.push(tag_name);

                update_posts();
                localStorage.setItem('sort_type', JSON.stringify(sort_type));
            });
        }
    }

    for (let i=0; i<document.getElementsByClassName('btn-delete').length; i++){
        document.getElementsByClassName('btn-delete')[i].addEventListener("click", (event)=>{
            
            let title_to_delete = event.currentTarget.previousSibling.innerText;
            let node_to_delete = event.currentTarget.previousSibling.parentElement.parentElement;
            let parent = node_to_delete.parentElement;

            for (let i=0; i<parent.childNodes.length; i++) {
                if (parent.childNodes[i] == node_to_delete) {
                    parent.removeChild(node_to_delete);
                    break;
                }
            }
        })
    }

    document.getElementsByClassName('search-form')[0].childNodes[1].addEventListener("input", (event)=>{
        
        let search_query = event.currentTarget.value;
        
        if (search_query.length == 0) {
            search_result = [];
            update_posts();
            return;
        }
        else search_result = search_posts(search_query);
        

        update_posts(search_result);
    });
    
}





async function load_posts (){

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const request = new Request('https://api.myjson.com/bins/152f9j', {
        method: 'GET',
        headers
    })
  
   let response = await fetch(request).catch((err) => { console.log(err); });
   let data = await response.json().catch((err) => { console.log(err); });
   
   for (let i=0; i < data.data.length; i++) {
       let date = new Date(data.data[i].createdAt);
       posts.push({title: data.data[i].title, description: data.data[i].description, image: data.data[i].image, tags: data.data[i].tags, createdAt: data.data[i].createdAt, date: date});
    }
    update_tag_set();
}

function ten_posts () {
    let post_container = document.getElementsByClassName('post-container')[0];

    while(post_container.childNodes.length > 11) {
        post_container.removeChild(post_container.childNodes[post_container.childNodes.length-1]);
    }
    
}

function clear_posts () {
    let post_container = document.getElementsByClassName('post-container')[0];
    while(post_container.childNodes.length > 1) {
        post_container.removeChild(post_container.childNodes[post_container.childNodes.length-1]);
    }
}

function search_posts (search_query) {
    let posts_result = [];
    for (let i=0; i<posts.length; i++) {
        if (posts[i].title.includes(search_query)) posts_result.push(posts[i]);
    }
    return posts_result;
}

function update_posts (display_posts=posts) {
    clear_posts();
    sort_posts(display_posts, sort_type);
    show_posts(display_posts);
}

function show_posts(display_posts=posts){
    let post_container = document.getElementsByClassName('post-container');

    //if (search_result.length > 0) display_posts = search_result;
    let right_limit = display;
    if (display > display_posts.length) right_limit = display_posts.length;


    for(let i=0; i<right_limit; i++) {
        post_container.item(0).appendChild(generate_post(display_posts[i]));
    }
    
}

function new_display(new_display, display_posts=posts) {
    let post_container = document.getElementsByClassName('post-container');
    if (new_display < display) display = 0;
    if (display > display_posts.length) {
        display = 0;    
        return;
    }
    
    for(let i=display; i<new_display; i++) {
        post_container.item(0).appendChild(generate_post(display_posts[i]));
    }
    display = new_display;
}

function generate_post(post){
    let post_node = document.createElement('div');
    post_node.classList.add("post");
    
    let post_header = document.createElement('div');
    post_header.classList.add("post-header");

    let post_title = document.createElement('h3');
    post_title.innerText = post.title;
    post_title.classList.add("post-title");

    let delete_button = document.createElement('button');
    delete_button.classList.add('btn', 'btn-delete');
    delete_button.addEventListener("click", (event)=>{
            
        let title_to_delete = event.currentTarget.previousSibling.innerText;
        let node_to_delete = event.currentTarget.previousSibling.parentElement.parentElement;
        let parent = node_to_delete.parentElement;

        for (let i=0; i<parent.childNodes.length; i++) {
            if (parent.childNodes[i] == node_to_delete) {
                parent.removeChild(node_to_delete);
                break;
            }
        }
    })

    let delete_icon = document.createElement('i');
    delete_icon.classList.add('fas', 'fa-times');
    delete_button.appendChild(delete_icon);

    post_header.appendChild(post_title);
    post_header.appendChild(delete_button);
    post_node.appendChild(post_header);

    let post_img = document.createElement('img');
    post_img.src = post.image;
    post_node.appendChild(post_img);

    let post_description = document.createElement('p');
    post_description.classList.add('post-description');
    post_description.innerText = post.description;
    post_node.appendChild(post_description);

    let post_footer = document.createElement('div');
    post_footer.classList.add('post-footer');

    let tag_container = document.createElement('div');
    tag_container.classList.add('tag-container');
    for (let i=0; i<post.tags.length; i++){
        tag_container.appendChild(generate_tag(post.tags[i]));
    }
    let post_date = document.createElement('p');
    post_date.classList.add('post-date');
    post_date.innerText = `${post.date.getDate()}.${post.date.getMonth()+1}.${post.date.getFullYear()}`;
    post_footer.appendChild(tag_container);
    post_footer.appendChild(post_date);

    post_node.appendChild(post_footer);


    return post_node;
}

function generate_tag (tag){
    let tag_node = document.createElement('p');
    tag_node.classList.add('tag');
    tag_node.innerText = tag;

    let icon_node = document.createElement('i');
    icon_node.classList.add('fas', 'fa-tag');
    
    tag_node.appendChild(icon_node);
    return tag_node;
}

function update_tag_set(){
    for (let i=0; i<posts.length; i++){
        for (let j=0; j<posts[i].tags.length; j++) {
            tag_set.add(posts[i].tags[j]);
        }
    }
}

function generate_aside_tags(){
    let tag_section = document.getElementById('aside-tag-container');

    tag_set.forEach(tag => {
        let tag_node = document.createElement('p');
        tag_node.classList.add('tag');
        tag_node.innerText = tag;
        if (sort_type.tags.includes(tag)) tag_node.classList.add('active');
        tag_section.appendChild(tag_node);
    })
}

function delete_post_by_title(title){
    let remove_index = 0;
    for (let i=0; i<posts.length; i++) {
        if (posts[i].title == title) {
            remove_index = i;
            break;
        }
    }
    posts.splice(remove_index, 1);
}