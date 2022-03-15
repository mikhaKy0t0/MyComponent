({
	callServer : function(component, helper) {
        var queryList = component.get("c.relatedRecords");
        component.set("v.spinner", true);
        //component.set("v.OrderField", component.get("v.field2"));
        queryList.setParams({recordId: component.get("v.recordId"), 
                          chosenObject: component.get("v.chosenObject"),
                          fieldsToQuery: component.get("v.fieldsToQuery"),
                          orderField: component.get("v.orderField"),
                          direction: component.get("v.direction")});
        
        queryList.setCallback(this, function(data){
            var myCompEvent = $A.get("e.c:mikhaEvent");
            let state = data.getState();
            if (state === "SUCCESS") {
                this.showSuccesfullyToast(component);
                component.set("v.objectList", data.getReturnValue());
                component.set("v.spinner", false);
                // component.set("v.EventBoolean", true);
                myCompEvent.fire();}
            else {
                this.showNegativeToast(component);
                console.log("Failed with state:" + state);
                component.set("v.spinner", false);
            }
    });
        $A.enqueueAction(queryList);
	},
    
    stringToArray : function(component) {
        var fieldsQuery = component.get("v.fieldsToQuery");
        var fieldsHeader = component.get("v.fieldsToDisplay");
        var fieldsFormat = component.get("v.dataFormat")

        fieldsQuery = fieldsQuery.split(', ');
        fieldsHeader = fieldsHeader.split(', ');
        fieldsFormat = fieldsFormat.split(', ');
        
        component.set("v.listToQuery", fieldsQuery);
        component.set("v.listToDisplay", fieldsHeader);
        component.set("v.listFormat", fieldsFormat);
    },
    
    showSuccesfullyToast : function(component, event, helper) {
        var toastSuccessEvent = $A.get("e.force:showToast");
        toastSuccessEvent.setParams({
            "title": "State of Your Query",
            "message": "SUCCESS"
        });
        toastSuccessEvent.fire();
    },

    showNegativeToast : function(component, event, helper) {
        var toastNegativeEvent = $A.get("e.force:showToast");
        toastNegativeEvent.setParams({
            "title": "State of Your Query",
            "message": "UNSUCCESSFULLY"
        });
        toastNegativeEvent.fire();
    }
})