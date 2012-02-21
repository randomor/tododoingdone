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
    
        , render: function(){
            $(this.el).html(this.template(this.model)).addClass(this.model.color)
            ; return this;
        }
    
        , open: function(){
            var self = this
            ; $(this.el).html("<textarea>"+this.model.title+"</textarea>").find("textarea").keypress(function(e) {
                if(e.keyCode == 13) {
                    self.model.title=$(e.currentTarget).val()
                    ; self.render();
                    ; return false;
                }
            })

        }
    })
    
    ; window.TdddApp = Backbone.View.extend({
        el: $("#tdddApp")

        , initialize: function(){
            _.each(this.model, function(todo){
                var stickyView = new StickyView({model: todo})
                ; $("#todo-list").append(stickyView.render().el); 
            })
            ; return this;
        }
    })
    
    ; var todoList = [{"title":"Finish paper for CI8133", "color": "blue"}, {"title": "Start working on Indelearn", "color": "yellow"}, {"title": "Start planning for springbreak", "color": "green"}, {"title": "Creating a tddd app", "color": "pink"}, {"title": "Get an Intern", "color": "grey"}]
    ; var todoList2 = [{"title":"1", "color": "#ccf"}, {"title": "2", "color": "#ccf"}, {"title": "3", "color": "#cfc"}, {"title": "4", "color": "#cfc"}, {"title": "5", "color": "#ccf"}]    
    ;   new TdddApp({model: todoList}); 


    
})
