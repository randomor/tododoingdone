jQuery(function(){
    $("#tdddApp ul").sortable({
        connectWith: "#tdddApp ul"
        , placeholder: "ui-state-highlight"
    })
    // ; $("li").draggable({
    //     containment: "#tadddApp"
    //     , helper: "clone"
    //     , stack: "#todo-list"
    //     , connectToSortable: "#todo-list"
    // })
        // ; $( "#tdddApp ul" ).droppable({
        //     over: function( event, ui ) {
        //         $( this ).addClass( "ui-state-highlight" );
        //         console.log("over")
        //     }
        //     , out: function(event, ui) {
        //         $(this).removeClass("ui-state-highlight")
        //     }
        //     , drop: function(event, ui){
        //         if(ui.draggable.parent().attr("id")!=$(this).attr("id")){
        //             $(this).append(ui.draggable.css({"left": "0px", "top": "0px"}))
        //         }else{
        //             console.log("else here")
        //         };
        //         $(this).removeClass("ui-state-highlight")
        //     }
        // });
        
        window.TodoView = Backbone.View.extend({
        tagName: "li"
        
        , className: "todo"
        
        , events: {
            "click": "open"
        }
    
        , template: _.template($('#todo-template').html())
    
        , render: function(){
            $(this.el).html(this.template(this.model)).css("background-color", this.model.color)
            ; return this;
        }
    
        , open: function(){
            $(this.el).css("background-color",function(){
                var color = $(this).attr("data-color")
                ; var nextColor
                ; switch(color)
                {
                    case "#ccf":
                        nextColor = "#cfc"
                        ; break
                    case "#cfc":
                        nextColor = "yellow"
                        ; break
                    case "yellow":
                        nextColor = "#ccf"
                        ; break                    
                    default:
                        nextColor = "#ccf"
                        ; break
                }
                ; $(this).attr("data-color", nextColor)
                ; return nextColor
            } );
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
    
    ; var todoList = [{"title":"Finish paper for CI8133", "color": "#ccf"}, {"title": "Start working on Indelearn", "color": "#ccf"}, {"title": "Start planning for springbreak", "color": "#cfc"}, {"title": "Creating a tddd app", "color": "#cfc"}, {"title": "Get an Intern", "color": "#ccf"}]
    ; var todoList2 = [{"title":"1", "color": "#ccf"}, {"title": "2", "color": "#ccf"}, {"title": "3", "color": "#cfc"}, {"title": "4", "color": "#cfc"}, {"title": "5", "color": "#ccf"}]    
    ;   new TdddApp({model: todoList2}); 
    
})
