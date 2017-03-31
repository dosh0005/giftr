var giftr = {
    key: "giftr-dosh0005"
    , data: []
    , data_id: null
    , page_people: document.getElementById("contact-list")
    , page_gift: document.getElementById("gift-list")
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
        if (giftr.page_people) {
            giftr.form_field_name = document.getElementById("p-name");
            giftr.form_field_dob = document.getElementById("p-dob");
            giftr.drawPeople();
        }
        if (giftr.page_gift) {
            giftr.data_id = giftr.getQueryString("id");
            giftr.form_field_person = document.getElementById("g-person");
            giftr.form_field_idea = document.getElementById("g-idea");
            giftr.form_field_store = document.getElementById("g-store");
            giftr.form_field_url = document.getElementById("g-url");
            giftr.form_field_cost = document.getElementById("g-cost");
            giftr.form_field_person.innerHTML = giftr.data[giftr.data_id].name;
            giftr.drawIdea();
        }
        giftr.addEvents();
    }
    , drawPeople: function () {
        giftr.resetPersonalModel();
        giftr.page_people = document.getElementById("contact-list");
        giftr.page_people.innerHTML = '<center style="margin: 100px 0;">Add your first contact !!</center>';
        if (giftr.data.length) {
            giftr.page_people.innerHTML = ""
            for (var i = 0; i < giftr.data.length; i++) {
                var li2 = '<li class="table-view-cell"> ' + '<span id="p-' + giftr.data[i].id + '" class="icon icon-person pull-left" style="margin-right: 10px;color: lightcoral;" ></span>' + '<span class="name" id="' + giftr.data[i].id + '"  style="color: cornflowerblue;" >' + giftr.data[i].name + '</span>' + '<a class="navigate-right pull-right" href="gifts.html?id=' + i + '" data-ignore="push">' + ' <span class="dob">' + giftr.data[i].dob + '</span> </a>' + '</li>';
                giftr.page_people.innerHTML = giftr.page_people.innerHTML + li2;
            }
            for (var i = 0; i < giftr.data.length; i++) {
                document.getElementById(giftr.data[i].id).addEventListener('click', function (i) {
                    return function () {
                        document.getElementById("personModal").classList.add("active");
                        document.getElementById("personDelete").classList.remove("hide");
                        giftr.form_field_name.value = giftr.data[i].name;
                        giftr.form_field_dob.value = giftr.data[i].dob;
                        giftr.form_edit_flag = i + 1;
                    }
                }(i));
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
            giftr.form_err_msg += " Please Enter name. ";
            giftr.form_err_flag = 1;
        }
        if (giftr.form_field_dob.value === "") {
            giftr.form_err_msg += " Please Enter Date of Birth. ";
            giftr.form_err_flag = 1;
        }
    }
    , addPeople: function () {
        giftr.checkPeople();
        if (giftr.form_err_flag) {
            alert(giftr.form_err_msg);
        }
        else {
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
    }
    , closePersonalModel: function () {
        giftr.form_edit_flag = 0;
        giftr.resetPersonalModel();
        document.getElementById("personDelete").classList.add("hide");
        document.getElementById("personModal").classList.remove("active");
    }
    , drawIdea: function () {
        giftr.page_gift.innerHTML = '<center style="margin: 100px 0;">Add first gift idea</center>';
        if (giftr.data[giftr.data_id] && giftr.data[giftr.data_id].ideas.length) {
            giftr.page_gift.innerHTML = ""
            for (var i = 0; i < giftr.data[giftr.data_id].ideas.length; i++) {
                var li = '<li class="table-view-cell media">' + ' <span id="g-delete-' + giftr.data[giftr.data_id].ideas[i].idIdea + '" class="pull-right icon icon-trash midline" style="color:lightcoral;"></span><span id="g-' + giftr.data[giftr.data_id].ideas[i].idIdea + '"  class="icon icon-edit midline-top" style="color:cornflowerblue"></span>' + '<div class="media-body"> ' + giftr.data[giftr.data_id].ideas[i].idea + '<p>' + giftr.data[giftr.data_id].ideas[i].store + '&nbsp;</p>' + '<p><a href="' + giftr.data[giftr.data_id].ideas[i].url + '" target="_blank" data-ignore="push">' + giftr.data[giftr.data_id].ideas[i].url + '</a></p>' + '<p>' + giftr.data[giftr.data_id].ideas[i].cost + '</p>' + '</div>' + '</li>';
                giftr.page_gift.innerHTML += li;
            }
            for (var i = 0; i < giftr.data[giftr.data_id].ideas.length; i++) {
                document.getElementById("g-" + giftr.data[giftr.data_id].ideas[i].idIdea).addEventListener("click", function (i) {
                    return function () {
                        document.getElementById("giftModal").classList.add("active");
                        giftr.form_field_idea.value = giftr.data[giftr.data_id].ideas[i].idea;
                        giftr.form_field_store.value = giftr.data[giftr.data_id].ideas[i].store;
                        giftr.form_field_url.value = giftr.data[giftr.data_id].ideas[i].url;
                        giftr.form_field_cost.value = giftr.data[giftr.data_id].ideas[i].cost;
                        giftr.form_edit_flag = i + 1;
                    }
                }(i));
            }
            for (var i = 0; i < giftr.data[giftr.data_id].ideas.length; i++) {
                document.getElementById("g-delete-" + giftr.data[giftr.data_id].ideas[i].idIdea).addEventListener("click", function (i) {
                    return function () {
                        if (confirm("Are you sure want to delete '" + giftr.data[giftr.data_id].ideas[i].idea+"' ?")) {
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
            giftr.form_err_msg += "\n idea ";
            giftr.form_err_flag += 1;
        }
        if (giftr.form_field_store.value === "") {
            giftr.form_err_msg += "\n store ";
            giftr.form_err_flag += 1;
        }
        if (giftr.form_field_url.value === "") {
            giftr.form_err_msg += "\n url ";
            giftr.form_err_flag += 1;
        }
        if (giftr.form_field_cost.value === "") {
            giftr.form_err_msg += "\n cost ";
            giftr.form_err_flag += 1;
        }
    }
    , addIdea: function () {
        giftr.checkIdea();
        if (giftr.form_err_flag == 4) {
            alert("Please add any of this,"+giftr.form_err_msg);
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
        giftr.form_field_idea.value = "";
        giftr.form_field_store.value = "";
        giftr.form_field_url.value = "";
        giftr.form_field_cost.value = "";
    }
    , closeIdeaModel: function () {
        giftr.form_edit_flag = 0;
        giftr.resetIdeaModel();
        document.getElementById("giftModal").classList.remove("active");
    }
    , addEvents: function () {
        if (giftr.page_people) {
            document.getElementById("personAdd").addEventListener('click', giftr.addPeople);
            document.getElementById("personClose").addEventListener('click', giftr.closePersonalModel);
            document.getElementById("personDelete").addEventListener('click', giftr.deletePeople);
            document.getElementById("model-close-btn").addEventListener('click', giftr.closePersonalModel);
        }
        if (giftr.page_gift) {
            document.getElementById("ideaAdd").addEventListener('click', giftr.addIdea);
            document.getElementById("ideaClose").addEventListener('click', giftr.closeIdeaModel);
            document.getElementById("model-close-btn").addEventListener('click', giftr.closeIdeaModel);
        }
    }
    , storeLocal: function () {
        if (giftr.page_people) {
            giftr.data.sort(function (a, b) {
                var x = new Date(a.dob)
                    , y = new Date(b.dob);
                console.log(x, a.dob, y, b.dob);
                var z = x < y ? -1 : 1;
                console.log(z);
                return z;
            });
        }
        var d = JSON.stringify(giftr.data);
        localStorage.removeItem(giftr.key);
        localStorage.setItem(giftr.key, d);
    }
    , getQueryString: function (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    }
}

document.addEventListener("DOMContentLoaded", giftr.init);