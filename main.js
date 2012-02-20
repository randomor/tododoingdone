jQuery(function(){

        window.ThreadListView = Backbone.View.extend({
        tagName: "li"
        
        , className: ""
        
        , events: {
            "click": "open"
        }

        , template: _.template($('template').html())

        , render: function(){
            $(this.el).html(this.template(this.model))
            ; return this;
        }

        , open: function(){

        }
    })
    

    ; $.getJSON('main.json', function(r){
            new MailApp({model: r});
        }); 


})
