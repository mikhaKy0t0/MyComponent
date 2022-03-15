({
    
    mainAction : function(component, event, helper){
		helper.callServer(component);
        helper.stringToArray(component);
    },
    
    clickToSort: function(component, event, helper){
        var index = event.getSource().get("v.value");
        var sortField = component.get("v.listToQuery["+ index + "]");
        var Dir = component.get("v.direction");
        
        if (Dir == "ASC") {
            component.set("v.direction", "DESC")
        }
        else {component.set("v.direction", "ASC")};
        component.set("v.orderField", sortField);
        
        $A.enqueueAction(helper.callServer(component));
    },
    
    /* to Fire Event - not in use
    FireFire: function(component, event){
        var myAppEvent = $A.get("e.c:mikhaEvent"); 
        myAppEvent.fire(); 
    },*/
    
})