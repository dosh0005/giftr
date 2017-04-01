var giftr = {
    key: "giftr-dosh0005"
    , data: []
    , data_id: null
    , idea_id: null
    , page_people: null
    , page_gift: null
        //    , add_people: document.querySelector(".header a")
        
    , form_field_name: null
    , form_field_dob: null
    , form_field_person: null
    , form_field_idea: null
    , form_field_store: null
    , form_field_url: null
    , form_field_cost: null
    , form_edit_flag: 0
    , form_err_flag: 0
    , form_err_msg: ""
    , init: function () {
        if (!(localStorage.getItem(giftr.key) === null)) {
            giftr.data = localStorage.getItem(giftr.key);
            giftr.data = JSON.parse(giftr.data);
        }
        window.addEventListener('push', giftr.changedPage);
        giftr.setUpPeoplePage();
    }
    , changedPage: function () {
        var contentDiv = document.querySelector('.content');
        switch (contentDiv.id) {
        case 'people':
            giftr.setUpPeoplePage()
            break;
        case 'gifts':
            giftr.page_people = null;
            giftr.page_gift = document.getElementById("gift-list");
            giftr.form_field_person = document.getElementById("g-person");
            giftr.form_field_idea = document.getElementById("g-idea");
            giftr.form_field_store = document.getElementById("g-store");
            giftr.form_field_url = document.getElementById("g-url");
            giftr.form_field_cost = document.getElementById("g-cost");
            giftr.form_field_person.innerHTML = giftr.data[giftr.data_id].name;
            document.getElementById("ideaAdd").addEventListener('click', giftr.addIdea);
            document.getElementById("ideaClose").addEventListener('click', giftr.closeIdeaModel);
            giftr.drawIdea();
            break;
        }
    }
    , setUpPeoplePage: function () {
        giftr.page_people = document.getElementById("contact-list");
        giftr.page_gift = null;
        giftr.form_field_name = document.getElementById("p-name");
        giftr.form_field_dob = document.getElementById("p-dob");
        var closeAnchor = document.querySelector('#personModal header a');
        closeAnchor.addEventListener('touchend', giftr.resetPersonalModel);
        giftr.drawPeople();
        document.getElementById("personAdd").addEventListener('click', giftr.addPeople);
        document.getElementById("personClose").addEventListener('click', giftr.closePersonalModel);
        document.getElementById("personDelete").addEventListener('click', giftr.deletePeople);
    }
    , drawPeople: function () {
        giftr.resetPersonalModel();
        giftr.page_people = document.getElementById("contact-list");
        giftr.page_people.innerHTML = '<center class="note">Add your first contact !!</center>';
        if (giftr.data.length) {
            giftr.page_people.innerHTML = ""
            for (var i = 0; i < giftr.data.length; i++) {
                var li = document.createElement("li");
                li.className = "table-view-cell";
                var usericon = document.createElement("span");
                usericon.className = "usericon icon icon-person pull-left";
                usericon.setAttribute("id", "p-" + giftr.data[i].id);
                var username = document.createElement("span");
                username.className = "name";
                var username_link = document.createElement("a");
                username_link.setAttribute("href", "#personModal");
                username_link.innerHTML = giftr.data[i].name;
                var gift = document.createElement("a");
                gift.className = "navigate-right pull-right";
                gift.setAttribute("href", "gifts.html");
                var gift_dob = document.createElement("span");
                gift_dob.className = "dob";
                gift_dob.innerHTML = moment(giftr.data[i].dob).format(" MMM Do ");
                gift.appendChild(gift_dob);
                username.appendChild(username_link);
                li.appendChild(usericon);
                li.appendChild(username);
                li.appendChild(gift);
                giftr.page_people.appendChild(li);
                username.addEventListener('touchend', function (i) {
                    return function () {
                        giftr.data_id = i;
                        document.getElementById("personDelete").classList.remove("hide");
                        giftr.form_field_name.value = giftr.data[i].name;
                        giftr.form_field_dob.value = giftr.data[i].dob;
                        giftr.form_edit_flag = i + 1;
                    }
                }(i));
                gift.addEventListener('touchend', function (i) {
                    return function () {
                        giftr.data_id = i;
                    }
                }(i))
            }
        }
    }
    , deletePeople: function () {
        if (confirm("Are you sure want to delete this person ?")) {
            console.log(giftr.form_edit_flag, giftr.data);
            giftr.data.splice(giftr.form_edit_flag - 1, 1);
            console.log(giftr.form_edit_flag, giftr.data);
            giftr.storeLocal();
            giftr.form_edit_flag = 0;
            giftr.drawPeople();
            giftr.closePersonalModel();
        }
    }
    , checkPeople: function () {
        giftr.form_err_flag = 0;
        giftr.form_err_msg = "";
        if (giftr.form_field_name.value === "") {
            giftr.form_err_msg += "<br>=> Name";
            giftr.form_err_flag += 1;
        }
        if (giftr.form_field_dob.value === "") {
            giftr.form_err_msg += "<br>=> Date of Birth ";
            giftr.form_err_flag += 2;
        }
    }
    , addPeople: function () {
        giftr.checkPeople();
        if (giftr.form_err_flag) {
            switch (giftr.form_err_flag) {
            case 1:
                giftr.form_field_name.parentElement.classList.add("err");
                giftr.form_field_dob.parentElement.classList.remove("err");
                break;
            case 2:
                giftr.form_field_name.parentElement.classList.remove("err");
                giftr.form_field_dob.parentElement.classList.add("err");
                break;
            case 3:
                giftr.form_field_name.parentElement.classList.add("err");
                giftr.form_field_dob.parentElement.classList.add("err");
                break;
            }
        }
        else {
            giftr.form_field_name.parentElement.classList.remove("err");
            giftr.form_field_dob.parentElement.classList.remove("err");
            if (giftr.form_edit_flag > 0) {
                giftr.data[giftr.form_edit_flag - 1].name = giftr.form_field_name.value
                giftr.data[giftr.form_edit_flag - 1].dob = giftr.form_field_dob.value
                giftr.form_edit_flag = 0;
            }
            else {
                var person = {
                    id: Math.random().toString(36).substring(7)
                    , name: giftr.form_field_name.value
                    , dob: giftr.form_field_dob.value
                    , ideas: []
                }
                giftr.data.push(person);
            }
            giftr.storeLocal();
            giftr.closePersonalModel();
            giftr.drawPeople();
        }
    }
    , resetPersonalModel: function () {
        giftr.form_field_name.value = "";
        giftr.form_field_dob.value = "";
        giftr.form_field_name.parentElement.classList.remove("err");
        giftr.form_field_dob.parentElement.classList.remove("err");
    }
    , closePersonalModel: function () {
        giftr.form_edit_flag = 0;
        giftr.resetPersonalModel();
        document.getElementById("personDelete").classList.add("hide");
        var closelink = document.querySelector('#personModal header a');
        var myClick = new CustomEvent('touchend', {
            bubbles: true
            , cancelable: true
        });
        closelink.dispatchEvent(myClick);
    }
    , drawIdea: function () {
        giftr.page_gift.innerHTML = '<center class="note">Add first gift idea</center>';
        console.log(giftr.data[giftr.data_id], giftr.data[giftr.data_id].ideas.length)
        if (giftr.data[giftr.data_id] && giftr.data[giftr.data_id].ideas.length) {
            giftr.page_gift.innerHTML = "";
            for (var i = 0; i < giftr.data[giftr.data_id].ideas.length; i++) {
                var li = document.createElement("li");
                li.className = "table-view-cell media";
                var span_delete = document.createElement("span");
                span_delete.className = "pull-right icon icon-trash midline";
                var divMedia = document.createElement("div");
                divMedia.className = "media-body";
                var p_idea = document.createElement("a");
                p_idea.setAttribute("href", "#giftModal");
                p_idea.innerHTML = giftr.data[giftr.data_id].ideas[i].idea;
                var p_store = document.createElement("p");
                p_store.innerHTML = giftr.data[giftr.data_id].ideas[i].store + "&nbsp;";
                var p_url = document.createElement("p");
                var p_url_a = document.createElement("a");
                p_url_a.setAttribute("href", giftr.data[giftr.data_id].ideas[i].url);
                p_url_a.setAttribute("target", "_blank");
                p_url_a.innerHTML = giftr.data[giftr.data_id].ideas[i].url;
                var p_cost = document.createElement("p");
                p_cost.innerHTML = giftr.data[giftr.data_id].ideas[i].cost;
                p_url.appendChild(p_url_a);
                divMedia.appendChild(p_idea);
                divMedia.appendChild(p_store);
                divMedia.appendChild(p_url);
                divMedia.appendChild(p_cost);
                li.appendChild(span_delete);
                li.appendChild(divMedia);
                giftr.page_gift.appendChild(li);
                p_idea.addEventListener("touchend", function (i) {
                    return function () {
                        //                        document.getElementById("giftModal").classList.add("active");
                        giftr.form_field_idea.value = giftr.data[giftr.data_id].ideas[i].idea;
                        giftr.form_field_store.value = giftr.data[giftr.data_id].ideas[i].store;
                        giftr.form_field_url.value = giftr.data[giftr.data_id].ideas[i].url;
                        giftr.form_field_cost.value = giftr.data[giftr.data_id].ideas[i].cost;
                        giftr.form_edit_flag = i + 1;
                    }
                }(i));
                span_delete.addEventListener("touchend", function (i) {
                    return function () {
                        if (confirm("Are you sure want to delete '" + giftr.data[giftr.data_id].ideas[i].idea + "' ?")) {
                            giftr.data[giftr.data_id].ideas.splice(i, 1);
                            giftr.storeLocal();
                            giftr.drawIdea();
                        }
                    }
                }(i));
            }
        }
    }
    , checkIdea: function () {
        giftr.form_err_flag = 0;
        giftr.form_err_msg = "";
        if (giftr.form_field_idea.value === "") {
            giftr.form_err_msg += "idea";
            giftr.form_err_flag = 1;
        }
    }
    , addIdea: function () {
        giftr.checkIdea();
        if (giftr.form_err_flag > 0) {
            giftr.form_field_idea.parentElement.classList.add("err");
        }
        else {
            if (giftr.form_edit_flag > 0) {
                giftr.data[giftr.data_id].ideas[giftr.form_edit_flag - 1].idea = giftr.form_field_idea.value
                giftr.data[giftr.data_id].ideas[giftr.form_edit_flag - 1].store = giftr.form_field_store.value
                giftr.data[giftr.data_id].ideas[giftr.form_edit_flag - 1].url = giftr.form_field_url.value
                giftr.data[giftr.data_id].ideas[giftr.form_edit_flag - 1].cost = giftr.form_field_cost.value
                giftr.form_edit_flag = 0;
            }
            else {
                var idea = {
                    idIdea: Math.random().toString(36).substring(7)
                    , idea: giftr.form_field_idea.value
                    , store: giftr.form_field_store.value
                    , url: giftr.form_field_url.value
                    , cost: giftr.form_field_cost.value
                }
                giftr.data[giftr.data_id].ideas.push(idea);
            }
            giftr.storeLocal();
            giftr.drawIdea();
            giftr.closeIdeaModel();
        }
    }
    , resetIdeaModel: function () {
        giftr.form_field_idea.parentElement.classList.remove("err");
        giftr.form_field_idea.value = "";
        giftr.form_field_store.value = "";
        giftr.form_field_url.value = "";
        giftr.form_field_cost.value = "";
    }
    , closeIdeaModel: function () {
        giftr.form_edit_flag = 0;
        giftr.resetIdeaModel();
        var closelink = document.querySelector('#giftModal header a');
        var myClick = new CustomEvent('touchend', {
            bubbles: true
            , cancelable: true
        });
        closelink.dispatchEvent(myClick);
    }
    , addEvents: function () {
        if (giftr.page_people) {}
        if (giftr.page_gift) {}
    }
    , storeLocal: function () {
        if (giftr.page_people) {
            giftr.data.sort(function (a, b) {
                var p = moment(a.dob).format('MMDD')
                    , q = moment(b.dob).format('MMDD');
                var z = p < q ? -1 : 1;
                return z;
            });
        }
        var d = JSON.stringify(giftr.data);
        localStorage.removeItem(giftr.key);
        localStorage.setItem(giftr.key, d);
    }
}
document.addEventListener("deviceready", giftr.init);