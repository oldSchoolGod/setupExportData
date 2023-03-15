({
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },
    getFields : function(component, event, helper) {
        helper.getFields(component,helper);
    },
    getSelectedFields : function(component, event, helper) {
        helper.getSelectedFields(component, event);
    },
    saveConfigure : function(component, event, helper) {
        helper.saveConfigure(component,helper);
    }   
})