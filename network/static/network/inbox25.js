import {paginationjs, mypage} from './pagination2.js';

var global_posts = 'allposts';
var pagecount = 100;
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.info_subscribe').style.display = 'none';
    document.querySelector('.info_unsubscribe').style.display = 'none';

    // Use buttons to toggle between views
    document.querySelector('#allposts').addEventListener('mousedown', () => {
      document.querySelector('.info_subscribe').style.display = 'none';
      document.querySelector('.info_unsubscribe').style.display = 'none';
      global_posts = 'allposts';
      let page_number_click = "1";
      let active_page_number = "0";
      let id_element_click = "pageleft";
      let id_element_active = "pageleft";
      paginationjs(page_number_click, active_page_number, id_element_click, id_element_active, pagecount);
      load_posts(global_posts);
      //console.log("work allposts end");
    });

    document.querySelector('#allposts').addEventListener('touchstart', () => {
      document.querySelector('.info_subscribe').style.display = 'none';
      document.querySelector('.info_unsubscribe').style.display = 'none';
      global_posts = 'allposts';
      let page_number_click = "1";
      let active_page_number = "0";
      let id_element_click = "pageleft";
      let id_element_active = "pageleft";
      paginationjs(page_number_click, active_page_number, id_element_click, id_element_active, pagecount);
      load_posts(global_posts);
      //console.log("work allposts end");
    });

    document.querySelector('#myposts').addEventListener('mousedown', () => {
      //console.log(`work myposts post start`);
      document.querySelector('.info_subscribe').style.display = 'none';
      document.querySelector('.info_unsubscribe').style.display = 'none';
      global_posts = 'myposts';
      let page_number_click = "1";
      let active_page_number = "0";
      let id_element_click = "pageleft";
      let id_element_active = "pageleft";
      paginationjs(page_number_click, active_page_number, id_element_click, id_element_active, pagecount);
      load_posts(global_posts);

    });

    document.querySelector('#myposts').addEventListener('touchstart', () => {
      //console.log(`work myposts post start`);
      document.querySelector('.info_subscribe').style.display = 'none';
      document.querySelector('.info_unsubscribe').style.display = 'none';
      global_posts = 'myposts';
      let page_number_click = "1";
      let active_page_number = "0";
      let id_element_click = "pageleft";
      let id_element_active = "pageleft";
      paginationjs(page_number_click, active_page_number, id_element_click, id_element_active, pagecount);
      load_posts(global_posts);

    });

    document.querySelector('#following').addEventListener('mousedown', () => {
      //console.log(`work following post start`);
      document.querySelector('.info_subscribe').style.display = 'none';
      document.querySelector('.info_unsubscribe').style.display = 'none';
      global_posts = 'following';
      let page_number_click = "1";
      let active_page_number = "0";
      let id_element_click = "pageleft";
      let id_element_active = "pageleft";
      paginationjs(page_number_click, active_page_number, id_element_click, id_element_active, pagecount);
      load_posts(global_posts);

    });

    // By default, load the allposts
    load_posts(global_posts);

    // refresh for every 60 seconds
    /*var now = new Date();
    var delay = 60 * 1000; // 1 min in msec
    var start = delay - (now.getSeconds()) * 1000 + now.getMilliseconds();

    setTimeout(function setTimer() {
      load_posts(global_posts);
        setTimeout(setTimer, delay);
    }, start);
      */

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    //console.log(csrftoken);
    //submit--
    document.querySelector('.circle').onclick = function() {
      create_new_post();
      return false;
    };

    // textarea <= 140 characters
     // document.querySelector('#compose-body').addEventListener('keyup', () => {
      //console.log("textarea pusk");

     // var maxlen = document.querySelector('#compose-body').getAttribute('maxlength');
     // var length = document.querySelector('#compose-body').value.length;
      //console.log(maxlen);
      //console.log(length);
      //if(length >= (maxlen) ){
        //alert('max length '+maxlen+' characters only!');
      //}
      //else
       // {
          //alert('max length '+length+' characters only!');
         // console.log(maxlen);
       // }
    //});
    //nav_page posts
    document.querySelectorAll('.page-item').forEach(function(element) {

      element.onclick = function() {
          //console.log(`this element click`);
          var page_number_click = this.innerText;
          let id_element_click = this.id;
         // console.log(page_number_click);
         // console.log(id_element_click);
          let activ_element = document.querySelector('.active');
          let active_page_number = activ_element.innerText;
          let id_element_active = activ_element.id;

          paginationjs(page_number_click, active_page_number, id_element_click, id_element_active, pagecount);
          //console.log(`mypage_after=${mypage}`);
         // console.log(typeof page_number_click, typeof active_page_number, typeof id_element_click, typeof id_element_active);
          load_posts(global_posts);

      }
  })
