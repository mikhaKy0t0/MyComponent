({
    init : function(component, event, helper){
        var flow = component.find("modalFlow");
        flow.startFlow(component.get("v.flowToUse"));
    },

    closeModalOnFinish : function(component, event, helper) {
        if(event.getParam('status') === "FINISHED") {
            $A.get('e.force:refreshView').fire(); // works fine without it
            component.find('overlayLibModal').notifyClose();
        }
    }
})
