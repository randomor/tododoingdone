jQuery(function(){
        $("li").draggable();
        
        window.TodoView = Backbone.View.extend({
        tagName: "li"
        
        , className: "todo"
        
        , events: {
            "click": "open"
        }
    
        , template: _.template($('#todo-template').html())
    
        , render: function(){
            $(this.el).html(this.template(this.model)).draggable()
            ; return this;
        }
    
        , open: function(){
            console.log("just clicked me")
        }
    })
    
    ; window.TdddApp = Backbone.View.extend({
        el: $("#tdddApp")

        , initialize: function(){
            _.each(this.model, function(todo){
                var todoView = new TodoView({model: todo})
                ; $("#todo-list").append(todoView.render().el); 
            })
            ; return this;
        }
    })
    
    ; var todoList = [{"title":"Finish paper for CI8133"}, {"title": "Start working on Indelearn"}, {"title": "Start planning for springbreak"}, {"title": "Creating a tddd app"}, {"title": "Get an Intern"}]
    ;   new TdddApp({model: todoList}); 
    


})