//---------------------------------Subscribe-----------------------------------------
  document.querySelector('.info_subscribe').addEventListener('click', () => {
    //console.log(`button subscribe click`);

    let my_user_id = document.querySelector('#user-id').value;
    let subscribe_id = global_posts;
    let status_subscribe ="subscribe";

   // console.log(`my_user_id=${my_user_id}, subscribe_id=${subscribe_id}`);
    document.querySelector('.info_subscribe').style.display = 'none';
    document.querySelector('.info_unsubscribe').style.display = 'block';

    SubscribeUnsubscribe(my_user_id, subscribe_id, status_subscribe);

  });
//---------------------------------Unsubscribe-----------------------------------------
  document.querySelector('.info_unsubscribe').addEventListener('click', () => {
    //console.log(`button unsubscribe click`);

    let my_user_id = document.querySelector('#user-id').value;
    let subscribe_id = global_posts;
    let status_subscribe = "unsubscribe";

    //console.log(`my_user_id=${my_user_id}, subscribe_id=${subscribe_id}`);
    document.querySelector('.info_subscribe').style.display = 'block';
    document.querySelector('.info_unsubscribe').style.display = 'none';

    SubscribeUnsubscribe(my_user_id, subscribe_id, status_subscribe);

  });
//-----------------------------------------------------------------------------------

  });
  //----------------------------------------------------------------------------
  function load_posts(posts) {


   // console.log(`work ${posts} start`);
    // Show the category posts and hide other views
    if (posts == 'myposts'){
      document.querySelector('#compose-post').style.display = 'block';
      document.querySelector('.posts').style.height = '68.8vh';
      document.querySelector('.posts').innerHTML = `<h3>My posts</h3> <hr>`;
    } else if (posts == 'allposts'){
      document.querySelector('#compose-post').style.display = 'none';
      document.querySelector('.posts').style.height = '78vh';
      document.querySelector('.posts').innerHTML = `<h3>All posts</h3> <hr>`;
    } else if (posts == 'following'){
      document.querySelector('#compose-post').style.display = 'none';
      document.querySelector('.posts').style.height = '78vh';
      document.querySelector('.posts').innerHTML = `<h3>Following</h3> <hr>`;
    } else {
      document.querySelector('#compose-post').style.display = 'none';
      document.querySelector('.posts').style.height = '78vh';
      document.querySelector('.posts').innerHTML = `<h3>posts</h3> <hr>`;
    }
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    //console.log(csrftoken);
    //let mypage = 1;
   // console.log(`mypage=${mypage}`);
    let current_page = mypage;
    let my_user_id = document.querySelector('#user-id').value;

    //console.log(`work fetch( /posts/${posts})`);
    fetch(`/posts/${posts}`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken
      },
     body:  JSON.stringify({
        current_page: current_page,
        my_user_id: my_user_id
      })
    })
    .then(response => response.json())
    .then(userposts => {
      // Вивести posts в консоль
     // console.log(`userposts=${userposts}`);
     // console.log(userposts);
      // ... зробити з posts щось інше ...
     // if (userposts.items) {console.log("items")} else if (userposts.error) {console.log("variant twoo error")} else {console.log("errir")}
     if (userposts.items) {
     // console.log("tyanem posts")
     // console.log(userposts.items.posts)
      pagecount = userposts.items.pageCount;
     // console.log(`pagecount=${pagecount}`);


      if (pagecount == 1) {
       // console.log(`pagecount if 1=${pagecount}`);
        document.querySelector('#previous').classList.add("disabled");
        document.querySelector('#pagemiddle').classList.add("disabled");
        document.querySelector('#pageright').classList.add("disabled");
        document.querySelector('#next').classList.add("disabled");
        document.querySelector('#pagemiddle').classList.remove("active");
        document.querySelector('#pageright').classList.remove("active");
        document.querySelector('#next').classList.remove("active");
        document.querySelector('#pageleft').classList.add("active");
      } else if (pagecount == 2) {
       // console.log(`pagecount if 2=${pagecount}`);
        //document.querySelector('#pagemiddle').classList.remove("disabled");
        document.querySelector('#pageright').classList.add("disabled");

      } else {
       // console.log(`pagecount if else=${pagecount}`);
        document.querySelector('#pagemiddle').classList.remove("disabled");
        document.querySelector('#pageright').classList.remove("disabled");
       // document.querySelector('#next').classList.remove("disabled");
      }

      let subscribe_unsubscribe = userposts.items.list_subscribe;
      if (posts == 'myposts') {
        //console.log(`showmefollowing ==================+++++++++++++++++++++++++++++`);
        document.querySelector('.info_list_following').style.display = 'block';
        document.querySelector('.info_list_followers').style.display = 'block';
        ShowMeFollowing(subscribe_unsubscribe);
      } else {
        document.querySelector('.info_list_following').style.display = 'none';
        document.querySelector('.info_list_followers').style.display = 'none';
      }

      userposts.items.posts.forEach(function(post) {
       // console.log(`post=${post}`);
       // console.log(post);
        let like_switcher = "false";
        let post_comments_list = [];


        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        userposts.items.statuslike.forEach(function(status){
         // console.log(`status=${status}`);
         // console.log(status);
        //  console.log(`post_id=${post.id}`);
         // console.log(`status_post=${status.status_post}`);
          if (post.id == status.status_post) {
          //  console.log(`match: ${post.id}=${status.status_post}`);
            like_switcher = status.status_like;
           // console.log(`match status = ${like_switcher}`);
          }
        })
       // console.log(`match status last = ${like_switcher}`);
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        userposts.items.comments.forEach(function(comment){
          //console.log(`comment=${comment}`);
         // console.log(`post_id=${post.id}`);
         // console.log(`comment_post=${comment.comment_post}`);
          if (post.id == comment.comment_post) {
            //console.log(`match: ${post.id}=${comment.comment_post}`);
            //post_comments_list = post_comments_list.push(comment);
            post_comments_list.push(comment);
           // console.log(`post_comment_list = ${post_comments_list}`);
          }
        })
        //console.log(`post_comment_list = ${post_comments_list}`);
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        CreateListPost(post, like_switcher, post_comments_list, subscribe_unsubscribe);
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let info_user_name = "Unknown";
        if (posts == 'allposts' || posts == 'myposts' || posts == 'following') {
          info_user_name = document.querySelector('#user-name').value;
        } else if (posts == userposts.items.posts[0].post_user_name[1]) {
         // info_user_name = "Jonni";
          //console.log("Jonni");
          info_user_name =  userposts.items.posts[0].post_user_name[0].charAt(0).toUpperCase() + userposts.items.posts[0].post_user_name[0].slice(1);
         // console.log(`infouser name= ${info_user_name}`);
        }
       // console.log(`info===============${userposts.info}`);
        let info_profile = userposts.info;
        ShowInfo(info_user_name, info_profile);

    })
  } else if (userposts.error) { //close if userposts.item
    console.log("variant twoo error user have no posts");
    document.querySelector('#previous').classList.add("disabled");
    document.querySelector('#pagemiddle').classList.add("disabled");
    document.querySelector('#pageright').classList.add("disabled");
    document.querySelector('#next').classList.add("disabled");
    document.querySelector('#pagemiddle').classList.remove("active");
    document.querySelector('#pageright').classList.remove("active");
    document.querySelector('#next').classList.remove("active");
    document.querySelector('#pageleft').classList.add("active");

    let info_user_name =  userposts.user_no_post.charAt(0).toUpperCase() + userposts.user_no_post.slice(1);
    let info_profile = userposts;

    document.querySelector('.info_list_following').style.display = 'none';
    document.querySelector('.info_list_followers').style.display = 'none';
    /*
    let user_id = document.querySelector('#user-id').value;
    let stranger_id = posts;

    console.log(user_id, typeof user_id);
    console.log(stranger_id, typeof stranger_id);

    if (user_id == stranger_id) {
      document.querySelector('.info_subscribe').style.display = 'none';
      document.querySelector('.info_unsubscribe').style.display = 'none';
    } else {
      document.querySelector('.info_subscribe').style.display = 'block';
      document.querySelector('.info_unsubscribe').style.display = 'none';
    }
*/
    ShowInfo(info_user_name, info_profile);

  } //close if userposts.error

  });

  }
  //----------------------------------------------------------------------------
  function create_new_post() {
   // console.log("start create_new_post");
    let user_id = document.querySelector('#user-id').value;
   // console.log(user_id);
    let post_new_text = document.querySelector('#compose-body').value;
   // console.log(post_new_text);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
   // console.log(csrftoken);

    fetch('/posts', {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          post_user_name: user_id,
          post_text: post_new_text
          //csrfmiddlewaretoken: csrftoken
      })
    })
    .then(response => response.json())
    .then(result => {
        // Вивести результат в консоль
        console.log(result);
        //alert(result.message);
        document.querySelector('#compose-body').value = '';
        if (result.message != undefined){
          //compose_post();
          //load_posts('myposts');
        } else {
          //compose_post();
          alert(result.error);
        }

    }).then(() => load_posts('myposts'));

  }
  //----------------------------------------------------------------------------

 //----------------------------------------------------------------------------
 function CreateListPost(category_post, like_switcher, post_comment_list, subscribe_unsubscribe) {
 // console.log("start createlistpost div");
  let user_id = document.querySelector('#user-id').value;
  let author_name = document.querySelector('#user-name').value;
  let stranger_id = category_post.post_user_name[1];
      stranger_id = stranger_id.toString();
      //stranger_id = stranger_id.charAt(0).toUpperCase();
 // console.log(user_id, typeof user_id);
 // console.log(stranger_id, typeof stranger_id);
/*
  if (user_id == stranger_id) {
    document.querySelector('.info_subscribe').style.display = 'none';
    document.querySelector('.info_unsubscribe').style.display = 'none';
  } else {
    document.querySelector('.info_subscribe').style.display = 'block';
    document.querySelector('.info_unsubscribe').style.display = 'none';
  }
*/
  let maindiv = document.createElement('div');
      maindiv.classList.add("childposts");
      maindiv.id = 'post_' + category_post.id;
      //

  let block_user_name = document.createElement('div');
      block_user_name.classList.add("block_user_name");
      //

  let link_user_name = document.createElement('a');
      link_user_name.classList.add("stranger-link");
      //link_user_name.href = `/index/${stranger_id}`;
      link_user_name.href = `##`;
      link_user_name.innerHTML = category_post.post_user_name[0].charAt(0).toUpperCase() + category_post.post_user_name[0].slice(1);

      link_user_name.addEventListener('mousedown', function() {
     // console.log(`this href click! ${category_post.id}`);
      var rightblock = document.getElementById(`rightblockcolumn_id`);
      //rightblock.classList.remove("rightblockcolumn");
      rightblock.style.display = 'none';
      //
      });
      link_user_name.addEventListener('mouseup', function() {
     // console.log(`this href click! ${category_post.id}`);
      var rightblock = document.getElementById(`rightblockcolumn_id`);
       // rightblock.classList.add("rightblockcolumn");
      rightblock.style.display = 'block';
      ShowMeStranger(stranger_id, subscribe_unsubscribe);
      });

  let block_post_text = document.createElement('div');
      block_post_text.classList.add("block_post_text");
      block_post_text.id = 'text_' + category_post.id;
      block_post_text.innerHTML = category_post.post_text;
      //console.log(block_post_text);
      //

  let block_post_time = document.createElement('div');
      block_post_time.classList.add("chainline");
      block_post_time.innerHTML = category_post.post_date;
     // console.log(block_post_time);
      //
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  let block_post_menu = document.createElement('div');
      block_post_menu.classList.add("block_post_menu");
      //

  let post_menu_like = document.createElement('div');
      post_menu_like.classList.add("post_menu_like");
      //

  let checkbox_like = document.createElement('input');
      checkbox_like.type = "checkbox";
      checkbox_like.classList.add("like__input");
      checkbox_like.id = category_post.id;
      console.log(`this status likeswitcher ${like_switcher}`);
      if (like_switcher == true) {
        checkbox_like.checked = like_switcher;
        //console.log(`this status a ${checkbox_like.checked}`);
      } else {
        //checkbox_like.unchecked = "False";
        checkbox_like.unchecked = like_switcher;
       // console.log(`this status b ${checkbox_like.checked}`);
      }
      //checkbox_like.checked = like_switcher;
     // console.log(`this status ${checkbox_like.checked}`);
      checkbox_like.addEventListener('click', function() {
     // console.log(`this checkbox like click! ${category_post.id}`);
      AddLikeDislike(user_id, category_post.id); // tyt user_id nado bratm avtorizovanogo usera
      });
      //

  let label_like = document.createElement('label');
      label_like.classList.add("like");
      //console.log("label start");
      //console.log(label_like);
      //

  let span_like = document.createElement('span');
      span_like.classList.add("like__heart");
      //

  let label_like_count = document.createElement('label');
      label_like_count.classList.add("label_like");
      label_like_count.id = 'like_' + category_post.id;
      //console.log("label_like start");
     // console.log(label_like_count);
      label_like_count.innerHTML = category_post.post_like;
  //

  let post_menu_comment = document.createElement('div');
      post_menu_comment.classList.add("post_menu_comment");
      post_menu_comment.title = "add comment";
      //

  let checkbox_comment = document.createElement('input');
      checkbox_comment.type = "checkbox";
      checkbox_comment.classList.add("comment__input");
      checkbox_comment.id = 'comment_' + category_post.id;
      checkbox_comment.addEventListener('click', function() {
     // console.log(`this checkbox click! ${category_post.id}`);
      AddComment(user_id, author_name, category_post.id, subscribe_unsubscribe); // tyt user id nado brat avtorizovanogo usera
      });
      //

  let label_comment = document.createElement('label');
      label_comment.classList.add("comment");
     // console.log("label start");
     // console.log(label_comment);
      //

  let span_comment = document.createElement('span');
      span_comment.classList.add("comment__icon");
      //

  let post_menu_edit = document.createElement('div');
      post_menu_edit.classList.add("post_menu_edit");
      post_menu_edit.title = "edit post";
      //

  let checkbox_edit = document.createElement('input');
      checkbox_edit.type = "checkbox";
      checkbox_edit.classList.add("edit__input");
      checkbox_edit.id = 'edit_' + category_post.id;
      checkbox_edit.addEventListener('click', function() {
     // console.log(`this checkbox edit click! ${category_post.id}`);
      EditPost(user_id, category_post.id); // tyt user id nado brat avtorizovanogo usera
      });
      //

  let label_edit = document.createElement('label');
      label_edit.classList.add("edit");
     // console.log("label start");
     // console.log(label_edit);
      //

  let span_edit = document.createElement('span');
      span_edit.classList.add("edit__icon");
      //

//=======================create see comment icon===========================================
let post_menu_see = document.createElement('div');
      post_menu_see.classList.add("post_menu_see");
      post_menu_see.title = "show/hide comments";
      //

  let checkbox_see = document.createElement('input');
      checkbox_see.type = "checkbox";
      checkbox_see.classList.add("see__input");
      checkbox_see.id = 'see_' + category_post.id;
      checkbox_see.addEventListener('click', function() {
     // console.log(`this checkbox see click! ${category_post.id}`);
      SeeComment(category_post.id);
      });
      //

  let label_see = document.createElement('label');
      label_see.classList.add("see");
     // console.log("label start");
     // console.log(label_see);
      //

  let span_see = document.createElement('span');
      span_see.classList.add("see__icon");
      //
//=================================end create see comment icon============================================

  let block_post_comments = document.createElement('div');
      block_post_comments.classList.add("block_post_comments");
      block_post_comments.id = 'block_comments_' + category_post.id;
      block_post_comments.style.display = 'none';
      if (post_comment_list.length != 0) {
        //block_post_comments.innerText = post_comment_list;
//====================================start view block comments========================================
        post_comment_list.forEach(function(comment_inlist){
         // console.log(`comment_inlist=${comment_inlist}`);

         // console.log(`comment_post=${comment_inlist.comment_post}`);

           //+++++++++++++++++++++++++++++++++++++++++++++++++++
          let comment = document.createElement('div');
          comment.classList.add("comment_child");

          let comment_username_date = document.createElement('div');
          comment_username_date.classList.add("comment_username_date");

          let comment_username = document.createElement('div');
          comment_username.classList.add("comment_username");

          let link_comment_username = document.createElement('a');
          link_comment_username.classList.add("stranger-link");
          link_comment_username.href = `##`;
          link_comment_username.innerHTML = comment_inlist.comment_user[0].charAt(0).toUpperCase() + comment_inlist.comment_user[0].slice(1);
          let comment_user_id = comment_inlist.comment_user[1];

          link_comment_username.addEventListener('mousedown', function() {
           // console.log(`this href click! ${category_post.id}`);
            var rightblock = document.getElementById(`rightblockcolumn_id`);
            //rightblock.classList.remove("rightblockcolumn");
            rightblock.style.display = 'none';
            //
            });
          link_comment_username.addEventListener('mouseup', function() {
           // console.log(`this href click! ${category_post.id}`);
            var rightblock = document.getElementById(`rightblockcolumn_id`);
            // rightblock.classList.add("rightblockcolumn");
            rightblock.style.display = 'block';
            ShowMeStranger(comment_user_id, subscribe_unsubscribe);
            });

          let comment_date = document.createElement('div');
          comment_date.classList.add("comment_date");
          comment_date.innerText = comment_inlist.comment_date;

          let comment_text = document.createElement('div');
          comment_text.classList.add("comment_text");
          comment_text.innerText = comment_inlist.comment_text;


          comment.append(comment_username_date);
            comment_username_date.append(comment_username);
              comment_username.append(link_comment_username);
            comment_username_date.append(comment_date);
          comment.append(comment_text);

          block_post_comments.insertBefore(comment, block_post_comments.firstChild)
          //+++++++++++++++++++++++++++++++++++++++++++++++++++

        })
//====================================end view block comments========================================

      } else {
        //block_post_comments.innerText = "no comments";
        console.log(`no comments in ${category_post.id}`)
      }
      //block_post_comments.innerText = post_comment_list;
      //

      const element_chain = document.createElement('div');
      element_chain.classList.add("childposts_chain");
      element_chain.innerHTML = `<span id="chainline"></span>⛓`;
      //

      document.querySelector('.posts').append(maindiv);
        maindiv.append(block_user_name);
          block_user_name.append(link_user_name);
        maindiv.append(block_post_text);
        maindiv.append(block_post_time);
        maindiv.append(block_post_menu);
        maindiv.append(block_post_comments);
          block_post_menu.append(post_menu_like);
            post_menu_like.append(label_like);
              label_like.append(checkbox_like);
              label_like.append(span_like);
            post_menu_like.append(label_like_count);
          block_post_menu.append(post_menu_comment);
            post_menu_comment.append(label_comment);
              label_comment.append(checkbox_comment);
              label_comment.append(span_comment);
              //
              if (user_id === stranger_id) {
          block_post_menu.append(post_menu_edit);
            post_menu_edit.append(label_edit);
              label_edit.append(checkbox_edit);
              label_edit.append(span_edit);
              } else {
              //
              }
              //

              block_post_menu.append(post_menu_see);
              post_menu_see.append(label_see);
                label_see.append(checkbox_see);
                label_see.append(span_see);
              if (post_comment_list.length != 0) {
                post_menu_see.style.display = 'block';
              } else {
                post_menu_see.style.display = 'none';
                console.log("no comments")
              }
                //
      document.querySelector('.posts').append(element_chain);
      //


}
//----------------------------------------------------------------------------
function AddLikeDislike(user_id, post_id) {
 // console.log("start add like dislike");
 // console.log(user_id, post_id);
  //var element = document.querySelector(`#${post_id}`);
  var element = document.getElementById(`${post_id}`);
  let like_counter = document.getElementById(`like_${post_id}`);
  let count = like_counter.innerText;
      count = parseInt(count, 10);
  let switcher = "";
 // console.log(element);
 // console.log(like_counter);
  if (element.checked) {
    switcher = "True";
  //  console.log(switcher);
    count++;
   // console.log(count);
    like_counter.innerText = count;

  } else {
    switcher = "False";
   // console.log(switcher)
    count--;
   // console.log(count);
    like_counter.innerText = count;
  }
  fetch(`/statuslike`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken
    },
   body:  JSON.stringify({
      post_id: post_id,
      user_id: user_id,
      switcher: switcher,
      like_counter: count
    })
  })
  .then(response => response.json())
  .then(result => {
      // Вивести результат в консоль
      console.log(result);
     // alert(result.message);

      if (result.message != undefined){
        //compose_post();
        //load_posts('myposts');
        console.log(result);
      } else {
        //compose_post();
        alert(result.error);
        console.log(result);
      }

  })

}
//----------------------------------------------------------------------------
function EditPost(user_id, post_id) {
 // console.log("start correct post edit");
 // console.log(user_id, post_id);
  let switcher = "";
  var element = document.getElementById(`edit_${post_id}`);
  var post_text = document.getElementById(`text_${post_id}`);
  var newtext = "";
  if (element.checked) {
    switcher = "True";
   // console.log(switcher);
  //  console.log("open edit");
    //correct_text = post_text.innerText;
    var edit = document.querySelector('.edit_textarea');
    var editclon = edit.cloneNode(true);
    var correct_text = editclon.querySelector('textarea');
   // console.log(element);
   // console.log(post_text);
   // console.log(correct_text);
    editclon.style.display = 'block';
    correct_text.value = post_text.innerText;
    post_text.innerText = "";
    post_text.append(editclon);
    correct_text.focus();

  } else {
    var edit = document.querySelector('.edit_textarea');
    newtext = edit.querySelector('textarea').value;
    switcher = "False";
   // console.log(switcher)
   // console.log("save edit");
   // console.log(newtext);
    //
    //осталось передать на сервер дание и сохранить изменения
    fetch(`/edit`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken
      },
     body:  JSON.stringify({
        post_id: post_id,
        post_text: newtext
      })
    })
    .then(response => response.json())
    .then(result => {
        // Вивести результат в консоль
        console.log(result);
       // alert(result.message);

        if (result.message != undefined){
          //load_posts('myposts');
          console.log(result);
        } else {
          alert(result.error);
          console.log(result);
        }
    })
    //в базе даних
    //
    post_text.innerText = newtext;
    edit.remove();
  }

}
//----------------------------------------------------------------------------
function AddComment(user_id, author_name, post_id, subscribe_unsubscribe) {
  //console.log("start create comment");
  //console.log(user_id, post_id);
  let switcher = "";
  var element = document.getElementById(`comment_${post_id}`);
  var create_text = document.getElementById(`block_comments_${post_id}`);
  var see_comment = document.getElementById(`see_${post_id}`);
    // console.log(`see_com=${see_comment}`);
  //+++++++++++++++++++++++++++++++++++++++++++++++++++
  let comment = document.createElement('div');
  comment.classList.add("comment_child");

  let comment_username_date = document.createElement('div');
  comment_username_date.classList.add("comment_username_date");

  let comment_username = document.createElement('div');
  comment_username.classList.add("comment_username");

  let link_comment_username = document.createElement('a');
  link_comment_username.classList.add("stranger-link");
  link_comment_username.href = `##`;
  link_comment_username.innerHTML = author_name;

  link_comment_username.addEventListener('mousedown', function() {
    //console.log(`this href click! ${post_id}`);
    var rightblock = document.getElementById(`rightblockcolumn_id`);
    //rightblock.classList.remove("rightblockcolumn");
    rightblock.style.display = 'none';
    //
    });
  link_comment_username.addEventListener('mouseup', function() {
    //console.log(`this href click! ${post_id}`);
    var rightblock = document.getElementById(`rightblockcolumn_id`);
    // rightblock.classList.add("rightblockcolumn");
    rightblock.style.display = 'block';
    ShowMeStranger(user_id, subscribe_unsubscribe);
    });

  let comment_date = document.createElement('div');
  comment_date.classList.add("comment_date");
  comment_date.innerText = "Dec 06 2021, 08:47 AM";

  let comment_text = document.createElement('div');
  comment_text.classList.add("comment_text");

  //document.querySelector(`#block_comments_${post.id}`).append(comment);
  comment.append(comment_username_date);
    comment_username_date.append(comment_username);
      comment_username.append(link_comment_username);
    comment_username_date.append(comment_date);
  comment.append(comment_text);

  //+++++++++++++++++++++++++++++++++++++++++++++++++++
  var newtext = "";
  if (element.checked) {
    switcher = "True";
    //console.log(switcher);
    //console.log("create comment");
    create_text.style.display = 'block';
    if (see_comment != null) {
      see_comment.parentElement.parentElement.style.display = 'block';
      see_comment.checked = switcher;

    }


    var edit = document.querySelector('.edit_textarea');
    var editclon = edit.cloneNode(true);
    var correct_text = editclon.querySelector('textarea');
    //console.log(element);

    //console.log(correct_text);
    editclon.style.display = 'block';
    correct_text.value = "";

    create_text.insertBefore(editclon, create_text.firstChild);
    correct_text.focus();

  } else {
    var edit = document.querySelector('.edit_textarea');
    newtext = edit.querySelector('textarea').value;
    switcher = "False";
    //console.log(switcher)
    //console.log("save comment");
    //console.log(newtext);
    //
    //create_text.innerText = newtext;
    var create_date = new Date();
    var options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    comment_date.innerText = create_date.toLocaleString("en-US", options);
    let timenow = comment_date.innerText;
    //console.log(timenow, typeof timenow);
    comment_text.innerText = newtext;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //осталось передать на сервер дание и сохранить изменения
    fetch(`/comment`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken
      },
     body:  JSON.stringify({
        post_id: post_id,
        user_id: user_id,
        comment_text: newtext,
        comment_date: timenow
      })
    })
    .then(response => response.json())
    .then(result => {
        // Вивести результат в консоль
        console.log(result);
        //alert(result.message);
        //
        if (result.message != undefined){
          //load_posts('myposts');
          console.log(result);
        } else {
          alert(result.error);
          console.log(result);
        }
    })
    //в базе даних
    //++++++++++++++++++++++++++++++++++++++++++++++++++
    create_text.insertBefore(comment, create_text.firstChild);
    edit.remove();
  }

}
//----------------------------------------------------------------------------
function SeeComment(post_id) {
  //console.log("start see comments");
  //console.log(post_id);
  //var element = document.querySelector(`#${post_id}`);
  var see_comment = document.getElementById(`see_${post_id}`);
  let comment_div = document.getElementById(`block_comments_${post_id}`);
  let switcher = "";
  //console.log(see_comment);

  if (see_comment.checked) {
    switcher = "True";
    //console.log(switcher)
    comment_div.style.animationDirection = 'normal';
    comment_div.style.animationPlayState = 'running';
    comment_div.style.display = 'block';
  } else {
    switcher = "False";
    //console.log(switcher)
      //console.log("animationend")
      comment_div.style.display = 'none';
    //})
  }

 }
