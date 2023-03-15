({
    onInit : function(component,helper) {
        var action = component.get("c.getObjectList");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var responseVar = response.getReturnValue();
                component.set("v.listOfObjects", responseVar);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                }
            } else {
                helper.showToast(component, event, helper,'Error!!', 'error', 'Something went Wrong please try again');
            }
        });
        $A.enqueueAction(action);
        this.getFields(component);
    },
    getFields : function(component,helper) {
        var Obj = component.get("v.selectedObject");
        var action = component.get("c.getallFields");
        action.setParams({seletedObject: Obj});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resp = response.getReturnValue();
                var items = [];
                for (var i = 0; i < resp.length; i++) {
                    var item = {
                        "label": resp[i],
                        "value": resp[i]
                    };
                    items.push(item);
                }
                component.set("v.listOfFields", items);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                }
            } else {
                helper.showToast(component, event, helper,'Error!!', 'error', 'Something went Wrong please try again');
            }
        });
        $A.enqueueAction(action);
    },
    
    getSelectedFields : function (component,event){
        // This will contain an array of the "value" attribute of the selected options
        var selectedOptionValue = event.getParam("value");
        component.set("v.selectedFields",selectedOptionValue.toString());
    }, 
    saveConfigure : function (component,helper){
        var Obj = component.get("v.selectedObject");
        var filedsList = component.get("v.selectedFields");
        if(!$A.util.isEmpty(Obj) && !$A.util.isEmpty(filedsList) && !$A.util.isEmpty(component.find('setupName').get("v.value")) ){
            var configure = component.get("c.configuratonsave");
            
            configure.setParams( {
                'setupName':component.find('setupName').get("v.value"),
                'dataLimits' : component.find('dataLimits').get("v.value"),
                'obj': Obj, 
                'FieldsData':filedsList
            });
            configure.setCallback(this, function(response) {
                var state = response.getState();
                
                if (state === "SUCCESS") {
                   this.gotoURL(component, event, helper);
                    this.saveRedirect(component, event, helper);
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    console.log(errors);
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    }
                } else {
                    helper.showToast(component, event, helper,'Error!!', 'error', 'Something went Wrong please try again');
                    
                }
            });
            $A.enqueueAction(configure);
            
        } else {
            helper.showToast(component, event, helper,'Warning!!', 'warning', '!Please enter Setup Name, select Object and atleast one Field');
        }
    },
    saveRedirect : function (component, event, helper){
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "sfd3:Configurable_Datatable"
        });

        evt.fire();
    },
   gotoURL : function (component, event, helper) {
    var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      "url": "https://cloudprismsolutions-b-dev-ed.develop.lightning.force.com/lightning/n/Setup"
    });
    location.reload()
    urlEvent.fire();
   },
})