@isTest
public class setupExportDataTableHandlerTestclass {
    @testSetup 
    static void testsetup(){
        Setup_Export__c setupdata = new Setup_Export__c();
        setupdata.Name = 'Test1';
        setupdata.Fields__c = 'Name';
        setupdata.data_Limits__c = 4; 
        setupdata.Object_Name__c = 'Account';
        insert setupdata;
        
    }
    @isTest 
    static void testmethod1(){
        Setup_Export__c setUp = [SELECT Id, Name,data_Limits__c,Fields__c,Object_Name__c FROM Setup_Export__c limit 1];
        List<Setup_Export__c> setupList = setupExportDataTableHandler.showSetupExport();
        System.assertEquals(1, setupList.size());
        
        setupExportDataTableHandler.showSetupExport1(setUp.Id);
    }
}