//----------------------------------------------------------------------------
function ShowMeStranger(stranger_id, subscribe_unsubscribe) {
  //console.log("start show profail");
  //console.log(stranger_id);
  //var rightblock = document.getElementById(`rightblockcolumn_id`);
  //rightblock.classList.add("rightblockcolumn");
  global_posts = stranger_id;
  let user_id = document.querySelector('#user-id').value;
  load_posts(stranger_id);
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  var faind_id = 0;
  var my_user_id = 0;
  subscribe_unsubscribe.forEach(function(status){
  //console.log(`status=${status}`);
  //console.log(status);
  let if_my_user_id = status.user_id[1];
  let following_id = status.following_user_id[1];
  //console.log(`following_id=${following_id}`);
  if (stranger_id == following_id && user_id == if_my_user_id) {
    faind_id = following_id;
    my_user_id = if_my_user_id;
    //console.log(`match: ${stranger_id} and ${faind_id}`);
  } else {
    console.log(`no match: ${stranger_id}`);
  }

})
//console.log(`button switch in status`);
if (stranger_id == faind_id && user_id == my_user_id) {
  //console.log(`match: ${stranger_id}=${faind_id}`);
  document.querySelector('.info_subscribe').style.display = 'none';
  document.querySelector('.info_unsubscribe').style.display = 'block';
  //console.log(`button switch in status UNSUBSCRIBE `);
} else if (user_id == stranger_id) {
  document.querySelector('.info_subscribe').style.display = 'none';
  document.querySelector('.info_unsubscribe').style.display = 'none';
} else {
  document.querySelector('.info_subscribe').style.display = 'block';
  document.querySelector('.info_unsubscribe').style.display = 'none';
  //console.log(`button switch in status SUBSCRIBE `);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 }
//----------------------------------------------------------------------------
function ShowInfo(user, info) {
  //console.log("start show info");
  var info_name = document.getElementById(`info_name_id`);
  info_name.innerText = user;
  var info_count_posts = document.getElementById(`info_posts_id`);
  var info_count_likes = document.getElementById(`info_likes_id`);
  var info_count_following = document.getElementById(`info_following_id`);
  var info_count_followers = document.getElementById(`info_followers_id`);
  if (info.count_list_posts) {
    //console.log(`info_posts_info=${info.count_list_posts}`);
    info_count_posts.innerText = 'Posts: ' + info.count_list_posts;
    //console.log(`info_user_likes=${info.count_user_likes}`);
    info_count_likes.innerText = 'Likes: ' + info.count_user_likes;
    //console.log(`info_following=${info.count_following}`);
    info_count_following.innerText = 'Following: ' + info.count_following;
    //console.log(`info_followers=${info.count_followers}`);
    info_count_followers.innerText = 'Followers: ' + info.count_followers;

  } else {
    //console.log(`info_posts_error=${info.count_list_posts}`);
    info_count_posts.innerText = 'Posts: ' + info.count_list_posts;
    //console.log(`info_likes_error=${info.count_user_likes}`);
    info_count_likes.innerText = 'Likes: ' + info.count_user_likes;
    //console.log(`info_following_error=${info.count_following}`);
    info_count_following.innerText = 'Following: ' + info.count_following;
    //console.log(`info_followers_error=${info.count_followers}`);
    info_count_followers.innerText = 'Followers: ' + info.count_followers;
  }

}
//----------------------------------------------------------------------------
function SubscribeUnsubscribe(my_user_id, subscribe_id, status_subscribe) {
  //console.log("subscribeunsubscribe");

  fetch('/subscribeunsubscribe', {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({
        my_user_id: my_user_id,
        subscribe_id: subscribe_id,
        status_subscribe: status_subscribe
    })
  })
  .then(response => response.json())
  .then(result => {
      // Вивести результат в консоль
      //console.log(result);
      //alert(result.message);
      load_posts(subscribe_id);
      if (result.message != undefined){
        //compose_post();
        //load_posts('myposts');
        console.log(result);
      } else {
        //compose_post();
        alert(result.error);
        console.log(result);
      }

  })
  //
}
//-----------------------------------------------------------------------------------------
function ShowMeFollowing(subscribe_unsubscribe) {
  //console.log("start showmefollowing");
  var info_list_following = document.getElementById(`info_list_following_id`);
  var info_list_followers = document.getElementById(`info_list_followers_id`);
  info_list_following.innerText = 'Following list:';
  info_list_followers.innerText = 'Followers list:';
  let my_user_id = document.querySelector('#user-id').value;
  let revers_subscribe = subscribe_unsubscribe.reverse();

  revers_subscribe.forEach(function(follow){
    //console.log(`follow=${follow}`);
    //console.log(follow);
    //info_list_following.innerText = follow;
    if (my_user_id == follow.user_id[1]) {
    let block_follow_name = document.createElement('div');
    block_follow_name.classList.add("block_follow_name");
    //

    let link_follow_name = document.createElement('a');
    link_follow_name.classList.add("stranger-link");
    link_follow_name.href = `##`;
    link_follow_name.innerHTML = follow.following_user_id[0].charAt(0).toUpperCase() + follow.following_user_id[0].slice(1);

    link_follow_name.addEventListener('click', function() {
    //console.log(`this href click! ${follow.following_user_id[1]}`);
    var rightblock = document.getElementById(`rightblockcolumn_id`);
    rightblock.style.display = 'none';
    setTimeout(() => rightblock.style.display = 'block', 100);
    ShowMeStranger(follow.following_user_id[1], subscribe_unsubscribe);
    });
    //

    let block_follow_time = document.createElement('div');
    block_follow_time.classList.add("chainline");
    block_follow_time.innerHTML = follow.subscribed_date;

    document.querySelector('.info_list_following').append(block_follow_name);
      block_follow_name.append(link_follow_name);
    document.querySelector('.info_list_following').append(block_follow_time);

    }//end if following

    if (my_user_id == follow.following_user_id[1]) {
      //
      let block_follow_name = document.createElement('div');
      block_follow_name.classList.add("block_follow_name");
      //

      let link_follow_name = document.createElement('a');
      link_follow_name.classList.add("stranger-link");
      link_follow_name.href = `##`;
      link_follow_name.innerHTML = follow.user_id[0].charAt(0).toUpperCase() + follow.user_id[0].slice(1);

      link_follow_name.addEventListener('click', function() {
      var rightblock = document.getElementById(`rightblockcolumn_id`);
      rightblock.style.display = 'none';
      setTimeout(() => rightblock.style.display = 'block', 100);
      ShowMeStranger(follow.user_id[1], subscribe_unsubscribe);
      });
      //

      let block_follow_time = document.createElement('div');
      block_follow_time.classList.add("chainline");
      block_follow_time.innerHTML = follow.subscribed_date;

      document.querySelector('.info_list_followers').append(block_follow_name);
        block_follow_name.append(link_follow_name);
      document.querySelector('.info_list_followers').append(block_follow_time);

      }//end if followers


  })

}