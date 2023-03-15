public class exportController {
    @AuraEnabled
    public static List<String> getObjectList() { 
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();    
        List<String> masterObjects = new List<String>();
        for(Schema.SObjectType f : gd.values()){
            Schema.DescribeSObjectResult  anObject = f.getDescribe();
            if (anObject.isAccessible() && anObject.isCreateable() && anObject.isUpdateable() && anObject.getKeyPrefix() != null) {
                masterObjects.add(String.valueOf(f));
            }
        }
        masterObjects.sort();
        return masterObjects;
    }
    @AuraEnabled
    public static List<String> getallFields(String seletedObject) { 
        List<String> Fieldlist = new List<String>();
        
        Map<String,Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.DescribeSObjectResult[] genericObj = Schema.describeSObjects(new String[]{seletedObject});
        Schema.SObjectType obj = genericObj[0].getSObjectType();
        Schema.SObjectType objectType = schemaMap.get(String.valueOf(obj));
        Schema.DescribeSObjectResult objDescribe = objectType.getDescribe();
        
        for(Schema.SObjectField fieldName : objDescribe.fields.getMap().values()) {
            if(fieldName.getDescribe().getType() != DisplayType.Reference) {
                Fieldlist.add(String.valueOf(fieldName));       
            }                    
        }
        return Fieldlist;
    }
    @AuraEnabled
    public static void configuratonsave( String setupName, String dataLimits, String obj, String FieldsData){
        try{
            Setup_Export__c setupdata = new Setup_Export__c();
            setupdata.Name = setupName;
            if(String.isNotBlank(dataLimits))
                setupdata.data_Limits__c = Integer.valueof(dataLimits);
            setupdata.Fields__c = FieldsData;
            setupdata.Object_Name__c = obj;
            insert setupdata;  
        } catch(Exception e){
            System.debug('error on line ' + e.getLineNumber() + ' message is '+e.getMessage());
        }
    }
    
}