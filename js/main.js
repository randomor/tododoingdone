jQuery(function(){

        
    ; window.StickyView = Backbone.View.extend({
        tagName: "li"
        
        , className: "sticky"
        
        , events: {
            "click h3": "open"
            ,"click .color-picker li": "pickColor"
            , "sortupdate": "updateSort"
        }
        
        , template: _.template($('#sticky-template').html())
        
        ,initialize: function() {
            this.model.bind('change', this.render, this);
            // this.model.bind('destroy', this.remove, this);
        }
        
        , render: function(){
            $(this.el).html(this.template(this.model.toJSON())).removeClass('yellow blue green pink purple grey').addClass(this.model.toJSON().color).attr("id", this.model.id)
            ; return this;
        }
        
        , updateSort: function(event){
            ; var listName = $(event.currentTarget).parent().attr("id")
            ; var status = this.model.get("status")
            ; switch (listName){
                case "todo-list": this.model.set("status", "todo").save(); break;
                case "doing-list": this.model.set("status", "doing").save(); break;
                case "done-list": this.model.set("status", "done").save(); break;
            }
            //update order
            ; var updateOrder = function(ln){
                var result = $("#"+ln).sortable('toArray')
                ; _.each(result, function(id, i){
                    var td=Tddds.get(id)
                    ;if(td){
                        td.set("order", i).save()
                    }
                }) 
            }
            ; updateOrder(listName)
            ; updateOrder(status+"-list")
        }
        
        , pickColor: function(e){
            ; var className = $(e.currentTarget).attr("class")
            ; this.model.set("color", className).save()
        }
        
        , open: function(){
            var self = this
            ; $(this.el).html("<textarea>"+this.model.get("title")+"</textarea>").find("textarea").focus(function(){
                //focus on the last character
                var val = this.value;
                var $this = $(this);
                $this.val("");
                setTimeout(function () {
                    $this.val(val);
                    }, 1);
            }).focus().keypress(function(e) {
                var val=$(e.currentTarget).val()
                ; if(e.keyCode == 13) {
                    if(val!=self.model.get("title")){
                        self.model.set("title", val)
                        ; self.model.save()
                    }else{
                        self.render();
                    }
                    return false;
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
            if(!this.todo().length) return 1
            ; return this.todo().length+1;
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

            Tddds.fetch()
            ; $("#tdddApp ul").sortable({
                connectWith: "#tdddApp>ul"
                , placeholder: "ui-state-highlight"
                , opacity: 0.8
                , update: function(event, ui) {
                    ; ui.item.trigger("sortupdate")
                }
            })
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
