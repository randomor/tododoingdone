jQuery(function(){
    $("#tdddApp ul").sortable({
        connectWith: "#tdddApp>ul"
        , placeholder: "ui-state-highlight"
        , handle: ".handle"
        , opacity: 0.8
    })
        
    ; window.StickyView = Backbone.View.extend({
        tagName: "li"
        , className: "sticky"
        , events: {
            "click h3": "open"
        }
        , template: _.template($('#sticky-template').html())
        ,initialize: function() {
            this.model.bind('change', this.render, this);
            // this.model.bind('destroy', this.remove, this);
        }
        , render: function(){
            $(this.el).html(this.template(this.model.toJSON())).addClass(this.model.toJSON().color)
            ; return this;
        }
        , open: function(){
            var self = this
            ; $(this.el).html("<textarea>"+this.model.title+"</textarea>").find("textarea").focus(function(){
                //focus on the last character
                var val = this.value;
                var $this = $(this);
                $this.val("");
                setTimeout(function () {
                    $this.val(val);
                    }, 1);
            }).focus().keypress(function(e) {
                if(e.keyCode == 13) {
                    self.model.title=$(e.currentTarget).val()
                    ; self.render();
                    ; return false;
                }
            })

        }
    })

    ; window.Td = Backbone.Model.extend({
        defaults: function(){
            return {
                status: "todo"
                , color: "yellow"
                , order: Tddds.nextOrder()
            }
        }
    })
    ; window.TdddList = Backbone.Collection.extend({
        model: Td
        , localStorage: new Store("Tds")
        , todo: function(){
            return this.filter(function(td){return td.get('status')=="todo"})
        }
        , doing: function(){
            return this.filter(function(td){return td.get('status')=="doing"})
        }
        , done: function(){
            return this.filter(function(td){return td.get('status')=="done"})
        }
        , nextOrder: function(){
            //needs to be refactored for three lists
            if(!this.lenght) return 1
            ; return this.last().get('order')+1;
        }
        , comparator: function(td) {
            return td.get('order');
        }
        
    })

    ; window.Tddds = new TdddList;
    
    ; window.TdddApp = Backbone.View.extend({
        el: $("#tdddApp")
        , initialize: function(){
            Tddds.bind('add',   this.addOne, this);
            Tddds.bind('reset', this.addAll, this);
            Tddds.bind('all',  this.render, this);

            Tddds.fetch();
            ; return this;
        }
        ,addOne: function(todo) {
            var view = new StickyView({model: todo})
            ; var status=todo.toJSON().status
            ; switch(status){
                case "todo": $("#todo-list").append(view.render().el); break;
                case "doing": $("#doing-list").append(view.render().el); break;
                case "done": $("#done-list").append(view.render().el); break;
            }
        }
        , addAll: function() {
            Tddds.each(this.addOne)
        }
        , render: function(){
            return this;
        }
    })
    
    ; window.todoList = [{"title":"Finish paper for CI8133","status":"todo", "color": "blue"}, {"title": "Start working on Indelearn", "status":"done","color": "yellow"}, {"title": "Start planning for springbreak","status":"todo", "color": "green"}, {"title": "Creating a tddd app", "color": "pink"}, {"title": "Get an Intern", "color": "grey"},{"title":"Finish paper for CI8133", "color": "blue"}, {"title": "Start working on Indelearn", "status":"todo", "color": "yellow"}, {"title": "Start planning for springbreak", "status":"done","color": "green"}, {"title": "Creating a tddd app","status":"doing", "color": "pink"}, {"title": "Get an Intern", "color": "grey"}]
    ; window.App = new TdddApp; 

    //seed the data:
    // localStorage.setItem("Tds", "")
    // ;_.each(todoList, function(td){Tddds.create(td)});

    
})
