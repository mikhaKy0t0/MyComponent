({	
    // VALUES here
    formingRows: function(component,event,helper){
        // Take record by Parent Iteration
        var obj = component.get("v.iter");
        // Take field by record
        var field = component.get("v.fldsDisp");
        var form = component.get("v.format");
        var newValues=[];
        var regExpIn = /\((.*)\)/;
        // var regExpOut = /(.*?)\(/; - not in use
        for (var i = 0; i < field.length; i++){
            /* MAP values here
            map works incorrectly
            var map = new Map();
            map.set('value',obj[field[i]]);
            map.set('format',form[i]);*/
            var formatMain = ((form[i].includes('Date')) ? 'Date' : form[i]);
            var formatSpec = ((form[i].includes('Date(')) ? regExpIn.exec(form[i]) : form[i]);

            var customObj = {
                value: obj[field[i]],
                format: formatMain,
                specFormatObj: (formatSpec == 'Date' || formatSpec == form[i] ? '' : formatSpec[1])
            };
            newValues.push(customObj);
        }
        component.set("v.values", newValues);   
    },
    /* FLOW call - not in use
    flowAction: function (component, event, helper){

        var flow = component.find("myCustomFlow");
        flow.startFlow("AURAFLOWTEST");*/
        /*
        if (component.get("v.flowBoolean") == false){
            component.set("v.flowBoolean", true);
        }
    */

    handleShowModal: function(component, evt, helper) {
        var modalBody;
        $A.createComponent("c:lightningModalFlow", 
        {record: component.get("v.iter"),
        flowToUse: component.get("v.flowToUse")
        },
            function(content, status) {
                if (status === "SUCCESS") {
                    modalBody = content;
                    component.find('overlayLib').showCustomModal({
                        header: "Flow in Modal Window",
                        body: modalBody, 
                        showCloseButton: true,
                    })   
                }
            });    
    },
})