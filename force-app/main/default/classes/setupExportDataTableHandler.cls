public class setupExportDataTableHandler {  
    
    @auraEnabled(cacheable=true)
    public static List<Setup_Export__c> showSetupExport(){
        List<Setup_Export__c> setuplist = new List<Setup_Export__c>(); 
        setuplist = [SELECT Id, Name,data_Limits__c,Fields__c,Object_Name__c FROM Setup_Export__c];
        return setuplist;
    }
    
    @AuraEnabled
    public static wrapExport showSetupExport1(Id rowId){
        Setup_Export__c setUp = [SELECT Id, Name,data_Limits__c,Fields__c,Object_Name__c FROM Setup_Export__c Where Id =:rowId limit 1];
        String sQuery = setUp.data_Limits__c != null ? 'SELECT ' + setUp.Fields__c + ' FROM ' + setUp.Object_Name__c + ' LIMIT ' + setUp.data_Limits__c : 'SELECT '+setUp.Fields__c+' FROM '+setUp.object_Name__c;
        List<sObject> setUpval =Database.query(sQuery);
        wrapExport wrapObj = new wrapExport();
        wrapObj.queryList = setUpval;
        wrapObj.header = setUp.Fields__c;
        return wrapObj;
        
    }
    
    public class wrapExport {
        @AuraEnabled
        public List<sObject> queryList {get; set;}
        @AuraEnabled
        public String header {get; set;}
        
    }
}