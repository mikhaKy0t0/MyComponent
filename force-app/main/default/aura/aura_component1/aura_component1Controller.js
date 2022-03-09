({
    // опять же lowerCamelCase для именования аттрибутов и функций 
    Action_comp : function(component, event, helper){
		helper.callServer(component);
    },
    
    ClickSort: function(component, event, helper){
        var value1 = event.getSource().get("v.value") - 1 ;
        var sortField = component.get("v.FieldsList["+ value1 + "]");
        var Dir = component.get("v.Direction");
        
        if (Dir == "ASC") {
            component.set("v.Direction", "DESC")
        }
        else {component.set("v.Direction", "ASC")};
        component.set("v.OrderField", sortField);
        
        //опять же я так и не понял почему ты просто тут на вызываешь хелпер helper.callServer(component);
        $A.enqueueAction(component.get("c.Action_comp"));
    },
    
    /* to Fire Event - not in use
    FireFire: function(component, event){
        var myAppEvent = $A.get("e.c:mikhaEvent"); 
        myAppEvent.fire(); 
    },*/
    
    // STRING TO LIST
    //вот это не обязательно было выносить в хелпер
    splitString: function(component, event, helper){
        helper.String(component);
    },
})