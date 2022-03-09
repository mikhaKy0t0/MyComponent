({
	callServer : function(component, helper) {
        var reList = component.get("c.RelatedListComp");
        //я бы объявлял этот эвент уже внутри самого колбека
        var myAppEvent = $A.get("e.c:mikhaEvent");
        component.set("v.Spinner", true);
        //component.set("v.OrderField", component.get("v.field2"));
        reList.setParams({recordId: component.get("v.recordId"), 
                          choose_object: component.get("v.choose_object"),
                          FieldsToDisplay: component.get("v.FieldsToDisplay"),
                          OrderField: component.get("v.OrderField"),
                          Direction: component.get("v.Direction")});
        
        reList.setCallback(this, function(data){
            let state = data.getState();
            if (state === "SUCCESS") {
                this.showToast(component);
                component.set("v.ObjectList", data.getReturnValue());
                component.set("v.Spinner", false);
                // component.set("v.EventBoolean", true);
                myAppEvent.fire();}
            else {
                //раз уж сделал функцию для toastEvent почему бы ее не вызывать при ошибке? 
                console.log("Failed with state:" + state);
                //а спинер отключить?
            }
    });
        $A.enqueueAction(reList);
        
        
	},
    
    String : function(component) {
        var listOfString = component.get("v.FieldsToDisplay");
        var newHeader = component.get("v.FieldsToDisplay2");
        
        listOfString = listOfString.split(', ');
        newHeader = newHeader.split(', ');
        
        component.set("v.FieldsList", listOfString);
        component.set("v.FieldsList2", newHeader);
    },
    
    showToast : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "State of Your Query",
            "message": "SUCCESS"
        });
        toastEvent.fire();
    }
})