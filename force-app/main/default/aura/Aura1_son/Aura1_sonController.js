({	
    // VALUES here
    final: function(component,event,helper){
        // Take record by Parent Iteration
        var obj = component.get("v.iter");
        // Take field by record
        var field = component.get("v.fldDisp");
        var new_values=[];
        for (var i = 0; i < field.length; i++){
            // VERY IMPORTANT PART
            var val = obj[field[i]];
            new_values.push(val);
        }
        component.set("v.vals", new_values);

    },
    
    // FLOW call
    flowAction: function (component, event, helper){
        if (component.get("v.FlowBoolean") == false){
            component.set("v.FlowBoolean", true);
        }
    },
    
    //Format
    Format: function (component, event, helper){
        var ArrForm = component.get("v.fldDisp");
        var Form = ArrForm.contains("Date");
        alert("something: ");
        //if (component.get("v.fldDisp")){}
    }
})