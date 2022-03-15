({	
    // VALUES here
    final: function(component,event,helper){
        // Take record by Parent Iteration
        var obj = component.get("v.iter");
        // Take field by record
        var field = component.get("v.fldsDisp");
        var form = component.get("v.format");
        var new_values=[];
        for (var i = 0; i < field.length; i++){
            /* Forming values here
            map works incorrectly
            var map = new Map();
            map.set('value',obj[field[i]]);
            map.set('format',form[i]);*/
            
            //var val = obj[field[i]];
            var customObj = {
                value: obj[field[i]],
                format: form[i]
            };
            new_values.push(customObj);
        }
        component.set("v.values", new_values);
    },
    
    /* FLOW call
    flowAction: function (component, event, helper){

        var flow = component.find("myCustomFlow");
        flow.startFlow("AURAFLOWTEST");*/
        /*
        if (component.get("v.flowBoolean") == false){
            component.set("v.flowBoolean", true);
        }*/
        
    handleShowModal: function(component, evt, helper) {
        var modalBody;
        $A.createComponent("c:lightningModalFlow", {},
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   component.find('overlayLib').showCustomModal({
                                       header: "Example for Lightning Modal Component",
                                       body: modalBody, 
                                       showCloseButton: true
                                   })   
                               }
                           });    
        
    },
    
})