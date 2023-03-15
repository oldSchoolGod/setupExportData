@isTest
public class exportControllerHandlerTest {
    @testSetup 
    static void testsetup(){
        Setup_Export__c setupdata = new Setup_Export__c();
        setupdata.Name = 'Test1';
        setupdata.Fields__c = 'Name';
        setupdata.data_Limits__c = 4;  
        insert setupdata;
    }
    @isTest 
    static void testmethod1(){
        exportController.getObjectList();
        exportController.getallFields('Account');
        exportController.configuratonsave('Test1','4','Account','Name');
    }
    
}